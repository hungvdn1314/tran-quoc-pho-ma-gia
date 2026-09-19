import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

# Let's inspect Cung Thư Sinh and names with titles
cung_thu_sinh = []
princes = {}
for ch in range(1, 301):
    d = read_ch(ch)
    content = d['content']
    if 'Cung Thư Sinh' in content:
        cung_thu_sinh.append(ch)
    for m in re.findall(r'(Tử [A-ZĐÂÊÔƯÁÀẢÃẠÉÈẺẼẸÍÌỈĨỊÓÒỎÕỌÚÙỦŨỤÝỲỶỸỴ\w]+)', content):
        princes.setdefault(m, set()).add(ch)

print(f"Cung Thư Sinh: {len(cung_thu_sinh)} chapters, e.g. {cung_thu_sinh[:10]}")
print("Tử ... names:")
for name, chs in sorted(princes.items(), key=lambda x: len(x[1]), reverse=True)[:15]:
    print(f"  {name}: {len(chs)} chapters")
