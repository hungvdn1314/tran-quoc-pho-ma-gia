---
name: polish-juice-accessibility
description: >-
  Skill đánh bóng trải nghiệm xúc giác và khả năng tiếp cận (Juice, Micro-Interactions & Accessibility Pipeline).
  Sử dụng khi cần thêm các phản hồi vật lý "Juice" (rung màn hình Screen Shake, văng số sát thương Damage Pop Physics,
  mực loang Ink Splatter, hiệu ứng nứt hoàng kim Kintsugi), tinh chỉnh thời gian chuyển động (150-300ms budget),
  và thẩm định khả năng tiếp cận theo chuẩn WCAG AA (độ tương phản 4.5:1, touch target 44px, prefers-reduced-motion).
---

# Polish, Juice & Accessibility Pipeline Skill
*Đánh bóng cảm xúc & chuẩn mực tiếp cận cho Trấn Quốc Phò Mã Gia*

---

## 1. NGUYÊN LÝ "JUICE" & PHẢN HỒI XÚC GIÁC (TACTILE FEEDBACK)

"Juice" là lớp hoàn thiện cuối cùng biến một trò chơi từ trạng thái "chạy được nhưng khô cứng" trở thành một tác phẩm nghệ thuật sống động, có sức nặng và thỏa mãn mọi giác quan:
1. **Trọng Lượng Cổ Phong (Weight & Materiality)**: Mọi tương tác đều phải có sức nặng vật lý — khi thẻ bài giáng xuống bàn cờ, bàn cờ phải rung chuyển nhẹ; khi ấn triện dập xuống, mực đỏ phải thẩm thấu lan tỏa trên mặt giấy.
2. **Nguyên Tắc Thời Lượng 150 - 300ms**: Mọi hiệu ứng mở menu, lật card hay chuyển cảnh phải hoàn thành trong 150-300ms. Quá nhanh (< 100ms) sẽ tạo cảm giác giật cục thô ráp; quá chậm (> 400ms) sẽ khiến người chơi sốt ruột và cảm thấy game bị lag.
3. **Tuyệt Đối Tuân Thủ AGENTS.md**: Mọi hiệu ứng ánh sáng phải nằm trong bảng màu Hoàng Kim Molten Gold (`#fbbf24`), Chu Sa (`#991b1b`) và Mặc Sắc (`#080a0d`), cấm tuyệt đối ánh sáng neon tím generic AI.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CATALOG HIỆU ỨNG "JUICE" THEO TẦNG               │
├───────────────────┬───────────────────┬─────────────────────────────────────┤
│ 1. VISUAL NOVEL   │ 2. ĐẾ NGHIỆP SA BÀN│ 3. SA TRƯỜNG THẺ BÀI                │
├───────────────────┼───────────────────┼─────────────────────────────────────┤
│ • Typewriter SFX  │ • Đường quân kỳ   │ • 3D Card Hover Tilt (Góc nghiêng 8°)│
│ • Chớp giật sấm   │ • Sương mù rẽ sóng│ • Damage Pop Physics (Văng parabol) │
│ • Mực loang chữ   │ • Thành trì rung  │ • Screen Shake khi nổ Boss Intent   │
└───────────────────┴───────────────────┴─────────────────────────────────────┘
```

---

## 2. BỘ CHUẨN MỰC TIẾP CẬN (ACCESSIBILITY - WCAG AA)

Theo định hướng của UI/UX Pro Max và Taste Skill, mọi thành phần giao diện phải vượt qua các tiêu chí:

### 2.1. Độ Tương Phản Màu Sắc (Contrast Ratio >= 4.5:1)
* Toàn bộ chữ hiển thị trên nền Đen Obsidian (`#080a0d` hoặc `#10141b`) phải sử dụng màu chữ Trắng Ngà (`#f8fafc`), Thép Lam (`#cbd5e1`), hoặc Vàng Kim (`#fbbf24`).
* Cấm dùng màu xám tối (`#475569`) cho các văn bản kịch bản dài gây mỏi mắt người đọc.

### 2.2. Kích Thước Vùng Chạm Cảm Ứng (Touch Target >= 44 × 44 px)
* Mọi nút bấm chuyển tầng (Tab VN/Sa Bàn/Sa Trường), nút quay Gacha, nút đóng Modal phải có diện tích tối thiểu `44 × 44 px` với khoảng cách đệm an toàn tối thiểu 8px để tránh bấm nhầm.

### 2.3. Hỗ Trợ Tùy Biến Giảm Chuyển Động (`prefers-reduced-motion`)
* Khi người dùng kích hoạt chế độ chống say xe hoặc nhạy cảm thị giác trong hệ điều hành:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

### 2.4. Điều Khiển Bằng Bàn Phím (Keyboard Accessibility)
* `Phím Cách (Spacebar)`: Tiếp tục câu thoại tiếp theo trong Visual Novel.
* `Phím Esc`: Đóng ngay lập tức bất kỳ Modal nào đang mở (Hero Inspector, Milestones, Choices).
* `Phím 1 / 2 / 3`: Chuyển nhanh giữa 3 tầng (1: VN, 2: Sa Bàn, 3: Sa Trường).

---

## 3. TÀI LIỆU KÈM THEO
- Chi tiết danh mục hiệu ứng: [juice_catalog.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/polish-juice-accessibility/references/juice_catalog.md)
- Bảng kiểm tra 15 điểm tiếp cận: [accessibility_checklist.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/polish-juice-accessibility/references/accessibility_checklist.md)
