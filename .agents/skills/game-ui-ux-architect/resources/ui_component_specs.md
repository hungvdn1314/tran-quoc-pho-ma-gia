# 🧩 UI Component Specifications & Layout Contracts
## Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)

Tài liệu đặc tả kiến trúc thành phần (Component Specifications) cho toàn bộ hệ thống giao diện 3 Tầng.

---

## 1. Top Imperial HUD (Thanh Trạng Thái Hoàng Gia)
- **Vị trí**: Cố định trên cùng (`position: relative`, `height: 74px`, `z-index: 100`).
- **Nền & Viền**: Gradient sơn mài đen (`#181d26` sang `#0d1117`), viền đáy gốm nung `#2d2319` dày 2px.
- **Thành phần**:
  1. *Seal Badge*: Khối triện vuông màu đỏ chu sa `#991b1b` viền vàng chữ "鎮" (Font `var(--font-seal)`: ZCOOL XiaoWei 18px).
  2. *Brand Titles*: Tên game `TRẤN QUỐC PHÒ MÃ GIA` (Font `var(--font-title)`: Playfair Display 16px, letter-spacing 2px, 100% tiếng Việt) + Tên Hồi/Chương hiện tại.
  3. *Chapter Progression Tracker*: Badge chương hiện tại + Thanh đo mini phần trăm tiến trình 8 mốc.
  4. *Quick Reset Button*: Nút đỏ đậm `🔄 RESET` đặt góc phải trên thanh HUD để làm mới game về Ch.1.
  5. *Nav Tabs*: 3 nút chuyển tầng (VN, Sa Bàn, Sa Trường) với hiệu ứng khóa mờ (`hidden` / `locked-tab`).
  6. *Hero & Gacha Dock*:
     - Nút Bái Tướng Đài (`#btn-hud-gacha`): Nền vàng hổ phách, chữ lệnh triện đỏ, số lượng Anh Hồn Lệnh.
     - Nút Tra Cứu Tướng (`#btn-hud-hero`): Avatar tròn kèm tên tướng và chỉ số Võ Lực.
  7. *Monitors*:
     - Thanh Nghi Kỵ Vũ Hoàng (0 - 100%): Dải màu gradient Xanh -> Cam -> Đỏ, có vạch mốc nguy hiểm 60%.
     - Thẻ Vàng (`金`): Số vàng tích lũy định dạng có dấu chấm phân cách hàng nghìn.
     - Thẻ Lương (`糧`): Số thạch lương thảo.
     - Thẻ AP (`令`): Hiển thị `X / 3` hoặc `Khóa (Ch.15)`.

---

## 2. Tầng 1: Visual Novel Theater
- **Vị trí**: Chiếm trọn không gian viewport bên dưới HUD.
- **Thành phần**:
  1. *Cast Stage*:
     - Tả Dực (Slot Trái): Dành cho đối thủ hoặc nhân vật phụ (Sứ thần Nam Ly, Tỳ nữ, Cao Thuận, Giả Hủ).
     - Hữu Dực (Slot Phải): Dành cho Quý Bình An hoặc Triệu Tử Long hộ vệ.
     - Thẻ tên nhân vật (Nametag): Đặt dưới chân avatar, nền đen mờ viền đồng.
  2. *Dialogue Box (Hộp Thoại)*:
     - Nền: Gỗ mun sơn mài `rgba(16, 20, 27, 0.88)` với viền Kintsugi mảnh `#d97706`.
     - Header: Tên người nói màu vàng hoàng kim `#fbbf24` (Font `var(--font-title)`: Playfair Display 18px, hỗ trợ đầy đủ thanh điệu tiếng Việt) + Dấu triện Hán tự (`var(--font-seal)`: ZCOOL XiaoWei).
     - Body: Chữ thoại trắng sữa `#ffffff`, font `Lora` (`var(--font-serif)`), line-height 1.65, hiệu ứng máy đánh chữ (typewriter 14ms/ký tự).
     - Footer Action: Nút `TIẾP TỤC ĐỐI THOẠI [Space]` màu hổ phách viền sáng nổi bật.
  3. *Branch Choice Modal*:
     - Cửa sổ bật lên trang trọng giữa màn hình khi đến điểm rẽ cốt truyện.
     - Các thẻ lựa chọn (`choice-card-btn`) có viền sáng khi hover, hiển thị rõ hậu quả chiến lược.

---

## 3. Tầng 2: Đế Nghiệp Sa Bàn
- **Vị trí**: Viewport toàn màn hình với bản đồ 4 phương.
- **Thành phần**:
  1. *Map Nodes*:
     - 4 cứ điểm trọng yếu: Kinh Đô Đại Vũ (`dedo`), Bắc Cảnh Biên Cương (`baccanh`), Nam Ly Quốc (`namly`), Tây Lăng Hoang Mạc (`taylang`).
     - Hiệu ứng nhấp nháy hào quang chu sa khi có chiến sự nguy cấp.
  2. *Province Inspector (Bảng Chi Tiết Cứ điểm)*:
     - Tên lãnh thổ, Chúa tể cai quản, Mức độ nguy cơ, Thu nhập vàng/tháng, Binh lực trú phòng.
     - Nút lệnh hành động tiêu hao 1 AP:
       - `Mở Rộng Xưởng Thấu Hoa Cao` (+3.000 Vàng)
       - `Tiến Cống Đút Lót Triều Thần` (-15% Nghi Kỵ)
       - `Xuất Binh Nghênh Chiến` (Chuyển sang Sa Trường Tầng 3)

---

## 4. Tầng 3: Sa Trường Thẻ Bài 3 Làn
- **Vị trí**: Viewport chiến trường thành quách.
- **Thành phần**:
  1. *Thanh Trạng Thái Chiến Trường*:
     - Máu Tường Thành: `wallHp / 500 HP` (Màu xanh lá chuyển đỏ khi nguy cấp).
     - Máu Boss Địch Hỏa: `bossHp / 250 HP` (Thanh máu đỏ rực).
     - Thanh Ý Đồ Boss (`Enemy Intent`): Mô tả rõ đòn đánh sắp tới để người chơi khắc chế.
     - Cấp Độ Tích Nước Thủy Công (`Reservoir Stage`): Cấp 1 -> Cấp 2 -> Cấp 3 (100% sát thương).
  2. *Chiến Tuyến 3 Làn (3 Lanes)*:
     - Tả Dực: Địch cung thủ vây hãm — Người chơi có thể triển khai `Hãm Trận Doanh`.
     - Trung Quân: Xe Đục Thành Nam Ly — Triệu Tử Long trấn thủ.
     - Hữu Dực: Kỵ binh đột kích — Người chơi có thể triển khai `Bạch Mã Nghĩa Tòng`.
  3. *Hand Deck (Bộ Bài Trên Tay)*:
     - Thẻ Lính (`Hãm Trận Doanh`, `Bạch Mã Kỵ`): Khung sắt viền lam/vàng.
     - Thẻ Tuyệt Kỹ (`Thất Thám Bàn Xà`): Thẻ bài Triệu Vân ngắt ý đồ boss.
     - Siêu Thẻ Chiến Lược (`Xả Lũ Thanh Thủy`): Thẻ Giả Hủ quét sạch toàn bộ xe đục thành.
  4. *Nút Quyết Toán Lượt*: Nút `⚔️ XUNG TRẬN` dập nổi vàng kim kích hoạt lượt giao tranh.

---

## 5. Bái Tướng Đài Gacha Altar Modal
- **Thành phần**:
  1. *Pháp Trận Bát Quái*: Đồ án xoay 360 độ huyền bí ở trung tâm.
  2. *Bùa Lệnh Triệu Hoán (`summon-talisman`)*: Tấm bùa phát quang ánh sáng vàng theo nhịp thở.
  3. *Nút Khai Trận Bát Quái*: Tiêu hao 1 Anh Hồn Lệnh hoặc 160 Kim Bảo.
  4. *Hoạt Ảnh Lật Thẻ 3D (`Card Flipper`)*: Thẻ bài xoay 180 độ lộ diện phẩm chất (SSR/UR), tên tướng và tuyệt kỹ kèm hiệu ứng sấm sét chói lòa.
