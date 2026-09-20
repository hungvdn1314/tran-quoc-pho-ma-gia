# FDD-GAC-001: Feature Design Document - Bái Tướng Đài (Gacha System)

## 1. Objective
Tạo ra một hệ thống Gacha lôi cuốn (Bái Tướng Đài) để người chơi triệu hồi các danh tướng Tam Quốc, phục vụ cho quá trình chinh phạt.

## 2. User Story
- Là người chơi, tôi muốn sử dụng tiền tệ để triệu hồi các danh tướng có độ hiếm cao (SSR).
- Là người chơi, tôi muốn xem chi tiết chỉ số và kỹ năng của tướng để xếp đội hình.

## 3. Core Mechanics

### 3.1. Summoning Ritual UX
- Hoạt ảnh Bát Quái trận đồ (Bagua circle) xoay tròn.
- Người chơi vẽ bùa (Talisman) lên màn hình.
- Thẻ bài 3D bay lên và lật mặt (3D card flip) với hiệu ứng Kintsugi Ink.

### 3.2. Banner Types
- **Standard Banner:** Thường trực, chứa các tướng cơ bản.
- **Rate-up Banner:** Tăng tỷ lệ ra tướng chỉ định (VD: Lữ Bố).
- **Limited Event Banner:** Banner sự kiện theo mùa/chương.

### 3.3. Pity System
- Tỷ lệ SSR cơ bản: 0.6%.
- **Soft Pity:** Tỷ lệ tăng dần bắt đầu từ lần roll thứ 74.
- **Hard Pity:** Đảm bảo 100% ra SSR ở lần roll thứ 90.
- **50/50 Guarantee:** SSR đầu tiên có 50% cơ hội là tướng Rate-up. Nếu lệch rate, SSR tiếp theo chắc chắn là tướng Rate-up (giống Genshin Impact).

### 3.4. Sparking/Mileage Currency
- Mỗi lần roll nhận 1 `Cẩm Nang Thư` (Mileage). Tích đủ 300 Cẩm Nang Thư có thể đổi 1 SSR bất kỳ trong shop đổi thưởng.

### 3.5. Hero Card Detail Inspector
- **Tứ Duy Stats (4 Chỉ số chính):** Vũ Lực (Force), Thống Soái (Command), Trí Lực (Intelligence), Chính Trị (Politics), Mị Lực (Charisma).
- Quản lý Equipment, Skills, và Bonds (Duyên Phận).

### 3.6. Zhanfa Heritage (Chiến Pháp Truyền Thừa)
- Trùng lặp tướng (Duplicates) có thể dùng để hiến tế (Sacrifice), trích xuất ra các Thẻ Chiến thuật (Tactic Cards) có thể kế thừa cho tướng khác (tham khảo Three Kingdoms SLG).

## 4. System Hooks
- **Combat Integration:** Tướng mang theo các thẻ (Deck) vào trận chiến.
- **Economy:** Tiêu tốn Ngọc Bích (Hard currency) để roll.

## 5. Balance Parameters
- Roll 1 lần: 160 Ngọc Bích. Roll 10 lần: 1600 Ngọc Bích.

## 6. Edge Cases
- Disconnect trong lúc gacha: Roll đã được xử lý trên server ngay khi bấm, người chơi không mất tài nguyên và tướng tự động vào túi.

## 7. Unlock Prerequisites
- Tính năng mở khóa sau khi hoàn thành Chapter 5, khi Phò mã nhận được Binh phù đầu tiên. Banner mới mở theo Act milestones.
