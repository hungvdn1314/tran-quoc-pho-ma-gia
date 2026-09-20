# Combat & Card System Design Patterns Reference

Tài liệu tham chiếu chi tiết cho thiết kế hệ thống combat thẻ bài chiến thuật,
trích xuất từ Slay the Spire, Auto Chess, PvZ, Three Kingdoms SLG, và GDC Talks.

---

## 1. Intent Telegraphing System (Hệ Thống Dự Báo Ý Đồ Kẻ Địch)
**Nguồn**: Slay the Spire — Anthony Giovannetti (GDC 2019)

### Nguyên tắc Input vs Output Randomness
- **Output Randomness** (truyền thống): "50% hit", "2-8 damage" → gây frustration
- **Input Randomness** (Slay the Spire): Cards drawn & enemy intents random,
  nhưng effects 100% deterministic khi played → biến combat thành **puzzle optimization**

### Kiến trúc AI Decoupled
```
1. Pre-Turn: Enemy evaluates state → Commits action icon
   (Attack X×Y, Defend, Buff, Debuff, Special)
2. Player Turn: Plan energy spending against KNOWN incoming damage
3. Execution: Deterministic resolution, zero surprise
```

### Micro vs Macro Tension
Mỗi turn tạo trade-off khắc nghiệt:
- **Mitigation**: Spend all energy on Block → take 0 damage this turn
- **Scaling**: Accept 12 damage → play Power card → 3× damage in 3 turns

### Ứng dụng cho Sa Trường Thẻ Bài
Mỗi đơn vị địch hiển thị ý đồ: `⚔️ Công Thành 80`, `🎯 Bắn Cung 35`,
`💥 Bạo Liệt Đao Pháp 90`. Người chơi BIẾT TRƯỚC và lên kế hoạch.

---

## 2. Deck Architecture & Thinning
**Nguồn**: Slay the Spire, Monster Train, Gordian Quest

### Toán học Deck Thinning
- Deck 30 cards, 5 draws/turn: P(draw specific card) = 5/30 = 16.7%
- Deck 10 cards, 5 draws/turn: P(draw specific card) = 5/10 = 50%

### Nguyên tắc thiết kế
1. **Card Removal Service**: Tài nguyên quý nhất = khả năng xóa bài rác
2. **Exhaust Mechanics**: In-combat deck thinning (bài tự tiêu hủy)
3. **Card Bloat Prevention**: Thêm bài mà không xóa → entropy decay

### Card Upgrade Architecture
| Loại Upgrade | Ví dụ | Hiệu quả |
| :--- | :--- | :--- |
| Linear Stat | +3 Damage, +2 Block | Ổn định sớm |
| Cost Reduction | 2 Mana → 1 Mana | **Phá vỡ action economy** (mạnh nhất) |
| Qualitative | Add Draw/Retain/Status | Thay đổi chiến thuật |
| Branching Spec | Path A: AoE+Bleed, Path B: Execute+Shield | Tạo build diversity |

---

## 3. Lane-Based Combat (Chiến Thuật Theo Làn)
**Nguồn**: Plants vs Zombies, Artifact (Valve), Teppen

### Phân đoạn không gian
Chiến trường chia 3-5 làn song song. Tài nguyên (mana/energy/AP) bị giới
hạn toàn cục qua tất cả các làn.

### Dead Lane Strategy
Chiến thuật tối ưu thường yêu cầu **chấp nhận mất 1 làn** (hy sinh tiền đồn)
để tập trung hỏa lực áp đảo ở 2 làn còn lại.

### Inter-Lane Vectoring (Tương tác giữa các làn)
Chiều sâu chiến thuật tăng khi cards tạo ảnh hưởng xuyên làn:
- Flanking charges (tấn công bọc sườn)
- Ranged bombardment (pháo kích từ làn xa)
- Tactical swap (hoán đổi vị trí)

### Ứng dụng: Sa Trường 3 Làn
```
[TẢ DỰC]  ──── Bạch Mã Nghĩa Tòng (Triệu Vân) ────  [TIỀN QUÂN ĐỊCH]
[TRUNG QUÂN] ── Hãm Trận Doanh (Cao Thuận) ──────────  [XE ĐỤC THÀNH]
[HỮU DỰC]  ──── Cung Thủ + Tường Thành ──────────────  [CUNG BINH ĐỊCH]
```

---

## 4. Zhanfa Heritage System (Chiến Pháp Truyền Thừa)
**Nguồn**: 三国志·战略版 (Three Kingdoms: Strategic Edition)

### Nguyên tắc
Tướng duplicate/không dùng → **phân hủy** → thu hoạch signature Tactic Card
→ gắn cho tướng khác.

### Cấu trúc Commander
```
Commander = [Base Stats + Intrinsic Ability]
          + [2 Flexible Teachable Skill Slots]
```

### Tactic Categories
| Loại | Khi nào trigger | Đặc điểm |
| :--- | :--- | :--- |
| Passive (被动) | Trước trận | Miễn nhiễm crowd control |
| Command (指挥) | Turn 1 | Aura ổn định baseline |
| Active (主动) | 35-50% mỗi round | Dễ bị Silence/Confusion |
| Chase (突击) | Sau normal attack | Combo finisher |

### Ứng dụng cho dự án
- Triệu Vân duplicate → Extract "Thất Thám Bàn Xà" Tactic Card
- Gắn cho tướng khác (Điển Vi) → Điển Vi có thêm kỹ năng xuyên thương
- Tạo không gian deckbuilding khổng lồ (combinatorial explosion)

---

## 5. Cost-Gated Formation (Đội Hình Giới Hạn Chi Phí)
**Nguồn**: 三国志·战略版

### Nguyên tắc
Mỗi tướng có Cost (5 đến 7.5). Formation có Max Command Capacity.
Không thể đổ 3 tướng huyền thoại vào 1 team.

### Troop Affinity Scaling
| Rank | Stat Efficiency |
| :--- | :---: |
| S | 120% |
| A | 100% |
| B | 85% |
| C | 70% |

### Ứng dụng
- Early game: Command Limit = 15 → forced creative low-cost combos
- Mid game: Command Limit = 18 → can fit 1 legendary + 2 epics
- Late game: Command Limit = 22 → 2 legendaries + 1 rare support

---

## 6. No Useless Heroes (Vô Phế Tướng)
**Nguồn**: 三国志幻想大陆 (Three Kingdoms Fantasy Land)

### Universal UR Awakening
Mọi tướng (từ R đến SSR) đều có thể thăng cấp lên UR/Vô Song
thông qua gameplay grinding. Khi đạt UR, base stat caps được
normalize ngang nhau.

### Zero-Loss Team Swapping
Resource attach to **Team Position Slot**, NOT individual hero.
Swap Tào Tháo cho Tôn Quyền → 100% level, gear, ascension chuyển
ngay lập tức, KHÔNG tốn reset token hay vàng.

### Design Benefit
- Loại bỏ "buyer's remorse" hoàn toàn
- Khuyến khích thử nghiệm meta mới
- Tướng yêu thích trong truyện vẫn competitive

---

## 7. Enemy AI Architecture
**Nguồn**: Slay the Spire, Utility AI Framework

### Utility AI with Response Curves
```
Score(Action) = w_A × Π C_i(Input_i)
```
- Considerations (C_i): Player vulnerability, enemy HP%, incoming lethal,
  buff status
- Personality Archetypes:
  - "Aggressive Vanguard": Lethal damage × 1.8
  - "Tactician": Disrupt/debuff score ↑ when player hand size large

### Behavior Trees as Phase Managers
```
BossHP < 50%?
├── YES → Switch to Enrage Profile (clear debuffs, activate ultimate)
└── NO  → Standard Weight Profile
```

### Ứng dụng cho boss encounters
- **Địch Hỏa (Boss Ch.48-52)**: Phase 1 (>50% HP): Normal attacks + siege
  Phase 2 (<50% HP): Enrage → "Bạo Liệt Đao Pháp" mỗi turn
- **Intent UI**: Hiển thị rõ icon + damage number trước player turn

---

## 8. Fortress & Siege Mechanics
**Nguồn**: Total War: Three Kingdoms, Three Kingdoms SLG

### Tường Thành như Unit đặc biệt
- HP pool lớn (500+)
- Buff "Cao Lâm Hạ" (Height Advantage): +30% range, immune melee
- Absorb sát thương từ Xe Đục Thành, bảo vệ đơn vị phía sau

### Công Thành vs Thủ Thành Asymmetry
| Phe Thủ | Phe Công |
| :--- | :--- |
| Tường Thành buff | Xe Đục Thành (high single-target) |
| Cung thủ trên thành (+range) | Thang mây leo thành (bypass wall) |
| Đổ dầu sôi (AoE lửa) | Mưu kế nội ứng (bypass gate) |
| Viện quân từ hậu phương | Cắt đứt tiếp tế (siege) |

### Trận Công Thành = Puzzle có Time Pressure
Nếu thủ quá lâu (>10 turns), quân lương cạn → auto penalty.
Nếu công quá nhanh mà không chuẩn bị → casualties massive.
