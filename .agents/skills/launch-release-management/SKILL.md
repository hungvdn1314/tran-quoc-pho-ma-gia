---
name: launch-release-management
description: >-
  Skill quản lý phát hành, thử nghiệm giới hạn và nộp duyệt ứng dụng (Launch & Release Management Pipeline).
  Sử dụng khi cần lập kế hoạch Soft Launch / Closed Beta Test (CBT), đo lường chỉ số sống còn (D1/D7/D30 Retention, ARPU),
  chuẩn bị hồ sơ nộp duyệt Store (Steam, App Store, Google Play, Web/PWA), tối ưu hóa hiện diện cửa hàng (ASO),
  chạy thử tải máy chủ (Stress Testing), và xây dựng kịch bản ứng phó sự cố ngày đầu ra mắt (Day-1 Incident Runbook).
---

# Launch & Release Management Pipeline Skill
*Chiến lược phát hành & quản lý ngày ra mắt cho Trấn Quốc Phò Mã Gia*

---

## 1. VÒNG ĐỜI PHÁT HÀNH (RELEASE PHASES)

Phát hành một tựa game hybrid kết hợp Gacha và cốt truyện lớn không bao giờ là một nút bấm "Publish" đột ngột, mà là một quy trình chuyển tiếp 4 bước có kiểm soát:

```
[Closed Beta Test (CBT)] ──→ [Soft Launch (Khu vực hẹp)] ──→ [Pre-Registration] ──→ [Global Launch]
(500 - 1.000 testers)        (1.000 - 5.000 players)        (Cổng đăng ký sớm)       (Mở cổng toàn cầu)
• Tìm lỗi Crash & Softlock   • Đo lường D1/D7/D30           • Mở khóa mốc quà        • Kích hoạt Marketing
• Kiểm tra kịch bản Ink      • Kiểm tra phễu Tutorial       • Tích lũy Wishlist/ASO  • Trực chiến Day-1
```

---

## 2. BỘ CHỈ SỐ SỐNG CÒN CẦN ĐẠT TRONG SOFT LAUNCH (GATE KPIS)

Trước khi kích hoạt chiến dịch quảng bá toàn cầu, bản Soft Launch phải đạt được các ngưỡng chỉ số tối thiểu:

| Chỉ Số (KPI) | Định Nghĩa | Ngưỡng Mục Tiêu | Ý Nghĩa Sống Còn |
|:---|:---|:---:|:---|
| **D1 Retention** | Tỷ lệ người chơi quay lại sau 24h | **> 42%** | Đánh giá sức hút ban đầu của cốt truyện và lối chơi |
| **D7 Retention** | Tỷ lệ người chơi quay lại sau 7 ngày | **> 18%** | Đánh giá chiều sâu của Sa Bàn và Thẻ Bài |
| **D30 Retention** | Tỷ lệ người chơi quay lại sau 30 ngày| **> 8%** | Đánh giá tính bền vững của vòng lặp Gacha |
| **Tutorial Completion**| Tỷ lệ hoàn thành Chương 1 & 5 | **> 75%** | Phát hiện điểm người chơi bị nghẽn (Funnel Dropout) |
| **Gacha Conversion** | Tỷ lệ người chơi nạp tiền lần đầu | **> 3.5%** | Đánh giá mức độ hấp dẫn của Banner Triệu Tử Long / Điêu Thuyền |

---

## 3. DANH MỤC HỒ SƠ NỘP DUYỆT CỬA HÀNG (STORE SUBMISSION SUITE)

Mọi nền tảng phân phối (Steam / Web / Mobile) đều yêu cầu gói tài nguyên nghiêm ngặt:
1. **Minh Bạch Xác Suất Gacha (Legal Compliance)**: Bắt buộc phải có bảng hiển thị công khai tỷ lệ ra tướng từng phẩm cấp (R: 85%, SR: 12%, SSR: 2.4%, UR: 0.6%) và cơ chế bảo hiểm Pity tại giao diện Thần Đàn.
2. **Store Art Package**:
   - Icon ứng dụng chuẩn (512x512 PNG, chữ triện vàng trên nền đen sáp).
   - Banner Steam Capsule (460x215, 920x430, 616x353).
   - 5 ảnh chụp màn hình chất lượng cao đại diện cho 4 tầng gameplay (VN, Sa Bàn, Sa Trường, Bái Tướng).
   - Trailer gameplay 60 giây giới thiệu vòng lặp chiến thuật và chất giọng nhân vật.
3. **Chính Sách Quyền Riêng Tư (Privacy Policy)**: Cam kết bảo vệ dữ liệu người dùng và không thu thập thông tin định danh trái phép.

---

## 4. KỊCH BẢN ỨNG PHÓ SỰ CỐ NGÀY ĐẦU (DAY-1 INCIDENT RUNBOOK)

* **Trực chiến 24/7 (War Room)**: Nhóm kỹ thuật theo dõi trực tiếp các chỉ số thời gian thực (CCU, Request/sec, Crash rate).
* **Quy trình đền bù minh bạch (Apologems)**: Nếu máy chủ bảo trì đột xuất hoặc phát sinh lỗi tỷ lệ quay, lập tức gửi quà bồi thường "Thiên Cơ Lệnh" hoặc "Anh Hồn Lệnh" kèm thư xin lỗi từ Trấn Quốc Phò Mã Phủ.
* **Kế hoạch lùi phiên bản (Rollback Plan)**: Luôn giữ một bản sao lưu (Snapshot) của phiên bản trước đó để kích hoạt trong vòng 5 phút nếu bản build mới gặp lỗi nghiêm trọng (S1 Blocker).

---

## 5. TÀI LIỆU KÈM THEO
- Khung thử nghiệm Soft Launch: [soft_launch_framework.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/launch-release-management/references/soft_launch_framework.md)
- Checklist nộp duyệt Store: [store_submission_checklist.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/launch-release-management/references/store_submission_checklist.md)
- Kịch bản xử lý khủng hoảng Day-1: [incident_response_runbook.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/launch-release-management/references/incident_response_runbook.md)
