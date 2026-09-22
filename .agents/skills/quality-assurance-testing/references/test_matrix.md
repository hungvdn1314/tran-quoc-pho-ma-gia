# 🧪 Master Test Case Matrix: Trấn Quốc Phò Mã Gia

Bảng ma trận kiểm thử chi tiết phân cấp theo mức độ nghiêm trọng và 4 tầng gameplay của dự án.

---

## PHÂN CẤP MỨC ĐỘ LỖI (BUG SEVERITY)
* **S1 (Blocker/Crash)**: Đứng game, sập ứng dụng, mất hoàn toàn dữ liệu Save, kẹt cứng trong kịch bản không thể tiến tiếp.
* **S2 (Critical)**: Sai lệch kết quả Gacha/Pity, lỗi công thức sát thương khiến bất tử hoặc chết ngay lập tức, nút UI quan trọng không thể bấm.
* **S3 (Major)**: Sai logic nhánh thoại, hiển thị sai ảnh chân dung nhân vật, âm thanh không phát, click xuyên màn hình.
* **S4 (Minor/Cosmetic)**: Lỗi chính tả, lỗi căn lề text, hiệu ứng hạt hơi lệch tọa độ, font chữ bị giật nhẹ.

---

## MA TRẬN TEST CASES THEO MODULE

| ID | Module | Mô tả kiểm thử | Điều kiện đầu vào | Kết quả mong đợi | Mức độ |
|:---|:---|:---|:---|:---|:---:|
| **TC-VN-001** | Visual Novel | Hiển thị thoại và typewriter | Kích hoạt Knot `chapter_1_start` | Chữ chạy mượt mà, đúng tốc độ, không vỡ layout | S3 |
| **TC-VN-002** | Visual Novel | Lựa chọn phân nhánh (Choices) | Người chơi chọn Option 1 hoặc 2 | Kịch bản chuyển đúng knot rẽ, cờ (flags) được set chính xác | S1 |
| **TC-VN-003** | Visual Novel | Đổi chân dung diễn viên (Actors) | Thẻ `#actor-left: to_kien_phong` | Chân dung đổi đúng nhân vật độc bản, không tái sử dụng sai | S2 |
| **TC-VN-004** | Visual Novel | Đọc hết kịch bản chương | Đọc đến cuối Knot `chapter_15_transition` | Tự động kích hoạt cờ mở khóa Tầng 2 (Sa Bàn Sơn Hà) | S1 |
| **TC-MAP-001** | Sa Bàn | Tiêu hao Điểm Hành Động (AP) | Xuất quân từ Khai Nguyên đến Liễu Châu | Trừ chính xác 1 AP; nếu AP = 0 thì không thể xuất quân | S2 |
| **TC-MAP-002** | Sa Bàn | Kiểm tra sương mù chiến tranh | Chọn vùng đất chưa do thám | Hiển thị thông báo cần phái thám báo trước khi hành quân | S3 |
| **TC-BAT-001** | Sa Trường | Ra bài từ bộ bài trên tay | Kéo thẻ bài Hãm Trận Doanh (cost 3) | Trừ 3 Mana, đơn vị xuất hiện ở làn đã chọn | S2 |
| **TC-BAT-002** | Sa Trường | Công thức sát thương & Giáp | Tấn công đơn vị có Giáp = 50 | Sát thương nhận vào = RawAtk * (100 / 150) | S2 |
| **TC-BAT-003** | Sa Trường | Boss Intent Telegraphing | Kết thúc lượt của người chơi | Hiển thị chính xác chiêu thức Boss sẽ ra ở lượt sau | S2 |
| **TC-BAT-004** | Sa Trường | Phá vỡ ý đồ Boss (Interrupt) | Gây đủ 80 DMG phá vỡ thế đao | Trạng thái Boss đổi thành "Bị Gián Đoạn", không gây sát thương | S2 |
| **TC-BAT-005** | Sa Trường | Sụp đổ Tường Thành (Wall HP = 0)| Boss đánh sập tường thành | Trận đấu thất bại ngay lập tức, hiển thị màn hình chiến bại | S1 |
| **TC-GAC-001** | Bái Tướng Đài | Chiêu mộ đơn lẻ (Single Pull) | Bấm nút Chiêu Mộ khi có 1 Anh Hồn Lệnh | Trừ 1 vé, kích hoạt nghi thức Bát Quái phá ấn và Grand Reveal | S2 |
| **TC-GAC-002** | Bái Tướng Đài | Soft Pity Ramp (Lượt 74-89) | Người chơi chưa trúng UR ở lượt 73 | Tỷ lệ trúng UR tăng lũy tiến mỗi lượt theo bảng công thức | S2 |
| **TC-GAC-003** | Bái Tướng Đài | Hard Pity (Lượt 90) | Người chơi đạt 89 lượt không có UR | Lượt thứ 90 chắc chắn 100% xuất hiện tướng UR | S1 |
| **TC-GAC-004** | Bái Tướng Đài | Bảo hiểm 50/50 Guarantee | Lần trước trúng UR nhưng lệch rate | Lần trúng UR tiếp theo chắc chắn 100% là tướng Banner | S1 |
| **TC-SEC-001** | Lưu Trữ | Lưu và Tải lại game (Save/Load) | Thoát game giữa trận đánh rồi vào lại | Tái tạo chính xác trạng thái bàn cờ, máu tường thành, bài trên tay | S1 |
| **TC-UI-001** | Giao Diện | Chống click xuyên thấu | Mở bảng tra cứu Hero Inspector | Không thể click vào các nút Sa Bàn hoặc thẻ bài phía sau | S2 |
| **TC-TYP-001** | Typography | Kiểm tra hiển thị dấu tiếng Việt | Mở toàn bộ danh xưng và kịch bản | 100% chữ tiếng Việt hiển thị đồng nhất font, không bị Frankenstein | S1 |
