# FDD-MAP-001: Feature Design Document - Đế Nghiệp Sa Bàn (Strategy Map)

## 1. Objective
Cung cấp một bản đồ chiến lược vĩ mô (Grand Strategy Node Map) để người chơi quản lý lãnh thổ, phân bổ tài nguyên và lên kế hoạch tấn công.

## 2. User Story
- Là người chơi, tôi muốn quản lý lãnh thổ của mình trên một bản đồ rộng lớn để thu thập tài nguyên và mở rộng thế lực.
- Là người chơi, tôi muốn có các quyết định mang tính chiến lược trong giới hạn hành động mỗi lượt.

## 3. Core Mechanics

### 3.1. Territorial Zones
Bản đồ chia làm 4 khu vực chính, mở dần theo cốt truyện:
1. Đại Vũ Hoàng Triều (Trung tâm)
2. Bắc Cảnh (Vùng đất băng giá)
3. Nam Ly (Vùng sông nước, sương mù)
4. Tây Lăng (Sa mạc, đồi núi)

### 3.2. Turn-based AP System
- Hệ thống theo lượt (Turn-based).
- Mỗi lượt (Turn/Month), người chơi có 3 AP (Action Points).

### 3.3. Actions (Tiêu tốn AP)
- **Expand Soap Factory (Mở xưởng Xà phòng):** +3000 Vàng/lượt (Gold).
- **Bribe Court (Hối lộ Triều đình):** -15% Suspicion Meter (Thanh Nghi Kỵ).
- **Deploy Scouts (Phái Thám tử):** Mở sương mù (Fog of War) trên Node.
- **Reinforce Garrison (Gia cố Thành trì):** Tăng sức phòng thủ Node.

### 3.4. Terrain & Nodes
- Các Node được nối với nhau qua các đường di chuyển.
- Các loại địa hình ảnh hưởng đến combat: Hoài Hà (Sông), Thanh Thủy, Bắc Cô Sơn (Núi).

### 3.5. Invasion Alerts & Battle Triggers
- Kẻ thù ngẫu nhiên hoặc theo kịch bản sẽ tấn công vào các Node của người chơi. Nếu người chơi di chuyển quân đến Node đó, trigger Tactical Card Battler (Chuyển sang Tier 3).

### 3.6. Supply Line Mechanics
- Quân đội đóng quân xa thành chính tiêu tốn `Lương Thảo` (Food/Rations) mỗi lượt. Nếu cạn Lương Thảo, quân lính giảm max HP và Sĩ Khí trong giao tranh.

## 4. System Hooks
- Kết nối trực tiếp với Suspicion Meter: Mở rộng quá nhanh hoặc chiếm các Node trọng yếu sẽ tăng mạnh Suspicion.

## 5. Balance Parameters
- Maximum AP: 3 (có thể tăng lên 4 ở endgame qua Research).

## 6. Edge Cases
- Nếu người chơi không phản hồi Invasion Alert trong 3 turns, Node đó tự động bị mất.

## 7. Unlock Prerequisites
- Đế Nghiệp Sa Bàn bị khóa cho đến khi hoàn thành Chapter 15 (Sự kiện nhận đất phong đầu tiên).
