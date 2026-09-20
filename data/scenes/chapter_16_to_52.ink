// ============================================================
// Trấn Quốc Phò Mã Gia — Ink Scene Script
// Phần 2: Từ Chương 16 đến Chương 52 (Hồi 1 Hoàn Tất)
// ============================================================
// Biên soạn theo chuẩn mực văn học cổ phong & Ink scripting
// Tham chiếu: narrative-scene-scripting & game-systems-architect
// ============================================================

// ============================================================
// CHƯƠNG 20: BIÊN CƯƠNG TUYẾN ĐẦU & HÃM TRẬN DOANH (CAO THUẬN)
// ============================================================

=== chapter_20_start ===
# CHAPTER_TITLE: Hồi 6 · Chương 20: Hãm Trận Dũng Sĩ Biên Cương
# BACKGROUND: bg_northern_border_camp
# MUSIC: bgm_military_march
# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard, gao_shun|left|stern

~ chapter = 20

Gió lạnh phương Bắc gào thét qua ải Nhạn Môn, cuốn theo cát bụi sương mù mịt mù.

Quý Bình An khoác chiến bào đứng trên vọng lâu tiền tiêu quân doanh Bắc Cương. Sau lưng hắn, Triệu Tử Long uy dũng khôi giáp, Long Đảm Thương cắm thẳng bên bàn cờ sa bàn.

Phía đối diện, một vị chiến tướng khoác hắc giáp nặng trĩu, phong trần sương gió, nét mặt nghiêm cẩn tựa như tảng đá ngàn năm, hai tay ôm quyền thi lễ:

"Bắc Cương tiền phong thống lĩnh Cao Thuận, bái kiến Phò mã đại tướng quân!"

# EFFECT: sfx_armor_clank

Quý Bình An nhìn sâu vào vị dũng tướng trước mắt:

Cao Thuận — thống soái Hãm Trận Doanh nức tiếng Tam Quốc, tám trăm dũng sĩ cảm tử trang bị giáp trụ tinh lương, mỗi trận xông pha đều bạt núi phá lũy, tính tình trầm mặc thanh liêm, tuyệt đối không vướng bụi trần.

* [Quân Cơ] Thăm hỏi tình hình quân nhu: "Cao tướng quân bình thân! Quân sĩ tiền tuyến trang bị và quân lương hiện thời ra sao?"
  Cao Thuận trầm giọng bẩm báo: "Bẩm Phò mã, chiến giáp hư hại bốn phần, lương thảo triều đình cấp phát trễ hai tháng. Nhưng tám trăm huynh đệ Hãm Trận Doanh thề chết giữ vững cửa ải, quyết không lùi nửa bước!"
  
  -> gao_shun_decision

* [Tri Kỷ] Khen ngợi khí phách dũng liệt: "Danh chấn Hãm Trận Doanh bách chiến bách thắng, hôm nay diện kiến quả không phụ danh xưng!"
  Cao Thuận ánh mắt khẽ rung động, cúi đầu tạ ơn: "Mạt tướng chỉ tận trung báo quốc, bảo hộ bình yên cho vạn dân trăm họ."
  
  ~ affinity_gaoshun += 10
  -> gao_shun_decision

=== gao_shun_decision ===
# SCENE_TYPE: choice

Quý Bình An mở rương bạc vàng — đây chính là nguồn lợi nhuận kếch xù thu hoạch từ việc kinh doanh Thấu Hoa Cao tại kinh thành.

* [Kinh Tài] Dốc 5.000 Vàng rèn đúc chiến giáp: "Xuất ngân quỹ cá nhân, mở lò rèn đúc giáp khiên thép tôi tốt nhất cho Hãm Trận Doanh!"
  ~ gold -= 5000
  ~ affinity_gaoshun += 25
  ~ unlocked_granary = true
  
  Quý Bình An vung tay hạ lệnh: "Mở lò rèn suốt ngày đêm! Tám trăm dũng sĩ Hãm Trận Doanh phải được trang bị hắc giáp và thuẫn thép cứng cáp nhất!"
  
  Cao Thuận quỳ rạp xuống nền đá, giọng nói nghẹn ngào chấn động: "Mạt tướng thay mặt tám trăm huynh đệ, thề đem tính mạng báo đáp ân tri ngộ của Phò mã gia!"
  
  # EFFECT: show_toast|🎉 MỞ KHÓA THẺ BÀI: Hãm Trận Doanh (SSR Thuẫn Vệ)|unlock
  # EFFECT: unlock_feature|feature_ham_tran_doanh
  
  -> chapter_20_complete

* [Quân Cơ] Kết hợp chiến thuật Kỵ - Bộ: "Triệu Tử Long dẫn Bạch Mã Kỵ phối hợp Hãm Trận Doanh luyện thế bọc sườn chặn đầu!"
  ~ affinity_gaoshun += 15
  ~ affinity_trieu_van += 15
  
  Triệu Vân tuốt gươm hưởng ứng: "Chúa Công nhìn xa trông rộng! Kỵ binh tập kích mạn sườn, bộ binh thiết giáp chặn đầu, kẻ địch ắt tan như tro bụi!"
  
  # EFFECT: show_toast|⚔️ Sĩ Khí Ba Quân Tăng Cao (+20% Uy Lực Bộ Kỵ)|buff
  
  -> chapter_20_complete

=== chapter_20_complete ===
* [Quân Cơ] Tiến quân về thung lũng Hắc Phong: "Thiết giáp Hãm Trận và kỵ binh Tử Long đã hợp nhất, lập tức nhổ trại tiến quân!"
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 20: Thu Phục Cao Thuận & Hãm Trận Doanh|milestone
  # EFFECT: chapter_complete|20
  -> chapter_27_transition

// ============================================================
// CHƯƠNG 27: ĐỘC SĨ GIẢ HỦ XUẤT THẾ (MƯU KHÁCH PHỦ)
// ============================================================

=== chapter_27_transition ===
# CHAPTER_TITLE: Hồi 7 · Chương 27: Độc Sĩ Giả Hủ Hiến Kế
# BACKGROUND: bg_advisor_tent_night
# MUSIC: bgm_dark_schemes
# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious

~ chapter = 27

Đêm khuya tại mật trướng soái phủ. Ánh đuốc bập bùng soi rọi tấm địa đồ sông Hoài Hà và Thanh Thủy.

Một bóng người trung niên khoác trường bào màu xám tro chậm rãi bước vào. Đôi mắt thâm sâu như đầm lầy vạn trượng, nụ cười nửa miệng như thấu suốt mọi mưu mô nhân gian:

"Thảo dân Giả Hủ, tự Văn Hòa, bái kiến Phò mã gia."

# EFFECT: sfx_whisper

~ met_gia_hu = true

Quý Bình An khẽ chấn động: "Giả Hủ? Độc Sĩ Giả Hủ mưu định Tam Quốc?!"

Giả Hủ khẽ cười nâng tay áo: "Phò mã gia nhận ra thảo dân sao? Thảo dân quả nhiên không chọn lầm minh chủ."

Hắn bước tới bên sa bàn, ngón tay gầy gò điểm thẳng vào khúc quanh hiểm trở của sông Thanh Thủy:

"Nghịch tặc Địch Hỏa đã bí mật liên kết thổ phỉ Bắc Cương, toan tính nội trong ba ngày sẽ vây khốn quân doanh Phò mã tại hẻm núi Hắc Phong. Nếu Phò mã dùng binh pháp thông thường, mười phần chết chín."

* [Thăm Dò] Nghiêm túc thỉnh giáo mưu lược: "Văn Hòa tiên sinh đã đến, xin chỉ điểm cho ta kế sách phá vòng vây!"
  Giả Hủ cười lạnh: "Kế sách có ba đường. Nhưng còn tùy Phò mã muốn làm 'Nhân Quân' cứu người, hay muốn làm 'Bá Chủ' đoạt thiên hạ."
  
  -> jia_xu_stratagem_choice

=== jia_xu_stratagem_choice ===
# SCENE_TYPE: choice

Giả Hủ từ tốn mở tấm lụa mật đồ:

* [Độc Kế] Nhử địch vào tử địa hẻm núi, dùng hỏa dược và tên độc tiêu diệt hoàn toàn
  ~ suspicion += 15
  ~ affinity_gia_hu += 25
  ~ gold += 20000
  
  Quý Bình An ánh mắt sắc lạnh: "Dùng độc kế! Trong chiến trận, nhân từ với kẻ địch chính là tàn nhẫn với tướng sĩ của mình!"
  
  Giả Hủ khen ngợi: "Quyết đoán phi thường! Giả vờ vứt bỏ doanh trại, nhử năm vạn quân địch chen chúc vào hẻm núi rồi chặn hai đầu phóng hỏa. Không một tên nào sống sót trở về!"
  
  # EFFECT: show_toast|🔥 MỞ KHÓA MƯU KẾ: Hỏa Công Bẫy Độc (Giả Hủ)|unlock
  # EFFECT: unlock_feature|feature_poison_stratagem
  
  -> chapter_27_complete

* [Phản Gián] Tung mật thư giả ly gián tướng soái địch tự sát hại lẫn nhau
  ~ gold -= 3000
  ~ affinity_gia_hu += 20
  ~ suspicion -= 5
  
  "Dùng mưu phản gián, cho nội gián mang mật thư giả mua chuộc phó tướng Nam Ly, khiến chúng nghi kỵ tương tàn."
  
  Giả Hủ vuốt râu: "Mượn đao giết người không dính máu, bảo toàn sinh lực ba quân."
  
  # EFFECT: show_toast|📜 MỞ KHÓA THẺ BÀI: Phản Gián Kế & Ly Gián Kế|unlock
  # EFFECT: unlock_feature|feature_counter_espionage
  
  -> chapter_27_complete

* [Vương Đạo] Đích thân dẫn chủ lực tập kích chính diện bắt sống tướng địch
  ~ affinity_trieu_van += 20
  ~ affinity_gia_hu += 5
  ~ suspicion -= 10
  
  "Tử Long xông pha bắt sống đầu sỏ, phân hóa quân giặc, khoan dung cho hàng binh."
  
  Triệu Vân từ ngoài bước vào, hào khí ngút trời: "Chúa Công nhân đức, Tử Long nguyện đạp bằng vạn quân bắt sống Địch Hỏa!"
  
  -> chapter_27_complete

=== chapter_27_complete ===
* [Quân Cơ] Triển khai mưu lược Giả Hủ: "Lệnh cho toàn quân tuyệt đối giữ bí mật, đêm nay lập tức di chuyển trận địa!"
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 27: Độc Sĩ Giả Hủ Hiến Kế|milestone
  # EFFECT: chapter_complete|27
  -> chapter_35_transition

// ============================================================
// CHƯƠNG 35: ĐẠI KẾ THỦY CÔNG DÒNG THANH THỦY
// ============================================================

=== chapter_35_transition ===
# CHAPTER_TITLE: Hồi 8 · Chương 35: Đại Kế Thủy Công Dòng Thanh Thủy
# BACKGROUND: bg_thanh_thuy_river_dam
# MUSIC: bgm_river_roaring
# ACTORS: qui_binh_an|right|observing, jia_xu|left|pointing, trieu_van|right|standing_guard

~ chapter = 35

Mùa mưa phương Bắc trút nước như thác đổ. Dòng sông Thanh Thủy đỏ ngầu phù sa cuộn sóng gầm thét như rồng lội.

Quý Bình An cùng Giả Hủ đứng trên đỉnh đập đất thượng nguồn ngắm nhìn hạ lưu.

Hạ lưu ba mươi dặm chính là tòa thành cổ Thanh Châu — sào huyệt kiên cố nhất của năm vạn phản quân do nghịch tướng Địch Hỏa trấn giữ.

Giả Hủ chỉ xuống dòng nước xiết cuồn cuộn:

"Chúa Công, mưa lớn kéo dài. Nếu ta đắp đập ngăn sông bảy ngày, đợi lũ thượng nguồn dâng cao rồi bất thần xả đập..."

Đôi mắt Độc Sĩ ánh lên vẻ tàn khốc:

"...toàn bộ chiến xa, quân doanh và thành lũy của Địch Hỏa sẽ chìm trong biển nước. Một trận định càn khôn!"

# EFFECT: sfx_thunder_distant

* [Thăm Dò] Cân nhắc thế trận hạ lưu: "Đắp đập chặn dòng nước dữ, thế nước liệu có đủ sức san bằng lũy thép Thanh Châu?"
  Giả Hủ khẳng định: "Sức nước ngàn cân, lũ quét từ trên cao giáng xuống có thể nghiền nát cả cổng thành bằng đồng đúc!"
  
  -> flood_preparation_choice

=== flood_preparation_choice ===
# SCENE_TYPE: choice

* [Nhân Nghĩa] Bí mật di tản dân lành hạ lưu trước ba ngày: "Muốn thắng giặc nhưng không giẫm lên xương máu bách tính vô tội!"
  ~ gold -= 3000
  ~ affinity_trieu_van += 25
  ~ suspicion -= 10
  ~ unlocked_flood = true
  
  Quý Bình An quả quyết: "Ta muốn lập công, nhưng tuyệt đối không biến vạn dân vô tội thành mồi cho cá bèo! Xuất 3.000 Vàng, lệnh cho Tử Long cải trang kỵ binh thành đoàn buôn, âm thầm di dời toàn bộ thôn làng hạ lưu lên gò cao!"
  
  Triệu Vân xúc động ôm quyền: "Chúa Công lấy đức phục nhân, Tử Long dù thức trắng ba đêm cũng quyết hộ tống bá tánh an toàn!"
  
  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Xả Lũ Sông Thanh Thủy (Tầng 3 Combat)|unlock
  # EFFECT: unlock_feature|feature_water_stratagem
  
  -> chapter_35_complete

* [Bá Đạo] Bất ngờ xả lũ ngay trong đêm mưa bão: "Binh quý thần tốc! Đập vỡ thác tràn, hủy diệt toàn bộ chiến xa của địch!"
  ~ suspicion += 20
  ~ affinity_gia_hu += 20
  ~ unlocked_flood = true
  
  "Địch Hỏa quỷ quyệt, nếu sơ hở ắt mất đại cục. Khóa chặt mọi ngả đường, đúng giờ Tý phá đập!"
  
  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Bạo Lũ Phá Đập (Sát Thương Chí Mạng)|unlock
  # EFFECT: unlock_feature|feature_water_stratagem
  
  -> chapter_35_complete

=== chapter_35_complete ===
* [Quân Cơ] Chốt giữ thượng nguồn: "Bố trí tử sĩ canh giữ van xả lũ, chờ thời khắc quyết chiến phát lệnh công thành!"
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 35: Đại Kế Thủy Công Dòng Thanh Thủy|milestone
  # EFFECT: chapter_complete|35
  -> chapter_43_transition

// ============================================================
// CHƯƠNG 43: VẠN THẠCH QUÂN LƯƠNG TIỀN TUYẾN
// ============================================================

=== chapter_43_transition ===
# CHAPTER_TITLE: Hồi 9 · Chương 43: Vạn Thạch Quân Lương Tiền Tuyến
# BACKGROUND: bg_granary_depot
# MUSIC: bgm_logistics_busy
# ACTORS: qui_binh_an|right|armored, gao_shun|left|reporting

~ chapter = 43

Hàng trăm cỗ xe ngựa chở đầy bao tải quân lương nối đuôi nhau rầm rộ tiến vào tổng hành dinh Bắc Cương.

Cao Thuận cầm thẻ trúc kiểm kê, ánh mắt lộ vẻ hân hoan hiếm thấy:

"Khởi bẩm Phò mã gia! Toàn bộ năm vạn hộc lương thực thu mua từ các thương hội lớn đã vận chuyển nhập kho an toàn. Kho lương hiện tại đủ cung ứng cho mười vạn quân trong suốt một năm!"

# EFFECT: sfx_cheer_soldiers

~ rations += 50000
~ jade += 10

Quý Bình An phóng tầm mắt nhìn kho lương ngút ngàn:

"Binh mã chưa động, lương thảo đi trước. Có kho lương này làm hậu thuẫn, tướng sĩ vững lòng như bàn thạch!"

* [Quân Cơ] Trích lương úy lạo ba quân: "Thưởng rượu thịt cho tướng sĩ giữ ải, trích lương cứu giúp nạn dân lưu lạc!"
  ~ gold -= 2000
  ~ affinity_gaoshun += 15
  ~ affinity_trieu_van += 15
  
  "Ban thưởng rượu thịt cho toàn quân! Trích năm ngàn hộc lương cứu đói cho bá tánh chạy loạn!"
  
  Tiếng tung hô của vạn quân vang dội núi rừng, sĩ khí đạt mức cực hạn!
  
  # EFFECT: show_toast|🌾 QUÂN LƯƠNG ĐẠT 50.000 HỘC — Sĩ Khí Ba Quân Cực Hạn|reward
  
  -> chapter_43_complete

=== chapter_43_complete ===
* [Quyết Sách] Dàn trận dưới chân thành Thanh Châu: "Lương thảo sung túc, ba quân sĩ khí ngút trời, nghênh tiếp chiến dịch cuối cùng!"
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 43: Vạn Thạch Quân Lương Tiền Tuyến|milestone
  # EFFECT: chapter_complete|43
  -> chapter_48_transition

// ============================================================
// CHƯƠNG 48-52: ĐẠI CHIẾN THANH CHÂU & KHẢI HOÀN HỒI TRIỀU
// ============================================================

=== chapter_48_transition ===
# CHAPTER_TITLE: Hồi 10 · Chương 48-52: Khúc Tráng Ca Thanh Châu — Đại Phá Địch Hỏa
# BACKGROUND: bg_thanh_chau_fortress_siege
# MUSIC: bgm_epic_final_battle
# ACTORS: qui_binh_an|right|battle_armor, trieu_van|right|spear_ready, gao_shun|left|shield_wall, jia_xu|left|observing

~ chapter = 48

Thành Thanh Châu rung chuyển dữ dội dưới làn mưa tên bốc lửa và đá tảng ném công thành.

Dưới chân thành, năm vạn phản quân do dũng tướng Địch Hỏa chỉ huy dàn trận đen kịt như sóng thần. Mười cỗ Xe Đục Thành bọc thép dày ầm ầm húc thẳng vào cổng thành chính!

# EFFECT: camera_shake|0.9
# EFFECT: sfx_siege_ram_hit

Địch Hỏa vung thanh Bạo Liệt Đao gầm vang: "Quý Bình An! Hôm nay ta sẽ san phẳng Thanh Châu, lấy đầu ngươi tế cờ!"

Quý Bình An đứng uy nghiêm trên đỉnh thành, áo choàng đỏ tung bay trong bão gió. Bên cạnh, Triệu Tử Long Long Đảm Thương rực sáng, Cao Thuận lập khiên trận Hãm Trận Doanh, Giả Hủ cầm cờ hiệu lệnh.

"Tướng sĩ Đại Vũ! Hôm nay là ngày định đoạt vận mệnh non sông!"

# EFFECT: screen_flash|#FFD700|600

* [Quyết Chiến] Minh kim khởi chiến: "Ba quân nghe lệnh! Giương cao chiến kỳ Đại Vũ, quyết một trận tử chiến cùng Địch Hỏa!"
  # EFFECT: trigger_battle|battle_ch48_thanh_chau
  -> thanh_chau_epic_battle

=== thanh_chau_epic_battle ===
# BACKGROUND: bg_thanh_chau_aftermath
# MUSIC: bgm_triumph_sunrise
# ACTORS: qui_binh_an|right|triumphant, trieu_van|right|bowing, gao_shun|left|kneeling, jia_xu|left|satisfied

Đúng thời khắc nguy nan, cờ hiệu xả lũ phất lên!

Nước sông Thanh Thủy như ngàn con rồng cuộn trào ập xuống thung lũng, nhấn chìm toàn bộ chiến xa đục thành của địch!

Triệu Tử Long tung người xuống ngựa, đơn thương độc mã xông thẳng vào vòng vây bắt sống Địch Hỏa giữa dòng nước xiết!

# EFFECT: sfx_victory_fanfare
# EFFECT: screen_flash|#FFFFFF|1000

Năm vạn phản quân tan rã hoàn toàn. Chiến kỳ Đại Vũ bay ngạo nghễ trên đỉnh ải Thanh Châu!

~ gold += 20000
~ rations += 50000
~ imperial_prestige += 2
~ suspicion -= 15

Triệu Vân áp giải Địch Hỏa quỳ trước soái kỳ: "Khởi bẩm Chúa Công, phản tướng Địch Hỏa đã quy phục! Toàn cõi Bắc Cương đã quét sạch bóng giặc!"

Cao Thuận lau vết máu trên khiên: "Tám trăm huynh đệ Hãm Trận Doanh không một ai phụ bạc quân lệnh!"

Giả Hủ vuốt râu mỉm cười: "Chiến báo hỏa tốc đã truyền về kinh thành. Vũ Hoàng phen này tất phải phong vương ban thưởng!"

* [Khải Hoàn] Ban lệnh ban sư hồi triều: "Bắc Cương đại định, khói lửa tan biến! Toàn quân khải hoàn trở về kinh kỳ báo công!"
  -> season_1_finale

=== season_1_finale ===
# BACKGROUND: bg_imperial_hall_golden
# MUSIC: bgm_imperial_grandeur
# ACTORS: vu_hoang|center|impressed, qui_binh_an|right|kneeling_hero

Kinh đô Kim Loan Điện rợp cờ hoa gấm vóc đón mừng đoàn quân Chinh Bắc khải hoàn.

Vũ Hoàng đích thân rời khỏi Cửu Long Bảo Tọa, bước xuống thềm ngọc đỡ lấy hai tay Quý Bình An:

"Trẫm quả nhiên không nhìn lầm ngươi! Từ một phò mã hàn vi, ngươi đã lập nên chiến công cái thế ngút trời cho Đại Vũ triều!"

"Truyền chỉ trẫm! Thăng phong Quý Bình An làm CHINH BẮC ĐẠI TƯỚNG QUÂN, ban kim ấn tử thụ, thống lĩnh mười vạn cấm quân!"

# EFFECT: screen_flash|#FFD700|1200
# EFFECT: sfx_gong_ancient

[THIÊN CƠ HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ!
[THIÊN CƠ HỆ THỐNG]: Hoàn thành toàn vẹn HỒI 1 (Chương 1 ➔ Chương 52)!
[THIÊN CƠ HỆ THỐNG]: Mở khóa tôn hiệu: Chinh Bắc Đại Tướng Quân. Uy danh triều đình đạt Cấp 4!

* [Đế Nghiệp] Khắc ghi chiến công vào sử sách: "Đây chỉ là khởi đầu của con đường định đoạt giang sơn thiên hạ!"
  # EFFECT: show_toast|🏆 TOÀN BỘ HỒI 1 ĐẠI KHẢI HOÀN (CHƯƠNG 1 - 52)!|triumph
  # EFFECT: chapter_complete|52
  -> END
