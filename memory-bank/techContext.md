# Tech Context

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Bundler** | Vite | ^5.2.11 |
| **Language** | TypeScript | ^5.4.5 |
| **Visual Novel / 2D FX** | Pixi.js | ^8.21.0 |
| **3D Strategy Map** | Three.js | ^0.186.0 |
| **Card Battle FX** | Phaser | ^4.2.1 |
| **Narrative Scripting** | Ink (inkjs) | bundled |
| **Audio** | Web Audio API | native browser |
| **Styling** | CSS Modules | vanilla |
| **Data validation** | Python 3.9+ | scripts/ |
| **Deployment** | Vercel | vercel.json |

## Dev Environment

```bash
# Requirements
Node.js >= 18
Python >= 3.9

# Install
npm install

# Dev server (HMR)
npm run dev
# → http://localhost:5173/

# Production build
npm run build
# = tsc && vite build && node scripts/sync-dist-assets.js

# Preview build
npm run preview

# Tests
npm run test:narrative          # Ink narrative pathfinding QA (Python)
python scripts/game_balance/validate_game_data.py
python scripts/game_balance/validate_canon_heroes.py
python scripts/bundle_game_data.py
```

## Build Output

```
dist/    # Production bundle
  ↑ synced by scripts/sync-dist-assets.js
```

## Key Config Files

- [`vite.config.ts`](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/vite.config.ts) — bundler config
- [`tsconfig.json`](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/tsconfig.json) — strict TS config
- [`vercel.json`](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/vercel.json) — deployment config

## Font System (4-Layer — Bất Khả Xâm Phạm)

```css
--font-title:  'Playfair Display', 'Cormorant Garamond', 'Lora', 'Noto Serif', serif;
--font-text:   'Be Vietnam Pro', 'Segoe UI', -apple-system, sans-serif;
--font-serif:  'Lora', 'Noto Serif', 'Palatino Linotype', serif;
--font-seal:   'ZCOOL XiaoWei', 'Noto Serif SC', 'Songti SC', serif;
```

**⚠️ BLACKLISTED**: `Cinzel`, `Trajan`, `Bebas Neue` — không hỗ trợ Vietnamese Unicode block

## Prototype (Legacy Reference)

`prototype/` chứa bản monolithic gốc:
- `app.js` (~163KB) — toàn bộ logic trong 1 file
- `index.html` (~69KB) — template đầy đủ với inline styles/scripts
- `styles.css` (~112KB) — CSS toàn bộ dự án
- `game_data.js` (~125KB) — data bundle offline

Prototype vẫn hoạt động standalone và là tài liệu tham chiếu thiết kế.

## Constraints

- Zero framework lock-in (no React/Vue/Svelte) — pure TypeScript + native APIs
- Offline-capable: game_data.js bundle đảm bảo playable không cần server
- Static deployment (Vercel Pages) — no backend required
- Vietnamese diacritic safety phải được kiểm tra trên mọi font change
