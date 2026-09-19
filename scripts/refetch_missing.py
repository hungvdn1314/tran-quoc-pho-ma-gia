import requests
import json
import sqlite3
import sys
from pathlib import Path
from crawler import clean_chapter, BASE_URL, DATA_DIR, RAW_CHAPTERS_DIR, HEADERS

sys.stdout.reconfigure(encoding='utf-8')
conn = sqlite3.connect(DATA_DIR / 'crawler_state.db')
cur = conn.cursor()
cur.execute("SELECT chapter_num FROM queue WHERE word_count < 300")
missing = [r[0] for r in cur.fetchall()]
print(f"Refetching {len(missing)} short chapters: {missing}")

for ch in missing:
    url = f"{BASE_URL}/chuong-{ch}"
    res = requests.get(url, headers=HEADERS, timeout=15)
    cleaned = clean_chapter(res.text)
    record = {
        'chapter_num': ch,
        'url': url,
        'title': cleaned['title'],
        'content': cleaned['content'],
        'paragraph_count': cleaned['paragraphs'],
        'word_count': cleaned['word_count']
    }
    with open(RAW_CHAPTERS_DIR / f"chuong_{ch:04d}.json", "w", encoding="utf-8") as sf:
        json.dump(record, sf, ensure_ascii=False, indent=2)
    cur.execute("UPDATE queue SET title = ?, word_count = ?, status = 'completed' WHERE chapter_num = ?", 
                (cleaned['title'], cleaned['word_count'], ch))
    conn.commit()
    print(f"✓ Fixed Ch.{ch}: {cleaned['title']} ({cleaned['word_count']} words)")

conn.close()
print("Done refetching.")
