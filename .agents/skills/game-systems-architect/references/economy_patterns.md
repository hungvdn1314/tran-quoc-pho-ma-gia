# Economy & Progression Design Patterns Reference

Tài liệu tham chiếu cho thiết kế kinh tế game, hệ thống gacha,
đường cong tiến trình, và content pacing chuyên nghiệp.

---

## 1. Faucet & Sink Architecture (Nguồn & Bồn Tài Nguyên)
**Nguồn**: Machinations.io, Game Economy Design Best Practices

### Multi-Currency Architecture
| Currency | Volume | Sources (Faucets) | Sinks (Drains) |
| :--- | :--- | :--- | :--- |
| **Soft (Vàng/Đồng)** | High velocity | Thuế lãnh thổ, chiến thắng, thương mại | Tuyển quân, nâng cấp bài, sửa thành |
| **Hard (Ngọc/Kim Bảo)** | Strictly metered | First-time chapter clear, daily missions | Gacha banners, stamina refill, cosmetics |
| **Stamina (Lương Thảo)** | Time-gated | Regen 1/6 min (240/day), cap 180 | Map excursions (15-30), farming |
| **Scrap (Mảnh Hồn)** | Recycling | Disassemble duplicate cards/heroes | Exchange shop, targeted item purchase |

### F2P vs Whale Balance
- F2P: ~65 pulls per 6-week cycle → 1 SSR guaranteed every ~1.5 cycles
- Whale advantage capped at ≤15% combat disparity over maxed F2P
- Monetize via horizontal variations, NOT vertical stat domination

---

## 2. Gacha Pity System Mathematics
**Nguồn**: Monte Carlo Simulation, Genshin/HSR reverse-engineering

### Piecewise Truncated Geometric Model
```
P(k) = P_base                                    for 1 ≤ k < T_soft
P(k) = P_base + (k - T_soft + 1) × λ            for T_soft ≤ k < T_hard
P(k) = 1.0                                       for k = T_hard
```

### Genshin/HSR Standard Parameters
| Parameter | Value |
| :--- | :--- |
| P_base | 0.6% (0.006) |
| T_soft (soft pity start) | 74 |
| λ (ramp slope per pull) | ~6.0% |
| T_hard (hard guarantee) | 90 |
| Effective consolidated rate | ~1.605% |
| Most 5★ pulled between | Pull 75-82 |

### 50/50 Dual-Stage Guarantee
1. First SSR pull: 50% chance = featured character
2. If "lost 50/50" (got standard pool character):
   next SSR is **100% guaranteed** to be featured
3. Guarantee state persists across banner rotations

### Sparking / Mileage Currency (Granblue Fantasy Model)
- Every pull awards 1 "Spark Token"
- At 200-300 tokens: directly purchase any featured hero
- Absolute hard spending ceiling → protects player trust

---

## 3. Hero Stat Growth Curves
**Nguồn**: KOEI Romance of Three Kingdoms, miHoYo systems

### Stat Progression Formula
```
Stat(L) = Base × (1 + TierMultiplier × ((L-1)/(Lmax-1))^α) + ΣAscensionBonuses
```
| α value | Growth type | Use case |
| :--- | :--- | :--- |
| 1.0 | Linear | Low-tier stats, predictable |
| 1.15-1.3 | Convex | Late levels reward more investment |

### Ascension / Breakthrough System
Level cap every 10-20 levels (20/40/60/80). Ascending requires:
1. Specific boss materials (stamina sink)
2. Faction-specific insignia (promotes team diversity)
3. New Combat Talent/Passive Card unlocked (not just raw numbers)

### Three Kingdoms Five Classical Attributes
| Attribute | Campaign Function | Battle Function |
| :--- | :--- | :--- |
| Force (武力/Võ Lực) | Bandit suppression, training speed | Duel damage, charge power |
| Command (统率/Thống Soái) | Garrison defense, conscription | Troop ATK/DEF, march speed |
| Intelligence (智力/Trí Lực) | Counter-espionage, plot success | Stratagem accuracy & resistance |
| Politics (政治/Chính Trị) | Agri/Commerce yields, infrastructure | City repair rate, public order |
| Charisma (魅力/Uy Vọng) | Recruitment, civilian pacification | Aura buffs, persuasion |

### Advisor 100-INT Threshold
```
Prediction Certainty = min(1.0, Intelligence / 100)
```
- INT ≥ 100: Forecast is 100% accurate truth
- INT < 100: Noise error margin inversely proportional to INT

---

## 4. Exponential Cost Curves (Chống Tích Trữ)
**Nguồn**: Game Economy Balancing Best Practices

### Power Formula
```
Cost(L) = BaseCost × (1 + r)^(L-1)     where r ∈ [0.12, 0.20]
```
hoặc
```
Cost(L) = BaseCost × L^α               where α ≈ 1.8 to 2.4
```

### Sink Elasticity
| Loại Sink | Ví dụ | Late-game behavior |
| :--- | :--- | :--- |
| Inelastic (flat) | 500 gold hospital | Trivial → useless |
| Elastic (%) | 5% total wealth tax | Scales with player → evergreen |

### Card Power Budget Formula
```
Cost = 0.5 × Damage + 0.4 × Shield + UtilityFactor
```
Mỗi lá bài có "ngân sách sức mạnh" cố định.
Nếu Damage cao → Shield phải thấp (hoặc tăng Mana cost).

---

## 5. Content Pacing: Sawtooth Difficulty Curve
**Nguồn**: Csikszentmihalyi Flow State, Game Developer articles

### The Wave Pattern
```
Difficulty
  ^
  |        /\              /\
  |       /  \            /  \
  |      /    \  (Relief)/    \
  |     /      \__/\    /      \
  |    /   Boss 1   \  /   Boss 2
  |   /              \/
  +-----------------------------------> Progression
```

### Nguyên tắc
1. Ramp difficulty stages 1-4
2. Climax Boss at stage 5
3. **Immediate difficulty drop** at stage 6 (new biome/mechanic intro)
4. Player consolidates new tools, experiences mastery
5. Next ramp begins

### Soft Wall vs Hard Wall
| Loại | Ví dụ | Player feel |
| :--- | :--- | :--- |
| **Hard Wall** | "Requires Level 45" | Frustration, arbitrary |
| **Soft Wall** | Enemies resist normal attacks, need specific counter | Accomplishment if beaten under-level |

### Vertical vs Horizontal Progression
| Loại | Ví dụ | Risk |
| :--- | :--- | :--- |
| Vertical | +15% ATK, +20% HP | Power creep, invalidates old content |
| Horizontal | New mechanics, alt build paths | Requires more design work |

**Best practice**: Steep vertical early (onboarding dopamine),
predominantly horizontal mid-to-late (strategic depth).

---

## 6. Imperial Prestige Unlock Architecture
Thiết kế riêng cho Trấn Quốc Phò Mã Gia.

### Cấp bậc & Mở khóa
| Rank | Tên | Story Milestone | Strategy Unlock | Card Unlock | Social Unlock |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | Thư Sinh | Ch.1: Đối thơ | District view only | Fixed starter deck (10 cards) | Basic VN choices |
| 2 | Phò Mã | Ch.5: Gacha | Local map + basic tax | Deck customization, card upgrade | Affinity gifts |
| 3 | Tiết Độ Sứ | Ch.15: Bắc Chinh | Troop movement, supply | **Gacha summoning** | Intelligence network |
| 4 | Chinh Bắc Đại Tướng | Ch.27: Giả Hủ | Regional treaties | Tactic inheritance (Zhanfa) | Court debate |
| 5 | Hoàng Đế | Ch.386: Đăng cơ | Continental war | Legendary formations | Multi-route dynasty |

### Overlapping Async Progression ("One More Turn")
Tham chiếu: Sid Meier's Civilization.
Xen kẽ nhiều timer hoàn thành khác nhau:
- Tech upgrade: 1 turn
- Building: 3 turns
- Unit: 4 turns
- Border expansion: 2 turns

→ Tại bất kỳ ranh giới turn nào, người chơi luôn cách 1 milestone
chỉ 1 turn → KHÔNG BAO GIỜ muốn dừng.

---

## 7. Suspicion Meter (Thanh Nghi Kỵ Vũ Hoàng)
Cơ chế đặc thù thiết kế riêng.

### Tham chiếu: Crusader Kings III Stress System
Paradox giải quyết disconnect giữa roleplay vs min-max bằng Stress.
Hành động trái tính cách → Stress tăng → Mental Break → Coping Mechanisms.

### Áp dụng cho Nghi Kỵ
Mọi hành động bành trướng quân sự → tăng Nghi Kỵ.
Nghi Kỵ quá cao (>80%) → Emperor Crackdown (mất quyền, quân phản).

### Công thức
```
Nghi Kỵ tăng = BaseSuspicion × (1 + MilitaryExpansionFactor)
Nghi Kỵ giảm = BribeAmount × (CorruptionMultiplier / ImperialIntegrity)
```

### Sinks cho Nghi Kỵ
- Dâng nạp xà phòng Thấu Hoa Cao
- Hối lộ hoạn quan (gold sink)
- Cống nạp mỹ nhân/châu báu
- Lập công trạng "vì triều đình"

### Dynamic: Người chơi phải cân bằng
Mở rộng lãnh thổ (cần thiết) nhưng giữ Nghi Kỵ < 60%
cho tới ngày Đăng Cơ Xưng Đế (Ch.386).
