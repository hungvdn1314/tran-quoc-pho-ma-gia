import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for c in range(398, 421):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    print(f"=== Ch.{c}: {title} ===")
    for kw in ['Thiên Cơ Lâu', 'Định quốc', 'Quý Bình Xuyên', 'Học Cung', 'Mổ sọ', 'Thần Hỏa Thành', 'Đào Nhã', 'Hoa Đà', 'Cổ Hủ', 'Mã Siêu']:
        if kw.lower() in content.lower():
            idx = content.lower().find(kw.lower())
            snippet = content[max(0, idx-30):min(len(content), idx+150)].replace('\n', ' ')
            print(f"  [{kw}]: {snippet[:130]}...")
            break
