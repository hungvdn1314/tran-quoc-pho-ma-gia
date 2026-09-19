import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for c in range(326, 361):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    print(f"=== Ch.{c}: {title} ===")
    # Look for key character names and actions
    for name in ['Trương Liêu', 'Mã Siêu', 'Chu Du', 'Văn Nhân Húc', 'Bùi Nguyên', 'Điêu Thuyền', 'Linh Khê', 'Đông Sơn', 'Vân Ninh', 'An Quân Thương', 'Trương Hiên Chính', 'Quý Bình Thường', 'thăng cấp']:
        if name.lower() in content.lower():
            # Find context
            idx = content.lower().find(name.lower())
            snippet = content[max(0, idx-50):min(len(content), idx+150)].replace('\n', ' ')
            print(f"  [{name}]: {snippet[:120]}...")
            break
