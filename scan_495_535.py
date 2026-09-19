import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for c in range(495, 536):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    print(f"=== Ch.{c}: {title} ===")
    for kw in ['Mã Quân', 'Triệu Vân', 'Vương Việt', 'Cơ Vô Thiên', 'Kiếm Thánh', 'Xích Hồng Y', 'Quỷ Thánh', 'Hồng Nhan', 'Thượng Thư', 'Triệu Chân', 'Từ Thiên Huyền', 'Tần Ức', 'Đại La']:
        if kw.lower() in content.lower():
            idx = content.lower().find(kw.lower())
            snippet = content[max(0, idx-20):min(len(content), idx+130)].replace('\n', ' ')
            print(f"  [{kw}]: {snippet[:120]}...")
            break
