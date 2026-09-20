---
name: game-art-direction
description: >-
  Skill chỉ đạo mỹ thuật và định hình phong cách thị giác (Art Direction & Master Art Bible) cho dự án Trấn Quốc Phò Mã Gia.
  Áp dụng phong cách Tả Thực Cổ Phong Thủy Mặc & Kim Kế Hắc Ám (Eastern Grimdark Realism + Ink Wash Aesthetics + Kintsugi Molten Gold).
  Sử dụng khi cần định hướng thẩm mỹ bối cảnh, quy định ánh sáng, thiết kế camera, quy chuẩn vật liệu diegetic,
  và danh mục hiệu ứng VFX/Shaders cho cả 3 tầng chơi (Visual Novel, Sa Bàn, Sa Trường Thẻ Bài).
---

# Game Art Direction Skill

Quy trình chỉ đạo mỹ thuật và quản trị tính nhất quán thị giác (Visual Cohesion Management) cho dự án hybrid Visual Novel + Grand Strategy + Card Battler.

---

## 1. Triết Lý Mỹ Thuật Chủ Đạo (Core Art Metaphor)

> **"GIANG SƠN RẠN NỨT & ÁNH VÀNG THỨC TỈNH"**  
> *(Fractured Empire & Awakening Molten Gold)*

Mọi khung hình, thẻ bài, con dấu, và hiệu ứng trong game **bắt buộc** phải truyền tải được 2 thái cực:
1. **Sự Tàn Phai & Mục Ruỗng (The Decay)**:
   - Đại diện bằng: **Vệt Mực Đen Loang Lỗ (Ink Wash)**, **Giấy Xuyến Cổ Rạn Ố (Aged Xuan Paper)**, **Giáp Sắt Tôi Lạnh (Cold-Forged Iron)**.
   - Thể hiện sự suy tàn của Đại Vũ Hoàng Triều, mưu mô thâm độc của triều thần, và khói lửa chiến tranh biên giới.
2. **Sự Vá Lành & Thăng Hoa (The Redemption)**:
   - Đại diện bằng: **Mạch Vàng Kintsugi Nóng Chảy (Molten Gold Kintsugi)**.
   - Thể hiện sức mạnh anh linh Tam Quốc thức tỉnh, ý chí quật khởi của Quý Bình An hàn gắn non sông rạn vỡ.

---

## 2. Quy Tắc Bất Biến Về Phối Màu (Harmonic 60 - 30 - 10 Rule)

Mọi màn hình giao diện và tranh minh họa phải duy trì tỷ lệ:

- **60% Nền Tảng (Dominant Surface)**:
  - `Obsidian Void` (`#080a0d`): Không gian bóng tối sâu thẳm.
  - `Ink Charcoal` (`#10141b`): Bề mặt thẻ bài, nền hộp thoại, nghiên mực.
  - `Slate Ash` (`#1e2530`): Đất đá sa trường, bóng đổ của thành trì.
- **30% Bản Sắc Thế Lực (Faction Identity & Cultural Material)**:
  - `Imperial Cinnabar` (`#991b1b` / `#dc2626`): Đỏ son chu sa của ấn triện, huyết thư, thanh đo Nghi Kỵ Vũ Hoàng.
  - `Northern Steel` (`#e2e8f0` / `#94a3b8`): Sắc bạc của giáp trụ Thường Sơn Triệu Vân, khiên thép Hãm Trận Doanh.
  - `Celadon Jade` (`#065f46` / `#10b981`): Ngọc bích cung đình, phù chú thái bình.
- **10% Điểm Nhấn Quyền Lực (Focal Accent - Kintsugi Gold)**:
  - `Molten Gold` (`#fbbf24` / `#f59e0b` / `#d97706`): **Chỉ dành cho**:
    - Nút bấm hành động chính (Primary CTA).
    - Hào quang thần binh của danh tướng SSR/UR.
    - Mạch nứt phát sáng khi lật thẻ Bái Tướng Đài và tung tuyệt kỹ.
    - Ấn vàng phong tước của Hoàng Đế.

> [!CAUTION]
> **Nghiêm cấm (Visual Anti-Patterns)**:
> - Không sử dụng gradient tím generic (AI-purple).
> - Không dùng phong cách bão hòa màu cao kiểu hoạt hình (cartoony neon).
> - Không sử dụng emoji trong UI.

---

## 3. Quy Chuẩn Bối Cảnh (Environment & Staging Directives)

Tất cả các cảnh nền (Backgrounds) được phân loại và thiết kế theo bảng chỉ đạo:

| Mã Bối Cảnh | Tên Địa Điểm | Bảng Màu Chủ Đạo | Ánh Sáng & Khí Quyển | Chi Tiết Nhập Vai Bắt Buộc |
|---|---|---|---|---|
| `bg_pho_ma_phu_bedroom` | Phòng Ngủ Phò Mã | Nâu gỗ sẫm, xám khói, vàng nến mờ | Tối tăm, hiu hắt, ánh trăng xiên qua khe cửa sổ rách | Rèm lụa cũ thêu rồng phai màu, nghiên mực cạn, vài cuốn cổ thư |
| `bg_imperial_hall` | Kim Loan Điện Đại Vũ | Đen sơn mài, đỏ chu sa, vàng hoàng kim | Ánh đuốc bập bùng, bóng đổ dài trên cột rồng đá cẩm thạch | Ngai vàng trên bậc cao, bá quan đứng thành hai hàng nghiêm cẩn |
| `bg_pho_ma_phu_secret_room` | Mật Thất Bái Tướng Đài | Đen hắc thạch, lam khói, vàng kim kế | Huyền bí, pháp trận Bát Quái tỏa ánh sáng từ tâm đất | Trận đồ khắc trên nền đá, chuông đồng cổ treo bốn góc |
| `bg_northern_border_camp` | Quân Doanh Bắc Cảnh | Xám tro, trắng tuyết, thép rỉ | Gió lạnh buốt, tuyết rơi lất phất, đốm lửa trại bập bùng | Hàng rào cọc gỗ nhọn, cờ hiệu rách gió, khiên thép cắm trên tuyết |
| `bg_thanh_thuy_river` | Bờ Sông Thanh Thủy | Xanh rêu xám, trắng bọt nước, nâu phù sa | Bầu trời mây đen vần vũ, sấm chớp rền vang | Đê chắn bằng gỗ đá, dòng nước xiết chuẩn bị vỡ đê |
| `bg_thanh_chau_siege` | Sa Trường Thanh Châu | Đỏ cam lửa cháy, đen khói độc, xám thành quách | Hỏa tiễn rực trời, khói lửa cuồn cuộn | Xe đục thành gãy đổ, hào sâu cắm chông, cờ hiệu rơi rụng |

---

## 4. Danh Mục Hiệu Ứng VFX & Shaders (VFX Manifest)

1. **VFX-01: Ink Splatter (Vệt Mực Loang)**:
   - Sử dụng khi chuyển cảnh hoặc khi nhân vật trúng đòn chí mạng.
   - Vệt mực bắn ra dạng giọt cọ lông gà, lan tỏa trong 300ms rồi tan vào nền đen.
2. **VFX-02: Kintsugi Fracture (Mạch Nứt Hoàng Kim)**:
   - Sử dụng khi: Thức tỉnh cảnh giới võ học, thi triển Siêu Thẻ Bài (*Thất Thám Bàn Xà*, *Xả Lũ Thanh Thủy*).
   - Đường nứt phát sáng màu vàng rực `#fbbf24`, ánh kim chói lòa trong 200ms trước khi nổ bùng sát thương.
3. **VFX-03: Screen Shake Physics (Rung Chấn Vật Lý)**:
   - Dùng khi: Xe đục thành húc vào tường (`80 DMG`), xả lũ sông Thanh Thủy, hoặc Triệu Vân đột kích.
   - Biên độ: 4px đến 8px theo trục X/Y, suy giảm theo hàm mũ trong 350ms.
4. **VFX-04: Imperial Seal Stamp (Đóng Ấn Chu Sa)**:
   - Dùng khi: Vũ Hoàng ban chỉ, quyết định lựa chọn phân nhánh, hoặc mở khóa tính năng.
   - Âm thanh tiếng đóng mộc nặng trịch, dấu triện đỏ vuông vức hiện lên với vòng khói son nhẹ.

---

## 5. Workflow Kiểm Định Tính Nhất Quán (Consistency Audit Checklist)

Trước khi nghiệm thu bất kỳ màn hình hoặc tài nguyên đồ họa nào, chuyên viên mỹ thuật phải tự kiểm tra 5 câu hỏi:
1. **Kiểm tra tỷ lệ màu**: Tỷ lệ nền tối (Obsidian) có chiếm ít nhất 60% diện tích không? Màu vàng có bị lạm dụng ngoài các điểm nhấn quyền lực không?
2. **Kiểm tra chất liệu**: Các linh kiện có toát lên vẻ gỗ sơn mài, giấy xuyến, hoặc đồng cổ không? Có chi tiết nào trông như nhựa (plastic) hay kính hiện đại (glassmorphism) không?
3. **Kiểm tra nhân vật**: Tỷ lệ cơ thể có chuẩn tả thực (7.5 - 8 đầu) không? Có bị lệch sang phong cách anime mắt to không?
4. **Kiểm tra phông chữ**: Văn bản có đúng cặp `Cinzel` (tiêu đề) + `Be Vietnam Pro` (nội dung) không? Có bị lỗi dấu tiếng Việt không?
5. **Kiểm tra độ tương phản**: Độ tương phản chữ trên nền có vượt chuẩn WCAG AA (>= 4.5:1) không?
