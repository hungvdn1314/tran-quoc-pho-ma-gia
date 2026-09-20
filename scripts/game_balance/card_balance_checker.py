import json
import argparse
import sys

try:
    from tabulate import tabulate
except ImportError:
    def tabulate(tabular_data, headers=(), tablefmt="plain"):
        res = []
        if headers:
            res.append("\t".join(str(h) for h in headers))
            res.append("-" * 40)
        for row in tabular_data:
            res.append("\t".join(str(c) for c in row))
        return "\n".join(res)

CARDS_DATA = [
    {"name": "Thất Thám Bàn Xà", "mana": 2, "damage": 120, "shield": 0, "heal": 0, "utility": 10},
    {"name": "Hãm Trận Doanh", "mana": 3, "damage": 0, "shield": 80, "heal": 0, "utility": 20},
    {"name": "Xả Lũ Thanh Thủy", "mana": 4, "damage": 130, "shield": 0, "heal": 0, "utility": 30},
    {"name": "Bạch Mã Xung Phong", "mana": 2, "damage": 70, "shield": 0, "heal": 0, "utility": 15},
    {"name": "Cung Thủ Thủ Thành", "mana": 1, "damage": 35, "shield": 0, "heal": 0, "utility": 10},
    {"name": "Tường Thành Cao Lâm", "mana": 0, "damage": 0, "shield": 100, "heal": 0, "utility": 5},
    {"name": "Nội Ứng Khai Môn", "mana": 3, "damage": 0, "shield": 0, "heal": 0, "utility": 40},
    {"name": "Mưu Kế Phản Gián", "mana": 2, "damage": 0, "shield": 0, "heal": 0, "utility": 35}
]

def analyze_cards():
    table_data = []
    
    for card in CARDS_DATA:
        budget = 0.5 * card['damage'] + 0.4 * card['shield'] + 0.3 * card['heal'] + card['utility']
        # Tránh lỗi chia cho 0 với card 0 mana
        limit = 50 * max(1, card['mana']) if card['mana'] > 0 else 25 
        
        ratio = budget / limit
        status = "CÂN BẰNG"
        if ratio > 1.2:
            status = "OVERTUNED (Quá mạnh)"
        elif ratio < 0.6:
            status = "UNDERTUNED (Quá yếu)"
            
        table_data.append([
            card['name'], card['mana'], card['damage'], card['shield'], card['utility'],
            f"{budget:.1f}", f"{limit}", f"{ratio*100:.1f}%", status
        ])
        
    headers = ["Tên Thẻ", "Mana", "ST", "Giáp", "Đa dụng", "Ngân sách (Tính)", "Giới hạn (Limit)", "Tỷ lệ", "Trạng thái"]
    print("--- PHÂN TÍCH CÂN BẰNG THẺ CHIẾN THUẬT ---")
    print(tabulate(table_data, headers=headers, tablefmt="grid"))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Kiểm tra cân bằng thẻ (Card Balance Checker)")
    args = parser.parse_args()
    analyze_cards()
