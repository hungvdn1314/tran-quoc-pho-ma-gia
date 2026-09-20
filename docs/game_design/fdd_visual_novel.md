# FDD-VN-001: Feature Design Document - Visual Novel Theater

## 1. Objective
Tạo ra một hệ thống Visual Novel Theater nhập vai, nơi người chơi trải nghiệm cảm giác (Player Fantasy) hóa thân thành một phò mã xuyên không, xoay sở trong chốn quan trường hiểm ác và hoàng cung đầy mưu mô.

## 2. User Story
- Là người chơi, tôi muốn đọc cốt truyện thông qua các đoạn hội thoại sinh động để hiểu rõ tình hình chính trị.
- Là người chơi, tôi muốn đưa ra các quyết định (Choices) ảnh hưởng đến nhánh cốt truyện (Branching narrative) và tình cảm (Affinity) của các nhân vật.

## 3. Core Mechanics

### 3.1. Dual-Actor Stage
- Màn hình hiển thị hai nhân vật (Sprite) hai bên.
- **Highlighting Active Speaker:** Nhân vật đang nói sẽ sáng lên, nhân vật không nói sẽ tối đi (dimmed).

### 3.2. Cấu trúc Foldback Diamond
- Các quyết định của người chơi dẫn đến các phân nhánh ngắn (Branching narrative) nhưng cuối cùng sẽ hội tụ lại (Foldback) tại một điểm cốt truyện chính để dễ dàng quản lý state.

### 3.3. Diegetic Choices
- Thay vì các nút bấm UI vô hồn, các lựa chọn được thể hiện dưới dạng diegetic UI: Tấu chương, mật thư, chiếu chỉ hoàng gia.

### 3.4. Psyche-Lock Debate Mechanism
- Trong các cuộc tranh luận triều đình (Court confrontations), kích hoạt chế độ "Psyche-Lock" (tham khảo Phoenix Wright). Người chơi phải chọn đúng bằng chứng/lập luận để phá vỡ "khóa tâm lý" của đối thủ.

### 3.5. Flag System & Affinity Tracking
- Mỗi lựa chọn đều set các `Event Flags` và cộng/trừ điểm `Affinity` của các phe phái/nhân vật (VD: Hoàng Đế, Công Chúa, Thái Sư).

## 4. System Hooks
- **Strategy Map Unlocks:** Đạt các Flag nhất định ở VN sẽ mở khóa Node mới trên Strategy Map.
- **Card Rewards:** Hoàn thành sự kiện ẩn thưởng thẻ chiến thuật (Tactics Cards).

## 5. UX Flow Wireframes
1. `Screen_VN_Dialogue`: Bối cảnh tẩm cung. Công chúa đang nói (Highlight Left). TextBox hiển thị text tốc độ typewriter.
2. `Screen_VN_Choice`: Tùy chọn dưới dạng 3 cuộn tấu chương trên bàn.
3. `Screen_VN_PsycheLock`: Triều đình. Đối thủ có 3 ổ khóa đỏ. Chọn sai mất HP (Sĩ Khí).

## 6. Edge Cases
- Nếu người chơi skip (Auto-Skip), hệ thống vẫn tự động chọn Choice mặc định (thường là an toàn nhất) để tránh gãy cốt truyện.

## 7. Unlock Prerequisites
- Mở khóa mặc định từ Chapter 1. Psyche-Lock mở khóa ở Chapter 12 (Cuộc thượng triều đầu tiên).
