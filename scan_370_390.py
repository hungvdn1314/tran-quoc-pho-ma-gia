import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for c in range(370, 391):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    print(f"=== Ch.{c}: {title} ===")
    for kw in ['Quách Gia', 'Bái sư', 'thể nguyện', 'đế vị', 'chính lệnh', 'Hoàng Đế', 'Phụng Hiếu', 'nghịch thiên', 'cộng minh']:
        if kw.lower() in content.lower():
            idx = content.lower().find(kw.lower())
            snippet = content[max(0, idx-30):min(len(content), idx+150)].replace('\n', ' ')
            print(f"  [{kw}]: {snippet[:130]}...")
            break
