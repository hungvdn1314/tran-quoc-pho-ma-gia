#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Trình đóng gói dữ liệu Game (Game Data Bundler for Web Client)
Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
Tổng hợp toàn bộ JSON và Ink script thành tệp JS tĩnh chạy 100% offline (file://)
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def bundle():
    print("--- ĐANG ĐÓNG GÓI DỮ LIỆU GAME CHO PROTOTYPE V3 ---")
    
    # 1. Read JSON configs
    config_dir = "data/game_config"
    scenes_dir = "data/scenes"

    with open(os.path.join(config_dir, "heroes.json"), "r", encoding="utf-8") as f:
        heroes = json.load(f)

    with open(os.path.join(config_dir, "cards.json"), "r", encoding="utf-8") as f:
        cards = json.load(f)

    with open(os.path.join(config_dir, "battles.json"), "r", encoding="utf-8") as f:
        battles = json.load(f)

    with open(os.path.join(config_dir, "milestones.json"), "r", encoding="utf-8") as f:
        milestones = json.load(f)

    with open(os.path.join(config_dir, "economy.json"), "r", encoding="utf-8") as f:
        economy = json.load(f)

    with open(os.path.join(config_dir, "gacha_banners.json"), "r", encoding="utf-8") as f:
        gacha_banners = json.load(f)

    with open(os.path.join(config_dir, "canon_system_heroes.json"), "r", encoding="utf-8") as f:
        canon_heroes = json.load(f)

    # 2. Read all Ink scenes dynamically
    ink_stories = {}
    for filename in sorted(os.listdir(scenes_dir)):
        if filename.endswith(".ink"):
            story_key = filename.replace(".ink", "")
            with open(os.path.join(scenes_dir, filename), "r", encoding="utf-8") as f:
                ink_stories[story_key] = f.read()

    # 3. Build JS content
    bundle_data = {
        "heroes": heroes,
        "canon_heroes": canon_heroes,
        "cards": cards,
        "battles": battles,
        "milestones": milestones,
        "economy": economy,
        "gacha_banners": gacha_banners,
        "ink_stories": ink_stories,
        "meta": {
            "version": "3.0.0",
            "hero_count": len(heroes),
            "card_count": len(cards),
            "battle_count": len(battles),
            "milestone_count": len(milestones),
            "generated_at": "2026-09-20"
        }
    }

    js_code = f"""/**
 * BUNDLE DỮ LIỆU GAME TRẤN QUỐC PHÒ MÃ GIA (PROTOTYPE V3)
 * Tự động tạo bởi scripts/bundle_game_data.py
 * Hỗ trợ thực thi 100% Offline qua giao thức file:/// không bị lỗi CORS.
 */
(function() {{
  window.GAME_DATA = {json.dumps(bundle_data, ensure_ascii=False, indent=2)};
  console.log("[ 天 ] [GAME_DATA] Đã nạp thành công:", window.GAME_DATA.meta);
}})();
"""

    output_path = "prototype/game_data.js"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_code)

    print(f"[THÀNH CÔNG] Đã xuất bundle tại: {output_path}")
    print(f"- Số lượng tướng: {len(heroes)}")
    print(f"- Số lượng thẻ bài: {len(cards)}")
    print(f"- Số lượng trận đánh: {len(battles)}")
    print(f"- Kịch bản Ink: Ch.1-15 & Ch.16-52")

if __name__ == "__main__":
    bundle()
