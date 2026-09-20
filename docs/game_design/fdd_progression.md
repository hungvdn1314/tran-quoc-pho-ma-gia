# FDD-PRG-001: Feature Design Document - Progressive Progression

## 1. Objective
Thiết kế lộ trình mở khóa các tính năng của game một cách tuyến tính và mượt mà, tránh tình trạng Information Overload (ngợp thông tin) cho tân thủ.

## 2. User Story
- Là người chơi, tôi muốn dần dần khám phá các hệ thống sâu hơn của game khi tôi đã quen với các cơ chế cơ bản.

## 3. Core Mechanics

### 3.1. Imperial Prestige Rank System
Quá trình thăng tiến của Phò Mã được chia làm các Rank, đi kèm với việc mở rộng quyền hạn:
1. Thư Sinh (Sinh viên)
2. Phò Mã (Hoàng thân quốc thích)
3. Tiết Độ Sứ (Quan coi giữ biên cương)
4. Đại Tướng (Nắm giữ binh quyền)
5. Hoàng Đế (Đăng cơ, endgame)

### 3.2. Chapter-by-Chapter Unlock Table
- **Ch.1 - Ch.4:** Visual Novel cơ bản, làm quen cốt truyện.
- **Ch.5:** Mở Bái Tướng Đài (Gacha) - Nhận SSR đầu tiên.
- **Ch.12:** Mở Psyche-Lock Debate.
- **Ch.15:** Mở Đế Nghiệp Sa Bàn (Strategy Map) - Quản lý Node Thái Ấp.
- **Ch.20:** Mở Kinh tế học cơ bản (Xưởng Xà Phòng).
- **Ch.30:** Giới thiệu Suspicion Meter (Hoàng Đế bắt đầu nghi ngờ).
- **Ch.48:** Mở Sa Trường Thẻ Bài (Tactical Card Battler).
- ...
- **Ch.386:** Endgame Coronation (Đăng cơ).

### 3.3. Unlock Fanfare Animation & Toast System
- Mỗi khi một tính năng mở khóa, hiển thị hiệu ứng "Kintsugi Vỡ" tràn màn hình, sau đó là thông báo Toast với thiết kế chiếu chỉ hoàng gia.

### 3.4. Locked State Styling
- Các icon tính năng chưa mở khóa sẽ hiển thị ở dạng Grayscale overlay (xám xịt) kèm biểu tượng Ổ khóa sắt.

### 3.5. Tutorial/Onboarding Pacing
- **Phase 1 (Learn):** Bắt buộc làm theo chỉ dẫn (Bàn tay trỏ).
- **Phase 2 (Practice):** Gợi ý nhưng cho phép sai.
- **Phase 3 (Master):** Hoàn toàn thả tự do.

## 4. Edge Cases
- Nếu user cố tình click vào tính năng đang khóa, hiển thị Tooltip: "Mở khóa tại Chương X - [Tên chương]".

## 5. Unlock Prerequisites
- Hệ thống này chạy ngầm (Backend tracking) ngay từ khi bắt đầu game.
