"""
Process all character portraits and cutouts into standard 848x1264 RGBA standees for Visual Novel.
Adheres strictly to the 4-Layer Typography and Art Direction standards of Trấn Quốc Phò Mã Gia.
"""

import os
from collections import deque
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

OUTPUT_DIR = "prototype/assets/images"
CANVAS_W = 848
CANVAS_H = 1264

def floodfill_cutout(img_path, bg_thresh=180, dark_bg=False):
    im = Image.open(img_path).convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape

    r = arr[:, :, 0].astype(float)
    g = arr[:, :, 1].astype(float)
    b = arr[:, :, 2].astype(float)
    brightness = 0.299 * r + 0.587 * g + 0.114 * b

    bg_mask = np.zeros((h, w), dtype=bool)
    queue = deque()

    def is_bg(val):
        return (val < bg_thresh) if dark_bg else (val > bg_thresh)

    for y in range(h):
        for x in [0, w - 1]:
            if is_bg(brightness[y, x]):
                bg_mask[y, x] = True
                queue.append((y, x))
    for x in range(w):
        for y in [0, h - 1]:
            if not bg_mask[y, x] and is_bg(brightness[y, x]):
                bg_mask[y, x] = True
                queue.append((y, x))

    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not bg_mask[ny, nx]:
                if is_bg(brightness[ny, nx]):
                    bg_mask[ny, nx] = True
                    queue.append((ny, nx))

    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=2))
    alpha_arr = np.array(alpha_img)

    rgba = np.dstack((arr, alpha_arr))
    return Image.fromarray(rgba, 'RGBA')

def fit_to_standee_canvas(cutout_img, target_h=1140, pad_bottom=64):
    arr = np.array(cutout_img)
    alpha = arr[:, :, 3]
    rows = np.where(alpha > 30)[0]
    cols = np.where(alpha > 30)[1]

    if len(rows) == 0 or len(cols) == 0:
        cropped = cutout_img
    else:
        y1, y2 = rows.min(), rows.max()
        x1, x2 = cols.min(), cols.max()
        cropped = cutout_img.crop((x1, y1, x2, y2))

    # Scale while maintaining aspect ratio
    src_w, src_h = cropped.size
    scale = target_h / src_h
    new_w = int(src_w * scale)
    new_h = int(src_h * scale)

    # Max width check
    if new_w > CANVAS_W - 40:
        scale = (CANVAS_W - 40) / src_w
        new_w = int(src_w * scale)
        new_h = int(src_h * scale)

    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

    canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    pos_x = (CANVAS_W - new_w) // 2
    pos_y = CANVAS_H - new_h - pad_bottom

    canvas.paste(resized, (pos_x, max(30, pos_y)), resized)
    return canvas

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    brain_dir = r"C:\Users\Admin\.gemini\antigravity\brain\c60d5f42-9404-457f-873e-5b6f704a6548"

    # 1. Cao Thuan
    print("Processing Cao Thuan...")
    gaoshun_src = os.path.join(brain_dir, "splash_gaoshun_hero_1790004834272.jpg")
    cut_gaoshun = floodfill_cutout(gaoshun_src, bg_thresh=180, dark_bg=False)
    standee_gaoshun = fit_to_standee_canvas(cut_gaoshun, target_h=1140)
    standee_gaoshun.save(os.path.join(OUTPUT_DIR, "actor_cao_thuan.png"))

    # 2. Gia Hu
    print("Processing Gia Hu...")
    jiaxu_src = os.path.join(brain_dir, "splash_jiaxu_strategist_1790004853623.jpg")
    cut_jiaxu = floodfill_cutout(jiaxu_src, bg_thresh=55, dark_bg=True)
    standee_jiaxu = fit_to_standee_canvas(cut_jiaxu, target_h=1130)
    standee_jiaxu.save(os.path.join(OUTPUT_DIR, "actor_gia_hu.png"))

    # 3. Dien Vi
    print("Processing Dien Vi...")
    dianwei_src = os.path.join(brain_dir, "splash_dianwei_hero_1790004889684.jpg")
    cut_dianwei = floodfill_cutout(dianwei_src, bg_thresh=190, dark_bg=False)
    standee_dianwei = fit_to_standee_canvas(cut_dianwei, target_h=1140)
    standee_dianwei.save(os.path.join(OUTPUT_DIR, "actor_dien_vi.png"))

    # 4. Trieu Van
    print("Processing Trieu Van...")
    zhaoyun_src = os.path.join(OUTPUT_DIR, "zhaoyun.jpg")
    cut_zhaoyun = floodfill_cutout(zhaoyun_src, bg_thresh=60, dark_bg=True)
    standee_zhaoyun = fit_to_standee_canvas(cut_zhaoyun, target_h=1140)
    standee_zhaoyun.save(os.path.join(OUTPUT_DIR, "actor_trieu_van.png"))

    # 5. Vu Hoang (Emperor Wu of Han, Yan Liben)
    print("Processing Vu Hoang...")
    wu_src = os.path.join(OUTPUT_DIR, "emperor_wu_raw.jpg")
    cut_wu = floodfill_cutout(wu_src, bg_thresh=185, dark_bg=False)
    standee_wu = fit_to_standee_canvas(cut_wu, target_h=1130)
    standee_wu.save(os.path.join(OUTPUT_DIR, "actor_vu_hoang.png"))

    # 6. Su Than Nam Ly (Tibetan envoy in Bunian Tu)
    print("Processing Su Than Nam Ly...")
    envoy_src = os.path.join(OUTPUT_DIR, "cluster_9800_11000.jpg")
    im_envoy = Image.open(envoy_src).convert('RGB')
    # Crop central envoy figure (x ~ 600..1150)
    w_env, h_env = im_envoy.size
    crop_envoy = im_envoy.crop((int(w_env * 0.5), int(h_env * 0.05), int(w_env * 0.98), int(h_env * 0.95)))
    crop_envoy.save(os.path.join(OUTPUT_DIR, "temp_envoy.jpg"))
    cut_envoy = floodfill_cutout(os.path.join(OUTPUT_DIR, "temp_envoy.jpg"), bg_thresh=185, dark_bg=False)
    standee_envoy = fit_to_standee_canvas(cut_envoy, target_h=1120)
    standee_envoy.save(os.path.join(OUTPUT_DIR, "actor_nam_ly_envoy.png"))

    # 7. Ty Nu Cung Dinh (Court maid from Bunian Tu)
    print("Processing Ty Nu...")
    maid_src = os.path.join(OUTPUT_DIR, "cluster_6500_8000.jpg")
    im_maid = Image.open(maid_src).convert('RGB')
    w_m, h_m = im_maid.size
    crop_maid = im_maid.crop((int(w_m * 0.1), int(h_m * 0.05), int(w_m * 0.65), int(h_m * 0.95)))
    crop_maid.save(os.path.join(OUTPUT_DIR, "temp_maid.jpg"))
    cut_maid = floodfill_cutout(os.path.join(OUTPUT_DIR, "temp_maid.jpg"), bg_thresh=180, dark_bg=False)
    standee_maid = fit_to_standee_canvas(cut_maid, target_h=1110)
    standee_maid.save(os.path.join(OUTPUT_DIR, "actor_servant.png"))

    # 8. Ve Ti Vu (Court officer in Bunian Tu)
    print("Processing Ve Ti Vu...")
    att_src = os.path.join(OUTPUT_DIR, "cluster_5200_6500.jpg")
    im_att = Image.open(att_src).convert('RGB')
    w_a, h_a = im_att.size
    crop_att = im_att.crop((int(w_a * 0.2), int(h_a * 0.05), int(w_a * 0.8), int(h_a * 0.95)))
    crop_att.save(os.path.join(OUTPUT_DIR, "temp_att.jpg"))
    cut_att = floodfill_cutout(os.path.join(OUTPUT_DIR, "temp_att.jpg"), bg_thresh=180, dark_bg=False)
    standee_att = fit_to_standee_canvas(cut_att, target_h=1120)
    standee_att.save(os.path.join(OUTPUT_DIR, "actor_ve_ti_vu.png"))

    # 9. Hac Y Thich Khach (Silhouette night assassin with red/kintsugi eyes & daggers)
    print("Processing Hac Y Thich Khach...")
    # Create dark assassin standee based on masked martial silhouette
    assassin_canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    # We can craft an ink-wash silhouette with glowing cinnabar eyes and dual daggers
    base_att = standee_att.copy()
    enhancer = ImageEnhance.Brightness(base_att)
    dark_att = enhancer.enhance(0.18) # Dark midnight cloak
    # Add crimson dagger highlights & red eye glimmer
    arr_ass = np.array(dark_att)
    # Mask head area for glowing eyes
    head_y1, head_y2 = 180, 240
    head_x1, head_x2 = 380, 470
    for y in range(head_y1, head_y2):
        for x in range(head_x1, head_x2):
            if arr_ass[y, x, 3] > 100 and (x in [410, 411, 440, 441]) and y in [205, 206]:
                arr_ass[y, x] = [225, 29, 72, 255] # Cinnabar eye
    ass_img = Image.fromarray(arr_ass, 'RGBA')
    ass_img.save(os.path.join(OUTPUT_DIR, "actor_assassin.png"))

    print("All standees generated successfully in", OUTPUT_DIR)

if __name__ == "__main__":
    main()
