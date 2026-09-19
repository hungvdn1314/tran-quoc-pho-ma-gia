import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(ch):
    fn = f'c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/data/raw_chapters/chuong_{ch:04d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        return json.load(f)

# Candidate native characters
candidates = [
    "Quý Bình An", "Quý Vô Song", "Ninh An công chúa", "Triệu Quân", "Tử Ngọc Lan",
    "Vũ Hoàng", "Tử Triệu Nghiệp", "Vệ Ti Vũ", "Hồng Hồ", "Liễu Khinh Ngôn",
    "Tử Ngọc Hằng", "Tử Ngọc Trạch", "Tử Ngọc Kỳ", "Tử Ngọc Ưng",
    "Quý Bình Xuyên", "Quý Bình Sinh", "Tô Kiến Phong", "Hứa Hòa Lâm",
    "Mã Như Nguyên", "Vu Văn Châu", "Trần Nham", "Cẩu Phú Quý", "Lục Phong",
    "Hề Nhan", "Hề Nhan công chúa", "Triệu Thiên Tứ", "Địch Hỏa", "Cung Thư Sinh",
    "Cơ Vô Pháp", "Cơ Vô Thiên", "Hướng Hạo Thiên", "Chu Bất Ninh", "Đào Nhã",
    "Trương Hiên Chính", "Ngao Phỉ", "Ngao Thiếu Vũ", "Triệu Văn Dụ", "Khai Sơn Vương",
    "Vương Viễn", "Trầm Lưu Lương", "Trần Hải", "Lữ Bố", "Quan Vũ", "Trương Phi",
    "Tạ Bạt", "Lý Thanh", "Bùi Phong", "Trần Cung", "Mông Điềm", "Bạch Khởi"
]

found_chars = {}
for ch in range(1, 301):
    d = read_ch(ch)
    content = d['content']
    for c in candidates:
        if c in content:
            found_chars.setdefault(c, []).append(ch)

for c, chs in sorted(found_chars.items(), key=lambda x: len(x[1]), reverse=True):
    print(f"{c}: {len(chs)} chapters, first in Ch {chs[0]}, last in Ch {chs[-1]}")
