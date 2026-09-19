# -*- coding: utf-8 -*-
import json, sys

sys.stdout.reconfigure(encoding='utf-8')

extra_characters = [
    {
        "id": "CHAR_TRUONG_LIEU",
        "canonical_name": "Trương Liêu",
        "aliases": ["Trương Văn Viễn", "Chinh Tây Tướng Quân", "Chinh Bắc Đại Tướng Quân"],
        "faction": "Đại Hán",
        "role": "Tuyệt thế danh tướng thống soái / Đại tướng Chinh Bắc & Chinh Tây",
        "martial_realm": "Bán Thánh (Võ lực 115+)",
        "first_appearance_in_range": "Chương 302",
        "signature_equipment": ["Nguyệt Nha Kích", "Vấn Thiên Đao", "Tuấn mã chiến trường"],
        "key_abilities": [
            "Tiêu Dao Tân chi uy: Dũng cảm quả cảm, thống lĩnh kỵ binh đột kích chấn nhiếp địch quân",
            "Toàn diện công thủ: Khả năng tác chiến độc lập trên mọi địa hình bộ kỵ",
            "Mưu lược quân sự: Nắm bắt thời cơ chiến trường cực kỳ nhạy bén"
        ],
        "relationships": {
            "monarch": "Tướng lĩnh cốt cán trung thành tuyệt đối của Quý Bình An",
            "comrades": "Phối hợp cùng Chu Du chặn đánh Tần Tứ Nghiệp; hiệp đồng tác chiến cùng Cao Thuận, Hác Chiêu"
        },
        "biography_arc2": "Đóng vai trò chủ lực trong chiến dịch Tây Chinh. Tại Ch.326 xuất hiện phục kích chặn đầu tàn quân Tần Tứ Nghiệp bên ngoài Nghiệp Thành cùng Chu Du. Ch.339-341 dẫn binh thu dọn và tái thiết quan ải Bắc Cô Sơn. Trong chiến dịch Uyển Châu (Ch.567), Trương Liêu dẫn quân đánh úp và chiếm gọn Tân Môn Thành, cắt đứt đường lui của 5 vạn quân Tây Lăng do Mạc Thiên Tinh chỉ huy, tạo tiền đề cho đại thắng Uyển Châu."
    },
    {
        "id": "CHAR_CHU_DU",
        "canonical_name": "Chu Du",
        "aliases": ["Chu Công Cẩn", "Mỹ Chu Lang", "Thủy Quân Đại Đô Đốc"],
        "faction": "Đại Hán",
        "role": "Thủy Quân Đại Đô Đốc / Thống soái chiến dịch Ngưu Khánh Châu",
        "martial_realm": "Mưu thần tuyệt thế / Nho tướng (Trí lực 98+)",
        "first_appearance_in_range": "Chương 314",
        "signature_equipment": ["Thiên Tử Kiếm (được Quý Bình An trao quyền thống soái)", "Quạt lông khăn buộc đầu", "Thuyền chỉ huy soái hạm"],
        "key_abilities": [
            "Hỏa công trận chiến vô song: Bậc thầy sử dụng hỏa kế (Hỏa thiêu Ngưu Khánh Châu Ch.463-464)",
            "Thống soái ba quân: Điều phối binh chủng bộ - kỵ - thủy nhịp nhàng",
            "Thiên phú Chu Du (giải tỏa Ch.437): Tăng cường sức mạnh thủy chiến và khả năng bài binh bố trận"
        ],
        "relationships": {
            "monarch": "Được Quý Bình An trao toàn quyền cầm Thiên Tử Kiếm chỉ huy chiến trường Nam Quan",
            "comrades": "Hợp tác tác chiến cùng Hoàng Trung, Triệu Vân, Quách Gia, Chu Thái"
        },
        "biography_arc2": "Là kiến trúc sư trưởng cho đại thắng Ngưu Khánh Châu (Ch.460-468). Chu Du sáng tạo kế sách 'Thành trống không', để Triệu Vân vờ lui binh dẫn dụ hơn 10 vạn quân liên minh Nam Ly - Đông Thương lọt vào bẫy, sau đó phóng hỏa thiêu rụi toàn thành phố biến quân địch thành tro bụi, giải quyết dứt điểm mối đe dọa biên ải phía Nam."
    },
    {
        "id": "CHAR_LY_NHO",
        "canonical_name": "Lý Nho",
        "aliases": ["Lý Văn Ưu", "Độc Sĩ Khét Tiếng"],
        "faction": "Đại Hán",
        "role": "Mưu sĩ độc tài / Phụ trách chiến trường phía Đông và Nam Quan",
        "martial_realm": "Mưu sĩ tuyệt đỉnh",
        "first_appearance_in_range": "Chương 305",
        "key_abilities": [
            "Tuyệt đối độc kế: Không từ thủ đoạn, sẵn sàng tàn sát và chôn sống tù binh để triệt hạ ý chí quân địch",
            "Thấu thị nhân tâm: Nhận định chính xác ý đồ ngầm của thế gia An thị và Quý Bình Sinh"
        ],
        "relationships": {
            "monarch": "Mưu sĩ trung thành sẵn sàng gánh chịu mọi tiếng ác vì đại nghiệp của Quý Bình An",
            "ally": "Phối hợp cùng Quý Bình Sinh tại chiến dịch Đông Thương"
        },
        "biography_arc2": "Phụ trách tham mưu cho Quý Bình Sinh đánh hạ Đông Sơn thành. Sau đại thắng, Lý Nho ra lệnh đào hố chôn sống hàng ngàn tù binh Đông Thương bên bờ sông Bùi An Hà để chấn nhiếp đối phương (Ch.360). Sau khi phát hiện âm mưu bí mật của An gia, Lý Nho bị hạ cổ độc Thực Não Trùng ăn mòn đại não, được đưa về kinh đô và được Hoa Đà phẫu thuật mổ sọ cứu sống thần kỳ (Ch.419-423)."
    },
    {
        "id": "CHAR_CO_HU",
        "canonical_name": "Cổ Hủ",
        "aliases": ["Cổ Văn Hòa", "Độc Sĩ Tránh Họa"],
        "faction": "Đại Hán",
        "role": "Đại mưu sĩ / Phụ trách phòng tuyến Quốc Giới và mưu phạt Nam Ly",
        "martial_realm": "Mưu thần tuyệt đỉnh (Trí lực 98+)",
        "first_appearance_in_range": "Chương 304",
        "key_abilities": [
            "Toàn diện mưu thân mưu quốc: Luôn chọn giải pháp an toàn và hiệu quả tàn khốc nhất",
            "Điều binh khiển tướng từ xa: Bày kế tái chiếm Uyển Châu làm quà đăng cơ cho Quý Bình An (Ch.388)"
        ],
        "relationships": {
            "monarch": "Mưu sĩ tâm phúc Quý Bình An",
            "partner": "Đồng hành cùng Mã Siêu sang Nam Ly trinh sát Thiên Cơ Lâu"
        },
        "biography_arc2": "Cùng Khúc Nghĩa bày mưu giả vờ bỏ Uyển Châu nhử 15 vạn quân Lạc Thiên Thanh tiến sâu rồi dùng Tiên Đăng tử sĩ đánh úp đoạt lại thành (Ch.388-392). Được Quý Bình An giao nhiệm vụ đồng hành cùng Mã Siêu thâm nhập Nam Ly tiếp ứng Đào Nhã và thăm dò tổ chức Thiên Cơ Lâu (Ch.400)."
    },
    {
        "id": "CHAR_TUAN_UC",
        "canonical_name": "Tuân Úc",
        "aliases": ["Tuân Văn Nhược", "Vương Tá Chi Tài", "Tả Thừa Tướng"],
        "faction": "Đại Hán",
        "role": "Tả Thừa Tướng Đại Hán / Tổng quản nội chính quốc gia",
        "martial_realm": "Đại thần nội chính tuyệt đỉnh (Trí lực 98+)",
        "first_appearance_in_range": "Chương 302",
        "key_abilities": [
            "Vương Tá Chi Tài: Quản lý ngân khố, lương thảo, điều hành lục bộ nhịp nhàng không sai sót",
            "Đạo diễn chính trị: Lãnh đạo bách quan dâng biểu 'tam nhượng đế vị' và tôn phong Quý Bình An xưng đế",
            "Quy hoạch xây dựng ba tòa Học Cung đào tạo nhân tài"
        ],
        "relationships": {
            "monarch": "Cánh tay phải điều hành toàn bộ đế quốc của Quý Bình An",
            "colleague": "Phối hợp chặt chẽ cùng Hữu Thừa Tướng Quách Gia"
        },
        "biography_arc2": "Đóng vai trò kiến trúc sư trưởng về mặt chính trị và nội chính của vương triều Đại Hán. Tổ chức toàn bộ quy trình lên ngôi của Quý Bình An, giám sát việc thực thi Bốn chính lệnh, thúc đẩy mở rộng thương nghiệp và ổn định lòng dân sau các cuộc chiến tranh liên miên."
    },
    {
        "id": "CHAR_DIEN_VI",
        "canonical_name": "Điển Vi",
        "aliases": ["Cổ Chi Ác Lai", "Hổ Bí Song Hùng"],
        "faction": "Đại Hán",
        "role": "Thống soái Cận Vệ Quân / Hộ vệ thân cận của Quý Bình An",
        "martial_realm": "Bán Thánh Đỉnh Phong (Võ lực 120+ -> sau kích hoạt Hổ Bí Song Hùng và cường hóa binh khí)",
        "first_appearance_in_range": "Chương 302",
        "signature_equipment": ["Tấn Thiết Song Kích (được Mã Quân tôi luyện lại Ch.516)", "Hãn Huyết Bảo Mã"],
        "key_abilities": [
            "Cổ Chi Ác Lai: Cận chiến càn quét vạn quân, sức mạnh hộ giá vô song",
            "Hổ Bí Song Hùng Ràng Buộc (cùng Hứa Chử): Tăng vĩnh viễn +3 võ lực",
            "Thầy dạy võ của Trầm Hạo"
        ],
        "relationships": {
            "monarch": "Cận vệ số 1 theo sát Quý Bình An như hình với bóng",
            "disciple": "Dạy võ công cho con nuôi Hoàng đế Trầm Hạo",
            "sworn_brother": "Hứa Chử (Hổ Bí Song Hùng)"
        },
        "biography_arc2": "Đại sát tứ phương tại trận Bắc Cô Sơn bắt sống tướng Đông Thương Bùi Nguyên (Ch.337). Nhận Trầm Hạo làm đệ tử truyền dạy võ nghệ cận chiến (Ch.384). Tại Ch.516 được Mã Quân cường hóa lại song kích. Tham gia truy sát Mạc Thiên Tinh trong trận đại thắng Uyển Châu."
    },
    {
        "id": "CHAR_HOANG_TRUNG",
        "canonical_name": "Hoàng Trung",
        "aliases": ["Hoàng Hán Thăng", "Thần Cung Tuyệt Thế", "Ngũ Hổ Thượng Tướng"],
        "faction": "Đại Hán",
        "role": "Ngũ Hổ Thượng Tướng / Thần Xạ Thủ Đệ Nhất Thiên Hạ",
        "martial_realm": "Bán Thánh Đỉnh Phong (Võ lực 120+)",
        "first_appearance_in_range": "Chương 304",
        "signature_equipment": ["Bát Bảo Kỳ Lân Cung", "Liêu Thiên Đao"],
        "key_abilities": [
            "Bách bộ xuyên dương: Mũi tên bắn ra mang uy lực xé rách phòng ngự Bán Thánh",
            "Cận chiến đao pháp trầm hùng dũng mãnh",
            "Lấy một địch hai trong đại chiến Ngưu Khánh Châu (Ch.465)"
        ],
        "relationships": {
            "monarch": "Đại tướng tiên phong tin cậy của Quý Bình An",
            "brothers": "Ngũ Hổ Tướng (Quan Vũ, Triệu Vân, Trương Phi, Mã Siêu)"
        },
        "biography_arc2": "Tham gia bảo vệ và trấn thủ các cứ điểm biên ải. Trong trận đại chiến Ngưu Khánh Châu (Ch.465), Hoàng Trung một mình dùng cung đao áp chế hai viên đại tướng địch, góp công lớn vào thắng lợi chung của chiến dịch."
    },
    {
        "id": "CHAR_QUY_BINH_SINH",
        "canonical_name": "Quý Bình Sinh",
        "aliases": ["Hổ Soái", "Đại Ca Quý Gia", "Đông Uy Vương"],
        "faction": "Đại Hán / Cựu Nam Quan",
        "role": "Thống soái Chiến Hổ Quân / Đại ca Quý Bình An",
        "martial_realm": "Bán Thánh",
        "first_appearance_in_range": "Chương 303",
        "signature_equipment": ["Chiến Hổ Đại Đao", "Chiến mã thiết giáp"],
        "key_abilities": [
            "Hổ Khiếu Quân Trận: Thống lĩnh Chiến Hổ quân dũng mãnh thiện chiến",
            "Võ công khai sơn trảm tướng (từng trảm An Đức Lộc ở Đông Sơn)"
        ],
        "relationships": {
            "brothers": "Đại ca của Quý Bình Xuyên, Quý Bình Thường, Quý Bình An",
            "father": "Quý Vô Song"
        },
        "biography_arc2": "Được phong Đại Tướng Quân, dẫn quân Đông Chinh đại phá 10 vạn quân An gia, trảm sát tướng phòng thủ Đông Sơn là An Đức Lộc. Có những mối liên hệ mờ ám với thế gia An thị và bí mật gia tộc, sau đó đối đầu với Điển Vi và Hán quân tại Ngưu Khánh Châu (Ch.446-447)."
    },
    {
        "id": "CHAR_QUY_BINH_XUYEN",
        "canonical_name": "Quý Bình Xuyên",
        "aliases": ["Nhị Ca Quý Gia", "Lĩnh Chủ Đại Vũ Quốc Giới"],
        "faction": "Đại Hán / Cựu Đại Vũ Quốc Giới",
        "role": "Thống lĩnh biên phòng Quốc Giới / Nhị ca Quý Bình An",
        "martial_realm": "Đại Tông Sư / Bán Thánh",
        "first_appearance_in_range": "Chương 305",
        "relationships": {
            "brothers": "Em của Quý Bình Sinh, anh của Quý Bình Thường và Quý Bình An",
            "father": "Quý Vô Song"
        },
        "biography_arc2": "Trấn thủ tuyến phòng thủ Đại Vũ Quốc Giới đối diện Tây Lăng. Hội quân cùng Quý Bình An tại Lâm Quan Thành đánh bại Tần Tứ Nghiệp. Mang trong mình lòng trắc ẩn và sự áy náy về kế hoạch hoán đổi thân phận năm xưa, tại Ch.405-418 đã chuyển giao ngân khố và hỗ trợ Quý Bình An xây dựng vương triều."
    },
    {
        "id": "CHAR_QUY_BINH_THUONG",
        "canonical_name": "Quý Bình Thường",
        "aliases": ["Tam Ca Quý Gia", "Đệ Nhất Khoái Kiếm"],
        "faction": "Ẩn danh / Phục vụ Quý Vô Song",
        "role": "Kiếm khách bí ẩn / Tam ca Quý Bình An",
        "martial_realm": "Bán Thánh Đỉnh Phong (Kiếm đạo cực hạn)",
        "first_appearance_in_range": "Chương 318",
        "signature_equipment": ["Thanh kiếm cổ mỏng sắc bén"],
        "key_abilities": [
            "Khoái kiếm vô ảnh: Xuất kiếm nhanh tới mức mắt thường không thể nắm bắt",
            "Hành tung xuất quỷ nhập thần"
        ],
        "relationships": {
            "brothers": "Tam ca của Quý Bình An, người chấp hành mệnh lệnh bí mật của Quý Vô Song"
        },
        "biography_arc2": "Người bí ẩn nhất trong 4 anh em Quý gia. Tại Ch.456 bất ngờ tập kích ám sát Quý Bình An tại hẻm núi Nhất Tuyến Thiên để thử thách hoặc chấp hành kế hoạch của cha, bị Trương Phi bộc phát lực lượng Thánh Giả đánh lui. Sau đó xuất hiện du thuyết An Vũ Hi ở Ch.549."
    },
    {
        "id": "CHAR_QUY_VO_SONG",
        "canonical_name": "Quý Vô Song",
        "aliases": ["Trấn Quốc Công (cũ)", "Chủ Mưu Thâu Thiên Kế Hoạch"],
        "faction": "Bí Ẩn / Thế Lực Quý Gia Nguyên Thủy",
        "role": "Cha của 4 anh em Quý gia / Kỳ thủ sau màn",
        "martial_realm": "Thánh Giả Ẩn Thế",
        "first_appearance_in_range": "Chương 310",
        "relationships": {
            "sons": "Quý Bình Sinh, Quý Bình Xuyên, Quý Bình Thường, Quý Bình An"
        },
        "biography_arc2": "Nhân vật thao túng đại cục từ trong bóng tối suốt 16 năm qua kế hoạch 'Thâu Thiên hoán nhật'. Xuất hiện thoáng qua tại Nhất Tuyến Thiên (Ch.459) và đối thoại cùng Quý Bình An tại An Hà Thành (Ch.482-486), hé lộ một góc sự thật về nguồn gốc và thân thế thực sự của Quý Bình An."
    },
    {
        "id": "CHAR_CO_VO_THIEN",
        "canonical_name": "Cơ Vô Thiên",
        "aliases": ["Mật Thám Cơ Vô Thiên", "Thống Lĩnh Cẩm Y Vệ"],
        "faction": "Đại Hán",
        "role": "Mật thám thân tín / Thống lĩnh tình báo Cẩm Y Vệ",
        "martial_realm": "Tông Sư",
        "first_appearance_in_range": "Chương 301",
        "biography_arc2": "Thuộc hạ tình báo trung kiên tuyệt đối của Quý Bình An. Đồng hành cùng Kiếm Thánh Vương Việt sang Tây Lăng, lập vỏ bọc trinh sát hoàn hảo hỗ trợ Vương Việt diệt môn Tần gia (Ch.525-532)."
    },
    {
        "id": "CHAR_VE_TI_VU",
        "canonical_name": "Vệ Ti Vũ",
        "aliases": ["Vệ Cô Nương", "Cựu Thủ Lĩnh Hồng Nhan"],
        "faction": "Cựu thuộc hạ Quý Bình An -> Bị thanh lọc",
        "role": "Cựu phụ trách mạng lưới Hồng Nhan",
        "martial_realm": "Mị lực / Thu thập tin tức",
        "first_appearance_in_range": "Chương 317",
        "biography_arc2": "Từng phụ trách mạng lưới nữ tử Hồng Nhan nhưng giấu giếm Quý Bình An và có liên hệ với các thế lực ngầm khác. Tại Ch.547 bị Đình Úy Mãn Sủng thẩm vấn nghiêm ngặt, từ đó quyền lực Hồng Nhan được chuyển giao trọn vẹn cho Quốc Hậu Điêu Thuyền và Quách Gia."
    },
    {
        "id": "CHAR_CAO_THUAN",
        "canonical_name": "Cao Thuận",
        "aliases": ["Thống Lĩnh Hãm Trận Doanh"],
        "faction": "Đại Hán",
        "role": "Thống lĩnh Hãm Trận Doanh / Danh tướng phòng ngự kiên cường",
        "martial_realm": "Bán Thánh",
        "first_appearance_in_range": "Chương 302",
        "key_abilities": [
            "Hãm Trận Chi Chí: Bộ binh hạng nặng phòng thủ và xung kích kỷ luật sắt 'Hãm trận có chết không lùi'"
        ],
        "biography_arc2": "Trấn thủ Uyển Châu Thành trong chiến dịch Lạc Thiên Thanh bắc tiến (Ch.388); dẫn đầu bộ binh tinh giáp trong đại chiến Ngưu Khánh Châu (Ch.466) dù bị Hướng Hạo Thiên bắn lén; sau đó phối hợp Hác Chiêu và Trương Liêu giữ vững Uyển Châu trước Mạc Thiên Tinh (Ch.561-570)."
    },
    {
        "id": "CHAR_KHUC_NGHIA",
        "canonical_name": "Khúc Nghĩa",
        "aliases": ["Thống Lĩnh Tiên Đăng Tử Sĩ"],
        "faction": "Đại Hán",
        "role": "Thống soái Tiên Đăng Tử Sĩ / Chuyên gia công thành đoạt ải",
        "martial_realm": "Bán Thánh",
        "first_appearance_in_range": "Chương 312",
        "key_abilities": [
            "Tiên Đăng Leo Thành: Kỹ thuật leo tường công thành và đao pháp cận chiến tốc độ cao"
        ],
        "biography_arc2": "Dẫn 2000 Tiên Đăng tử sĩ tinh nhuệ phối hợp cùng Cổ Hủ bất ngờ leo thành đoạt lại Uyển Châu từ tay quân Nam Ly (Ch.388-392); tham chiến dũng mãnh trong chiến dịch Ngưu Khánh Châu."
    }
]

print(f"Extra characters defined: {len(extra_characters)}")
