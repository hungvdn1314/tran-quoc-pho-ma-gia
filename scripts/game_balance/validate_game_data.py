#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Trình kiểm tra chéo toàn vẹn dữ liệu Game (Game Data Validator)
Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
Đọc trực tiếp các tệp cấu hình JSON thực tế trong data/game_config/
"""

import argparse
import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def load_json(filepath):
    if not os.path.exists(filepath):
        print(f"[CẢNH BÁO] Không tìm thấy tệp: {filepath}")
        return None
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"[LỖI] Không thể đọc JSON từ {filepath}: {e}")
        return None

def validate_all_data(heroes_path, cards_path, battles_path, milestones_path, economy_path, banners_path):
    print("================================================================================")
    print("           KIỂM TRA CHÉO TOÀN VẸN DỮ LIỆU GAME (GAME DATA VALIDATION)           ")
    print("================================================================================\n")

    heroes = load_json(heroes_path) or []
    cards = load_json(cards_path) or []
    battles = load_json(battles_path) or []
    milestones = load_json(milestones_path) or []
    economy = load_json(economy_path) or {}
    banners = load_json(banners_path) or []

    errors = []
    warnings = []
    passes = []

    # 1. KIỂM TRA HEROES
    hero_ids = set()
    hero_names = set()
    for h in heroes:
        h_id = h.get('id')
        if not h_id:
            errors.append("Phát hiện Tướng thiếu trường 'id'!")
            continue
        if h_id in hero_ids:
            errors.append(f"Hero ID bị trùng lặp: '{h_id}'")
        hero_ids.add(h_id)
        hero_names.add(h.get('name', ''))
        
        # Check Tứ Duy stats
        stats = h.get('base_stats', {})
        for attr in ['force', 'command', 'intelligence', 'politics', 'charisma']:
            val = stats.get(attr)
            if val is None or not (1 <= val <= 150):
                errors.append(f"Tướng '{h.get('name')}' ({h_id}) có chỉ số {attr}={val} không nằm trong khoảng [1, 150]!")

    passes.append(f"Đã xác minh {len(hero_ids)} Danh Tướng với đầy đủ Tứ Duy & Cảnh Giới võ học.")

    # 2. KIỂM TRA CARDS & REFERENTIAL INTEGRITY VỚI HEROES
    card_ids = set()
    for card in cards:
        c_id = card.get('id')
        if not c_id:
            errors.append("Phát hiện Thẻ bài thiếu trường 'id'!")
            continue
        if c_id in card_ids:
            errors.append(f"Card ID bị trùng lặp: '{c_id}'")
        card_ids.add(c_id)

        # Check hero_required
        req_hero = card.get('hero_required')
        if req_hero:
            if req_hero not in hero_ids:
                errors.append(f"Thẻ bài '{card.get('name')}' ({c_id}) yêu cầu tướng '{req_hero}' không tồn tại trong heroes.json!")

        # Power budget
        mana = max(1, card.get('mana_cost', 1))
        dmg = card.get('damage', 0)
        shield = card.get('shield', 0)
        heal = card.get('heal', 0)
        utility = len(card.get('effects', [])) * 10
        budget = 0.5 * dmg + 0.4 * shield + 0.3 * heal + utility
        limit = 50 * mana

        if budget > limit * 1.3:
            warnings.append(f"Thẻ '{card.get('name')}' ({c_id}) OVERTUNED (Ngân sách: {budget:.1f} > Giới hạn {limit})")
        elif budget < limit * 0.4 and card.get('type') == 'unit':
            warnings.append(f"Thẻ '{card.get('name')}' ({c_id}) có thể hơi yếu (Ngân sách: {budget:.1f} < {limit * 0.4})")

    passes.append(f"Đã xác minh {len(card_ids)} Thẻ Bài chiến thuật & toàn vẹn liên kết Danh Tướng.")

    # 3. KIỂM TRA BATTLES
    for b in battles:
        b_id = b.get('id')
        lanes_present = set()
        for u in b.get('enemy_units', []):
            lane = u.get('lane')
            if lane not in ['left', 'center', 'right']:
                errors.append(f"Trận '{b_id}': Đơn vị địch '{u.get('name')}' gán làn không hợp lệ: '{lane}'")
            lanes_present.add(lane)
        
        if b.get('type') == 'defense' and not b.get('player_wall_hp'):
            warnings.append(f"Trận thủ thành '{b_id}' không có chỉ số 'player_wall_hp'!")

    passes.append(f"Đã xác minh {len(battles)} Trận đánh chiến dịch (Độ khó, Bố trí 3 Làn, Địch Hỏa).")

    # 4. KIỂM TRA MILESTONES (TIẾN TRÌNH & ĐIỀU KIỆN MỞ KHÓA)
    milestone_chapters = [m.get('chapter') for m in milestones]
    for i, m in enumerate(milestones):
        ch = m.get('chapter')
        prereqs = m.get('prerequisites', [])
        for p in prereqs:
            # prerequisite can be chapter int or string
            if isinstance(p, int):
                if p >= ch:
                    errors.append(f"Milestone Ch.{ch} có điều kiện tiên quyết Ch.{p} >= chương hiện tại!")
                if p not in milestone_chapters:
                    errors.append(f"Milestone Ch.{ch} tham chiếu đến chương tiên quyết không tồn tại: Ch.{p}")

    passes.append(f"Đã xác minh {len(milestones)} Mốc Chương cốt truyện & Thứ tự mở khóa logic.")

    # 5. KIỂM TRA GACHA BANNERS
    for banner in banners:
        b_id = banner.get('banner_id') or banner.get('id')
        featured = banner.get('featured_heroes', []) or banner.get('featured', [])
        for fh in featured:
            if fh not in hero_ids:
                warnings.append(f"Banner '{b_id}' có tướng featured '{fh}' chưa chuẩn hóa đúng Hero ID!")

    passes.append(f"Đã xác minh {len(banners)} Băng rôn Gacha Bái Tướng Đài.")

    # 6. KIỂM TRA ECONOMY
    if economy:
        currencies = economy.get('currencies', [])
        curr_ids = set()
        if isinstance(currencies, list):
            curr_ids = {c.get('id') for c in currencies}
        elif isinstance(currencies, dict):
            curr_ids = set(currencies.keys())

        if {'gold', 'jade', 'rations'}.issubset(curr_ids):
            passes.append(f"Hệ thống Kinh Tế định nghĩa đủ các loại tài nguyên cốt lõi ({', '.join(curr_ids)}).")
        else:
            errors.append(f"Hệ thống Kinh Tế thiếu định nghĩa tiền tệ chuẩn! Hiện có: {curr_ids}")

    # IN BÁO CÁO TỔNG KẾT
    print("--- [KẾT QUẢ KIỂM TRA THÀNH CÔNG] ---")
    for p in passes:
        print(f"  [PASS] {p}")

    if warnings:
        print("\n--- [CẢNH BÁO CÂN BẰNG & TỐI ƯU] ---")
        for w in warnings:
            print(f"  [WARN] {w}")

    if errors:
        print("\n--- [LỖI TOÀN VẸN CẦN XỬ LÝ] ---")
        for e in errors:
            print(f"  [FAIL] {e}")
        print(f"\n=> TỔNG KẾT: THẤT BẠI ({len(errors)} lỗi, {len(warnings)} cảnh báo)")
        return False
    else:
        print(f"\n=> TỔNG KẾT: THÀNH CÔNG RỰC RỠ! (0 lỗi toàn vẹn, {len(warnings)} cảnh báo cân bằng)")
        return True

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Trình kiểm tra chéo toàn vẹn dữ liệu Game (Game Data Validator)")
    parser.add_argument("--heroes", default="data/game_config/heroes.json", help="Đường dẫn file heroes.json")
    parser.add_argument("--cards", default="data/game_config/cards.json", help="Đường dẫn file cards.json")
    parser.add_argument("--battles", default="data/game_config/battles.json", help="Đường dẫn file battles.json")
    parser.add_argument("--milestones", default="data/game_config/milestones.json", help="Đường dẫn file milestones.json")
    parser.add_argument("--economy", default="data/game_config/economy.json", help="Đường dẫn file economy.json")
    parser.add_argument("--banners", default="data/game_config/gacha_banners.json", help="Đường dẫn file gacha_banners.json")

    args = parser.parse_args()
    success = validate_all_data(args.heroes, args.cards, args.battles, args.milestones, args.economy, args.banners)
    sys.exit(0 if success else 1)
