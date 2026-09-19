import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for c in range(551, 581):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    print(f"=== Ch.{c}: {title} ===")
    for kw in ['Mạc Thiên Tinh', 'Cảnh Vương', 'Thánh Giả', 'Hứa Chử', 'Cam Ninh', 'Uyển Châu', 'Ngao Gia', 'Ngao Phỉ', 'Tân Môn', 'Vương Việt', 'Trương Bất Minh', 'Ảnh đế', 'Tây Lăng Thiết Kỵ']:
        if kw.lower() in content.lower():
            idx = content.lower().find(kw.lower())
            snippet = content[max(0, idx-20):min(len(content), idx+130)].replace('\n', ' ')
            print(f"  [{kw}]: {snippet[:120]}...")
            break
