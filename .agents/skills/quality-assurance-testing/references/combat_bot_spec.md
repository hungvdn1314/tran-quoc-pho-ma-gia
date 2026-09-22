# ⚔️ Combat Bot Autoplay Specification: Headless Balancing Simulator

Quy chuẩn thiết kế Bot tự động giả lập chiến đấu thẻ bài không cần giao diện đồ họa.

---

## 1. MỤC TIÊU VÀ NGUYÊN LÝ HOẠT ĐỘNG

Thay vì cần tester chơi thủ công hàng trăm giờ để kiểm tra xem một thẻ bài mới có làm mất cân bằng game hay không, Bot tự động chạy hàng chục nghìn lượt trận giả lập trong vòng vài giây bằng Python hoặc Node.js.

### 1.1. Kiến Trúc Bộ Giả Lập
```
[Game Config Data] (heroes.json, cards.json, battles.json)
        │
        ▼
[Headless Combat Engine] ◄── [Utility AI Decision Engine]
  - Giả lập Mana Curve         - Lựa chọn lá bài ra theo điểm trọng số
  - Máy trạng thái 3 làn       - Quyết định phá Intent Boss hay bảo vệ Thành
  - Diminishing Returns Giáp   - Tối ưu hóa chuỗi combo
        │
        ▼
[Monte Carlo Aggregator] (10.000 matches)
  - Win-rate Matrix
  - Distribution of Turns
  - Wall Breaches Frequency
```

---

## 2. CHỈ SỐ CÂN BẰNG TIÊU CHUẨN (ACCEPTANCE CRITERIA)

| Loại Ải | Tỷ Lệ Thắng Mục Tiêu | Số Lượt Trung Bình | Tỷ Lệ Sập Thành Tối Đa |
|:---|:---:|:---:|:---:|
| **Ải Hướng Dẫn (Tutorial/Ch.1-5)** | 95% - 100% | 2 - 3 lượt | 0% |
| **Ải Chiến Dịch Thường** | 75% - 85% | 4 - 6 lượt | < 5% |
| **Ải Boss Chiến Thuật (Thành Thanh Châu)** | 55% - 65% | 7 - 10 lượt | 15% - 25% |
| **Ải Thử Thách Cực Hạn (Chinh Phạt Sa Bàn)** | 35% - 45% | 8 - 12 lượt | 40% - 50% |

---

## 3. LỆNH CHẠY & BÁO CÁO

```bash
# Chạy giả lập 5000 trận đấu
python scripts/combat_headless_sim.py
```
Báo cáo sẽ tự động cảnh báo nếu tỷ lệ thắng vượt khỏi ngưỡng cho phép hoặc xuất hiện tình trạng sập thành ngoài ý muốn.
