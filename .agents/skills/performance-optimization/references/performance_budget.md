# 📊 Performance Budget & Measurement Guide: Trấn Quốc Phò Mã Gia

Quy định chi tiết các chỉ số đo lường hiệu năng, giới hạn kỹ thuật và công cụ kiểm thử.

---

## 1. BẢNG NGÂN SÁCH HIỆU NĂNG ĐỊNH LƯỢNG

| Khía cạnh | Chỉ số | Ngưỡng Mục Tiêu | Ngưỡng Cảnh Báo (Amber) | Ngưỡng Nguy Cấp (Red) |
|:---|:---|:---:|:---:|:---:|
| **Frame Rate** | FPS trung bình trong Combat | **60 FPS** | < 50 FPS | < 40 FPS |
| **Frame Drops** | Số frame rớt > 33ms (Stutter) | **0 frame** | 1 - 3 frames | > 5 frames |
| **Initial Load** | Thời gian đến khi tương tác (TTI) | **< 1.8s** | 1.8s - 3.0s | > 3.5s |
| **Scene Switch** | Chuyển giữa VN / Sa Bàn / Combat | **< 300ms** | 300ms - 600ms | > 800ms |
| **Memory (RAM)** | Heap Memory tiêu thụ | **< 160 MB** | 160 MB - 220 MB | > 250 MB |
| **Draw Calls** | Số lệnh vẽ WebGL mỗi frame | **< 25 calls** | 25 - 45 calls | > 50 calls |
| **Asset Size** | Tổng bundle tải ban đầu (Initial Bundle) | **< 3.5 MB** | 3.5 MB - 6.0 MB | > 8.0 MB |

---

## 2. QUY TRÌNH PROFILE BẰNG CHROME DEVTOOLS

1. Mở DevTools (`F12`), chuyển sang tab **Performance**.
2. Chọn cấu hình giả lập: **CPU 4x Slowdown** và **Fast 3G** (để mô phỏng thiết bị tầm trung).
3. Bấm Record (`Ctrl + E`), thực hiện chuỗi hành động:
   - Đọc 3 câu thoại VN.
   - Chuyển sang Sa Bàn, chọn điều động 1 đạo quân.
   - Chuyển sang Sa Trường, ra 2 thẻ bài, kết thúc lượt.
   - Mở Bái Tướng Thần Đàn, quay 1 lượt gacha có hoạt ảnh 3D.
4. Dừng Record, phân tích:
   - Biểu đồ **FPS**: Đường màu xanh lá cây phải phẳng đều ở 60 FPS.
   - Biểu đồ **Main Thread**: Không có vệt đỏ "Long Task" nào vượt quá 50ms.
   - Biểu đồ **JS Heap**: Kiểm tra xem RAM có hạ xuống sau khi Garbage Collection chạy hay không (răng cưa đều đặn, không dốc đứng liên tục).
