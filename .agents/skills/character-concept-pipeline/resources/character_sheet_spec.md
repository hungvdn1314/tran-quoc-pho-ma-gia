# 📋 Quy Chuẩn Hồ Sơ Thiết Kế Nhân Vật (Character Model Sheet Specification)
## Dự án: Trấn Quốc Phò Mã Gia

Tài liệu mẫu quy chuẩn dùng để ghi chép và thiết kế toàn diện cho từng danh tướng hoặc nhân vật cốt truyện.

---

```markdown
# HỒ SƠ TẠO HÌNH: [TÊN DANH TƯỚNG] ([TỰ/BIỆT HIỆU])
- **Mã Định Danh (ID)**: hero_[name]
- **Phẩm Chất (Rarity)**: [R / SR / SSR / UR]
- **Thế Lực**: [Thục / Ngụy / Ngô / Quần Hùng / Đại Vũ Triều Đình]
- **Binh Chủng**: [Bộ Binh / Thiết Kỵ / Cung Thủ / Mưu Sĩ]
- **Cảnh Giới Võ Học**: [Vương Cảnh / Hoàng Cảnh / Tông Sư / Bán Thánh / Đế Cảnh]

---

## 1. Silhouette & Tỷ Lệ Cơ Thể
- **Chiều cao / Tỷ lệ đầu**: [Ví dụ: 1m85 / 8.0 đầu - Thân hình tráng kiện kỵ sĩ]
- **Dáng đứng đặc trưng (Signature Posture)**: [Ví dụ: Tay phải cầm trường thương chếch 45 độ, chân trái hơi co lùi, áo bào bay ngược chiều gió]
- **Vật thể định danh (Silhouette Markers)**: [Ví dụ: Mũi thương Long Đảm, dải lụa trắng cột trên giáp vai]

---

## 2. Bảng Phối Màu Trang Phục (60 - 30 - 10 Rule)
- **60% Màu Nền/Giáp Thân**: [Mã Hex & Tên: e.g. #334155 - Thép đen tôi nguội]
- **30% Màu Bản Sắc Thế Lực**: [Mã Hex & Tên: e.g. #1e3a8a - Xanh thẫm Bạch Mã Nghĩa Tòng]
- **10% Kim Loại Điểm Nhấn (Kintsugi Accent)**: [Mã Hex & Tên: e.g. #fbbf24 - Khảm vàng hoàng kim trên mũi thương & hộ tâm phiến]

---

## 3. Khí Giới & Phụ Kiện Đặc Trưng
- **Vũ khí chính**: [Tên vũ khí, chất liệu, kích thước, hiệu ứng phát sáng đặc thù]
- **Giáp trụ**: [Cấu trúc giáp phiến thời Đông Hán, hoa văn chạm khắc, khiên hoặc bao đựng tên]
- **Kỷ vật/Ấn tín**: [Vật phẩm thể hiện thân phận hoặc mối quan hệ mật thiết]

---

## 4. Ma Trận Biểu Cảm (Expression Sheet Matrix - 4 Biểu Cảm VN)
1. **Neutral (Điềm tĩnh / Lạnh lùng)**: Ánh mắt kiên nghị nhìn thẳng, khóe môi khép chặt.
2. **Combat Focus (Sát khí / Quyết chiến)**: Đồng tử co nhỏ, chân mày cau lại, sát khí ngưng tụ quanh trán.
3. **Subtle Smile (Cười nhạt / Đắc ý)**: Khóe môi hơi nhếch, ánh mắt thấu thị mưu đồ thiên hạ.
4. **Wounded / Grim (Trúng thương / Phẫn nộ)**: Vết máu vệt ngang má, răng cắn chặt, tóc rối vài lọn trước trán.

---

## 5. Danh Mục Xuất Asset Đa Tầng (5-Layer Export Manifest)
- [ ] Layer 1: Splash Art Full-body (2048 × 2732 px, PNG nền trong suốt + background canvas)
- [ ] Layer 2: Half-body Cut-in (1024 × 1536 px, 4 files biểu cảm PNG tách lớp)
- [ ] Layer 3: Tactical Battle Card Art (512 × 768 px, gắn khung gỗ sơn mài)
- [ ] Layer 4: Circular Avatar (256 × 256 px, viền kim loại đồng cổ)
- [ ] Layer 5: Strategy Map Token (128 × 128 px, phù hiệu binh chủng)

---

## 6. Prompt AI Master Cho Nhân Vật
- **Positive Prompt**:
  `masterpiece, game concept art, [hero description keywords], authentic Eastern Han Dynasty armor, flowing ink wash brushstrokes, subtle molten gold kintsugi cracks along weapon, cinematic rim lighting, 8k resolution`
- **Identity Seed**: [Seed Number]
- **Negative Prompt**: [Bộ negative prompt chuẩn của Skill]
```
