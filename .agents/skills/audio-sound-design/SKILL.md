---
name: audio-sound-design
description: >-
  Skill thiết kế âm thanh, nhạc nền và hiệu ứng thính giác (Audio Direction & Sound Design Pipeline).
  Sử dụng khi cần định hướng phong cách âm nhạc Tả Thực Thủy Mặc (Cổ cầm, Đàn tranh, Địch tử kết hợp dàn nhạc giao hưởng),
  sản xuất hiệu ứng âm thanh Diegetic (tiếng mộc bản, tiếng bút lông, tiếng đóng triện, tiếng sấm phá ấn thần đàn),
  thiết kế hệ thống nhạc thích ứng (Adaptive Music Cross-fading), soạn prompt AI sinh nhạc (Suno/Udio),
  và tích hợp Web Audio API quản lý luồng âm thanh chuyên nghiệp.
---

# Audio & Sound Design Pipeline Skill
*Định hướng âm nhạc & thiết kế hiệu ứng âm thanh cho Trấn Quốc Phò Mã Gia*

---

## 1. TRIẾT LÝ ÂM THANH: TẢ THỰC CỔ PHONG GIAO HƯỞNG (EASTERN GRIMDARK ORCHESTRAL)

Trong một tựa game hybrid kết hợp văn học triều đình và chiến trường khốc liệt, âm thanh không đơn thuần là "tiếng kêu" mà là **linh hồn truyền tải sức nặng của quyền mưu và số phận**:
1. **Âm Hưởng Chủ Đạo**: Kết hợp giữa **Nhạc Cụ Dân Tộc Cổ Truyền** (Cổ Cầm trầm mặc, Đàn Tranh dồn dập, Tiêu Địch u hoài, Trống Trận rền vang) với **Dàn Nhạc Giao Hưởng Phương Tây** (Dàn dây Cello trầm đục, kèn đồng French Horn uy nghi).
2. **Diegetic Soundscapes (Âm thanh thực cảnh)**: Mọi thao tác UI đều mang cảm giác vật liệu cổ phong thực tế — tiếng lật trang giấy xuyến thô ráp, tiếng đóng dấu ấn triện sáp nung nặng nề, tiếng rút thanh kiếm rỉ sét ra khỏi bao da.
3. **Tuyệt Đối Tránh**: Không sử dụng âm thanh 8-bit, synth điện tử hiện đại, hoặc tiếng "ting ting" arcade vô hồn.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            HỆ THỐNG KÊNH ÂM THANH (AUDIO BUS)                │
├───────────────────┬───────────────────┬─────────────────────────────────────┤
│ MASTER BUS        │ MASTER BUS        │ MASTER BUS                          │
│ ├── BGM (Nhạc nền)│ ├── SFX (Hiệu ứng)│ └── VOX (Giọng đọc / Exclamations)  │
│ │   • Adaptive VN │ │   • UI Cổ bản   │     • Câu thệ Bái Tướng             │
│ │   • Sa Bàn trầm │ │   • Chiến trận  │     • Tiếng thở phò mã hàn vi       │
│ │   • Combat trống│ │   • Thần đàn gõ │     • Vũ Hoàng long nhan thịnh nộ   │
└───────────────────┴───────────────────┴─────────────────────────────────────┘
```

---

## 2. BỐN TẦNG ÂM NHẠC THÍCH ỨNG (ADAPTIVE MUSIC SYSTEM)

Âm nhạc tự động chuyển tiếp mượt mà (Cross-fade 1.5 - 2.5s) dựa trên trạng thái của người chơi:

| Tầng Chơi | Trạng Thái | Cung Bậc Cảm Xúc | Biên Chế Nhạc Cụ Chủ Đạo |
|:---|:---|:---|:---|
| **Tầng 1: Visual Novel** | Hoàng Cung / Triều Chính | Uy nghiêm, lạnh lẽo, nơm nớp lo sợ | Cổ Cầm đơn tấu, Chuông gió đồng, Dàn dây trầm |
| **Tầng 1: Visual Novel** | Đêm Mưa Thích Sát | Dồn dập, đe dọa, hiểm nguy cận kề | Đàn Tranh gảy ngắt (Pizzicato), Tiếng mưa rào, Trống Bass |
| **Tầng 2: Sa Bàn** | Hoạch Định Quân Cơ | Trầm tĩnh, tính toán, nhìn bao quát | Tiêu Địch u hoài, Đàn Nguyệt, Gió thổi qua quan ải |
| **Tầng 3: Sa Trường** | Quyết Chiến 3 Làn | Máu lửa, hào hùng, sinh tử tồn vong | Trống Trận dồn dập, Kèn sừng trâu, Dàn hợp xướng nam |
| **Tầng 4: Bái Tướng Đài**| Phá Ấn Thần Đàn | Thần thánh, chấn động, khai thiên lập địa | Sấm sét, Bát Quái xoay vần, Kintsugi vỡ nứt kim thanh |

---

## 3. DANH MỤC SFX DIEGETIC CỐT LÕI

Mỗi hành động trong giao diện phải đi kèm âm thanh phản hồi xúc giác:
* `sfx_paper_turn.ogg`: Tiếng lật trang sách khi bấm "Tiếp tục" trong Visual Novel.
* `sfx_seal_stamp.ogg`: Tiếng đóng ấn triện nặng trịch khi chọn phe thế lực hoặc ban bố chiếu chỉ.
* `sfx_brush_stroke.ogg`: Tiếng nét mực lướt trên giấy khi hiển thị tên chương hoặc danh xưng tướng.
* `sfx_spear_pierce.ogg`: Tiếng thương Triệu Vân đâm thủng giáp trận.
* `sfx_kintsugi_crack.ogg`: Tiếng gốm nứt và vàng nóng chảy rực sáng khi mở tướng UR.
* `sfx_censer_smoke.ogg`: Tiếng trầm hương cháy lách tách tại Lư Nghi Kỵ Vũ Hoàng.

---

## 4. QUY TRÌNH SẢN XUẤT BẰNG AI MUSIC GENERATION (SUNO / UDIO)

Nhằm tối ưu chi phí và tốc độ cho các studio indie, skill cung cấp bộ prompt templates chuẩn hóa theo phong cách Cổ Phong Thủy Mặc cho các công cụ AI Music hàng đầu. Chi tiết xem tại [ai_music_prompts.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/audio-sound-design/references/ai_music_prompts.md).

---

## 5. TÀI LIỆU & FILE MẪU KÈM THEO
- Master Audio Bible: [audio_bible.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/audio-sound-design/references/audio_bible.md)
- Danh mục 40+ SFX chi tiết: [sfx_catalog.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/audio-sound-design/references/sfx_catalog.md)
- Bộ Prompt AI Music: [ai_music_prompts.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/audio-sound-design/references/ai_music_prompts.md)
- Module TypeScript AudioManager: [audio_manager.ts](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/audio-sound-design/examples/audio_manager.ts)
