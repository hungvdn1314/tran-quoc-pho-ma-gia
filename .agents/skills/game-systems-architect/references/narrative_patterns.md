# Narrative Design Patterns Reference

Tài liệu tham chiếu chi tiết cho các mô hình thiết kế kịch bản phân nhánh,
trích xuất từ phân tích các tựa game kinh điển và GDC Talks.

---

## 1. Foldback Diamond Structure (Kim Cương Gấp Lại)
**Nguồn**: GDC 2016 — Cassie Phillipps: "All Choice No Consequence"

### Nguyên tắc
Phân nhánh rộng cho cảm giác agency, nhưng gấp lại (fold back) về bottleneck
chung trong 2-3 scene. Thay đổi không phải **đích đến** mà là **context, flags,
và dialogue flavor** khi đến đích.

### Ứng dụng cho Trấn Quốc Phò Mã Gia
Các sự kiện lịch sử lớn (Đối thơ đại điện, Chinh phạt Bắc Cảnh, Đăng cơ Hoàng đế)
là **bottleneck bắt buộc**. Lựa chọn trước đó ảnh hưởng:
- **Ai** ngồi trong hội đồng chiến tranh
- **Thẻ bài nào** khả dụng trong trận chiến tiếp theo
- **Bao nhiêu** sĩ khí quân sĩ mang vào trận

### Cấu trúc kỹ thuật
```
Scene A ──┬──> Branch 1 (Mưu lược) ──┐
          ├──> Branch 2 (Chính diện) ──┤──> Bottleneck B (Set Piece)
          └──> Branch 3 (Thu thập)  ──┘
                                        │
                   context_flags ──────>│ (khác nhau)
```

---

## 2. Diegetic Choice Prompts (Lựa Chọn Nội Tại)
**Nguồn**: Steins;Gate Phone Trigger System

### Nguyên tắc
Loại bỏ menu lựa chọn modal pop-up. Thay bằng thiết bị trong thế giới game:
- Trả lời hoặc bỏ qua cuộc gọi
- Mở hoặc bỏ qua thư/email
- Click từ khóa trong thư để soạn phản hồi

### Ứng dụng cho Trấn Quốc Phò Mã Gia
- **Chiếu thư hoàng đế**: Chọn tuân lệnh hay tìm cách trì hoãn
- **Mật thư tướng sĩ**: Trả lời cầu viện hay phớt lờ
- **Thư tình báo Hồng Nhan**: Đọc hoặc tiêu hủy (ảnh hưởng Nghi Kỵ)
- **Đơn khiếu nại dân chúng**: Xử lý hoặc chuyển cho phó tướng

### Cơ chế flag ẩn
Lựa chọn tưởng chừng nhỏ (trả lời thư ở Chương 4) đặt persistent flag
mà payload không trigger cho đến Chương 10+.

---

## 3. Dual-Phase Loop (Vòng Lặp Song Pha)
**Nguồn**: Phoenix Wright: Ace Attorney

### Nguyên tắc
Xen kẽ rõ ràng giữa:
1. **Investigation Phase**: Khám phá, thu thập chứng cứ, xây dựng dossier
2. **Confrontation Phase**: Đấu trí, bẻ gãy lý luận đối phương

### Ứng dụng cho Trấn Quốc Phò Mã Gia
1. **Phase A: Điều Tra & Chuẩn Bị** (VN Mode)
   - Thu thập tình báo, xây dựng liên minh, tích lũy chứng cứ
   - Kết quả: Unlocked cards, alliance flags, evidence items
2. **Phase B: Hội Nghị Triều Đình / Sa Trường** (Card Battler / Debate)
   - Dùng chứng cứ để phản biện đối thủ chính trị
   - Hoặc dùng thẻ bài chiến thuật để giải quyết trận đánh
   - Kết quả: Territory changes, new chapters unlocked

### Psyche-Lock Mechanism
Khi NPC giấu thông tin quan trọng, hiển thị "chains" hoặc "seals".
Người chơi phải trình bày bằng chứng đã thu thập để phá từng seal.
Áp dụng cho: Vạch trần gian thần, giải mã mưu kế đối phương.

---

## 4. Tri-Pillar Mutual Gating (Khóa Chéo Ba Trụ)
**Nguồn**: 13 Sentinels: Aegis Rim (Vanillaware)

### Nguyên tắc
3 mode game không thể binge riêng lẻ. Mỗi mode có điểm dừng (lock)
yêu cầu tiến bộ ở mode khác:

```
Mode A (Story/VN) locks at 50% ──> Requires: Clear Tactical Battle Wave 3
Mode B (Tactical) locks at Wave 5 ──> Requires: Unlock 30 Archive Entries
Mode C (Archive) locks at Entry 40 ──> Requires: Story Chapter 6 complete
```

### Ứng dụng cho Trấn Quốc Phò Mã Gia
- **VN (Triều Đình)** dừng ở cảnh chiến tranh → cần thắng trận trên Sa Trường
- **Sa Trường (Card Battle)** cần hậu cần → cần mở tuyến tiếp tế trên Sa Bàn
- **Sa Bàn (Strategy Map)** cần phép vua → cần ngoại giao thành công ở VN

### Thought Cloud System
Thay vì inventory vật phẩm truyền thống, từ khóa thu được trong hội thoại
nhập vào "Thought Cloud". Trình bày từ khóa cho NPC khác để mở conversation
nodes mới.

---

## 5. Fact-Based State Machine (Máy Trạng Thái Dựa Trên Sự Kiện)
**Nguồn**: Honkai: Star Rail, Valve Dynamic Dialog (GDC 2012, Elan Ruskin)

### Nguyên tắc
Thay vì dialogue tree cứng nhắc, sử dụng database of world "facts" (boolean + scalar).
Dialogue nodes đánh giá precondition queries:

```
IF PlayerHasMetGeneralX == TRUE
AND ImperialPrestigeLevel >= 3
AND SelectedFaction == 'Autonomy'
THEN DisplayDialogueNode_7
```

### Ưu điểm
- Dễ mở rộng: Thêm fact mới không cần rewire dialogue tree
- Context-sensitive: Cùng một scene nhưng dialogue thay đổi dựa trên state
- Modular: Writer viết dialogue nodes độc lập, engine ghép nối runtime

### Ứng dụng
Trong card battles và strategy map, tướng sĩ nói dynamic barks dựa trên:
- Trạng thái chiến trường hiện tại
- Card synergies đang active
- Relationship score với người chơi

---

## 6. Information Retention Across Loops (New Game+)
**Nguồn**: GDC 2013 — Kotaro Uchikoshi: "How VNs Cultivate Narrative"

### Nguyên tắc
Trong thể loại xuyên không/chuyển sinh, protagonist mang kiến thức từ
timeline thất bại vào timeline mới, mở khóa lựa chọn trước đó bất khả.

### Ứng dụng cho Trấn Quốc Phò Mã Gia
Quý Bình An là người xuyên không từ hiện đại → mang kiến thức lịch sử:
- Biết trước mưu kế của đối phương → mở lựa chọn "Tiên tri" đặc biệt
- Phát minh công nghệ hiện đại (xà phòng, hỏa dược) → cây công nghệ duy nhất
- Nhận diện danh tướng Tam Quốc → biết điểm mạnh/yếu trước khi chiến đấu

---

## 7. Scene Scripting Format (Định Dạng Kịch Bản)

### Chuẩn YAML/JSON cho Hybrid Engine
```yaml
node_id: "scene_ch1_poetry_duel_01"
background: "bg_imperial_hall_night"
music: "bgm_court_tension"
actors:
  - id: "qui_binh_an"
    sprite: "qba_nervous"
    position: "right"
  - id: "nam_ly_envoy"
    sprite: "nle_arrogant"
    position: "left"
dialogue:
  - speaker: "nam_ly_envoy"
    text: "Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?"
    effects:
      - camera_shake: true
      - set_flag: "poetry_duel_initiated"

choices:
  - text: "Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?"
    conditions:
      - flag: "is_transmigrator"
        value: true
    effects:
      - set_resource: "gold"
        delta: 100
      - set_flag: "system_awakened"
        value: true
      - grant_item: "anh_hon_lenh_so_cap"
      - unlock_feature: "gacha_bai_tuong_dai"
        at_chapter: 5
    next_node: "scene_ch1_emperor_reward"

  - text: "... (Im lặng, không dám đối)"
    effects:
      - set_flag: "coward_choice"
        value: true
      - set_resource: "suspicion"
        delta: -5
    next_node: "scene_ch1_humiliation"
```

### Tích hợp với Ink (inkjs)
Nếu dùng Ink scripting cho web runtime:
```ink
=== poetry_duel ===
Sứ thần Nam Ly cười ngạo mạn, đọc vế đối:
"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?"

* [Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn!]
  ~ gold += 100
  ~ system_awakened = true
  -> emperor_reward
* [Im lặng...]
  ~ suspicion -= 5
  -> humiliation
```
