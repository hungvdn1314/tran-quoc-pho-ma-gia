import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

for c in range(443, 476):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    print(f"=== Ch.{c}: {title} ===")
    for kw in ['Trương Phi', 'Tây Lăng Vương', 'Cung gia', 'Ngưu Khánh Châu', 'Hướng Hạo Thiên', 'Chiến Hổ', 'Chu Thái', 'Lý Tiểu Đao', 'nước ngập', 'Hồ Lô Cốc']:
        if kw.lower() in content.lower():
            idx = content.lower().find(kw.lower())
            snippet = content[max(0, idx-20):min(len(content), idx+130)].replace('\n', ' ')
            print(f"  [{kw}]: {snippet[:120]}...")
            break
