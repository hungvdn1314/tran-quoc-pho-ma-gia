import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Search specific chapters for exact system and world realm descriptions
target_chapters = [
    'data/raw_chapters/chuong_0005.json',
    'data/raw_chapters/chuong_0007.json',
    'data/raw_chapters/chuong_0023.json',
    'data/raw_chapters/chuong_0064.json',
    'data/raw_chapters/chuong_0106.json',
    'data/raw_chapters/chuong_0207.json',
    'data/raw_chapters/chuong_0245.json',
    'data/raw_chapters/chuong_0266.json',
    'data/raw_chapters/chuong_0389.json',
    'data/raw_chapters/chuong_0428.json',
    'data/raw_chapters/chuong_0502.json',
    'data/raw_chapters/chuong_0557.json',
    'data/raw_chapters/chuong_0700.json',
    'data/raw_chapters/chuong_0850.json',
    'data/raw_chapters/chuong_1000.json',
    'data/raw_chapters/chuong_1200.json',
    'data/raw_chapters/chuong_1400.json'
]

print("=== NỘI DUNG CHI TIẾT TỪNG CHƯƠNG VỀ HỆ THỐNG VÕ LỰC / CẢNH GIỚI ===")
for p in target_chapters:
    try:
        with open(p, 'r', encoding='utf-8') as f:
            d = json.load(f)
            t = d.get('content', '')
            title = d.get('title', p)
            # Find paragraphs discussing can gioi, vo luc, or he thong
            paras = t.split('\n')
            relevant = []
            for para in paras:
                if any(k in para.lower() for k in ['cảnh giới', 'võ lực', 'hoàng giả', 'vương giả', 'đế đạo', 'đế cảnh', 'thánh cảnh', 'bán thánh', 'tiên thiên', 'nhân tiên', 'thánh giả']):
                    relevant.append(para.strip())
            if relevant:
                print(f"\n--- {title} ---")
                for r in relevant[:5]:
                    print(f"  * {r}")
    except Exception as e:
        pass
