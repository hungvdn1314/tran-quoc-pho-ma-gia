import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== QUÉT TẤT CẢ ĐOẠN VĂN ĐỊNH NGHĨA CẢNH GIỚI VÕ HỌC TỪ CHƯƠNG 100 ĐẾN 1509 ===")

keywords = ['phong đế', 'bán thánh', 'thánh cảnh', 'thánh giả', 'nhân tiên', 'địa tiên', 'thiên tiên', 'đế cảnh', 'vương giả', 'hoàng giả']

found_definitions = []

for p in sorted(glob.glob('data/raw_chapters/*.json')):
    try:
        with open(p, 'r', encoding='utf-8') as f:
            data = json.load(f)
            text = data.get('content', '')
            title = data.get('title', p)
            # Find paragraphs that mention both 'võ lực' and ('cảnh' or 'thánh' or 'tiên' or 'đế' or 'phẩm')
            for line in text.split('\n'):
                line_lower = line.lower()
                if 'võ lực' in line_lower and any(k in line_lower for k in ['cảnh', 'thánh', 'tiên', 'đế', 'hoàng giả', 'bán thánh', 'nhân tiên']):
                    found_definitions.append((title, line.strip()))
    except:
        pass

print(f"Tổng số đoạn tìm thấy: {len(found_definitions)}")
for title, line in found_definitions[:25]:
    print(f"[{title}]: {line}")
