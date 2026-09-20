# SDD-COM-001: System Design Document - Tactical Card Combat Engine

## 1. Objective
Xác định các nền tảng kỹ thuật và toán học đằng sau cơ chế chiến đấu thẻ bài, AI của địch, và công thức tính toán.

## 2. Core Architecture

### 2.1. Turn Flow State Machine
Engine sử dụng State Machine cho Combat:
`Init` -> `Draw_Phase` -> `Player_Turn` -> `Resolution_Phase` -> `Enemy_Turn` -> `End_Turn_Checks` -> loop(Draw_Phase).

### 2.2. Damage Formula
Sát thương thực tế được tính toán giảm nhẹ bởi Giáp (Armor):
$$ DamageMultiplier = \frac{100}{100 + Armor} $$
$$ FinalDamage = RawDamage \times DamageMultiplier $$

### 2.3. Card Power Budgeting
Công thức cân bằng giá trị (Sĩ Khí/Mana Cost) của thẻ:
$$ Cost = (0.5 \times Damage) + (0.4 \times Shield) + Utility Value $$
*Utility Value: Draw card (+1), Heal (+0.8), Status Effect (+0.5).*

### 2.4. Enemy AI (Utility AI & Behavior Tree)
- **Utility AI:** Kẻ địch đánh giá điểm số của các hành động (Attack, Defend, Buff) dựa trên tình trạng máu của bản thân và Lane đối diện qua Response Curves.
- **Behavior Tree:** Điều khiển quá trình chuyển đổi Phase (Giai đoạn) của Boss.

### 2.5. Boss Phase Transitions
- Khi HP Boss tụt xuống các mốc (Threshold) nhất định (VD: 50%, 20%), xóa toàn bộ Debuff, cắt ngang Turn hiện tại, kích hoạt hoạt ảnh chuyển Phase và tung đòn AOE.

### 2.6. Lane Interaction Rules
- **Flanking:** Đánh tạt sườn. Nếu Lane bên cạnh trống, Unit có thể đánh sang Lane kế bên với 150% Damage.
- **Cross-Lane Bombardment:** Các máy bắn đá (Catapult) có thể tấn công ngẫu nhiên 1 trong 3 Lane.

### 2.7. Deck Management
- **Draw:** Rút 5 lá vào đầu lượt (có thể thay đổi do Buff).
- **Discard/Exhaust:** Lá bài xài xong vào Discard Pile. Thẻ có thuộc tính Exhaust (Tiêu hao) xài xong sẽ bị loại khỏi trận đó.
- **Deck Cycling:** Hết bài trong Draw Pile sẽ xáo lại Discard Pile thành Draw Pile mới.

## 3. Balance Parameters
- Tốc độ Game (Animation Speed): 1.0x, 1.5x, 2.0x.

## 4. Edge Cases
- Nếu 2 bên cùng chết trong 1 lượt giải quyết sát thương: Tính là Player Thua (Loss).
