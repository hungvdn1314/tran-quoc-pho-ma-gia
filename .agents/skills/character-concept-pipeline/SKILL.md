---
name: character-concept-pipeline
description: >-
  Skill quy trình tạo hình nhân vật và sản xuất tài nguyên mỹ thuật đa tầng (Character Concept Pipeline & Multi-Layer Asset Architecture).
  Chuẩn hóa quy trình từ hồ sơ cốt truyện -> Character Model Sheet -> Turnaround 4 góc -> Expression Sheet -> Kiến trúc Asset 5 lớp (Splash Art, Cut-in, Avatar, Card, Map Token).
  Tích hợp bộ Prompt AI Engine (khử AI tropes, seed-locking, IP-Adapter reference) và quy chuẩn phân cấp Rarity (R, SR, SSR, UR).
---

# Character Concept Pipeline Skill

Quy trình thiết kế và sản xuất tài nguyên mỹ thuật nhân vật chuẩn công nghiệp (AAA & Modern Gacha Hybrid) cho 28 Danh Tướng Tam Quốc và dàn nhân vật cốt truyện của dự án Trấn Quốc Phò Mã Gia.

---

## 1. Kiến Trúc Tài Nguyên Đa Tầng (Multi-Layer Asset Architecture)

Một nhân vật **tuyệt đối không chỉ vẽ 1 bức tranh duy nhất rồi co giãn bừa bãi**. Mọi nhân vật đều phải được xuất thành **5 lớp tài nguyên độc lập** với tỷ lệ và mục đích chuyên biệt:

```
[HERO IDENTITY: TRIỆU TỬ LONG]
  │
  ├── Lớp 1: Splash Art Full-body (2048 × 2732 px, Tỷ lệ 3:4)
  │     └── Dùng cho: Hoạt cảnh Triệu Hoán Bái Tướng Đài, Màn hình Tra Cứu Tướng (Inspector)
  │     └── Yêu cầu: Toàn thân, tư thế chiến đấu động, vũ khí phát sáng, nền hào quang Kintsugi
  │
  ├── Lớp 2: Visual Novel Half-body Sprite (1024 × 1536 px, Nửa người)
  │     └── Dùng cho: Sân khấu kịch bản Visual Novel (Tầng 1), đối thoại cốt truyện
  │     └── Yêu cầu: Nền trong suốt (PNG), tách rời 4 biểu cảm (Điềm tĩnh, Sát khí, Cười nhạt, Bị thương)
  │
  ├── Lớp 3: Tactical Battle Card Art (512 × 768 px, Tỷ lệ 2:3)
  │     └── Dùng cho: Thẻ bài chiến trường Sa Trường 3 Làn (Tầng 3)
  │     └── Yêu cầu: Tranh cận cảnh nửa thân trên (Bust-up to Waist), khung gỗ sơn mài viền vàng
  │
  ├── Lớp 4: Circular Crest Avatar (256 × 256 px, Tỷ lệ 1:1)
  │     └── Dùng cho: Top Imperial HUD, thanh chọn tướng Roster Selector, chỉ số thứ tự lượt
  │     └── Yêu cầu: Cận cảnh khuôn mặt, viền kim loại đồng cổ, độ tương phản cực cao
  │
  └── Lớp 5: Grand Strategy Map Token (128 × 128 px)
        └── Dùng cho: Quân cờ điều động binh mã trên Đế Nghiệp Sa Bàn (Tầng 2)
        └── Yêu cầu: Biểu tượng phù hiệu binh chủng (Bạch Mã Kỵ, Hãm Trận Doanh) khắc tên tướng
```

---

## 2. Quy Chuẩn Phân Cấp Thị Giác Theo Phẩm Chất (Rarity Visual Ascension)

Mọi danh tướng khi xuất hiện phải thể hiện rõ đẳng cấp qua trang phục, ánh sáng và chi tiết giáp trụ:

| Cấp Bậc | Phẩm Chất | Đại Diện Tiêu Biểu | Quy Chuẩn Thiết Kế Giáp Trụ & Vũ Khí | Khung Thẻ & Hào Quang |
|---|---|---|---|---|
| **R** | Thường (Lục/Lam) | Binh sĩ, Hiệu úy, Quân sư hàn vi | Giáp da thuộc sờn rách, vải thô mộc mạc, đoản đao gỉ nhẹ, không có hào quang | Khung gỗ phong mục, không viền vàng |
| **SR** | Tinh Anh (Tử Kim) | Cao Thuận, Cam Ninh, Nhan Lương | Giáp thép đen tôi lạnh, giáp phiến xếp lớp tinh xảo, áo choàng chiến trận xẻ tà | Khung bạc tôi nguội, điểm xuyết ánh sáng xanh lam nhạt |
| **SSR** | Truyền Thuyết (Hoàng Kim) | Triệu Vân, Quan Vũ, Giả Hủ, Chu Du | Thần binh vũ khí đặc trưng (Long Đảm Thương, Thanh Long Đao), giáp rồng/phượng chi tiết thời Hán | Khung vàng rực rỡ, hạt bụi vàng Kintsugi bay lơ lửng, viền ngọc bích |
| **UR** | Chiến Thần Vô Song (Đế Cảnh) | Lữ Bố, Gia Cát Lượng, Điêu Thuyền | Thần giáp Đế Cảnh, áo bào gấm dệt chỉ vàng, vũ khí phát sáng toàn màn hình | Khung thẻ 3D rạn nứt Kintsugi phát sáng cực đại, sấm sét hoàng kim |

---

## 3. Quy Chuẩn Tạo Hình Model Sheet (Silhouette & Proportions)

Mỗi nhân vật trước khi vẽ thành phẩm phải trải qua 3 bài kiểm tra:

1. **Kiểm tra Silhouette (Bóng Đen Nhận Diện)**:
   - Khi bôi đen hoàn toàn nhân vật thành một bóng đen thuần túy, người chơi phải nhận diện được ngay lập tức qua hình dáng đặc trưng:
     - *Triệu Vân*: Mũi thương vút cao thanh thoát, vạt áo bào kỵ sĩ bay trong gió.
     - *Quan Vũ*: Chòm râu dài ngũ trâu, Thanh Long Đao dựng đứng, dáng đứng sừng sững như núi Thái Sơn.
     - *Giả Hủ*: Áo choàng mưu sĩ trùm kín đầu, dáng đứng hơi nghiêng che giấu ánh mắt thâm sâu.
     - *Điển Vi*: Hai tay cầm song kích thép khổng lồ, bờ vai rộng lực lưỡng như hộ pháp.
2. **Tỷ Lệ Cơ Thể Chuẩn Tả Thực (Anatomical Proportions)**:
   - Võ tướng dũng mãnh: Tỷ lệ 8 đầu (Heroic 8-head scale), vai rộng, chân trụ vững chắc.
   - Mưu sĩ, Quân vương: Tỷ lệ 7.5 đầu (Natural 7.5-head scale), phong thái nho nhã, tay giấu trong tay áo thụng.
   - Mỹ nhân: Tỷ lệ 7.5 đầu, tà áo thướt tha, đường nét uyển chuyển nhưng trang nghiêm.
3. **Quy Tắc Màu Sắc 60-30-10 Cho Trang Phục**:
   - 60%: Màu giáp/vải nền (Thép đen, da thuộc, vải lanh xám).
   - 30%: Màu sắc thế lực (Bạch Mã lam sẫm cho Triệu Vân, Lục sam cho Quan Vũ, Dạ hành hắc bào cho Giả Hủ).
   - 10%: Kim loại điểm nhấn (Vàng ròng Kintsugi chạm khắc trên hộ tâm phiến, chuôi đao, trâm cài).

---

## 4. Bộ Prompt AI Engine & Quy Trình Giữ Độ Đồng Nhất (Consistency Engine)

Để đảm bảo các công cụ Generative AI (Midjourney, SDXL, ComfyUI) vẽ ra hàng chục danh tướng nhưng **hoàn toàn đồng nhất phong cách** và **không bị biến dạng**:

### Negative Prompt Bắt Buộc (Khử AI Tropes & Slop):
```text
(worst quality, low quality:1.4), (deformed, distorted, disfigured:1.3), 
(extra fingers, missing fingers, fused fingers:1.4), poorly drawn hands, 
poorly drawn face, modern clothing, cartoon, anime big eyes, 3d render, 
plastic skin, oversaturated, generic purple neon, western medieval armor, 
fantasy elf ears, cleavage cutout, modern typography, watermark, signature
```

### Style Prompt Cốt Lõi (Style Anchor Tokens):
```text
masterpiece, high-end game concept art, traditional Chinese ink-wash painting mixed with dark fantasy realism, 
authentic Eastern Han Dynasty armor, cold-forged iron plates, flowing black calligraphy brushstrokes, 
subtle kintsugi molten gold veins crackling along weapon edge, cinematic chiaroscuro rim lighting, 
weathered textures, muted earth tones with rich crimson and antique gold accents, octane render, 8k resolution
```

### Kỹ Thuật Giữ Nhận Diện (Identity Preservation):
1. **Seed Locking**: Giữ cố định `Seed` cơ bản cho từng nhân vật.
2. **Face Anchor Token**: Mỗi nhân vật sở hữu một tập hợp từ khóa ngũ quan bất biến (ví dụ Triệu Vân: `sharp almond eyes, high straight nose bridge, calm resolute expression, silver circlet headband`).
3. **IP-Adapter Reference**: Sử dụng ảnh chân dung gốc làm nguồn tham chiếu hình ảnh trong ComfyUI với trọng số `weight: 0.75` và `stop_at: 0.85` để giữ 100% đường nét khuôn mặt khi thay đổi góc nhìn.
