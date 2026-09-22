---
name: quality-assurance-testing
description: >-
  Skill kiểm thử chất lượng toàn diện và tự động hóa QA (Quality Assurance & Automated Testing Pipeline).
  Sử dụng khi cần thiết lập chiến lược kiểm thử, viết Unit Tests (Vitest/Pytest), E2E Tests (Playwright/Puppeteer),
  quét tự động kịch bản phân nhánh Ink (Narrative Pathfinding QA), giả lập hàng chục nghìn trận đấu thẻ bài
  để kiểm tra độ cân bằng (Combat Autoplay Bot), và kiểm định xác suất Gacha bảo đảm tuân thủ luật quốc tế.
---

# Quality Assurance & Testing Pipeline Skill
*Khung kiểm thử chất lượng toàn diện cho game hybrid Trấn Quốc Phò Mã Gia*

---

## 1. TỔNG QUAN CHIẾN LƯỢC KIỂM THỬ (TEST PYRAMID)

Trong một tựa game hybrid 4 tầng, việc kiểm thử thủ công (manual testing) hoàn toàn không thể bao quát được hàng trăm nhánh rẽ kịch bản Ink, hàng chục nghìn tổ hợp rút bài và xác suất ngẫu nhiên của hệ thống Gacha. Do đó, hệ thống QA phải được tự động hóa theo mô hình Kim Tự Tháp Kiểm Thử (Test Pyramid):

```
                     / \
                    /   \      E2E Tests (Playwright/Puppeteer)
                   / E2E \     - Toàn bộ luồng chơi từ Ch.1 đến Ch.52
                  /───────\    - UI interaction, chuyển cảnh, save/load
                 /         \
                /Integration\  Integration Tests & Bots
               /  & Sim Bots \ - Headless Combat Sim (10.000 trận đấu)
              /───────────────\- Narrative Path Validator (Quét cây Ink)
             /                 \- Gacha Monte Carlo CI Audit
            /    Unit Tests     \
           /─────────────────────\ Unit Tests (Vitest + Pytest)
          /                       \- State Store, Pity Formula, Armor Formula
         /─────────────────────────\- Pydantic Data Validation, Ink Tags Parser
```

---

## 2. NĂM TRỤ CỘT KIỂM THỬ TỰ ĐỘNG

### 2.1. Narrative Path QA (Kiểm Thử Kịch Bản Phân Nhánh)
* **Mục tiêu**: Đảm bảo 100% các nút truyện (Knots/Stitches) trong các file `.ink` đều có đường dẫn tới, không bị kẹt ở "nhánh chết" (Dead-ends), các lựa chọn (Choices) đều dẫn tới nhãn hợp lệ, và không có biến chưa khởi tạo.
* **Công cụ**: Script tự động `scripts/narrative_validator.py`.
* **Quy chuẩn**: Mọi tag `#actor-left:`, `#actor-right:`, `#bg:`, `#suspicion:` đều phải khớp với danh mục tài nguyên đã đăng ký trong Game Bible và danh mục ảnh.

### 2.2. Combat Balance & Autoplay Bot (Cân Bằng Thẻ Bài Sa Trường)
* **Mục tiêu**: Phát hiện các lá bài quá mạnh (Overpowered) hoặc quá yếu (Underpowered), các vòng lặp vô hạn (Infinite Combos), và đảm bảo tỷ lệ thắng của người chơi ở các ải cốt truyện nằm trong khoảng mong muốn:
  * Ải tân thủ (Tutorial/Ch.1-5): Win-rate 95 - 100%
  * Ải thường (Story Battles): Win-rate 70 - 85%
  * Ải Boss / Đại chiến (Thành Thanh Châu Ch.52): Win-rate 55 - 65% (yêu cầu phối hợp kế sách)
* **Công cụ**: Headless Simulator `scripts/combat_headless_sim.py` chạy mô phỏng 10.000 trận đấu giữa các bộ bài mẫu trong vài giây.

### 2.3. Gacha Probability & Anti-Tamper Audit (Kiểm Định Xác Suất Gacha)
* **Mục tiêu**: Kiểm tra tính chính xác tuyệt đối của công thức Soft Pity (ramp từ lượt 74 đến 90), Hard Pity (chắc chắn trúng ở lượt 90), và cơ chế bảo hiểm 50/50 (nếu lần trước lệch rate thì lần sau 100% là tướng Banner).
* **Tiêu chuẩn kiểm thử**:
  * Tỷ lệ UR thực tế (bao gồm pity) phải đạt xấp xỉ 1.6% - 1.8%.
  * Độ lệch chuẩn (Standard Deviation) qua 1.000.000 lượt quay ảo phải nhỏ hơn 0.05%.

### 2.4. Unit Testing (TypeScript / Vitest)
* Kiểm tra các module cốt lõi:
  * `GameStateStore`: Các hành động update, subscribe, rollback hoạt động chính xác.
  * `LaneManager`: Tính toán giảm trừ sát thương theo công thức giáp `Damage = RawAtk * (100 / (100 + Armor))`.
  * `BossAI`: Ý đồ gián đoạn (Interrupt) khi nhận đủ lượng sát thương phá giáp.

### 2.5. End-to-End Testing (Playwright / Web Client)
* Chạy headless browser tương tác trực tiếp với DOM:
  * Kiểm tra việc mở/đóng các modal không bị click xuyên thấu (`pointer-events: none`).
  * Kiểm tra âm lượng và typewriter không làm đơ giao diện.
  * Kiểm tra việc lưu và khôi phục trạng thái (Save/Load) qua `localStorage`.

---

## 3. CHỈ TIÊU NGHIỆM THU CHẤT LƯỢNG (QUALITY GATES)

Mọi bản build hoặc pull request trước khi hợp nhất phải vượt qua các tiêu chí:
1. **Zero Dead-Ends**: Script `narrative_validator.py` không trả về bất kỳ lỗi knot thiếu hoặc tag sai nào.
2. **Zero Schema Violations**: `validate_game_data.py` báo cáo 100% hợp lệ về toàn vẹn dữ liệu.
3. **Unit Test Coverage >= 80%**: Toàn bộ logic toán học và State Store phải có test cases đầy đủ.
4. **Performance Gate**: Không có frame-drop dưới 45 FPS trên giả lập cấu hình trung bình; bộ nhớ RAM dưới 200MB.

---

## 4. TÀI LIỆU & CÔNG CỤ ĐI KÈM
- Ma trận kiểm thử chi tiết: [test_matrix.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/quality-assurance-testing/references/test_matrix.md)
- Đặc tả kiểm thử kịch bản: [narrative_qa_spec.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/quality-assurance-testing/references/narrative_qa_spec.md)
- Đặc tả Bot tự đánh: [combat_bot_spec.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/quality-assurance-testing/references/combat_bot_spec.md)
- Script quét kịch bản Ink: `scripts/narrative_validator.py`
- Script giả lập chiến đấu: `scripts/combat_headless_sim.py`
