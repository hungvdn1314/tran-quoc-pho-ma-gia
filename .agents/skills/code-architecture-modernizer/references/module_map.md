# 🗺️ Module Mapping Guide: app.js -> Modular TypeScript

Bản đồ chi tiết ánh xạ từng khối hàm, cấu trúc dữ liệu và listener từ `prototype/app.js` sang cấu trúc thư mục module hóa `src/`.

---

## 1. TỔNG QUAN PHÂN BỔ MÃ NGUỒN

```
src/
├── core/
│   ├── types.ts              # Định nghĩa interface MasterGameState, Chapter, Faction, Hero, Card
│   ├── GameStateStore.ts      # Reactive state container với event subscriptions
│   ├── EventBus.ts            # Typed event emitter cho giao tiếp liên module
│   └── DataLoader.ts          # Nạp GAME_DATA và validate schema
│
├── engines/
│   ├── narrative/
│   │   ├── InkEngineWrapper.ts # Wrapper điều khiển InkEngine parser
│   │   ├── Typewriter.ts       # Logic gõ chữ typewriter & micro-pauses
│   │   └── NarrativeManager.ts # Quản lý kịch bản, nhánh thoại, actor slots
│   │
│   ├── strategy/
│   │   ├── MapGraph.ts         # Quản lý đồ thị các điểm nút sa bàn (Node Graph)
│   │   ├── LogisticsSystem.ts  # Hệ thống điểm hành động (AP), lương thảo, thuế khóa
│   │   └── MapRenderer.ts      # Vẽ sa bàn quân sự, đường hành quân, hiệu ứng sương mù
│   │
│   ├── combat/
│   │   ├── CombatStateMachine.ts # Quản lý các phase: Draw -> Player -> Enemy -> Resolve
│   │   ├── LaneManager.ts      # 3 Làn chiến thuật (Tả Dực, Trung Quân, Hữu Dực)
│   │   ├── CardDeck.ts         # Rút bài, mana cost, graveyard, hiệu ứng kích hoạt
│   │   └── BossAI.ts           # Utility AI quyết định ý đồ của Boss (Intent Telegraphing)
│   │
│   └── gacha/
│       ├── PityCalculator.ts   # Tính toán Soft Pity 74-90, Hard Pity 90, bảo hiểm 50/50
│       ├── AltarAnimation.ts   # Quản lý animation 3D Flip, Bát Quái phá ấn, Kintsugi vỡ nứt
│       └── SummonService.ts    # Logic trừ lệnh triệu hoán, sinh kết quả, lưu lịch sử
│
├── ui/
│   ├── BaseComponent.ts       # Lớp cơ sở cho mọi component giao diện
│   ├── hud/
│   │   ├── TopNav.ts          # Thanh tài nguyên trên cùng (Vàng, Lương, Kim Bảo, AP)
│   │   ├── SuspicionCenser.ts # Lư trầm nghi kỵ Vũ Hoàng (0-100%)
│   │   └── FactionBadge.ts    # Thẻ ấn triện thế lực Quý Bình An
│   │
│   ├── modals/
│   │   ├── HeroInspectorModal.ts # Bảng tra cứu 28 danh tướng, radar Tứ Duy
│   │   ├── MilestonesModal.ts    # Ma trận mở khóa chương & tính năng
│   │   └── DialogueChoiceModal.ts# Hộp thoại lựa chọn phân nhánh kịch bản
│   │
│   └── views/
│       ├── VisualNovelView.ts # Khung nhìn Tầng 1: Visual Novel
│       ├── StrategyMapView.ts # Khung nhìn Tầng 2: Đế Nghiệp Sa Bàn
│       └── BattleArenaView.ts # Khung nhìn Tầng 3: Sa Trường Thẻ Bài
│
└── main.ts                    # Khởi tạo DI container và bootstrap ứng dụng
```

---

## 2. BẢNG ÁNH XẠ HÀM & BIẾN CỤ THỂ

### 2.1. Core State & Data
* `state` (Line 104-189) ➔ `src/core/GameStateStore.ts`
* `chapterMatrix` (Line 24-35) ➔ `src/core/data/chapterMatrix.ts`
* `factionStages` (Line 38-99) ➔ `src/core/data/factionStages.ts`
* `window.GAME_DATA` ➔ `src/core/DataLoader.ts`

### 2.2. Visual Novel & Narrative
* `advanceStory()`, `typewriteText()` ➔ `src/engines/narrative/Typewriter.ts` & `NarrativeManager.ts`
* `updateActorSlots()` ➔ `src/engines/narrative/NarrativeManager.ts`
* `renderDialogueChoices()` ➔ `src/ui/modals/DialogueChoiceModal.ts`
* `updateFactionProgressionUI()` ➔ `src/ui/hud/FactionBadge.ts`

### 2.3. Strategy Map
* `selectMapNode()`, `dispatchTroops()` ➔ `src/engines/strategy/MapRenderer.ts`
* `deductAp()`, `replenishAp()` ➔ `src/engines/strategy/LogisticsSystem.ts`

### 2.4. Combat Engine
* `playCard()`, `resolveCombatTurn()` ➔ `src/engines/combat/CombatStateMachine.ts`
* `calculateArmorMitigation()`, `applyDamage()` ➔ `src/engines/combat/LaneManager.ts`
* `updateBossIntent()` ➔ `src/engines/combat/BossAI.ts`
* `wallHp`, `reservoirStage` (Thủy Công) ➔ `src/engines/combat/CombatStateMachine.ts`

### 2.5. Gacha Altar
* `executeSummon()`, `calculatePity()` ➔ `src/engines/gacha/PityCalculator.ts` & `SummonService.ts`
* `triggerGrandRevealModal()`, `playKintsugiAnimation()` ➔ `src/engines/gacha/AltarAnimation.ts`

### 2.6. Hero Inspector
* `renderHeroInspector()`, `switchInspectorHero()` ➔ `src/ui/modals/HeroInspectorModal.ts`
* `renderStatRadarCanvas()` ➔ `src/ui/modals/HeroInspectorModal.ts`
