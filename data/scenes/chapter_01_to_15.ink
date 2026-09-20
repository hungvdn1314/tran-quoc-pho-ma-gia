// ============================================================
// Trấn Quốc Phò Mã Gia — Ink Scene Script
// Chương 1: Xuyên Không & Đối Thơ Đại Điện
// ============================================================
// Biên soạn theo chuẩn Ink scripting (inkjs runtime)
// Tham chiếu: narrative-scene-scripting skill
// ============================================================

// === GLOBAL VARIABLES ===
VAR gold = 0
VAR jade = 0
VAR suspicion = 0
VAR has_anh_hon_lenh = false
VAR system_awakened = false
VAR poetry_duel_won = false
VAR imperial_prestige = 0
VAR chapter = 1

// Feature unlock flags
VAR unlocked_gacha = false
VAR unlocked_soap = false
VAR unlocked_map = false
VAR unlocked_flood = false
VAR unlocked_granary = false
VAR unlocked_battle = false

// Affinity scores
VAR affinity_trieu_van = 0
VAR affinity_gia_hu = 0
VAR affinity_dieu_thuyen = 0

// NPC relationship flags
VAR met_vu_hoang = false
VAR met_to_kien_phong = false
VAR met_ve_ti_vu = false

// ============================================================
// CHƯƠNG 1: XUYÊN KHÔNG & ĐỐI THƠ ĐẠI ĐIỆN
// ============================================================

=== chapter_1_start ===
# BACKGROUND: bg_darkness
# MUSIC: bgm_ethereal_void
# CHAPTER_TITLE: Hồi 1 · Chương 1: Phò Mã Hàn Vi Nơm Nớp Lo Sợ

Hắn mở mắt.

Không phải trần nhà quen thuộc của căn hộ tầng 23 ở thành phố Hồ Chí Minh. Mà là một tấm màn lụa thêu rồng phượng, bụi thời gian phủ đầy nếp gấp.

Đầu đau như búa bổ. Ký ức lạ lùng ồ ạt tràn vào — tên hắn là Quý Bình An, con trai thứ ba của Quý gia, một phò mã nổi tiếng bất tài bất đức của Đại Vũ Hoàng Triều.

# BACKGROUND: bg_pho_ma_phu_bedroom
# ACTORS: qui_binh_an|right|worried

Hắn... đã xuyên không.

* [Ngồi dậy, quan sát xung quanh]
  Quý Bình An — hay nói đúng hơn, linh hồn hiện đại trong thân xác phò mã — chậm rãi ngồi dậy. Căn phòng rộng nhưng đồ đạc thưa thớt. Một bức tranh thủy mặc treo trên tường, vài cuốn sách cổ bám bụi trên giá.
  
  "Phò mã hàn vi" — danh xưng này không phải lời khen.
  
  -> arrival_of_servant

=== arrival_of_servant ===
# ACTORS: qui_binh_an|right|neutral, servant|left|respectful

Cửa phòng bật mở. Một tỳ nữ vội vã chạy vào, mặt tái mét:

"Phò mã gia! Ngài tỉnh rồi ạ! Vũ Hoàng bệ hạ triệu kiến, yến tiệc tiếp đón sứ đoàn Nam Ly Quốc sắp bắt đầu! Ngài phải vào cung ngay!"

* [Hỏi tình hình yến tiệc]
  "Yến tiệc? Sứ đoàn Nam Ly? Kể ta nghe."
  
  Tỳ nữ cuống quýt: "Dạ, Nam Ly phái sứ thần đến, mang theo vế đối thách thức cả triều đình. Nghe đồn không ai đối được, Vũ Hoàng nổi giận triệu tập tất cả văn võ bá quan, kể cả... phò mã."
  
  "Kể cả phò mã phế vật như ta?" — Quý Bình An cười khổ.
  
  -> travel_to_palace

* [Giả bệnh từ chối]
  "Ta vẫn chưa khỏe, nói với cung nhân..."
  
  Tỳ nữ hoảng hốt quỳ xuống: "Không được đâu Phò mã gia! Đây là thánh chỉ! Kháng chỉ là tội chết!"
  
  ~ suspicion += 5
  
  Không có lựa chọn nào khác. Hắn phải đi.
  
  -> travel_to_palace

=== travel_to_palace ===
# BACKGROUND: bg_imperial_road
# MUSIC: bgm_imperial_procession

Kiệu rong ruổi qua đường phố kinh đô. Quý Bình An nhìn qua rèm kiệu — đây là một thế giới cổ đại, nhưng không hoàn toàn giống bất kỳ triều đại nào trong lịch sử Trung Hoa mà hắn biết.

Đại Vũ Hoàng Triều. Một đế chế hư cấu nằm ở vị trí tương tự nhà Hán.

Ký ức của thân xác gốc cho hắn biết: Vũ Hoàng đa nghi, quần thần bè phái, và Quý gia đang ở thế yếu sau khi phụ thân Quý Trọng Dung bị giáng chức.

"Nếu đã xuyên không..." — hắn lẩm bẩm — "...thì phải sống cho ra trò."

# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_court_tension
# ACTORS: qui_binh_an|right|determined

-> imperial_banquet

=== imperial_banquet ===
# ACTORS: qui_binh_an|right|nervous, vu_hoang|center|stern, nam_ly_envoy|left|arrogant
# EFFECT: screen_darken_edges

~ met_vu_hoang = true

Đại điện Kim Loan. Rồng chạm trổ trên cột trụ, đèn lồng đỏ treo khắp nơi.

Vũ Hoàng ngồi trên ngai vàng, mặt lạnh như băng. Hai bên văn võ bá quan đứng xếp hàng, không khí nặng nề.

Sứ thần Nam Ly — một lão già râu dài, áo gấm xanh — đứng giữa đại điện, nụ cười ngạo mạn không che giấu.

"Bệ hạ Đại Vũ, hạ thần mang theo một vế đối nhỏ. Nếu triều đình Đại Vũ không ai đối được..."

Lão ta ngừng lại, ánh mắt lướt qua quần thần:

"...thì e rằng sĩ tử Đại Vũ không xứng đáng với danh xưng 'Lễ nghĩa chi bang' nữa rồi."

-> poetry_challenge

=== poetry_challenge ===
# EFFECT: camera_shake|0.3
# ACTORS: nam_ly_envoy|left|triumphant

Sứ thần Nam Ly dõng dạc đọc:

"「天当棋盘星作子，谁人敢下？」"

"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?"

(Trời làm bàn cờ sao làm quân, ai dám đánh?)

# EFFECT: sfx_crowd_murmur

Cả đại điện xôn xao. Quan văn nhìn nhau, lắc đầu. Quan võ im phắc.

Một vế đối vừa kiêu ngạo vừa uyên bác — lấy trời đất làm bàn cờ, tinh tú làm quân cờ. Ai dám tự xưng có thể đánh cờ với trời?

Vũ Hoàng nhíu mày, ánh mắt quét qua triều thần. Không ai dám lên tiếng.

Rồi ánh mắt Vũ Hoàng dừng lại ở Quý Bình An — phò mã phế vật đứng cuối hàng.

"Quý Bình An!"

# ACTORS: qui_binh_an|right|shocked, vu_hoang|center|cold

"Ngươi cũng là người đọc sách. Đối đi."

Giọng Vũ Hoàng không có chút kỳ vọng nào. Đây rõ ràng là một lời đẩy phò mã ra làm bia đỡ đạn.

-> poetry_choice

=== poetry_choice ===
# SCENE_TYPE: choice

Quý Bình An — linh hồn hiện đại với 4 năm đại học Văn và 6 năm đọc tiểu thuyết lịch sử — nhận ra ngay vế đối này.

Hắn biết câu trả lời. Nhưng...

* [Đứng lên đối: "Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?"]
  -> poetry_triumph

* [Đối một vế tầm thường để giấu thực lực]
  -> poetry_mediocre

* [Im lặng, cúi đầu giả ngu]
  -> poetry_silence

=== poetry_triumph ===
# EFFECT: camera_shake|0.8
# EFFECT: screen_flash|#FFD700|500
# EFFECT: sfx_thunder_dramatic
# ACTORS: qui_binh_an|right|confident, nam_ly_envoy|left|shocked

~ gold += 100
~ poetry_duel_won = true
~ suspicion += 10
~ imperial_prestige += 1

Quý Bình An bước ra khỏi hàng, giọng trầm ấm vang vọng cả đại điện:

"「地作琵琶路作弦，盖世谁弹？」"

"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?"

(Đất làm đàn tỳ bà đường làm dây, ai dám gảy?)

# EFFECT: sfx_crowd_gasp

Trời làm bàn cờ — Đất làm đàn tỳ bà.
Sao làm quân — Đường làm dây.
Ai dám đánh — Ai dám gảy.

Đối thanh, đối ý, đối thế. Hoàn mỹ.

Sứ thần Nam Ly lùi một bước, mặt trắng bệch.

# ACTORS: vu_hoang|center|surprised

Vũ Hoàng bật đứng dậy trên ngai: "HAY! HAY LẮM!"

"Trẫm không ngờ Quý gia lại có nhân tài ẩn giấu! Ban thưởng phò mã Quý Bình An — một trăm lượng hoàng kim!"

# EFFECT: show_toast|+100 Vàng|reward

-> system_awakening

=== poetry_mediocre ===
# ACTORS: qui_binh_an|right|neutral, vu_hoang|center|disappointed

~ suspicion -= 5
~ gold += 10

Quý Bình An lắp bắp một vế đối tàm tạm. Không xuất sắc, nhưng cũng không đến nỗi mất mặt.

Vũ Hoàng thở dài, vẫy tay: "Tạm được. Ban cho phò mã mười lượng bạc."

Sứ thần Nam Ly cười mỉm — hắn không coi đây là thất bại.

Quý Bình An lặng lẽ lui về cuối hàng, nhưng trong lòng có một tiếng nói lạ lùng vang lên...

-> system_awakening_delayed

=== poetry_silence ===
# ACTORS: qui_binh_an|right|head_down, vu_hoang|center|contemptuous

~ suspicion -= 10

Im lặng. Cúi đầu. Phò mã phế vật vẫn là phế vật.

Vũ Hoàng lạnh lùng quay đi. Sứ thần Nam Ly cười lớn: "Đại Vũ quả nhiên không có nhân tài!"

Quý Bình An nuốt nhục. Nhưng trong bóng tối cuối hàng, một tiếng nói kỳ lạ vang lên trong đầu hắn...

-> system_awakening_delayed

=== system_awakening ===
# BACKGROUND: bg_void_golden
# MUSIC: bgm_system_activation
# EFFECT: screen_flash|#FFFFFF|1000
# EFFECT: sfx_system_chime

~ system_awakened = true
~ has_anh_hon_lenh = true

[HỆ THỐNG TAM QUỐC KÍCH HOẠT]

⟨ Phát hiện Trí Huệ Xuyên Thời Đại ⟩
⟨ Kích hoạt Hệ Thống Triệu Hoán Anh Linh ⟩
⟨ Ban tặng: Anh Hồn Lệnh Sơ Cấp × 1 ⟩

# EFFECT: show_toast|🎉 HỆ THỐNG KÍCH HOẠT! Nhận Anh Hồn Lệnh × 1|system
# EFFECT: grant_ticket|1

"Hệ thống... Tam Quốc?" — Quý Bình An nghe thấy giọng nói cơ giới vang trong đầu.

[HỆ THỐNG]: Ký chủ đã chứng minh trí tuệ vượt bậc. Hệ Thống Triệu Hoán Anh Linh Tam Quốc chính thức kích hoạt.

[HỆ THỐNG]: Ký chủ có thể sử dụng Anh Hồn Lệnh để triệu hoán danh tướng, mưu thần, mỹ nhân từ thời Tam Quốc về phụ tá.

[HỆ THỐNG]: Lưu ý — Anh linh được triệu hoán sẽ tồn tại dưới dạng thực thể vật lý, có sức mạnh và ý thức đầy đủ.

* [Kiểm tra Anh Hồn Lệnh]
  Quý Bình An nhìn xuống tay — một tấm lệnh bài cổ kính, viền vàng rực rỡ, khắc chữ "英魂令" (Anh Hồn Lệnh) phát ra ánh sáng ấm áp.
  
  [HỆ THỐNG]: Anh Hồn Lệnh Sơ Cấp có thể triệu hoán 1 Anh Linh cấp Hoàng Cảnh trở xuống. Đài chiêu mộ sẽ mở khóa khi Ký chủ đạt đủ điều kiện.
  
  -> chapter_1_aftermath

=== system_awakening_delayed ===
# MUSIC: bgm_mysterious
# EFFECT: sfx_whisper

~ system_awakened = true
~ has_anh_hon_lenh = true

Trong khoảnh khắc tĩnh lặng giữa đại điện ồn ào, Quý Bình An nghe thấy một giọng nói kỳ lạ — không phải từ bên ngoài, mà từ sâu trong ý thức:

[HỆ THỐNG]: ...Phát hiện Linh Hồn Xuyên Không. Khởi động giao thức khẩn cấp.
[HỆ THỐNG]: Hệ Thống Triệu Hoán Anh Linh Tam Quốc — kích hoạt ở chế độ ẩn.
[HỆ THỐNG]: Ban tặng: Anh Hồn Lệnh Sơ Cấp × 1.

# EFFECT: show_toast|🎉 HỆ THỐNG KÍCH HOẠT (Chế độ ẩn)! Nhận Anh Hồn Lệnh × 1|system
# EFFECT: grant_ticket|1

Hắn giật mình nhìn xuống — trong tay áo, một tấm lệnh bài phát sáng mờ nhạt xuất hiện từ hư không.

-> chapter_1_aftermath

=== chapter_1_aftermath ===
# BACKGROUND: bg_pho_ma_phu_courtyard
# MUSIC: bgm_night_contemplation
# ACTORS: qui_binh_an|right|thoughtful

~ chapter = 1
~ met_to_kien_phong = true

Đêm khuya. Phò Mã Phủ.

Quý Bình An ngồi trong sân viện, ngẩng đầu nhìn trăng. Tấm Anh Hồn Lệnh nằm trên bàn đá, phát ra ánh sáng vàng nhạt.

"Hệ thống Tam Quốc... Triệu hoán anh linh... Thế giới này thật điên rồ."

Nhưng hắn biết — nếu muốn sống, muốn bảo vệ Quý gia, muốn thoát khỏi cái danh "phò mã phế vật" — hắn cần sức mạnh.

[HỆ THỐNG]: Ký chủ, Bái Tướng Đài (Đài Chiêu Mộ Anh Linh) sẽ mở khóa khi Ký chủ chuẩn bị đủ điều kiện. Hãy sẵn sàng.

* [Kết thúc Chương 1]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 1: Xuyên Không & Đối Thơ Đại Điện|milestone
  # EFFECT: chapter_complete|1
  -> chapter_5_transition

// ============================================================
// CHƯƠNG 5: MẬT THẤT PHÒ MÃ PHỦ & BÁI TƯỚNG ĐÀI GACHA
// ============================================================

=== chapter_5_transition ===
# CHAPTER_TITLE: Hồi 2 · Chương 5: Bái Tướng Đài Khai Mở
# BACKGROUND: bg_pho_ma_phu_secret_room
# MUSIC: bgm_mystical_summoning

~ chapter = 5

Bốn ngày trôi qua kể từ yến tiệc đại điện.

Quý Bình An đã dành thời gian tìm hiểu về thế giới này — Đại Vũ Hoàng Triều, các thế lực xung quanh, và sức mạnh bí ẩn của Hệ Thống.

Đêm nay, trong mật thất sâu nhất của Phò Mã Phủ, Anh Hồn Lệnh bỗng phát sáng chói lòa.

[HỆ THỐNG]: Điều kiện đã đủ. Bái Tướng Đài — Khai Mở!

# EFFECT: screen_flash|#FFD700|800
# EFFECT: sfx_gong_ancient

~ unlocked_gacha = true
# EFFECT: show_toast|🎉 MỞ KHÓA: Bái Tướng Đài (Đài Chiêu Mộ Anh Linh)|unlock
# EFFECT: unlock_feature|bai_tuong_dai

[HỆ THỐNG]: Ký chủ có thể sử dụng Anh Hồn Lệnh tại Bái Tướng Đài để chiêu mộ anh linh Tam Quốc.

[HỆ THỐNG]: Hiện tại Ký chủ sở hữu: Anh Hồn Lệnh Sơ Cấp × 1.

* [Bước vào Bái Tướng Đài — Kích hoạt Gacha]
  # EFFECT: trigger_gacha|bai_tuong_dai_v1
  -> gacha_summoning

=== gacha_summoning ===
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_bagua_ritual
# EFFECT: sfx_bagua_spin

// [Engine sẽ hiển thị Gacha Modal tại đây]
// Sau khi người chơi hoàn thành ritual và rút được Triệu Vân:

~ affinity_trieu_van = 50

[HỆ THỐNG]: ⟨ SSR ⟩ Chiêu mộ thành công — TRIỆU TỬ LONG!
[HỆ THỐNG]: Cảnh giới: Hoàng Cảnh Sơ Kỳ | Binh chủng: Bạch Mã Nghĩa Tòng

# EFFECT: screen_flash|#C0C0C0|1000
# EFFECT: sfx_hero_reveal_ssr

-> trieu_van_arrival

=== trieu_van_arrival ===
# BACKGROUND: bg_pho_ma_phu_secret_room
# ACTORS: qui_binh_an|right|amazed, trieu_van|left|noble
# MUSIC: bgm_hero_theme

Ánh sáng bạc ngân lóe lên, sương mù tụ lại hình dáng một chiến tướng.

Giáp bạc sáng loáng, bạch bào tung bay, tay phải cầm trường thương — Long Đảm Lượng Ngân Thương phát ra tiếng rung nhẹ.

Triệu Tử Long — Thường Sơn Triệu Vân, một trong Ngũ Hổ Thượng Tướng của Lưu Bị — hiện thân trước mặt Quý Bình An.

"Triệu Vân, Triệu Tử Long, bái kiến Ký chủ."

Tử Long đơn gối quỳ, Long Đảm Thương dựng đứng bên cạnh, ánh mắt kiên nghị như sao.

* [Đỡ Triệu Vân đứng lên: "Tử Long, từ nay ta và ngươi cùng chiến đấu."]
  ~ affinity_trieu_van += 10
  
  Triệu Vân ngẩng đầu, ánh mắt kiên định: "Tử Long nguyện dùng Long Đảm Thương bảo vệ Ký chủ, dù phải đâm xuyên vạn quân!"
  
  -> hero_inspector_prompt

* [Quan sát kỹ — hắn thật sự là Triệu Tử Long?]
  Quý Bình An nhíu mày: "Chứng minh cho ta."
  
  Triệu Vân mỉm cười, Long Đảm Thương trong tay bỗng hóa thành tia sáng — bảy mũi thương bắn ra liên hoàn, xiên xuyên bảy cột gỗ trong mật thất mà không chạm một vật trang trí nào.
  
  "Thất Thám Bàn Xà."
  
  ~ affinity_trieu_van += 5
  
  -> hero_inspector_prompt

=== hero_inspector_prompt ===
# EFFECT: show_toast|💠 Mở Bảng Thuộc Tính Tướng — Nhấp vào Avatar Triệu Vân để xem|info

[HỆ THỐNG]: Đã mở khóa Bảng Tra Cứu Thuộc Tính Danh Tướng.
[HỆ THỐNG]: Nhấp vào biểu tượng Triệu Vân bất cứ lúc nào để xem chi tiết.

// [Engine hiển thị Hero Detail Inspector Modal]

* [Tiếp tục câu chuyện]
  -> chapter_5_aftermath

=== chapter_5_aftermath ===
# ACTORS: qui_binh_an|right|determined, trieu_van|left|standing_guard

Quý Bình An nhìn Triệu Tử Long — vị chiến thần Tam Quốc giờ đây đứng trong phò mã phủ của hắn, trung thành và sẵn sàng.

"Tử Long, ta có một câu hỏi. Ngươi... biết gì về thế giới này?"

Triệu Vân lắc đầu: "Thần chỉ biết Ký chủ cần thần. Thế giới này hay thế giới khác, Long Đảm Thương vẫn sắc bén."

Quý Bình An mỉm cười. Ít nhất, hắn không còn một mình.

[HỆ THỐNG]: Gợi ý — Chương tiếp theo sẽ mở khóa cơ hội Kinh Doanh. Hãy chuẩn bị.

* [Kết thúc Chương 5]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 5: Chiêu Mộ Triệu Tử Long SSR|milestone
  # EFFECT: chapter_complete|5
  -> chapter_8_transition

// ============================================================
// CHƯƠNG 8: THIÊN KIM LÂU & PHÁT MINH THẤU HOA CAO
// ============================================================

=== chapter_8_transition ===
# CHAPTER_TITLE: Hồi 3 · Chương 8: Phát Minh Thấu Hoa Cao
# BACKGROUND: bg_thien_kim_lau
# MUSIC: bgm_marketplace
# ACTORS: qui_binh_an|right|clever, ve_ti_vu|left|curious

~ chapter = 8
~ met_ve_ti_vu = true

Ba ngày sau khi chiêu mộ Triệu Vân.

Quý Bình An đang ngồi trong Thiên Kim Lâu — tửu lâu lớn nhất kinh đô, do lâu chủ Vệ Ti Vũ điều hành.

Hắn mang theo một mẫu vật nhỏ — một thanh xà phòng thơm, trắng tinh, mịn màng — thứ mà hắn đã bí mật chế tạo từ mỡ cừu và tro kiềm trong ba đêm liên tiếp.

"Vệ lâu chủ, ta có một thương phẩm... sẽ thay đổi toàn bộ thị trường mỹ phẩm Đại Vũ."

Vệ Ti Vũ nhíu mày, cầm thanh xà phòng lên ngửi: "Thơm... và trơn láng. Đây là gì?"

"Thấu Hoa Cao. Sản phẩm tinh chế từ nguyên liệu tự nhiên, có thể làm sạch da, khử mùi, và giữ ẩm. Mỗi thanh bán giá 10 lượng bạc cho giới quý tộc."

* [Đề xuất hợp tác kinh doanh 50/50]
  ~ gold += 3000
  ~ unlocked_soap = true
  
  "Ta cung cấp công thức độc quyền, lâu chủ lo sản xuất và phân phối. Lợi nhuận chia đôi."
  
  Vệ Ti Vũ gật đầu: "Phò mã gia, thương vụ này sẽ khiến cả kinh đô phải xôn xao."
  
  # EFFECT: show_toast|🎉 MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+3.000 Vàng mỗi lượt)|unlock
  # EFFECT: unlock_feature|thau_hoa_cao
  
  [HỆ THỐNG]: Mở khóa tính năng Kinh Doanh Xà Phòng! Thu nhập +3.000 Vàng mỗi lượt trên Sa Bàn.
  
  -> chapter_8_aftermath

* [Giữ bí mật, tự sản xuất quy mô nhỏ]
  ~ gold += 1000
  ~ unlocked_soap = true
  
  "Chưa vội. Ta sẽ tự kinh doanh trước, thử thị trường."
  
  # EFFECT: show_toast|🎉 MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+1.000 Vàng mỗi lượt, mở rộng sau)|unlock
  # EFFECT: unlock_feature|thau_hoa_cao
  
  [HỆ THỐNG]: Mở khóa tính năng Kinh Doanh Xà Phòng! Thu nhập +1.000 Vàng mỗi lượt (có thể nâng cấp).
  
  -> chapter_8_aftermath

=== chapter_8_aftermath ===
# ACTORS: qui_binh_an|right|satisfied

Đây mới là bước khởi đầu thực sự. Có tiền, có tướng — Quý Bình An bắt đầu xây dựng nền tảng quyền lực.

* [Kết thúc Chương 8]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 8: Phát Minh Thấu Hoa Cao|milestone
  # EFFECT: chapter_complete|8
  -> chapter_10_transition

// ============================================================
// CHƯƠNG 10: THÍCH KHÁCH PHÒ MÃ PHỦ
// ============================================================

=== chapter_10_transition ===
# CHAPTER_TITLE: Hồi 4 · Chương 10: Thích Khách Đêm Trăng
# BACKGROUND: bg_pho_ma_phu_courtyard_night
# MUSIC: bgm_suspense_night
# ACTORS: qui_binh_an|right|alarmed

~ chapter = 10

Đêm khuya. Phò Mã Phủ.

Quý Bình An đang đọc sách trong thư phòng thì cảm thấy luồng sát khí lạnh buốt.

# EFFECT: sfx_blade_unsheath
# EFFECT: screen_darken

Ba bóng đen từ trên mái nhà lao xuống — đao sáng lạnh, nhằm thẳng cổ phò mã!

* [Hét gọi Triệu Vân!]
  -> assassin_zhao_yun_saves

* [Lăn sang bên, tự né tránh]
  -> assassin_self_dodge

=== assassin_zhao_yun_saves ===
# EFFECT: sfx_spear_whoosh
# EFFECT: screen_flash|#C0C0C0|300
# ACTORS: trieu_van|left|battle_stance, assassin|center|attacking

"TỬ LONG!"

Trước khi tiếng hét tắt, ánh bạc đã lóe lên — Long Đảm Lượng Ngân Thương xé toang bóng đêm!

Triệu Vân xuất hiện như luồng gió bạc. Ba mũi thương liên hoàn — ba thích khách ngã gục trước khi kịp chạm vào phò mã.

"Ký chủ, bọn chúng là sát thủ được huấn luyện bài bản." — Triệu Vân thu thương, mắt vẫn cảnh giác quét xung quanh.

~ affinity_trieu_van += 15

-> assassin_aftermath

=== assassin_self_dodge ===
# ACTORS: qui_binh_an|right|rolling, assassin|center|attacking

Quý Bình An lăn sang bên — phản xạ sinh tồn từ kinh nghiệm đọc quá nhiều tiểu thuyết võ hiệp.

Nhưng thích khách thứ hai đã ở sau lưng—

# EFFECT: sfx_spear_whoosh
# EFFECT: screen_flash|#C0C0C0|300
# ACTORS: trieu_van|left|battle_stance

Kịp thời! Triệu Vân đã phục sẵn bên ngoài từ lúc cảm nhận sát khí. Long Đảm Thương quét ngang — ba thích khách ngã gục.

~ affinity_trieu_van += 10

-> assassin_aftermath

=== assassin_aftermath ===
# BACKGROUND: bg_pho_ma_phu_courtyard_night
# MUSIC: bgm_investigation
# ACTORS: qui_binh_an|right|serious, trieu_van|left|reporting

Triệu Vân kiểm tra thi thể thích khách: "Bọn chúng đều uống thuốc phong bế huyệt đạo, không thể tra khảo. Nhưng hình xăm trên cổ tay — đây là dấu hiệu của..."

Hắn dừng lại.

"Ký chủ, bọn chúng không phải thích khách thường. Ai đó có quyền lực rất lớn muốn ngài chết."

* [Ngụy tạo tai nạn giấu xác, bí mật điều tra]
  ~ suspicion -= 10
  ~ gold += 2000
  
  "Không được để lộ. Giấu xác, xóa dấu vết. Ta sẽ tự điều tra."
  
  # EFFECT: set_flag|ch10_method|hide
  
  -> chapter_10_complete

* [Áp giải thi thể lên Kim Loan Điện đối chất Vũ Hoàng]
  ~ suspicion += 20
  ~ gold += 5000
  
  "Đưa xác lên triều! Ta muốn xem ai dám ám sát phò mã ngay giữa kinh đô!"
  
  # EFFECT: set_flag|ch10_method|confront
  
  -> chapter_10_complete

* [Hỏa tốc điều động kỵ binh thám thính tiền tuyến]
  ~ suspicion += 5
  
  "Tử Long, phái người đi kiểm tra biên giới phía Bắc. Ta nghi ngờ chuyện này liên quan đến ngoại bang."
  
  # EFFECT: set_flag|ch10_method|investigate
  
  -> chapter_10_complete

=== chapter_10_complete ===
* [Kết thúc Chương 10]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 10: Thích Khách Đêm Trăng|milestone
  # EFFECT: chapter_complete|10
  -> chapter_15_transition

// ============================================================
// CHƯƠNG 15: VŨ HOÀNG HẠ CHỈ BẮC CHINH
// ============================================================

=== chapter_15_transition ===
# CHAPTER_TITLE: Hồi 5 · Chương 15: Chinh Phạt Bắc Cảnh
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_imperial_decree
# ACTORS: vu_hoang|center|commanding, qui_binh_an|right|kneeling

~ chapter = 15

Đại điện Kim Loan. Vũ Hoàng ngồi trên ngai, mặt nghiêm trọng.

"Biên giới Bắc Cảnh bất ổn. Quân phiến loạn đã chiếm ba huyện, cắt đứt tuyến thương mại phương Bắc."

Vũ Hoàng đứng dậy, rút thanh kiếm truyền quốc:

"Trẫm phong Quý Bình An làm Chinh Bắc Đại Tướng Quân, lĩnh binh mã chinh phạt Bắc Cảnh!"

# EFFECT: screen_flash|#FFD700|500
# EFFECT: sfx_imperial_decree

~ unlocked_map = true
~ imperial_prestige += 1
~ gold += 5000
~ jade += 20

# EFFECT: show_toast|🎉 MỞ KHÓA: Tầng 2 — Đế Nghiệp Sa Bàn (Grand Strategy Map)|unlock
# EFFECT: unlock_feature|de_nghiep_sa_ban

[HỆ THỐNG]: Mở khóa Đế Nghiệp Sa Bàn! Bản đồ chiến lược 4 phương, hệ thống Điểm Hành Động (AP), và quản lý hậu cần quân đội.

* [Nhận lệnh: "Thần lĩnh chỉ!"]
  ~ suspicion += 5
  ~ affinity_trieu_van += 5
  
  "Thần Quý Bình An lĩnh chỉ! Tất sẽ bình định Bắc Cảnh, khôi phục cương thổ cho Đại Vũ!"
  
  Triệu Vân đứng bên cạnh, Long Đảm Thương vang lên tiếng ngân: sẵn sàng.
  
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 15: Chinh Phạt Bắc Cảnh|milestone
  # EFFECT: chapter_complete|15
  
  [HỆ THỐNG]: Từ đây, người chơi có thể chuyển sang Tầng 2 — Đế Nghiệp Sa Bàn để quản lý lãnh thổ và quân đội.
  
  -> chapter_20_start
