import json, sys

sys.stdout.reconfigure(encoding='utf-8')

# Let's define the character dictionary
characters = [
    {
        "id": "CHAR_QUY_BINH_AN",
        "canonical_name": "Quý Bình An",
        "aliases": ["Phò Mã Gia", "Tịnh Kiên Vương", "Thiên Uy Thượng Tướng Quân", "Đại Hán Khai Quốc Hoàng Đế", "Bệ Hạ", "Chủ Công"],
        "faction": "Đại Hán (tiền thân Đại Vũ)",
        "role": "Nhân vật chính / Hoàng Đế Khai Quốc Đại Hán",
        "martial_realm": "Tông Sư -> Đại Tông Sư -> Bán Thánh (Võ lực 100+)",
        "first_appearance_in_range": "Chương 301",
        "signature_equipment": ["Bá Vương Thương", "Thiên Tử Kiếm (Thiên mệnh chuyên chúc)", "Chiếu Dạ Ngọc Sư Tử"],
        "key_abilities": [
            "Hoàng Đạo Long Khí Hộ Thể (miễn nhiễm tà thuật, ám sát)",
            "Ngôn Xuất Pháp Tùy (lời nói uy áp thiên hạ)",
            "Du Long Thương Pháp (+6 võ lực)",
            "Kinh Hồng Thân Pháp (+4 võ lực)",
            "Bá Vương Thương Pháp (+9 võ lực)",
            "Hệ thống Anh Linh Thao Túng & Định Mệnh Tranh Bá"
        ],
        "relationships": {
            "family": "Tứ công tử Quý gia; phụ thân Quý Vô Song; đại ca Quý Bình Sinh, nhị ca Quý Bình Xuyên, tam ca Quý Bình Thường; thê tử Điêu Thuyền (Quốc Hậu), con trai Quý Sơn Hà (Thái tử), con nuôi Trầm Hạo",
            "allies": "Toàn bộ mưu thần võ tướng Đại Hán (Tuân Úc, Quách Gia, Cổ Hủ, Lý Nho, Chu Du, Triệu Vân, Quan Vũ, Trương Phi, Hoàng Trung, Mã Siêu, Điển Vi, Hứa Chử, Cam Ninh, Vương Việt, Đào Nhã, Mã Quân, Hoa Đà)",
            "rivals": "Tây Lăng Vương Trương Bất Minh, Cung Ngạo, Bùi Khuyết, Quỷ Thánh, Thế lực Đại La Đế Quốc"
        },
        "biography_arc2": "Từ Tịnh Kiên Vương nhiếp chính, phá tan mạng lưới Thiên Cơ Lâu Đại Vũ, lãnh đạo chiến dịch Tây Chinh. Dùng kế 'tam nhượng đế vị' để dẫn tới sự kiện Thiên hạ tập thể nguyện, chính thức đăng cơ Hoàng Đế. Đổi quốc hiệu thành Đại Hán, niên hiệu Định Quốc năm đầu. Ban bố Bốn chính lệnh, mở mang bờ cõi, xây dựng Học Cung và hệ thống giao thông huyết mạch. Trải qua đại chiến Ngưu Khánh Châu, triệt hạ Tần gia Tây Lăng, thu phục Huyết Y Các, triệu hoán Ngũ Hổ Tướng tề tụ."
    },
    {
        "id": "CHAR_QUACH_GIA",
        "canonical_name": "Quách Gia",
        "aliases": ["Quách Phụng Hiếu", "Quỷ Tài", "Thiên Mệnh Mưu Thần", "Hữu Thừa Tướng"],
        "faction": "Đại Hán",
        "role": "Thiên Mệnh Mưu Thần / Hữu Thừa Tướng Đại Hán / Quân sư tối cao",
        "martial_realm": "Trí mưu siêu phàm (Trí lực ban đầu 99 -> đột phá 104)",
        "first_appearance_in_range": "Chương 382",
        "signature_equipment": ["Bầu rượu hồ lô", "Quạt xếp", "Chiến xa mưu thần"],
        "key_abilities": [
            "Nghịch Thiên Cải Mệnh: Mưu trí thông thiên triệt địa, dự đoán cục diện chiến trường chuẩn xác đến kinh ngạc",
            "Đặc thù thiên phú 1 - Dự Phán: Đọc thấu toàn bộ chiến thuật và cạm bẫy của đối thủ trước nhiều bước",
            "Đột Phá Thiên Mệnh (Ch.428): Trí lực +4 đạt 104 điểm, thọ mệnh tăng thêm 50 năm, phá giải lời nguyền chết yểu",
            "Thập Thắng Thập Bại Luận: Khả năng phân tích tâm lý đối thủ và bố trí đại cục toàn diện"
        ],
        "relationships": {
            "monarch": "Tuyệt đối trung thành với Quý Bình An",
            "disciple": "Sư phụ văn hóa của Trầm Hạo (nhận 2 vò rượu quý 10 năm làm lễ bái sư)",
            "colleagues": "Phối hợp hoàn hảo cùng Tuân Úc (Tả Thừa Tướng), Chu Du, Cổ Hủ, Lý Nho"
        },
        "biography_arc2": "Được Quý Bình An triệu hoán bằng 500,000 vàng ở Ch.382, kích hoạt hệ thống Thiên Mệnh và Hoàng Đạo khí vận. Đóng vai trò đạo diễn tinh thần cho màn đăng cơ xưng đế hoàn mỹ của Quý Bình An. Tại Ch.428 được giải tỏa thiên phú Dự Phán và đột phá sinh mệnh, gia tăng 50 năm thọ mệnh, mở khóa triệu hoán Thiên Mệnh Võ Tướng. Quách Gia trực tiếp điều phối chiến dịch Ngưu Khánh Châu, mưu đoạt Tây Lăng và bố cục khống chế Huyết Y Các."
    },
    {
        "id": "CHAR_QUAN_VU",
        "canonical_name": "Quan Vũ",
        "aliases": ["Quan Vân Trường", "Mỹ Nhiễm Công", "Võ Thánh", "Thiên Mệnh Võ Tướng"],
        "faction": "Đại Hán",
        "role": "Thiên Mệnh Võ Tướng tối cao / Ngũ Hổ Thượng Tướng chi thủ",
        "martial_realm": "Võ Thánh / Thánh Giả Cực Hạn (Võ lực 139 - Đỉnh phong tuyệt đối)",
        "first_appearance_in_range": "Chương 598",
        "signature_equipment": ["Thanh Long Yển Nguyệt Đao (+10 võ lực)", "Xích Thố Mã (+10 võ lực)"],
        "key_abilities": [
            "Đặc thù thiên phú - Đơn Kỵ (+10 võ lực): Khả năng xung trận một ngựa chém tướng đoạt cờ, uy áp vạn quân",
            "Bộ tứ tuyệt kỹ: Trảm Mã Đao Pháp, Phi Long Trảm, Hoành Tảo Hoang Vũ, Kéo Đao Kế (Đảo Kích) (+8 võ lực)",
            "Kích hoạt toàn bộ Ngũ Hổ Tướng Ràng Buộc (5/5): Kích phát lĩnh vực tối thượng 'Ngũ Hổ Tuyệt Thế', tăng toàn bộ Ngũ Hổ +3 võ lực vĩnh viễn"
        ],
        "relationships": {
            "monarch": "Tôn phụng Quý Bình An làm chúa tể",
            "brothers": "Ngũ Hổ Tướng (Triệu Vân, Trương Phi, Hoàng Trung, Mã Siêu)"
        },
        "biography_arc2": "Xuất hiện ở Ch.598 khi Quý Bình An chi 2 triệu vàng triệu hoán. Sự xuất hiện của Quan Vũ hoàn thiện trọn vẹn phong ấn Ngũ Hổ Tướng, kích hoạt lĩnh vực Ngũ Hổ Tuyệt Thế, mang lại cho Quý Bình An thanh kiếm Thiên Tử Kiếm. Với võ lực đạt 139 điểm, Quan Vũ trở thành chiến lực đỉnh phong uy hiếp toàn bộ các Thánh Giả của chư quốc."
    },
    {
        "id": "CHAR_TRIEU_VAN",
        "canonical_name": "Triệu Vân",
        "aliases": ["Triệu Tử Long", "Thường Sơn Triệu Tử Long", "Bạch Mã Tướng Quân"],
        "faction": "Đại Hán",
        "role": "Hổ Tướng Tiên Phong / Đại Tướng Quân / Thánh Giả Hộ Quốc",
        "martial_realm": "Đế Cảnh Đỉnh Phong (115) -> Bán Thánh (125) -> Thánh Giả (132-134)",
        "first_appearance_in_range": "Chương 303",
        "signature_equipment": ["Long Đảm Lượng Ngân Thương", "Bạch Long Mã", "Thanh Cương Kiếm"],
        "key_abilities": [
            "Bách Điểu Triều Phụng Thương Pháp & Thất Thám Bàn Long Thương",
            "Thiên phú thứ hai - Nhai Giác (+2 võ lực): Càng chiến đấu càng kiên cường, bất tử trong loạn quân",
            "Lĩnh vực Thánh Giả: Đột phá tại Ch.502, đánh bại Thánh giả sát thủ Xích Hồng Y"
        ],
        "relationships": {
            "monarch": "Cận vệ và thống soái đáng tin cậy nhất của Quý Bình An",
            "allies": "Ngũ Hổ Tướng huynh đệ; phối hợp Chu Du, Trương Liêu"
        },
        "biography_arc2": "Đánh bại Tần Tứ Nghiệp tại cửa ải Lâm Quan Thành (Ch.321-324). Đóng vai trò dụ địch trong kế sách Hỏa thiêu Ngưu Khánh Châu của Chu Du. Tại Ch.502 chính thức đột phá lên Thánh Giả (võ lực 132-134), một thương đánh bại Đệ nhất sát thủ Xích Hồng Y của Huyết Y Các, bắt sống Từ Thiên Huyền tại Liễu Châu."
    },
    {
        "id": "CHAR_TRUONG_PHI",
        "canonical_name": "Trương Phi",
        "aliases": ["Trương Dực Đức", "Vạn Nhân Địch", "Tuyệt Thế Võ Tướng"],
        "faction": "Đại Hán",
        "role": "Ngũ Hổ Thượng Tướng / Đại Tướng Tiên Phong Trảm Tướng",
        "martial_realm": "Bán Thánh Đỉnh Phong -> Bộc phát Thánh Giả (Võ lực 125+)",
        "first_appearance_in_range": "Chương 443",
        "signature_equipment": ["Bát Trượng Xà Mâu (Trượng Bát Xà Mâu)", "Ô Truy Mã"],
        "key_abilities": [
            "Sư Tử Hống / Nộ Khí Bộc Phát: Khi cuồng nộ có thể tăng vọt chiến lực vượt cấp Thánh Giả",
            "Xà Mâu Bạo Liệt Pháp: Sức công kích xuyên phá cực mạnh, chuyên khắc chế thiết giáp",
            "Ngũ Hổ Tướng Ràng Buộc (4/5)"
        ],
        "relationships": {
            "monarch": "Tận trung bảo vệ Quý Bình An",
            "brothers": "Ngũ Hổ Tướng (Quan Vũ, Triệu Vân, Hoàng Trung, Mã Siêu)"
        },
        "biography_arc2": "Được Quý Bình An triệu hoán ở Ch.443. Tại Ch.456-457 khi Quý Bình Thường tập kích Quý Bình An tại Nhất Tuyến Thiên, Trương Phi nổi giận bộc phát uy lực cấp Thánh Giả đẩy lùi Quý Bình Thường. Xuất chiến cứu viện Ngưu Khánh Châu, dũng mãnh đè bẹp quân Nam Ly của Lạc Thiên Thanh."
    },
    {
        "id": "CHAR_MA_SIEU",
        "canonical_name": "Mã Siêu",
        "aliases": ["Mã Mạnh Khởi", "Cẩm Mã Siêu", "Tây Lương Mã Siêu"],
        "faction": "Đại Hán",
        "role": "Ngũ Hổ Thượng Tướng / Kỵ Binh Thống Soái",
        "martial_realm": "Bán Thánh Tuyệt Đỉnh (Võ lực 122)",
        "first_appearance_in_range": "Chương 350",
        "signature_equipment": ["Long Kỵ Thương (+7 võ lực)", "Thất Tinh Kiếm (+6 võ lực)", "Sa Lý Phi (Bên trong cát bay) (+8 võ lực)"],
        "key_abilities": [
            "Thuật Cưỡi Ngựa Tối Thượng: Mã chiến tăng 30% khí thế, 5% võ lực",
            "Bộ tứ công pháp: Tiên Nhân Chỉ Lộ, Tây Lương Chưởng, Xuất Thủ Pháp, Hồi Mã Thương (+6 võ lực)",
            "Đặc thù thiên phú - Tấn Công Lĩnh Vực: Phạm vi 1000m, binh sĩ dưới quyền tăng 30% chiến lực",
            "Ngũ Hổ Tướng Ràng Buộc (3/5 -> mang lại 3 điểm thuộc tính tự do)"
        ],
        "relationships": {
            "monarch": "Được Quý Bình An dùng 1.2 triệu vàng tống tiền Vân Ninh để chiêu mộ và nâng cấp max chỉ số",
            "comrades": "Phối hợp cùng Cổ Hủ đi Nam Ly giải cứu Đào Nhã và trinh sát Thiên Cơ Lâu"
        },
        "biography_arc2": "Được triệu hoán ở Ch.350, là mảnh ghép Ngũ Hổ thứ 3. Với dung mạo khôi ngô cuồng dã, Mã Siêu được giao sứ mệnh trở thành đối thủ khắc tinh chấm dứt danh tiếng của Tây Lương Thiết Kỵ. Cùng Cổ Hủ xuôi nam thâm nhập Nam Ly, lập nhiều chiến công hiển hách."
    },
    {
        "id": "CHAR_VUONG_VIET",
        "canonical_name": "Vương Việt",
        "aliases": ["Đệ Nhất Kiếm Sư Thiên Hạ", "Kiếm Thánh", "Đặc Thù Tuyệt Thế Anh Linh"],
        "faction": "Đại Hán",
        "role": "Kiếm Thánh Ám Sát & Tình Báo / Hộ Giá / Độc Hành Diệt Môn",
        "martial_realm": "Thánh Giả Đỉnh Phong (Võ lực 134)",
        "first_appearance_in_range": "Chương 520",
        "signature_equipment": ["Thừa Ảnh Kiếm (+10 võ lực)", "Tuyệt Ảnh Thần Mã"],
        "key_abilities": [
            "Thục Sơn Thiên Kiếm, Quỷ Ảnh Tam Sát, Bách Dạ Du Hành (+9 võ lực)",
            "Đặc thù thiên phú - Dịch Kiếm (+15 võ lực): Kiếm thuật biến ảo vô hình, sát chiêu tuyệt đối",
            "Đột phá cảnh giới (+5 võ lực -> 134 võ lực): Đè bẹp mọi kiếm khách và thích khách trong thiên hạ"
        ],
        "relationships": {
            "monarch": "Tuyệt đối phục tùng mệnh lệnh của Quý Bình An",
            "cover_identity": "Phối hợp cùng Cơ Vô Thiên, ngụy trang thân phận mật thám sang Tây Lăng"
        },
        "biography_arc2": "Được triệu hoán ngẫu nhiên bằng Anh Hồn Lệnh tại Ch.520 sau khi ngân khố Quý Bình An vượt 12 triệu kim. Vương Việt cùng Cơ Vô Thiên sang Tây Lăng, một mình đột nhập phủ Trấn Quốc Đại Tướng Quân Tần Tứ Nghiệp, nhất kiếm trảm sát Tần Tứ Nghiệp diệt môn Tần gia (Ch.526-527). Tại Ch.568, Vương Việt một kiếm đánh bại Xích Hồng Y ngay tại Đế đô, thu phục Huyết Y Các, sau đó trấn áp Thánh giả Mạc Thiên Tinh."
    },
    {
        "id": "CHAR_HOA_DA",
        "canonical_name": "Hoa Đà",
        "aliases": ["Hoa Nguyên Hóa", "Thần Y", "Đặc Thù Tuyệt Thế Anh Linh"],
        "faction": "Đại Hán",
        "role": "Viện Trưởng Thái Y Viện / Đệ Nhất Y Thánh",
        "martial_realm": "Y Đạo Tông Sư (Trí lực 95+)",
        "first_appearance_in_range": "Chương 361",
        "signature_equipment": ["Hòm thuốc Thanh Nang", "Dao mổ sọ chuyên dụng", "Ma Phế Tán"],
        "key_abilities": [
            "Tuyệt thế thiên phú - Hồi Xuân: Chữa lành mọi vết thương trí mạng, xua tan cổ độc",
            "Kỹ thuật phẫu thuật Mổ Sọ: Đại phẫu thuật mở hộp sọ gắp Thực Não Trùng cứu sống Lý Nho (Ch.419-423)",
            "Chế tạo dược hoàn hồi phục sinh lực và giải độc toàn diện"
        ],
        "relationships": {
            "monarch": "Y sĩ riêng bảo vệ sức khỏe Quý Bình An và triều đình",
            "patients": "Cứu sống Lý Nho khỏi cái chết do cổ độc ăn não"
        },
        "biography_arc2": "Được triệu hoán ở Ch.361 sau khi hệ thống thăng cấp. Tham gia cứu mạng Lý Nho bằng ca đại phẫu thuật mổ não chấn động thế giới ở Ch.423. Đóng góp y thuật giúp Quách Gia kéo dài sinh mạng và hỗ trợ quân y Đại Hán."
    },
    {
        "id": "CHAR_MA_QUAN",
        "canonical_name": "Mã Quân",
        "aliases": ["Mã Đức Hành", "Thần Tượng", "Đặc Thù Tuyệt Thế Anh Linh"],
        "faction": "Đại Hán",
        "role": "Viện Trưởng Thiên Cung Học Viện / Đệ Nhất Công Trình Sư",
        "martial_realm": "Công nghệ & Chế tác (Trí lực 95 -> 98 sau mở thiên phú Xảo Nghĩ)",
        "first_appearance_in_range": "Chương 495",
        "signature_equipment": ["Thước dây công nghệ", "Bản vẽ cơ quan", "Lò rèn thép Thiên Cung"],
        "key_abilities": [
            "Đặc thù thiên phú 2 - Xảo Nghĩ (Ch.558): Khả năng cải tiến trang bị, binh khí vượt thời đại",
            "Chế tạo Thiết Giáp Môn (cửa thành bọc thép nguyên khối): Giúp Uyển Châu thành phòng thủ bất khả xâm phạm",
            "Cải tiến vũ khí Tấn Thiết Song Kích cho Điển Vi (Ch.516)",
            "Nghiên cứu nỏ liên châu cơ quan và các cỗ máy chiến tranh công thủ thành"
        ],
        "relationships": {
            "monarch": "Quý Bình An trực tiếp bảo trợ tài chính và giao toàn quyền Thiên Cung Học Viện",
            "collaborator": "Hợp tác chặt chẽ cùng Nữ Công Bộ Thượng Thư Đào Nhã"
        },
        "biography_arc2": "Được triệu hoán tại Ch.495 sau khi khen thưởng Trương Phi nhập Thánh và Triệu Vân quy vị. Mã Quân trở thành trụ cột công nghiệp quốc phòng của Đại Hán, biến Thiên Cung Học Viện thành trung tâm chế tạo vũ khí tối tân, giúp đánh bại cuộc vây hãm Uyển Châu của Mạc Thiên Tinh."
    },
    {
        "id": "CHAR_HUA_CHU",
        "canonical_name": "Hứa Chử",
        "aliases": ["Hứa Trọng Khang", "Hổ Si", "Tuyệt Thế Võ Tướng"],
        "faction": "Đại Hán",
        "role": "Thống Soái Hổ Bí Quân / Cận Vệ Hoàng Đế",
        "martial_realm": "Bán Thánh Tuyệt Đỉnh (Võ lực ban đầu 97 -> kích hoạt ràng buộc & vũ khí đạt 124)",
        "first_appearance_in_range": "Chương 554",
        "signature_equipment": ["Tấn Thiết Cổ Điến Đao (+8 võ lực)", "Đại Uyển Mã (+8 võ lực)"],
        "key_abilities": [
            "Hổ Bí Song Hùng Ràng Buộc (cùng Điển Vi): Tăng vĩnh viễn +3 võ lực cho cả Hứa Chử và Điển Vi",
            "Bốn loại công pháp đao pháp bạo lực (+6 võ lực)",
            "Hổ Si Chi Lực: Thể chất mình đồng da sắt, cận chiến cuồng bạo"
        ],
        "relationships": {
            "monarch": "Cận vệ trung thành Quý Bình An",
            "partner": "Bạn hữu và tri kỷ võ lực cùng Điển Vi"
        },
        "biography_arc2": "Được Quý Bình An triệu hoán bằng 100,000 vàng ở Ch.554. Cùng Điển Vi tạo thành cặp đôi 'Hổ Bí Song Hùng' vô địch cận chiến. Xuất trận truy sát Mạc Thiên Tinh trong trận đại thắng Uyển Châu Thành."
    },
    {
        "id": "CHAR_CAM_NINH",
        "canonical_name": "Cam Ninh",
        "aliases": ["Cam Hưng Bá", "Cẩm Phàm Tặc", "Tuyệt Thế Võ Tướng"],
        "faction": "Đại Hán",
        "role": "Thủy Quân Phó Đô Đốc / Dũng Tướng Đột Kích",
        "martial_realm": "Bán Thánh (Võ lực 123)",
        "first_appearance_in_range": "Chương 555",
        "signature_equipment": ["Khiếu Nguyệt Đao (+8 võ lực)", "Câu Liêm Song Kích (+6 võ lực)", "Khoái Hàng Thần Mã (+8 võ lực)"],
        "key_abilities": [
            "Đặc thù thiên phú - Cẩm Phàm (+10 võ lực): Thủy chiến và dạ kích vô song, chuông bạc rung chuyển lòng địch",
            "Song binh khí thuần thục: Đao kích phối hợp công thủ toàn diện"
        ],
        "relationships": {
            "monarch": "Quý Bình An trao trọng trách chấn hưng thủy quân",
            "commander": "Dưới quyền Thủy quân Đại Đô Đốc Chu Du"
        },
        "biography_arc2": "Được triệu hoán ở Ch.555, tăng cường sức mạnh vượt bậc cho thủy quân Đại Hán để sẵn sàng cho chiến dịch kiểm soát các tuyến sông ngòi và bờ biển hướng Nam Ly."
    },
    {
        "id": "CHAR_DAO_NHA",
        "canonical_name": "Đào Nhã",
        "aliases": ["Nữ Công Bộ Thượng Thư", "Đào Cô Nương"],
        "faction": "Đại Hán",
        "role": "Nữ Công Bộ Thượng Thư đầu tiên / Đệ Nhất Địa Lý Đại Sư",
        "martial_realm": "Học giả Địa Lý / Kiến Trúc Công Trình",
        "first_appearance_in_range": "Chương 346",
        "signature_equipment": ["Hộp bản đồ địa hình Đại Hán", "Bút vẽ địa lý đặc chủng"],
        "key_abilities": [
            "Khảo sát địa hình và vẽ bản đồ chi tiết toàn cảnh 4 quốc gia",
            "Quy hoạch đại công trình: Gặp núi mở đường, gặp nước bắc cầu, san phẳng hiểm trở tạo mạng lưới đường cao tốc phục vụ quân sự và kinh tế"
        ],
        "relationships": {
            "monarch": "Được Quý Bình An vô cùng trân trọng và phá lệ phong quan nhất phẩm Nữ Thượng Thư",
            "family": "Con gái của Đào tiên sinh"
        },
        "biography_arc2": "Bị giam cầm tại Nam Ly, mang theo bản đồ địa hình quý giá được Quý Bình An cử Cổ Hủ và Mã Siêu giải cứu (Ch.399-400). Sau khi hồi phục, tại Ch.528 nàng đệ trình đại kế hoạch giao thông toàn quốc và được Quý Bình An sắc phong làm Nữ Công Bộ Thượng Thư đầu tiên của Đại Hán."
    },
    {
        "id": "CHAR_DIEU_THUYEN",
        "canonical_name": "Điêu Thuyền",
        "aliases": ["Điêu Thuyền nương nương", "Đại Hán Quốc Hậu", "Thần Cơ Nữ"],
        "faction": "Đại Hán",
        "role": "Quốc Hậu Đại Hán / Thủ lĩnh mạng lưới tình báo Hồng Nhan",
        "martial_realm": "Mị lực đỉnh phong (Mị lực 100+)",
        "first_appearance_in_range": "Chương 301",
        "signature_equipment": ["Trống trận trợ uy", "Phượng Tê Cung y phục"],
        "key_abilities": [
            "Đặc thù thiên phú - Hồng Nhan (giải tỏa Ch.427): Thiết lập và thao túng mạng lưới nữ điệp báo khắp các thanh lâu, quan phủ tứ quốc",
            "Cổ vũ sĩ khí chiến trường (từng đích thân đánh trống trận tại Bắc Cô Sơn Ch.337)"
        ],
        "relationships": {
            "husband": "Quý Bình An (được phong làm Quốc Hậu tại Ch.427)",
            "son": "Quý Sơn Hà (được lập làm Thái tử Đại Hán)"
        },
        "biography_arc2": "Đồng hành cùng Quý Bình An tại Bắc Cảnh, sinh hạ con trai đầu lòng Quý Sơn Hà. Tại Ch.337 đích thân leo lên thành lũy Bắc Cô Sơn gióng trống trợ uy cho tướng sĩ đánh tan 5 vạn quân Bùi Nguyên. Ở Ch.427 được chính thức sắc phong làm Đại Hán Quốc Hậu và mở khóa đặc thù thiên phú Hồng Nhan."
    },
    {
        "id": "CHAR_TRAM_HAO",
        "canonical_name": "Trầm Hạo",
        "aliases": ["Tiểu Trầm Hạo", "Con nuôi Hoàng Đế", "Tiên Phong Tướng Quân Thiếu Niên Binh"],
        "faction": "Đại Hán",
        "role": "Thống lĩnh Thiếu Niên Binh / Tiên Phong Doanh / Dũng sĩ tương lai",
        "martial_realm": "Thiên sinh thần lực (Võ nghệ tăng tiến thần tốc)",
        "first_appearance_in_range": "Chương 315",
        "signature_equipment": ["Trọng chùy", "Áo giáp thiếu niên binh"],
        "key_abilities": [
            "Thiên sinh thần lực: Sức mạnh bẩm sinh tay không cản ngựa",
            "Được thừa hưởng võ công cận chiến của Điển Vi và mưu lược của Quách Gia"
        ],
        "relationships": {
            "adoptive_father": "Quý Bình An (nhận làm nghĩa phụ sau khi lập công cứu giá)",
            "real_father": "Trầm Căn",
            "masters": "Quách Gia (thầy văn), Điển Vi (thầy võ)"
        },
        "biography_arc2": "Xuất hiện ở Ch.315 với sức mạnh kinh người cản đường cứu giá. Được Quý Bình An nhận làm con nuôi. Tại Ch.384, Trầm Hạo đem rượu quý của cha bái Quách Gia làm thầy học văn và bái Điển Vi học võ. Tại Ch.387, Quý Bình An ban bố chính lệnh giao cho Trầm Hạo chức vụ thủ lĩnh đội Thiếu Niên Binh đầu tiên của Đại Hán."
    },
    {
        "id": "CHAR_TU_NGOC_TRACH",
        "canonical_name": "Tử Ngọc Trạch",
        "aliases": ["Vũ Hoàng", "Đương kim bệ hạ (cũ)"],
        "faction": "Đại Vũ Hoàng Thất",
        "role": "Vũ Hoàng cuối cùng của Đại Vũ",
        "martial_realm": "Phàm nhân",
        "first_appearance_in_range": "Chương 303",
        "relationships": {
            "mother": "An thị (Thái hậu / Hoàng hậu cũ)",
            "sister": "Ninh An công chúa",
            "rival_partner": "Quý Bình An"
        },
        "biography_arc2": "Phong Quý Bình An làm Tịnh Kiên Vương ở Ch.303 và đàm đạo 'Nhất ngôn nhi vi thiên hạ pháp' ở Ch.305. Bất lực trước sự thao túng của An thị và thế lực ngoại bang, cuối cùng thoái vị nhường ngôi để bảo toàn mạng sống, chấm dứt thời đại Đại Vũ."
    },
    {
        "id": "CHAR_VU_VAN_CHAU",
        "canonical_name": "Vu Văn Châu",
        "aliases": ["Đại Vũ Thiên Cơ", "Vu Viện Sĩ", "Hàn Lâm Viện Viện Sĩ"],
        "faction": "Thiên Cơ Lâu Đại Vũ (cấu kết Tây Lăng)",
        "role": "Thủ lĩnh ngầm Thiên Cơ Lâu tại Đại Vũ / Mưu sĩ phản nghịch",
        "martial_realm": "Mưu sĩ thâm sâu",
        "first_appearance_in_range": "Chương 306",
        "biography_arc2": "Là người đứng sau danh xưng 'Đại Vũ Thiên Cơ', mượn danh nghĩa Hàn Lâm Viện viện sĩ phối hợp với Tây Lăng làm suy yếu quốc lực Đại Vũ suốt nhiều năm. Tại Ch.310-311, khi định tẩu thoát cùng cỗ xe của Ninh An công chúa qua cổng Tây thì bị Quý Bình An và Cẩm Y Vệ giăng bẫy bắt trọn ổ."
    },
    {
        "id": "CHAR_NINH_AN",
        "canonical_name": "Ninh An Công Chúa",
        "aliases": ["Cửu Công Chúa", "Quốc Công Phu Nhân", "Thê tử danh nghĩa Quý Bình An"],
        "faction": "Đại Vũ Hoàng Thất",
        "role": "Công chúa Đại Vũ",
        "martial_realm": "Phàm nhân",
        "first_appearance_in_range": "Chương 301",
        "biography_arc2": "Nàng là vợ trên danh nghĩa của Quý Bình An từ khi còn là phò mã. Mang số phận bi kịch, bị trúng độc và qua đời trên xích đu dưới gốc hoa lê (Ch.307-309), ứng nghiệm với lời sấm truyền của Đại Vũ Thiên Cơ."
    },
    {
        "id": "CHAR_TRUONG_BAT_MINH",
        "canonical_name": "Trương Bất Minh",
        "aliases": ["Tây Lăng Vương", "Quốc Chủ Tây Lăng", "Ảnh Đế"],
        "faction": "Tây Lăng Hoàng Thất",
        "role": "Quốc Chủ Tây Lăng / Nhân vật tâm cơ thâm hiểm nhất truyện",
        "martial_realm": "Ẩn tàng thâm sâu (Dưới trướng sở hữu đệ nhất Thánh Giả Thăng)",
        "first_appearance_in_range": "Chương 415",
        "relationships": {
            "daughters": "Hề Nhan công chúa",
            "confidants": "Mạc Thiên Tinh (Cảnh Vương), Thăng (Thánh Giả), Triệu Thiên Lỗi",
            "enemies": "Thế gia Tần gia, Văn Nhân gia, Quý Bình An"
        },
        "biography_arc2": "Nổi danh với biệt hiệu 'Ảnh đế' (Ch.580) vì tài diễn xuất ngụy trang vẻ ngoài nhu nhược, dễ bị lừa gạt để giấu kín dã tâm nuốt trọn giang sơn. Mượn tay Quý Bình An và Vương Việt diệt môn Tần gia, thanh trừng thế gia nội bộ. Ở Ch.572-600, Trương Bất Minh cải trang rời Nam Thiên Thành mang theo Thánh Giả Thăng hội tụ tại Tây Hoàng Thành để khởi động đại cục đối đầu."
    },
    {
        "id": "CHAR_HE_NHAN",
        "canonical_name": "Hề Nhan",
        "aliases": ["Tam Công Chúa Tây Lăng", "Hề Nhan Công Chúa"],
        "faction": "Tây Lăng Hoàng Thất (Đồng minh Quý Bình An)",
        "role": "Nhà ngoại giao / Mưu sĩ hoàng tộc Tây Lăng",
        "martial_realm": "Trí mưu sắc bén",
        "first_appearance_in_range": "Chương 317",
        "biography_arc2": "Tam công chúa Tây Lăng với nhãn quan chính trị vượt bậc. Liên tục đàm phán hợp tác kinh tế, thương nghiệp và giao lưu văn hóa với Quý Bình An. Thuyết phục Vân Ninh quy thuận (Ch.353), tạo cầu nối đưa Phó Dĩnh Thăng sang giảng dạy tại Học Cung Đại Hán."
    },
    {
        "id": "CHAR_MAC_THIEN_TINH",
        "canonical_name": "Mạc Thiên Tinh",
        "aliases": ["Cảnh Vương", "Thánh Giả Mạc Thiên Tinh"],
        "faction": "Tây Lăng Hoàng Thất",
        "role": "Cảnh Vương Tây Lăng / Thống soái quân đội / Thánh Giả ẩn giấu",
        "martial_realm": "Bán Thánh ngụy trang -> Thánh Giả thực thụ (Ch.578)",
        "first_appearance_in_range": "Chương 527",
        "biography_arc2": "Vương gia quyền lực của Tây Lăng, tâm phúc của Trương Bất Minh. Chỉ huy 5 vạn quân vây hãm Uyển Châu Thành nhưng bị Mã Quân, Hác Chiêu và Trương Liêu đánh bại thảm hại (Ch.561-570). Bộc lộ cảnh giới Thánh Giả ở Ch.578 nhưng hoàn toàn bị kiếm thuật của Vương Việt đè bẹp."
    },
    {
        "id": "CHAR_TAN_TU_NGHIEP",
        "canonical_name": "Tần Tứ Nghiệp",
        "aliases": ["Trấn Quốc Đại Tướng Quân Tây Lăng", "Thiết Kỵ Thống Soái"],
        "faction": "Tây Lăng (Tần gia)",
        "role": "Trấn Quốc Đại Tướng Quân / Thống soái Tây Lăng Thiết Kỵ",
        "martial_realm": "Bán Thánh Đỉnh Phong (Võ lực 120+)",
        "first_appearance_in_range": "Chương 317",
        "biography_arc2": "Thống lĩnh Tây Lăng Thiết Kỵ giao chiến Triệu Vân tại Lâm Quan Thành nhưng đại bại (Ch.321-324). Bị Trương Liêu và Chu Du phục kích ở Hoài Hà nhưng được thả về để gây mâu thuẫn nội bộ Tây Lăng. Cuối cùng tại Ch.526-527 bị Vương Việt đột nhập phủ trảm sát diệt môn."
    },
    {
        "id": "CHAR_VAN_NINH",
        "canonical_name": "Vân Ninh",
        "aliases": ["Bán Thánh Vân Ninh"],
        "faction": "Tây Lăng -> Thuộc hạ Hề Nhan",
        "role": "Danh tướng Bán Thánh Tây Lăng",
        "martial_realm": "Bán Thánh",
        "first_appearance_in_range": "Chương 323",
        "biography_arc2": "Bị Quý Bình An bắt sống tại trận đánh úp Linh Khê Thành (Ch.346-348). Quý Bình An tống tiền Tây Lăng 1.2 triệu vàng để lấy tiền triệu hoán Mã Siêu, sau đó Vân Ninh được Hề Nhan du thuyết thu phục về dưới trướng (Ch.353)."
    },
    {
        "id": "CHAR_LAC_THIEN_THANH",
        "canonical_name": "Lạc Thiên Thanh",
        "aliases": ["Thần Uy Đại Tướng Quân Nam Ly"],
        "faction": "Nam Ly Hoàng Triều",
        "role": "Thống soái tối cao quân đội Nam Ly",
        "martial_realm": "Bán Thánh Đỉnh Phong",
        "first_appearance_in_range": "Chương 322",
        "biography_arc2": "Chỉ huy 15 vạn quân Nam Ly vượt biên cương tấn công Bắc Cô Sơn nhưng bị Cổ Hủ dùng kế phản công mất Uyển Châu. Sau đó làm chủ lực liên quân tiến đánh Ngưu Khánh Châu (Ch.460-468), bị Chu Du hỏa thiêu thành trì và bị Trương Phi đánh tan nát phải rút chạy."
    },
    {
        "id": "CHAR_PHO_THUONG_QUAN",
        "canonical_name": "Phó Thương Quân",
        "aliases": ["Thái Tử Nam Ly", "Đại Tướng Quân Phó Thương Quân"],
        "faction": "Nam Ly Hoàng Triều",
        "role": "Thái tử nắm thực quyền quân đội Nam Ly",
        "martial_realm": "Đại Tông Sư / Thống lĩnh Thần Hỏa Quân",
        "first_appearance_in_range": "Chương 306",
        "biography_arc2": "Thái tử đầy tham vọng của Nam Ly, nắm giữ vũ khí hỏa dược Thần Hỏa Quân. Lên kế hoạch cướp đoạt chính quyền ở Ch.582 nhưng trúng mưu gian, bị Tri Mặc Bạch và Cung Ngạo đánh úp sát hại ở Ch.583."
    },
    {
        "id": "CHAR_CUNG_NGAO",
        "canonical_name": "Cung Ngạo",
        "aliases": ["Hộ Quốc Đại Tướng Quân Nam Ly"],
        "faction": "Nam Ly (Cung gia)",
        "role": "Gia chủ Cung gia / Kẻ tiếm quyền Nam Ly",
        "martial_realm": "Bán Thánh",
        "first_appearance_in_range": "Chương 450",
        "biography_arc2": "Đại diện thế gia Cung gia Nam Ly. Sau khi hợp tác cùng Tri Mặc Bạch sát hại Phó Thương Quân, Cung Ngạo tự phong Hộ Quốc Đại Tướng Quân độc chiếm quyền bính Nam Ly, thái độ hống hách kiêu căng (Ch.585, 591)."
    },
    {
        "id": "CHAR_TRI_MAC_BACH",
        "canonical_name": "Tri Mặc Bạch",
        "aliases": ["Thánh Giả Nam Ly"],
        "faction": "Nam Ly Hoàng Thất",
        "role": "Thánh Giả tối cao bảo hộ Nam Ly",
        "martial_realm": "Thánh Giả (Võ lực 130+)",
        "first_appearance_in_range": "Chương 583",
        "biography_arc2": "Thánh Giả hộ quốc của Nam Ly, ra tay trảm sát Phó Thương Quân và kịch chiến ngang ngửa với Xích Hồng Y ở Ch.584, sau đó được điều động ra biên cương chi viện Lạc Thiên Thanh."
    },
    {
        "id": "CHAR_XICH_HONG_Y",
        "canonical_name": "Xích Hồng Y",
        "aliases": ["Các Chủ Huyết Y Các", "Đệ Nhất Sát Thủ Thiên Hạ"],
        "faction": "Huyết Y Các (sau quy thuận Đại Hán)",
        "role": "Thủ lĩnh tổ chức ám sát đệ nhất thiên hạ",
        "martial_realm": "Thánh Giả Sát Thủ (Võ lực 130)",
        "first_appearance_in_range": "Chương 502",
        "biography_arc2": "Sát thủ Thánh Giả khét tiếng thiên hạ. Xuất hiện ám sát Quý Bình An ở Ch.502 nhưng bị Triệu Vân (vừa đột phá Thánh Giả) chặn đứng và đánh bại ở Ch.503. Lẻn vào Đại Hán Đế Đô ở Ch.568 thì bị Vương Việt nhất kiếm khuất phục, buộc phải giao quyền kiểm soát Huyết Y Các cho Vương Việt và Đại Hán."
    },
    {
        "id": "CHAR_QUY_THANH",
        "canonical_name": "Quỷ Thánh",
        "aliases": ["Tây Lăng Quỷ Quật Chủ", "Quỷ Đạo Tông Sư"],
        "faction": "Tây Lăng Quỷ Quật",
        "role": "Thủ lĩnh tà đạo Tây Lăng / Nghiên cứu Thú Nhân",
        "martial_realm": "Thánh Giả Tà Thuật",
        "first_appearance_in_range": "Chương 404",
        "biography_arc2": "Nắm giữ tà thuật Thâm Uyên Quỷ Đạo tại Tây Lăng Quỷ Quật. Chủ mưu kế hoạch biến đổi 'Thú Nhân' (Ch.505). Xuất hiện tại Thuyền Hoa Tây Lăng ở Ch.599 tham gia hội tụ các thế lực."
    },
    {
        "id": "CHAR_BUI_KHUOC",
        "canonical_name": "Bùi Khuyết",
        "aliases": ["Bùi Gia Chủ", "Đông Thương Tân Quốc Chủ"],
        "faction": "Đông Thương (Bùi gia)",
        "role": "Lãnh tụ Bùi gia / Nhân vật nắm quyền Đông Thương",
        "martial_realm": "Chính khách đại thế gia",
        "first_appearance_in_range": "Chương 491",
        "biography_arc2": "Đại diện thế lực Bùi gia nắm giữ thực quyền Đông Thương sau các biến động chiến tranh, mưu tính tranh quyền đoạt lợi và đối phó sức ép từ Đại Hán."
    },
    {
        "id": "CHAR_PHO_DINH_THANG",
        "canonical_name": "Phó Dĩnh Thăng",
        "aliases": ["Đại Nho Phó Lão", "Văn Đàn Lãnh Tụ Tây Lăng"],
        "faction": "Văn Đàn Tây Lăng -> Học Cung Đại Hán",
        "role": "Lãnh tụ văn đàn / Đại sư Nho học",
        "martial_realm": "Văn chương cái thế",
        "first_appearance_in_range": "Chương 305",
        "biography_arc2": "Đại Nho uy tín nhất của Tây Lăng. Được Quý Bình An dùng bộ tác phẩm 'Hiếu Kinh' truyền vào Tây Lăng để thuyết phục và mời sang làm Viện trưởng / Giảng sư cao cấp tại Học Cung Đại Hán (Ch.535-536)."
    },
    {
        "id": "CHAR_BI_DAO",
        "canonical_name": "Bí Đao",
        "aliases": ["Liên Thể Quái Nhân", "Sứ Giả Đại La"],
        "faction": "Đại La Đế Quốc",
        "role": "Dị nhân trinh sát / Manh mối Đại La",
        "martial_realm": "Thể chất dị biến đặc biệt",
        "first_appearance_in_range": "Chương 522",
        "biography_arc2": "Người liên thể dị dạng đến từ Đại La Đế Quốc hải ngoại. Bị bắt sống tại Ch.540, hé lộ sự tồn tại của đế quốc Đại La khổng lồ đang dòm ngó bờ cõi Trung Thổ."
    },
    {
        "id": "CHAR_HAC_CHIEU",
        "canonical_name": "Hác Chiêu",
        "aliases": ["Hác Bá Đạo", "Danh Tướng Thủ Thành 50 Ngàn Kim"],
        "faction": "Đại Hán",
        "role": "Trấn Thủ Đại Tướng Uyển Châu Thành",
        "martial_realm": "Đại Tông Sư (Chuyên tinh phòng thủ thành trì)",
        "first_appearance_in_range": "Chương 409",
        "biography_arc2": "Được triệu hoán ở Ch.409 bằng 50,000 vàng. Nổi danh với khả năng phòng ngự thành trì trứ danh. Được Quý Bình An phái đi phối hợp cùng Cao Thuận trấn giữ Uyển Châu Thành, chặn đứng mọi đợt công thành của Mạc Thiên Tinh."
    },
    {
        "id": "CHAR_MAN_SUNG",
        "canonical_name": "Mãn Sủng",
        "aliases": ["Mãn Bá Ninh", "Đình Úy Mãn Đại Nhân"],
        "faction": "Đại Hán",
        "role": "Đình Úy Đại Hán / Trưởng quan Hình Pháp & Tra Án",
        "martial_realm": "Trí mưu / Hình ngục chuyên gia",
        "first_appearance_in_range": "Chương 409",
        "biography_arc2": "Được triệu hoán bằng 50,000 vàng ở Ch.409. Tiếp quản Đình Úy Phủ, phụ trách điều tra các vụ án phản nghịch nội bộ, trực tiếp thẩm vấn Vệ Ti Vũ (Ch.547) làm rõ các mối liên hệ gián điệp."
    },
    {
        "id": "CHAR_PHAN_PHUONG",
        "canonical_name": "Phan Phượng",
        "aliases": ["Vô Song Thượng Tướng", "Vạn Kim Võ Tướng"],
        "faction": "Đại Hán",
        "role": "Võ tướng tiền phương / Tiên phong",
        "martial_realm": "Tông Sư",
        "first_appearance_in_range": "Chương 409",
        "biography_arc2": "Được Quý Bình An triệu hoán bằng 10,000 vàng tại Ch.409 cùng với Hình Đạo Vinh, tham gia đội hình phòng thủ và chấp pháp biên cương."
    },
    {
        "id": "CHAR_HINH_DAO_VINH",
        "canonical_name": "Hình Đạo Vinh",
        "aliases": ["Thiên Hạ Vô Địch", "Vạn Kim Võ Tướng"],
        "faction": "Đại Hán",
        "role": "Võ tướng tiền phương",
        "martial_realm": "Tông Sư",
        "first_appearance_in_range": "Chương 409",
        "biography_arc2": "Được triệu hoán bằng 10,000 vàng tại Ch.409, thân hình hộ pháp uy mãnh, đảm nhận nhiệm vụ hộ vệ và đóng giữ đồn trú."
    }
]

print(f"Defined {len(characters)} structured characters.")
