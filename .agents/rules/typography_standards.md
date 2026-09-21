# 📜 Quy Chuẩn Typography & Ngôn Ngữ Dự Án (Project Typography & Vietnamese Language Standards)

> **Mục tiêu**: Đảm bảo 100% văn bản tiếng Việt và thư pháp ấn triện Hán tự trong toàn bộ dự án "Trấn Quốc Phò Mã Gia" hiển thị hoàn mỹ, tuyệt đối không bị lỗi vỡ font, nhảy nét, hoặc fallback sang font thô hệ thống.

---

## 1. Kiến Trúc Typography 4 Tầng Bắt Buộc

Mọi định nghĩa kiểu chữ trong HTML, CSS, JavaScript Canvas, Three.js hoặc PixiJS bắt buộc phải tuân theo 4 biến chuẩn:

```css
:root {
  /* 1. Đại Tự Hoàng Triều: Tiêu đề chương, cứ điểm sa bàn, tên tướng, danh xưng thế lực */
  --font-title: 'Playfair Display', 'Cormorant Garamond', 'Lora', 'Noto Serif', serif;

  /* 2. Giao Diện & Chỉ Số: UI metrics, buttons, tooltips, tài nguyên, badges */
  --font-text: 'Be Vietnam Pro', 'Segoe UI', -apple-system, sans-serif;

  /* 3. Văn Phong Tự Sự: Lời thoại Visual Novel, kịch bản, trích dẫn văn học */
  --font-serif: 'Lora', 'Noto Serif', 'Palatino Linotype', 'Times New Roman', serif;

  /* 4. Thư Pháp Ấn Triện: Dấu triện chu sa, lệnh bài, ngọc bội, Hán tự cổ */
  --font-seal: 'ZCOOL XiaoWei', 'Noto Serif SC', 'Songti SC', 'SimSun', 'STSong', 'KaiTi', serif;
}
```

---

## 2. Danh Sách Đen (Font Blacklist & Anti-Patterns)

1. ❌ **CẤM TUYỆT ĐỐI FONT `Cinzel` VÀ CÁC FONT KHÔNG HỖ TRỢ TIẾNG VIỆT**:
   - `Cinzel`, `Trajan Pro`, `Bebas Neue`, `Cinzel Decorative`... **không chứa dải Unicode tiếng Việt `U+1EA0 - U+1EF9`**.
   - Tuyệt đối không đưa các font này vào bất kỳ vị trí nào trong `--font-title` hoặc font stack có chứa nội dung tiếng Việt.
   - Khi một từ tiếng Việt (`ĐẠI VŨ KINH ĐÔ`, `PHÁ GIẢI CÂU ĐỐI HOÀNG CUNG`) đi qua `Cinzel`, các chữ không dấu sẽ hiển thị bằng Cinzel nhưng các chữ có dấu (`Đ, Ố, Ả, Ậ...`) sẽ bị xẻ đôi và fallback sang Arial/Georgia, tạo ra lỗi "Frankenstein Typography".

2. ❌ **KHÔNG GÁN FONT TIÊU ĐỀ LA-TINH CHO ẤN TRIỆN HÁN TỰ**:
   - Các chữ ấn triện (`[ 駙 ]`, `[ 武 ]`, `[ 青 ]`, `[ 關 ]`, `[ 殿 ]`, `[ 輿 ]`, `[ 戈 ]`, `[ 密 ]`, `[ 卷 ]`) phải dùng riêng `var(--font-seal)` (`ZCOOL XiaoWei`).
   - Tuyệt đối không dùng font không chân hiện đại (như Arial, Segoe UI) cho ấn triện chu sa.

3. ❌ **KHÔNG RỚT DÒNG ĐƠN ĐỘC Ở THẺ CHƯƠNG TIẾT**:
   - Các nhãn chương (`.banner-chapter`) phải luôn có `white-space: nowrap;` để tránh hiện tượng số chương bị rớt xuống dòng riêng biệt (`CHƯƠNG` dòng 1, `1` dòng 2).

---

## 3. Quy Chuẩn Đồ Họa 3D (Three.js & Canvas 2D Textures)

1. **Lắng nghe `document.fonts.ready`**:
   - Canvas 2D khi dùng `ctx.fillText()` trước khi web fonts tải xong sẽ lưu vết font thô hệ thống vào texture GPU.
   - Bắt buộc phải gắn cờ hoặc re-render lại texture khi `document.fonts.ready` hoàn tất:
   ```javascript
   if (document.fonts) {
     document.fonts.ready.then(() => {
       // Cập nhật lại flagMesh.material.map và plateMesh.material.map
     });
   }
   ```

2. **Font Stack trong Canvas Context**:
   - Đại tự Hán ấn triện:
     `ctx.font = 'bold 112px "ZCOOL XiaoWei", "Noto Serif SC", "Songti SC", "SimSun", serif';`
   - Phụ đề danh xưng cứ điểm:
     `ctx.font = 'bold 34px "Playfair Display", "Cormorant Garamond", "Lora", serif';`

---

## 4. Google Fonts Import Chuẩn Mực

Mọi tài liệu HTML của dự án khi nhúng Google Fonts phải nạp đầy đủ các trọng số tiếng Việt:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@700;900&display=swap" rel="stylesheet">
```
