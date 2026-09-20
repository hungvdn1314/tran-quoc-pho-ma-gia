# SDD-SUS-001: System Design Document - Emperor's Suspicion

## 1. Objective
Mô phỏng áp lực chính trị tàn khốc của triều đình phong kiến, nơi mà "công cao chấn chủ" là con đường chết. Suspicion Meter (Thanh Nghi Kỵ) đóng vai trò là Constraint chính yếu trong game.

## 2. Core Mechanics

### 2.1. Suspicion Meter
- **Range:** 0% đến 100%.
- Hiển thị dưới dạng một thanh gươm mỏng manh treo trên đầu (Sword of Damocles) trên UI chính.

### 2.2. Triggers (Increase/Decrease)
**Tăng Thanh Nghi Kỵ:**
- Mở rộng lãnh thổ quá 2 Nodes/Lượt (+10%).
- Từ chối chiếu chỉ/Nhiệm vụ của Hoàng Đế (+20%).
- Xây dựng quân đội cấp cao (+5% mỗi đạo quân).
- Doanh thu hàng tháng vượt mức 50,000 Vàng (+10%).

**Giảm Thanh Nghi Kỵ:**
- Tiến cống/Hối lộ triều đình (-15%).
- Dâng tặng Xà phòng Thấu Hoa Cao cho Hậu cung (-10%).
- Đưa ra quyết định "Trung thành" yếu thế trong Visual Novel.

### 2.3. Threshold Effects
Tùy vào mức độ Suspicion, game sẽ có các debuff tương ứng:
- **<30% Safe (An toàn):** Không ảnh hưởng.
- **30-60% Cautious (Cảnh giác):** Tăng thuế thu vào Hoàng Cung (Mất 10% doanh thu).
- **60-80% Dangerous (Nguy hiểm):** Mật thám triều đình ám sát quân lính ngẫu nhiên (Trừ HP lính trên Map). Các node xung quanh bị debuff.
- **>80% Crisis (Khủng hoảng):** Rủi ro bị tước binh quyền hoặc bị bắt giữ (Game Over nếu không giải quyết kịp trong 3 lượt).

### 2.4. CK3-Style Personality Integration
Hoàng Đế có tính cách ẩn (Paranoid, Greedy, Malleable) ảnh hưởng đến hệ số nhân của các hành động Tăng/Giảm Suspicion (giống Crusader Kings 3).

### 2.5. Endgame Goal
Nhiệm vụ dài hạn của người chơi là thao túng hệ thống này, giữ Thanh Nghi Kỵ luôn ở mức **<60%** trong suốt quá trình chuẩn bị khởi nghĩa, cho đến khi đủ thực lực kích hoạt sự kiện Đăng Cơ ở **Chapter 386**.

## 3. System Hooks
- **Strategy Map:** Hành động Bribe Court.
- **Economy:** Xả vàng để mua sự an toàn.

## 4. Edge Cases
- Thanh Nghi Kỵ đạt 100%: Cho người chơi cơ hội cuối cùng (Psyche-Lock debate với Khâm Sai) để xin giảm nhẹ tội. Thất bại -> Bad Ending.

## 5. Unlock Prerequisites
- Mở khóa tại Chapter 30, đánh dấu sự kết thúc của "tuần trăng mật" giữa Phò Mã và Hoàng Gia.
