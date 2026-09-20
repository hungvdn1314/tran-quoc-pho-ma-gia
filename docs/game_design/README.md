# Game Design Document: Trấn Quốc Phò Mã Gia (镇国驸马爷)
## Core GDD Master Hub

**Dự án:** Trấn Quốc Phò Mã Gia
**Thể loại:** Hybrid Visual Novel + Grand Strategy (SLG) + Tactical Card Battler + Gacha
**Chủ đề Aesthetic:** Kintsugi Ink (金继水墨 - Vàng nứt trên nền Mực thủy mặc)
**Mô tả:** Chuyển thể từ tiểu thuyết 1509 chương, người chơi hóa thân thành một người hiện đại xuyên không vào thân xác phò mã, xây dựng đế chế sử dụng hệ thống triệu hồi danh tướng Tam Quốc.

---

### 1. 3-Tier Architecture Overview
Trò chơi được xây dựng trên cấu trúc 3 tầng (3-Tier Architecture) kết nối chặt chẽ, tạo ra một Core Loop mượt mà:
1. **Tier 1: Visual Novel Theater (Cốt truyện cốt lõi)**: Kể chuyện, tương tác nhân vật, ra quyết định chính trị.
2. **Tier 2: Grand Strategy Node Map (Đế Nghiệp Sa Bàn)**: Quản lý lãnh thổ, kinh tế, điều động quân đội trên bản đồ vĩ mô.
3. **Tier 3: Tactical Card Battler (Sa Trường Thẻ Bài)**: Giao tranh vi mô dạng thẻ bài kết hợp chiến thuật theo lượt (Slay the Spire x Hearthstone).

### 2. Core Loop Diagram
```mermaid
graph TD
    A[Visual Novel Theater<br>(Nhận nhiệm vụ, Sự kiện)] -->|Mở khóa tính năng, Flags| B[Bái Tướng Đài<br>(Gacha hệ thống)]
    B -->|Triệu hồi Danh Tướng| C[Đế Nghiệp Sa Bàn<br>(Chiến lược vĩ mô)]
    A -->|Quyết định chính trị| C
    C -->|Kích hoạt Giao tranh| D[Tactical Card Battler<br>(Chiến đấu thẻ bài)]
    D -->|Chiến thắng, Loot| E[Nâng cấp Kinh tế & Quân đội]
    E -->|Mở khóa Chapter mới| A
```

### 3. Progressive Feature Unlock
Hệ thống tính năng được mở khóa dần theo Chapter Milestone, đảm bảo Player Fantasy không bị ngợp thông tin. (Chi tiết xem tại FDD-PRG-001).

### 4. Index of Sub-Documents
- [FDD-VN-001: Hệ thống Visual Novel Theater](fdd_visual_novel.md)
- [FDD-GAC-001: Bái Tướng Đài (Gacha Summoning Altar)](fdd_gacha_system.md)
- [FDD-MAP-001: Đế Nghiệp Sa Bàn (Grand Strategy Node Map)](fdd_strategy_map.md)
- [FDD-BAT-001: Sa Trường Thẻ Bài (Tactical Card Battler)](fdd_card_battler.md)
- [FDD-PRG-001: Progressive Feature Unlock Matrix](fdd_progression.md)
- [SDD-COM-001: Tactical Card Combat Engine](sdd_combat_engine.md)
- [SDD-ECO-001: Game Economy](sdd_economy.md)
- [SDD-SUS-001: Emperor's Suspicion Meter](sdd_suspicion.md)
