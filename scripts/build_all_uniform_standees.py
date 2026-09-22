import os
from PIL import Image, ImageFilter

TARGET_WIDTH = 848
TARGET_HEIGHT = 1264
TARGET_CHAR_HEIGHT = 1140

MAPPING = {
    'actor_vu_hoang.png': 'prototype/assets/images/candidates/TW3K_Liu_Hong.png',
    'actor_nam_ly_envoy.png': 'prototype/assets/images/candidates/TW3K_Li_Ru.png',
    'actor_servant.png': 'prototype/assets/images/candidates/TW3K_Lady_Mi-norm.png',
    'actor_ve_ti_vu.png': 'prototype/assets/images/candidates/TW3K_Yu_Jin.png',
    'actor_assassin.png': 'prototype/assets/images/candidates/zheng_jiang.png',
    'actor_trieu_van.png': 'prototype/assets/images/test_rembg_zhaoyun.png',
    'actor_cao_thuan.png': 'prototype/assets/images/candidates/TW3K_Gao_Shun.png',
    'actor_gia_hu.png': 'prototype/assets/images/candidates/TW3K_Jia_Xu.png',
    'actor_dien_vi.png': 'prototype/assets/images/test_rembg_dianwei.png',
}

def process_standee(source_path, target_path):
    print(f"Processing {source_path} -> {target_path}...")
    with Image.open(source_path).convert('RGBA') as img:
        bbox = img.getbbox()
        if not bbox:
            print(f"ERROR: Image {source_path} has no non-transparent pixels!")
            return
        
        cropped = img.crop(bbox)
        
        scale = TARGET_CHAR_HEIGHT / cropped.height
        new_w = int(cropped.width * scale)
        
        if new_w > (TARGET_WIDTH - 40):
            scale = (TARGET_WIDTH - 40) / cropped.width
            new_w = int(cropped.width * scale)
        new_h = int(cropped.height * scale)
        
        resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        canvas = Image.new('RGBA', (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))
        
        pos_x = (TARGET_WIDTH - new_w) // 2
        pos_y = TARGET_HEIGHT - new_h - 40
        if pos_y < 30:
            pos_y = 30
            
        alpha = resized.split()[3]
        shadow_mask = alpha.filter(ImageFilter.GaussianBlur(10))
        shadow = Image.new('RGBA', resized.size, (0, 0, 0, 90))
        shadow.putalpha(shadow_mask)
        
        canvas.paste(shadow, (pos_x + 3, pos_y + 8), shadow)
        canvas.paste(resized, (pos_x, pos_y), resized)
        
        canvas.save(target_path, format='PNG', optimize=True)
        print(f"Saved {target_path}")

for target_filename, source_rel_path in MAPPING.items():
    target_full_path = os.path.join('prototype/assets/images', target_filename)
    if os.path.exists(source_rel_path):
        process_standee(source_rel_path, target_full_path)
    else:
        print(f"WARNING: Source file {source_rel_path} not found!")

print("All standees updated to canonical 2D Concept Art standard.")
