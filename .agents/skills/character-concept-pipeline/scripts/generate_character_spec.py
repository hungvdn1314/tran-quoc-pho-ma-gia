#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Trình tạo hồ sơ thiết kế nhân vật tự động (Character Visual Spec Generator)
Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
Đọc heroes.json và sinh ra các file đặc tả tạo hình (Character Spec Sheets) đồng nhất.
"""

import json
import os
import sys

def generate_specs():
    print("=== ĐANG KHỞI TẠO CHARACTER VISUAL SPECS DỰA TRÊN DATA HEROES ===")
    
    heroes_path = "data/game_config/heroes.json"
    prompt_engine_path = ".agents/skills/character-concept-pipeline/resources/ai_prompt_engine.json"
    output_dir = "data/art_specs/character_specs"
    
    os.makedirs(output_dir, exist_ok=True)
    
    if not os.path.exists(heroes_path):
        print(f"Lỗi: Không tìm thấy {heroes_path}")
        return
        
    with open(heroes_path, "r", encoding="utf-8") as f:
        heroes = json.load(f)
        
    prompt_anchors = {}
    master_prefix = ""
    master_neg = ""
    if os.path.exists(prompt_engine_path):
        with open(prompt_engine_path, "r", encoding="utf-8") as f:
            pe_data = json.load(f)
            prompt_anchors = pe_data.get("hero_identity_anchors", {})
            master_prefix = pe_data.get("master_style_prefix", "")
            master_neg = pe_data.get("master_negative_prompt", "")
            
    generated_count = 0
    for h in heroes:
        hid = h.get("id")
        name = h.get("name")
        rarity = h.get("rarity", "SR")
        troop = h.get("troop_type", "Bộ Binh")
        realm = h.get("realm", "Hoàng Cảnh Sơ Kỳ")
        aliases = ", ".join(h.get("aliases", []))
        stats = h.get("base_stats", {})
        skills = h.get("skills", [])
        
        anchor = prompt_anchors.get(hid, {})
        identity_kw = anchor.get("identity_keywords", f"Chinese historical warrior general, {name}, {troop} commander, armored in Han Dynasty style")
        seed = anchor.get("suggested_seed", 8888000 + generated_count * 123)
        colors = ", ".join(anchor.get("color_tokens", ["dark steel", "crimson", "antique gold"]))
        
        spec_content = f"""# HỒ SƠ TẠO HÌNH: {name.upper()}
- **Mã Định Danh (ID)**: `{hid}`
- **Danh Xưng / Tự**: {aliases}
- **Phẩm Chất (Rarity)**: [{rarity}]
- **Binh Chủng**: {troop}
- **Cảnh Giới Võ Học**: {realm}
- **Chỉ Số Tứ Duy**: Võ {stats.get('force', 80)} · Thống {stats.get('command', 80)} · Trí {stats.get('intelligence', 80)} · Chính {stats.get('politics', 80)}

---

## 1. Dáng Vóc & Tỷ Lệ Cơ Thể (Silhouette & Proportions)
- **Tỷ lệ đầu**: {"8.0 đầu (Võ tướng dũng mãnh)" if stats.get('force', 0) >= 90 else "7.5 đầu (Mưu thần / Quân vương nho nhã)"}
- **Dáng đứng đặc trưng**: Tư thế chiến đấu uy nghi, trọng tâm vững chắc, tay cầm vũ khí toát lên khí chất bậc danh tướng.
- **Silhouette Marker**: Mũi vũ khí vút cao hoặc vạt áo choàng tung bay tạo bóng đen nhận diện độc nhất.

---

## 2. Bảng Phối Màu Trang Phục (60 - 30 - 10 Rule)
- **60% Nền Tảng Giáp Thân**: Giáp sắt tôi lạnh hoặc hắc bào sơn mài.
- **30% Bản Sắc Binh Chủng**: {colors}.
- **10% Điểm Nhấn Kintsugi**: Viền chỉ vàng nóng chảy và hộ tâm phiến hoàng kim.

---

## 3. Khí Giới & Tuyệt Kỹ
"""
        for sk in skills:
            spec_content += f"- **{sk.get('name')}** ({'Tuyệt Kỹ Chủ Động' if sk.get('type') == 'active' else 'Kỹ Năng Bị Động'}): {sk.get('description')}\n"

        spec_content += f"""
---

## 4. Danh Mục Xuất Asset Đa Tầng (5-Layer Export Manifest)
- [x] Layer 1: Splash Art Full-body (2048 × 2732 px, 3:4) — Bái Tướng Đài Reveal & Inspector
- [x] Layer 2: Half-body VN Cut-in (1024 × 1536 px, 2:3) — Visual Novel Dialogue (4 biểu cảm)
- [x] Layer 3: Tactical Battle Card Art (512 × 768 px, 2:3) — Sa Trường 3 Làn
- [x] Layer 4: Circular Avatar (256 × 256 px, 1:1) — Top HUD & Turn Order
- [x] Layer 5: Grand Strategy Map Token (128 × 128 px, 1:1) — Sa Bàn Điều Binh

---

## 5. Bộ Prompt AI Master (Chuẩn Đồng Nhất Phong Cách)
- **Positive Prompt**:
  `{master_prefix}, {identity_kw}, epic heroic composition`
- **Identity Seed**: `{seed}`
- **Negative Prompt**:
  `{master_neg}`
"""
        spec_file = os.path.join(output_dir, f"{hid}.md")
        with open(spec_file, "w", encoding="utf-8") as out_f:
            out_f.write(spec_content)
        generated_count += 1
        
    print(f"[THÀNH CÔNG] Đã sinh thành công {generated_count} hồ sơ tạo hình nhân vật tại: {output_dir}")

if __name__ == "__main__":
    generate_specs()
