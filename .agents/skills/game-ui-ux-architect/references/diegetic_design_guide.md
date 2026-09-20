# 📜 Hướng Dẫn Thiết Kế Giao Diện Nội Cảnh (Diegetic UI Design Guide)
## Dự Án: Trấn Quốc Phò Mã Gia (Eastern Grimdark Realism - Thủy Mặc & Kim Kế)

---

## 1. Triết Lý Thiết Kế: Giao Diện Hòa Nhập Thế Giới (Diegetic UI Philosophy)

Trong thế giới loạn thế của **Trấn Quốc Phò Mã Gia**, ranh giới giữa hệ thống game (HUD, Menu, Cửa sổ) và trải nghiệm nhập vai của người chơi (Thái tử giám quốc, Chủ soái sa bàn, Thống soái chiến trường) phải được thu hẹp tối đa. Thay vì sử dụng các khung bo tròn phong cách sci-fi hoặc phong cách thẻ bài giả lập hiện đại phẳng lỳ (flat vector), giao diện game được thiết kế như những **vật phẩm cổ vật có thật** mà nhân vật chính Quý Bình Phong đang chạm vào trên bàn làm việc trong Kim Loan Điện hoặc đại doanh tiền tuyến.

```
+-------------------------------------------------------------------------------+
|                             TRIẾT LÝ GIAO DIỆN NỘI CẢNH                       |
+------------------------------------+------------------------------------------+
|  Vật Liệu Cổ Truyền (Diegetic)     |  Ý Nghĩa Trong Trải Nghiệm Gameplay      |
+------------------------------------+------------------------------------------+
|  Sơn Mài Đen & Trầm Hương (Lacquer)|  Khung viền tĩnh, chiều sâu huyền bí HUD |
|  Giấy Tuyên Chỉ & Da Cừu Cổ        |  Bản đồ sa bàn, kịch bản chương, tấu chương |
|  Chu Sa Thần Ấn (Cinnabar Seal)    |  Chấp thuận lệnh, xác nhận hành động cốt truyện |
|  Hổ Phù Rạn Nứt (Fractured Tally)  |  Vật phẩm triệu hoán anh hồn (Gacha Altar) |
|  Trúc Giản Bọc Vàng (Golden Bamboo)|  Hộp đối thoại Visual Novel & nhiệm vụ    |
|  Thép Tôi & Mạ Vàng Kim Kế (Steel) |  Khung thẻ bài chiến đấu 5 cấp độ hiếm   |
+-------------------------------------------------------------------------------+
```

---

## 2. Các Thành Tố Diegetic Trọng Yếu Trong Game

### 2.1. Sơn Hà Sa Bàn (Bản Đồ Chiến Lược Tầng 2)
* **Nguyên Mẫu Thế Giới Thực**: Bàn cát quân sự thời Hán - Ngụy, làm từ gỗ tếch sơn mài đen, lòng sa bàn rải bột đá mài, ngọc thạch tạc hình núi non, thủy ngân mô phỏng sông ngòi.
* **Chi Tiết Giao Diện**:
  - **Khung Sa Bàn**: Viền nổi bằng hoa văn mây sấm thời Thương - Chu (*Lôi Vân Văn*), góc bọc đồng hun gỉ nhẹ.
  - **Bề Mặt Bản Đồ**: Giấy da cổ vẽ bằng mực nho loang tự nhiên (`#10141b` trên nền xám ngả vàng `#1e2430`). Các đường biên giới giữa Đại Ngụy, Nam Ly, Đông Thương dùng chỉ đỏ chu sa khâu tay hoặc mực son đứt đoạn.
  - **Quân Tiêu (Map Tokens)**: Quân kỳ hình tam giác cắm trên đế đồng khắc gia huy (Gia Cát, Quý thị, Hạ Hầu).
  - **Thời Tiết & Sương Mù Khói Lửa (Fog of War)**: Sử dụng lớp khói mực xoay tròn chậm (Ink Smoke Shader) che phủ các quận huyện chưa do thám.

```css
/* Token bản đồ quân cờ Sa Bàn */
.sa-ban-token {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, #2d3748 0%, #10141b 100%);
  border: 2px solid #d97706;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(251, 191, 36, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.sa-ban-token::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #d97706;
}
```

---

### 2.2. Hộp Thoại Trúc Giản & Bức Họa Thủy Mặc (Hội Thoại Visual Novel Tầng 1)
* **Nguyên Mẫu Thế Giới Thực**: Thẻ tre liên kết bằng dây gai (*Khang Hy Thư Giản*) kết hợp khung cuộn tơ lụa thêu chỉ vàng.
* **Chi Tiết Giao Diện**:
  - **Nền Hộp Thoại**: Độ mờ 92%, vân giấy lụa mờ có kết cấu xơ thực vật. Đường viền trên và viền dưới được nẹp thanh gỗ Mun sẫm màu mạ chỉ vàng rạn nứt (*Kintsugi Seam*).
  - **Tên Nhân Vật (Speaker Tag)**: Khối ngọc bích phẳng hoặc con dấu triện son đỏ góc bo nhẹ, chữ khắc lún (*intaglio*).
  - **Hiệu Ứng Chuyển Đổi**: Chữ hiển thị theo nét cọ bút lông thư pháp (tốc độ 25ms/ký tự), khi nhấn mạnh có vết mực văng nhẹ (`ink_splatter`).

```css
/* Khung hội thoại Visual Novel - Trúc Giản & Mực Nho */
.vn-dialogue-diegetic {
  background: linear-gradient(180deg, rgba(16, 20, 27, 0.95) 0%, rgba(8, 10, 13, 0.98) 100%);
  border-top: 2px solid #d97706;
  border-bottom: 2px solid #334155;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.85);
  position: relative;
  padding: 20px 32px;
}
.vn-speaker-tag {
  background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%);
  border: 1px solid #fbbf24;
  color: #fffbeb;
  font-family: 'Cinzel', 'Noto Serif SC', serif;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 4px 16px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6);
}
```

---

### 2.3. Hổ Phù Binh Bài (Bái Tướng Đài - Gacha Altar)
* **Nguyên Mẫu Thế Giới Thực**: Binh phù hình hổ tạc bằng đồng đen thời Chiến Quốc, bẻ làm hai nửa. Khi triệu hoán, hai nửa phù khớp lại phát ra ánh sáng vàng nóng chảy hàn gắn rạn nứt.
* **Quy Trình Hiệu Ứng Triệu Hoán**:
  1. **Khởi Thao Tác**: Người chơi chạm và giữ ngọc bội/hổ phù trên đài tế. Vòng bát quái mực đen bắt đầu xoay chậm.
  2. **Tích Khí (Channeling)**: Mực đen tích tụ ở tâm trận pháp, sấm sét chu sa rạch ngang màn hình.
  3. **Vỡ Vụn & Hàn Gắn (Fracture & Kintsugi)**: Khối ngọc vỡ toác thành nhiều mảnh rồi tức thì được vàng nóng chảy trám kín các đường nứt.
  4. **Khai Bài (Reveal)**: Con dấu triện chu sa đóng sầm xuống với âm hưởng chuông đồng cổ (`sound: bronze_bell`), lá bài anh hồn bung tỏa hào quang tương ứng với phẩm cấp (UR: Kim Hoàng Thần Quang, SSR: Tử Lôi Ánh Điện).

---

### 2.4. Binh Thư Giản & Quân Bài Thép Tôi (Chiến Đấu Tầng 3)
* **Nguyên Mẫu Thế Giới Thực**: Thẻ lệnh điều binh (*Lệnh Bài*) bằng thép cán mỏng, khắc chìm đồ hình trận pháp.
* **Chi Tiết Giao Diện**:
  - **Khung Bài**: Thép tôi viền đen (`#0f172a`), rãnh rạn nứt mạ vàng chạy dọc thân thẻ.
  - **Chi Phí Thi Triển (AP Cost)**: Giọt nước bích ngọc đính ở góc trên bên trái, bên trong khắc số Hán tự hoặc số Ả Rập mạ vàng.
  - **Huy Hiệu Binh Chủng**: Khắc nổi biểu tượng kim loại (Thương, Kỵ, Cung, Mưu, Trợ).
  - **Thanh Máu & Giáp Binh Sĩ**: Thiết kế dạng thanh tre gọt phẳng đính hạt ngọc, giáp biểu thị bằng khiên đồng bao bọc.

---

## 3. Quy Định Vật Liệu & Phối Hợp Shader (Shader Directives)

| Thành Phần | Tên Shader / CSS Effect | Thông Số Kỹ Thuật | Phản Ứng Tương Tác |
| :--- | :--- | :--- | :--- |
| **Nền Khung Giao Diện** | `lacquer_grain_surface` | Noise SVG 3% alpha, Luminance Mask | Không đổi góc nhìn |
| **Vết Nứt Kintsugi** | `molten_gold_vein` | Gradient 3 điểm (#fbbf24 -> #d97706), Glow 8px | Sáng rực lên (pulse) khi di chuột |
| **Dấu Ấn Thần Chiếu** | `cinnabar_stamp_fx` | Drop shadow đỏ thẫm `#991b1b`, Stamp scale 1.15 -> 1.0 | Rung màn hình 2px khi kích hoạt |
| **Sương Mù Chiến Trận** | `ink_smoke_drift` | Perlin Noise lặp chu kỳ 12s, Blend Mode: Multiply | Trôi dạt theo hướng gió sa bàn |
| **Thủy Kính Phản Quang**| `brushed_bronze_border`| Conic-gradient đa góc phản quang 45deg | Lóe sáng quét ngang khi mở khóa |

---

## 4. Hướng Dẫn Âm Thanh Đi Kèm (Diegetic Audio Cues)

Một giao diện Diegetic hoàn chỉnh phải đi đôi với xúc giác âm thanh cổ phong:
* **Bấm Nút / Lựa Chọn**: Tiếng gõ mảnh ngọc (`jade_click.wav`, 120ms, âm vực cao trong trẻo).
* **Mở Cuộn Thư / Sa Bàn**: Tiếng mở cuộn lụa hoặc xào xạc của nan tre khô (`bamboo_scroll_open.wav`, 350ms).
* **Xác Nhận Ban Chỉ / Xuất Quân**: Tiếng đóng dấu triện nặng nề bằng đá lên lụa (`seal_stamp_heavy.wav`, 250ms).
* **Bái Tướng Triệu Hoán**: Tiếng chuông khánh đồng cổ ngân vang dài kết hợp tiếng gầm gió (`ancient_bell_resonate.wav`, 2.5s).
* **Lật Thẻ Bài Chiến Đấu**: Tiếng va chạm nhẹ của tấm thép tôi mạ đồng (`card_draw_steel.wav`, 180ms).

---

## 5. Danh Mục Kiểm Tra Tính Nhất Quán Diegetic (Integrity Checklist)

- [ ] **Không Có Yếu Tố Hiện Đại**: Tuyệt đối không dùng nút tròn bóng bẩy kiểu iOS, không dùng màu tím neon cyberpunk.
- [ ] **Không Dùng Emoji Biểu Tượng**: 100% icon phải dùng vector SVG hình khắc cổ phong (gươm, quạt lông vũ, ngọc tỷ, khiên gỗ).
- [ ] **Độ Dày Và Chiều Sâu**: Mọi bảng điều khiển đều phải có ít nhất 2 lớp viền (viền ngoài gỗ mun mờ, viền trong chỉ vàng/đồng mỏng).
- [ ] **Ngôn Ngữ Thư Pháp Chuẩn Hóa**: Tiêu đề sử dụng font phong cách Thư Pháp / Noto Serif Hán phong, thân chữ dùng font Serif dễ đọc không chân nhẹ nhàng.
