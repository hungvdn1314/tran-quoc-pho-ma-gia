# 🛡️ Project Rules: Trấn Quốc Phò Mã Gia (镇国驸马爷)

Welcome to the **Trấn Quốc Phò Mã Gia** repository. Every agent, developer, and automated pipeline working on this project MUST strictly adhere to the following rules:

---

## 1. Typography & Vietnamese Language Inviolable Rules (QUY TẮC BẤT KHẢ XÂM PHẠM)

1. **Strict 4-Layer Typography Architecture**:
   - `--font-title`: `'Playfair Display', 'Cormorant Garamond', 'Lora', 'Noto Serif', serif;` (Imperial titles, chapter headers, province names, faction identity, damage pop numbers). 100% Vietnamese diacritic native.
   - `--font-text`: `'Be Vietnam Pro', 'Segoe UI', -apple-system, sans-serif;` (UI labels, numbers, stat counters, buttons, badges, tooltips).
   - `--font-serif`: `'Lora', 'Noto Serif', 'Palatino Linotype', 'Times New Roman', serif;` (Visual Novel literary narrative, dialogue text, lore excerpts).
   - `--font-seal`: `'ZCOOL XiaoWei', 'Noto Serif SC', 'Songti SC', 'SimSun', 'STSong', 'KaiTi', serif;` (Ancient seal script for cinnabar stamps `[ 駙 ]`, `[ 武 ]`, `[ 青 ]`, `[ 關 ]`, `[ 殿 ]`, `[ 輿 ]`, `[ 戈 ]`, `[ 密 ]`, `[ 卷 ]`).

2. **Absolute Font Blacklist**:
   - 🚫 **NEVER use `Cinzel`, `Trajan`, `Bebas Neue`** or any font lacking the Vietnamese Unicode block (`U+1EA0 - U+1EF9`).
   - Using non-Vietnamese fonts causes "Frankenstein Typography", splitting letters in the same word between different fallback fonts.

3. **3D Canvas & WebGL Texture Safety**:
   - Always re-render Canvas 2D / Three.js textures upon `document.fonts.ready` to ensure high-resolution web fonts are applied without raw fallback glitches.

4. **No Awkward Word-Wrapping**:
   - All chapter badges (`.banner-chapter`) and short headers must use `white-space: nowrap;`.

---

## 2. Art Direction & Visual Cohesion (Tả Thực Cổ Phong Thủy Mặc & Kim Kế)

1. **Harmonic 60 - 30 - 10 Palette**:
   - **60% Obsidian Foundation**: `#080a0d` deep void, `#10141b` surface.
   - **30% Cultural Identity**: Imperial Cinnabar `#991b1b` / `#dc2626`, Northern Steel `#e2e8f0` / `#94a3b8`, Jade `#10b981`.
   - **10% Power Accent**: Molten Gold `#fbbf24` / `#f59e0b` strictly reserved for Primary CTAs, SSR/UR auras, and Kintsugi fractures.
2. **Anti-Slop Disciplines**:
   - NO generic AI-purple gradients.
   - NO excessive glassmorphism.
   - NO emojis as UI icons; always use official SVG vector icons or authentic seal glyphs.
   - NO layout jumps during state changes.

---

## 3. UI/UX & Interaction Standards

1. **Pointer-Events Hierarchy**:
   - Inactive views MUST use `visibility: hidden !important; pointer-events: none !important;` and `.stage-view:not(.active) * { pointer-events: none !important; }` to prevent invisible 3D canvases or scroll panels from hijacking mouse events.
2. **Tactile Accessibility**:
   - Minimum touch target: `44 × 44 px`.
   - Text contrast ratio: WCAG AA (>= `4.5:1`).
   - Keyboard navigation: `Space` advances dialogue, `Escape` closes modals.

---

## 4. Inviolable Canon Rules: Hệ Thống Triệu Hoán & Mỹ Thuật Độc Bản Của Nhân Vật (System Summoning & Visual Asset Isolation)

1. **100% Nghi Thức Triệu Hoán Khi Mở Khóa Tướng (Mandatory Summoning Ritual)**:
   - Mọi danh tướng/mưu thần Tam Quốc được triệu hoán từ Thiên Cơ Hệ Thống (Triệu Vân, Cao Thuận, Giả Hủ, Điển Vi, Lý Nho...) khi xuất hiện trong cốt truyện Visual Novel hoặc Gacha TUYỆT ĐỐI KHÔNG ĐƯỢC chỉ hiển thị qua vài dòng chữ hội thoại thông thường.
   - BẮT BUỘC phải kích hoạt toàn diện nghi thức Bái Tướng Thần Đàn / Grand Reveal (Sấm chớp, Bát Quái phá ấn, rạn nứt Kintsugi hoàng kim, Splash Art toàn màn hình, Ấn triện chu sa, Bảng chỉ số Tứ Duy, Danh xưng võ học, và Câu tuyên thệ xuất thế bái kiến Chúa Công).
2. **Không Dùng Chung Tài Nguyên Nhân Vật (Zero Asset Sharing)**:
   - 100% nhân vật xuất hiện và lên tiếng trong Visual Novel (kể cả nhân vật phụ như Vũ Hoàng, Tô Kiến Phong, Sứ Thần, Tỳ Nữ, Thích Khách...) PHẢI CÓ TÀI NGUYÊN HÌNH ẢNH ĐỘC BẢN (Standee PNG / Splash riêng biệt).
   - Tuyệt đối cấm gán cứng hoặc tái sử dụng hình ảnh của nhân vật này cho nhân vật khác (như lỗi gán `actor_to_kien_phong.png` cho tất cả mọi người trước đây).
3. **Chuẩn Tạo Hình Nhân Vật Tam Quốc (Three Kingdoms Historical Fidelity)**:
   - Tất cả tạo hình tướng triệu hoán phải được nghiên cứu và bám sát đặc điểm lịch sử, binh chủng, vũ khí và tính cách nguyên bản Tam Quốc (tham khảo tư liệu lịch sử, Tam Quốc Diễn Nghĩa và phong cách Tả Thực Cổ Phong Thủy Mặc & Kim Kế Hắc Ám).

---

## 5. Inviolable Rule: Triệt Tiêu Triệt Để Bệnh "Web Dashboard / E-Commerce / SaaS" (Absolute Prohibition of Web Dashboard Slop)

1. **Tuyệt Đối Cấm Các Thành Phần Giao Diện Mô Phỏng Web Dashboard / SaaS / E-Commerce**:
   - 🚫 **CẤM KHỐI THỐNG KÊ KPI DẠNG CARD HÌNH CHỮ NHẬT**: Tuyệt đối không dùng các ô card chữ nhật bo góc chứa số to kiểu Google Analytics hay Shopify dashboard (`[QUÝ BÌNH AN... 5]`, `[NGÂN KHỐ... 300,000]`).
   - 🚫 **CẤM DANH SÁCH MUA HÀNG KIỂU GIỎ HÀNG SHOPIFY**: Tuyệt đối không xếp các tính năng nâng cấp thành các hàng ngang chữ nhật với icon vuông bên trái, tên mô tả ở giữa, và nút mua màu đỏ/vàng kèm giá tiền bên phải (`.upgrade-tray`). Đó là giao diện web bán hàng, phá hủy hoàn toàn cảm giác cổ phong nhập vai!
   - 🚫 **CẤM THANH TAB PHÂN LOẠI DẠNG NÚT DẸT VĂN PHÒNG**: Không dùng các hàng nút phẳng `TẤT CẢ (29)`, `VÕ TƯỚNG (18)` kiểu bộ lọc tìm kiếm e-commerce.
   - 🚫 **CẤM LỘ THANH CUỘN BROWSER NATIVE THÔ LẬU**: Tuyệt đối ẩn toàn bộ thanh cuộn xám mặc định của trình duyệt (`scrollbar-width: none;`).

2. **Quy Chuẩn Bắt Buộc: 100% Thành Phần Nhập Vai Cổ Phong Thủy Mặc & Kim Kế (Diegetic Artifacts)**:
   - **Thư Trục & Xuyến Chỉ (Imperial Charter & Silk Parchment)**: Mọi bảng tra cứu phải mở ra dưới dạng Trục Cuộn Phong Thần Bảng / Quân Cơ Thư Trục hai đầu nẹp gỗ mun bịt đồng hoặc Bổn Mệnh Giản.
   - **Chỉ Số Hòa Quyện Vào Văn Tự Thư Pháp & Ấn Triện**: Số liệu tài nguyên và chân khí phải hòa quyện vào triện chu sa hoàng gia `[ 駙 ]` (Phò Mã ấn), ngân thỏi hoàng kim `[ 金 ]` và nét thư pháp cổ, không đóng hộp dashboard.
   - **Duyệt Danh Tướng Bằng Trúc Phù / Ngọc Bài Cổ Phong**: Duyệt danh tướng bằng hàng Trúc Điệp (thẻ tre khắc tên) hoặc Ngọc Bài có khắc triện phân loại (`[ 武 ]`, `[ 謀 ]`, `[ 巾 ]`, `[ 異 ]`), chuyển động lật mở êm ái 180-250ms.
   - **5 Trọng Trận Khắc Minh (Ngũ Trọng Trận Đồ)**: Hệ thống nâng cấp danh tướng phải thể hiện dưới dạng **5 Vòng Trận Đồ Khắc Minh Bát Quái & Binh Thư Cổ** (Thần Binh Khắc Minh Đài, Bổn Mệnh Thư Giản, Thiên Phú Tinh Đồ, Mã Phù Tiết, Cửu Đỉnh Luyện Khí) với các thao tác ấn triện chu sa, khớp nối phù tiết và châm lửa cửu đỉnh thay cho nút bấm mua hàng.


