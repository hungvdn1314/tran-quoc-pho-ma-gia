import json, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Inspect Ch.310 (Vu Văn Châu Thiên Cơ)
c310 = read_ch(310)
print("=== Ch.310 Vu Văn Châu ===")
for line in c310['content'].split('\n'):
    if any(k in line for k in ['Vu Văn Châu', 'Thiên Cơ', 'Ám ảnh', 'Vũ Kỳ Luân']):
        print(" ", line.strip()[:100])

# Inspect Ch.409 (Summons)
c409 = read_ch(409)
print("\n=== Ch.409 Summons ===")
for line in c409['content'].split('\n'):
    if any(k in line for k in ['Phan Phượng', 'Hình Đạo Vinh', 'Hác Chiêu', 'Mãn Sủng']):
        print(" ", line.strip()[:100])

# Inspect Ch.495 (Mã Quân)
c495 = read_ch(495)
print("\n=== Ch.495 Mã Quân ===")
for line in c495['content'].split('\n'):
    if any(k in line for k in ['Mã Quân', 'đặc thù', 'thiên phú', 'vũ khí']):
        print(" ", line.strip()[:100])

# Inspect Ch.600 (Tây Lăng tụ hợp)
c600 = read_ch(600)
print("\n=== Ch.600 Tây Lăng tụ hợp ===")
for line in c600['content'].split('\n')[:20]:
    print(" ", line.strip()[:100])
