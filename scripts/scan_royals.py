import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

# Search royal family of Dai Vu
vu_royals = set()
for ch in range(1, 301):
    d = read_ch(ch)
    c = d['content']
    # Match Tu ...
    for m in re.findall(r'Tử\s+[A-ZĐÂÊÔƯÁÀẢÃẠÉÈẺẼẸÍÌỈĨỊÓÒỎÕỌÚÙỦŨỤÝỲỶỸỴ][a-zđâêôưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ]+(?:\s+[A-ZĐÂÊÔƯÁÀẢÃẠÉÈẺẼẸÍÌỈĨỊÓÒỎÕỌÚÙỦŨỤÝỲỶỸỴ][a-zđâêôưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ]+)?', c):
        if any(w in m for w in ['Ngọc', 'Triệu']):
            vu_royals.add(m)

print("Đại Vũ Hoàng Thất (Tử ...):", vu_royals)

# Search names of generals/leaders in Nam Ly, Tây Lăng, Đông Thương
nam_ly = set()
tay_lang = set()
dong_thuong = set()

for ch in range(1, 301):
    d = read_ch(ch)
    c = d['content']
    for line in c.split('\n'):
        if 'Nam Ly' in line:
            for title in ['tướng', 'hoàng', 'thái tử', 'vương', 'quân thần']:
                if title in line.lower():
                    # extract names around it
                    pass
