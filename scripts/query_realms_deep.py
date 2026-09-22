import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('data/raw_chapters/*.json'))

queries = ['cảnh giới', 'bán thánh', 'thánh giả', 'tông sư', 'đại tông sư', 'nhất phẩm', 'hoàng giả', 'vương giả', 'đế cấp', 'thánh cảnh']

for q in queries:
    matches = []
    for path in files:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            text = data.get('content', '') or data.get('text', '') or str(data)
            for m in re.finditer(r'(.{0,100}' + re.escape(q) + r'.{0,150})', text, re.IGNORECASE):
                snippet = m.group(1).replace('\n', ' ')
                matches.append((data.get('title', path), snippet))
                if len(matches) >= 8:
                    break
        if len(matches) >= 8:
            break
    print(f"\n=== TÌM KIẾM: [{q.upper()}] (Tìm thấy {len(matches)}) ===")
    for t, s in matches:
        print(f"- [{t}]: {s.strip()}")
