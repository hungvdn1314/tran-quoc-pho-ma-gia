from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class SkillCard(BaseModel):
    name: str = Field(..., description="Tên thẻ bài kỹ năng")
    card_type: str = Field(..., description="Loại thẻ: Tấn công, Phòng thủ, Mưu kế, Trợ chiến, Cấm thuật")
    cost_ap: int = Field(default=1, description="Điểm quân lệnh tiêu tốn")
    gold_cost: int = Field(default=0, description="Số lượng vàng tiêu hao khi kích hoạt (nếu có)")
    effect_description: str = Field(..., description="Mô tả hiệu ứng kỹ năng trong trận đánh bài")

class Character(BaseModel):
    id: str = Field(..., description="Mã định danh duy nhất (e.g., CHAR_TRIEU_VAN)")
    canonical_name: str = Field(..., description="Tên chính danh")
    aliases: List[str] = Field(default_factory=list, description="Các danh xưng, biệt hiệu, cách xưng hô")
    faction: str = Field(..., description="Phe phái: Quý Gia, Triều Đình Đại Vũ, Tây Lăng, Nam Ly, Bắc Cương, v.v.")
    role: str = Field(..., description="Vai trò: Võ Tướng, Mưu Thần, Mỹ Nhân, Thống Soái, Sát Thủ, Quân Chủ")
    martial_realm: str = Field(default="Phàm Nhân", description="Cảnh giới: Vương Cảnh, Hoàng Cảnh, Đế Cảnh, Bán Thánh, Thánh Giả, Bán Tiên, Nhân Tiên")
    martial_power: int = Field(default=50, description="Chỉ số võ lực ước lượng (1-160)")
    is_summoned_spirit: bool = Field(default=False, description="Có phải anh linh Tam Quốc được hệ thống triệu hoán không")
    gold_summon_cost: Optional[int] = Field(default=None, description="Chi phí vàng hệ thống yêu cầu khi triệu hoán")
    signature_weapons: List[str] = Field(default_factory=list, description="Thần binh, bảo khí sở hữu")
    skills: List[SkillCard] = Field(default_factory=list, description="Danh sách kỹ năng độc quyền chuyển thể thành thẻ bài")
    relationships: Dict[str, str] = Field(default_factory=dict, description="Mối quan hệ với các nhân vật khác: {Mã_NV: Loại_quan_hệ}")
    first_appeared_chapter: int = Field(default=1, description="Chương xuất hiện lần đầu")
    lore_bio: str = Field(default="", description="Tiểu sử và vai trò trong cốt truyện")

class TechItem(BaseModel):
    id: str = Field(..., description="Mã công nghệ (e.g., TECH_LUU_HOA)")
    name: str = Field(..., description="Tên phát minh / công nghệ")
    category: str = Field(..., description="Phân loại: Quân sự, Thương nghiệp, Thủy chiến, Công thành, Giáp khí")
    research_cost_gold: int = Field(..., description="Số lượng vàng cần để nghiên cứu")
    research_time_days: int = Field(default=1, description="Thời gian nghiên cứu (tính bằng ngày/lượt)")
    prerequisites: List[str] = Field(default_factory=list, description="Điều kiện tiên quyết (tướng cần có, cấp xưởng)")
    invented_chapter: int = Field(..., description="Chương mà Quý Bình An lần đầu nghiên cứu / chế tạo")
    unlocked_cards: List[str] = Field(default_factory=list, description="Các thẻ bài mở khóa trong chiến đấu bài (e.g. Hỏa Tiễn, Lưu Hỏa)")
    economic_yield: Optional[str] = Field(default=None, description="Lợi ích kinh tế mang lại nếu là phát minh thương nghiệp")
    description: str = Field(default="", description="Chi tiết công nghệ và ứng dụng trong truyện")

class Battle(BaseModel):
    id: str = Field(..., description="Mã trận chiến (e.g., BTL_HO_LAO_QUAN)")
    name: str = Field(..., description="Tên trận đánh / chiến dịch")
    arc_id: str = Field(..., description="Thuộc Arc cốt truyện nào")
    chapters: List[int] = Field(..., description="Các chương diễn ra trận đánh")
    location: str = Field(..., description="Địa danh chiến trường")
    terrain_type: str = Field(..., description="Địa hình: Dã chiến, Công thành, Thủ thành, Phục kích hẻm núi, Thủy chiến")
    player_commanders: List[str] = Field(..., description="Các tướng lĩnh phe Quý Bình An tham gia")
    enemy_commanders: List[str] = Field(..., description="Các tướng lĩnh / cao thủ phe địch")
    player_troops: str = Field(..., description="Lực lượng phe ta điều động")
    enemy_troops: str = Field(..., description="Lực lượng phe địch")
    marching_distance_days: int = Field(default=1, description="Thời gian hành quân đến chiến trường (ngày)")
    key_stratagem: str = Field(..., description="Mưu kế the chốt định đoạt thắng bại")
    outcome: str = Field(..., description="Kết quả trận chiến")
    rewards: str = Field(default="", description="Phần thưởng: vàng thu được, thành trì kiểm soát, tướng thu phục")

class CourtEventChoice(BaseModel):
    choice_id: str
    choice_text: str = Field(..., description="Nội dung người chơi chọn")
    suspicion_change: int = Field(default=0, description="Thay đổi độ nghi kị của Vũ Hoàng/Triều đình (-10 đến +20)")
    favor_change: int = Field(default=0, description="Thay đổi thiện cảm với các nhân vật liên quan")
    gold_change: int = Field(default=0, description="Số vàng nhận được hoặc mất đi")
    narrative_consequence: str = Field(..., description="Hậu quả hoặc phân nhánh cốt truyện")

class CourtEvent(BaseModel):
    id: str = Field(..., description="Mã biến cố (e.g., EVT_CAU_DOI_HOANG_CUNG)")
    name: str = Field(..., description="Tên biến cố / tình huống quyền mưu")
    arc_id: str = Field(..., description="Thuộc Arc nào")
    trigger_chapter: int = Field(..., description="Chương diễn ra sự kiện")
    context_dialogue: str = Field(..., description="Tình huống và bối cảnh đối thoại")
    opposing_figures: List[str] = Field(..., description="Các nhân vật đối đầu/chất vấn")
    choices: List[CourtEventChoice] = Field(..., description="Các lựa chọn phân nhánh")

class TroopType(BaseModel):
    id: str = Field(..., description="Mã binh chủng (e.g., TRP_HAM_TRAN_DOANH)")
    name: str = Field(..., description="Tên quân đoàn / binh chủng")
    commander: str = Field(..., description="Thống lĩnh huấn luyện (e.g., Cao Thuận)")
    category: str = Field(..., description="Kỵ binh, Bộ binh giáp nặng, Cung nỏ thủ, Thủy quân")
    defense_rating: int = Field(default=50, description="Chỉ số phòng ngự cơ bản")
    attack_rating: int = Field(default=50, description="Chỉ số tấn công")
    mobility: int = Field(default=50, description="Tốc độ hành quân")
    special_trait: str = Field(..., description="Đặc tính chiến đấu độc quyền")
    unlocked_card_name: str = Field(..., description="Thẻ bài binh chủng khi đem quân ra trận")

class StoryArc(BaseModel):
    arc_id: str
    arc_number: int
    title: str
    start_chapter: int
    end_chapter: int
    synopsis: str
    major_turning_points: List[str]
