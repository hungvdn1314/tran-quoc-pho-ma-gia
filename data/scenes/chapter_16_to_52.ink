// ============================================================
// Trấn Quốc Phò Mã Gia — Ink Scene Script
// Phần 2: Từ Chương 16 đến Chương 52 (Hồi 1 Hoàn Tất)
// ============================================================

// ============================================================
// CHƯƠNG 17-21: VẠN KIM MƯU SĨ MÃ TẮC & CAO NÂNG MÃ TẮC
// ============================================================

=== chapter_20_start ===
# CHAPTER_TITLE: Hồi 6 · Chương 17-21: Vạn Kim Mưu Sĩ Mã Tắc
# BACKGROUND: bg_northern_border_camp
# MUSIC: bgm_military_march
# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard

~ chapter = 20

Gió lạnh phương Bắc gào thét qua ải Nhạn Môn, cuốn theo cát bụi mịt mù ngoài quan ải.

Quý Bình An khoác chiến bào đứng trong soái trướng tiền tiêu Bắc Cương. Sau lưng hắn, Triệu Tử Long uy dũng khôi giáp, Long Đảm Thương cắm thẳng bên bàn sa bàn.

Nguồn hoàng kim thu hoạch từ việc kinh doanh Thấu Hoa Cao tại Thiên Kim Lâu nay đã tích lũy hơn một vạn lượng!

Quý Bình An lập tức câu thông Thiên Cơ:

[THIÊN CƠ HỆ THỐNG]: Khởi động Bái Tướng Thần Đàn — Tiêu hao 1 Vạn Kim triệu hoán Mưu Thần!

# EFFECT: screen_flash|#FFD700|700
# EFFECT: sfx_gong_ancient
# EFFECT: camera_shake|0.6

Kim quang vạn đạo rực sáng giữa soái trướng! Trận đồ Bát Quái bốc lên từng hồi linh khí chấn động càn khôn!

[THIÊN CƠ HỆ THỐNG]: Chúc mừng ký chủ thành công triệu hoán Vạn Kim Mưu Sĩ: Mã Tắc (Mã Ấu Thường)!

# EFFECT: summon_grand_reveal|hero_matac

# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard, ma_tac|left|scholarly

Kim quang tan biến, một vị thanh niên văn sĩ tuấn tú, mình khoác thanh bào nho nhã, tay ôm thẻ tre binh thư bước ra từ trận đồ linh khí, khom mình hành lễ:

"Thuộc hạ Mã Tắc, tự Ấu Thường, bái kiến Chúa Công!"

~ affinity_matac = 50

Quý Bình An bước tới đỡ Mã Tắc dậy, ôn tồn hỏi: "Ấu Thường tinh thông binh thư, nay Bắc Cương khói lửa, ngươi có mưu kế gì phá địch?"

Mã Tắc mở tung thẻ tre, ánh mắt sáng rực, đàm luận thao thao bất tuyệt:

"Khởi bẩm Chúa Công! Binh pháp có vân: 'Dĩ địa hình vi phụ, liêu địch chế thắng'. Bắc Cương núi non hiểm trở, nếu ta dẫn đại quân đóng trại trên đỉnh núi cô lập cao nhất, mượn thế trên cao nhìn xuống, địch quân ắt không dám tiến, khi chúng mỏi mệt ta ùa xuống tất đại thắng!"

Triệu Vân khẽ nhíu mày. Quý Bình An nghe xong thầm rùng mình trong bụng:

'Quả nhiên là Mã Tắc! Lý thuyết binh pháp đầy ắp trong đầu, nhưng nếu thực sự giao binh quyền cho hắn lâm trận, e rằng lại tái hiện thảm cảnh Nhai Đình năm xưa!'

Đúng lúc này, thám mã phi vào cấp báo: "Báo! Vũ Hoàng ban chỉ phong Tô Vân làm Bắc Chinh Tướng Quân mang theo 3 vạn quân cùng tiến về phương Bắc, danh nghĩa phối hợp nhưng thực chất là giám sát và tranh đoạt quân công của Chúa Công!"

Ánh mắt Quý Bình An bỗng lóe lên tia sáng giảo hoạt — kế sách 'Cao Nâng Mã Tắc' lập tức thành hình!

-> ma_tac_decision

=== ma_tac_decision ===
# SCENE_TYPE: choice

* [Quyền Mưu · Kế Sách "Cao Nâng Mã Tắc": Khen Mã Tắc lên mây, xin Miễn Tử Lệnh và gài sang làm quân sư cho Tô Vân!]
  ~ suspicion -= 5
  ~ gold += 5000
  Quý Bình An vỗ tay cười lớn: "Ấu Thường quả là bậc kỳ tài kinh thiên vĩ địa! Mưu kế đóng quân trên núi này quá đỗi siêu phàm!"
  Hắn lập tức viết tấu chương dâng lên Vũ Hoàng khen ngợi Mã Tắc hết lời, xin ban Miễn Tử Lệnh cho Mã Tắc, rồi nhiệt tình tiến cử Mã Tắc sang làm đại quân sư bên cạnh Tô Vân!
  Tô Vân mừng rỡ thu nạp, răm rắp làm theo mưu kế 'đóng quân trên cao' của Mã Tắc. Quả nhiên quân Tô Vân bị phản quân Nam Ly cắt đứt đường nước bao vây sa lầy, hoàn toàn mất đi thế chủ động!
  Quý Bình An ung dung nắm toàn bộ thế cờ Bắc Cương mà không tốn nửa mũi tên!
  # EFFECT: show_toast|[ 策 ] MỞ KHÓA MƯU KẾ: Cao Nâng Mã Tắc & Phản Gián Tô Vân|unlock
  # EFFECT: unlock_feature|feature_ma_tac
  -> chapter_20_complete

* [Nội Chính · Khai Thác Sở Trường: Giao cho Mã Tắc phụ trách tu bổ và củng cố thành phòng Liễu Châu!]
  ~ gold -= 2000
  ~ rations += 10000
  Quý Bình An biết Mã Tắc rất giỏi tính toán công sự và kiến trúc quân sự, liền hạ lệnh:
  "Ấu Thường, Liễu Châu là yết hầu hậu phương của đại quân. Ta giao cho ngươi toàn quyền đốc thúc đào hào, đắp lũy kiên cố, biến Liễu Châu thành pháo đài thép bất khả xâm phạm!"
  Mã Tắc cảm kích dốc hết tâm lực ngày đêm, hoàn thành xuất sắc công tác phòng ngự vững chắc thành trì hậu phương!
  # EFFECT: show_toast|[ 策 ] MỞ KHÓA THẺ BÀI: Binh Thư Thao Lược & Tu Bổ Thành Phòng|unlock
  # EFFECT: unlock_feature|feature_ma_tac
  -> chapter_20_complete

=== chapter_20_complete ===
Thế cờ phân hóa đã định, Quý Bình An nắm trọn quyền chủ động tiến quân về Bắc Cảnh, chuẩn bị tuyển mộ tân binh trung thành!

# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 17-21: Vạn Kim Mưu Sĩ Mã Tắc|milestone
# EFFECT: chapter_complete|20

-> chapter_27_transition

// ============================================================
// CHƯƠNG 27: HỐ VŨ HOÀNG 20 VẠN VÀNG & TRIỆU HOÁN ĐỘC SĨ GIẢ HỦ
// ============================================================

=== chapter_27_transition ===
# CHAPTER_TITLE: Hồi 7 · Chương 27: Triệu Hoán Độc Sĩ Giả Hủ
# BACKGROUND: bg_pho_ma_phu_secret_room
# MUSIC: bgm_dark_schemes
# ACTORS: qui_binh_an|right|thoughtful, trieu_van|right|standing_guard

~ chapter = 27

Đêm khuya tại mật thất phò mã phủ.

Quý Bình An vừa hoàn tất một vố lừa ngoạn mục hố Vũ Hoàng và triều đình chi trọn 20 vạn lượng hoàng kim (200.000 Vàng) để chuộc lấy quân công cho Thập Tam Hoàng Tử và tiếp quản Huyết Y Doanh.

Trước mắt hắn, đống vàng rực rỡ xếp cao như núi.

Quý Bình An xuất 10 vạn kim kích hoạt thiên phú đặc thù "Dũng Giả Vô Sợ" cho Triệu Vân, tăng thêm mười điểm chiến lực vượt ngưỡng trăm, đạt tới Hoàng Cảnh đỉnh phong!

Hắn nhìn số hoàng kim còn lại, trong mắt ánh lên tia sáng dã tâm:

"Tử Long, canh giữ ngoài cửa phòng! Tuyệt đối không cho phép bất kỳ ai bước vào!"

Triệu Vân nghiêm cẩn chắp tay: "Mạt tướng tuân mệnh!"

Quý Bình An một mình trong phòng kín, ấn mở Bái Tướng Thần Đàn, chọn mục [TRIỆU HOÁN TUYỆT THẾ MƯU THẦN - 10 VẠN KIM]!

# EFFECT: screen_flash|#FFD700|1000
# EFFECT: sfx_gong_ancient
# EFFECT: camera_shake|0.7

[THIÊN CƠ HỆ THỐNG]: Tiêu hao 10 vạn lượng hoàng kim! Địa mạch chấn động, Càn Khôn nghịch chuyển!
[THIÊN CƠ HỆ THỐNG]: Chúc mừng ký chủ triệu hoán Tuyệt Thế Mưu Thần thành công — Độc Sĩ Giả Hủ (Cổ Hủ)!

# EFFECT: summon_grand_reveal|hero_jiaxu

# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious

[THIÊN CƠ BẢNG]: Mưu Thần: Giả Hủ (Văn Hòa) · Trí Lực: 92 · Độ Trung Thành: 80 · Kỹ Năng: Độc Tâm (Kế càng độc xác suất thành công càng cao) · Ẩn chứa Phản Cốt!

Giữa luồng khói đen pha lẫn ánh kim quang, một bóng người trung niên khoác trường bào màu xám tro chậm rãi ngưng hình. Diện mạo bình dị tựa như một hàn nho tay trói gà không chặt, nhưng đôi mắt thâm sâu như đầm lầy vạn trượng, lạnh lẽo đến thấu tận tim gan.

Giả Hủ khom mình thi lễ:

"Thuộc hạ Cổ Hủ, bái kiến Chúa Công!"

~ met_gia_hu = true
~ affinity_gia_hu = 40

Quý Bình An đáy lòng chấn động: "Độc Sĩ Giả Hủ! Kẻ tính toán không bỏ sót một nước cờ thời loạn thế!"

Hắn tiến lên đỡ Giả Hủ: "Được Văn Hòa tương trợ, bình sinh đại nghiệp của ta ắt thành!"

Quý Bình An mở tác chiến đồ Bắc Cương và khúc quanh sông Thanh Thủy: "Văn Hòa, nghịch tặc Địch Hỏa liên kết năm vạn phản quân toan tính vây khốn ba châu, ngươi xem trận này nên phá thế nào?"

Giả Hủ khẽ vuốt chòm râu ngắn, ánh mắt lạnh lùng nhìn vào khúc quanh sông Thanh Thủy:

"Chúa Công, đã là chiến trận thì không có chỗ cho nhân từ. Mưu kế có ba đường, tùy Chúa Công định đoạt."

-> jia_xu_stratagem_choice

=== jia_xu_stratagem_choice ===
# SCENE_TYPE: choice

Giả Hủ từ tốn mở tấm lụa mật đồ:

* [Độc Kế · Nhử địch vào tử địa hẻm núi, dùng hỏa dược và tên độc tiêu diệt hoàn toàn]
  ~ suspicion += 15
  ~ affinity_gia_hu += 25
  ~ gold += 20000
  Quý Bình An ánh mắt sắc lạnh: "Dùng độc kế! Trong chiến trận, nhân từ với kẻ địch chính là tàn nhẫn với tướng sĩ của mình!"
  Giả Hủ khen ngợi: "Quyết đoán phi thường! Giả vờ vứt bỏ doanh trại, nhử năm vạn quân địch chen chúc vào hẻm núi rồi chặn hai đầu phóng hỏa!"
  # EFFECT: show_toast|[ 炎 ] MỞ KHÓA MƯU KẾ: Hỏa Công Bẫy Độc (Giả Hủ)|unlock
  # EFFECT: unlock_feature|feature_poison_stratagem
  -> chapter_27_complete

* [Phản Gián · Tung mật thư giả ly gián tướng soái địch tự sát hại lẫn nhau]
  ~ gold -= 3000
  ~ affinity_gia_hu += 20
  ~ suspicion -= 5
  "Dùng mưu phản gián, cho nội gián mang mật thư giả mua chuộc phó tướng Nam Ly, khiến chúng nghi kỵ tương tàn."
  Giả Hủ vuốt râu: "Mượn đao giết người không dính máu, bảo toàn sinh lực ba quân."
  # EFFECT: show_toast|[ 策 ] MỞ KHÓA THẺ BÀI: Phản Gián Kế & Ly Gián Kế|unlock
  # EFFECT: unlock_feature|feature_counter_espionage
  -> chapter_27_complete

* [Vương Đạo · Đích thân dẫn chủ lực tập kích chính diện bắt sống tướng địch]
  ~ affinity_trieu_van += 20
  ~ affinity_gia_hu += 5
  ~ suspicion -= 10
  "Tử Long xông pha bắt sống đầu sỏ, phân hóa quân giặc, khoan dung cho hàng binh."
  Triệu Vân từ ngoài bước vào, hào khí ngút trời: "Chúa Công nhân đức, Tử Long nguyện đạp bằng vạn quân bắt sống Địch Hỏa!"
  -> chapter_27_complete

=== chapter_27_complete ===
Giả Hủ khẽ ghé tai Quý Bình An hiến kế: "Chúa Công, quân chính quy triều đình đầy rẫy tai mắt Tô gia, khó lòng phó thác sinh tử. Xin Chúa Công tiếp quản toàn bộ tử tù và tân binh nghèo khó ở Bắc Cương, tự tay tôi luyện thành quân đoàn trung thành tuyệt đối!"

Quý Bình An tiếp nhận tân binh, tự tay ban phát áo máu và quân nhu: "Kể từ hôm nay, các ngươi chính là HUYẾT Y DOANH! Theo ta định đoạt càn khôn!"

# EFFECT: show_toast|[ 血 ] SÁNG LẬP QUÂN ĐOÀN: Huyết Y Doanh (Tử Sĩ Áo Máu)|unlock
# EFFECT: unlock_feature|feature_huyet_y_doanh
# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 27-30: Triệu Hoán Giả Hủ & Huyết Y Doanh|milestone
# EFFECT: chapter_complete|27

-> chapter_35_transition

// ============================================================
// CHƯƠNG 35: ĐẠI KẾ THỦY CÔNG DÒNG THANH THỦY
// ============================================================

=== chapter_35_transition ===
# CHAPTER_TITLE: Hồi 8 · Chương 35: Đại Kế Thủy Công Dòng Thanh Thủy
# BACKGROUND: bg_thanh_thuy_river_dam
# AMBIENT: rain
# MUSIC: bgm_river_roaring
# ACTORS: qui_binh_an|right|observing, jia_xu|left|pointing, trieu_van|right|standing_guard

~ chapter = 35

Mùa mưa phương Bắc trút nước như thác đổ. Dòng sông Thanh Thủy đỏ ngầu phù sa cuộn sóng gầm thét như rồng lội.

Quý Bình An cùng Giả Hủ đứng trên đỉnh đập đất thượng nguồn ngắm nhìn hạ lưu. Ba mươi dặm phía trước chính là sào huyệt kiên cố nhất của năm vạn phản quân do Địch Hỏa trấn giữ.

Giả Hủ chỉ xuống dòng nước xiết: "Chúa Công, nếu ta đắp đập ngăn sông bảy ngày, đợi lũ thượng nguồn dâng cao rồi bất thần xả đập, toàn bộ chiến xa và thành lũy của Địch Hỏa sẽ chìm trong biển nước. Một trận định càn khôn!"

-> flood_preparation_choice

=== flood_preparation_choice ===
# SCENE_TYPE: choice

* [Nhân Nghĩa · Bí mật di tản dân lành hạ lưu trước ba ngày: "Muốn thắng giặc nhưng không giẫm lên xương máu bách tính vô tội!"]
  ~ gold -= 3000
  ~ affinity_trieu_van += 25
  ~ suspicion -= 10
  ~ unlocked_flood = true
  Quý Bình An quả quyết: "Ta muốn lập công, nhưng tuyệt đối không biến vạn dân vô tội thành mồi cho cá bèo! Xuất 3.000 Vàng, lệnh cho Tử Long âm thầm di dời toàn bộ thôn làng hạ lưu lên gò cao!"
  Triệu Vân xúc động ôm quyền: "Chúa Công lấy đức phục nhân, Tử Long dù thức trắng ba đêm cũng quyết hộ tống bá tánh an toàn!"
  # EFFECT: show_toast|[ 潮 ] MỞ KHÓA THỦY CÔNG: Xả Lũ Sông Thanh Thủy (Tầng 3 Combat)|unlock
  # EFFECT: unlock_feature|feature_water_stratagem
  -> chapter_35_complete

* [Bá Đạo · Bất ngờ xả lũ ngay trong đêm mưa bão: "Binh quý thần tốc! Đập vỡ thác tràn, hủy diệt toàn bộ chiến xa của địch!"]
  ~ suspicion += 20
  ~ affinity_gia_hu += 20
  ~ unlocked_flood = true
  "Địch Hỏa quỷ quyệt, nếu sơ hở ắt mất đại cục. Khóa chặt mọi ngả đường, đúng giờ Tý phá đập!"
  # EFFECT: show_toast|[ 潮 ] MỞ KHÓA THỦY CÔNG: Bạo Lũ Phá Đập (Sát Thương Chí Mạng)|unlock
  # EFFECT: unlock_feature|feature_water_stratagem
  -> chapter_35_complete

=== chapter_35_complete ===
Bố trí tử sĩ canh giữ van xả lũ thượng nguồn, chờ thời khắc quyết chiến phát lệnh công thành!

# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 35: Đại Kế Thủy Công Dòng Thanh Thủy|milestone
# EFFECT: chapter_complete|35

-> chapter_43_transition

// ============================================================
// CHƯƠNG 43: VẠN THẠCH QUÂN LƯƠNG TIỀN TUYẾN
// ============================================================

=== chapter_43_transition ===
# CHAPTER_TITLE: Hồi 9 · Chương 43: Vạn Thạch Quân Lương Tiền Tuyến
# BACKGROUND: bg_northern_border_camp
# MUSIC: bgm_logistics_busy
# ACTORS: qui_binh_an|right|armored, ma_tac|left|reporting

~ chapter = 43

Hàng trăm cỗ xe ngựa chở đầy bao tải quân lương nối đuôi nhau rầm rộ tiến vào tổng hành dinh Bắc Cương.

Mã Tắc cầm thẻ trúc kiểm kê, ánh mắt lộ vẻ hân hoan hiếm thấy: "Khởi bẩm Chúa Công! Toàn bộ năm vạn hộc lương thực từ Khai Nguyên và hậu phương Liễu Châu đã vận chuyển nhập kho an toàn. Kho lương hiện tại đủ cung ứng cho mười vạn quân trong suốt một năm!"

~ rations += 50000
~ jade += 10
~ gold -= 2000
~ affinity_matac += 15
~ affinity_trieu_van += 15

Quý Bình An ban thưởng rượu thịt cho toàn quân, trích năm ngàn hộc lương cứu đói cho bá tánh chạy loạn. Tiếng tung hô của vạn quân vang dội núi rừng, sĩ khí đạt mức cực hạn!

# EFFECT: show_toast|[ 糧 ] QUÂN LƯƠNG ĐẠT 50.000 HỘC — Sĩ Khí Ba Quân Cực Hạn|reward
# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 43: Vạn Thạch Quân Lương Tiền Tuyến|milestone
# EFFECT: chapter_complete|43

-> chapter_48_transition

// ============================================================
// CHƯƠNG 48-52: ĐẠI CHIẾN THANH CHÂU & KHẢI HOÀN HỒI TRIỀU
// ============================================================

=== chapter_48_transition ===
# CHAPTER_TITLE: Hồi 10 · Chương 48-52: Khúc Tráng Ca Thanh Châu — Đại Phá Địch Hỏa
# BACKGROUND: bg_fortress_battle
# MUSIC: bgm_epic_final_battle
# ACTORS: qui_binh_an|right|battle_armor, trieu_van|right|spear_ready, jia_xu|left|observing

~ chapter = 48

Thành Thanh Châu rung chuyển dữ dội dưới làn mưa tên bốc lửa và đá tảng ném công thành. Dưới chân thành, năm vạn phản quân do dũng tướng Địch Hỏa chỉ huy dàn trận đen kịt như sóng thần. Mười cỗ Xe Đục Thành bọc thép dày ầm ầm húc thẳng vào cổng thành chính!

# EFFECT: camera_shake|0.9
# EFFECT: sfx_siege_ram_hit
# EFFECT: screen_flash|#FFD700|600

Địch Hỏa vung thanh Bạo Liệt Đao gầm vang: "Quý Bình An! Hôm nay ta sẽ san phẳng Thanh Châu, lấy đầu ngươi tế cờ!"

Quý Bình An đứng uy nghiêm trên đỉnh thành, áo choàng đỏ tung bay trong bão gió: "Tướng sĩ Huyết Y Doanh! Đại quân Đại Vũ! Hôm nay là ngày định đoạt vận mệnh non sông! Giương cờ phát lệnh quyết chiến!"

# EFFECT: trigger_battle|battle_ch48_thanh_chau

-> thanh_chau_epic_battle

=== thanh_chau_epic_battle ===
# BACKGROUND: bg_fortress_battle
# MUSIC: bgm_triumph_sunrise
# ACTORS: qui_binh_an|right|triumphant, trieu_van|right|bowing, jia_xu|left|satisfied

Đúng thời khắc nguy nan, dũng sĩ Huyết Y Doanh kết trận liều chết cản phá quân địch trên mặt thành, cờ hiệu xả lũ phất lên!

Nước sông Thanh Thủy như ngàn con rồng cuộn trào ập xuống thung lũng, nhấn chìm toàn bộ chiến xa đục thành của địch! Triệu Tử Long tung người xuống ngựa, đơn thương độc mã xông thẳng vào vòng vây bắt sống Địch Hỏa giữa dòng nước xiết!

# EFFECT: sfx_victory_fanfare
# EFFECT: screen_flash|#FFFFFF|1000

Năm vạn phản quân tan rã hoàn toàn. Chiến kỳ Đại Vũ bay ngạo nghễ trên đỉnh ải Thanh Châu!

~ gold += 20000
~ rations += 50000
~ imperial_prestige += 2
~ suspicion -= 15

Bắc Cương đại định, khói lửa tan biến! Toàn quân khải hoàn trở về kinh kỳ báo công!

-> season_1_finale

=== season_1_finale ===
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_imperial_grandeur
# ACTORS: vu_hoang|center|impressed, qui_binh_an|right|kneeling_hero

Kinh đô Kim Loan Điện rợp cờ hoa gấm vóc đón mừng đoàn quân Chinh Bắc khải hoàn.

Vũ Hoàng đích thân rời khỏi Cửu Long Bảo Tọa, bước xuống thềm ngọc đỡ lấy hai tay Quý Bình An:

"Trẫm quả nhiên không nhìn lầm ngươi! Từ một phò mã hàn vi, ngươi đã lập nên chiến công cái thế ngút trời cho Đại Vũ triều!"

"Truyền chỉ trẫm! Thăng phong Quý Bình An làm CHINH BẮC ĐẠI TƯỚNG QUÂN, ban kim ấn tử thụ, thống lĩnh mười vạn cấm quân!"

# EFFECT: screen_flash|#FFD700|1200
# EFFECT: sfx_gong_ancient

[THIÊN CƠ HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ! Hoàn thành toàn vẹn HỒI 1 (Chương 1 → Chương 52)!
[THIÊN CƠ HỆ THỐNG]: Mở khóa tôn hiệu: Chinh Bắc Đại Tướng Quân. Uy danh triều đình đạt Cấp 4!

Đây chỉ là khởi đầu của con đường định đoạt giang sơn thiên hạ!

# EFFECT: show_toast|[ 捷 ] TOÀN BỘ HỒI 1 ĐẠI KHẢI HOÀN (CHƯƠNG 1 - 52)!|triumph
# EFFECT: chapter_complete|52

-> chapter_53_start
