import json
import re
import sqlite3
import sys
from pathlib import Path

def scan_arcs():
    sys.stdout.reconfigure(encoding='utf-8')
    data_dir = Path(__file__).resolve().parent.parent / "data"
    db_path = data_dir / "crawler_state.db"

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT chapter_num, title FROM queue WHERE status = 'completed' ORDER BY chapter_num ASC")
    chapters = cur.fetchall()
    conn.close()

    print(f"Total downloaded chapters to analyze: {len(chapters)}")

    keywords = {
        "Triệu Hoán / Tướng Tam Quốc": ["triệu vân", "giả hủ", "giả hủ", "điển vi", "hoàng trung", "quách gia", "chu du", "cam ninh", "hoa đà", "trương phi", "quan vũ", "lữ bố", "triệu hoán", "anh linh"],
        "Phát Minh / Tech": ["lưu hỏa", "thần nỏ", "hỏa dược", "xà phòng", "bạch tửu", "rượu", "thuyền", "mông đồng", "lâu thuyền", "muối"],
        "Cảnh Giới Võ Lực": ["bán tiên", "thánh giả", "bán thánh", "đế cảnh", "hoàng cảnh", "nhân tiên"],
        "Nhân Vật Chính & Gia Tộc": ["quý vô song", "ninh an", "vũ hoàng", "tử ngọc", "quý bình sinh", "quý bình xuyên"],
        "Chiến Dịch & Thế Lực": ["tây lăng", "nam ly", "bắc cương", "công thành", "thủy chiến", "đại chiến", "hổ lao quan"]
    }

    milestones = []
    for num, title in chapters:
        if not title:
            continue
        title_lower = title.lower()
        matched = []
        for cat, kws in keywords.items():
            for kw in kws:
                if kw in title_lower:
                    matched.append(f"{cat}:{kw}")
        if matched:
            milestones.append((num, title, matched))

    print(f"\nFound {len(milestones)} milestone chapters in titles:")
    for num, title, matched in milestones[:35]:
        print(f"  [Ch.{num:04d}] {title} -> {', '.join(matched)}")

if __name__ == "__main__":
    scan_arcs()
