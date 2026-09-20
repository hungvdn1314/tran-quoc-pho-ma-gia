---
name: game-economy-balancer
description: >-
  Skill mô phỏng và cân bằng kinh tế game bao gồm: Gacha pity system simulation,
  card power budget calculation, resource faucet/sink flow analysis, difficulty curve
  generation, và hero stat growth curves. Sử dụng khi cần tính toán tỷ lệ gacha,
  kiểm tra cân bằng thẻ bài, thiết kế đường cong tiến trình, hoặc mô phỏng
  Monte Carlo cho hệ thống kinh tế. Output là Python scripts + JSON config data.
---

# Game Economy Balancer Skill

Quy trình mô phỏng, tính toán, và cân bằng các hệ thống kinh tế / gacha / combat
cho dự án game hybrid Visual Novel + Grand Strategy + Card Battler.

---

## Khi Nào Sử Dụng Skill Này

1. **Thiết kế Gacha Banner**: Tính toán pity rates, pull distribution, F2P income
2. **Cân bằng Card Stats**: Power budget cho từng lá bài, damage/shield trade-off
3. **Mô phỏng Resource Flow**: Kiểm tra lạm phát vàng, thiếu hụt lương thảo
4. **Difficulty Curve**: Thiết kế đường cong độ khó cho campaign chapters
5. **Hero Stat Tables**: Sinh bảng chỉ số tướng chuẩn hóa từ dữ liệu tiểu thuyết

---

## Quy Trình Thực Hiện

### Bước 1: Xác định Mục Tiêu Mô Phỏng
Xác định rõ câu hỏi cần trả lời:
- "Trung bình F2P cần bao nhiêu ngày để rút được SSR Triệu Vân?"
- "Thẻ Thất Thám Bàn Xà có bị OP không ở chi phí 2 Mana?"
- "Kinh tế có bị lạm phát sau Chapter 15 khi mở Thấu Hoa Cao?"

### Bước 2: Chọn Template Mô Phỏng
Dùng scripts trong thư mục `scripts/` của skill này:

| Script | Chức năng |
| :--- | :--- |
| `gacha_simulator.py` | Monte Carlo gacha pulls (10,000 runs) |
| `card_balance_checker.py` | Power budget analysis cho deck |
| `economy_flow.py` | Resource faucet/sink tracking over N turns |
| `stat_curve_generator.py` | Hero stat growth tables |
| `difficulty_curve.py` | Chapter difficulty progression |

### Bước 3: Nhập Tham Số Từ Game Data
Đọc dữ liệu từ:
- `data/game_bible_v2/characters.json` → Base stats nhân vật
- `data/chapter_feature_unlock_matrix.json` → Unlock timeline
- Config files trong `data/game_config/` → Balance parameters

### Bước 4: Chạy Mô Phỏng & Phân Tích
```bash
cd scripts
python gacha_simulator.py --runs 10000 --banner "trieu_van_ssr"
python card_balance_checker.py --deck-file ../data/game_config/cards.json
python economy_flow.py --chapters 1-52 --config ../data/game_config/economy.json
```

### Bước 5: Xuất Kết Quả & Điều Chỉnh
Output dạng:
- Console report với statistics
- JSON config files đã cân bằng
- Matplotlib charts (nếu cần visual)

---

## Template Cấu Hình Kinh Tế

### Gacha Banner Config
```json
{
  "banner_id": "bai_tuong_dai_v1",
  "banner_name": "Bái Tướng Đài - Mùa 1",
  "rates": {
    "SSR": 0.006,
    "SR": 0.051,
    "R": 0.943
  },
  "pity": {
    "soft_pity_start": 74,
    "hard_pity": 90,
    "ramp_per_pull": 0.06,
    "featured_rate_up": 0.5,
    "guarantee_after_loss": true
  },
  "featured_heroes": ["trieu_van"],
  "standard_pool": ["dien_vi", "gia_hu", "dieu_thuyen"]
}
```

### Card Balance Config
```json
{
  "card_id": "that_tham_ban_xa",
  "card_name": "Thất Thám Bàn Xà",
  "rarity": "SSR",
  "mana_cost": 2,
  "effects": {
    "damage": 120,
    "interrupt_intent": true,
    "target": "single_strongest"
  },
  "power_budget": {
    "damage_weight": 0.5,
    "utility_weight": 0.3,
    "calculated_budget": 90,
    "budget_limit_at_cost_2": 100,
    "is_balanced": true
  }
}
```

### Economy Flow Config
```json
{
  "currencies": {
    "gold": {"initial": 0, "cap": null},
    "jade": {"initial": 0, "cap": null},
    "rations": {"initial": 180, "cap": 180, "regen_per_min": 0.167}
  },
  "faucets_per_chapter": {
    "ch1": {"gold": 100, "jade": 0, "items": ["anh_hon_lenh"]},
    "ch5": {"gold": 200, "jade": 10},
    "ch8": {"gold": 3000, "jade": 5, "recurring": {"gold_per_turn": 3000}},
    "ch15": {"gold": 5000, "jade": 20, "ap_per_turn": 3}
  },
  "sinks": {
    "card_upgrade_base": 500,
    "card_upgrade_rate": 0.15,
    "troop_recruitment": 1000,
    "bribe_court": 1500,
    "gacha_pull_cost": {"jade": 160}
  }
}
```

---

## Công Thức Cân Bằng Tham Chiếu Nhanh

### Gacha Expected Value
```python
# Soft pity ramp
def pull_probability(k, p_base=0.006, t_soft=74, t_hard=90, lam=0.06):
    if k < t_soft:
        return p_base
    elif k < t_hard:
        return p_base + (k - t_soft + 1) * lam
    else:
        return 1.0
```

### Diminishing Returns Armor
```python
def damage_multiplier(armor):
    return 100.0 / (100.0 + armor)
```

### Exponential Upgrade Cost
```python
def upgrade_cost(level, base=500, rate=0.15):
    return base * (1 + rate) ** (level - 1)
```

### Hero Stat at Level
```python
def stat_at_level(base, level, level_max=80, tier_mult=1.5, alpha=1.2):
    return base * (1 + tier_mult * ((level - 1) / (level_max - 1)) ** alpha)
```

---

## Tiêu Chí Cân Bằng (Balance Acceptance Criteria)

- [ ] F2P player nhận được 1 SSR mỗi 6-8 tuần chơi
- [ ] Card win rate dao động 45-55% cho mỗi archetype
- [ ] Không có card nào vượt power budget > 120% ở bất kỳ cost nào
- [ ] Gold economy không lạm phát > 20% per chapter sau Ch.15
- [ ] Soft wall: Player có thể beat content under-level 5 bằng strategy
- [ ] Sawtooth: Difficulty drops 30-40% sau mỗi Boss chapter
