// ============================================================================
// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK
// HỒI 2: KHẢI HOÀN KINH KỲ, ĐIỂN VI XUẤT THẾ & VŨ HOÀNG BĂNG HÀ (CHƯƠNG 53 - 114)
// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn
// ============================================================================

=== chapter_53_start ===
# CHAPTER_TITLE: Hồi 2 · Chương 53: Khải Hoàn Kinh Kỳ · Sóng Ngầm Kinh Đô
# BACKGROUND: bg_imperial_road
# MUSIC: bgm_court_tension
# ACTORS: qui_binh_an|right|determined, to_kien_phong|left|stern

Sau đại thắng sông Thanh Thủy, danh tiếng Chinh Bắc Đại Tướng Quân Quý Bình An vang dội khắp bốn cõi Đại Vũ triều. Đoàn chiến xa khải hoàn tiến vào cửa đông kinh thành trong tiếng reo hò dậy đất của vạn dân.

Thế nhưng, dưới vẻ phồn hoa rực rỡ ấy, sóng ngầm nơi hoàng đô lại cuộn trào dữ dội hơn bao giờ hết.

Tô Kiến Phong khoác chiến bào Chấn Uy Tướng Quân, dắt chiến mã đứng sừng sững chặn lối vào ngự đạo, ánh mắt âm lãnh quét qua đoàn quân Huyết Y:

"Phò Mã Gia, ngươi lập công lớn ngoài biên cương, nhưng tự tiện dung nạp tử tù thành lập Huyết Y Doanh, lại giam cầm sứ thần Nam Ly... Triều đình trên dưới đang dâng biểu đàn hặc ngươi lộng quyền!"

* [Hoành Đao · Cười nhạt đáp trả: "Tô tướng quân, đao của ta chém giặc cứu nước, đao của ngươi chém ai?"]
    ~ imperial_prestige += 2
    ~ suspicion += 5
    Quý Bình An ngẩng đầu cười lạnh, tay ghì cương ngựa, khí thế bức người: "Nếu không có Huyết Y Doanh phá đê dìm giặc, lúc này Liễu Châu đã đổi chủ, đầu trên cổ Tô tướng quân liệu còn giữ nổi không?"
    Tô Kiến Phong biến sắc, nắm chặt chuôi kiếm nhưng không thể phản bác nửa lời.
    -> imperial_return_choice_aftermath

* [Khiêm Cung · Lấy lui làm tiến: "Mọi việc đều vì giang sơn xã tắc, ta tự có giải trình trước thánh thượng."]
    ~ suspicion -= 5
    Quý Bình An chắp tay điềm đạm: "Tô tướng quân lo cho thể chế triều đình là phải. Lát nữa vào triều yết kiến Bệ Hạ, ta sẽ dâng toàn bộ sổ sách binh bộ."
    Tô Kiến Phong hừ lạnh một tiếng, đành phất tay cho mở đường.
    -> imperial_return_choice_aftermath

=== imperial_return_choice_aftermath ===
# BACKGROUND: bg_pho_ma_phu_bedroom
# MUSIC: bgm_dark_schemes
# ACTORS: qui_binh_an|right|thoughtful, servant|left|worried

Đêm xuống, Quý Bình An trở về Phò Mã Phủ. Tiểu Thúy vội vàng mang trà nóng bước vào, thần sắc đầy vẻ bất an:

"Công tử... mấy hôm nay quanh phủ đệ liên tục xuất hiện bóng người rình rập. Tứ Hoàng Tử Tử Ngọc Hằng và Tô phủ đã cấu kết với Cấm Vệ Quân, tựa hồ muốn ra tay đoạt mạng người!"

Quý Bình An nhấp một ngụm trà, trong lòng hiểu rõ: Kinh thành không như sa trường, minh thương dễ tránh, ám tiến khó phòng. Lúc này, Triệu Vân phải tọa trấn quân doanh ngoài thành, bên cạnh mình thiếu một vị mãnh tướng tuyệt đối có thể cận thân hộ giá!

[THIÊN CƠ HỆ THỐNG]: Tinh tích lũy đạt 100.000 Vàng! Đủ điều kiện khởi động Thượng Cổ Bái Tướng Đài bậc Tuyệt Thế Võ Tướng!

Quý Bình An đứng dậy, ánh mắt sáng rực bước thẳng vào mật thất.

-> dian_wei_summoning

=== dian_wei_summoning ===
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_hero_theme
# ACTORS: qui_binh_an|center|commanding
# EFFECT: screen_flash|#FFD700|1500
# EFFECT: camera_shake|0.8
# EFFECT: sfx_thunder_dramatic

Thượng Cổ Bái Tướng Thần Đàn bùng nổ kim quang vạn trượng! 
Tám trận đồ Bát Quái xoay chuyển điên cuồng, vết rạn Kintsugi hoàng kim nứt toác từ hư không, tiếng sấm sét rền vang rung chuyển càn khôn!

Một bóng hình khổng lồ tựa thiết tháp giáng lâm, thân cao chín thước, cơ bắp cuồn cuộn như thiết đúc, tay lăm lăm đôi Tấn Thiết Song Kích nặng tám mươi cân, sát khí hung hãn chấn nhiếp quỷ thần!

# EFFECT: summon_grand_reveal|hero_dianwei
# EFFECT: grant_ticket|1
# EFFECT: unlock_feature|feature_dian_wei_guard
# EFFECT: show_toast|[ 將 ] BÁI TƯỚNG THẦN ĐÀN: Cổ Chi Ác Lai Điển Vi Quy Vị!|triumph

Một tiếng gầm vang như sấm dậy đất bằng, Điển Vi quỳ một gối xuống trước mặt Quý Bình An, thanh âm trầm hùng như chuông đồng:

"Mạt tướng Điển Vi, phụng mệnh Thượng Cổ Anh Linh giáng thế! Nguyện vì Chúa Công xông pha khói lửa, ai dám động đến ngài, thiết kích của Điển Vi tất nghiền nát kẻ đó!"

~ gold -= 100000
~ host_force += 8
~ affinity_dian_vi += 30

Quý Bình An bước tới đỡ lấy Điển Vi, trong lòng đại định. Có Cổ Chi Ác Lai hộ thân, kinh thành này còn ai cản nổi bước chân ta!

-> gate_battle_dianwei

=== gate_battle_dianwei ===
# CHAPTER_TITLE: Hồi 2 · Chương 66: Thiết Kích Phá Cửa Thành · Uy Chấn Đế Đô
# BACKGROUND: bg_imperial_road
# MUSIC: bgm_epic_final_battle
# ACTORS: qui_binh_an|right|confident, dien_vi|left|battle_stance

Sáng hôm sau, Quý Bình An dẫn theo Điển Vi tiến vào Kim Loan Điện. Đúng như dự đoán, tại cửa Chu Tước, Tứ Hoàng Tử Tử Ngọc Hằng bố trí năm mươi thiết giáp vệ binh chặn đứng xe ngựa:

"Phò Mã Gia! Bệ Hạ có khẩu dụ, hôm nay chỉ một mình ngươi được vào điện, tùy tùng võ phu đều phải cởi giáp giải giới ngoài cổng!"

Tử Ngọc Hằng khoanh tay cười khẩy, ý đồ bắt chẹt Quý Bình An ngay trước bá quan văn võ.

* [Bá Đạo · Sai Điển Vi phá trận: "Điển Vi! Cho bọn chúng thấy thế nào là thiết kích!"]
    Điển Vi gầm lên một tiếng, chân đạp vỡ phiến đá hoa cương, hai thanh Tấn Thiết Song Kích múa tít thành vòng tròn bão thép!
    # EFFECT: camera_shake|0.9
    # EFFECT: sfx_siege_ram_hit
    Chỉ trong mười nhịp thở, năm mươi thiết giáp vệ binh bị đánh bay tứ tán, giáp trụ vỡ vụn, lăn lộn kêu la thảm thiết dưới đất! Điển Vi đứng chắn trước xa giá, uy vũ tựa thiên thần giáng thế!
    ~ imperial_prestige += 3
    ~ suspicion += 10
    -> tang_phuc_doi_cau

* [Quyền Mưu · Vạch trần mưu kế: "Thánh chỉ miệng? Ngươi dám giả truyền ý chỉ trước mặt ta?"]
    Quý Bình An rút ra Tử Kinh Ngọc Bội: "Trẫm tứ kim bài, ai cản trảm nấy! Điển Vi, mở đường!"
    Điển Vi gầm thét vung kích đánh bay rào chắn bằng gỗ lim ngàn cân, khiến đám vệ binh sợ mất mật dạt ra hai bên!
    ~ imperial_prestige += 2
    -> tang_phuc_doi_cau

=== tang_phuc_doi_cau ===
# CHAPTER_TITLE: Hồi 2 · Chương 69: Mặc Tang Phục Lên Điện · Trực Thần Phong Tướng
# BACKGROUND: bg_imperial_hall
# MUSIC: bgm_court_tension
# ACTORS: vu_hoang|center|stern, qui_binh_an|right|determined

Kim Loan Điện uy nghiêm lộng lẫy, nhưng Quý Bình An hôm nay lại mặc một thân bạch sắc tang phục bước vào. Cả triều đình xôn xao kinh hãi, ngự sử các bộ đồng loạt quát mắng:

"Phò Mã to gan! Ngày đại triều sao dám mặc áo tang lên điện? Đây là đại nghịch bất đạo!"

Vũ Hoàng trên long ngai mày rồng nhíu chặt, trầm giọng hỏi: "Quý Bình An, ngươi mặc tang phục vì ai?"

Quý Bình An quỳ xuống nhưng sống lưng thẳng tắp: "Thần mặc tang phục không phải vì tư gia, mà là vì mười vạn trung hồn tử sĩ biên thùy Đại Vũ! Họ máu chảy đầu rơi giữ lấy biên cương, nhưng nơi kinh đô, quyền thần lại bớt xén lương thảo, mưu hại trung lương!"

Nói đoạn, Quý Bình An đọc vế đối trắng ngâm vang điện ngọc:
"Bạch cốt chôn nơi ải lạnh, ngàn năm trung liệt chiếu thanh thiên;
Tử bào ngồi chốn kinh kỳ, một tấc công lao thẹn quỷ thần!"

Vũ Hoàng nghe xong im lặng hồi lâu, bỗng vỗ mạnh long án: "Nói hay lắm! Một câu thẹn quỷ thần đánh trúng tim đen lũ tham quan ô lại!"

# EFFECT: screen_flash|#FFD700|800
# EFFECT: sfx_imperial_decree
# EFFECT: show_toast|[ 詔 ] THÁNH CHỈ: Phong Quý Bình An làm Điển Nông Trung Lang Tướng!|unlock
# EFFECT: unlock_feature|dien_nong_trung_lang

"Truyền chỉ! Phong Quý Bình An làm ĐIỂN NÔNG TRUNG LANG TƯỚNG, nắm toàn quyền điều phối kho lương và thuế khóa ba châu Bắc Cảnh!"

~ imperial_prestige += 5
~ suspicion -= 10
~ gold += 50000

-> dien_vo_tam_quan

=== dien_vo_tam_quan ===
# CHAPTER_TITLE: Hồi 2 · Chương 80: Diễn Võ Tam Quan · Ép Đạo Tây Lăng
# BACKGROUND: bg_imperial_road
# MUSIC: bgm_battle_tactical
# ACTORS: qui_binh_an|right|confident, dien_vi|center|battle_stance

Mấy ngày sau, đoàn sứ giả Tây Lăng do Hề Nhan Công Chúa dẫn đầu đến kinh đô nghị hòa, đồng thời mang theo mười đại cao thủ Hoàng Cảnh thách đấu Diễn Võ Tam Quan.

Trịnh Trung Hà - đệ nhất dũng sĩ Tây Lăng - cầm trường đao đứng giữa lôi đài gầm thét: "Đại Vũ triều chẳng lẽ không có nổi một nam nhi dám tiếp một đao của ta sao?"

* [Phái Điển Vi xuất chiến: "Điển Vi, phế hắn đi!"]
    Điển Vi cười lớn sải bước lên đài. Trịnh Trung Hà chém một đao bổ ngọn núi xuống, Điển Vi tay không vươn ra tóm chặt lấy lưỡi đao sáng loáng!
    # EFFECT: camera_shake|0.7
    # EFFECT: sfx_iron_halberd
    "Răng rắc!" Thanh bảo đao gãy đôi. Điển Vi tiện tay vung một quyền hất văng Trịnh Trung Hà bay xa ba trượng, hộc máu ngất lịm!
    Hề Nhan Công Chúa tái mặt, toàn trường ồ lên thán phục.
    -> ly_nho_summoning

* [Quý Bình An tự mình đối thơ áp chế tâm lý đối phương]
    Quý Bình An xuất khẩu thành chương, dùng ba bài thơ hào sảng áp đảo toàn bộ văn thần Tây Lăng, đoạt lấy Huyết Long Lệnh của sứ đoàn!
    -> ly_nho_summoning

=== ly_nho_summoning ===
# CHAPTER_TITLE: Hồi 2 · Chương 97: Tuyệt Thế Mưu Thần Lý Nho · Độc Tâm Khống Triều
# BACKGROUND: bg_summoning_altar
# MUSIC: bgm_dark_schemes
# ACTORS: qui_binh_an|center|thoughtful
# EFFECT: screen_flash|#800080|1500
# EFFECT: camera_shake|0.6
# EFFECT: sfx_thunder_dramatic

Trở về mật thất, Quý Bình An cảm nhận thấy làn sóng sát cơ tại kinh đô đang dồn dập kéo tới. Lần này không chỉ là võ lực, mà là quyền mưu thâm độc chốn thâm cung. Ta cần một mưu sĩ hiểu rõ lòng người hiểm ác, thủ đoạn tàn độc nhưng trung thành tuyệt đối!

Hệ thống Bái Tướng Thần Đàn lại một lần nữa sáng rực hắc sắc độc khí!

# EFFECT: summon_grand_reveal|hero_lynho
# EFFECT: unlock_feature|feature_poison_stratagem
# EFFECT: show_toast|[ 謀 ] BÁI TƯỚNG THẦN ĐÀN: Độc Sĩ Lý Nho (Văn Ưu) Quy Vị!|triumph

Một trung niên văn sĩ khoác trường bào màu tro đen, ánh mắt thâm thúy tựa hồ đầm lầy vạn trượng, chậm rãi bước ra từ làn sương độc, cúi đầu thi lễ:

"Thuộc hạ Lý Nho (Văn Ưu), bái kiến Chúa Công! Mưu sự trong thiên hạ, phàm việc lớn muốn thành thì tâm phải sắt đá, nhổ cỏ phải nhổ tận gốc. Nguyện đem độc kế tàn sát yêu tà, phò tá đại nghiệp cho Chúa Công!"

~ gold -= 100000
~ host_force += 5
~ affinity_gia_hu += 15

Lý Nho vừa xuất thế liền dâng lên một mật báo kinh hoàng:
"Chúa Công, thuộc hạ vừa quan sát khí sắc của Vũ Hoàng hôm nay... Bệ Hạ không phải bệnh tật thông thường, mà là trúng Thực Tâm Bách Cốt Cổ Độc! Chỉ trong vòng nửa tháng nữa, kinh thành tất có biến loạn long trời lở đất!"

-> binh_bien_cung_dinh_start

=== binh_bien_cung_dinh_start ===
# CHAPTER_TITLE: Hồi 2 · Chương 104: Dạ Chiến Kinh Thành · Tô Kiến Phong Binh Biến
# BACKGROUND: bg_imperial_road
# MUSIC: bgm_epic_final_battle
# ACTORS: to_kien_phong|left|armored, qui_binh_an|right|commanding

Quả đúng như lời Lý Nho dự liệu!
Đêm trăng tròn mười lăm, tiếng trống báo động từ Cấm Thành xé toạc màn đêm tĩnh mịch. Tô Kiến Phong câu kết cùng Tứ Hoàng Tử Tử Ngọc Hằng, điều động hai vạn cấm vệ phản loạn công phá cổng bắc hoàng cung, mưu đồ bức cung thoán vị!

Khói lửa bốc cao ngùn ngụt, tiếng la sát vang rền ngõ hẻm.

Tại ngã tư ngự đạo, Quý Bình Sinh dẫn đầu ba ngàn kỵ binh Chiến Hổ Quân dàn trận đối lũy. Quý Bình An cùng Điển Vi và Lý Nho kịp thời tiếp ứng!

Tô Kiến Phong cưỡi hắc mã, cầm đại đao chỉ thẳng vào Quý Bình An: "Quý Bình An! Hôm nay Vũ Hoàng hấp hối, thiên hạ đổi chủ! Ngươi thúc thủ chịu trói thì ta còn giữ cho toàn thây!"

* [Quyết Chiến · Lệnh cho Điển Vi trảm tướng: "Điển Vi! Lấy đầu Tô Kiến Phong cho ta!"]
    Điển Vi gầm lên một tiếng như sấm sét: "Nghịch tặc nhận lấy cái chết!"
    -> dien_vi_vs_to_kien_phong

* [Mưu Lược · Lý Nho kích động phản quân: "Cấm vệ nghe đây, ai bắt Tô Kiến Phong được phong vạn hộ hầu!"]
    Lý Nho tung ra chiếu thư giả của Vũ Hoàng khiến cấm vệ quân hoang mang dao động dữ dội!
    -> dien_vi_vs_to_kien_phong

=== dien_vi_vs_to_kien_phong ===
# BACKGROUND: bg_fortress_battle
# MUSIC: bgm_epic_final_battle
# ACTORS: dien_vi|center|attacking, to_kien_phong|left|shocked

Tô Kiến Phong vung đại đao bổ xuống đầu Điển Vi. Nhưng Điển Vi không thèm né tránh, thanh Tấn Thiết Song Kích kẹp chặt lưỡi đao bẻ gãy làm đôi!

# EFFECT: camera_shake|0.9
# EFFECT: screen_flash|#FFFFFF|500
# EFFECT: sfx_spear_whoosh

Trước khi Tô Kiến Phong kịp thối lui, Điển Vi tung người lên không, song kích như hai luồng thiên lôi cắm phập vào hai bả vai Tô Kiến Phong, đóng đinh gã phản tướng xuống mặt đất!

"A a a!" Tiếng gào thét thảm thiết vang lên. Toàn bộ võ công kinh mạch của Tô Kiến Phong bị phế sạch!

Ba ngàn Chiến Hổ Quân của Quý Bình Sinh thừa thế xông lên quét sạch tàn quân cấm vệ phản loạn. Tứ Hoàng Tử Tử Ngọc Hằng bị bắt sống ngay tại trận. Binh biến kinh hoàng bị dập tắt trong biển máu!

-> vu_hoang_bang_ha

=== vu_hoang_bang_ha ===
# CHAPTER_TITLE: Hồi 2 · Chương 114: Chín Tiếng Chuông Tang · Vũ Hoàng Băng Hà
# BACKGROUND: bg_palace_chamber
# MUSIC: bgm_court_tension
# ACTORS: vu_hoang|center|head_down, qui_binh_an|right|kneeling, tu_ngoc_trach|left|worried

Bên trong tẩm điện hoàng cung, mùi thuốc đắng nồng nặc bao trùm. Vũ Hoàng nằm trên long sàng, sắc mặt xám như tro tàn, hơi thở đứt quãng. Cổ độc đã phát tác vào tim phổi.

Trước giường bệnh chỉ có Quý Bình An và Đại Hoàng Tử Tử Ngọc Trạch.

Vũ Hoàng run rẩy nắm lấy tay Quý Bình An, giọng thều thào nhưng ánh mắt vẫn lóe lên tia sáng cuối cùng của bậc đế vương:

"Bình An... trẫm biết... ngươi là rồng trong loài người, chiếc ao nhỏ Đại Vũ này không giữ nổi ngươi... Nhưng trẫm xin ngươi... hãy giữ lấy giang sơn họ Tử... Trạch nhi tính tình nhân hậu, không trị nổi loạn thế... Ngươi phải... phò tá nó..."

Nói đoạn, Vũ Hoàng đưa ngọc tỷ truyền quốc cho Tử Ngọc Trạch, rồi trút hơi thở cuối cùng.

# EFFECT: screen_flash|#000000|1500
# EFFECT: sfx_gong_ancient
# EFFECT: show_toast|[ 崩 ] VŨ HOÀNG BĂNG HÀ · ĐẠI VŨ ĐỔI CHỦ!|milestone

"Đoàng... Đoàng... Đoàng..."
Chín tiếng chuông tang của hoàng triều vang vọng khắp kinh thành trong đêm lạnh. Một triều đại cũ khép lại, bánh xe lịch sử bắt đầu lăn sang trang mới đầy khốc liệt!

Quý Bình An đứng dậy, nhìn Tử Ngọc Trạch đang quỳ khóc bên long sàng. Lý Nho đứng sau lưng khẽ thì thầm: "Chúa Công, tân hoàng nhu nhược, đây chính là cơ hội trời ban để chúng ta thâu tóm toàn bộ binh quyền Đại Vũ!"

# EFFECT: chapter_complete|114

-> chapter_115_start
