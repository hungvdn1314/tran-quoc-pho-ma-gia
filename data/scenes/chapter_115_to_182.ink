// ============================================================================
// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK
// HỒI 3: TÂN HOÀNG ĐĂNG CƠ, ĐIÊU THUYỀN - TRƯƠNG LIÊU QUY VỊ & HỎA CÔNG BẮC CÔ SƠN (CHƯƠNG 115 - 182)
// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn
// ============================================================================

=== chapter_115_start ===
# CHAPTER_TITLE: Hồi 3 · Chương 115: Tân Hoàng Tức Vị · Thế Cục Đổi Dời
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_court_tension
# ACTORS: tu_ngoc_trach|center|noble, qui_binh_an|right|determined, an_hoang_hau|left|stern

Sau quốc tang Vũ Hoàng, Đại Hoàng Tử Tử Ngọc Trạch chính thức đăng cơ Hoàng Đế Đại Vũ, tôn mẫu hậu làm An Thái Hậu. 

Nơi triều đường, Tân Hoàng vốn tính nhân hòa nhu nhược, mọi việc triều chính dần rơi vào tay An Thái Hậu và cựu thần gia tộc Ngao thị. Ngao Khâm - đầu sỏ thế gia kinh đô - ỷ vào công lao ủng hộ lập hoàng, ngang nhiên dâng biểu đòi thu hồi toàn bộ binh quyền Bắc Cương từ tay Quý Bình An.

An Thái Hậu ngồi sau rèm châu, thanh âm lạnh lùng truyền xuống:
"Phò Mã Gia, tiên hoàng đã băng hà, ba châu Bắc Cảnh không thể để một mình Quý gia nắm giữ mãi. Ngao thị có công cần vương, trẫm ý muốn giao Liễu Châu cho Ngao Khâm tiếp quản, ngươi thấy thế nào?"

* [Cương Quyết · Cự tuyệt thẳng thừng: "Biên cương là máu xương tướng sĩ, há để lũ sâu mọt nhúng tay?"]
    ~ suspicion += 15
    ~ imperial_prestige += 3
    Quý Bình An đứng thẳng người, giọng vang rền điện ngọc: "Bắc Cương là phên dậu sinh tử của Đại Vũ! Ai dám tự ý đòi đất, trước hết hỏi thanh Long Đảm Thương của Triệu Tử Long và song kích của Điển Vi xem có đồng ý hay không!"
    Cả triều đình nín thở, Ngao Khâm tức giận run người nhưng không dám ho he.
    -> ngao_thi_conspiracy

* [Uyển Chuyển · Đòi tiền triều đình: "Giao Liễu Châu cũng được, xin triều đình cấp đủ 50 vạn lượng quân phí trước đã."]
    ~ suspicion -= 5
    ~ gold += 20000
    Ngao Khâm nghẹn họng: Triều đình quốc khố trống rỗng sau quốc tang, lấy đâu ra 50 vạn lượng bạc ròng? Ý đồ đoạt thành tạm thời bị bẻ gãy.
    -> ngao_thi_conspiracy

=== ngao_thi_conspiracy ===
# BACKGROUND: bg_pho_ma_phu_bedroom
# MUSIC: bgm_dark_schemes
# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious

Trở về Phò Mã Phủ, Độc Sĩ Giả Hủ và Lý Nho đã đợi sẵn trong mật thất. Lý Nho trải một phong mật thư lên bàn, ánh mắt lóe lên hàn mang rợn người:

"Chúa Công! Mạng lưới của chúng ta phát hiện Ngao thị cấu kết với Đình Úy Phủ, chuẩn bị hạ độc ám sát Ninh An Công Chúa và vu cáo Quý gia mưu phản! Người làm đại sự, tuyệt đối không thể nhân từ nương tay!"

Giả Hủ khẽ phẩy quạt lông vũ, cười lạnh: "Độc xà muốn cắn người, trước hết phải đập nát đầu xà! Đêm nay, diệt tộc Ngao thị!"

* [Quyết Đoán · Ra lệnh huyết tẩy Ngao Phủ: "Đêm nay nhổ cỏ tận gốc, một tên cũng không để thoát!"]
    -> huyet_tay_ngao_phu

* [Thận Trọng · Cứu người tại Đình Úy Phủ trước]
    -> dai_nao_dinh_uy_phu

=== huyet_tay_ngao_phu ===
# CHAPTER_TITLE: Hồi 3 · Chương 121: Đêm Trăng Tẩy Oán · Diệt Môn Ngao Thị
# BACKGROUND: bg_darkness
# MUSIC: bgm_epic_final_battle
# ACTORS: trieu_van|center|spear_ready, qui_binh_an|right|commanding

Canh ba đêm tối, sấm chớp rền vang khắp kinh thành, một trận mưa rào trút xuống che lấp tiếng gươm đao.

Triệu Vân dẫn một trăm thiết kỵ Huyết Y Doanh phong tỏa bốn cổng Ngao Phủ. Điển Vi vung song thiết kích đập nát cổng đại viện bằng đá xanh ngàn cân!

# EFFECT: camera_shake|0.8
# EFFECT: screen_flash|#C0C0C0|400
# EFFECT: sfx_spear_whoosh

Ngao Khâm kinh hoàng từ trong phòng ngủ lao ra: "Quý Bình An! Ngươi dám tự tiện giết đại thần triều đình? Hoàng Đế và Thái Hậu sẽ tru diệt chín tộc ngươi!"

Quý Bình An từ từ bước vào, tay cầm bức thư thông đồng phản nghịch: "Ngao Khâm, chứng cứ ngươi tư thông ngoại bang đều ở đây. Dưới cửu tuyền, hãy đi mà giải thích với Tiên Hoàng!"

Triệu Vân thương hóa vạn điểm hàn tinh, một thương xuyên tâm Ngao Khâm! Điển Vi và Huyết Y Doanh quét sạch toàn bộ phủ đệ.

Tịch thu tại hầm ngầm Ngao phủ: 200.000 lượng hoàng kim, hàng ngàn rương châu báu lụa là!

~ gold += 200000
~ suspicion += 10
~ imperial_prestige += 5

# EFFECT: show_toast|[ 誅 ] DIỆT MÔN NGAO THỊ · Thu Về 200.000 Vàng!|reward

-> dai_nao_dinh_uy_phu

=== dai_nao_dinh_uy_phu ===
# CHAPTER_TITLE: Hồi 3 · Chương 136: Phá Ngục Đình Úy · Thu Phục Quỷ Y
# BACKGROUND: bg_pho_ma_phu_bedroom
# MUSIC: bgm_court_tension
# ACTORS: qui_binh_an|right|confident, dien_vi|left|standing_guard

Ngay trong đêm, Điển Vi dẫn binh xông thẳng vào ngục tối Đình Úy Phủ, chém đứt xiềng xích huyền thiết cứu thoát hai kỳ nhân đang bị tra khảo dã man:
- Quỷ y Cơ Vô Pháp: tinh thông độc thuật và cơ quan hỏa dược.
- Cao thủ Cơ Vô Thiên: khinh công đệ nhất thiên hạ.

Cơ Vô Pháp quỳ rạp dưới chân Quý Bình An: "Đa tạ Phò Mã cứu mạng! Huynh đệ Cơ thị từ nay nguyện làm trâu làm ngựa, tận hiến tài mọn chế tạo cơ quan hỏa khí cho ngài!"

~ unlocked_granary = true

-> dieu_thuyen_summoning

=== dieu_thuyen_summoning ===
# CHAPTER_TITLE: Hồi 3 · Chương 140: Bế Nguyệt Tuyệt Đại · Mạng Lưới Hồng Nhan
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_ethereal_void
# ACTORS: qui_binh_an|center|amazed
# EFFECT: screen_flash|#FFC0CB|1500
# EFFECT: camera_shake|0.5
# EFFECT: sfx_system_chime

Trong mật thất Phò Mã Phủ, Thần Đàn bỗng tỏa ra hương sen ngạt ngào dị thường. Từng cánh hoa đào bay lượn giữa không gian huyền ảo, ánh trăng vằng vặc chiếu rọi một bóng hình yểu điệu thướt tha, phong hoa tuyệt đại, nhan sắc khuynh quốc khuynh thành khiến thiên địa nhật nguyệt phải lu mờ!

# EFFECT: summon_grand_reveal|hero_dieuthuyen
# EFFECT: unlock_feature|feature_hong_nhan
# EFFECT: show_toast|[ 巾 ] BÁI TƯỚNG THẦN ĐÀN: Tuyệt Thế Mỹ Nhân Điêu Thuyền Quy Vị!|triumph

Điêu Thuyền nhẹ nhàng bước xuống từ đài sen, đôi mắt long lanh tựa hồ thu thủy, cúi mình thi lễ e ấp nhưng khí chất đoan trang:

"Thiếp thân Điêu Thuyền, bái kiến lang quân... Từ nay nguyện bên chàng kết tóc phu thê, vì chàng dệt nên mạng lưới tình báo khắp bốn phương thiên hạ!"

~ gold -= 50000
~ host_force += 6
~ affinity_dieu_thuyen += 50

Điêu Thuyền vừa quy vị liền lập tức tiếp quản mạng lưới nữ điệp báo "Hồng Nhan". Chỉ trong vòng ba ngày, toàn bộ tin tức cơ mật từ nội cung Đại Vũ, Tây Lăng, Nam Ly và Đông Thương đều được truyền thẳng về bàn trà Phò Mã Phủ!

-> triple_summoning

=== triple_summoning ===
# CHAPTER_TITLE: Hồi 3 · Chương 150: Hổ Tướng Huyết Y · Trương Liêu - Khúc Nghĩa - Hoa Hùng
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_hero_theme
# ACTORS: qui_binh_an|center|commanding
# EFFECT: screen_flash|#FFD700|2000
# EFFECT: camera_shake|0.9
# EFFECT: sfx_thunder_dramatic

Tin khẩn cấp từ Hồng Nhan truyền về: Quân Thần Nam Ly Cung Sinh cùng Đại tướng Chu Bất Ninh dẫn ba mươi vạn đại quân áp sát Liễu Châu! Biên cương ngàn cân treo sợi tóc!

Quý Bình An quyết đoán dồn toàn bộ gia sản mở đại tế Thần Đàn!

Ba đạo thiên lôi xé toạc bầu trời, ba vị danh tướng lừng lẫy Tam Quốc đồng loạt giáng lâm:

1. TRƯƠNG LIÊU (Văn Viễn): Tuyệt thế thống soái, cầm Nguyệt Nha Kích, thống lĩnh toàn bộ năm vạn Huyết Y Doanh!
# EFFECT: summon_grand_reveal|hero_truonglieu

2. KHÚC NGHĨA: Dũng tướng Tiên Đăng, trang bị thần nỏ phá giáp và khiên sắt hạng nặng!
# EFFECT: summon_grand_reveal|hero_khucnghia

3. HOA HÙNG: Quan Tây dũng mãnh hổ tướng, cầm Trảm Mã Đại Đao uy chấn tiền quân!
# EFFECT: summon_grand_reveal|hero_hoahung

# EFFECT: show_toast|[ 帥 ] TAM ĐẠI HỔ TƯỚNG QUY VỊ: Trương Liêu · Khúc Nghĩa · Hoa Hùng!|triumph

~ gold -= 120000
~ host_force += 15

Trương Liêu quỳ một gối, Nguyệt Nha Kích chống thẳng xuống đất, khí phách ngút trời: "Chúa Công chớ lo! Ba mươi vạn giặc Nam Ly chẳng qua chỉ là đàn cừu đợi làm thịt! Mạt tướng xin lấy đầu tướng địch dâng lên người!"

-> thiet_de_invention

=== thiet_de_invention ===
# BACKGROUND: bg_northern_border_camp
# MUSIC: bgm_rising_power
# ACTORS: qui_binh_an|right|clever, trieu_van|left|impressed

Tại quân doanh Bắc Cương, Cơ Vô Pháp đem đến một phát minh chấn động: MÓNG NGỰA SẮT (Thiết Đề).

Những thanh sắt cong hình bán nguyệt được đóng chặt vào móng ngựa Bạch Mã Nghĩa Tòng. Nhờ đó, chiến mã có thể phi nước đại trên địa hình núi đá sắc nhọn mà không sợ mòn móng, tốc độ hành quân tăng vọt gấp ba lần!

# EFFECT: show_toast|[ 器 ] PHÁT MINH ĐỘC BẢN: Móng Ngựa Sắt (Tốc Độ Kỵ Binh +300%)!|unlock
# EFFECT: unlock_feature|feature_horseshoe

Triệu Vân cưỡi thử một vòng, mừng rỡ vỗ tay: "Kỳ diệu thay! Có thiết đề này, Bạch Mã kỵ binh của ta có thể vượt đèo lội suối, xuất quỷ nhập thần đánh úp hậu phương quân Nam Ly!"

-> hoa_cong_bac_co_son_prep

=== hoa_cong_bac_co_son_prep ===
# CHAPTER_TITLE: Hồi 3 · Chương 170: Thung Lũng Tử Thần · Đại Kế Bắc Cô Sơn
# BACKGROUND: bg_northern_border_camp
# MUSIC: bgm_dark_schemes
# ACTORS: jia_xu|left|mysterious, qui_binh_an|right|commanding

Trong quân trướng, sa bàn Bắc Cô Sơn hiện rõ địa thế hiểm trở: một thung lũng hẹp dài hình túi tiền, hai bên là vách đá dựng đứng ngàn thước.

Giả Hủ cầm cờ đen cắm thẳng vào trung tâm thung lũng:
"Cung Sinh cậy quân đông, tất sẽ dốc toàn lực đánh thẳng vào Liễu Châu theo con đường độc đạo Bắc Cô Sơn. Chúng ta dùng Trương Liêu và Huyết Y Doanh thủ thành kiên cường, nhử ba mươi vạn quân địch lọt sâu vào đáy túi... rồi phóng hỏa thiêu rụi!"

* [Hỏa Công Toàn Lực · Dùng hỏa dược và dầu tràm đốt sạch thung lũng]
    ~ unlocked_flood = true
    -> battle_bac_co_son_climax

* [Hỏa Kích Kết Hợp Vu Hồi · Sai Triệu Vân luồn sau lưng cắt đứt đường lui]
    ~ unlocked_flood = true
    -> battle_bac_co_son_climax

=== battle_bac_co_son_climax ===
# CHAPTER_TITLE: Hồi 3 · Chương 180: Khói Lửa Rực Trời · Trảm Tướng Chu Bất Ninh
# BACKGROUND: bg_fortress_battle
# MUSIC: bgm_epic_final_battle
# ACTORS: trieu_van|center|attacking, chu_bat_ninh|left|alarmed

Đêm định mệnh tại Bắc Cô Sơn!
Ba mươi vạn quân Nam Ly lọt thỏm giữa hẻm núi. Đúng lúc đó, hàng ngàn hỏa tiễn và ống trúc hỏa dược phát nổ kinh thiên động địa!

# EFFECT: camera_shake|0.9
# EFFECT: screen_flash|#FF4500|1500
# EFFECT: sfx_siege_ram_hit

Biển lửa đỏ rực thiêu đốt màn đêm, tiếng gào khóc thảm thiết rung chuyển núi rừng. Lương thảo, khí giới của ba mươi vạn quân Nam Ly hóa thành tro bụi!

Đại tướng Chu Bất Ninh liều mạng mở đường máu tháo chạy. Nhưng ngay khúc ngoặt hiểm trở, Triệu Vân cưỡi Bạch Long Mã, tay cầm Long Đảm Thương chặn đứng lối thoát!

Chu Bất Ninh vung đại đao chém tới, Triệu Vân khẽ nghiêng mình, Long Đảm Thương hóa thành một vệt bạc xé toạc không khí, đâm xuyên qua yết hầu Chu Bất Ninh!

# EFFECT: sfx_spear_whoosh
# EFFECT: camera_shake|0.7

Chủ tướng đền mạng, ba mươi vạn quân Nam Ly hoàn toàn tan rã. Quân Thần Cung Sinh uất hận thổ huyết, phải cải trang thành lính quèn chạy trốn về nước.

Toàn thắng rực rỡ tại Bắc Cô Sơn! Quý Bình An thu phục hoàn toàn lòng quân ba châu Bắc Cảnh!

~ gold += 150000
~ rations += 100000
~ imperial_prestige += 10

# EFFECT: show_toast|[ 捷 ] ĐẠI THẮNG BẮC CÔ SƠN · Quét Sạch 30 Vạn Quân Nam Ly!|triumph
# EFFECT: chapter_complete|182

-> chapter_183_start
