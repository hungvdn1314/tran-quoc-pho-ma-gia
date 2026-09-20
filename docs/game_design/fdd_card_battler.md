# FDD-BAT-001: Feature Design Document - Sa Trường Thẻ Bài (Card Battler)

## 1. Objective
Thiết kế hệ thống giao tranh chiến thuật kết hợp xây dựng bộ bài (Deck-building), mang tính chiều sâu như Slay the Spire nhưng điều khiển một đạo quân quân sự.

## 2. User Story
- Là người chơi, tôi muốn sử dụng bộ bài gồm các Tướng, Kế sách để tiêu diệt quân địch.
- Là người chơi, tôi muốn tính toán nước đi dựa trên thông tin ý định của kẻ địch.

## 3. Core Mechanics

### 3.1. 3-Lane Battlefield
- Chiến trường chia làm 3 Lane: Left (Trái), Center (Trung Tâm), Right (Phải).
- **Fortress Wall (Tường Thành):** Một thực thể đặc biệt (Entity) có 500 HP, chặn sát thương, cung cấp buff Cao Lâm Hạ (High Ground Advantage) cho quân phòng thủ.

### 3.2. Intent Telegraphing System
- Giống Slay the Spire, kẻ địch sẽ hiện biểu tượng trên đầu báo hiệu hành động trong lượt tới (Tấn công 10 dmg, Buff giáp, Niệm chú...).

### 3.3. Card Types
- **Unit (Quân lính/Tướng):** Đặt lên Lane.
- **Tactic (Chiến pháp):** Kỹ năng dùng một lần.
- **Stratagem (Kế sách):** Các bùa chú mạnh có thể thay đổi cục diện.
- **Equipment (Trang bị):** Gắn lên Unit.
- **Terrain (Địa hình):** Thay đổi đặc tính của 1 Lane (VD: Đầm lầy, Rừng rậm).

### 3.4. Mana/Sĩ Khí System
- Năng lượng để dùng thẻ gọi là Sĩ Khí.
- Mỗi lượt hồi 3 Sĩ Khí, giữ nguyên lượng chưa dùng, Max Sĩ Khí là 10.

### 3.5. Resolution Order (Thứ tự thi triển)
1. Passives (Kỹ năng bị động)
2. Actions (Speed) (Hành động từ thẻ, theo tốc độ Tướng)
3. Direct Attacks (Tấn công thường của Unit trên lane)
4. End-of-Turn (Xử lý Độc, Hồi máu cuối lượt)

### 3.6. Flood Stratagem (Kế Thủy Công của Giả Hủ)
- Cơ chế đặc biệt: Cần 3 giai đoạn (Tích nước - Phá đê - Đại hồng thủy). Xóa sổ toàn bộ Unit trên bàn và gây 999 sát thương lên Fortress Wall.

### 3.7. Victory Conditions & S-Rank Scoring
- **Thắng:** Máu Chủ tướng địch về 0 hoặc Chiếm được Tường Thành.
- **S-Rank:** Hoàn thành trong số lượt quy định, Chủ tướng mất ít hơn 10% HP.

## 4. System Hooks
- Đội hình Tướng mang vào trận được setup từ Tier 2 (Strategy Map).

## 5. Balance Parameters
- Máu lính cơ bản: 10-50. Tướng: 100-500.

## 6. Edge Cases
- Đánh vào Lane trống: Tướng sẽ lao lên đánh trực tiếp vào Tường thành hoặc Chủ tướng địch.

## 7. Unlock Prerequisites
- Tính năng mở khóa sau Chapter 48 (Sự kiện Phạt Bắc). Màn hướng dẫn giới thiệu cơ chế Intent Telegraphing.
