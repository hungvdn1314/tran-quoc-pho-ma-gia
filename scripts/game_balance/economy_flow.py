import argparse
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

def simulate_economy():
    gold = 0
    jade = 0
    rations = 0
    soul_shards = 0
    
    history = []
    
    for chapter in range(1, 53):
        income_gold = 0
        income_jade = 0
        income_rations = 0
        income_shards = 0
        
        # Faucets
        if chapter == 1:
            income_gold += 100
            income_shards += 1
        if chapter == 5:
            income_gold += 200
            income_jade += 10
        if chapter >= 8:
            income_gold += 3000 # Income xà phòng mỗi turn
        if chapter == 15:
            income_gold += 5000
            income_jade += 20
        if chapter == 27:
            income_gold += 20000
            income_jade += 15
        if chapter == 43:
            income_rations += 50000
            income_jade += 10
        if 48 <= chapter <= 52:
            income_gold += 20000
            income_rations += 50000
            
        gold += income_gold
        jade += income_jade
        rations += income_rations
        soul_shards += income_shards
        
        # Sinks mô phỏng (tùy ý tiêu hao)
        expense_gold = 0
        if chapter % 10 == 0:
            expense_gold += 10000 # Nuôi quân
            
        gold -= expense_gold
        
        history.append([
            f"Ch.{chapter}", income_gold, income_jade, expense_gold, 
            gold, jade, rations, soul_shards
        ])
        
    headers = ["Chương", "Vàng (Thu)", "Ngọc (Thu)", "Vàng (Chi)", "Vàng (Tồn)", "Ngọc (Tồn)", "Lương thảo", "Hồn Lệnh"]
    print("--- MÔ PHỎNG DÒNG CHẢY KINH TẾ QUA CÁC CHƯƠNG ---")
    print(tabulate(history, headers=headers, tablefmt="grid"))
    
    print("\n--- PHÂN TÍCH TỔNG QUAN ---")
    print(f"Tổng Ngọc kiếm được (F2P): {jade}")
    print(f"Số lượt Gacha tối đa: {jade // 160} lượt")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Mô phỏng Kinh tế (Economy Flow)")
    args = parser.parse_args()
    simulate_economy()
