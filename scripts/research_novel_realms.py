import json
import glob
import re
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

print("=== BẮT ĐẦU QUÉT HỆ THỐNG CẢNH GIỚI VÀ VÕ LỰC TRONG NGUYÊN TÁC TIỂU THUYẾT ===")

# Search all chapters
files = sorted(glob.glob('data/raw_chapters/*.json'))
print(f"Tổng số chương tìm thấy: {len(files)}")

keywords = [
    'cảnh giới', 'võ lực', 'thánh giả', 'bán thánh', 
    'tông sư', 'đại tông sư', 'nhất phẩm', 'nhị phẩm', 'tam phẩm', 'cửu phẩm',
    'hoàng giả', 'vương giả', 'đế cấp', 'tiên thiên', 'hậu thiên',
    'vạn kim', 'triệu hoán', 'anh linh', 'thiên mệnh võ tướng', 'ngũ hổ'
]

results = {kw: [] for kw in keywords}

for path in files:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            text = data.get('content', '') or data.get('text', '') or str(data)
            chapter_title = data.get('title', path)
            for kw in keywords:
                for m in re.finditer(r'\b' + re.escape(kw) + r'\b', text, re.IGNORECASE):
                    start = max(0, m.start() - 100)
                    end = min(len(text), m.end() + 150)
                    snippet = text[start:end].replace('\n', ' ')
                    results[kw].append((chapter_title, snippet))
                    if len(results[kw]) >= 10:
                        break
    except Exception as e:
        continue

for kw, items in results.items():
    print(f"\n=======================================================")
    print(f"TỪ KHÓA: [{kw.upper()}] - Tìm thấy {len(items)} đoạn trích mẫu")
    print(f"=======================================================")
    for title, snip in items[:6]:
        print(f"[{title}]: ...{snip}...")
