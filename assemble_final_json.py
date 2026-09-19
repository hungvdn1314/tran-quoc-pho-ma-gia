# -*- coding: utf-8 -*-
import json, sys, os

sys.stdout.reconfigure(encoding='utf-8')

# Import previously defined characters
with open("build_arc2_json.py", "r", encoding="utf-8") as f:
    content = f.read()

# Let's extract characters list from build_arc2_json.py
locs = {}
exec(content, locs)
characters_list = locs.get("characters", [])

organizations_list = [
    {
        "id": "ORG_DAI_HAN_TRIEU_DINH",
        "name": "Đại Hán Triều Đình",
        "leader": "Khai Quốc Hoàng Đế Quý Bình An",
        "purpose": "Thống nhất tứ hải, kiến lập thịnh thế vạn năm, bình định chư quốc",
        "members": ["Tuân Úc (Tả Thừa Tướng)", "Quách Gia (Hữu Thừa Tướng)", "Mãn Sủng (Đình Úy)", "Đào Nhã (Nữ Công Bộ Thượng Thư)", "Điêu Thuyền (Quốc Hậu)", "Quý Sơn Hà (Hoàng Thái Tử)"],
        "base_of_operations": "Đại Hán Kinh Đô (Cần Chính Điện, Phượng Tê Cung)",
        "military_might": "Khoảng 30-40 vạn tinh binh chính quy, lực lượng Thánh Giả hùng hậu nhất thiên hạ"
    },
    {
        "id": "ORG_THIEN_CO_LAU",
        "name": "Thiên Cơ Lâu",
        "leader": "Từng do Vu Văn Châu (Đại Vũ) / Họ Ninh (Tây Lăng, Nam Ly)",
        "purpose": "Thu thập tình báo, chế tạo thần khí cơ quan, tiên tri và thao túng cục diện chính trị các quốc gia",
        "members": ["Vu Văn Châu (bị bắt)", "Trương Hiên Chính", "Ninh Thâm", "Ám Ảnh Vệ"],
        "base_of_operations": "Nam Ly (công khai quy mô lớn), Tây Lăng (ẩn tàng tại Thuyền Hoa và các bang phái), Đại Vũ (đã bị xóa sổ tại Ch.311)",
        "details": "Là mạng lưới tình báo lâu đời và bí ẩn nhất. Khác với Đại Vũ hoạt động ngầm, Thiên Cơ Lâu tại Nam Ly hoạt động công khai, có xưởng rèn đúc cơ quan lôi hỏa đạn cực mạnh."
    },
    {
        "id": "ORG_HUYET_Y_CAC",
        "name": "Huyết Y Các",
        "leader": "Xích Hồng Y (Các chủ nguyên bản) -> Vương Việt (chưởng khống thực tế từ Ch.571)",
        "purpose": "Tổ chức sát thủ đệ nhất thiên hạ, ám sát các mục tiêu chính trị và quân sự cấp cao",
        "members": ["Xích Hồng Y (Thánh giả sát thủ)", "Hắc Y Sát Thủ", "Mật thám tứ quốc"],
        "base_of_operations": "Các cứ điểm bí mật phân bố khắp Tây Lăng, Nam Ly, Đông Thương",
        "details": "Sau khi Xích Hồng Y bị Triệu Vân đánh bại (Ch.503) và bị Vương Việt một kiếm chế phục tại Đế đô (Ch.568-571), Huyết Y Các chuyển sang phục vụ Quý Bình An và Đại Hán."
    },
    {
        "id": "ORG_TAY_LANG_QUY_QUAT",
        "name": "Tây Lăng Quỷ Quật",
        "leader": "Quỷ Thánh",
        "purpose": "Nghiên cứu tà thuật Thâm Uyên Quỷ Đạo, thực hiện 'Kế hoạch Thú Nhân' lai tạo chiến binh người thú",
        "members": ["Quỷ Thánh", "Đồ chúng Quỷ Đạo", "Chiến binh Thú Nhân"],
        "base_of_operations": "Tây Lăng Quỷ Quật (vùng thung lũng bí ẩn Tây Lăng)",
        "details": "Thế lực tà dị nguy hiểm chuyên biến dị cơ thể người để tạo ra các cỗ máy chém giết vô cảm, cấu kết ngầm với các phe phái Tây Lăng."
    },
    {
        "id": "ORG_HONG_NHAN",
        "name": "Mạng Lưới Tình Báo Hồng Nhan",
        "leader": "Điêu Thuyền (Quốc Hậu) & Quách Gia (Hữu Thừa Tướng) / Vệ Ti Vũ (cựu phụ trách)",
        "purpose": "Mạng lưới nữ điệp báo, gián điệp thương nghiệp và tình báo thanh lâu phủ đệ xuyên quốc gia",
        "members": ["Nữ điệp báo viên, danh kỹ thanh lâu, tỳ nữ phủ đệ quan lại chư quốc"],
        "base_of_operations": "Đế đô Phượng Tê Cung & các kỹ viện lớn tại Tây Lăng, Nam Ly, Đông Thương",
        "details": "Được kích hoạt chính thức từ Ch.507 sau khi giải tỏa thiên phú Hồng Nhan của Điêu Thuyền tại Ch.427. Bị Mãn Sủng thanh lọc các nhân tố phản nghịch (Vệ Ti Vũ) tại Ch.547 để hoàn toàn trung thành với Quý Bình An."
    },
    {
        "id": "ORG_THIEN_CUNG_HOC_VIEN",
        "name": "Thiên Cung Học Viện",
        "leader": "Thần Tượng Mã Quân",
        "purpose": "Trung tâm nghiên cứu kỹ thuật, luyện kim, chế tạo vũ khí cơ quan và công trình quốc phòng vượt thời đại",
        "members": ["Mã Quân", "Thợ rèn đúc bậc thầy, công tượng tinh hoa Đại Hán"],
        "base_of_operations": "Thiên Cung Viện - Đại Hán Đế Đô",
        "details": "Thành lập tại Ch.495 sau khi Quý Bình An triệu hoán Mã Quân. Nơi phát minh Thiết Giáp Môn, nỏ liên châu, cải tiến vũ khí Tấn Thiết Song Kích cho Điển Vi và hệ thống phòng thủ Uyển Châu."
    },
    {
        "id": "ORG_HOC_CUNG_DAI_HAN",
        "name": "Hệ Thống Ba Tòa Học Cung Đại Hán",
        "leader": "Tuân Úc, Quý Bình An, Phó Dĩnh Thăng (đại nho thỉnh mời)",
        "purpose": "Đào tạo nhân tài văn võ, xóa bỏ rào cản thế gia, phổ cập giáo dục cho toàn dân",
        "members": ["Trưởng Thành Học Cung (cho kẻ sĩ thành niên)", "Thiếu Niên Học Cung (cho thanh thiếu niên)", "Nữ Tử Học Cung (phá vỡ định kiến nam tôn nữ ti, cho phép phụ nữ đi học)"],
        "base_of_operations": "Đại Hán Đế Đô",
        "details": "Sáng kiến chấn động tứ quốc tại Ch.406-407, ban bố Chiêu Hiền Lệnh thu hút sĩ phu toàn thiên hạ."
    },
    {
        "id": "ORG_THIEU_NIEN_BINH",
        "name": "Thiếu Niên Binh / Tiên Phong Doanh",
        "leader": "Trầm Hạo (con nuôi Quý Bình An)",
        "purpose": "Chiêu mộ thiếu niên từ 8-12 tuổi, huấn luyện văn võ toàn diện, tạo lực lượng nòng cốt cho tương lai Đại Hán",
        "members": ["Hàng ngàn thiếu niên ưu tú từ các châu huyện trên cả nước"],
        "base_of_operations": "Đế đô và các quân doanh Tiên Phong",
        "details": "Thành lập theo sắc lệnh thứ ba của Quý Bình An khi đăng cơ (Ch.387), gia đình có con tham gia được hưởng trợ cấp gạo tiền từ triều đình."
    },
    {
        "id": "ORG_TAY_LANG_THIET_KY",
        "name": "Tây Lăng Thiết Kỵ",
        "leader": "Tần Tứ Nghiệp (trước) -> Tần Ức -> Trương Bất Minh trực tiếp kiểm soát",
        "purpose": "Binh chủng kỵ binh hạng nặng trấn quốc của Tây Lăng, nổi danh càn quét bình nguyên",
        "members": ["Kỵ binh thiết giáp Tây Lăng"],
        "base_of_operations": "Tây Kinh Thành, Tây Hoàng Thành",
        "details": "Từng đại bại dưới tay Triệu Vân và Bạch Mã Nghĩa Tòng tại Lâm Quan Thành; sau trận Uyển Châu tiếp tục suy yếu."
    },
    {
        "id": "ORG_THAN_HOA_QUAN",
        "name": "Nam Ly Thần Hỏa Quân",
        "leader": "Phó Thương Quân (Thái tử) / Triệu Thiên Lỗi",
        "purpose": "Lực lượng tinh nhuệ của Nam Ly chuyên sử dụng hỏa khí, thuốc nổ, Lưu Hỏa Tiễn và Thần Hỏa Lôi",
        "members": ["Chiến sĩ hỏa khí Nam Ly"],
        "base_of_operations": "Thần Hỏa Thành, Nam Thiên Thành",
        "details": "Sở hữu sức công phá diện rộng khủng khiếp nhờ hỏa khí, là đối thủ cạnh tranh vũ khí tầm xa với Đại Hán."
    },
    {
        "id": "ORG_CHIEN_HO_QUAN",
        "name": "Chiến Hổ Quân",
        "leader": "Quý Bình Sinh (Hổ Soái Nam Quan)",
        "purpose": "Binh đoàn dũng mãnh nhất của Nam Quan Đại Vũ / Đại Hán",
        "members": ["Quý Bình Sinh", "Tiêu Tuế", "Hướng Hạo Thiên", "Lý Tiểu Đao (tử trận)"],
        "base_of_operations": "Nam Quan, Bùi An Hà",
        "details": "Lực lượng thiện chiến cận chiến, từng bị chia rẽ trong kế hoạch của Quý Bình Sinh và trúng mưu thủy công tại Ngưu Khánh Châu."
    },
    {
        "id": "ORG_DAI_LA_DE_QUOC",
        "name": "Đại La Đế Quốc (Thế lực Thần bí Hải Ngoại)",
        "leader": "Hoàng Đế Đại La / Thế lực ngoài biển",
        "purpose": "Bành trướng xâm chiếm đất liền Trung Thổ, bắt giữ nô lệ và người dị biến",
        "members": ["Bí Đao (liên thể nhân)", "Đặc sứ và thám tử viễn dương"],
        "base_of_operations": "Hải ngoại Đại La",
        "details": "Xuất hiện manh mối từ Ch.522 khi sứ giả liên thể Bí Đao thâm nhập, hé lộ thế giới bên ngoài bờ cõi Trung Thổ cực kỳ rộng lớn."
    }
]

battles_list = [
    {
        "id": "BTL_LAM_QUAN_THANH",
        "name": "Đại Chiến Cửa Ải Lâm Quan Thành (Đến Quan Thành)",
        "chapter_range": [321, 325],
        "location": "Lâm Quan Thành (biên giới Đại Vũ - Tây Lăng)",
        "sides": {
            "player_faction": "Đại Vũ (Quý Bình An, Triệu Vân, Quý Bình Xuyên, Cổ Hủ, Bạch Mã Nghĩa Tòng)",
            "enemy_faction": "Tây Lăng (Tần Tứ Nghiệp, Đổng Vệ Đông, 3 vạn Tây Lăng Thiết Kỵ)"
        },
        "tactics": "Triệu Vân xung phong một thương một ngựa đối đầu Tần Tứ Nghiệp; Bạch Mã Nghĩa Tòng dùng cung kỵ cơ động bắn tỉa phá vỡ đội hình thiết kỵ cồng kềnh.",
        "outcome": "Đại Hán đại thắng; Đổng Vệ Đông trọng thương bị bắt; Tần Tứ Nghiệp đại bại tháo lui.",
        "consequences": "Mở toang cánh cửa Tây Chinh vào Thập Tam Châu của Tây Lăng, đập tan thần thoại bách chiến bách thắng của Tây Lăng Thiết Kỵ."
    },
    {
        "id": "BTL_HOAI_HA_PHUC_KICH",
        "name": "Trận Phục Kích Hoài Hà - Nghiệp Thành",
        "chapter_range": [326, 328],
        "location": "Hoài Hà bên ngoài Nghiệp Thành",
        "sides": {
            "player_faction": "Đại Vũ (Trương Liêu, Chu Du, Thủy quân)",
            "enemy_faction": "Tây Lăng (Tần Tứ Nghiệp và tàn binh Thiết Kỵ)"
        },
        "tactics": "Chu Du bày chiến thuyền chặn đứng đường thủy; Trương Liêu dẫn bộ kỵ chặn đường bộ tạo thế hai đại Bán Thánh vây hãm.",
        "outcome": "Tần Tứ Nghiệp bị dồn vào đường cùng nhưng Quý Bình An hạ lệnh cố tình để Tần Tứ Nghiệp sống sót rời đi.",
        "consequences": "Tạo mối nghi kỵ và chia rẽ sâu sắc giữa Tần gia và triều đình Tây Lăng Vương Trương Bất Minh."
    },
    {
        "id": "BTL_BAC_CO_SON_01",
        "name": "Trận Phòng Thủ Bắc Cô Sơn Quan Ải",
        "chapter_range": [334, 338],
        "location": "Bắc Cô Sơn quan ải (ngoài thành Liễu Châu)",
        "sides": {
            "player_faction": "Đại Vũ (Chu Thái, Điển Vi, Điêu Thuyền, Cận vệ quân)",
            "enemy_faction": "Đông Thương (Bùi Nguyên, 5 vạn quân tinh nhuệ Bùi gia)"
        },
        "tactics": "Chu Thái đổ 100 thùng dầu hỏa chặn cổng; Điêu Thuyền đích thân đánh trống trận kích phát sĩ khí kinh thiên; Điển Vi cầm song kích mở cửa xung sát chém địch như rạ.",
        "outcome": "Quân Đông Thương đại bại thương vong vô số; Bùi Nguyên bị Điển Vi bắt sống tại chỗ.",
        "consequences": "Bảo vệ an toàn tuyệt đối cho căn cứ Liễu Châu, thu được tù binh Bùi Nguyên để tống tiền thế gia Đông Thương."
    },
    {
        "id": "BTL_LINH_KHE_THANH",
        "name": "Trận Tập Kích Đánh Úp Linh Khê Thành",
        "chapter_range": [346, 348],
        "location": "Linh Khê Thành (Tây Lăng)",
        "sides": {
            "player_faction": "Đại Vũ (Quý Bình An, Triệu Vân)",
            "enemy_faction": "Tây Lăng (Bán Thánh Vân Ninh, thủ quân Linh Khê Thành)"
        },
        "tactics": "Tận dụng nội ứng và tốc độ hành quân thần tốc đánh úp thành trì bị bỏ ngỏ phòng ngự sau hỏa hoạn cũ.",
        "outcome": "Thành vỡ; bắt sống Bán Thánh Vân Ninh.",
        "consequences": "Quý Bình An tống tiền Tây Lăng 1.2 triệu kim (Ch.349), cung cấp toàn bộ tài chính để triệu hoán Mã Siêu."
    },
    {
        "id": "BTL_DONG_SON_THANH",
        "name": "Chiến Dịch Đông Sơn Thành & Bùi An Hà",
        "chapter_range": [351, 357],
        "location": "Đông Sơn Thành và bờ sông Bùi An Hà (Đông Thương)",
        "sides": {
            "player_faction": "Chiến Hổ Quân (Quý Bình Sinh, Lý Nho, 5 vạn quân)",
            "enemy_faction": "Đông Thương (An Quân Thương, An Đức Lộc, 10 vạn đại quân An gia)"
        },
        "tactics": "Quý Bình Sinh kích tướng quyết chiến, chém đầu An Đức Lộc; Lý Nho bày mưu tiêu diệt 4 vạn địch, bắt sống hàng ngàn tù binh.",
        "outcome": "Đông Sơn thành thất thủ; quân An gia tan vỡ hoàn toàn. Lý Nho đào hố chôn sống hàng ngàn tù binh trước mặt hai thành An Hà - An Lộ.",
        "consequences": "Mở toang con đường Đông Chinh cho Đại Hán, gieo rắc nỗi kinh hoàng tột độ cho quân dân Đông Thương."
    },
    {
        "id": "BTL_BAC_CO_SON_UAN_CHAU",
        "name": "Trận Tái Chiếm Uyển Châu & Chặn Đánh Lạc Thiên Thanh",
        "chapter_range": [388, 392],
        "location": "Uyển Châu Thành & Bắc Cô Sơn Quan Ải",
        "sides": {
            "player_faction": "Đại Vũ / Đại Hán (Cổ Hủ, Khúc Nghĩa, Cao Thuận, Trương Liêu, Tiên Đăng tử sĩ)",
            "enemy_faction": "Nam Ly (Lạc Thiên Thanh, 15 vạn đại quân Nam Ly)"
        },
        "tactics": "Cao Thuận giả vờ bỏ Uyển Châu nhử 15 vạn quân Nam Ly tiến sâu vào Bắc Cô Sơn; Khúc Nghĩa dẫn 2000 Tiên Đăng tử sĩ leo tường chiếm lại Uyển Châu; Trương Liêu đón đầu tại Bắc Cô Sơn.",
        "outcome": "Quân Nam Ly bị cắt đứt đường lui như cá trong chậu, thương vong nặng nề, Lạc Thiên Thanh phải tháo chạy.",
        "consequences": "Làm quà mừng đăng cơ cho Quý Bình An, khẳng định tài thao lược thần sầu của Cổ Hủ và Khúc Nghĩa."
    },
    {
        "id": "BTL_NHAT_TUYEN_THIEN",
        "name": "Tập Sát Nhất Tuyến Thiên: Trương Phi Hộ Giá",
        "chapter_range": [456, 457],
        "location": "Hẻm núi hiểm trở Nhất Tuyến Thiên",
        "sides": {
            "player_faction": "Quý Bình An, Trương Phi, Hộ vệ",
            "enemy_faction": "Quý Bình Thường (Tam ca Quý gia, Đệ nhất kiếm khách Bán Thánh đỉnh phong), Quý Vô Song quan sát"
        },
        "tactics": "Quý Bình Thường dùng tuyệt kỹ khoái kiếm ám sát Quý Bình An từ trên đỉnh núi lao xuống trong chớp mắt.",
        "outcome": "Trương Phi nổi giận bộc phát chiến lực cấp Thánh Giả gạt phăng kiếm kích, Quý Bình Thường bị thương thối lui; Quý Vô Song xuất hiện rồi rút lui.",
        "consequences": "Kích hoạt phần thưởng hệ thống: 10 vạn kim đặc thù loại tuyệt thế anh linh triệu hoán (sau dùng triệu hoán Mã Quân)."
    },
    {
        "id": "BTL_NGUU_KHANH_CHAU",
        "name": "Đại Chiến Ngưu Khánh Châu (Hỏa Thiêu Thành Trống)",
        "chapter_range": [460, 468],
        "location": "Ngưu Khánh Châu thành",
        "sides": {
            "player_faction": "Đại Hán (Chu Du làm Thống soái, Triệu Vân, Hoàng Trung, Cao Thuận, Khúc Nghĩa, Quách Gia, viện binh Quý Bình An & Trương Phi)",
            "enemy_faction": "Liên quân Nam Ly (Lạc Thiên Thanh) + Đông Thương (Bùi Thế An) + Chiến Hổ Quân (Quý Bình Sinh)"
        },
        "tactics": "Chu Du dùng kế Thành trống: Triệu Vân giả vờ bại rút qua Bắc Môn, quân địch tràn vào thì châm lửa thiêu rụi toàn bộ Ngưu Khánh Châu; Hoàng Trung lấy một địch hai; Quý Bình An mang Trương Phi đánh úp sườn giáp công.",
        "outcome": "Toàn bộ Ngưu Khánh Châu biến thành biển lửa; liên quân Nam Ly - Đông Thương tổn thất hơn chục vạn quân, tan rã hoàn toàn.",
        "consequences": "Chiến thắng vang dội nhất giải phóng áp lực biên cương Nam Quan, Quý Bình An tích lũy lượng lớn Anh Linh Điểm."
    },
    {
        "id": "BTL_THUY_PHA_CHIEN_HO",
        "name": "Trận Thủy Phá Chiến Hổ Quân & Phá Đê Khai Hồng",
        "chapter_range": [471, 473],
        "location": "Lưu vực sông Nam Quan - Ngưu Khánh Châu",
        "sides": {
            "player_faction": "Đại Hán Thủy Quân (Chu Thái)",
            "enemy_faction": "Chiến Hổ Quân & Tàn quân Đông Thương"
        },
        "tactics": "Chu Thái nam hạ mở đập phá đê, dẫn nước lũ nhấn chìm toàn bộ vùng trũng Nam Quan.",
        "outcome": "Nước ngập cuốn trôi doanh trại địch; dũng tướng Lý Tiểu Đao tử trận; Chiến Hổ quân tan tác.",
        "consequences": "Quý Bình An hoàn toàn kiểm soát thực địa chiến trường Nam Quan, dập tắt mầm mống nổi loạn."
    },
    {
        "id": "BTL_HO_LO_COC",
        "name": "Trận Bao Vây Hồ Lô Cốc & Hội Tụ An Hà Thành",
        "chapter_range": [476, 482],
        "location": "Hồ Lô Cốc và An Hà Thành",
        "sides": {
            "player_faction": "Đại Hán (Quý Bình An thân chinh, Trương Phi, Hán quân)",
            "enemy_faction": "Tàn quân Đông Thương và thế lực Quý gia cũ"
        },
        "tactics": "Bao vây chặt chẽ cửa thung lũng hình hồ lô, Quý Bình An trực tiếp dẫn quân tràn vào ép địch đầu hàng.",
        "outcome": "Toàn thắng; bắt gọn các tướng lĩnh tàn quân; Quý Bình An đối diện cha Quý Vô Song.",
        "consequences": "Quý Bình An biết được chân tướng kế hoạch Thâu Thiên hoán nhật (Ch.486)."
    },
    {
        "id": "BTL_TAN_PHU_TAY_LANG",
        "name": "Trận Tập Sát Diệt Môn Tần Phủ Tây Lăng",
        "chapter_range": [526, 527],
        "location": "Phủ Trấn Quốc Đại Tướng Quân Tần gia (Tây Lăng)",
        "sides": {
            "player_faction": "Đại Hán (Kiếm Thánh Vương Việt, Cơ Vô Thiên)",
            "enemy_faction": "Tây Lăng (Tần Tứ Nghiệp, hộ vệ cao thủ Tần gia)"
        },
        "tactics": "Vương Việt xuất quỷ nhập thần dùng kiếm thuật Thục Sơn Thiên Kiếm và Quỷ Ảnh Tam Sát chém thẳng vào nội viện.",
        "outcome": "Tần Tứ Nghiệp bị Vương Việt một kiếm đoạt mạng; toàn bộ quyền lực Tần gia tại Tây Lăng sụp đổ.",
        "consequences": "Xóa sổ gia tộc quân phiệt lớn nhất Tây Lăng, tướng trẻ Tần Ức quy thuận Đại Hán (Ch.532)."
    },
    {
        "id": "BTL_UAN_CHAU_THAN_MON",
        "name": "Chiến Dịch Phòng Thủ Uyển Châu & Đoạt Tân Môn Thành",
        "chapter_range": [561, 570],
        "location": "Uyển Châu Thành & Tân Môn Thành",
        "sides": {
            "player_faction": "Đại Hán (Hác Chiêu, Cao Thuận, Trương Liêu, Điển Vi, Hứa Chử, thiết giáp môn của Mã Quân)",
            "enemy_faction": "Tây Lăng (Cảnh Vương Mạc Thiên Tinh, Văn Nhân Húc, 4 vạn quân + 1 vạn Tây Lăng Thiết Kỵ)"
        },
        "tactics": "Hác Chiêu dùng cửa thép Thiết Giáp Môn chặn đứng mọi máy công thành và địa đạo của Mạc Thiên Tinh; Trương Liêu vu hồi bất ngờ đánh úp chiếm Tân Môn Thành; Hổ Bí Song Hùng (Điển Vi + Hứa Chử) phản công truy sát.",
        "outcome": "Mạc Thiên Tinh đại bại, mất sạch binh mã, trốn chạy tán loạn.",
        "consequences": "Bảo vệ vững chắc cửa ngõ Uyển Châu, tiêu hao sinh lực tinh nhuệ cuối cùng của thế gia Tây Lăng."
    },
    {
        "id": "BTL_DAU_KIEM_DE_DO",
        "name": "Trận Đấu Kiếm Đế Đô: Vương Việt Phá Xích Hồng Y",
        "chapter_range": [568, 571],
        "location": "Đại Hán Đế Đô hoàng thành ngoại viện",
        "sides": {
            "player_faction": "Vương Việt (Kiếm Thánh Đại Hán)",
            "enemy_faction": "Xích Hồng Y (Đệ nhất sát thủ Thánh Giả thiên hạ, Huyết Y Các)"
        },
        "tactics": "Xích Hồng Y tiềm nhập Đế đô do thám bị phát giác; Vương Việt xuất Thừa Ảnh Kiếm xuất thủ chỉ trong một hiệp thi triển Thục Sơn Thiên Kiếm.",
        "outcome": "Vương Việt chém gãy vũ khí, đánh trọng thương Xích Hồng Y chỉ trong tích tắc.",
        "consequences": "Xích Hồng Y tâm phục khẩu phục, giao lại toàn bộ lệnh bài và quyền kiểm soát Huyết Y Các cho Vương Việt và Đại Hán."
    },
    {
        "id": "BTL_CHINH_BIEN_NAM_THIEN",
        "name": "Chính Biến Nam Thiên Thành & Cái Chết Phó Thương Quân",
        "chapter_range": [582, 585],
        "location": "Nam Thiên Thành (Nam Ly)",
        "sides": {
            "player_faction": "Phe Phó Thương Quân (Thái tử Nam Ly, Thần Hỏa Quân thân tín)",
            "enemy_faction": "Liên minh Cung Ngạo (Cung gia) & Tri Mặc Bạch (Thánh Giả Nam Ly)"
        },
        "tactics": "Tri Mặc Bạch đánh úp bất ngờ kết liễu Phó Thương Quân; Cung Ngạo đem đại quân kiểm soát toàn bộ phủ nha thành trì.",
        "outcome": "Phó Thương Quân tử trận; Cung Ngạo tự phong Hộ Quốc Đại Tướng Quân thâu tóm chính quyền Nam Ly; Xích Hồng Y kịch chiến Tri Mặc Bạch rồi rút lui.",
        "consequences": "Nam Ly rơi vào hỗn loạn và chia rẽ sâu sắc dưới sự cai trị độc tài của Cung Ngạo, tạo cơ hội bằng vàng cho Đại Hán."
    }
]

key_plot_events_list = [
    {
        "event_id": "EVT_TRAT_HOA_HUYET",
        "title": "Chém giết Hoa Chấn Viễn và Huyết Tùng, Thu phục Cơ Vô Pháp",
        "chapter": 301,
        "participants": ["Quý Bình An", "Hoa Chấn Viễn", "Huyết Tùng", "Cơ Vô Pháp"],
        "description": "Quý Bình An phát hiện và xử tử hai gián điệp nội gián nguy hiểm là Hoa Chấn Viễn và Huyết Tùng, dùng ân uy thu phục hoàn toàn Cơ Vô Pháp làm mật thám trung thành.",
        "consequences": "Làm trong sạch nội bộ phủ phò mã trước thềm đại nghiệp tranh bá."
    },
    {
        "event_id": "EVT_PHONG_TINH_KIEN_VUONG",
        "title": "Sắc phong Tịnh Kiên Vương & Khẩu quyết 'Một lời mà vì thiên hạ pháp'",
        "chapter": 303,
        "participants": ["Tử Ngọc Trạch", "Quý Bình An"],
        "description": "Vũ Hoàng Tử Ngọc Trạch bất ngờ phong Quý Bình An làm Tịnh Kiên Vương, Thiên Uy Thượng Tướng Quân. Tại Ch.305, hai người đàm đạo và Quý Bình An đưa ra tôn chỉ 'Nhất ngôn nhi vi thiên hạ pháp'.",
        "consequences": "Quý Bình An chính thức nắm giữ quyền lực nhiếp chính tối cao của vương triều Đại Vũ."
    },
    {
        "event_id": "EVT_NINH_AN_TU_TRAN",
        "title": "Ninh An Công Chúa Trúng Độc Qua Đời Dưới Gốc Hoa Lê",
        "chapter": 307,
        "participants": ["Ninh An công chúa", "Quý Bình An", "Đại Vũ Thiên Cơ"],
        "description": "Ninh An công chúa trúng độc bí ẩn, ngồi trên xích đu dưới gốc cây hoa lê và qua đời, ứng nghiệm chính xác lời sấm truyền của Đại Vũ Thiên Cơ.",
        "consequences": "Chấm dứt mối liên kết hôn nhân danh nghĩa, thúc đẩy Quý Bình An truy lùng tung tích kẻ đứng sau Thiên Cơ Lâu."
    },
    {
        "event_id": "EVT_PHA_THIEN_CO_DAI_VU",
        "title": "Vạch Trần Thân Phận Đại Vũ Thiên Cơ: Bắt Giữ Vu Văn Châu",
        "chapter": 310,
        "participants": ["Quý Bình An", "Vu Văn Châu", "Ám Ảnh", "Vũ Kỳ Luân"],
        "description": "Quý Bình An phong tỏa cổng Tây Đế đô, chặn bắt cỗ xe ngựa định đào tẩu của Ám Ảnh, vạch trần Viện sĩ Hàn Lâm Viện Vu Văn Châu chính là 'Đại Vũ Thiên Cơ'.",
        "consequences": "Xóa sổ hoàn toàn mạng lưới Thiên Cơ Lâu tại Đại Vũ, chặt đứt bàn tay thao túng ngầm của Tây Lăng."
    },
    {
        "event_id": "EVT_HE_THONG_TRANH_BA",
        "title": "Hệ Thống Thăng Cấp Toàn Diện: Mở Ra Giai Đoạn Tranh Bá",
        "chapter": 360,
        "participants": ["Quý Bình An", "Hệ thống"],
        "description": "Hệ thống chính thức nâng cấp thành công sau chiến tích Tây Chinh và Đông Khống. Hủy bỏ triệu hoán thiên kim, mở cấp 10k, 50k, 100k, 500k, và hệ thống Anh Linh Điểm dựa trên chinh phạt và công thành.",
        "consequences": "Đặt nền móng cho kỷ nguyên triệu hoán thần tướng và bắt buộc Quý Bình An phải đăng cơ làm Hoàng đế."
    },
    {
        "event_id": "EVT_THIEN_HA_TAP_THE_NGUYEN",
        "title": "Đại Vũ Vạn Dân & Bách Quan Tập Thể Cầu Xin: Đăng Cơ Hoàng Đế",
        "chapter": 385,
        "participants": ["Quý Bình An", "Tuân Úc", "Quách Gia", "10 vạn tướng sĩ", "Bách tính các châu"],
        "description": "Sau 3 lần từ chối hoàng vị (tam nhượng đế vị), đại diện bách tính khắp các châu và 10 vạn tướng sĩ tề tựu ngoài cổng Tây quỳ rạp cầu xin Tịnh Kiên Vương đăng cơ. Quý Bình An chính thức lên ngôi, xuất hiện dị tượng rồng bay chín tiếng ngâm vang.",
        "consequences": "Quý Bình An danh chính ngôn thuận trở thành hoàng đế, quy tụ trọn vẹn dân tâm sĩ khí toàn quốc."
    },
    {
        "event_id": "EVT_BAN_BO_BON_CHINH_LENH",
        "title": "Ban Bố Bốn Chính Lệnh Định Giang Sơn",
        "chapter": 387,
        "participants": ["Hoàng Đế Quý Bình An", "Văn võ bá quan"],
        "description": "Ngay khi bước lên đế vị, Quý Bình An ban hành 4 quốc chỉ: (1) Giảm 30% thuế vĩnh viễn; (2) Di dân lập tân châu thành tại 3 khu vực hiểm nghèo; (3) Tăng 30% quân hưởng, bảo hộ trọn đời gia đình liệt sĩ, lập Thiếu Niên Binh; (4) Chiêu Hiền Lệnh không phân biệt xuất thân với tôn chỉ 'Vì thiên địa lập tâm, vì sinh dân lập mệnh...'",
        "consequences": "Thay đổi hoàn toàn bộ mặt kinh tế, xã hội và quân sự, tạo sức hút nhân tài vô tiền khoáng hậu."
    },
    {
        "event_id": "EVT_DOI_QUOC_HIEU_DAI_HAN",
        "title": "Đổi Quốc Hiệu Đại Hán, Dựng Long Kỳ, Định Niên Hiệu Định Quốc Năm Đầu",
        "chapter": 411,
        "participants": ["Hoàng Đế Quý Bình An", "Tuân Úc"],
        "description": "Quý Bình An tuyên bố bãi bỏ quốc hiệu Đại Vũ, chính thức cải thành ĐẠI HÁN, lấy niên hiệu Định Quốc năm đầu, dựng lá cờ rồng Long Kỳ và kế hoạch Cẩm Y thiên hạ.",
        "consequences": "Khởi đầu cho triều đại Đại Hán huy hoàng trong lịch sử tiểu thuyết."
    },
    {
        "event_id": "EVT_MO_SO_LY_NHO",
        "title": "Hoa Đà Đại Phẫu Thuật Mổ Sọ Thành Công Cứu Sống Lý Nho",
        "chapter": 423,
        "participants": ["Hoa Đà", "Lý Nho", "Quý Bình An", "Điển Vi"],
        "description": "Lý Nho trúng kỳ cổ Thực Não Trùng ăn mòn đại não. Hoa Đà thi triển Ma Phế Tán và kỹ năng Hồi Xuân, thực hiện ca mổ sọ mở hộp não gắp cổ trùng thành công.",
        "consequences": "Cứu sống mưu thần trụ cột Lý Nho, khẳng định y thuật thần kỳ của Hoa Đà."
    },
    {
        "event_id": "EVT_DOT_PHA_QUACH_GIA",
        "title": "Đột Phá Thiên Mệnh Mưu Thần Quách Gia & Tăng 50 Năm Thọ Mệnh",
        "chapter": 428,
        "participants": ["Quách Gia", "Quý Bình An"],
        "description": "Quý Bình An tiêu tốn 10 vạn anh linh điểm mở thiên phú Dự Phán (+1 trí lực) và đột phá Quách Gia (+4 trí lực đạt 104), Nghịch thiên cải mệnh tăng thêm 50 năm tuổi thọ, kích hoạt hệ thống Thiên Mệnh Võ Tướng.",
        "consequences": "Quách Gia thoát án tử yểu, Đại Hán mở khóa điều kiện triệu hoán Quan Vũ và các Thiên Mệnh Võ Tướng tối cao."
    },
    {
        "event_id": "EVT_TRIEU_VAN_THANH_GIA",
        "title": "Triệu Vân Đột Phá Thánh Giả & Đánh Bại Xích Hồng Y",
        "chapter": 502,
        "participants": ["Triệu Vân", "Xích Hồng Y", "Quý Bình An"],
        "description": "Triệu Vân chính thức phá vỡ xiềng xích Bán Thánh, bước vào cảnh giới Thánh Giả (võ lực 132-134), mở khóa thiên phú Nhai Giác, một thương kích bại sát thủ đệ nhất thiên hạ Xích Hồng Y.",
        "consequences": "Đại Hán sở hữu Thánh Giả công khai đầu tiên, uy hiếp toàn bộ cao thủ chư quốc."
    },
    {
        "event_id": "EVT_TRIEU_HOAN_VUONG_VIET",
        "title": "Triệu Hoán Vương Việt & Diệt Môn Tần Gia Tây Lăng",
        "chapter": 520,
        "participants": ["Vương Việt", "Cơ Vô Thiên", "Tần Tứ Nghiệp"],
        "description": "Quý Bình An dùng Anh Hồn Lệnh ngẫu nhiên triệu hoán Đệ Nhất Kiếm Sư Vương Việt (võ lực 134, Thừa Ảnh Kiếm). Vương Việt cùng Cơ Vô Thiên sang Tây Lăng trảm sát Tần Tứ Nghiệp, hủy diệt hoàn toàn Tần gia.",
        "consequences": "Thanh trừng đối thủ quân sự lớn nhất của Tây Lăng, Tần Ức dẫn tàn quân quy hàng Đại Hán."
    },
    {
        "event_id": "EVT_NU_CONG_BO_THUONG_THU",
        "title": "Đào Nhã Nhậm Chức Nữ Công Bộ Thượng Thư & Đại Đồ Án Giao Thông",
        "chapter": 528,
        "participants": ["Đào Nhã", "Quý Bình An"],
        "description": "Đào Nhã sau khi hồi phục dâng bản đồ địa hình và kiến nghị đại công trình 'gặp núi mở đường, gặp nước bắc cầu'. Quý Bình An phong nàng làm Nữ Công Bộ Thượng Thư đầu tiên.",
        "consequences": "Khởi động cuộc cách mạng hạ tầng giao thông quy mô toàn quốc, đẩy nhanh tốc độ chuyển quân và giao thương gấp bội."
    },
    {
        "event_id": "EVT_TRIEU_HOAN_QUAN_VU",
        "title": "Triệu Hoán Thiên Mệnh Võ Tướng Quan Vũ: Kích Hoạt Toàn Bộ Ngũ Hổ Tướng",
        "chapter": 598,
        "participants": ["Quý Bình An", "Quan Vũ"],
        "description": "Quý Bình An tiêu tốn 2 triệu kim triệu hoán Thiên Mệnh Võ Tướng Quan Vân Trường (võ lực 139). Toàn bộ Ngũ Hổ Tướng kích hoạt hoàn chỉnh (5/5), mở lĩnh vực Ngũ Hổ Tuyệt Thế, Quý Bình An nhận Thiên Tử Kiếm.",
        "consequences": "Đại Hán đạt đến đỉnh phong sức mạnh quân sự tuyệt đối trước thềm hội nghị Tây Lăng."
    },
    {
        "event_id": "EVT_TAY_LANG_TU_HOP",
        "title": "Đại Hội Tụ Phong Vân Tây Lăng",
        "chapter": 600,
        "participants": ["Trương Bất Minh", "Thánh giả Thăng", "Quỷ Thánh", "Văn Nhân Mục", "Ninh Thâm"],
        "description": "Trương Bất Minh cùng Thánh Giả Thăng và Triệu Thiên Lỗi dịch dung đến Tây Hoàng Thành; Quỷ Thánh xuất hiện tại Thuyền Hoa; Văn Nhân Mục và Ninh Thâm tụ họp.",
        "consequences": "Khép lại hồi thứ hai, chuẩn bị bùng nổ cuộc chiến tổng lực đa quốc gia tại Tây Lăng."
    }
]

locations_list = [
    {
        "id": "LOC_DAI_HAN_DE_DO",
        "name": "Đại Hán Đế Đô (Nguyên Đại Vũ Kinh Đô)",
        "description": "Trung tâm chính trị, kinh tế của Đại Hán; gồm Cần Chính Điện, Phượng Tê Cung, Di Tâm Viện, Đình Úy Phủ, Thiên Cung Học Viện và 3 tòa Học Cung.",
        "strategic_importance": "Đầu não chỉ huy toàn bộ chiến dịch bành trướng lãnh thổ và cải cách xã hội."
    },
    {
        "id": "LOC_BAC_CANH_TAM_CHAU",
        "name": "Bắc Cảnh Tam Châu (Liễu Châu, Thanh Châu, Tần Châu)",
        "description": "Vùng đất cơ bản nguyên thủy của Quý Bình An, nơi tôi luyện Chinh Bắc quân, Bạch Mã Nghĩa Tòng và các xưởng chế tác sơ khai.",
        "strategic_importance": "Hậu phương vững chắc nhất cung cấp lương thảo, quân đội và kim ngân cho các chiến dịch."
    },
    {
        "id": "LOC_BAC_CO_SON",
        "name": "Bắc Cô Sơn Quan Ải",
        "description": "Cửa ải hiểm trở nằm bên ngoài thành Liễu Châu, địa thế một người giữ ải vạn người khôn qua.",
        "strategic_importance": "Lá chắn thép ngăn cách Liễu Châu với Đông Thương và Nam Ly, nơi chôn vùi 5 vạn quân Bùi Nguyên và chặn đứng Lạc Thiên Thanh."
    },
    {
        "id": "LOC_UAN_CHAU_THANH",
        "name": "Uyển Châu Thành",
        "description": "Vùng đồng bằng màu mỡ vốn là kho lúa chiến lược của Nam Ly, sau đổi chủ về Đại Hán; có cửa thành bọc thép Thiết Giáp Môn.",
        "strategic_importance": "Căn cứ tiền tiêu nối liền Đại Hán với Nam Ly và Tây Lăng; kho cung ứng lương thực khổng lồ."
    },
    {
        "id": "LOC_TAN_MON_THANH",
        "name": "Tân Môn Thành",
        "description": "Thành trì nằm ở vị trí yết hầu phía sau Uyển Châu Thành.",
        "strategic_importance": "Vị trí then chốt chặn đường rút lui của quân đội Tây Lăng; nơi Trương Liêu cắt đứt đường lui của Mạc Thiên Tinh."
    },
    {
        "id": "LOC_NGUU_KHANH_CHAU",
        "name": "Ngưu Khánh Châu",
        "description": "Châu thành trọng yếu ở biên thùy phía Nam kết nối Nam Quan với nội địa.",
        "strategic_importance": "Chiến trường ác liệt diễn ra kế sách Hỏa thiêu thành trống của Chu Du tiêu diệt hơn chục vạn quân liên minh Nam Ly - Đông Thương."
    },
    {
        "id": "LOC_LINH_KHE_THANH",
        "name": "Linh Khê Thành",
        "description": "Thành trì biên giới Tây Lăng từng bị tổn hại sau hỏa hoạn.",
        "strategic_importance": "Nơi Quý Bình An đánh úp bắt sống Bán Thánh Vân Ninh thu về 1.2 triệu kim."
    },
    {
        "id": "LOC_DONG_SON_THANH",
        "name": "Đông Sơn Thành",
        "description": "Cửa ngõ Tây Bắc của Đông Thương, tựa lưng vào sông Bùi An Hà.",
        "strategic_importance": "Nơi Quý Bình Sinh và Lý Nho đại phá 10 vạn quân An gia mở ra đường Đông Chinh."
    },
    {
        "id": "LOC_BUI_AN_HA",
        "name": "Bùi An Hà",
        "description": "Con sông lớn phân định ranh giới tự nhiên giữa các châu thành Đông Bắc Đông Thương.",
        "strategic_importance": "Tuyến giao thông đường thủy và chiến trường Lý Nho chôn sống tù binh gây chấn động."
    },
    {
        "id": "LOC_LAM_QUAN_THANH",
        "name": "Lâm Quan Thành (Đến Quan Thành / Trực Quan Thành)",
        "description": "Cửa khẩu quân sự kiên cố trên tuyến Đại Vũ Quốc Giới nhìn sang Tây Lăng.",
        "strategic_importance": "Nơi hội quân của Quý Bình An và Quý Bình Xuyên, địa điểm Triệu Vân đánh bại Tần Tứ Nghiệp."
    },
    {
        "id": "LOC_TAY_KINH_THANH",
        "name": "Tây Kinh Thành (Tây Lăng)",
        "description": "Thành trì lớn thứ hai của Tây Lăng, do Thành chủ Văn Nhân Húc cai quản; sầm uất với các sòng bạc và hãng buôn vải.",
        "strategic_importance": "Bàn đạp xâm nhập kinh tế và tình báo của Đại Hán vào nội địa Tây Lăng."
    },
    {
        "id": "LOC_TAY_HOANG_THANH",
        "name": "Tây Hoàng Thành",
        "description": "Hoàng thành kinh đô của quốc gia Tây Lăng, nơi tọa lạc cung điện Tây Lăng Vương và Thuyền Hoa.",
        "strategic_importance": "Trung tâm quyền lực Tây Lăng, điểm hẹn hội tụ của các thế lực chư quốc tại Ch.600."
    },
    {
        "id": "LOC_THAN_HOA_THANH",
        "name": "Thần Hỏa Thành (Nam Ly)",
        "description": "Kinh thành và trung tâm chế tạo vũ khí hỏa dược của Nam Ly, nơi đặt đại bản doanh Thần Hỏa Quân.",
        "strategic_importance": "Căn cứ sản xuất vũ khí công phá hàng đầu phương Nam."
    },
    {
        "id": "LOC_NAM_THIEN_THANH",
        "name": "Nam Thiên Thành (Nam Ly)",
        "description": "Quốc môn biên cương kiên cố của Nam Ly nối sang Đại Hán.",
        "strategic_importance": "Cửa ải huyết mạch phòng thủ của Nam Ly, nơi diễn ra vụ ám sát Phó Thương Quân của Tri Mặc Bạch."
    },
    {
        "id": "LOC_NHAT_TUYEN_THIEN",
        "name": "Hẻm Núi Nhất Tuyến Thiên",
        "description": "Hẻm núi dựng đứng hẹp dài, một đường độc đạo cực kỳ hiểm trở.",
        "strategic_importance": "Địa điểm Quý Bình Thường mai phục tập sát Quý Bình An và Trương Phi bộc phát Thánh Giả hộ giá."
    }
]

technology_and_inventions_list = [
    {
        "id": "TECH_THIET_GIAP_MON",
        "name": "Thiết Giáp Môn (Cửa Thành Bọc Thép Nguyên Khối)",
        "inventor": "Thần Tượng Mã Quân (Thiên Cung Học Viện)",
        "chapter_introduced": 558,
        "effect": "Cửa thành được đúc và gia cố bằng thép đặc chủng, chống chịu hoàn toàn máy phá thành, máy bắn đá và địa đạo nổ của quân Tây Lăng tại Uyển Châu.",
        "military_value": "Biến mọi cổng thành Đại Hán thành pháo đài thép bất khả xâm phạm."
    },
    {
        "id": "TECH_NO_LIEN_CHAU",
        "name": "Cơ Quan Nỏ Liên Châu",
        "inventor": "Mã Quân",
        "chapter_introduced": 516,
        "effect": "Nỏ cơ quan có thể bắn liên tiếp nhiều mũi tên với độ chính xác và lực xuyên giáp cao, áp chế kỵ binh đối phương.",
        "military_value": "Trang bị cho Tiên Phong Doanh và bộ binh phòng ngự thành lũy."
    },
    {
        "id": "TECH_CUONG_HOA_SONG_KICH",
        "name": "Cường Hóa Tấn Thiết Song Kích",
        "inventor": "Mã Quân",
        "chapter_introduced": 516,
        "effect": "Sử dụng kỹ thuật luyện thép Thiên Cung tôi luyện lại vũ khí Tấn Thiết Song Kích cho Điển Vi, tăng độ sắc bén, độ bền và sát thương phá giáp.",
        "military_value": "Nâng cao uy lực cận chiến của Cổ Chi Ác Lai Điển Vi."
    },
    {
        "id": "TECH_MO_SO_PHAU_THUAT",
        "name": "Kỹ Thuật Phẫu Thuật Mổ Sọ & Ma Phế Tán",
        "inventor": "Thần Y Hoa Đà",
        "chapter_introduced": 419,
        "effect": "Phương pháp gây mê toàn thân bằng Ma Phế Tán và rạch mở hộp sọ gắp dị vật/cổ trùng mà bệnh nhân không tử vong, kết hợp bí thuật Hồi Xuân cầm máu.",
        "military_value": "Cứu sống Lý Nho và mở ra khả năng phẫu thuật chiến trường cho tướng lĩnh Đại Hán."
    },
    {
        "id": "TECH_QUY_HOACH_GIAO_THONG",
        "name": "Đồ Án Giao Thông Toàn Quốc 'Gặp Núi Mở Đường, Gặp Nước Bắc Cầu'",
        "inventor": "Nữ Công Bộ Thượng Thư Đào Nhã",
        "chapter_introduced": 528,
        "effect": "Hệ thống quy hoạch bản đồ địa lý 4 nước, san phẳng các dãy núi chắn, xây cầu lớn vượt sông, lát đá đường bằng phẳng nối liền các châu huyện về Đế đô.",
        "military_value": "Rút ngắn thời gian chuyển quân chi viện và tuần tra từ hàng tháng xuống vài ngày; kích cầu kinh tế thương nghiệp toàn quốc."
    },
    {
        "id": "TECH_THU_NHAN_HOA",
        "name": "Kỹ Thuật Thú Nhân Hóa Thể",
        "inventor": "Quỷ Thánh (Tây Lăng Quỷ Quật)",
        "chapter_introduced": 505,
        "effect": "Dùng độc chất và tà thuật dung hợp huyết mạch dã thú vào cơ thể người, tạo ra các chiến binh thú có sức mạnh cơ bắp phi thường và không biết sợ chết.",
        "military_value": "Vũ khí sinh học tà đạo nguy hiểm đe dọa quân đội thông thường."
    },
    {
        "id": "TECH_LƯU_HOA_DAN",
        "name": "Lưu Hỏa Đạn / Thần Hỏa Lôi",
        "inventor": "Thiên Cơ Lâu Nam Ly & Thần Hỏa Quân",
        "chapter_introduced": 356,
        "effect": "Vũ khí nổ chứa dầu hỏa và thuốc nổ nguyên sơ, khi phát nổ tạo ra biển lửa và chấn động lớn.",
        "military_value": "Vũ khí hủy diệt diện rộng được dùng trong các trận công thủ thành và thủy chiến."
    }
]

political_events_list = [
    {
        "id": "POL_TINH_KIEN_VUONG",
        "title": "Tử Ngọc Trạch Sắc Phong Quý Bình An Làm Tịnh Kiên Vương",
        "chapter": 303,
        "parties_involved": ["Vũ Hoàng Tử Ngọc Trạch", "Quý Bình An"],
        "nature": "Trao quyền nhiếp chính tối cao",
        "outcome": "Quý Bình An chính thức nắm binh quyền Đại Vũ, đứng ngang hàng với hoàng đế.",
        "impact": "Tạo bước đệm pháp lý trực tiếp để Quý Bình An dần thâu tóm toàn bộ bộ máy triều chính."
    },
    {
        "id": "POL_HOA_UOC_VAN_NINH",
        "title": "Thỏa Thuận Trao Đổi Bán Thánh Vân Ninh & Tống Tiền Tây Lăng",
        "chapter": 349,
        "parties_involved": ["Quý Bình An", "Hề Nhan công chúa", "Tây Lăng triều đình"],
        "nature": "Tống tiền chiến tranh & Mua chuộc danh tướng",
        "outcome": "Tây Lăng trả 1.2 triệu vàng chuộc Vân Ninh; Hề Nhan thuyết phục Vân Ninh quy thuận về phe mình.",
        "impact": "Quý Bình An có đủ vàng triệu hoán Mã Siêu; Hề Nhan xây dựng lực lượng riêng tại Tây Lăng."
    },
    {
        "id": "POL_TAM_NHUONG_DE_VI",
        "title": "Mưu Sách 'Tam Nhượng Đế Vị' & Thu Nhận Toàn Bộ Dân Tâm",
        "chapter": 375,
        "parties_involved": ["Quý Bình An", "Tuân Úc", "Quách Gia", "Cổ Hủ"],
        "nature": "Màn kịch chính trị soán ngôi danh chính ngôn thuận",
        "outcome": "Quý Bình An ba lần từ chối lời mời lên ngôi của triều thần, buộc bách tính toàn quốc phải tự phát ký đơn thỉnh nguyện.",
        "impact": "Tránh tiếng xấu cướp ngôi, biến việc đoạt vị thành hành động hy sinh vì thiên hạ vạn dân."
    },
    {
        "id": "POL_DANG_CO_HOANG_DE",
        "title": "Đại Điển Đăng Cơ Hoàng Đế & Ban Bố Bốn Chính Lệnh",
        "chapter": 386,
        "parties_involved": ["Quý Bình An", "Văn võ bá quan", "10 vạn tướng sĩ"],
        "nature": "Lập triều đại mới",
        "outcome": "Quý Bình An chính thức xưng đế, ban bố giảm thuế 30%, lập tân châu, trợ cấp binh sĩ và Chiêu Hiền Lệnh.",
        "impact": "Kích hoạt toàn bộ hệ thống Anh Linh Điểm quốc gia, khởi động guồng quay chiến tranh thống nhất thiên hạ."
    },
    {
        "id": "POL_DOI_QUOC_HIEU_DAI_HAN",
        "title": "Chính Thức Đổi Quốc Hiệu Đại Hán & Định Niên Hiệu Định Quốc Năm Đầu",
        "chapter": 411,
        "parties_involved": ["Hoàng Đế Quý Bình An", "Đại Hán Triều Đình"],
        "nature": "Xóa bỏ triều đại cũ Đại Vũ, kiến lập triều đại Đại Hán",
        "outcome": "Đại Vũ chính thức đi vào dĩ vãng; Đại Hán xuất hiện với Long Kỳ và cơ cấu mới.",
        "impact": "Thống nhất ý thức hệ quốc gia, đoạn tuyệt hoàn toàn tàn dư của hoàng tộc họ Tử."
    },
    {
        "id": "POL_LAP_HAU_VA_THAI_TU",
        "title": "Sắc Phong Điêu Thuyền Làm Quốc Hậu, Quý Sơn Hà Làm Hoàng Thái Tử",
        "chapter": 427,
        "parties_involved": ["Quý Bình An", "Điêu Thuyền", "Quý Sơn Hà"],
        "nature": "Củng cố quyền lực hậu cung và kế vị",
        "outcome": "Điêu Thuyền trở thành mẫu nghi thiên hạ, mở khóa thiên phú Hồng Nhan; Quý Sơn Hà (1 tuổi) được định danh thái tử.",
        "impact": "Dẹp tan mọi âm mưu chia rẽ nội bộ triều đình Đại Hán và tạo điểm tựa ổn định lâu dài."
    },
    {
        "id": "POL_DIET_MON_TAN_GIA",
        "title": "Diệt Môn Thế Gia Tần Tứ Nghiệp & Tần Ức Đầu Hàng Đại Hán",
        "chapter": 526,
        "parties_involved": ["Vương Việt", "Tần Tứ Nghiệp", "Tần Ức", "Trương Bất Minh"],
        "nature": "Thanh trừng thế gia quân phiệt & Quy hàng",
        "outcome": "Tần Tứ Nghiệp bị ám sát; Tần gia bị gán tội phản quốc tại Tây Lăng; tướng trẻ Tần Ức dẫn quân đầu quân Đại Hán.",
        "impact": "Tây Lăng mất đi trụ cột quân sự mạnh nhất; Đại Hán tiếp nhận thêm một tướng tài am hiểu địa hình Tây Lăng."
    },
    {
        "id": "POL_THUYET_PHUC_PHO_DINH_THANG",
        "title": "Truyền Bá 'Hiếu Kinh' Lôi Kéo Đại Nho Phó Dĩnh Thăng",
        "chapter": 535,
        "parties_involved": ["Quý Bình An", "Phó Dĩnh Thăng"],
        "nature": "Chiến tranh văn hóa & Ngoại giao văn đàn",
        "outcome": "Tác phẩm Nho gia kinh điển 'Hiếu Kinh' gây chấn động Tây Lăng, Phó Dĩnh Thăng nhận lời sang giảng dạy tại Học Cung Đại Hán.",
        "impact": "Đoạt lấy ngọn cờ chính thống Nho học từ Tây Lăng, nâng tầm uy tín văn hóa của Đại Hán lên hàng đầu."
    },
    {
        "id": "POL_CHINH_BIEN_NAM_LY",
        "title": "Cung Ngạo Ám Hại Thái Tử Phó Thương Quân, Tiếm Quyền Nam Ly",
        "chapter": 582,
        "parties_involved": ["Cung Ngạo", "Tri Mặc Bạch", "Phó Thương Quân"],
        "nature": "Đảo chính quân sự đẫm máu & Phản bội",
        "outcome": "Phó Thương Quân bị trừ khử; Cung Ngạo thâu tóm thực quyền Nam Ly, chuẩn bị tự lập làm quốc chủ.",
        "impact": "Làm Nam Ly suy yếu nghiêm trọng do đấu đá nội bộ, tạo thời cơ thuận lợi cho liên minh Đại Hán khai chiến."
    },
    {
        "id": "POL_HOI_TAY_LANG",
        "title": "Đại Hội Tụ Phong Vân Chư Quốc Tại Tây Hoàng Thành",
        "chapter": 600,
        "parties_involved": ["Trương Bất Minh", "Quỷ Thánh", "Văn Nhân Mục", "Ninh Thâm", "Đại Hán"],
        "nature": "Hội minh đa phương & Chuẩn bị chiến tranh tổng lực",
        "outcome": "Các thế lực lớn nhất Trung Thổ đồng loạt quy tụ về Tây Lăng để đàm phán và phân chia lại bản đồ quyền lực.",
        "impact": "Mở ra cao trào chiến tranh mới giữa Đại Hán của Quý Bình An với liên minh chư quốc."
    }
]

final_data = {
    "arc_metadata": {
        "arc_id": "ARC_02",
        "arc_name": "Tranh Bá Thiên Hạ - Định Quốc Đại Hán",
        "chapter_range": [301, 600],
        "total_chapters": 300,
        "summary": "Quý Bình An từ Tịnh Kiên Vương nhiếp chính lật đổ cựu triều Đại Vũ, thực hiện chiến lược tam nhượng đế vị để dẫn tới sự kiện Thiên hạ tập thể nguyện, chính thức đăng cơ Hoàng Đế. Hệ thống nâng cấp lên giai đoạn Tranh Bá, mở khóa Anh Linh Điểm, triệu hoán các thần tướng mưu thần (Mã Siêu, Quách Gia, Trương Phi, Hứa Chử, Cam Ninh, Vương Việt, Quan Vũ) cùng các nhân tài đặc thù (Hoa Đà, Mã Quân). Quý Bình An đổi quốc hiệu sang Đại Hán, niên hiệu Định Quốc năm đầu, ban hành Bốn Chính Lệnh, xây dựng ba tòa Học Cung (cho cả nữ giới), lập Thiên Cung Học Viện, quy hoạch giao thông huyết mạch toàn quốc cùng Nữ Công Bộ Thượng Thư Đào Nhã. Trải qua đại chiến Ngưu Khánh Châu hỏa thiêu thành trống, thủy triều ngập Chiến Hổ quân, diệt môn Tần gia Tây Lăng, đè bẹp Lạc Thiên Thanh và Mạc Thiên Tinh, khống chế sát thủ Huyết Y Các, chuẩn bị cho cuộc đại quyết đấu tại Tây Lăng.",
        "key_themes": [
            "Đăng cơ xưng đế & Đổi quốc hiệu Đại Vũ thành Đại Hán",
            "Hệ thống thăng cấp Tranh Bá & Hệ thống Anh Linh Điểm",
            "Thiên mệnh quy vị: Quách Gia (Mưu thần), Quan Vũ - Triệu Vân - Trương Phi - Mã Siêu - Hoàng Trung (Ngũ Hổ Tướng)",
            "Đột phá cảnh giới võ học: Bán Thánh lên Thánh Giả (Triệu Vân, Vương Việt, Quan Vũ)",
            "Cải cách xã hội: Xây dựng Học Cung (Nữ Tử Học Cung), Bốn chính lệnh, Hạ tầng giao thông Đào Nhã",
            "Bí mật Thâu Thiên hoán nhật của Quý Vô Song & Tứ huynh đệ Quý gia",
            "Bóng ma Đại La Đế Quốc hải ngoại xâm lấn"
        ]
    },
    "system_mechanics_upgrade": {
        "upgrade_milestone_chapter": 360,
        "system_phase": "Tam Quốc Anh Linh Tranh Bá",
        "prerequisites_unlocked": [
            "Hiện lên ở phương Đông (Đông Thương phòng tuyến)",
            "Tây Chinh thành công (chiếm ưu thế Tây Lăng Quốc Giới Thập Tam Châu)",
            "Mở rộng lỗ hổng tranh bá thiên hạ"
        ],
        "core_rules_changes": [
            {
                "change": "Hủy bỏ triệu hoán thiên kim mưu thần và võ tướng (1,000 vàng)",
                "rationale": "Cấp bậc chiến tranh mở rộng quy mô quốc gia và tranh phong Thánh Giả, loại bỏ cấp bậc thấp không còn phù hợp."
            },
            {
                "change": "Bổ sung cấp bậc triệu hoán mới",
                "details": {
                    "tier_10k": "10,000 vàng (Vạn kim võ tướng/văn thần: Phan Phượng, Hình Đạo Vinh)",
                    "tier_50k": "50,000 vàng (50 ngàn kim võ tướng/văn thần: Hác Chiêu, Mãn Sủng)",
                    "tier_100k": "100,000 vàng (Tuyệt thế võ tướng/mưu thần: Mã Siêu, Trương Phi, Hứa Chử, Cam Ninh)",
                    "tier_special_peerless": "Đặc thù loại tuyệt thế anh linh (Hoa Đà, Mã Quân, Vương Việt)",
                    "tier_heaven_mandate_strategist": "500,000 vàng (Thiên mệnh mưu thần: Quách Gia - kích hoạt Hoàng Đạo khí vận)",
                    "tier_heaven_mandate_general": "2,000,000 vàng (Thiên mệnh võ tướng: Quan Vũ - kích hoạt sau khi đột phá Quách Gia tại Ch.428)"
                }
            },
            {
                "change": "Hệ thống Anh Linh Điểm (Hero Soul Points)",
                "conversion_rate": "1 Anh linh điểm = 1 Vàng (hoán đổi tương đương để mua sắm, triệu hoán, đột phá)",
                "earning_mechanisms": [
                    "Mỗi tiêu diệt 1 sinh lực địch trực thuộc quân đội ký chủ: +1 Anh linh điểm",
                    "Mỗi công chiếm thành công 1 tòa thành trì: +10,000 Anh linh điểm"
                ],
                "emperor_dependency_rule": "Trước khi đăng cơ, chỉ quân lực trực thuộc Quý Bình An (17 vạn quân Bắc Cảnh và 3 châu Liễu - Thanh - Tần) mới được cộng điểm. Quân của Quý Bình Sinh và Quý Bình Xuyên thuộc Vũ Hoàng nên không được tính. Điều kiện để gom toàn bộ chiến sự quốc gia vào Anh Linh Điểm là KÝ CHỦ PHẢI ĐĂNG CƠ LÀM ĐẾ."
            },
            {
                "change": "Đặc quyền Đăng Cơ Hoàng Đế (Ch.386, 394)",
                "unlocked_abilities": [
                    "Toàn bộ chinh phạt, phòng thủ, sát lục của Đại Hán chuyển hóa thành Anh Linh Điểm",
                    "Hoàng Đạo Long Khí Hộ Thể: Vạn tà bất xâm, phòng ngự tuyệt đối trước ám sát thông thường",
                    "Ngôn Xuất Pháp Tùy: Khí thế thiên tử uy áp quần thần, lời nói mang thiên địa quy tắc gia trì"
                ]
            },
            {
                "change": "Đặc thù Thiên Phú Cộng Minh (3 Giai đoạn)",
                "stages": [
                    {
                        "stage": 1,
                        "effect": "Cộng minh cơ bản giữa các tuyệt thế võ tướng và mưu thần ban đầu."
                    },
                    {
                        "stage": 2,
                        "unlocked_chapter": 381,
                        "effect": "Cộng minh tuyệt thế thiên phú giai đoạn 2, gia tăng trí lực tuyệt đối cho Hoa Đà (+2), mở khóa triệu hoán Thiên Mệnh Mưu Thần Quách Gia."
                    },
                    {
                        "stage": 3,
                        "unlocked_chapter": 557,
                        "effect": "Cho phép mở khóa thiên phú thứ hai cho các tuyệt thế võ tướng hoặc mưu thần (Ví dụ: Mã Quân mở thiên phú thứ hai 'Xảo Nghĩ' +3 trí lực)."
                    }
                ]
            },
            {
                "change": "Cơ chế Đột Phá Thiên Mệnh & Thánh Giả (Ch.428, 502)",
                "quach_gia_breakthrough": "Tiêu tốn 100,000 Anh linh điểm, mở thiên phú Dự Phán (+1 trí lực), đột phá trí lực +4 đạt 104, Nghịch thiên cải mệnh gia tăng 50 năm thọ mệnh, mở khóa hệ thống Thiên Mệnh Võ Tướng.",
                "trieu_van_breakthrough": "Đột phá cảnh giới Bán Thánh lên Thánh Giả (Võ lực 132-134), mở khóa thiên phú thứ hai Nhai Giác (+2 võ lực), kích hoạt bảo rương phần thưởng ngẫu nhiên Anh Hồn Lệnh (sau triệu hoán Vương Việt)."
            },
            {
                "change": "Kích hoạt Ràng Buộc Thần Thoại: Ngũ Hổ Tướng (Ch.350, 443, 598)",
                "progression": "Mã Siêu (3/5 -> +3 điểm thuộc tính tự do), Trương Phi (4/5), Quan Vũ (5/5 hoàn chỉnh)",
                "completion_buffs": "Toàn bộ 5 vị tướng Ngũ Hổ nhận +3 võ lực vĩnh viễn; Ký chủ nhận +5 điểm thuộc tính và +10 võ lực kèm bảo kiếm Thiên Tử Kiếm; Kích hoạt hiệu ứng tổ hợp độc quyền 'Ngũ Hổ Tuyệt Thế'."
            }
        ]
    },
    "characters": characters_list,
    "organizations": organizations_list,
    "battles": battles_list,
    "key_plot_events": key_plot_events_list,
    "locations": locations_list,
    "technology_and_inventions": technology_and_inventions_list,
    "political_events": political_events_list
}

output_path = "data/extraction_arc2_ch301_600.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(final_data, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {output_path}")
print(f"Size: {os.path.getsize(output_path)} bytes")
print(f"Characters: {len(final_data['characters'])}")
print(f"Organizations: {len(final_data['organizations'])}")
print(f"Battles: {len(final_data['battles'])}")
print(f"Key Plot Events: {len(final_data['key_plot_events'])}")
print(f"Locations: {len(final_data['locations'])}")
print(f"Technologies: {len(final_data['technology_and_inventions'])}")
print(f"Political Events: {len(final_data['political_events'])}")
