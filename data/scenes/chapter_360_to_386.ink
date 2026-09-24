// ============================================================================
// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK
// HỒI 7: HỆ THỐNG TRANH BÁ, QUÁCH GIA QUY VỊ & ĐĂNG CƠ HOÀNG ĐẾ (CHƯƠNG 360 - 386)
// ĐẠI KẾT CỤC SEASON 1 (SEASON 1 FINALE)
// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn
// ============================================================================

=== chapter_360_start ===
# CHAPTER_TITLE: Hồi 7 · Chương 360: Hệ Thống Thăng Cấp · Khí Vận Tranh Bá
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_ethereal_void
# ACTORS: qui_binh_an|center|commanding
# EFFECT: screen_flash|#FFD700|2000
# EFFECT: camera_shake|0.8
# EFFECT: sfx_system_chime

Bên trong Bái Tướng Thần Đàn, hư không bỗng ngưng đọng. Một luồng kim quang chói lọi từ chín tầng mây chiếu thẳng xuống linh hồn Quý Bình An!

[THIÊN CƠ HỆ THỐNG]: TÍCH LŨY CHIẾN CÔNG ĐẠT ĐỈNH! HỆ THỐNG CHÍNH THỨC NÂNG CẤP LÊN GIAI ĐOẠN 2: 'TAM QUỐC ANH LINH TRANH BÁ'!
- Hủy bỏ bậc triệu hoán sơ cấp 1.000 vàng.
- Mở khóa các bậc triệu hoán đỉnh cao: 100.000 kim (Tuyệt Thế), 500.000 kim (Thiên Mệnh Mưu Thần), 2.000.000 kim (Thiên Mệnh Võ Tướng - Quan Vũ/Lữ Bố)!
- KÍCH HOẠT HỆ THỐNG ANH LINH ĐIỂM: 1 Điểm = 1 Vàng. Mỗi tiêu diệt một quân địch = +1 điểm; mỗi chiếm một thành = +10.000 điểm!
- ĐIỀU KIỆN TIÊN QUYẾT BẮT BUỘC: Ký chủ phải ĐĂNG CƠ HOÀNG ĐẾ để chuyển đổi toàn bộ lãnh thổ quốc gia thành nguồn cung Anh Linh Điểm vô tận!

# EFFECT: show_toast|[ 戈 ] HỆ THỐNG NÂNG CẤP: Kích Hoạt Anh Linh Điểm & Cơ Chế Tranh Bá!|system
# EFFECT: unlock_feature|feature_hero_points

Quý Bình An hít sâu một hơi, long lanh ánh mắt: "Muốn thâu tóm toàn bộ điểm số thiên hạ, bước tiếp theo chỉ có thể là... XƯNG ĐẾ!"

-> hoa_da_summoning

=== hoa_da_summoning ===
# CHAPTER_TITLE: Hồi 7 · Chương 361: Y Thánh Hoa Đà · Thanh Nang Thần Thuật
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_rising_power
# ACTORS: qui_binh_an|center|thoughtful
# EFFECT: screen_flash|#00FF7F|1500
# EFFECT: camera_shake|0.5
# EFFECT: sfx_system_chime

Để bảo hộ sinh mạng cho các mưu thần tướng sĩ, Quý Bình An triệu hoán vị Thần Y huyền thoại bậc nhất lịch sử:

# EFFECT: summon_grand_reveal|hero_hoada
# EFFECT: unlock_feature|feature_medical_surgery
# EFFECT: show_toast|[ 醫 ] BÁI TƯỚNG THẦN ĐÀN: Y Thánh Hoa Đà (Nguyên Hóa) Quy Vị!|triumph

Một lão nhân râu tóc bạc phơ nhưng sắc diện hồng hào, vai đeo hòm thuốc Thanh Nang, tay cầm kim châm bước ra:
"Lão phu Hoa Đà, bái kiến Chúa Công! Sinh tử do mệnh, nhưng có Ma Phế Tán và phẫu thuật Thanh Nang của lão phu, diêm vương cũng không cướp nổi người của Chúa Công!"

~ gold -= 100000
~ host_force += 4

Hoa Đà lập tức bào chế linh đan giải trừ toàn bộ tàn độc trong cơ thể các đại tướng, bảo toàn tuyệt đối nguyên khí cho trận đại sự sắp tới!

-> quach_gia_summoning

=== quach_gia_summoning ===
# CHAPTER_TITLE: Hồi 7 · Chương 382: Thiên Mệnh Mưu Thần · Quỷ Tài Quách Gia
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_dark_schemes
# ACTORS: qui_binh_an|center|commanding
# EFFECT: screen_flash|#FFD700|2500
# EFFECT: camera_shake|0.9
# EFFECT: sfx_thunder_dramatic

Năm mươi vạn hoàng kim hóa thành một cột sáng chọc thủng vòm trời! 

Từ trong cơn bão sấm chớp, một thanh niên áo xanh phiêu dật bước ra, tay cầm quạt xếp, một tay nâng bầu rượu hồ lô, phong lưu phóng khoáng, đôi mắt nhìn thấu ngàn năm thế sự:

# EFFECT: summon_grand_reveal|hero_quachgia
# EFFECT: unlock_feature|feature_guojia_prophecy
# EFFECT: show_toast|[ 天 ] THIÊN MỆNH MƯU THẦN QUỶ TÀI QUÁCH GIA (PHỤNG HIẾU) QUY VỊ!|triumph

"Dĩnh Xuyên Quách Gia (Quách Phụng Hiếu), bái kiến Chúa Công! Thần chờ ngày này đã lâu... Thiên hạ này đã rách nát đến cực điểm, xin để Phụng Hiếu làm tổng đạo diễn màn kịch Đăng Cơ Xưng Đế cho Chúa Công!"

~ gold -= 500000
~ host_force += 8

Quách Gia mỉm cười nhấp một ngụm rượu, rút ra một tờ giấy hoa tiên dâng lên:
"Chúa Công, việc xưng đế muốn danh chính ngôn thuận, muôn đời tôn sùng thì không thể dùng vũ lực bức ép thô bạo. Chúng ta phải dùng kế: 'Tam Nhượng Đế Vị'!"

-> tam_nhuong_de_vi

=== tam_nhuong_de_vi ===
# CHAPTER_TITLE: Hồi 7 · Chương 385: Ba Lần Từ Chối · Thu Trọn Lòng Dân
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_court_tension
# ACTORS: tu_ngoc_trach|left|kneeling, qui_binh_an|right|determined, quach_gia|center|scholarly

Tại Kim Loan Điện uy nghiêm, màn kịch kinh điển của Quách Gia bắt đầu diễn ra:

Lần thứ nhất: Tân Hoàng Tử Ngọc Trạch quỳ dâng ngọc tỷ truyền quốc, cầu xin thoái vị nhường ngôi.
Quý Bình An nghiêm mặt cự tuyệt: "Ta là phò mã Đại Vũ, một đời trung liệt, há có thể làm chuyện cướp ngôi thoán nghịch?"

Lần thứ hai: Toàn bộ văn võ bá quan do Tuân Úc và Giả Hủ dẫn đầu quỳ rạp dâng biểu xin Tịnh Kiên Vương lên ngôi cứu vớt sinh linh.
Quý Bình An vẫn lắc đầu từ chối: "Tài đức ta còn mỏng, chưa dám gánh vác trọng trách trời đất!"

Lần thứ ba: Tại cửa Tây kinh đô, Quách Gia tổ chức "Thiên Hạ Tập Thể Nguyện"!
Đại diện bách tính mười ba châu cùng mười vạn tướng sĩ Huyết Y Doanh, Hãm Trận Doanh, Bạch Mã Nghĩa Tòng quỳ chật kín mười dặm ngự đạo, đồng thanh gào khóc cầu xin:
"Xin Vương Gia thương lấy lê dân bá tánh! Xin người lên ngôi hoàng đế, định đoạt thái bình!"

Tiếng hô vang dậy thấu tận trời xanh, khí thế cuồn cuộn tựa sóng thần!

-> dang_co_hoang_de

=== dang_co_hoang_de ===
# CHAPTER_TITLE: Hồi 7 · Chương 386: Cửu Long Ngâm Vang · Đăng Cơ Hoàng Đế
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_imperial_grandeur
# ACTORS: qui_binh_an|center|commanding, tuan_uc|left|impressed, quach_gia|right|triumphant
# EFFECT: screen_flash|#FFD700|2000
# EFFECT: camera_shake|0.9
# EFFECT: sfx_dragon_roar_nine

Không còn lý do gì để từ chối nữa!
Thời cơ ngàn năm có một đã chín muồi!

Quý Bình An sải bước vững chãi bước lên thềm ngọc chín bậc, khoác lên mình tấm long bào hoàng kim thêu chín con rồng vàng uốn lượn, uy nghi ngồi xuống Cửu Long Bảo Tọa!

"Ngao... o... o...!"
Thiên địa dị tượng bùng nổ! Chín tiếng rồng ngâm vang dội từ hư không rền vang khắp mười ba châu, mây lành ngũ sắc bao phủ khắp bầu trời kinh đô!

Bá quan văn võ, mười vạn đại quân cùng hàng triệu bách tính đồng loạt dập đầu tung hô vang dội trời đất:
"HOÀNG ĐẾ VẠN TUẾ! VẠN TUẾ! VẠN VẠN TUẾ!"

[THIÊN CƠ HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ QUÝ BÌNH AN CHÍNH THỨC ĐĂNG CƠ HOÀNG ĐẾ ĐẠI VŨ!
- Mở khóa đặc quyền: 'Hoàng Đạo Long Khí Hộ Thể' (Miễn nhiễm ám sát và kỳ độc)!
- Mở khóa đặc quyền: 'Ngôn Xuất Pháp Tùy' (Khí thế thiên tử chấn nhiếp muôn dân)!
- Kích hoạt cơ chế tự động chuyển hóa chiến sự toàn quốc thành Anh Linh Điểm!

# EFFECT: show_toast|[ 帝 ] THIÊN TỬ ĐĂNG CƠ: KHỞI TẠO ĐẾ NGHIỆP HOÀNG KIM!|triumph

-> bon_dai_chinh_lenh

=== bon_dai_chinh_lenh ===
# CHAPTER_TITLE: Hồi 7 · Chương 387: Khai Sáng Kỷ Nguyên · Bốn Đại Chính Lệnh
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_imperial_grandeur
# ACTORS: qui_binh_an|center|commanding, tuan_uc|left|scholarly

Ngay trên Cửu Long Bảo Tọa, Tân Hoàng Quý Bình An vung tay áo rồng, ban bố BỐN ĐẠI CHÍNH LỆNH khai sáng kỷ nguyên thịnh thế:

1. GIẢM THUẾ TOÀN DÂN: Miễn giảm 30% tô thuế cho bách tính khắp mười ba châu trong ba năm!
2. KHAI HOANG MỞ CÕI: Khuyến khích di dân mở rộng biên giới, cấp đất canh tác cho người nghèo!
3. TRỌNG THƯỞNG QUÂN TỬ: Tăng 30% quân hưởng, triều đình chu cấp trọn đời cho thân nhân liệt sĩ tử trận!
4. CHIÊU HIỀN LỆNH: Mở khoa cử tuyển chọn hiền tài khắp thiên hạ, không phân biệt xuất thân thế gia hay hàn môn!

Chiếu lệnh ban ra, lòng dân khắp thiên hạ hân hoan nhảy múa, sĩ khí ba quân ngút trời mây!

-> season_1_finale_coronation

=== season_1_finale_coronation ===
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_imperial_grandeur
# ACTORS: qui_binh_an|center|commanding

Nhìn giang sơn cẩm tú trải dài vạn dặm ngoài cửa điện, Quý Bình An tay nắm chặt chuôi kiếm, bên cạnh là Tuân Úc, Quách Gia, Giả Hủ, Lý Nho cùng Triệu Vân, Điển Vi, Mã Siêu, Hoàng Trung, Cao Thuận, Trương Liêu...

Từ một phò mã hàn vi nơm nớp lo sợ nơi tẩm thất hoang tàn, trải qua 386 chương khói lửa quyền mưu và huyết chiến, y đã chính thức đạp bằng mọi chông gai để bước lên ngôi vị cửu ngũ chí tôn!

Đại Vũ đã thuộc về họ Quý. Mục tiêu tiếp theo: Thâu tóm Tây Lăng, bình định Nam Ly, quét sạch Đông Thương, thống nhất toàn cõi đại lục, lập nên ĐẾ CHẾ ĐẠI HÁN muôn đời bất hủ!

# EFFECT: show_toast|[ 完 ] HOÀN THÀNH TOÀN BỘ SEASON 1 (CHƯƠNG 1 - 386)!|triumph
# EFFECT: chapter_complete|386

-> END
