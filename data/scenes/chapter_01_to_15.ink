// ============================================================
// Trấn Quốc Phò Mã Gia — Ink Scene Script
// Chương 1 - 15: Khởi Đầu Hàn Vi & Phong Vân Kinh Đô
// ============================================================
// Biên soạn theo chuẩn mực văn học cổ phong & Ink scripting
// Tham chiếu: narrative-scene-scripting & game-systems-architect
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

// Branch memory
VAR ch10_method = "none"

// ============================================================
// CHƯƠNG 1: XUYÊN KHÔNG & ĐỐI THƠ ĐẠI ĐIỆN
// ============================================================

=== chapter_1_start ===
# BACKGROUND: bg_darkness
# MUSIC: bgm_ethereal_void
# CHAPTER_TITLE: Hồi 1 · Chương 1: Phò Mã Hàn Vi Nơm Nớp Lo Sợ

Hắn mở mắt.

Không phải bóng tối hư vô của kiếp trước. Trước mắt hắn là tấm trướng lụa màu tím than thêu chỉ vàng đã sờn rách, thoang thoảng mùi trầm hương mục nát pha lẫn u uất.

Đầu đau như búa bổ. Vô số mảnh vỡ ký ức xa lạ cuộn trào như thủy triều — hắn tên là Quý Bình An, đích tử thứ ba của phủ Trấn Quốc Công, cũng chính là kẻ phò mã hàn vi nức tiếng bất tài vô dụng của Đại Vũ Hoàng Triều.

Phụ thân Quý Trọng Dung vừa bị tước đoạt binh quyền, gièm pha khắp kinh thành. Thê tử là Ninh An công chúa cao quý lạnh lùng chưa từng một lần ghé mắt. Còn bản thân hắn thì vừa trúng kỳ độc mê man ba ngày ba đêm, suýt nữa đã mất mạng trong âm thầm...

# BACKGROUND: bg_pho_ma_phu_bedroom
# ACTORS: qui_binh_an|right|worried

Hắn... đã nhập thể trùng sinh vào tử cục ngập tràn hiểm nguy này.

* [Ẩn Nhẫn · Tĩnh tâm quan sát: "Muốn sinh tồn nơi triều chính, trước hết phải nhìn thấu cục diện..."]
  Quý Bình An khẽ hít sâu một hơi lãnh khí, kìm nén cơn chấn động trong lồng ngực, chậm rãi gượng dậy. Căn phòng tuy hoa lệ nhưng lạnh lẽo thấu xương, ngoài cửa sổ tiếng mưa rơi rả rích dập dồn như gõ trống trận.
  
  "Một phò mã bị ruồng bỏ, một gia tộc đang bên bờ vực diệt môn... Muốn sống sót trong hoàng triều này, bước đầu tiên là phải giấu kín mũi nhọn."
  
  -> arrival_of_servant

* [Sát Phạt · Siết chặt nắm tay: "Đã cho ta trùng sinh vào tử cục này, tuyệt không làm con rối mặc người xâu xé!"]
  Ánh mắt Quý Bình An lóe lên tia sắc lạnh. Hắn nhìn xuống đôi bàn tay trắng trẻo nhưng yếu ớt của thân xác này, khóe môi khẽ nhếch lên nụ cười tự giễu.
  
  "Đã để ta sống lại trong thân xác này, thì tuyệt đối không có chuyện tiếp tục làm bù nhìn mặc người giẫm đạp!"
  
  -> arrival_of_servant

=== arrival_of_servant ===
# ACTORS: qui_binh_an|right|neutral, servant|left|respectful

Cánh cửa gỗ sơn mài đột ngột bật mở. Tỳ nữ thân cận Tiểu Thúy vội vã chạy vào, gương mặt tái nhợt không còn giọt máu:

"Phò mã gia! Ngài rốt cuộc đã tỉnh lại rồi! Vũ Hoàng bệ hạ truyền khẩu dụ khẩn, yến tiệc tiếp đón sứ đoàn Nam Ly Quốc sắp sửa khai yến tại Kim Loan Điện! Ngài... ngài phải lập tức nhập cung ngay!"

* [Thăm Dò · Gặng hỏi thực hư: "Nam Ly sứ thần ngông cuồng thế nào? Trăm quan triều đình không ai ứng đối được sao?"]
  Quý Bình An cất giọng trầm tĩnh, ánh mắt sâu thẳm nhìn thẳng vào tỳ nữ: "Bình tĩnh lại. Sứ đoàn Nam Ly mang theo điều gì đến yến tiệc mà khiến cả triều đình đại loạn?"
  
  Tiểu Thúy run giọng bẩm báo: "Dạ bẩm... Nam Ly phái sứ thần đệ nhất học sĩ đến, mang theo một vế đối tuyệt đỉnh thách thức sĩ tử Đại Vũ. Nghe nói cả Hàn Lâm Viện lẫn các vị đại học sĩ đều câm nín, Vũ Hoàng nổi lôi đình lôi cả hoàng thân quốc thích và phò mã vào cung!"
  
  Quý Bình An khẽ cười lạnh: "Xem ra Vũ Hoàng không phải cần ta đối đáp, mà là muốn tìm một kẻ gánh tội thay khi triều đình mất mặt."
  
  -> travel_to_palace

* [Ẩn Nhẫn · Phán đoán sát cơ: "Vũ Hoàng triệu kiến phò mã hàn vi... là muốn mượn đao giết người hay đẩy Quý gia vào chỗ chết?"]
  Quý Bình An chau mày, trong đầu xoay chuyển trăm ngàn mưu kế: "Xưa nay yến tiệc ngoại giao chưa từng triệu kiến phò mã hàn vi. Đột nhiên hạ chỉ, ắt có kẻ gièm pha sau lưng nhằm triệt hạ Quý gia."
  
  Tiểu Thúy hoảng hốt quỳ sụp xuống: "Phò mã gia, đây là thánh chỉ ban xuống! Kháng chỉ là tội tru di, nô tỳ van xin ngài mau chuẩn bị y phục nhập cung!"
  
  ~ suspicion += 5
  
  Hắn khẽ thở dài, đứng dậy chỉnh lại vạt áo hắc bào: "Được, vậy để ta vào hoàng cung xem bọn họ muốn diễn vở kịch gì."
  
  -> travel_to_palace

=== travel_to_palace ===
# BACKGROUND: bg_imperial_road
# MUSIC: bgm_imperial_procession

Cỗ xe ngựa lăn bánh trên đường đá hoa cương kinh đô, tiếng vó ngựa gõ dồn dập giữa màn mưa đêm.

Đại Vũ Hoàng Triều ba trăm năm định đô, bề ngoài phồn hoa tựa gấm, nhưng bên trong thì cửu vương đoạt đích, phiên trấn rục rịch binh đao, phương Bắc có Thác Bạt thiết kỵ rình rập, phương Nam có Nam Ly mưu toan cắn nuốt Trung Nguyên.

Còn Quý gia — từng là danh môn khai quốc — nay chịu đủ mọi nghi kỵ của Vũ Hoàng, phụ thân Quý Trọng Dung bị phế chức, huynh trưởng trấn giữ biên thùy cô độc.

"Nếu đã bước vào ván cờ này... thì ta sẽ là người nắm giữ quân cờ."

# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_court_tension
# ACTORS: qui_binh_an|right|determined

-> imperial_banquet

=== imperial_banquet ===
# ACTORS: qui_binh_an|right|nervous, vu_hoang|center|stern, nam_ly_envoy|left|arrogant
# EFFECT: screen_darken_edges

~ met_vu_hoang = true

Đại điện Kim Loan nguy nga tráng lệ, nhưng sát khí và sự ngột ngạt bao trùm từng tấc không khí.

Vũ Hoàng ngự trên Cửu Long Bảo Tọa, sắc mặt âm trầm như mây đen trước cơn bão. Hai bên bá quan văn võ cúi gầm mặt, không một ai dám ngẩng đầu thở mạnh.

Chính giữa đại điện, sứ thần Nam Ly Quốc khoác cẩm bào xanh thẫm, ngạo nghễ vuốt râu, giọng nói sang sảng đầy vẻ khinh miệt:

"Bệ hạ Đại Vũ, vế đối này chỉ là chút thi tài tầm thường của phương Nam ta. Nếu vương triều trăm vạn sĩ tử mà không ai đối nổi, thì danh xưng 'Văn hiến thiên bang' từ nay xin giao lại cho Nam Ly ta vậy!"

-> poetry_challenge

=== poetry_challenge ===
# EFFECT: camera_shake|0.3
# ACTORS: nam_ly_envoy|left|triumphant

Sứ thần Nam Ly dõng dạc đọc vế đối vách đá:

"「天当棋盘星作子，谁人敢下？」"

"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?"
(Trời làm bàn cờ sao làm quân, ai dám hạ cờ?)

# EFFECT: sfx_crowd_murmur

Cả đại điện xôn xao. Quan văn nhìn nhau, lắc đầu. Quan võ im phắc.

Một vế đối ngập tràn sát khí và cuồng vọng — lấy trời đất làm bàn cờ, biến nhật nguyệt tinh tú thành con tốt. Ai dám xưng mình ngang hàng với trời đất mà hạ cờ?

Vũ Hoàng nhíu mày, ánh mắt quét qua triều thần. Không ai dám lên tiếng. Rồi ánh mắt Vũ Hoàng dừng lại ở Quý Bình An — phò mã phế vật đứng cuối hàng:

"Quý Bình An! Ngươi dù sao cũng là con em Quý gia, đọc qua thi thư. Ngươi đối cho trẫm!"

-> poetry_choice

=== poetry_choice ===
# SCENE_TYPE: choice

Trước mắt hắn không chỉ là một vế đối lộng ngôn, mà là một đòn thăm dò hiểm độc của Nam Ly nhắm thẳng vào quốc thể Đại Vũ. Nếu vương triều chịu nhục, lửa chiến tranh sẽ thiêu rụi phương Nam...

* [Hoành Đao · Đối vế nghịch thiên: "Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?"]
  -> poetry_triumph

* [Khiêm Cung · Đối vế mực thước: Giữ thể diện triều đình, giấu kín phong mang]
  -> poetry_mediocre

* [Quyền Mưu · Vạch trần dã tâm: Đanh thép chất vấn sứ thần Nam Ly trước điện Kim Loan]
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

Quý Bình An tiến lên một bước, tà áo hắc bào tung bay giữa đại điện. Tiếng cười khẽ của hắn vang vọng khắp Kim Loan:

"Sứ thần Nam Ly ếch ngồi đáy giếng, cũng dám đem chút tài mọn ra bêu rếu trước mặt Hoàng thượng?"

Hắn ngẩng đầu, ánh mắt uy nghiêm như sấm sét:

"「地作琵琶路作弦，盖世谁弹？」"

"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?"
(Đất làm đàn tỳ bà đường làm dây, bậc cái thế nào dám gảy?)

# EFFECT: sfx_crowd_gasp

Một câu xuất khẩu, sấm rền giữa trời quang!

Trời làm bàn cờ — Đất làm tỳ bà.
Sao làm quân cờ — Đường thiên lý làm dây đàn.
Khí phách ngút trời, nuốt trọn càn khôn, biến cả non sông gấm vóc thành khúc đàn của bậc đế vương!

Sứ thần Nam Ly lùi liền ba bước, sắc mặt trắng bệch, ngực phập phồng không thốt nên lời.

# ACTORS: vu_hoang|center|surprised

Vũ Hoàng chấn động đứng phắt dậy khỏi long ngai, vỗ mạnh lên bàn: "HẢO! HẢO MỘT CÂU CÁI THẾ THÙY ĐẠN!"

"Quý gia quả nhiên không hổ danh Trấn Quốc hổ môn! Ban thưởng phò mã Quý Bình An một trăm lượng hoàng kim!"

# EFFECT: show_toast|+100 Hoàng Kim|reward

-> system_awakening

=== poetry_mediocre ===
# ACTORS: qui_binh_an|right|neutral, vu_hoang|center|disappointed

~ suspicion -= 5
~ gold += 10

Quý Bình An chắp tay hành lễ, từ tốn đọc một vế đối thanh nhã, vừa đủ giải vây cho triều đình mà không bộc lộ quá nhiều tài năng kinh thế hãi tục.

Sứ thần Nam Ly tuy không phục nhưng đành ngậm ngùi lui bước. Vũ Hoàng khẽ gật đầu, ban thưởng mười lượng bạc để khích lệ.

-> system_awakening_delayed

=== poetry_silence ===
# ACTORS: qui_binh_an|right|head_down, vu_hoang|center|contemptuous

~ suspicion += 5
~ imperial_prestige += 2
~ gold += 50

Quý Bình An không đối ngay, mà cất giọng đanh thép vạch trần dã tâm mượn văn thăm dò quân sự của Nam Ly khiến sứ thần tái mặt, Vũ Hoàng thầm khen ngợi sự nhạy bén chính trị.

-> system_awakening

=== system_awakening ===
# BACKGROUND: bg_void_golden
# MUSIC: bgm_system_activation
# EFFECT: screen_flash|#FFD700|1000
# EFFECT: sfx_system_chime

~ system_awakened = true
~ has_anh_hon_lenh = true

【 CÀN KHÔN ĐẢO CHUYỂN · THIÊN CƠ KÍCH HOẠT 】

⟨ Cảm ứng: Hùng tài đại lược · Trí tuệ thấu suốt càn khôn ⟩
⟨ Khởi động: Thượng Cổ Bái Tướng Thần Đàn ⟩
⟨ Ban tặng vật phẩm: Thượng Cổ Anh Hồn Lệnh × 1 ⟩

# EFFECT: show_toast|🎉 THỨC TỈNH THIÊN CƠ: Tiếp nhận Thượng Cổ Anh Hồn Lệnh|system
# EFFECT: grant_ticket|1

Một cỗ hàn khí hùng hồn hòa cùng kim quang chói lòa tràn vào đan điền Quý Bình An. Trong lòng bàn tay hắn, một tấm lệnh bài bằng đồng cổ chạm khắc thần thú thượng cổ dần ngưng tụ thành thực thể, tỏa ra uy áp ngập tràn.

[THIÊN CƠ HỆ THỐNG]: Ký chủ đã bước qua ngưỡng cửa sinh tử, đoạt lấy thiên mệnh. Kể từ giờ phút này, có thể chiêu mộ chiến thần, mưu sĩ ngàn năm về dưới trướng!

* [Thiên Cơ · Nắm chặt lệnh bài: "Có thiên mệnh trong tay, vận mệnh này do ta tự định đoạt!"]
  Quý Bình An siết chặt phiến lệnh bài ấm nóng trong lòng bàn tay. Đôi mắt hắn ánh lên tia sáng sắc lẹm thấu suốt cõi trần.
  
  -> chapter_1_aftermath

=== system_awakening_delayed ===
# MUSIC: bgm_mysterious
# EFFECT: sfx_whisper

~ system_awakened = true
~ has_anh_hon_lenh = true

Trong khoảnh khắc tĩnh lặng giữa đại điện ồn ào, Quý Bình An nghe thấy một thanh âm cổ kính như vọng lại từ chuông đồng ngàn năm:

[THIÊN CƠ HỆ THỐNG]: Cảm ứng khí tức vương giả ẩn nhẫn. Thượng Cổ Bái Tướng Thần Đàn kích hoạt ở chế độ tiềm phục.
[THIÊN CƠ HỆ THỐNG]: Ban tặng: Thượng Cổ Anh Hồn Lệnh × 1.

# EFFECT: show_toast|🎉 THỨC TỈNH THIÊN CƠ (Tiềm Phục): Tiếp nhận Anh Hồn Lệnh × 1|system
# EFFECT: grant_ticket|1

Trong tay áo hắn, phiến lệnh bài khắc họa rồng thiêng phát ra ánh sáng vàng ấm áp.

-> chapter_1_aftermath

=== chapter_1_aftermath ===
# BACKGROUND: bg_palace_chamber
# MUSIC: bgm_night_contemplation
# ACTORS: qui_binh_an|right|determined

~ chapter = 1
~ met_to_kien_phong = true

Đêm khuya tẩm thất phò mã phủ.

Ánh trăng lạnh rọi qua song cửa sổ, chiếu lên phiến Thượng Cổ Anh Hồn Lệnh nằm trên bàn gỗ đàn hương.

Quý Bình An đứng chắp tay nhìn ra màn đêm kinh đô mịt mùng:

"Vũ Hoàng ngoài mặt khen thưởng nhưng ánh mắt đầy vẻ thăm dò kiêng kỵ. Còn Nam Ly chịu nhục tại điện tiền ắt sẽ giở thủ đoạn ám sát hoặc gây hấn biên cương..."

"Không thể chần chừ thêm nữa. Phải mau chóng khởi động Bái Tướng Thần Đàn, chiêu mộ võ tướng trấn giữ cơ đồ!"

* [Quyền Mưu · Chuẩn bị mật thất: "Sóng gió kinh đô đã nổi lên, lập tức chuẩn bị tế đàn chiêu mộ danh tướng!"]
  # EFFECT: show_toast|📜 HOÀN TẤT HỒI 1: Phò Mã Thức Tỉnh & Đối Thơ Chấn Kinh Đô|milestone
  # EFFECT: chapter_complete|1
  -> chapter_5_transition

// ============================================================
// CHƯƠNG 5: MẬT THẤT PHÒ MÃ PHỦ & BÁI TƯỚNG ĐÀI
// ============================================================

=== chapter_5_transition ===
# CHAPTER_TITLE: Hồi 2 · Chương 5: Bái Tướng Đài Khai Mở
# BACKGROUND: bg_pho_ma_phu_secret_room
# MUSIC: bgm_mystical_summoning

~ chapter = 5

Bốn ngày trôi qua kể từ yến tiệc đại điện.

Quý Bình An dành trọn thời gian nắm bắt tình thế — Đại Vũ Hoàng Triều thù trong giặc ngoài, và sức mạnh bí ẩn của Thượng Cổ Bái Tướng Đàn.

Đêm nay, trong mật thất sâu nhất của Phò Mã Phủ, phiến Anh Hồn Lệnh bỗng rung lên từng hồi chuông trầm hùng.

[THIÊN CƠ HỆ THỐNG]: Địa mạch quy tụ. Thượng Cổ Bái Tướng Thần Đàn — Khai Mở!

# EFFECT: screen_flash|#FFD700|800
# EFFECT: sfx_gong_ancient

~ unlocked_gacha = true
# EFFECT: show_toast|🎉 KHAI MỞ: Bái Tướng Thần Đàn (Chiêu Mộ Danh Tướng)|unlock
# EFFECT: unlock_feature|bai_tuong_dai

[THIÊN CƠ HỆ THỐNG]: Ký chủ có thể tế xuất Anh Hồn Lệnh để thỉnh triệu anh linh danh tướng thời Tam Quốc quy vị. Hiện tại sở hữu: Anh Hồn Lệnh × 1.

* [Thiên Cơ · Khởi động tế đàn: "Thượng Cổ Bái Tướng Đài, phụng mệnh ta triệu hoán danh tướng ngàn năm quy vị!"]
  # EFFECT: trigger_gacha|bai_tuong_dai_v1
  -> gacha_summoning

=== gacha_summoning ===
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_bagua_ritual
# EFFECT: sfx_bagua_spin

~ affinity_trieu_van = 50

[THIÊN CƠ HỆ THỐNG]: ⟨ SSR ⟩ THỈNH TRIỆU THÀNH CÔNG — THƯỜNG SƠN TRIỆU TỬ LONG!
[THIÊN CƠ HỆ THỐNG]: Cảnh giới: Hoàng Cảnh Sơ Kỳ | Binh chủng: Bạch Mã Nghĩa Tòng

# EFFECT: screen_flash|#C0C0C0|1000
# EFFECT: sfx_hero_reveal_ssr

-> trieu_van_arrival

=== trieu_van_arrival ===
# BACKGROUND: bg_pho_ma_phu_secret_room
# ACTORS: qui_binh_an|right|amazed, trieu_van|left|noble
# MUSIC: bgm_hero_theme

Ánh sáng bạc ngân lóe lên rực rỡ, sương khói ngưng tụ thành thân ảnh một vị dũng tướng oai phong lẫm liệt.

Giáp bạc sáng loáng, bạch bào tung bay, tay cầm Long Đảm Lượng Ngân Thương tỏa ra chiến ý ngút trời.

Triệu Tử Long — Thường Sơn Triệu Vân — quỳ một gối, thương cắm thẳng xuống sàn đá, giọng nói sang sảng chấn động mật thất:

"Triệu Vân, Triệu Tử Long, bái kiến Chúa Công!"

* [Tri Kỷ · Tiến lên đỡ Tử Long: "Tử Long mau bình thân! Có ngươi bên cạnh, Quý Bình An ta hà tất phải sợ nghịch cảnh!"]
  ~ affinity_trieu_van += 10
  
  Triệu Vân ngẩng đầu, ánh mắt kiên định như thiết thạch: "Tử Long nguyện đem Long Đảm Thương bảo hộ Chúa Công, dù đối mặt vạn mã thiên quân cũng không lùi nửa bước!"
  
  -> hero_inspector_prompt

* [Khảo Nghiệm · Quan sát chiến ý: "Long Đảm Thần Thương danh chấn thiên hạ, xin Tử Long thi triển cho ta xem!"]
  Triệu Vân mỉm cười, mũi thương khẽ rung — bảy đạo thương ảnh hóa thành hàn quang xé toang hư không, xuyên qua bảy trụ đá mật thất trong chớp mắt mà không làm vỡ một viên ngói!
  
  "Thất Thám Bàn Xà Thương Pháp."
  
  ~ affinity_trieu_van += 5
  
  -> hero_inspector_prompt

=== hero_inspector_prompt ===
# EFFECT: show_toast|💠 Đã Khai Mở Bảng Danh Tướng — Xem chi tiết thuộc tính Triệu Vân|info

[THIÊN CƠ HỆ THỐNG]: Đã mở khóa Bảng Tra Cứu Thuộc Tính Danh Tướng. Ký chủ có thể thẩm duyệt chi tiết chiến tướng bất cứ lúc nào.

* [Quân Cơ · Trao quyền thống lĩnh: "Mật thất và hậu viện phủ đệ giao cho Tử Long canh giữ, người khả nghi được phép tiền trảm hậu tấu!"]
  -> chapter_5_aftermath

=== chapter_5_aftermath ===
# ACTORS: qui_binh_an|right|determined, trieu_van|left|standing_guard

Quý Bình An nhìn Triệu Tử Long — vị chiến thần Tam Quốc giờ đây đứng sừng sững trong phò mã phủ, trung trinh và sẵn sàng đẫm máu sa trường.

"Tử Long, thế giới này hiểm độc gấp bội, quyền mưu giấu sau từng nụ cười."

Triệu Vân nghiêm giọng: "Thần chỉ biết Chúa Công ở đâu, Long Đảm Thương chỉ về hướng đó!"

* [Kinh Tài · Khởi sự cơ nghiệp: "Muốn nuôi quân đúc giáp thì ngân quỹ phải dồi dào. Ngày mai đến Thiên Kim Lâu bàn chuyện làm ăn!"]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 5: Chiêu Mộ Thường Sơn Triệu Tử Long SSR|milestone
  # EFFECT: chapter_complete|5
  -> chapter_8_transition

// ============================================================
// CHƯƠNG 8: THIÊN KIM LÂU & THẤU HOA CAO
// ============================================================

=== chapter_8_transition ===
# CHAPTER_TITLE: Hồi 3 · Chương 8: Phát Minh Thấu Hoa Cao
# BACKGROUND: bg_thien_kim_lau
# MUSIC: bgm_marketplace
# ACTORS: qui_binh_an|right|clever, ve_ti_vu|left|curious

~ chapter = 8
~ met_ve_ti_vu = true

Ba ngày sau khi chiêu mộ Triệu Vân.

Quý Bình An ngồi trên lầu cao nhất của Thiên Kim Lâu — tửu lâu lớn nhất kinh đô, do lâu chủ Vệ Ti Vũ phong hoa tuyệt đại điều hành.

Hắn đặt lên bàn một chiếc hộp sơn mài — bên trong là thanh xà phòng ngát hương hoa nhài, mịn màng như ngọc thạch — bảo vật hắn đã bí mật điều chế từ nguyên liệu thảo dược tự nhiên.

"Vệ lâu chủ, thương phẩm này... sẽ khiến cả kinh đô điên đảo."

Vệ Ti Vũ khẽ ngửi làn hương thanh khiết, đôi mắt phượng sáng rực: "Hương thơm thoát tục, trơn láng như mỡ đông. Phò mã gia, đây là kỳ trân dị bảo gì?"

"Thấu Hoa Cao. Rửa sạch bụi trần, lưu hương bảy ngày, dưỡng nhan tuyệt phẩm. Mỗi bánh giá mười lượng bạc dành riêng cho vương tôn quý tộc."

* [Hợp Tác · Bắt tay cùng Vệ Ti Vũ: "Ta xuất bí phương độc quyền, lâu chủ lo mạng lưới phân phối, lợi nhuận chia đôi!"]
  ~ gold += 3000
  ~ unlocked_soap = true
  
  "Ta cung cấp công thức độc quyền, Thiên Kim Lâu lo vận chuyển và tiêu thụ. Lợi nhuận chia đều."
  
  Vệ Ti Vũ khẽ cười quyến rũ, nâng chén rượu chúc mừng: "Phò mã gia quả là bậc kỳ tài ẩn nhẫn. Thương vụ này, tiện thiếp nhận!"
  
  # EFFECT: show_toast|🎉 MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+3.000 Vàng mỗi lượt Sa Bàn)|unlock
  # EFFECT: unlock_feature|thau_hoa_cao
  
  -> chapter_8_aftermath

* [Ẩn Nhẫn · Lập xưởng chế tạo riêng: "Bí phương chưa thể để lộ ra ngoài, tạm thời sản xuất quy mô nhỏ tích lũy thực lực."]
  ~ gold += 1000
  ~ unlocked_soap = true
  
  "Chưa vội khuếch trương. Ta sẽ thăm dò thị trường trước, từng bước tích súc ngân quỹ."
  
  # EFFECT: show_toast|🎉 MỞ KHÓA: Phường Đúc Thấu Hoa Cao (+1.000 Vàng mỗi lượt)|unlock
  # EFFECT: unlock_feature|thau_hoa_cao
  
  -> chapter_8_aftermath

=== chapter_8_aftermath ===
# ACTORS: qui_binh_an|right|satisfied

Nguồn hoàng kim ròng rã bắt đầu chảy vào túi phò mã phủ. Có tiền, có tướng — Quý Bình An đã đặt viên đá tảng đầu tiên cho đại nghiệp tranh bá.

* [Quyền Mưu · Thu nạp nhân tài: "Ngân khố đã vững, lập tức mở rộng tai mắt khắp các ngõ ngách kinh thành!"]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 8: Phát Minh Thấu Hoa Cao Kinh Doanh|milestone
  # EFFECT: chapter_complete|8
  -> chapter_10_transition

// ============================================================
// CHƯƠNG 10: THÍCH KHÁCH ĐÊM TRĂNG
// ============================================================

=== chapter_10_transition ===
# CHAPTER_TITLE: Hồi 4 · Chương 10: Thích Khách Đêm Trăng
# BACKGROUND: bg_pho_ma_phu_courtyard_night
# MUSIC: bgm_suspense_night
# ACTORS: qui_binh_an|right|alarmed

~ chapter = 10

Đêm rằm gió lộng. Phò Mã Phủ tịch mịch như tờ.

Quý Bình An đang nghiên cứu bản đồ địa hình trong thư phòng thì một luồng sát khí lạnh buốt gáy ập tới!

# EFFECT: sfx_blade_unsheath
# EFFECT: screen_darken

Ba đạo bóng đen xé gió lao xuống từ xà nhà — lưỡi đoản đao tẩm độc xanh biếc nhằm thẳng yếu huyệt của hắn!

* [Sát Phạt · Hét gọi Triệu Vân: "Tử Long, lưu lại kẻ sống!"]
  -> assassin_zhao_yun_saves

* [Quyền Mưu · Lâm nguy không loạn: Phán đoán phương vị mũi đao, né tránh hiểm cảnh tìm chỗ sơ hở!]
  -> assassin_self_dodge

=== assassin_zhao_yun_saves ===
# EFFECT: sfx_spear_whoosh
# EFFECT: screen_flash|#C0C0C0|300
# ACTORS: trieu_van|left|battle_stance, assassin|center|attacking

"TỬ LONG!"

Thanh âm chưa dứt, một dải ngân hà rực sáng đã xé toang màn đêm — Long Đảm Thương xuất kích!

Triệu Vân tựa như thần phong giáng thế. Ba mũi thương điểm chuẩn xác vào cổ tay thích khách, đánh bay binh khí, đá văng bọn chúng xuống sân gạch!

"Chúa Công, bọn chúng là tử sĩ chuyên nghiệp!"

~ affinity_trieu_van += 15

-> assassin_aftermath

=== assassin_self_dodge ===
# ACTORS: qui_binh_an|right|rolling, assassin|center|attacking

Quý Bình An xoay người ngã nhào ra sau bức bình phong gỗ lim, lưỡi đao độc chém toạc vạt áo!

Thích khách thứ hai vừa vung đao bồi tiếp thì—

# EFFECT: sfx_spear_whoosh
# EFFECT: screen_flash|#C0C0C0|300
# ACTORS: trieu_van|left|battle_stance

Hàn quang lóe lên! Long Đảm Thương của Triệu Vân quét ngang, đánh gãy xương sườn thích khách hất văng ra sân!

~ affinity_trieu_van += 10

-> assassin_aftermath

=== assassin_aftermath ===
# BACKGROUND: bg_pho_ma_phu_courtyard_night
# MUSIC: bgm_investigation
# ACTORS: qui_binh_an|right|serious, trieu_van|left|reporting

Triệu Vân xốc ngược cánh tay thích khách: "Bọn chúng đều cắn vỡ độc hoàn tự sát. Nhưng trên cổ tay có ấn triện hình đầu sói — đây là mật vụ thuộc Phi Báo Quân của Bắc Cương!"

Hắn nhìn Quý Bình An trầm trọng: "Chúa Công, có kẻ trong triều cấu kết với phiên trấn phương Bắc muốn trừ khử ngài."

* [Ẩn Nhẫn · Xóa sạch dấu vết: "Bí mật chôn xác, dĩ bất biến ứng vạn biến, âm thầm truy vết kẻ chủ mưu."]
  ~ suspicion -= 10
  ~ gold += 2000
  ch10_method = "hide"
  -> chapter_10_complete

* [Hoành Đao · Đối chất triều đình: "Đem xác ném trước mặt trăm quan, bức kẻ giấu mặt phải lộ sơ hở!"]
  ~ suspicion += 20
  ~ gold += 5000
  ch10_method = "confront"
  -> chapter_10_complete

* [Quân Cơ · Thám thính biên cương: "Sát thủ mang dấu vết phương Bắc, lập tức sai thám mã cấp báo tiền tuyến!"]
  ~ suspicion += 5
  ch10_method = "investigate"
  -> chapter_10_complete

=== chapter_10_complete ===
* [Quyết Sách · Chờ đợi thời cơ: "Kinh đô đã là lò lửa, chỉ có nắm lấy binh quyền mới mong bảo toàn gia tộc!"]
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

Đại điện Kim Loan sớm hôm sau. Vũ Hoàng ngự trên ngai vàng, sắc diện ngập tràn phẫn nộ:

"Bắc Cương phản nghịch! Phi Báo Quân liên kết với nghịch tặc Địch Hỏa công hãm ba huyện, chém chết quan trấn thủ, uy hiếp kinh kỳ!"

Vũ Hoàng rút ra Thượng Phương Bảo Kiếm, ánh mắt dừng lại trên người Quý Bình An:

"Quý Bình An! Phụ thân ngươi từng trấn thủ phương Bắc, ngươi lại có dũng khí phi thường. Trẫm lệnh ngươi tiếp nhận chức Chinh Bắc Tiền Phong Tướng Quân, lập tức xuất chinh dẹp loạn!"

# EFFECT: screen_flash|#FFD700|500
# EFFECT: sfx_imperial_decree

~ unlocked_map = true
~ imperial_prestige += 1
~ gold += 5000
~ jade += 20

# EFFECT: show_toast|🎉 KHAI MỞ: Tầng 2 — Sơn Hà Sa Bàn (Grand Strategy)|unlock
# EFFECT: unlock_feature|de_nghiep_sa_ban

[THIÊN CƠ HỆ THỐNG]: Khai mở Tầng 2 — Sơn Hà Sa Bàn! Cho phép điều binh khiển tướng, bố trí quân lương và tuần tra các cứ điểm trọng yếu.

* [Quân Cơ · Tiếp nhận Hổ Phù: "Thần Quý Bình An lĩnh chỉ! Ắt sẽ san bằng Bắc Cương, lập nên phòng tuyến bất khả xâm phạm!"]
  ~ suspicion += 5
  ~ affinity_trieu_van += 5
  
  Quý Bình An quỳ nhận Hổ Phù bằng đồng, ánh mắt sáng rực.
  
  Bên cạnh hắn, Triệu Tử Long nắm chặt chuôi thương — đại thời đại tranh bá chính thức bắt đầu!
  
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 15: Tiếp Nhận Thánh Chỉ Bắc Chinh|milestone
  # EFFECT: chapter_complete|15
  -> chapter_20_start
