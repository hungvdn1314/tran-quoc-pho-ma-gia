# MISTAKES.md — Trấn Quốc Phò Mã Gia

Các lỗi đã xảy ra, được ghi nhận để KHÔNG bao giờ lặp lại.
Mỗi session mới đều đọc file này trước khi làm bất cứ điều gì.

---

## Format

```
### [MISTAKE-NNN] Tiêu đề ngắn gọn
**Ngày phát hiện**: YYYY-MM-DD
**Triệu chứng**: Mô tả điều gì xảy ra sai
**Nguyên nhân gốc**: Tại sao nó xảy ra
**Giải pháp**: Cách sửa
**Quy tắc phòng ngừa**: KHÔNG BAO GIỜ làm X. LUÔN LUÔN làm Y.
```

---

## Current Known Mistakes

### [MISTAKE-001] Gán cứng hình ảnh nhân vật này cho nhân vật khác
**Ngày phát hiện**: (trước khi init memory bank)
**Triệu chứng**: `actor_to_kien_phong.png` được dùng cho tất cả mọi nhân vật
**Nguyên nhân gốc**: Thiếu asset riêng biệt cho từng nhân vật phụ
**Giải pháp**: Tạo standee PNG/WebP độc bản RGBA cho mỗi nhân vật
**Quy tắc phòng ngừa**: KHÔNG BAO GIỜ reuse ảnh. Mỗi nhân vật = 1 asset file riêng.

---

### [MISTAKE-002] Dùng UI kiểu Web Dashboard / SaaS thay vì Diegetic Cổ Phong
**Ngày phát hiện**: (trước khi init memory bank)
**Triệu chứng**: Xuất hiện card KPI hình chữ nhật, nút mua hàng `.upgrade-tray`, tab lọc văn phòng
**Nguyên nhân gốc**: Agent sinh code UI mặc định theo pattern web thông thường
**Giải pháp**: Thay bằng Thư Trục Xuyến Chỉ, Thẻ Tre, Ngũ Trọng Trận Đồ, Ấn Triện Chu Sa
**Quy tắc phòng ngừa**: Trước khi viết BẤT KỲ UI component nào, tự hỏi: "Đây có phải đồ vật cổ phong diegetic không?" Nếu không → thiết kế lại.

---

### [MISTAKE-003] Triệu hoán tướng mới chỉ bằng vài dòng text hội thoại
**Ngày phát hiện**: (trước khi init memory bank)
**Triệu chứng**: Tướng mới xuất hiện qua text đơn giản không có nghi thức
**Nguyên nhân gốc**: Bỏ qua Inviolable Canon Rule #4
**Giải pháp**: Kích hoạt đầy đủ Grand Reveal — Kintsugi crack → Bát Quái → Sấm chớp → Splash Art → Tứ Duy stats → Tuyên thệ
**Quy tắc phòng ngừa**: KHÔNG BAO GIỜ unlock tướng mà thiếu Grand Reveal ritual. Đây là non-negotiable.

---

### [MISTAKE-004] Dùng font không hỗ trợ tiếng Việt (Cinzel, Trajan, Bebas Neue)
**Ngày phát hiện**: (trước khi init memory bank)
**Triệu chứng**: Chữ tiếng Việt bị split dấu sang font fallback khác nhau (Frankenstein Typography)
**Nguyên nhân gốc**: Chọn font đẹp nhưng không kiểm tra Vietnamese Unicode block
**Giải pháp**: Luôn dùng 4-layer font system theo AGENTS.md
**Quy tắc phòng ngừa**: KHÔNG BAO GIỜ dùng Cinzel/Trajan/Bebas Neue. LUÔN LUÔN kiểm tra `U+1EA0–U+1EF9` Vietnamese block trước khi chọn font.

---

### [MISTAKE-005] Không đồng bộ triệt để template prototype khi tái cấu trúc Diegetic Modals
**Ngày phát hiện**: 2026-09-24
**Triệu chứng**: Giao diện mở khóa tính năng (Bái Tướng Đài), Bái Tướng Thần Đàn Gacha và Tra cứu thuộc tính Tướng vẫn hiện popup Web Dashboard / RPG card chữ nhật bo góc viền vàng với emoji ⛩️, ⚡ và nút bấm màu cam flat, dù trong src/ đã xây dựng Tranh Cuộn Thủy Mặc & Trúc Giản.
**Nguyên nhân gốc**: Khi thiết kế các Trục Cuộn Lụa Cổ Phong trong src/ui/modals/ (HeroInspectorScroll, modals.html), đã chỉ kiểm thử trên src/ mà không đồng bộ và thay thế markup cũ trong prototype/index.html, prototype/app.js và prototype/styles.css. Người dùng chơi trực tiếp trên prototype gặp lại toàn bộ giao diện dashboard cũ.
**Giải pháp**: Đồng bộ toàn bộ 5 Trục Cuộn Quân Cơ (Thánh Dụ Chiếu Thư, Niên Biểu, Phong Vương Bảng, Khải Hoàn Tiệp Báo, Bại Trận Thư) và Tranh Cuộn Thủy Mặc & Trúc Giản Quân Cơ sang prototype/; quét sạch 100% emoji khỏi mọi toast và dữ liệu hệ thống.
**Quy tắc phòng ngừa**: Trước khi nghiệm thu bất kỳ thay đổi UI nào, BẮT BUỘC kiểm tra trực tiếp cả prototype/ lẫn src/, chạy script quét Regex tìm emoji trên toàn bộ repo.

---

## Cách Thêm Mistake Mới

Khi agent phạm lỗi:
1. Agent thừa nhận lỗi
2. Agent đề xuất entry cụ thể để thêm vào đây
3. Hỏi user: "Tôi nên thêm entry này vào MISTAKES.md không?"
4. Nếu user đồng ý → thêm ngay lập tức
