// ============================================================
// Trấn Quốc Phò Mã Gia — Ink Scene Script
// Phần 2: Từ Chương 16 đến Chương 52 (Hồi 1 Hoàn Tất)
// ============================================================
// Biên soạn theo chuẩn Ink scripting (inkjs runtime)
// Tham chiếu: narrative-scene-scripting & game-systems-architect skills
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

Gió lạnh phương Bắc gào thét qua ải Nhạn Môn.

Quý Bình An đứng trên vọng lâu quân doanh Bắc Cương. Sau lưng hắn, Triệu Vân tay cầm Long Đảm Thương vững như bàn thạch.

Phía đối diện, một vị chiến tướng mình mặc hắc giáp nặng trĩu, nét mặt nghiêm cẩn như khắc đá, chắp tay hành lễ nhưng lưng thẳng tắp:

"Bắc Cương tiền phong thống lĩnh Cao Thuận, bái kiến Phò mã đại tướng quân!"

# EFFECT: sfx_armor_clank

Quý Bình An nhìn người này. Ký ức Tam Quốc trong đầu lập tức hiện lên:

*Cao Thuận — thống soái Hãm Trận Doanh, tám trăm cảm tử quân trang bị giáp trụ tinh lương, mỗi trận đánh đều phá vỡ trận địa địch, tính tình thanh liêm trầm mặc, không uống rượu, không nhận quà cáp.*

* [Hỏi về thực trạng quân nhu và binh sĩ]
  "Cao tướng quân bình thân. Quân sĩ Bắc Cương hiện nay thế nào?"
  
  Cao Thuận trầm giọng báo cáo: "Bẩm Phò mã, giáp trụ hư hỏng bốn phần, lương thực triều đình cấp phát trễ hai tháng. Nhưng tám trăm dũng sĩ Hãm Trận Doanh vẫn sẵn sàng quyết tử giữ ải!"
  
  -> gao_shun_decision

* [Khen ngợi khí phách Hãm Trận Doanh]
  "Ta nghe danh Hãm Trận Doanh đã lâu. Trăm trận trăm thắng, xung phong phá trận không gì cản nổi!"
  
  Cao Thuận ánh mắt lóe lên vẻ xúc động hiếm hoi, cúi đầu tạ ơn: "Tướng sĩ chỉ làm tròn bổn phận bảo quốc an dân."
  
  ~ affinity_gaoshun += 10
  -> gao_shun_decision

=== gao_shun_decision ===
# SCENE_TYPE: choice

Quý Bình An mở hòm quân nhu, trước mặt hắn là nguồn vàng ròng kiếm được từ việc kinh doanh xà phòng Thấu Hoa Cao tại kinh thành.

* [Dốc 5.000 Vàng rèn lại toàn bộ giáp trụ cho Hãm Trận Doanh]
  ~ gold -= 5000
  ~ affinity_gaoshun += 25
  ~ unlocked_granary = true
  
  Quý Bình An phất tay: "Truyền lệnh! Xuất 5.000 lượng vàng từ ngân quỹ cá nhân của ta, mở lò rèn ngày đêm đúc giáp khiên thép tôi tốt nhất cho toàn quân!"
  
  Cao Thuận quỳ rạp xuống, hai tay ôm quyền: "Mạt tướng thay mặt tám trăm huynh đệ Hãm Trận Doanh, thề đem máu nóng đền đáp ân tri ngộ của Phò mã gia!"
  
  # EFFECT: show_toast|🎉 MỞ KHÓA THẺ BÀI: Hãm Trận Doanh (SSR Shield Guard)|unlock
  # EFFECT: unlock_feature|feature_ham_tran_doanh
  
  [HỆ THỐNG]: Thu phục thành công Danh tướng Cao Thuận! Mở khóa thẻ bài phòng thủ chiến thuật [Hãm Trận Doanh].
  
  -> chapter_20_complete

* [Phối hợp chiến thuật Kỵ - Bộ giữa Triệu Vân và Cao Thuận]
  ~ affinity_gaoshun += 15
  ~ affinity_trieu_van += 15
  
  "Tử Long, ngươi dẫn Bạch Mã Kỵ phối hợp cùng Hãm Trận Doanh của Cao tướng quân, luyện tập thế trận Kỵ Binh bọc sườn - Thiết Giáp chặn đầu."
  
  Triệu Vân mỉm cười gật đầu: "Tuân lệnh Ký chủ! Bộ kỵ phối hợp, tất phá địch như chẻ tre!"
  
  Cao Thuận gật đầu khâm phục tầm nhìn chiến thuật của Phò mã.
  
  # EFFECT: show_toast|⚔️ Sĩ Khí Quân Đội Tăng Vọt (+20% ATK Bộ Kỵ)|buff
  
  -> chapter_20_complete

=== chapter_20_complete ===
* [Kết thúc Chương 20]
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

Đêm khuya tại mật trướng soái phủ. Ngọn đèn dầu le lói chiếu lên tấm địa đồ sông Hoài Hà và Thanh Thủy.

Một bóng người trung niên áo xám bước vào. Ánh mắt thâm sâu như đầm nước lạnh, nụ cười nửa miệng như thấu suốt mọi trò đời.

"Thảo dân Giả Hủ, tự Văn Hòa, bái kiến Phò mã gia."

# EFFECT: sfx_whisper

~ met_gia_hu = true

Quý Bình An giật mình đứng bật dậy: "Giả Hủ? Độc Sĩ Giả Hủ thời Tam Quốc?!"

Giả Hủ khẽ cười, nâng tay áo che miệng: "Phò mã gia nhận ra thảo dân sao? Xem ra thảo dân đã tìm đúng minh chủ."

Hắn bước tới bàn sa bàn, ngón tay gầy guộc chỉ thẳng vào hạ lưu sông Thanh Thủy:

"Quân Nam Ly đã bí mật liên kết với thổ phỉ Bắc Cương, dự định ba ngày sau vây khốn quân doanh Phò mã tại thung lũng Hắc Phong. Nếu Phò mã dùng binh pháp thông thường, mười phần chết chín."

* [Hỏi kế sách phá địch của Giả Hủ]
  "Văn Hòa tiên sinh đã đến, ắt đã có diệu kế cứu vãn?"
  
  Giả Hủ cười lạnh: "Kế thì có ba. Nhưng còn tùy Phò mã muốn làm 'Nhân Quân' cứu người, hay muốn làm 'Bá Chủ' đoạt thiên hạ."
  
  -> jia_xu_stratagem_choice

=== jia_xu_stratagem_choice ===
# SCENE_TYPE: choice

Giả Hủ trình bày ba mưu kế với nét mặt thản nhiên như luận bàn thời tiết:

* [Chọn Độc Kế: Nhử địch vào hẻm núi, dùng tên độc và hỏa dược triệt hạ toàn bộ]
  ~ suspicion += 15
  ~ affinity_gia_hu += 25
  ~ gold += 20000
  
  "Dùng độc kế! Trong chiến tranh, nhân từ với kẻ địch là tàn nhẫn với tướng sĩ của mình!"
  
  Giả Hủ ánh mắt sáng rực: "Hay! Rất quyết đoán! Giả vờ vứt bỏ doanh trại, nhử năm vạn quân địch chen chúc vào hẻm núi Tử Thần, sau đó chặn hai đầu phóng hỏa. Không một tên nào sống sót trở về!"
  
  # EFFECT: show_toast|🔥 MỞ KHÓA MƯU KẾ: Hỏa Công Liên Hoàn & Bẫy Độc (Giả Hủ)|unlock
  # EFFECT: unlock_feature|feature_poison_stratagem
  
  [HỆ THỐNG]: Giả Hủ hoàn toàn quy thuận! Nhận 20.000 Vàng chiến lợi phẩm tịch thu từ quân địch. Nghi Kỵ triều đình tăng nhẹ do thủ đoạn tàn khốc.
  
  -> chapter_27_complete

* [Chọn Phản Gián Kế: Tung tin giả khiến tướng soái địch tự chém giết lẫn nhau]
  ~ gold -= 3000
  ~ affinity_gia_hu += 20
  ~ suspicion -= 5
  
  "Dùng mưu phản gián, cho người mang mật thư giả mua chuộc phó tướng Nam Ly, ly gián bọn chúng."
  
  Giả Hủ vuốt râu mỉm cười: "Dùng đao giết người không dính máu. Kế này bảo toàn được binh lực, lại khiến Vũ Hoàng nghĩ rằng Phò mã chỉ nhờ may mắn."
  
  # EFFECT: show_toast|📜 MỞ KHÓA THẺ BÀI: Mưu Kế Phản Gián & Ly Gián Kế|unlock
  # EFFECT: unlock_feature|feature_counter_espionage
  
  -> chapter_27_complete

* [Chọn Vương Đạo: Kết hợp trinh sát và phục kích chính diện]
  ~ affinity_trieu_van += 20
  ~ affinity_gia_hu += 5
  ~ suspicion -= 10
  
  "Tử Long xông pha bắt sống tướng giặc, phân hóa bộ hạ, tha cho hàng binh."
  
  Triệu Vân từ bên ngoài bước vào, phấn khởi: "Ký chủ nhân đức, Tử Long nguyện đi đầu vạn quân bắt sống tướng địch!"
  
  Giả Hủ thở dài lắc đầu nhưng trong mắt lộ vẻ kính nể: "Tuy đi đường vòng, nhưng quả thật có phong thái đế vương."
  
  -> chapter_27_complete

=== chapter_27_complete ===
* [Kết thúc Chương 27]
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

Mùa mưa Bắc Cương đổ xuống xối xả. Dòng sông Thanh Thủy đỏ ngầu phù sa cuộn sóng gầm thét.

Quý Bình An cùng Giả Hủ đứng trên đỉnh đập đất thượng nguồn.

Hạ lưu cách đó ba mươi dặm chính là thành Thanh Châu — cứ điểm kiên cố nhất mà năm vạn quân chủ lực phản quân của Địch Hỏa đang chiếm đóng.

Giả Hủ chỉ xuống dòng nước xiết:

"Phò mã gia, mùa mưa đã đến. Nước lũ thượng nguồn dâng cao từng ngày. Nếu chúng ta đắp đập ngăn sông trong bảy ngày, sau đó hạ lệnh xả lũ..."

Giọng Giả Hủ trầm xuống, lạnh lẽo:

"...thành Thanh Châu cùng năm vạn quân Địch Hỏa sẽ chìm trong biển nước. Một trận định giang sơn!"

# EFFECT: sfx_thunder_distant

* [Khảo sát kỹ tác động tới bá tánh hạ lưu]
  "Nước lũ tràn bờ, liệu có nhấn chìm thôn xóm của dân thường?"
  
  Giả Hủ thở dài: "Chiến tranh xưa nay nào có vẹn toàn đôi đường. Nếu không xả lũ, quân ta phải công thành ròng rã nửa năm, thương vong tướng sĩ không dưới ba vạn, dân chúng trong thành cũng chết đói."
  
  -> flood_preparation_choice

=== flood_preparation_choice ===
# SCENE_TYPE: choice

* [Bí mật di tản dân lành hạ lưu trước ba ngày rồi mới xả lũ]
  ~ gold -= 3000
  ~ affinity_trieu_van += 25
  ~ suspicion -= 10
  ~ unlocked_flood = true
  
  Quý Bình An quyết đoán: "Ta muốn thắng, nhưng không muốn giẫm lên xương máu đồng bào vô tội! Xuất 3.000 Vàng, lệnh cho Triệu Vân dẫn kỵ binh cải trang thành thương đoàn, trong ba đêm bí mật di tản toàn bộ bách tính hạ lưu sang vùng cao!"
  
  Triệu Vân rực sáng ánh mắt: "Mạt tướng tuân lệnh! Dù phải thức trắng ba đêm cũng quyết đưa toàn bộ người già trẻ nhỏ an toàn!"
  
  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Xả Lũ Sông Thanh Thủy (Tầng 3 Combat)|unlock
  # EFFECT: unlock_feature|feature_water_stratagem
  
  [HỆ THỐNG]: Kế sách Thủy Công được kích hoạt! Tích lũy nước 3 giai đoạn để hủy diệt xe đục thành của địch. Lòng dân quy phục tột bậc!
  
  -> chapter_35_complete

* [Xả lũ bất ngờ ngay trong đêm mưa bão để đạt hiệu quả tối đa]
  ~ suspicion += 20
  ~ affinity_gia_hu += 20
  ~ unlocked_flood = true
  
  "Quân cơ thần tốc! Địch Hỏa là kẻ xảo quyệt, nếu di tản sẽ để lộ phong thanh. Đắp đê thật cao, chờ thời cơ phóng thủy!"
  
  Giả Hủ cúi đầu: "Phò mã quyết đoán phi thường, tất thành đại nghiệp."
  
  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Bạo Lũ Diệt Địch (Sát Thương Tối Đa)|unlock
  # EFFECT: unlock_feature|feature_water_stratagem
  
  -> chapter_35_complete

=== chapter_35_complete ===
* [Kết thúc Chương 35]
  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 35: Đại Kế Thủy Công Dòng Thanh Thủy|milestone
  # EFFECT: chapter_complete|35
  -> chapter_43_transition

// ============================================================
// CHƯƠNG 43: ĐẠI DOANH TÍCH TRỮ QUÂN LƯƠNG
// ============================================================

=== chapter_43_transition ===
# CHAPTER_TITLE: Hồi 9 · Chương 43: Vạn Thạch Quân Lương Tiền Tuyến
# BACKGROUND: bg_granary_depot
# MUSIC: bgm_logistics_busy
# ACTORS: qui_binh_an|right|armored, gao_shun|left|reporting

~ chapter = 43

Đoàn xe bò kéo chở đầy bao tải lương thực nối đuôi nhau như rồng rắn tiến vào đại doanh Bắc Cương.

Cao Thuận cầm sổ bộ kiểm đếm, nét mặt giãn ra nụ cười hiếm hoi:

"Báo cáo Phò mã gia! Toàn bộ 50.000 hộc lương thảo thu mua từ thương đoàn Giang Đông và Tây Lăng đã nhập kho an toàn. Quân ta hiện có đủ lương thực ăn trong trọn vẹn một năm!"

# EFFECT: sfx_cheer_soldiers

~ rations += 50000
~ jade += 10

Quý Bình An nhìn kho lương cao như núi. Đây chính là quả ngọt của hệ thống kinh tế xà phòng Thấu Hoa Cao và tầm nhìn hậu cần chiến lược.

"Binh mã chưa động, lương thảo đi trước. Có kho lương này, quân sĩ không còn sợ hãi mùa đông lạnh giá nữa!"

* [Thưởng lớn cho binh sĩ và trích lương tế bần]
  ~ gold -= 2000
  ~ affinity_gaoshun += 15
  ~ affinity_trieu_van += 15
  
  "Phát rượu thịt cho toàn quân ăn mừng! Trích 5.000 hộc lương cứu đói cho nạn dân xung quanh quân doanh!"
  
  Tiếng hoan hô vang dậy đất trời. Sĩ khí quân đoàn đạt mốc tuyệt đối 100%!
  
  # EFFECT: show_toast|🌾 QUÂN LƯƠNG ĐẠT 50.000 HỘC — Sĩ Khí Quân Sĩ Tối Đa|reward
  
  -> chapter_43_complete

=== chapter_43_complete ===
* [Kết thúc Chương 43]
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

Thành Thanh Châu rung chuyển dữ dội dưới làn mưa tên và đá lửa.

Dưới chân thành, năm vạn quân phản loạn do đại tướng Địch Hỏa chỉ huy dàn trận kín đặc như kiến cỏ.

Mười cỗ xe đục thành khổng lồ bọc thép đen kịt đang ầm ầm tiến thẳng tới cổng thành chính!

# EFFECT: camera_shake|0.9
# EFFECT: sfx_siege_ram_hit

Địch Hỏa cưỡi hắc mã, vung thanh Bạo Liệt Đao gầm thét:

"Quý Bình An! Phò mã phế vật! Hôm nay ta sẽ san bằng thành này, lấy đầu ngươi dâng cho Nam Ly Vương!"

Quý Bình An đứng trên tường thành cao, áo choàng đỏ tung bay trong gió lộng. Triệu Vân giáp bạc sáng ngời, Cao Thuận dựng khiên thép Hãm Trận Doanh, Giả Hủ cầm cờ hiệu phát lệnh.

"Tướng sĩ Đại Vũ! Hôm nay là ngày định đoạt vận mệnh giang sơn!"

# EFFECT: screen_flash|#FFD700|600

* [Hạ lệnh nghênh chiến toàn diện — Kích hoạt Tầng 3 Tactical Card Battler!]
  # EFFECT: trigger_battle|battle_ch48_thanh_chau
  -> thanh_chau_epic_battle

=== thanh_chau_epic_battle ===
// [Chiến trường chuyển sang Tầng 3 Thẻ Bài Sa Trường]
// Người chơi trải qua trận thủ thành 3 làn, phá hủy xe đục thành và boss Địch Hỏa

# BACKGROUND: bg_thanh_chau_aftermath
# MUSIC: bgm_triumph_sunrise
# ACTORS: qui_binh_an|right|triumphant, trieu_van|right|bowing, gao_shun|left|kneeling, jia_xu|left|satisfied

Nước lũ Thanh Thủy được xả xuống đúng thời khắc quyết định!

Thác nước cuồn cuộn như rồng gầm cuốn phăng toàn bộ trận địa xe đục thành của địch.

Triệu Tử Long tung người xuống ngựa, Long Đảm Thương xuyên phá hàng ngũ bắt sống Địch Hỏa ngay giữa dòng nước xiết!

# EFFECT: sfx_victory_fanfare
# EFFECT: screen_flash|#FFFFFF|1000

Năm vạn quân địch tan rã hoàn toàn. Cờ xí Đại Vũ bay phấp phới trên cổng thành Thanh Châu!

~ gold += 20000
~ rations += 50000
~ imperial_prestige += 2
~ suspicion -= 15

Triệu Vân áp giải Địch Hỏa quỳ trước mặt Quý Bình An:

"Báo cáo Phò mã gia! Chủ tướng địch Địch Hỏa đã bị bắt sống! Toàn cõi Bắc Cảnh đã được bình định sạch bóng quân thù!"

Cao Thuận thu khiên: "Tướng sĩ không một ai làm nhục mệnh lệnh của Phò mã!"

Giả Hủ khẽ mỉm cười: "Bản tin thắng trận đã hỏa tốc phi về kinh đô. Vũ Hoàng tất phải phong vương bái tướng cho ngài!"

* [Tuyên bố kết thúc chiến dịch Bắc Chinh — Khải hoàn hồi triều!]
  -> season_1_finale

=== season_1_finale ===
# BACKGROUND: bg_imperial_hall_golden
# MUSIC: bgm_imperial_grandeur
# ACTORS: vu_hoang|center|impressed, qui_binh_an|right|kneeling_hero

Kinh đô Kim Loan Điện rực rỡ cờ hoa chào đón đoàn quân thắng trận khải hoàn.

Vũ Hoàng đích thân rời ngai vàng bước xuống thềm rồng, đỡ lấy hai tay Quý Bình An:

"Trẫm thật không nhìn lầm ngươi! Từ một phò mã hàn vi, ngươi đã lập nên chiến công vĩ đại nhất trăm năm qua của Đại Vũ!"

"Truyền chỉ trẫm! Thăng phong Quý Bình An làm CHINH BẮC ĐẠI TƯỚNG QUÂN, ban kim ấn tử thụ, thống lĩnh mười vạn đại quân!"

# EFFECT: screen_flash|#FFD700|1200
# EFFECT: sfx_gong_ancient

[HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ!
[HỆ THỐNG]: Hoàn thành xuất sắc TOÀN BỘ HỒI 1 (Chương 1 ➔ Chương 52)!
[HỆ THỐNG]: Mở khóa chức danh: Chinh Bắc Đại Tướng Quân. Uy danh triều đình đạt Cấp 4!

* [Khép lại thiên sử thi Hồi 1 & Hướng tới mùa giải mới]
  # EFFECT: show_toast|🏆 HOÀN THÀNH TOÀN BỘ HỒI 1 (CHƯƠNG 1 - 52) ĐẠI THẮNG!|triumph
  # EFFECT: chapter_complete|52
  -> END
