# 📜 Narrative QA Specification: Static Analysis for Ink Scripts

Quy chuẩn kỹ thuật kiểm định tự động kịch bản Ink trong dự án Trấn Quốc Phò Mã Gia.

---

## 1. CÁC TIÊU CHUẨN XÁC THỰC (VALIDATION CRITERIA)

Mỗi tệp kịch bản `.ink` lưu tại `data/scenes/` phải tuân thủ nghiêm ngặt 5 bộ quy tắc:

### 1.1. Toàn Vẹn Đường Rẽ Nhánh (Divert Integrity)
* Mọi lệnh chuyển hướng dạng `-> destination` hoặc lựa chọn `+ [Choice] -> destination` phải trỏ tới một Knot hoặc Stitch đã được khai báo.
* Ngoại lệ duy nhất: `-> END` và `-> DONE`.
* **Mức độ lỗi**: S1 Blocker. Nếu vi phạm, build pipeline sẽ lập tức ngắt.

### 1.2. Phát Hiện Nút Chết (Dead-End Detection)
* Một Knot được coi là "Nút Chết" nếu:
  1. Không chứa bất kỳ câu lựa chọn nào (`+` hoặc `*`).
  2. Không chứa bất kỳ lệnh chuyển hướng nào (`->`).
  3. Không kết thúc bằng `-> END` hoặc `-> DONE`.
* Người chơi khi đọc tới Knot này sẽ bị đứng hình, nút "Tiếp Tục" bị vô hiệu hóa và không có cách nào thoát ra ngoài.

### 1.3. Phát Hiện Nút Cô Lập (Orphan Knots)
* Một Knot được coi là cô lập nếu nó không phải là một trong các điểm khởi đầu (Entry Points: `chapter_1_start`, `chapter_16_start`, `chapter_20_start`, ...) và không có bất kỳ Knot nào khác trỏ tới nó.
* Nút cô lập là mã kịch bản thừa, lãng phí tài nguyên và thường là dấu hiệu của một tính năng bị viết dở hoặc quên kết nối.

### 1.4. Quy Chuẩn Đặt Thẻ Tags (# TAGS)
* `# BACKGROUND: <bg_id>`: `<bg_id>` phải tồn tại trong danh mục cảnh nền tại `prototype/assets/images/` hoặc `game_bible_v2/locations.json`.
* `# ACTORS: <actor_id>|<left|right>|<expression>`:
  * `<actor_id>`: Phải là định danh độc bản (không dùng chung ảnh).
  * Vị trí: Bắt buộc là `left` hoặc `right`.
  * Biểu cảm: `neutral`, `worried`, `angry`, `confident`, `shocked`.
* `# SUSPICION_CHANGE: <+int|-int>`: Giá trị thay đổi nghi kỵ của Vũ Hoàng.

---

## 2. QUY TRÌNH CHẠY KIỂM ĐỊNH TRONG CI/CD

```bash
# Chạy script kiểm định kịch bản trước khi commit
python scripts/narrative_validator.py
```
Nếu script trả về mã thoát `exit code 0`, kịch bản hợp lệ. Nếu trả về `1`, commit bị từ chối.
