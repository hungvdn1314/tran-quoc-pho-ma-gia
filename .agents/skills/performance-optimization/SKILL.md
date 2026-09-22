---
name: performance-optimization
description: >-
  Skill tối ưu hóa hiệu năng, bộ nhớ và tài nguyên đồ họa (Performance Profiling & Asset Optimization Pipeline).
  Sử dụng khi cần đo kiểm và duy trì 60 FPS ổn định, giảm tải Draw Calls trên WebGL/Canvas (< 30 calls/scene),
  nén ảnh hàng loạt sang định dạng WebP/AVIF hiện đại, tối ưu dung lượng font chữ tiếng Việt (Font Subsetting),
  quản lý thu gom rác bộ nhớ (Texture Disposal / GC Monitoring), và thiết lập Performance Budgets.
---

# Performance Optimization Pipeline Skill
*Chiến lược tối ưu hóa hiệu năng và đóng gói tài nguyên cho Trấn Quốc Phò Mã Gia*

---

## 1. MỤC TIÊU HIỆU NĂNG & PERFORMANCE BUDGET

Dự án sử dụng nhiều tầng hiển thị (Canvas 2D, Three.js 3D Flip Card, hiệu ứng hạt Bát Quái và các Standee nhân vật độ phân giải cao 848x1264 RGBA). Nếu không kiểm soát chặt chẽ, game sẽ gặp hiện tượng tụt khung hình (Jank/Stutter) và tràn RAM trên các thiết bị cấu hình thấp hoặc trình duyệt di động.

### Bảng Ngân Sách Hiệu Năng (Quantitative Performance Budget)

| Chỉ Số Đo Lường | Ngưỡng Cho Phép (Budget) | Phương Pháp Kiểm Tra |
|:---|:---|:---|
| **Khung hình ổn định (Frame Rate)** | **60 FPS** (Tối thiểu 45 FPS trong cảnh combat) | Chrome DevTools Performance Panel |
| **Thời gian tải lần đầu (First Load)** | **< 2.0 giây** trên mạng 4G/WiFi | Lighthouse Performance Audit |
| **Tiêu thụ bộ nhớ RAM (Memory Footprint)**| **< 180 MB** trong mọi cảnh chơi | Chrome Task Manager / Memory Snapshot |
| **WebGL / Canvas Draw Calls** | **< 30 calls / scene** | Spector.js WebGL Inspector |
| **Dung lượng Standee nhân vật** | **< 250 KB** / Standee (WebP RGBA) | Script kiểm tra tự động |
| **Dung lượng Cảnh nền (Backgrounds)** | **< 150 KB** / Background (WebP 1080p) | Script kiểm tra tự động |
| **Dung lượng Font chữ tiếng Việt** | **< 80 KB** / Font file sau subset | FontTools subsetter |

---

## 2. NĂM TRỤ CỘT TỐI ƯU HÓA KỸ THUẬT

### 2.1. Nén Đồ Họa Đa Tầng (Modern Image Formats)
* Chuyển đổi toàn bộ PNG kích thước lớn sang **WebP nén chất lượng cao (Quality 85-90%)** hoặc **AVIF**.
* Tự động tạo ảnh WebP đi kèm bản fallback PNG qua script `scripts/compress_assets.py`.
* Giảm trung bình 60% - 75% dung lượng tải mạng mà không suy giảm độ sắc nét của nét vẽ thủy mặc.

### 2.2. Quản Lý Giải Phóng Bộ Nhớ (Texture Disposal & Memory Leaks)
* **Vấn đề**: Khi chuyển từ cảnh Sa Bàn sang Sa Trường Thẻ Bài, nếu không hủy texture của bản đồ, RAM sẽ tăng lũy tiến sau mỗi màn chơi và gây Crash trên thiết bị di động.
* **Quy chuẩn bắt buộc**:
  ```javascript
  // Mọi Three.js / Canvas object khi ẩn phải gọi phương thức dispose()
  function disposeViewTextures(container) {
    if (container.texture) container.texture.dispose();
    if (container.material) container.material.dispose();
    if (container.geometry) container.geometry.dispose();
  }
  ```

### 2.3. Rút Gọn Font Chữ Tiếng Việt (Font Subsetting)
* Các bộ font gốc như `Noto Serif`, `Lora`, `Playfair Display` chứa hàng chục nghìn ký tự của nhiều ngôn ngữ (Latin mở rộng, Cyrillic, Hy Lạp, Hán tự) khiến file font nặng từ 400KB đến 1.2MB.
* **Giải pháp**: Chỉ giữ lại bảng mã Unicode tiếng Việt (`U+0020-007E`, `U+00A0-024F`, `U+1EA0-1EF9`) và các ký tự ấn triện phong thủy (`[ 駙 ]`, `[ 武 ]`, `[ 青 ]`, `[ 關 ]`).
* Giảm kích thước mỗi file font xuống chỉ còn **~45KB - 70KB**.

### 2.4. Khóa Tương Tác Chuột & Tránh Layout Shifts
* **Quy tắc vàng**: Inactive views bắt buộc có `visibility: hidden !important; pointer-events: none !important;`.
* Tránh đọc DOM rồi ghi DOM liên tiếp (Reflow Thrashing). Gom các thao tác DOM vào một hàm `requestAnimationFrame`.

### 2.5. Tải Tài Nguyên Lũy Tiến (Progressive Asset Loading)
* Chỉ nạp trước (preload) các tài nguyên của Chương hiện tại.
* Standee của các tướng chưa sở hữu sẽ chỉ được tải khi người chơi mở giao diện Thần Đàn Bái Tướng hoặc Tra Cứu Tướng.

---

## 3. TÀI LIỆU & CÔNG CỤ ĐI KÈM
- Ngân sách hiệu năng chi tiết: [performance_budget.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/performance-optimization/references/performance_budget.md)
- Hướng dẫn nén ảnh & âm thanh: [asset_compression_guide.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/performance-optimization/references/asset_compression_guide.md)
- Script nén ảnh tự động: `scripts/compress_assets.py`
