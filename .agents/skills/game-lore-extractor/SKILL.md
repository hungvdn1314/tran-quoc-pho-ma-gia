---
name: game-lore-extractor
description: Hệ thống bóc tách dữ liệu kịch bản game (Game Bible) từ tiểu thuyết đã crawl. Sử dụng PhoNLP/underthesea cho Named Entity Recognition tiếng Việt, Pydantic schemas cho dữ liệu chuẩn hóa, và NetworkX cho đồ thị quan hệ nhân vật.
---

# Game Lore Extractor Skill

Quy trình bóc tách các thành tố game (Game Elements) từ văn bản tiểu thuyết *Trấn Quốc Phò Mã Gia* thành cơ sở dữ liệu có cấu trúc phục vụ thiết kế game Visual Novel & Chiến Thuật.

## 6 Thành Tố Game Cần Bóc Tách

### 1. Nhân Vật & Anh Linh (`characters.json`)
- **Tên chính danh & Biệt danh (Aliases):** e.g., Quý Bình An = Phò mã gia = Quý công tử = Tam thiếu gia.
- **Phe phái (Faction):** Quý Gia, Hoàng Thất Đại Vũ, Tây Lăng, Nam Ly, Bắc Cương, Giang Đông.
- **Cảnh giới võ lực:** Vương Cảnh (<90), Hoàng Cảnh (90-99), Đế Cảnh (100+), Bán Thánh (120+), Thánh Giả (130+), Bán Tiên (140+), Nhân Tiên (150+).
- **Phân loại vai trò:** Võ Tướng, Mưu Thần, Mỹ Nhân, Thống Soái, Sát Thủ.
- **Thẻ Kỹ Năng / Cẩm Nang:** Tên chiêu thức, mô tả hiệu ứng, điều kiện kích hoạt.
- **Chi phí triệu hoán:** Số lượng vàng (hoàng kim) ban đầu để triệu hoán qua hệ thống Tam Quốc.

### 2. Khoa Kỹ & Phát Minh (`tech_tree.json`)
- **Công nghệ / Sản phẩm:** Lưu Hỏa (dầu hỏa/hỏa dược), Gia Cát Thần Nỏ, Rượu mạnh (Bạch tửu), Xà phòng (Thấu hoa cao), Muối tinh, Thuyền Mông Đồng, v.v.
- **Điều kiện nghiên cứu:** Vàng tiêu hao + Nguyên liệu + Thời gian (ngày).
- **Hiệu ứng mở khóa:** Thẻ bài chiến thuật (Hỏa công, Bách bộ xuyên dương) hoặc Nguồn thu nhập kinh tế mỗi lượt.

### 3. Chiến Dịch & Trận Đánh (`battles.json` & `campaigns.json`)
- **Tên trận:** e.g., Trận chiến Hổ Lao Quan, Bảo vệ Phò Mã Phủ, Vượt 3 ải kinh thành, Thủy chiến Giang Lăng.
- **Địa hình & Dạng trận:** Dã chiến (Open Field), Công thành (Siege), Thủ thành (Defense), Thủy chiến (Naval).
- **Lực lượng:** Phe công, phe thủ, thống soái hai bên, quân số.
- **Mưu kế then chốt:** Chiêu thức/kế sách quyết định cục diện (Giả Hủ, Quý Bình An).

### 4. Quyền Mưu & Sự Kiện Visual Novel (`court_events.json`)
- **Tình huống:** Đối đầu Vũ Hoàng, giải đố câu đối, thẩm vấn gián điệp, đàm phán với công chúa Ninh An.
- **Phân nhánh lựa chọn (Choices):** 
  - Phương án A (Giả ngu che giấu thực lực) $\rightarrow$ Giảm nghi kị, mất uy danh.
  - Phương án B (Bộc lộ sắc sảo/đe dọa) $\rightarrow$ Tăng uy danh, tăng nghi kị của hoàng thất.

### 5. Binh Chủng Đặc Chủng (`troop_types.json`)
- Hãm Trận Doanh (Cao Thuận), Bạch Mã Nghĩa Tòng (Triệu Vân/Công Tôn Toản), Cấm Vệ Hắc Y Nhân, Giang Đông Thủy Quân (Cam Ninh/Chu Du), Hổ Báo Kỵ.

### 6. Mạng Lưới Quan Hệ (`character_graph.json`)
- Đồ thị NetworkX lưu liên minh, thù địch, tình cảm, chủ tớ giữa các nhân vật theo từng mốc thời gian.
