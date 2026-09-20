# SDD-ECO-001: System Design Document - Game Economy

## 1. Objective
Thiết kế hệ thống kinh tế khép kín, bền vững, cân bằng giữa người chơi F2P và P2W, đồng thời tích hợp chặt chẽ với cốt truyện (buôn lậu, làm giàu).

## 2. Core Systems

### 2.1. 4 Currencies
1. **Vàng (Soft Currency):** Dùng để nâng cấp cơ sở hạ tầng, binh lính. Faucet chính: Xưởng Xà phòng, Thuế.
2. **Ngọc Bích (Hard Currency):** Tiền tệ Premium dùng để quay Gacha (Bái Tướng Đài). Faucet: Nạp thẻ, Sự kiện cốt truyện, Achievement.
3. **Lương Thảo (Stamina):** Tiêu tốn để xuất quân trên bản đồ chiến lược. Faucet: Nông trại (hồi theo thời gian thực).
4. **Mảnh Hồn (Scrap):** Dùng để đổi vật phẩm. Faucet: Rã tướng, Bán trang bị thừa.

### 2.2. Faucet/Sink Table
| Currency | Nguồn thu (Faucet) | Nguồn xả (Sink) |
| --- | --- | --- |
| Vàng | Xưởng Xà phòng Thấu Hoa Cao | Nâng cấp thành trì, Trả lương lính |
| Ngọc Bích | Thưởng nhiệm vụ Ch. | Mua lượt quay Gacha |
| Lương Thảo | Lãnh địa sản xuất (Mỗi giờ) | Đánh trận, Di chuyển vĩ mô |

### 2.3. Thấu Hoa Cao Soap Business
Kinh doanh "Thấu Hoa Cao" (Xà phòng cao cấp) là lõi kinh tế ban đầu của người chơi. Tốc độ thu Vàng có thể được nâng cấp thông qua các node Kinh tế.

### 2.4. Exponential Upgrade Cost Curves
Chi phí nâng cấp Level công trình/Tướng tuân theo hàm số mũ để kiểm soát tốc độ lạm phát:
$$ Cost(L) = Base \times (1.15)^{(L-1)} $$
*Với L là cấp độ muốn nâng lên.*

### 2.5. F2P Income Projection
- Ước tính trong 1 chu kỳ 6 tuần (6-week cycle), một người chơi F2P chăm chỉ sẽ kiếm được khoảng **65 pulls** (~10,400 Ngọc Bích), tiệm cận mức Soft Pity (74).

### 2.6. Inflation Prevention
- **Elastic Sinks:** Tạo ra các sự kiện ngẫu nhiên yêu cầu tiêu tốn % số vàng hiện có (VD: "Triều đình kêu gọi quyên góp cứu trợ lũ lụt vùng Hoài Hà", tiêu tốn 10% Vàng, đổi lại giảm Suspicion).

### 2.7. Suspicion Meter as Economic Constraint
Việc quá giàu có sẽ khiến Hoàng Đế nghi ngờ, tạo giới hạn mềm (Soft cap) lên việc farm Vàng (Chi tiết tại SDD-SUS-001).

## 3. Edge Cases
- Nếu số vàng vượt ngưỡng số nguyên (Overflow), giới hạn lại ở mức 9,999,999,999.
