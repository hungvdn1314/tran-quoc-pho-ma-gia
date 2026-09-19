import asyncio
import json
import os
import re
import sqlite3
import sys
from pathlib import Path
import httpx
from aiolimiter import AsyncLimiter
from selectolax.lexbor import LexborHTMLParser
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

# Configuration
BASE_URL = "https://www.tvtruyen.live/tran-quoc-pho-ma-gia"
TOTAL_CHAPTERS = 1509

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
RAW_CHAPTERS_DIR = DATA_DIR / "raw_chapters"
DB_PATH = DATA_DIR / "crawler_state.db"
OUTPUT_JSONL = DATA_DIR / "chapters_raw.jsonl"

DATA_DIR.mkdir(parents=True, exist_ok=True)
RAW_CHAPTERS_DIR.mkdir(parents=True, exist_ok=True)

# Headers for HTTP requests
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    "Referer": "https://www.tvtruyen.live/tran-quoc-pho-ma-gia.html",
}

WATERMARKS = [
    "tvtruyen",
    "truyentv",
    "xem bản dịch sớm nhất",
    "đọc truyện tại",
    "chúc bạn đọc truyện vui vẻ",
    "bạn đang đọc truyện",
    "ủng hộ dịch giả",
    "nhóm dịch",
]

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS queue (
            chapter_num INTEGER PRIMARY KEY,
            url TEXT NOT NULL,
            title TEXT,
            status TEXT DEFAULT 'pending',
            word_count INTEGER DEFAULT 0,
            attempts INTEGER DEFAULT 0,
            error TEXT
        )
    """)
    cur.execute("SELECT COUNT(*) FROM queue")
    count = cur.fetchone()[0]
    if count == 0:
        records = [
            (i, f"{BASE_URL}/chuong-{i}", None, "pending", 0, 0, None)
            for i in range(1, TOTAL_CHAPTERS + 1)
        ]
        cur.executemany("INSERT INTO queue VALUES (?, ?, ?, ?, ?, ?, ?)", records)
        conn.commit()
    conn.close()

def clean_chapter(html: str) -> dict:
    tree = LexborHTMLParser(html)
    
    # Remove unwanted nodes
    for tag in tree.css('script, style, iframe, .ads, .advertisement, header, footer, nav, .breadcrumb'):
        tag.decompose()
        
    # Extract title
    title_nodes = tree.css('h1, h2, .chapter-title')
    title = ""
    for node in title_nodes:
        t = node.text(strip=True)
        if "chương" in t.lower() or "chuong" in t.lower() or "trấn quốc" in t.lower():
            title = t
            break
    if not title and title_nodes:
        title = title_nodes[0].text(strip=True)
        
    # Extract content
    content_node = tree.css_first('div.chapter-content, div.box-content, div.content-story, div#chapter-content, div.content')
    
    paragraphs = []
    if content_node:
        raw_text = content_node.text(separator='\n', strip=True)
        for line in raw_text.splitlines():
            line = line.strip()
            if not line:
                continue
            line_lower = line.lower()
            if any(wm in line_lower for wm in WATERMARKS):
                continue
            paragraphs.append(line)
            
    full_text = "\n\n".join(paragraphs)
    word_count = len(re.findall(r'\b\w+\b', full_text))
    
    return {
        "title": title,
        "content": full_text,
        "paragraphs": len(paragraphs),
        "word_count": word_count
    }

@retry(
    wait=wait_exponential(multiplier=1, min=1, max=8),
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type((httpx.RequestError, httpx.HTTPStatusError))
)
async def fetch_html(client: httpx.AsyncClient, url: str, limiter: AsyncLimiter) -> str:
    async with limiter:
        resp = await client.get(url, headers=HEADERS, timeout=15.0)
        resp.raise_for_status()
        return resp.text

async def worker(queue_item, client: httpx.AsyncClient, db_conn, lock: asyncio.Lock, file_handle, progress: dict, limiter: AsyncLimiter, semaphore: asyncio.Semaphore):
    chapter_num, url = queue_item
    async with semaphore:
        try:
            html = await fetch_html(client, url, limiter)
            cleaned = clean_chapter(html)
            
            record = {
                "chapter_num": chapter_num,
                "url": url,
                "title": cleaned["title"],
                "content": cleaned["content"],
                "paragraph_count": cleaned["paragraphs"],
                "word_count": cleaned["word_count"]
            }
            
            # Save single chapter JSON file for instant random access
            single_file = RAW_CHAPTERS_DIR / f"chuong_{chapter_num:04d}.json"
            with open(single_file, "w", encoding="utf-8") as sf:
                json.dump(record, sf, ensure_ascii=False, indent=2)
                
            async with lock:
                # Append to consolidated JSONL
                file_handle.write(json.dumps(record, ensure_ascii=False) + "\n")
                file_handle.flush()
                
                # Update SQLite
                db_conn.execute(
                    "UPDATE queue SET status = 'completed', title = ?, word_count = ?, error = NULL WHERE chapter_num = ?",
                    (cleaned["title"], cleaned["word_count"], chapter_num)
                )
                db_conn.commit()
                
                progress["completed"] += 1
                curr = progress["completed"]
                total = progress["total"]
                pct = (curr / total) * 100
                if curr % 25 == 0 or curr == total or curr <= 10:
                    print(f"[{curr}/{total}] ({pct:.1f}%) Ch.{chapter_num}: {cleaned['title'][:40]} ({cleaned['word_count']} words)")
                    
        except Exception as e:
            async with lock:
                db_conn.execute(
                    "UPDATE queue SET status = 'failed', attempts = attempts + 1, error = ? WHERE chapter_num = ?",
                    (str(e), chapter_num)
                )
                db_conn.commit()
                print(f"✗ Ch.{chapter_num} failed: {e}")

async def main():
    sys.stdout.reconfigure(encoding='utf-8')
    init_db()
    
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT chapter_num, url FROM queue WHERE status != 'completed' ORDER BY chapter_num ASC")
    pending_tasks = cur.fetchall()
    
    cur.execute("SELECT COUNT(*) FROM queue WHERE status = 'completed'")
    already_done = cur.fetchone()[0]
    
    print(f"Total chapters: {TOTAL_CHAPTERS}")
    print(f"Already completed: {already_done}")
    print(f"Pending to crawl: {len(pending_tasks)}")
    
    if not pending_tasks:
        print("All chapters are already downloaded!")
        conn.close()
        return

    lock = asyncio.Lock()
    limiter = AsyncLimiter(5, 1)
    semaphore = asyncio.Semaphore(8)
    progress = {
        "completed": already_done,
        "total": TOTAL_CHAPTERS
    }
    
    with open(OUTPUT_JSONL, "a", encoding="utf-8") as jsonl_file:
        limits = httpx.Limits(max_connections=20, max_keepalive_connections=10)
        async with httpx.AsyncClient(limits=limits, follow_redirects=True) as client:
            tasks = [worker(item, client, conn, lock, jsonl_file, progress, limiter, semaphore) for item in pending_tasks]
            await asyncio.gather(*tasks)

    conn.close()
    print("✓ Crawling run finished!")

if __name__ == "__main__":
    asyncio.run(main())
