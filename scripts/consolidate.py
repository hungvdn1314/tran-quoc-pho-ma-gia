import json
import sqlite3
import sys
from pathlib import Path

def consolidate():
    sys.stdout.reconfigure(encoding='utf-8')
    data_dir = Path(__file__).resolve().parent.parent / "data"
    raw_dir = data_dir / "raw_chapters"
    db_path = data_dir / "crawler_state.db"
    full_output = data_dir / "tran_quoc_pho_ma_gia_full.json"
    index_output = data_dir / "chapter_index.json"

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT chapter_num, title, word_count, status FROM queue ORDER BY chapter_num ASC")
    rows = cur.fetchall()
    conn.close()

    total = len(rows)
    completed = [r for r in rows if r[3] == 'completed']
    failed = [r for r in rows if r[3] != 'completed']

    print(f"Total chapters in DB: {total}")
    print(f"Completed: {len(completed)}")
    print(f"Failed/Pending: {len(failed)}")

    if failed:
        print("Warning: Some chapters are not completed:", [f[0] for f in failed[:10]])

    # Build chapter index
    chapter_index = []
    total_words = 0

    for r in rows:
        ch_num, title, word_count, status = r
        chapter_index.append({
            "chapter_num": ch_num,
            "title": title or f"Chương {ch_num}",
            "word_count": word_count,
            "status": status
        })
        if word_count:
            total_words += word_count

    with open(index_output, "w", encoding="utf-8") as f:
        json.dump(chapter_index, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved chapter index ({len(chapter_index)} entries, {total_words:,} total words) to {index_output}")

    # Build full novel file
    all_chapters = []
    for i in range(1, total + 1):
        single_path = raw_dir / f"chuong_{i:04d}.json"
        if single_path.exists():
            with open(single_path, "r", encoding="utf-8") as f:
                all_chapters.append(json.load(f))
        else:
            print(f"Missing file: {single_path}")

    full_data = {
        "title": "Trấn Quốc Phò Mã Gia",
        "author": "Hiên Chí",
        "total_chapters": len(all_chapters),
        "total_words": total_words,
        "chapters": all_chapters
    }

    with open(full_output, "w", encoding="utf-8") as f:
        json.dump(full_data, f, ensure_ascii=False)
    print(f"✓ Saved full consolidated novel ({len(all_chapters)} chapters) to {full_output}")

if __name__ == "__main__":
    consolidate()
