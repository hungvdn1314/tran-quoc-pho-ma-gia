# 📋 Migration Checklist: Monolith to Modular Architecture

Checklist từng bước đảm bảo việc tái cấu trúc `prototype/app.js` diễn ra an toàn, không gây đứt gãy luồng chơi hiện tại.

---

## 阶段 1: Chuẩn Bị & Khung Cơ Sở (Setup & Foundation)
- [ ] Khởi tạo thư mục `src/` với các thư mục con: `core/`, `engines/`, `ui/`, `audio/`.
- [ ] Cài đặt các dev dependencies: `vite`, `typescript`, `vitest`, `@types/node`.
- [ ] Cấu hình `tsconfig.json` và `vite.config.ts`.
- [ ] Định nghĩa đầy đủ các interface trong `src/core/types.ts` (`Hero`, `Card`, `BattleEncounter`, `GameState`).
- [ ] Viết `GameStateStore.ts` với cơ chế reactive listener.
- [ ] Viết `EventBus.ts` cho giao tiếp liên module.

## 阶段 2: Tách Rời 4 Engines (Engine Isolation)
- [ ] **Gacha Engine**:
  - [ ] Chiết xuất `PityCalculator.ts` (kiểm tra tỷ lệ 74-90 soft pity và bảo hiểm 50/50).
  - [ ] Chiết xuất `SummonService.ts` (xử lý trừ vé, cập nhật state `ownedHeroIds`).
  - [ ] Viết unit test cho `PityCalculator` với 100.000 lượt quay giả lập.
- [ ] **Combat Engine**:
  - [ ] Chiết xuất `CombatStateMachine.ts` (quản lý 4 phases: Draw, Player, Enemy, Resolve).
  - [ ] Chiết xuất `LaneManager.ts` (xử lý 3 làn, tính sát thương và giáp giảm trừ).
  - [ ] Chiết xuất `BossAI.ts` (quản lý Intent của Boss, telegraphing).
  - [ ] Viết unit test cho công thức tính sát thương và cơ chế gián đoạn chiêu thức (Interrupt).
- [ ] **Strategy Map Engine**:
  - [ ] Chiết xuất `MapGraph.ts` (đồ thị các điểm nút lộ quân).
  - [ ] Chiết xuất `LogisticsSystem.ts` (quản lý AP, tiêu hao lương thảo khi xuất chinh).
- [ ] **Narrative Engine**:
  - [ ] Đóng gói `InkParser.ts` và `Typewriter.ts`.
  - [ ] Chiết xuất `NarrativeManager.ts` (xử lý tags `#actor-left`, `#actor-right`, `#suspicion`).

## 阶段 3: Tách UI Components (UI Decoupling)
- [ ] Tạo `BaseComponent.ts` với lifecycle chuẩn (`mount`, `render`, `bindEvents`, `unmount`).
- [ ] Chiết xuất `SuspicionCenser.ts` (Lư trầm nghi kỵ, cập nhật độ mờ khói theo state).
- [ ] Chiết xuất `FactionBadge.ts` (Ấn triện thế lực và modal tiến trình thân phận).
- [ ] Chiết xuất `HeroInspectorModal.ts` (Bảng tra cứu 28 danh tướng và vẽ radar Tứ Duy).
- [ ] Chiết xuất `TopNav.ts` và `MilestonesModal.ts`.

## 阶段 4: Tích Hợp & Kiểm Thử Hồi Quy (Integration & Regression)
- [ ] Viết `src/main.ts` kết nối tất cả các module.
- [ ] Chạy `npm run dev` kiểm tra toàn bộ luồng chơi từ Chương 1 đến Chương 52.
- [ ] Kiểm tra kiểm soát con trỏ (`pointer-events: none` trên các view ẩn).
- [ ] Kiểm tra typography 4 tầng: Đảm bảo không có chữ nào bị lỗi dấu tiếng Việt.
- [ ] Chạy `npm run build` và kiểm tra file tĩnh trong thư mục `dist/`.
- [ ] Nghiệm thu không có lỗi console phát sinh.
