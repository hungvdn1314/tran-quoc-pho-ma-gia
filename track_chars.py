import json, re, sys
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

def read_ch(num):
    with open(f"data/raw_chapters/chuong_{num:04d}.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Let's search for characters and factions across all chapters 301-600
# Regex for Vietnamese names (Capitalized 2-4 words)
name_pattern = re.compile(r'\b[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĐ][a-zàáâãèéêìíòóôõùúýđ]+(?:\s+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĐ][a-zàáâãèéêìíòóôõùúýđ]+){1,3}\b')

# Let's track interesting titles and entities
factions = ['Đại Vũ', 'Đại Hán', 'Tây Lăng', 'Đông Thương', 'Nam Ly', 'Đại La', 'Thiên Cơ Lâu', 'Quỷ Quật', 'Huyết Y Các']

character_mentions = Counter()
organizations = set()
locations = set()

# Pre-known keywords to filter or identify
known_chars = [
    'Quý Bình An', 'Tử Ngọc Trạch', 'Quý Bình Sinh', 'Quý Bình Xuyên', 'Quý Bình Thường', 'Quý Vô Song',
    'Triệu Vân', 'Điển Vi', 'Hoàng Trung', 'Cổ Hủ', 'Tuân Úc', 'Hí Chí Tài', 'Chu Du', 'Điêu Thuyền',
    'Trương Liêu', 'Mã Siêu', 'Hoa Đà', 'Quách Gia', 'Phan Phượng', 'Hình Đạo Vinh', 'Hác Chiêu', 'Mãn Sủng',
    'Trương Phi', 'Mã Quân', 'Vương Việt', 'Cơ Vô Thiên', 'Hứa Chử', 'Cam Ninh', 'Quan Vũ',
    'Hề Nhan', 'Tần Tứ Nghiệp', 'Đổng Vệ Đông', 'Văn Nhân Húc', 'Văn Nhân Mục', 'Trương Bất Minh', 'Mạc Thiên Tinh',
    'Lạc Thiên Thanh', 'Bùi Nguyên', 'Bùi Khuyết', 'Bùi Thế An', 'An Vũ Hi', 'An Quân Thương', 'An Đức Lộc',
    'Phó Thương Quân', 'Phó Dĩnh Thăng', 'Cung Ngạo', 'Cung Sinh', 'Tri Mặc Bạch', 'Triệu Chân', 'Từ Thiên Huyền',
    'Xích Hồng Y', 'Quỷ Thánh', 'Thăng', 'Triệu Thiên Lỗi', 'Lê Trọng', 'Trầm Hạo', 'Trầm Căn', 'Đào Nhã',
    'Ninh An', 'Hoa Chấn Viễn', 'Huyết Tùng', 'Cơ Vô Pháp', 'Vu Văn Châu', 'Vệ Ti Vũ', 'Lý Nho', 'Chu Thái',
    'Cao Thuận', 'Khúc Nghĩa', 'Liêu Hóa', 'Chu Thương', 'Hoa Hùng', 'Mã Tắc', 'Trương Xương Minh', 'Trầm Quát',
    'Vương Viễn', 'Tống Dương', 'Lý Tiểu Đao', 'Hướng Hạo Thiên', 'Tiêu Tuế', 'Ngao Phỉ', 'Cẩu Phú Quý',
    'Quý Sơn Hà', 'Vân Ninh', 'Bạch Thúc Băng', 'Trương Hiên Chính', 'Tần Ức', 'Mạc Ý', 'Bí Đao', 'Liễu Khinh Ngôn'
]

char_first_seen = {}
char_appearances = Counter()

for c in range(301, 601):
    data = read_ch(c)
    content = data['content']
    for ch_name in known_chars:
        if ch_name in content:
            char_appearances[ch_name] += 1
            if ch_name not in char_first_seen:
                char_first_seen[ch_name] = c

print(f"Tracked {len(known_chars)} known characters across Ch.301-600:")
for ch_name, count in char_appearances.most_common():
    print(f"  {ch_name}: {count} chapters (first in Ch.{char_first_seen[ch_name]})")
