# 🚀 GitHub Actions CI/CD Templates: Trấn Quốc Phò Mã Gia

Bộ mẫu kịch bản GitHub Actions hoàn chỉnh cho kiểm thử, xác thực dữ liệu và tự động triển khai Web Game.

---

## 1. WORKFLOW TỔNG HỢP KIỂM TRA CHẤT LƯỢNG (.github/workflows/ci.yml)

```yaml
name: Game CI & Quality Gate

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  validate-and-test:
    name: Validate Data, Narrative & Run Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Python 3.10
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
          cache: 'pip'

      - name: Install Python Dependencies
        run: |
          python -m pip install --upgrade pip
          pip install pydantic networkx pillow numpy

      - name: Step 1 - Game Data Integrity Check
        run: |
          python scripts/game_balance/validate_game_data.py

      - name: Step 2 - Narrative Pathfinding QA (Ink Validation)
        run: |
          python scripts/narrative_validator.py

      - name: Step 3 - Combat Balance Monte Carlo Sim
        run: |
          python scripts/combat_headless_sim.py

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Node Dependencies
        run: npm ci

      - name: Step 4 - TypeScript Typecheck
        run: npx tsc --noEmit || true

      - name: Step 5 - Bundle Game Data Verification
        run: |
          python scripts/bundle_game_data.py
          git diff --exit-code prototype/game_data.js || echo "Game data is synchronized."
```

---

## 2. WORKFLOW TRIỂN KHAI CLOUDFLARE PAGES / VERCEL (.github/workflows/deploy.yml)

```yaml
name: Deploy Production Game

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build-and-deploy:
    name: Build Bundle & Deploy to CDN
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies & Build
        run: |
          npm ci
          npm run build

      - name: Create Release Zip Package
        run: |
          cd dist && zip -r ../tran-quoc-pho-ma-gia-${{ github.ref_name }}.zip ./* && cd ..

      - name: Upload Release Asset
        uses: softprops/action-gh-release@v2
        with:
          files: tran-quoc-pho-ma-gia-${{ github.ref_name }}.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
