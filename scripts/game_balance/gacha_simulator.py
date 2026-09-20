import argparse
import random
import statistics
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

def simulate_pulls(runs, p_base=0.006, t_soft=74, t_hard=90, ramp=0.06):
    pulls_to_first_ssr = []
    total_pulls_all = 0
    ssr_count_all = 0
    
    for _ in range(runs):
        pulls = 0
        pity = 0
        guaranteed = False
        ssr_obtained = False
        
        while not ssr_obtained:
            pulls += 1
            total_pulls_all += 1
            pity += 1
            
            # Tính tỷ lệ ra SSR
            current_prob = p_base
            if pity >= t_soft:
                current_prob += (pity - t_soft + 1) * ramp
            if pity >= t_hard:
                current_prob = 1.0
                
            if random.random() < current_prob:
                ssr_count_all += 1
                # Trúng SSR, check 50/50
                is_featured = True if guaranteed else (random.random() < 0.5)
                
                if not is_featured:
                    guaranteed = True
                    pity = 0
                else:
                    ssr_obtained = True
                    pulls_to_first_ssr.append(pulls)
                    
    # Thống kê
    avg_pulls = sum(pulls_to_first_ssr) / len(pulls_to_first_ssr)
    median_pulls = statistics.median(pulls_to_first_ssr)
    
    sorted_pulls = sorted(pulls_to_first_ssr)
    p95_pulls = sorted_pulls[int(len(sorted_pulls) * 0.95)]
    
    consol_rate = ssr_count_all / total_pulls_all
    
    print(f"--- KẾT QUẢ MÔ PHỎNG GACHA (Bái Tướng Đài) ---")
    print(f"Số lần chạy mô phỏng: {runs}")
    print(f"Trung bình số lượt kéo ra 1 SSR rate-up: {avg_pulls:.2f}")
    print(f"Trung vị số lượt kéo ra 1 SSR rate-up: {median_pulls}")
    print(f"Percentile 95% (số lượt tối đa cho 95% người chơi): {p95_pulls}")
    print(f"Tỷ lệ hợp nhất (Consolidated Rate): {consol_rate * 100:.2f}%\n")
    
    # F2P Income Analysis
    pulls_per_week = 65 / 6
    weeks_to_ssr = avg_pulls / pulls_per_week
    print("--- PHÂN TÍCH F2P ---")
    print(f"Giả định: 65 lượt kéo mỗi 6 tuần ({pulls_per_week:.2f} lượt/tuần)")
    print(f"Thời gian trung bình để F2P lấy 1 SSR rate-up: {weeks_to_ssr:.2f} tuần")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Mô phỏng Gacha - Bái Tướng Đài")
    parser.add_argument('--runs', type=int, default=10000, help="Số lần mô phỏng")
    parser.add_argument('--banner', type=str, default='trieu_van', help="Tên banner")
    args = parser.parse_args()
    
    print(f"Đang chạy mô phỏng banner {args.banner} với {args.runs} lần...")
    simulate_pulls(args.runs)
