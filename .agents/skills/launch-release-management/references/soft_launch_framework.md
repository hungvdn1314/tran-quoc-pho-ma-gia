# 🎯 Soft Launch & Closed Beta Framework: Trấn Quốc Phò Mã Gia

Kế hoạch chi tiết triển khai thử nghiệm diện hẹp và phân tích dữ liệu hành vi người chơi trước khi phát hành toàn cầu.

---

## 1. QUY MÔ & GIAI ĐOẠN THỬ NGHIỆM

```
┌─────────────────┬───────────────────┬───────────────────┬───────────────────┐
│ Giai Đoạn       │ Quy Mô Mẫu        │ Thời Gian         │ Mục Tiêu Trọng Tâm│
├─────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ **Alpha CBT**   │ 100 - 300 tester  │ 7 ngày            │ Lỗi kỹ thuật, crash, softlock kịch bản │
│ **Beta CBT**    │ 500 - 1.000 tester│ 14 ngày           │ Cân bằng thẻ bài, độ khó ải Sa Bàn     │
│ **Soft Launch** │ 2.000 - 5.000 user│ 30 ngày           │ D1/D7/D30, phễu Tutorial, nạp tiền đầu  │
└─────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

---

## 2. THEO DÕI PHỄU HƯỚNG DẪN TÂN THỦ (TUTORIAL FUNNEL ANALYSIS)

Điểm rơi người chơi (Dropout Rate) phải được theo dõi chặt chẽ tại 6 mốc then chốt:
1. `funnel_step_1`: Khởi động game & đối thơ Kim Loan Điện (Ch.1).
2. `funnel_step_2`: Thức tỉnh Thiên Cơ Hệ Thống & nhận 1 Anh Hồn Lệnh (Ch.1).
3. `funnel_step_3`: Nghi thức Bái Tướng Đài đầu tiên & triệu hoán Triệu Tử Long SSR (Ch.5).
4. `funnel_step_4`: Phát minh xà phòng Thấu Hoa Cao & liên minh Vệ Ti Vũ (Ch.8).
5. `funnel_step_5`: Nhận hổ phù Vũ Hoàng, mở khóa Sa Bàn Sơn Hà (Ch.15).
6. `funnel_step_6`: Trận đánh đầu tiên trên Sa Trường Thẻ Bài 3 Làn (Ch.20).

> **Ngưỡng chấp nhận**: Tỷ lệ người chơi rơi rụng giữa mỗi bước không được vượt quá **12%**. Nếu một bước có tỷ lệ thoát > 25%, lập tức tái thiết kế lại độ dài câu thoại hoặc giảm độ khó của ải đó.
