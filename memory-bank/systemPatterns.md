# System Patterns & Architecture

## Kiến Trúc Tổng Thể

**Paradigm**: ES6 Modules + TypeScript — đã hiện đại hóa hoàn toàn từ prototype nguyên khối (`prototype/app.js` ~163KB).

```
src/
├── main.ts                    # Entry point — khởi tạo GameCoordinator
├── bridge.ts                  # Cầu nối prototype cũ ↔ module mới
├── core/                      # State & Logic Layer
│   ├── GameStateStore.ts      # Reactive centralized state store
│   ├── EventBus.ts            # Pub/sub decoupled bus
│   ├── GameCoordinator.ts     # Điều phối 3 tầng gameplay
│   ├── ProgressionEngine.ts   # 5 tầng thế lực + feature unlock
│   ├── DataLoader.ts          # JSON config + Ink script loader
│   ├── canonHeroesData.ts     # 29 danh tướng database
│   └── types.ts               # TypeScript type definitions
├── engines/
│   ├── narrative/             # TẦNG 1: Visual Novel
│   │   ├── InkEngine.ts       # Ink script interpreter (inkjs)
│   │   ├── VisualNovelEngine.ts
│   │   └── PixiMistAtmosphere.ts  # Pixi.js sương mù thủy mặc
│   ├── strategy/              # TẦNG 2: Sa Bàn 3D
│   │   └── ThreeWarTable.ts   # Three.js 3D terrain
│   ├── combat/                # TẦNG 3: Card Battle
│   │   ├── TacticalBattleEngine.ts
│   │   └── PhaserCombatFx.ts  # Phaser 4 effects
│   └── gacha/                 # Summoning Ritual
│       ├── GachaEngine.ts     # Kintsugi ritual + splash art
│       └── PityCalculator.ts  # Pity & probability
├── ui/
│   ├── ViewportScaler.ts      # 16:9 responsive scaler
│   ├── hud/DiegeticHud.ts     # Diegetic resource display
│   └── modals/
│       ├── ModalsManager.ts
│       ├── BambooSlips.ts     # Thẻ tre duyệt tướng
│       └── HeroInspectorScroll.ts  # Thư trục + Ngũ Trọng Trận Đồ
├── audio/
│   ├── AudioSynthesizer.ts    # Procedural SFX (Web Audio API)
│   └── ProceduralAmbientBgm.ts  # Adaptive ambient music
└── styles/                    # CSS Modules cổ phong
    ├── base.css, hud.css, modals.css, diegetic-modals.css
```

## Dữ Liệu & Content

```
data/
├── game_config/
│   ├── heroes.json            # 29 danh tướng (66KB)
│   ├── canon_system_heroes.json  # Canon data (45KB)
│   ├── cards.json             # 17 thẻ bài
│   ├── battles.json           # 3 chiến dịch
│   ├── milestones.json        # 18 mốc niên biểu
│   ├── economy.json           # Hệ thống kinh tế
│   └── gacha_banners.json
├── scenes/
│   ├── chapter_01_to_15.ink   # Kịch bản Ch.1-15 (23KB)
│   └── chapter_16_to_52.ink   # Kịch bản Ch.16-52 (20KB)
├── game_bible_v2/             # Master lore database
├── character_graph_v2/        # PyVis network graph 120 nhân vật
└── chapters_raw.jsonl         # Raw crawl 1.509 chương (15MB)
```

## Key Design Patterns

### 1. Tam Đại Tầng Gameplay (3-Tier Architecture)
- VN Theater (Pixi.js) ↔ Sa Bàn (Three.js) ↔ Card Battle (Phaser 4)
- Transition qua `GameCoordinator` + `EventBus`
- Mỗi tầng isolate state, không leak vào nhau

### 2. Diegetic UI Mandate (Bất Khả Xâm Phạm)
- KHÔNG card KPI hình chữ nhật
- KHÔNG giỏ hàng Shopify `.upgrade-tray`
- KHÔNG thanh cuộn native gray
- ✅ Thư Trục Xuyến Chỉ (silk parchment scroll)
- ✅ Thẻ Tre/Ngọc Bài (bamboo slips navigation)
- ✅ Ngũ Trọng Trận Đồ Khắc Minh (upgrade system)
- ✅ Ấn Triện Chu Sa (resource display)

### 3. Asset Isolation Rule (Bất Khả Xâm Phạm)
- Mỗi nhân vật có Standee PNG/WebP độc bản RGBA riêng
- KHÔNG reuse ảnh nhân vật này cho nhân vật khác
- Assets trong `prototype/assets/images/`

### 4. Summoning Ritual (Grand Reveal — Bất Khả Xâm Phạm)
- Kintsugi crack animation → Bát Quái phá ấn → Sấm chớp → Splash Art toàn màn hình
- Bảng chỉ số Tứ Duy + Danh xưng + Câu tuyên thệ
- KHÔNG thay thế bằng vài dòng text thông thường

### 5. Pointer-Events Hierarchy
- Inactive views: `visibility: hidden !important; pointer-events: none !important;`
- `.stage-view:not(.active) * { pointer-events: none !important; }`

## Architecture Decision Records (ADR)

| # | Quyết Định | Lý Do |
|---|------------|-------|
| 001 | Vite + TypeScript thay vì raw HTML/JS | HMR, type safety, tree shaking |
| 002 | Pixi.js cho VN, Three.js cho Sa Bàn, Phaser 4 cho Combat | Best-in-class cho từng render type |
| 003 | Ink scripting language cho narrative | Branching phức tạp, có validator |
| 004 | CSS Modules thay CSS-in-JS | No runtime overhead, simpler caching |
| 005 | EventBus pattern | Decoupling 3 engines khác nhau |
