# Product Context

## Vấn Đề Cần Giải Quyết

Tiểu thuyết *Trấn Quốc Phò Mã Gia* (1.509 chương, 2.47M từ) là một tác phẩm văn học chất lượng cao về đề tài lịch sử Tam Quốc / hư cấu Cổ Đại Việt, nhưng chưa có một trải nghiệm tương tác nào tái hiện trung thực cốt truyện, nhân vật và bầu không khí của nó. Dự án này lấp đầy khoảng trống đó bằng game nhập vai chiến thuật hybrid.

## Đối Tượng Người Dùng

- Fan đọc tiểu thuyết mạng tiếng Việt thể loại lịch sử/quân sự/xuyên không Tam Quốc
- Game thủ yêu thích thể loại Visual Novel + Strategy (13 Sentinels, Fate/Stay Night, Total War)
- Người chơi Gacha thích narrative-driven (Arknights, Genshin, FGO)

## UX Goals

1. **Immersion không phá vỡ**: Mọi UI element phải là vật thể diegetic cổ phong (thư trục, thẻ tre, ấn triện) — KHÔNG dashboard SaaS/e-commerce
2. **Chuyển tầng mượt mà**: Ba tầng gameplay (VN → Sa Bàn → Card Battle) chuyển tiếp liền mạch không reload
3. **Nghi thức triệu hoán hoành tráng**: Mỗi lần unlock tướng mới = màn Grand Reveal toàn màn hình với âm thanh, hiệu ứng và splash art riêng biệt
4. **Typography tiếng Việt chuẩn xác**: 4 lớp font, zero Frankenstein diacritic splitting
5. **Bảo toàn canon tuyệt đối**: Không được thay đổi cốt truyện, không dùng chung asset nhân vật

## Luồng Người Dùng Chính

```
Nhận nhiệm vụ (VN) → Lên sa bàn triển khai quân (Strategy) 
→ Chạm trán địch → Vào trận thẻ bài (Combat)
→ Đại thắng S-Rank → Triệu hoán tướng mới (Gacha Ritual)
→ Quay về VN với tướng mới, mở arc tiếp theo
```
