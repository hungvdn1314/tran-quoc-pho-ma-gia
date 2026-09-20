---
name: game-ui-ux-architect
description: >-
  Skill thiết kế hệ thống giao diện người dùng (Game UI/UX Architecture & Design Systems) cho thể loại hybrid Visual Novel + Grand Strategy + Card Battler.
  Tuân thủ triệt để UI/UX Pro Max và Taste Skill (Anti-slop, Design Read, WCAG AA, 44px touch targets, micro-interactions 150-300ms).
  Quản lý W3C Design Tokens, thành phần nhập vai diegetic (gỗ sơn mài, giấy xuyến, ấn triện), và tối ưu hóa trải nghiệm 3 tầng chơi liền mạch.
---

# Game UI/UX Architect Skill

Hệ thống thiết kế giao diện và kiến trúc trải nghiệm người dùng (Game UI/UX Design System) cho dự án Trấn Quốc Phò Mã Gia.

---

## 1. Tuyên Ngôn Thiết Kế (Design Read) & Chống Slop

Trước khi viết bất kỳ dòng mã HTML/CSS hay tạo component UI nào, bắt buộc phải tuyên bố một dòng **Design Read**:

> *"Giao diện đại diện cho sa bàn quyền mưu của một phò mã hàn vi trong hoàng triều mục ruỗng — tối giản, tôn nghiêm, đậm chất thư pháp thủy mặc và các vết rạn nứt thế cục được gắn kết bằng mạch vàng Kintsugi."*

### Kỷ Luật Chống Slop (Anti-Slop Directives):
1. **Không gradient tím generic**: Không bao giờ dùng gradient tím neon (`#8b5cf6` sang `#ec4899`).
2. **Không glassmorphism bừa bãi**: Không lạm dụng blur nền vô tội vạ. Chỉ dùng nền mờ đen sâu (`rgba(16, 20, 27, 0.88)` kèm viền gỗ sơn mài).
3. **Không dùng emoji làm icon UI**: 100% icon phải dùng vector SVG chính thức (nét khắc đồng, thư pháp cổ phong, hoặc Lucide/Heroicons thanh mảnh).
4. **Không bẻ dòng chữ trên nút bấm**: Kích thước nút bấm phải vừa vặn, không bị wrap text.
5. **Tiết chế Eyebrow / Tag**: Tối đa 1 tag phân loại cho mỗi thẻ bài hoặc khu vực chức năng.

---

## 2. Hệ Thống Design Tokens (W3C Standard)

Mọi thông số về màu sắc, kiểu chữ, khoảng cách, và hiệu ứng chuyển động được tập trung tại `.agents/skills/game-ui-ux-architect/resources/design_tokens.json`:

- **Typography Stack**:
  - `font-display`: `'Cinzel', serif` (Tiêu đề, ấn chương, tên danh tướng, số sát thương chí mạng).
  - `font-body`: `'Be Vietnam Pro', sans-serif` (Văn bản hội thoại, mô tả kỹ năng, số liệu thống kê — line-height `1.6`).
  - `font-lore`: `'Noto Serif', serif` (Chiếu chỉ hoàng triều, câu đối, thư pháp).
- **Phản Hồi Xúc Giác & Động Học (Micro-Interactions)**:
  - Thời gian chuyển động tiêu chuẩn: `180ms` đến `250ms` với `cubic-bezier(0.4, 0, 0.2, 1)`.
  - Hỗ trợ `prefers-reduced-motion` tự động tắt hiệu ứng rung màn hình cho người chơi nhạy cảm.
- **Tiêu Chuẩn Công Thái Học & Tiếp Cận (Ergonomics & Accessibility)**:
  - Độ tương phản chữ trên nền tối thiểu: **4.5:1 (WCAG AA)**.
  - Kích thước vùng bấm tối thiểu trên thiết bị cảm ứng: **44 × 44 px**.
  - Phím tắt bàn phím chuẩn: `Space` (Tiến tới thoại), `Escape` (Đóng modal/Backlog).

---

## 3. Kiến Trúc Giao Diện 3 Tầng Liền Mạch (Tri-Tier Interface Architecture)

### Tầng 1: Visual Novel Theater (Sân Khấu Kịch Bản)
- **Mục tiêu**: Tập trung 100% vào cảm xúc nhân vật và sự gay cấn của cốt truyện.
- **Bố cục**:
  - Khung thoại đặt ở 1/3 dưới màn hình, nền sơn mài đen bán trong suốt (`rgba(16, 20, 27, 0.88)`).
  - Khung tên nhân vật viền vàng Kintsugi nổi bật bên góc trái trên của khung thoại.
  - Nút `Lịch Sử Thoại` và `Tự Động` xếp gọn bên góc phải, không che khuất nhân vật.
  - Modal phân nhánh quyết định (`Choice Modal`): Xuất hiện trang trọng ở giữa màn hình với ghi chú rõ ràng về hậu quả chiến lược (`⚡ Phân nhánh kịch bản`).

### Tầng 2: Đế Nghiệp Sa Bàn (Grand Strategy Map)
- **Mục tiêu**: Cung cấp bức tranh toàn cảnh về địa chính trị 4 phương và quản lý mật độ thông tin cao (High Information Density) mà không gây ngợp.
- **Bố cục**:
  - Tấm bản đồ da thú/lụa cổ trải dài toàn màn hình với các nút địa hạt (Kinh Đô, Bắc Cảnh, Nam Ly, Tây Lăng).
  - Thanh hiển thị Điểm Hành Động (`AP Monitor`) đặt rõ ràng trên HUD: `AP: X / Y`.
  - Bảng chi tiết địa hạt (`Province Inspector`) trượt từ góc phải sang, hiển thị: Quân trú phòng, Lợi tức vàng, Cấp độ nguy cơ, và Nút lệnh hành động.

### Tầng 3: Sa Trường Thẻ Bài 3 Làn (Tactical Card Battler)
- **Mục tiêu**: Tính hành động cao, nhịp độ dồn dập, cơ chế chiến thuật minh bạch (Tactile Clarity).
- **Bố cục**:
  - Bố cục 3 làn đối xứng: Tả Dực (Left), Trung Quân (Center), Hữu Dực (Right).
  - Thanh `Ý Đồ Kẻ Địch (Enemy Intent Indicator)`: Hiển thị minh bạch boss sắp tung chiêu gì và bao nhiêu sát thương để người chơi chủ động khắc chế bằng thẻ bài.
  - Hàng thẻ bài trên tay (`Hand Cards`): Nằm phía dưới cùng, hiệu ứng hover nhô lên 20px kèm viền sáng vàng rực.
  - Số sát thương nhảy động (`Damage Pops`): Màu đỏ cho sát thương tường thành, màu vàng chớp lóe cho đòn chí mạng của Triệu Vân.

### Gacha Altar (Bái Tướng Đài)
- **Mục tiêu**: Nghi thức huyền bí cổ phong, trải nghiệm hồi hộp kịch tính (Suspense & Anticipation).
- **Bố cục**:
  - Vòng xoay Bát Quái trận đồ làm trung tâm, bùa lệnh phù chú lơ lửng phát xung động.
  - Hoạt ảnh lật thẻ 3D (`3D Card Flip`) lật chậm trong 700ms, rực sáng hào quang khi chạm ngưỡng SSR/UR.

---

## 4. Danh Mục Kiểm Thử UI/UX (UI/UX QA Matrix)

Trước khi xuất bản giao diện:
1. **Kiểm tra Responsive Breakpoints**: Giao diện hiển thị hoàn mỹ trên 1920x1080 (Desktop), 1366x768 (Laptop), 1024x768 (Tablet ngang) mà không bị tràn viền (zero horizontal scroll).
2. **Kiểm tra Trạng Thái Khóa**: Nút khóa hiển thị biểu tượng `🔒`, có `cursor: not-allowed`, và thông báo tooltip rõ ràng lý do bị khóa.
3. **Kiểm tra Zero Layout Jump**: Chuyển đổi giữa các tab không gây giật màn hình hoặc dịch chuyển vị trí các phần tử cố định trên HUD.
