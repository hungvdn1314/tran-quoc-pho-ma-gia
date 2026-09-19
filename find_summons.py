import json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_chapter(ch_num):
    fpath = f"data/raw_chapters/chuong_{ch_num:04d}.json"
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return None

# Let's inspect summons across chapters 301-600
keywords = ['triệu hoán', 'Hệ thống', 'tuyệt thế', 'thiên mệnh', 'bán thánh', 'thánh giả', 'võ tướng', 'mưu thần', 'canh kim', 'anh linh']

summons_found = []
for c in range(301, 601):
    data = read_chapter(c)
    if not data: continue
    content = data.get('content', '')
    title = data.get('title', '')
    for line in content.split('\n'):
        if any(k.lower() in line.lower() for k in ['triệu hoán thành công', 'chúc mừng túc chủ', 'hệ thống nhắc nhở', 'thăng cấp thành công']):
            summons_found.append({'ch': c, 'title': title, 'line': line.strip()})

print(f"Total summon/system alert lines found: {len(summons_found)}")
for s in summons_found:
    print(f"Ch.{s['ch']}: {s['line']}")
