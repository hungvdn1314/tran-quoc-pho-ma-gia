import json, os, sys

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Inspect Ch.301 to 325 summary
print("=== Scanning Ch.301 - Ch.325 ===")
for c in range(301, 326):
    data = read_ch(c)
    title = data['title']
    content = data['content']
    # Let's extract first 300 chars or notable entities
    print(f"--- Ch.{c}: {title} ---")
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    print("  Start:", lines[0][:120] if lines else "")
    # Check key mentions
    keywords = ['Hoa Chấn Viễn', 'Huyết Tùng', 'Tịnh Kiên Vương', 'Thiên Uy', 'Tử Ngọc Trạch', 'Thiên Cơ', 'Ám Ảnh', 'Quý Bình Sinh', 'Trầm Hạo', 'Tần Tứ Nghiệp', 'Hề Nhan']
    found = [k for k in keywords if k in content]
    print(f"  Keywords: {found}")
