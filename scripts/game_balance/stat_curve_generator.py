import argparse
import json
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

HEROES = [
    {"name": "Triệu Vân", "rarity": "SSR", "base": {"Force": 96, "Command": 91, "Int": 76, "Pol": 65, "HP": 180, "ATK": 102}},
    {"name": "Điển Vi", "rarity": "SSR", "base": {"Force": 99, "Command": 72, "Int": 35, "Pol": 25, "HP": 220, "ATK": 115}},
    {"name": "Giả Hủ", "rarity": "SSR", "base": {"Force": 45, "Command": 65, "Int": 97, "Pol": 88, "HP": 120, "ATK": 55}},
    {"name": "Cao Thuận", "rarity": "SR", "base": {"Force": 82, "Command": 78, "Int": 52, "Pol": 40, "HP": 190, "ATK": 88}},
    {"name": "Lý Nho", "rarity": "SR", "base": {"Force": 55, "Command": 60, "Int": 85, "Pol": 72, "HP": 140, "ATK": 62}}
]

def calculate_stat(base_val, level, rarity, lmax=80):
    # TierMult
    tier_mult = 1.5 if rarity == "SSR" else 1.2
    alpha = 0.8 # Hệ số cong
    
    # Tính growth
    growth = base_val * (1 + tier_mult * (((level - 1) / (lmax - 1)) ** alpha))
    
    # Ascension bonus (20, 40, 60, 80)
    ascensions = level // 20
    bonus = ascensions * (base_val * 0.1)
    
    return int(growth + bonus)

def generate_curves():
    levels_to_check = [1, 10, 20, 30, 40, 50, 60, 70, 80]
    results = {}
    
    for hero in HEROES:
        hero_name = hero['name']
        rarity = hero['rarity']
        base = hero['base']
        
        hero_data = {}
        table_data = []
        
        for lvl in levels_to_check:
            stats = {
                k: calculate_stat(v, lvl, rarity) for k, v in base.items()
            }
            hero_data[lvl] = stats
            table_data.append([
                lvl, stats['Force'], stats['Command'], stats['Int'], stats['Pol'], stats['HP'], stats['ATK']
            ])
            
        results[hero_name] = hero_data
        
        print(f"\n--- BẢNG CHỈ SỐ: {hero_name} ({rarity}) ---")
        headers = ["Cấp độ", "Võ Lực", "Thống Soái", "Trí Lực", "Chính Trị", "HP", "ATK"]
        print(tabulate(table_data, headers=headers, tablefmt="grid"))
        
    # Lưu JSON
    with open('stat_curves.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("\nĐã xuất dữ liệu ra file stat_curves.json")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Tạo đường cong chỉ số Tướng (Stat Curve Generator)")
    args = parser.parse_args()
    generate_curves()
