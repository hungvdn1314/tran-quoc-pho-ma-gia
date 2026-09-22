---
name: liveops-post-launch
description: >-
  Skill vận hành dịch vụ trực tiếp, quản lý chu kỳ cập nhật và kiểm soát lạm phát sức mạnh (LiveOps & Post-Launch Pipeline).
  Sử dụng khi cần lập lịch trình xoay vòng Banner tướng 2 tuần (Bi-weekly Banner Cadence), thiết kế sự kiện theo mùa (Seasonal Events),
  kiểm soát lạm phát sức mạnh thẻ bài (Power Creep Management Framework theo triết lý Buff-over-Nerf),
  thiết lập cơ chế cập nhật nội dung không cần tải lại app (Hot-update via CDN), và chăm sóc cộng đồng game thủ.
---

# LiveOps & Post-Launch Operations Pipeline Skill
*Chiến lược vận hành dịch vụ trực tiếp & chu kỳ nội dung cho Trấn Quốc Phò Mã Gia*

---

## 1. NGUYÊN TẮC VẬN HÀNH DỊCH VỤ TRỰC TIẾP (GAMES AS A SERVICE)

Một tựa game Gacha/Chiến thuật hybrid bắt đầu cuộc đời thực sự của nó vào ngày phát hành. Nếu không có kế hoạch vận hành nội dung liên tục (LiveOps), người chơi sẽ tiêu thụ hết nội dung trong vòng 30 ngày và rời bỏ trò chơi:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CHU KỲ PHÁT HÀNH NỘI DUNG (CADENCE)               │
├───────────────────┬───────────────────┬───────────────────┬─────────────────┤
│ 2 TUẦN (BI-WEEKLY)│ HÀNG THÁNG        │ HÀNG QUÝ (QUARTER)│ HÀNG NĂM        │
├───────────────────┼───────────────────┼───────────────────┼─────────────────┤
│ • Rate-up Banner  │ • Bản vá Cân Bằng │ • Chương mới Ink  │ • Đại Bản Hội   │
│   (Tướng mới SSR) │   (Balance Patch) │ • Bản đồ Sa Bàn   │   (Anniversary) │
│ • Ngoại truyện VN │ • Mùa Chiến Trường│   mới (Kinh Kỳ)   │ • Nâng cấp động │
│ • Quà đăng nhập   │ • Gói Chiến Lệnh  │ • Tướng Thần Cảnh │   cơ lớn        │
└───────────────────┴───────────────────┴───────────────────┴─────────────────┘
```

---

## 2. QUẢN LÝ LẠM PHÁT SỨC MẠNH (POWER CREEP MANAGEMENT FRAMEWORK)

Lạm phát sức mạnh là "căn bệnh ung thư" của các tựa game Gacha. Nếu tướng ra sau luôn mạnh gấp đôi tướng ra trước, toàn bộ công sức cày cuốc của người chơi cũ sẽ bị vô giá trị hóa, dẫn đến làn sóng tẩy chay:

### 2.1. Triết Lý Cân Bằng: "Buff-over-Nerf" (Tăng Sức Mạnh Hơn Là Giảm Sức Mạnh)
* **Tuyệt đối không giảm sức mạnh (Nerf) trực tiếp** một danh tướng mà người chơi đã bỏ tiền thật ra quay trong Gacha, trừ trường hợp lỗi kỹ thuật nghiêm trọng.
* Nếu một tướng quá mạnh làm bá chủ meta:
  1. Ra mắt tướng mới hoặc thẻ bài mới có cơ chế **Khắc Chế Tự Nhiên (Hard Counter)**.
  2. Nâng cấp (Buff) hoặc bổ sung cơ chế Duyên Phận mới cho các tướng cũ yếu thế để kéo họ quay trở lại meta.

### 2.2. Trần Giới Hạn Sức Mạnh (Stat & Power Budget Cap)
* Mọi tướng mới dù thuộc phẩm cấp UR cũng không được vượt quá **115% Power Budget** của tướng UR thế hệ đầu (ví dụ: lấy Triệu Tử Long làm chuẩn mực 100%).
* Sự vượt trội của tướng mới phải nằm ở **Độ Đa Dạng Chiến Thuật (Tactical Versatility)** và **Cơ Chế Độc Đáo** (Ví dụ: Giả Hủ gây Độc Tâm khống chế, Cao Thuận dựng Hãm Trận Thuẫn) chứ không phải chỉ số thuần túy to hơn.

---

## 3. CƠ CHẾ CẬP NHẬT NÓNG (HOT-UPDATE VIA CDN)

Hệ thống cho phép studio cập nhật kịch bản chương mới (`.ink`), bảng cân bằng chỉ số (`heroes.json`, `cards.json`), và banner gacha mới mà **người chơi không cần phải tải lại toàn bộ app**:
1. Client kiểm tra tệp `version.json` trên Cloudflare CDN khi khởi động.
2. Nếu mã phiên bản trên CDN mới hơn local, client tự động nạp delta package (chỉ tải các file JSON và WebP mới) và nạp lại `GAME_DATA`.
3. Quá trình tải diễn ra ngầm trong lúc người chơi xem màn hình tải trang.

---

## 4. QUẢN TRỊ CỘNG ĐỒNG & BỒI THƯỜNG MINH BẠCH (COMMUNITY RELATIONS)

* **Quy tắc viết Patch Notes**: Mọi thay đổi về chỉ số phải được giải thích rõ ràng bằng lý do thiết kế (Design Intent).
* **Chính sách Bồi thường (Apologems)**: Mỗi giờ bảo trì phát bù 100 Vàng + 1 Anh Hồn Lệnh. Nếu bảo trì kéo dài hơn dự kiến, nhân đôi mức bồi thường.

---

## 5. TÀI LIỆU KÈM THEO
- Mẫu lịch trình Banner 12 tháng: [banner_cadence_template.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/liveops-post-launch/references/banner_cadence_template.md)
- Khung kiểm soát lạm phát sức mạnh: [power_creep_framework.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/liveops-post-launch/references/power_creep_framework.md)
