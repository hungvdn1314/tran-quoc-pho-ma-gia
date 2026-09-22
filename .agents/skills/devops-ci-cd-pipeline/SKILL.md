---
name: devops-ci-cd-pipeline
description: >-
  Skill tự động hóa quy trình tích hợp và phát hành liên tục (DevOps, CI/CD & Cloud Infrastructure).
  Sử dụng khi cần thiết lập GitHub Actions workflows, tự động validate dữ liệu và chạy tests khi commit,
  đóng gói Docker container, tối ưu hóa mạng phân phối CDN (Cloudflare Pages/AWS/Vercel) cho Web game,
  quản lý môi trường (Development/Staging/Production), và thiết lập Pre-commit hooks (Husky/Lint-staged).
---

# DevOps & CI/CD Pipeline Skill
*Khung tự động hóa phát hành và hạ tầng triển khai cho Trấn Quốc Phò Mã Gia*

---

## 1. TỔNG QUAN HẠ TẦNG TỰ ĐỘNG HÓA

Một dự án game hybrid kết hợp khối lượng tài nguyên lớn (ảnh đồ họa 5 lớp, kịch bản Ink hàng trăm nghìn dòng, dữ liệu cấu hình Pydantic) bắt buộc phải có quy trình tích hợp liên tục (Continuous Integration) và phát hành liên tục (Continuous Deployment) khép kín nhằm:
1. **Ngăn chặn lỗi trước khi vào nhánh chính**: Mọi commit phải tự động chạy kiểm tra toàn vẹn dữ liệu và kịch bản.
2. **Loại bỏ thao tác thủ công khi triển khai**: Khi tag phiên bản mới (ví dụ `v1.2.0`), hệ thống tự động build bundle và đẩy lên CDN trong vòng 2 phút.
3. **Phân phối nhanh chóng trên toàn cầu**: Lưu cache tài nguyên nặng (Standees, background WebP, audio) trên Cloudflare CDN edge nodes.

```
[Developer Git Push]
         │
         ▼
[GitHub Actions CI Runner]
  ├── 1. Linter & Static Analysis (TypeScript typecheck, ESLint)
  ├── 2. Data Validation (validate_game_data.py)
  ├── 3. Narrative Validation (narrative_validator.py)
  ├── 4. Headless Combat Simulation (combat_headless_sim.py)
  └── 5. Unit Tests Execution (Vitest + Pytest)
         │ (Tất cả đạt chuẩn)
         ▼
[Automated Build & Bundling]
  ├── Vite Production Build (dist/ bundle)
  └── Asset Optimization & Hash Fingerprinting
         │
         ▼
[Deployment Target]
  ├── Nhánh `staging` ──→ Cloudflare Pages Preview / Vercel Preview
  └── Nhánh `main` (Tags) ──→ Production CDN + GitHub Releases (.zip)
```

---

## 2. NĂM CÔNG ĐOẠN CI/CD BẮT BUỘC (PIPELINE STAGES)

### Công Đoạn 1: Code & Data Quality Gate (Kiểm Tra Trước Khi Hợp Nhất)
* **TypeScript Check**: `tsc --noEmit` xác nhận không có lỗi kiểu dữ liệu.
* **Game Data Integrity**: `python scripts/game_balance/validate_game_data.py` kiểm tra chéo 28 danh tướng, 15 thẻ bài, và ma trận mở khóa.
* **Narrative Path QA**: `python scripts/narrative_validator.py` bảo đảm zero unresolved diverts.

### Công Đoạn 2: Test Automation Gate (Kiểm Thử Tự Động)
* Chạy toàn bộ Vitest unit test suites.
* Chạy mô phỏng chiến đấu 2.000 trận đo tỷ lệ thắng.

### Công Đoạn 3: Production Build & Asset Fingerprinting
* Chạy lệnh build Vite (`npm run build`) tạo thư mục `dist/`.
* Mọi file asset đều có mã băm (content hash, ví dụ: `app.9a3f2b.js`) để hỗ trợ Cache-Busting triệt để trên CDN.

### Công Đoạn 4: Multi-Environment Deployment
* **Môi trường Staging (Thử nghiệm)**: Mỗi Pull Request sẽ tự động sinh một URL xem trước (Preview Deployment) để nhóm Designer và Writer kiểm tra trực quan.
* **Môi trường Production (Chính thức)**: Khi hợp nhất vào nhánh `main` và có gắn thẻ Tag `v*.*.*`, hệ thống triển khai vào domain chính thức.

### Công Đoạn 5: Artifact Archiving & Release Packages
* Tự động nén toàn bộ thư mục `dist/` thành file zip `tran-quoc-pho-ma-gia-vX.Y.Z.zip` và đính kèm vào GitHub Release phục vụ người chơi tải về chơi offline trực tiếp qua `index.html`.

---

## 3. TÀI LIỆU & FILE MẪU KÈM THEO
- Mẫu Workflow GitHub Actions: [github_actions_templates.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/devops-ci-cd-pipeline/references/github_actions_templates.md)
- Chiến lược triển khai CDN: [deployment_strategies.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/devops-ci-cd-pipeline/references/deployment_strategies.md)
- Hướng dẫn Docker môi trường: [docker_setup.md](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/devops-ci-cd-pipeline/references/docker_setup.md)
- Workflow mẫu có thể dùng ngay: [ci_workflow.yml](file:///c:/Users/Admin/Documents/antigravity/tran-quoc-pho-ma-gia/.agents/skills/devops-ci-cd-pipeline/examples/ci_workflow.yml)
