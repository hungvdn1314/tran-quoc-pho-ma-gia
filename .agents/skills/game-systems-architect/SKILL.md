---
name: game-systems-architect
description: >-
  Skill thiết kế hệ thống game chuyên nghiệp cho thể loại hybrid (Visual Novel + Grand Strategy + Card Battler + Gacha).
  Sử dụng khi cần thiết kế core loop, progressive feature unlock, branching narrative architecture,
  hoặc viết Feature Design Document (FDD) / System Design Document (SDD) cho các tính năng game.
  Áp dụng framework MDA (Mechanics-Dynamics-Aesthetics), Elemental Tetrad (Jesse Schell),
  và các design patterns từ Slay the Spire, Fate/Stay Night, 13 Sentinels, Arknights, Total War: Three Kingdoms.
---

# Game Systems Architect Skill

Quy trình thiết kế và cấu trúc hóa các hệ thống game (Game Systems Design) cho dự án
hybrid Visual Novel + Grand Strategy + Tactical Card Battler + Gacha Hero Collection.

---

## Triết Lý Thiết Kế Cốt Lõi

### 1. Systemic Cohesion (Sự Kết Nối Hệ Thống)
Mọi hệ thống con (VN narrative, strategy map, card battler, gacha) **PHẢI** ăn khớp
vào một vòng lặp chiến lược thống nhất (Unified Strategic Loop):

```
VISUAL NOVEL (Chuyện Triều Đình)
  │ Flags, Affinities, Decrees
  ▼
GRAND STRATEGY (Đế Nghiệp Sa Bàn)
  │ Territories, Resources, Supply Lines
  ▼
TACTICAL CARD BATTLER (Sa Trường Thẻ Bài)
  │ Victory Spoils, Casualties, Captured Officers
  ▼
  └──────────────── back to VN (New chapter, court consequences)
```

### 2. Progressive Disclosure (Mở Khóa Dần Dần)
Tham chiếu: Genshin Impact Adventure Rank, Arknights PRTS, AFK Arena Stage Gating.

- **Phase 1 (0-20 phút)**: Chỉ VN narrative thuần túy. Zero UI complexity.
- **Phase 2 (1-5 giờ)**: Mở core growth loop (Gacha, Card Upgrade, Basic Map).
- **Phase 3 (6+ giờ)**: Metagame sovereignty (Multi-front war, Alliances, PvP).

### 3. Mutual Gating (Khóa Chéo Giữa Các Tầng)
Tham chiếu: 13 Sentinels: Aegis Rim Tri-Pillar Architecture.

- Tiến bộ VN cần chiến thắng trên Card Battler (giải phóng tù nhân, chiếm thành).
- Tiến bộ Strategy Map cần ngoại giao/tình báo từ VN (hiệp ước, thám thính).
- Tiến bộ Card Battler cần hậu cần từ Strategy Map (quân lương, khí giới).

---

## Quy Trình Thiết Kế Feature (Feature Design Pipeline)

### Bước 1: Xác Định Trải Nghiệm Mục Tiêu (Target Experience)
Dùng 8 Aesthetics của MDA framework (LeBlanc):
- **Fantasy**: Nhập vai Phò mã hàn vi mưu lược xưng đế.
- **Challenge**: Cân bằng giữa bành trướng và áp lực triều đình.
- **Narrative**: Khám phá bí mật chính trị, quan hệ nhân vật.
- **Discovery**: Chiêu mộ danh tướng Tam Quốc mới.
- **Submission**: Chu kỳ thu thập tài nguyên theo lượt.

### Bước 2: Viết Feature Design Document (FDD)
Mỗi FDD tuân theo format chuẩn:

```markdown
# FDD-[ID]: [Tên Tính Năng]

## Mục Tiêu Trải Nghiệm (Player Fantasy)
Mô tả cảm xúc mục tiêu khi người chơi sử dụng tính năng này.

## User Story
"Là một [vai trò], tôi muốn [hành động] để [kết quả mong muốn]."

## Luồng Trải Nghiệm (UX Flow)
1. Trigger: Điều kiện kích hoạt tính năng.
2. Core Interaction: Chuỗi tương tác chính.
3. Resolution: Kết quả và phản hồi.

## Kết Nối Hệ Thống (System Hooks)
- Input từ hệ thống nào? (VN flags, Map state, Card inventory)
- Output ảnh hưởng hệ thống nào?

## Cân Bằng & Tham Số (Balance Parameters)
Bảng tham số có thể điều chỉnh (tunable constants).

## Edge Cases & Failure States
Các trường hợp biên và trạng thái lỗi cần xử lý.

## Điều Kiện Mở Khóa (Unlock Prerequisite)
Chương truyện / Imperial Prestige Level cần thiết.
```

### Bước 3: Viết System Design Document (SDD)
Cho các hệ thống phức tạp (Combat Engine, Economy, AI):

```markdown
# SDD-[ID]: [Tên Hệ Thống]

## Kiến Trúc Tổng Quan (Architecture)
Sơ đồ state machine hoặc flowchart.

## Quy Tắc Cứng (Hard Rules)
Công thức toán, bảng tra, thứ tự giải quyết (resolution order).

## Mô Hình Dữ Liệu (Data Schema)
Pydantic / JSON Schema cho entities.

## AI Behavior (nếu có)
Utility AI considerations, behavior trees, intent telegraphing.

## Tích Hợp Với Các Hệ Thống Khác
Dependency graph giữa các SDD.
```

---

## Design Patterns Tham Chiếu

### A. Branching Narrative Patterns
Tham khảo chi tiết: [references/narrative_patterns.md](./references/narrative_patterns.md)

| Pattern | Ví dụ | Khi nào dùng |
| :--- | :--- | :--- |
| **Foldback Diamond** | Fate/Stay Night | Tạo cảm giác agency nhưng kiểm soát scope |
| **Diegetic Choice** | Steins;Gate Phone Triggers | Hội thoại tự nhiên không phá vỡ immersion |
| **Dual-Phase Loop** | Phoenix Wright | Xen kẽ Investigation ↔ Combat |
| **Tri-Pillar Mutual Gating** | 13 Sentinels | 3 mode game khóa chéo tiến trình |
| **Fact-Based State Machine** | Honkai: Star Rail | Dialogue driven by world-state queries |
| **Delayed Consequence** | Steins;Gate | Flag đặt sớm, payoff nhiều chương sau |

### B. Combat System Patterns
Tham khảo chi tiết: [references/combat_patterns.md](./references/combat_patterns.md)

| Pattern | Ví dụ | Khi nào dùng |
| :--- | :--- | :--- |
| **Intent Telegraphing** | Slay the Spire | Biến combat thành puzzle optimization |
| **Input Randomness** | Slay the Spire | Ngẫu nhiên ở đầu vào, deterministic output |
| **Lane Segmentation** | PvZ, Artifact | Phân chia không gian chiến thuật |
| **Deck Thinning** | StS, Monster Train | Tối ưu hóa deck efficiency |
| **Zhanfa Heritage** | 三国志战略版 | Sacrifice dupes → extractable tactic cards |
| **Cost-Gated Formation** | 三国志战略版 | Command limit prevents all-legendary teams |

### C. Progression & Economy Patterns
Tham khảo chi tiết: [references/economy_patterns.md](./references/economy_patterns.md)

| Pattern | Ví dụ | Khi nào dùng |
| :--- | :--- | :--- |
| **Soft Pity Ramp** | Genshin Impact | Gacha fairness without hard ceiling feel |
| **50/50 Dual-Stage** | Genshin/HSR | Rate-up guarantee khi thua 50/50 |
| **Sawtooth Difficulty** | Slay the Spire | Tension → Boss → Relief → New Mechanic |
| **Exponential Cost Sink** | Most gacha RPGs | Prevent late-game resource hoarding |
| **Zero-Loss Respec** | 三国志幻想大陆 | Eliminate sunk-cost anxiety |
| **Seasonal Reset** | 率土之滨 | Prevent endgame stagnation in SLG |

---

## Công Thức Toán Học Tham Chiếu Nhanh

### Damage Formula (Diminishing Returns Armor)
```
DamageMultiplier = 100 / (100 + Armor)
```

### Card Power Budget
```
Cost = 0.5 × Damage + 0.4 × Shield + UtilityFactor
```

### Stat Growth Curve
```
Stat(L) = Base × (1 + TierMultiplier × ((L-1)/(Lmax-1))^α) + ΣAscensionBonuses
```
- α = 1.0: Linear growth
- α = 1.15-1.3: Convex growth (late levels reward more)

### Gacha Pity (Soft Pity Ramp)
```
P(k) = P_base                                    for 1 ≤ k < T_soft
P(k) = P_base + (k - T_soft + 1) × λ            for T_soft ≤ k < T_hard
P(k) = 1.0                                       for k = T_hard
```

### Exponential Upgrade Cost
```
Cost(L) = BaseCost × (1 + r)^(L-1)    where r ∈ [0.12, 0.20]
```

---

## Checklist Kiểm Tra Chất Lượng Thiết Kế

Trước khi finalize bất kỳ feature nào, kiểm tra:

- [ ] **Systemic Hook**: Tính năng có kết nối với ít nhất 2 hệ thống khác?
- [ ] **Progressive Unlock**: Có thời điểm mở khóa rõ ràng trong cốt truyện?
- [ ] **Meaningful Choice**: Người chơi có ít nhất 2 lựa chọn chiến lược khác biệt?
- [ ] **Failure State**: Có trạng thái thất bại đẹp (fail-forward) thay vì Game Over?
- [ ] **Balance Formula**: Có công thức toán cụ thể cho các tham số?
- [ ] **Telemetry Hook**: Có thể đo lường engagement của tính năng?
- [ ] **Lore Grounding**: Tính năng có cơ sở trong cốt truyện nguyên tác?
