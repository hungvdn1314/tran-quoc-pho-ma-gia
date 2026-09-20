import argparse
import os

def mock_data():
    return {
        "heroes.json": ["zhao_yun", "dian_wei", "jia_xu"],
        "cards.json": [
            {"id": "card_01", "hero": "zhao_yun", "mana": 2, "damage": 120, "shield": 0, "utility": 10},
            {"id": "card_02", "hero": "dian_wei", "mana": 3, "damage": 0, "shield": 80, "utility": 20},
            {"id": "card_03", "hero": "unknown_hero", "mana": 2, "damage": 50, "shield": 50, "utility": 5} # Cố tình sai
        ],
        "battles.json": [
            {"id": "battle_1", "cards": ["card_01", "card_02"]},
            {"id": "battle_2", "cards": ["card_01", "card_99"]} # Cố tình sai
        ],
        "milestones.json": [
            {"chapter": 1, "unlocks": ["feature_gacha"]},
            {"chapter": 5, "unlocks": ["feature_alliance"], "requires": ["feature_gacha"]},
            {"chapter": 3, "unlocks": ["feature_invalid"], "requires": ["feature_alliance"]} # Cố tình sai thứ tự
        ]
    }

def validate_data():
    print("--- KIỂM TRA TOÀN VẸN DỮ LIỆU GAME (VALIDATION) ---")
    data = mock_data()
    errors = []
    
    # Check 1: Hero IDs in cards
    valid_heroes = set(data["heroes.json"])
    for card in data["cards.json"]:
        if card["hero"] not in valid_heroes:
            errors.append(f"LỖI: Thẻ '{card['id']}' tham chiếu đến tướng không tồn tại '{card['hero']}'")
            
    # Check 2: Card IDs in battles
    valid_cards = set(c["id"] for c in data["cards.json"])
    for battle in data["battles.json"]:
        for card_id in battle["cards"]:
            if card_id not in valid_cards:
                errors.append(f"LỖI: Trận đấu '{battle['id']}' dùng thẻ không tồn tại '{card_id}'")
                
    # Check 3: Milestone ordering & dependencies
    unlocked = set()
    for milestone in sorted(data["milestones.json"], key=lambda x: x["chapter"]):
        if "requires" in milestone:
            for req in milestone["requires"]:
                if req not in unlocked:
                    errors.append(f"LỖI: Milestone chương {milestone['chapter']} yêu cầu '{req}' chưa được mở khóa trước đó!")
        for feat in milestone["unlocks"]:
            unlocked.add(feat)
            
    # Check 4: Card Budgets
    for card in data["cards.json"]:
        budget = 0.5 * card['damage'] + 0.4 * card['shield'] + card['utility']
        limit = 50 * max(1, card['mana'])
        if budget > limit * 1.2:
            errors.append(f"CẢNH BÁO: Thẻ '{card['id']}' OVERTUNED (Ngân sách: {budget} > Giới hạn: {limit})")
            
    # Output Report
    if not errors:
        print("KẾT QUẢ: PASS (Tất cả dữ liệu hợp lệ)")
    else:
        print("KẾT QUẢ: FAIL (Phát hiện lỗi)")
        for err in errors:
            print(f"- {err}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Trình kiểm tra chéo dữ liệu (Game Data Validator)")
    args = parser.parse_args()
    validate_data()
