/**
 * BUNDLE DỮ LIỆU GAME TRẤN QUỐC PHÒ MÃ GIA (PROTOTYPE V3)
 * Tự động tạo bởi scripts/bundle_game_data.py
 * Hỗ trợ thực thi 100% Offline qua giao thức file:/// không bị lỗi CORS.
 */
(function() {
  window.GAME_DATA = {
  "heroes": [
    {
      "id": "hero_zhaoyun",
      "name": "Triệu Vân",
      "aliases": [
        "Zhao Yun"
      ],
      "rarity": "SSR",
      "faction": "Hoàng Thất Đại Vũ",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 96,
        "command": 91,
        "intelligence": 76,
        "politics": 65,
        "charisma": 90
      },
      "hp": 1200,
      "atk": 150,
      "troop_type": "Bạch Mã Nghĩa Tòng",
      "cost": 6.5,
      "troop_affinity": {
        "Bạch Mã Nghĩa Tòng": "S"
      },
      "equipment": [
        {
          "id": "eq_longdam",
          "name": "Long Đảm Lượng Ngân Thương",
          "type": "weapon",
          "stat_bonus": {
            "force": 10
          },
          "description": "Thương truyền thuyết."
        }
      ],
      "skills": [
        {
          "id": "sk_thattham",
          "name": "Thất Thám Bàn Xà",
          "type": "active",
          "mana_cost": 3,
          "damage": 400,
          "effects": [],
          "description": "Gây sát thương lớn."
        },
        {
          "id": "sk_longdam",
          "name": "Long Đảm",
          "type": "passive",
          "effects": [
            "Immune to fear"
          ],
          "description": "Không bị hoảng sợ."
        },
        {
          "id": "sk_dotkich",
          "name": "Đột Kích",
          "type": "passive",
          "effects": [
            "+10% speed"
          ],
          "description": "Tăng tốc độ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_nguho",
          "name": "Ngũ Hổ Tướng",
          "required_heroes": [
            "hero_machao"
          ],
          "bonus": {
            "atk_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_zhaoyun_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 5,
      "novel_first_appearance": 5
    },
    {
      "id": "hero_dianwei",
      "name": "Điển Vi",
      "aliases": [
        "Dian Wei"
      ],
      "rarity": "SSR",
      "faction": "Trung Lập",
      "realm": "Hoàng Cảnh Trung Kỳ",
      "base_stats": {
        "force": 99,
        "command": 72,
        "intelligence": 35,
        "politics": 25,
        "charisma": 60
      },
      "hp": 1500,
      "atk": 160,
      "troop_type": "Hổ Bộ Doanh",
      "cost": 6.0,
      "troop_affinity": {
        "Hổ Bộ Doanh": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_aclai",
          "name": "Ác Lai",
          "type": "passive",
          "effects": [],
          "description": "Tăng sát thương theo HP mất.",
          "damage": 0
        },
        {
          "id": "sk_generic_hero_dianwei_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_dianwei_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_hovethan",
          "name": "Hộ Vệ Thần",
          "required_heroes": [],
          "bonus": {
            "hp_pct": 15.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_dianwei_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 15,
      "novel_first_appearance": 15
    },
    {
      "id": "hero_jiaxu",
      "name": "Giả Hủ",
      "aliases": [
        "Jia Xu"
      ],
      "rarity": "SSR",
      "faction": "Trung Lập",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 45,
        "command": 65,
        "intelligence": 97,
        "politics": 88,
        "charisma": 50
      },
      "hp": 800,
      "atk": 50,
      "troop_type": "Mưu Thần",
      "cost": 5.5,
      "troop_affinity": {
        "Mưu Thần": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_docsi",
          "name": "Độc Sĩ",
          "type": "active",
          "mana_cost": 4,
          "damage": 100,
          "effects": [
            "Poison"
          ],
          "description": "Gây độc mạnh."
        },
        {
          "id": "sk_generic_hero_jiaxu_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_jiaxu_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_muuthan",
          "name": "Mưu Thần",
          "required_heroes": [
            "hero_xunyu",
            "hero_guojia"
          ],
          "bonus": {
            "int_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_jiaxu_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 27,
      "novel_first_appearance": 27
    },
    {
      "id": "hero_gaoshun",
      "name": "Cao Thuận",
      "aliases": [
        "Gao Shun"
      ],
      "rarity": "SR",
      "faction": "Tây Lăng",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 82,
        "command": 78,
        "intelligence": 52,
        "politics": 40,
        "charisma": 70
      },
      "hp": 1100,
      "atk": 120,
      "troop_type": "Hãm Trận Doanh",
      "cost": 5.0,
      "troop_affinity": {
        "Hãm Trận Doanh": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_hamtran",
          "name": "Hãm Trận",
          "type": "passive",
          "effects": [
            "Break shield"
          ],
          "description": "Phá giáp.",
          "damage": 0
        },
        {
          "id": "sk_generic_hero_gaoshun_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_gaoshun_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_trungthanh",
          "name": "Trung Thành",
          "required_heroes": [
            "hero_zhangliao"
          ],
          "bonus": {
            "def_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_gaoshun_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 20,
      "novel_first_appearance": 20
    },
    {
      "id": "hero_liru",
      "name": "Lý Nho",
      "aliases": [
        "Li Ru"
      ],
      "rarity": "SR",
      "faction": "Tây Lăng",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 55,
        "command": 60,
        "intelligence": 85,
        "politics": 72,
        "charisma": 40
      },
      "hp": 750,
      "atk": 45,
      "troop_type": "Mưu Thần",
      "cost": 4.5,
      "troop_affinity": {
        "Mưu Thần": "A"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_lietduc",
          "name": "Diệt Dục",
          "type": "active",
          "mana_cost": 3,
          "damage": 50,
          "effects": [
            "Silence"
          ],
          "description": "Khóa mõm."
        },
        {
          "id": "sk_generic_hero_liru_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_liru_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_docac",
          "name": "Độc Ác",
          "required_heroes": [
            "hero_jiaxu"
          ],
          "bonus": {
            "damage_pct": 5.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_liru_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 18,
      "novel_first_appearance": 18
    },
    {
      "id": "hero_diaochan",
      "name": "Điêu Thuyền",
      "aliases": [
        "Diao Chan"
      ],
      "rarity": "SSR",
      "faction": "Quý Gia",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 28,
        "command": 30,
        "intelligence": 82,
        "politics": 90,
        "charisma": 100
      },
      "hp": 700,
      "atk": 30,
      "troop_type": "Hồng Nhan",
      "cost": 4.0,
      "troop_affinity": {
        "Hồng Nhan": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_lygian",
          "name": "Ly Gián",
          "type": "active",
          "mana_cost": 3,
          "damage": 0,
          "effects": [
            "Charm"
          ],
          "description": "Quyến rũ."
        },
        {
          "id": "sk_generic_hero_diaochan_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_diaochan_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_hongnhan",
          "name": "Hồng Nhan",
          "required_heroes": [],
          "bonus": {
            "dodge_pct": 15.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_diaochan_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 25,
      "novel_first_appearance": 25
    },
    {
      "id": "hero_machao",
      "name": "Mã Siêu",
      "aliases": [
        "Ma Chao"
      ],
      "rarity": "SSR",
      "faction": "Tây Lăng",
      "realm": "Hoàng Cảnh Trung Kỳ",
      "base_stats": {
        "force": 97,
        "command": 85,
        "intelligence": 42,
        "politics": 30,
        "charisma": 80
      },
      "hp": 1150,
      "atk": 155,
      "troop_type": "Tây Lăng Thiết Kỵ",
      "cost": 6.5,
      "troop_affinity": {
        "Tây Lăng Thiết Kỵ": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_dotkich2",
          "name": "Thiết Kỵ",
          "type": "passive",
          "effects": [
            "Charge"
          ],
          "description": "Lao tới.",
          "damage": 0
        },
        {
          "id": "sk_generic_hero_machao_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_machao_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_nguho2",
          "name": "Ngũ Hổ Tướng",
          "required_heroes": [
            "hero_zhaoyun"
          ],
          "bonus": {
            "atk_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_machao_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 100,
      "novel_first_appearance": 100
    },
    {
      "id": "hero_zhangliao",
      "name": "Trương Liêu",
      "aliases": [
        "Zhang Liao"
      ],
      "rarity": "SSR",
      "faction": "Bắc Cương",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 90,
        "command": 88,
        "intelligence": 68,
        "politics": 52,
        "charisma": 85
      },
      "hp": 1100,
      "atk": 130,
      "troop_type": "Thiết Kỵ Tiên Phong",
      "cost": 6.0,
      "troop_affinity": {
        "Thiết Kỵ Tiên Phong": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_uytran",
          "name": "Uy Trấn",
          "type": "active",
          "mana_cost": 4,
          "damage": 200,
          "effects": [
            "Fear"
          ],
          "description": "Gây sợ hãi."
        },
        {
          "id": "sk_generic_hero_zhangliao_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_zhangliao_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_tienphong",
          "name": "Tiên Phong",
          "required_heroes": [
            "hero_gaoshun"
          ],
          "bonus": {
            "speed_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_zhangliao_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 45,
      "novel_first_appearance": 45
    },
    {
      "id": "hero_guojia",
      "name": "Quách Gia",
      "aliases": [
        "Guo Jia"
      ],
      "rarity": "SSR",
      "faction": "Trung Lập",
      "realm": "Hoàng Cảnh Trung Kỳ",
      "base_stats": {
        "force": 35,
        "command": 55,
        "intelligence": 98,
        "politics": 82,
        "charisma": 75
      },
      "hp": 700,
      "atk": 40,
      "troop_type": "Mưu Thần Đệ Nhất",
      "cost": 6.5,
      "troop_affinity": {
        "Mưu Thần Đệ Nhất": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_thienky",
          "name": "Thiên Cơ",
          "type": "passive",
          "effects": [
            "Insight"
          ],
          "description": "Nhìn thấu.",
          "damage": 0
        },
        {
          "id": "sk_generic_hero_guojia_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_guojia_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_muuthan2",
          "name": "Mưu Thần",
          "required_heroes": [
            "hero_xunyu",
            "hero_jiaxu"
          ],
          "bonus": {
            "int_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_guojia_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 60,
      "novel_first_appearance": 60
    },
    {
      "id": "hero_xunyu",
      "name": "Tuân Úc",
      "aliases": [
        "Xun Yu"
      ],
      "rarity": "SSR",
      "faction": "Hoàng Thất Đại Vũ",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 30,
        "command": 58,
        "intelligence": 95,
        "politics": 96,
        "charisma": 90
      },
      "hp": 750,
      "atk": 35,
      "troop_type": "Nội Chính Đại Thần",
      "cost": 6.0,
      "troop_affinity": {
        "Nội Chính Đại Thần": "S"
      },
      "equipment": [],
      "skills": [
        {
          "id": "sk_vuongta",
          "name": "Vương Tá",
          "type": "passive",
          "effects": [
            "Resource Boost"
          ],
          "description": "Tăng tài nguyên.",
          "damage": 0
        },
        {
          "id": "sk_generic_hero_xunyu_1",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        },
        {
          "id": "sk_generic_hero_xunyu_2",
          "name": "Kỹ năng thường",
          "type": "passive",
          "effects": [],
          "description": "Kỹ năng bổ trợ."
        }
      ],
      "bonds": [
        {
          "id": "bnd_muuthan3",
          "name": "Mưu Thần",
          "required_heroes": [
            "hero_guojia",
            "hero_jiaxu"
          ],
          "bonus": {
            "int_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_generic_hero_xunyu_1",
          "name": "Duyên phận",
          "required_heroes": [],
          "bonus": {},
          "is_active": false
        }
      ],
      "summon_chapter": 30,
      "novel_first_appearance": 30
    },
    {
      "id": "hero_guanyu",
      "name": "Quan Vũ",
      "aliases": [
        "Guan Yu",
        "Quan Vân Trường",
        "Mỹ Nhiễm Công"
      ],
      "rarity": "SSR",
      "faction": "Hoàng Thất Đại Vũ",
      "realm": "Hoàng Cảnh Đỉnh Phong",
      "base_stats": {
        "force": 98,
        "command": 95,
        "intelligence": 75,
        "politics": 62,
        "charisma": 93
      },
      "hp": 1350,
      "atk": 165,
      "troop_type": "Kinh Châu Thủy Bộ Kỵ",
      "cost": 7.0,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Thủy Quân": "S",
        "Bộ Binh": "A",
        "Cung Thủ": "B"
      },
      "equipment": [
        {
          "id": "eq_thanhlong",
          "name": "Thanh Long Yển Nguyệt Đao",
          "type": "weapon",
          "stat_bonus": {
            "force": 12
          },
          "description": "Thần đao nặng 82 cân, trảm tướng đoạt kỳ."
        },
        {
          "id": "eq_xichtho_guanyu",
          "name": "Xích Thố Mã",
          "type": "mount",
          "stat_bonus": {
            "command": 5,
            "force": 3
          },
          "description": "Chiến mã đệ nhất thiên hạ, phi qua vạn dặm."
        }
      ],
      "skills": [
        {
          "id": "sk_thanhlong_tram",
          "name": "Thanh Long Trảm Tướng",
          "type": "active",
          "mana_cost": 3,
          "damage": 450,
          "effects": [
            "Pierce Armor",
            "Bleed"
          ],
          "description": "Vung đại đao chém đứt phòng tuyến địch.",
          "trigger_rate": null
        },
        {
          "id": "sk_uy_chan_hoa_ha",
          "name": "Uy Chấn Hoa Hạ",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "All Enemy ATK -15%"
          ],
          "description": "Hào khí trấn áp toàn bộ tướng lĩnh địch.",
          "trigger_rate": null
        },
        {
          "id": "sk_nghia_tuyet",
          "name": "Nghĩa Khí Hạo Nhiên",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Morale Lock at 100%"
          ],
          "description": "Sĩ khí quân sĩ không bao giờ suy giảm.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_taovien",
          "name": "Đào Viên Kết Nghĩa",
          "required_heroes": [
            "hero_zhangfei"
          ],
          "bonus": {
            "force_pct": 15.0,
            "hp_pct": 10.0
          },
          "is_active": false
        },
        {
          "id": "bnd_nguho_guanyu",
          "name": "Ngũ Hổ Tướng",
          "required_heroes": [
            "hero_zhaoyun",
            "hero_machao",
            "hero_zhangfei",
            "hero_huangzhong"
          ],
          "bonus": {
            "atk_pct": 20.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 60,
      "summon_cost_gold": null,
      "novel_first_appearance": 55
    },
    {
      "id": "hero_zhangfei",
      "name": "Trương Phi",
      "aliases": [
        "Zhang Fei",
        "Trương Dực Đức"
      ],
      "rarity": "SSR",
      "faction": "Hoàng Thất Đại Vũ",
      "realm": "Hoàng Cảnh Cao Kỳ",
      "base_stats": {
        "force": 98,
        "command": 86,
        "intelligence": 33,
        "politics": 22,
        "charisma": 50
      },
      "hp": 1300,
      "atk": 160,
      "troop_type": "U Châu Mãnh Kỵ",
      "cost": 6.5,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Bộ Binh": "A",
        "Thương Binh": "S",
        "Cung Thủ": "C"
      },
      "equipment": [
        {
          "id": "eq_truongbat",
          "name": "Trượng Bát Xà Mâu",
          "type": "weapon",
          "stat_bonus": {
            "force": 10
          },
          "description": "Mâu thép dài uốn lượn như rắn, đâm thủng giáp trụ."
        }
      ],
      "skills": [
        {
          "id": "sk_tieng_het_truong_ban",
          "name": "Tiếng Hét Trường Bản",
          "type": "active",
          "mana_cost": 2,
          "damage": 250,
          "effects": [
            "Stun All Frontline",
            "Break Formation"
          ],
          "description": "Thét vang làm vỡ mật tướng địch, làm choáng toàn làn đối diện.",
          "trigger_rate": null
        },
        {
          "id": "sk_ma_manh",
          "name": "Mãnh Khí Đột Trận",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Crit Rate +25%"
          ],
          "description": "Tăng mạnh tỷ lệ bạo kích khi xông pha trận mạc.",
          "trigger_rate": null
        },
        {
          "id": "sk_cuong_chien",
          "name": "Cuồng Chiến Bất Khuất",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "ATK +30% when HP < 50%"
          ],
          "description": "Máu càng thấp, đòn đánh càng hung bạo.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_taovien_zf",
          "name": "Đào Viên Kết Nghĩa",
          "required_heroes": [
            "hero_guanyu"
          ],
          "bonus": {
            "force_pct": 15.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 60,
      "summon_cost_gold": null,
      "novel_first_appearance": 55
    },
    {
      "id": "hero_zhugeliang",
      "name": "Gia Cát Lượng",
      "aliases": [
        "Zhuge Liang",
        "Khổng Minh",
        "Ngọa Long"
      ],
      "rarity": "UR",
      "faction": "Hoàng Thất Đại Vũ",
      "realm": "Bán Thánh",
      "base_stats": {
        "force": 38,
        "command": 94,
        "intelligence": 100,
        "politics": 99,
        "charisma": 98
      },
      "hp": 950,
      "atk": 85,
      "troop_type": "Bát Quái Thần Cơ Doanh",
      "cost": 7.5,
      "troop_affinity": {
        "Cung Thủ": "S",
        "Bộ Binh": "S",
        "Trận Pháp": "S",
        "Kỵ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_hac_vu_phien",
          "name": "Bạch Hạc Vũ Phiến",
          "type": "weapon",
          "stat_bonus": {
            "intelligence": 15,
            "command": 5
          },
          "description": "Quạt lông phất nhẹ điều khiển gió mây và thế trận."
        }
      ],
      "skills": [
        {
          "id": "sk_bat_tran_do",
          "name": "Bát Trận Đồ Quái Trận",
          "type": "active",
          "mana_cost": 4,
          "damage": 300,
          "effects": [
            "Disrupt All Lanes",
            "Confusion 2 Turns",
            "Terrain Transform"
          ],
          "description": "Biến đổi toàn bộ sa trường thành Bát Quái Đồ, khiến địch tự tàn sát.",
          "trigger_rate": null
        },
        {
          "id": "sk_dong_phong",
          "name": "Hô Phong Hoán Vũ",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Fire Stratagem Damage +50%"
          ],
          "description": "Tăng uy lực tối đa cho mọi chiến thuật Hỏa Công.",
          "trigger_rate": null
        },
        {
          "id": "sk_than_co_dieu_toan",
          "name": "Thần Cơ Diệu Toán",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Reveal All Enemy Intents",
            "Draw +2 Cards/Turn"
          ],
          "description": "Nhìn thấu mọi mưu đồ và dự định của đối phương.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_ngoa_long_phuong_so",
          "name": "Ngọa Long Xuất Sơn",
          "required_heroes": [
            "hero_zhaoyun"
          ],
          "bonus": {
            "command_pct": 12.0,
            "intelligence_pct": 10.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 80,
      "summon_cost_gold": null,
      "novel_first_appearance": 75
    },
    {
      "id": "hero_huangzhong",
      "name": "Hoàng Trung",
      "aliases": [
        "Huang Zhong",
        "Hoàng Hán Thăng"
      ],
      "rarity": "SSR",
      "faction": "Hoàng Thất Đại Vũ",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 93,
        "command": 86,
        "intelligence": 60,
        "politics": 52,
        "charisma": 75
      },
      "hp": 1100,
      "atk": 155,
      "troop_type": "Thần Xạ Cung Doanh",
      "cost": 6.0,
      "troop_affinity": {
        "Cung Thủ": "S",
        "Bộ Binh": "A",
        "Kỵ Binh": "B"
      },
      "equipment": [
        {
          "id": "eq_bao_dieu_cung",
          "name": "Bảo Điêu Cung",
          "type": "weapon",
          "stat_bonus": {
            "force": 8
          },
          "description": "Cung sắt hai thạch, bách bộ xuyên dương."
        }
      ],
      "skills": [
        {
          "id": "sk_bach_bo_xuyen_duong",
          "name": "Bách Bộ Xuyên Dương",
          "type": "active",
          "mana_cost": 2,
          "damage": 380,
          "effects": [
            "Snipe Commander",
            "Ignore Wall"
          ],
          "description": "Bắn thẳng vào tướng chỉ huy đối phương bỏ qua tường thành.",
          "trigger_rate": null
        },
        {
          "id": "sk_lao_duong_ich_trang",
          "name": "Lão Đương Ích Tráng",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Range +2",
            "Armor Piercing +20%"
          ],
          "description": "Càng già càng dẻo dai, tầm bắn và sát thương tăng theo số hiệp.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_nguho_hz",
          "name": "Ngũ Hổ Tướng",
          "required_heroes": [
            "hero_guanyu",
            "hero_zhaoyun"
          ],
          "bonus": {
            "atk_pct": 10.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 70,
      "summon_cost_gold": null,
      "novel_first_appearance": 65
    },
    {
      "id": "hero_weiyan",
      "name": "Ngụy Diên",
      "aliases": [
        "Wei Yan",
        "Ngụy Văn Trường"
      ],
      "rarity": "SR",
      "faction": "Trung Lập",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 89,
        "command": 82,
        "intelligence": 69,
        "politics": 45,
        "charisma": 40
      },
      "hp": 1150,
      "atk": 135,
      "troop_type": "Tý Ngọ Đột Kích Kỵ",
      "cost": 5.0,
      "troop_affinity": {
        "Kỵ Binh": "A",
        "Bộ Binh": "S",
        "Cung Thủ": "B"
      },
      "equipment": [
        {
          "id": "eq_cuong_cot_dao",
          "name": "Cuồng Cốt Đại Đao",
          "type": "weapon",
          "stat_bonus": {
            "force": 6
          },
          "description": "Đao chém hung hiểm, chuyên đánh tập kích bất ngờ."
        }
      ],
      "skills": [
        {
          "id": "sk_ty_ngo_ky_muu",
          "name": "Tý Ngọ Cốc Kỳ Mưu",
          "type": "active",
          "mana_cost": 2,
          "damage": 280,
          "effects": [
            "Flank Attack",
            "Direct Rearguard"
          ],
          "description": "Tập kích tập hậu quân địch gây rối loạn hàng ngũ.",
          "trigger_rate": null
        },
        {
          "id": "sk_cuong_cot",
          "name": "Cuồng Cốt Huyết Chiến",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Life Steal 20%"
          ],
          "description": "Hút sinh lực đối phương qua từng đòn chém.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 65,
      "summon_cost_gold": null,
      "novel_first_appearance": 60
    },
    {
      "id": "hero_zhouyu",
      "name": "Chu Du",
      "aliases": [
        "Zhou Yu",
        "Chu Công Cẩn",
        "Mỹ Chu Lang"
      ],
      "rarity": "SSR",
      "faction": "Giang Đông",
      "realm": "Hoàng Cảnh Đỉnh Phong",
      "base_stats": {
        "force": 71,
        "command": 96,
        "intelligence": 96,
        "politics": 86,
        "charisma": 94
      },
      "hp": 1050,
      "atk": 120,
      "troop_type": "Giang Đông Thủy Doanh",
      "cost": 7.0,
      "troop_affinity": {
        "Thủy Quân": "S",
        "Cung Thủ": "S",
        "Bộ Binh": "A",
        "Kỵ Binh": "C"
      },
      "equipment": [
        {
          "id": "eq_co_dinh_kiem",
          "name": "Cổ Đĩnh Kiếm",
          "type": "weapon",
          "stat_bonus": {
            "command": 8,
            "intelligence": 5
          },
          "description": "Bảo kiếm truyền đời trấn giữ Trường Giang."
        }
      ],
      "skills": [
        {
          "id": "sk_hoa_thieu_xich_bich",
          "name": "Hỏa Thiêu Xích Bích",
          "type": "active",
          "mana_cost": 3,
          "damage": 350,
          "effects": [
            "AoE Burn All Lanes",
            "Armor Melt"
          ],
          "description": "Phóng hỏa toàn bộ chiến trường thiêu rụi chiến thuyền và thiết giáp.",
          "trigger_rate": null
        },
        {
          "id": "sk_anh_tu",
          "name": "Anh Tư Táo Phát",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Speed Priority +1",
            "Morale Boost"
          ],
          "description": "Luôn được ra đòn trước tiên trong mỗi hiệp.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_giangdong_songbich",
          "name": "Giang Đông Song Bích",
          "required_heroes": [
            "hero_sunce"
          ],
          "bonus": {
            "command_pct": 15.0,
            "atk_pct": 10.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 90,
      "summon_cost_gold": null,
      "novel_first_appearance": 85
    },
    {
      "id": "hero_sunce",
      "name": "Tôn Sách",
      "aliases": [
        "Sun Ce",
        "Tôn Bá Phù",
        "Tiểu Bá Vương"
      ],
      "rarity": "SSR",
      "faction": "Giang Đông",
      "realm": "Hoàng Cảnh Cao Kỳ",
      "base_stats": {
        "force": 92,
        "command": 92,
        "intelligence": 69,
        "politics": 70,
        "charisma": 92
      },
      "hp": 1250,
      "atk": 150,
      "troop_type": "Giang Đông Hổ Báo Kỵ",
      "cost": 6.5,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Thủy Quân": "S",
        "Bộ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_ba_vuong_thuong",
          "name": "Bá Vương Kích",
          "type": "weapon",
          "stat_bonus": {
            "force": 8
          },
          "description": "Vũ khí mô phỏng Hạng Vũ xé toạc chiến tuyến."
        }
      ],
      "skills": [
        {
          "id": "sk_ba_vuong_tra_tran",
          "name": "Bá Vương Tảo Lục Hợp",
          "type": "active",
          "mana_cost": 2,
          "damage": 320,
          "effects": [
            "Knockback",
            "Cleave Left-Right"
          ],
          "description": "Quét kích đập văng tiền tuyến địch sang hai bên làn.",
          "trigger_rate": null
        },
        {
          "id": "sk_hung_ba_giang_dong",
          "name": "Hùng Bá Giang Đông",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "ATK +15% per defeated enemy"
          ],
          "description": "Mỗi khi tiêu diệt một đạo quân, sức mạnh lại tăng vọt.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_songbich_sc",
          "name": "Giang Đông Song Bích",
          "required_heroes": [
            "hero_zhouyu"
          ],
          "bonus": {
            "force_pct": 10.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 90,
      "summon_cost_gold": null,
      "novel_first_appearance": 85
    },
    {
      "id": "hero_luxun",
      "name": "Lục Tốn",
      "aliases": [
        "Lu Xun",
        "Lục Bá Ngôn"
      ],
      "rarity": "SSR",
      "faction": "Giang Đông",
      "realm": "Hoàng Cảnh Trung Kỳ",
      "base_stats": {
        "force": 69,
        "command": 94,
        "intelligence": 95,
        "politics": 87,
        "charisma": 90
      },
      "hp": 1000,
      "atk": 115,
      "troop_type": "Giang Đông Phong Hỏa Vệ",
      "cost": 6.5,
      "troop_affinity": {
        "Thủy Quân": "S",
        "Bộ Binh": "S",
        "Cung Thủ": "A"
      },
      "equipment": [
        {
          "id": "eq_phong_hoa_kiem",
          "name": "Phong Hỏa Kiếm",
          "type": "weapon",
          "stat_bonus": {
            "intelligence": 8
          },
          "description": "Kiếm dẫn hỏa thiêu đốt doanh trại địch liên hoàn."
        }
      ],
      "skills": [
        {
          "id": "sk_hoa_thieu_lien_doanh",
          "name": "Hỏa Thiêu Liên Doanh",
          "type": "active",
          "mana_cost": 3,
          "damage": 330,
          "effects": [
            "Chain Burn",
            "Destroy Camp"
          ],
          "description": "Ngọn lửa lây lan từ đơn vị này sang đơn vị khác mỗi hiệp.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 110,
      "summon_cost_gold": null,
      "novel_first_appearance": 105
    },
    {
      "id": "hero_ganning",
      "name": "Cam Ninh",
      "aliases": [
        "Gan Ning",
        "Cam Hưng Bá",
        "Cẩm Phàm Tặc"
      ],
      "rarity": "SR",
      "faction": "Giang Đông",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 94,
        "command": 86,
        "intelligence": 76,
        "politics": 18,
        "charisma": 58
      },
      "hp": 1200,
      "atk": 145,
      "troop_type": "Cẩm Phàm Thủy Đạo",
      "cost": 5.5,
      "troop_affinity": {
        "Thủy Quân": "S",
        "Bộ Binh": "A",
        "Kỵ Binh": "B"
      },
      "equipment": [
        {
          "id": "eq_cam_pham_linh",
          "name": "Cẩm Phàm Linh Đao",
          "type": "weapon",
          "stat_bonus": {
            "force": 7
          },
          "description": "Đao đeo chuông đồng lục lạc vang danh sông hồ."
        }
      ],
      "skills": [
        {
          "id": "sk_bach_ky_cuop_trai",
          "name": "Bách Kỵ Kiếp Tào Doanh",
          "type": "active",
          "mana_cost": 2,
          "damage": 300,
          "effects": [
            "Stealth Strike",
            "Morale Drop -30"
          ],
          "description": "Trăm kỵ đột kích ban đêm làm náo loạn đại bản doanh địch.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 95,
      "summon_cost_gold": null,
      "novel_first_appearance": 90
    },
    {
      "id": "hero_taishici",
      "name": "Thái Sử Từ",
      "aliases": [
        "Taishi Ci",
        "Thái Sử Tử Nghĩa"
      ],
      "rarity": "SR",
      "faction": "Giang Đông",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 93,
        "command": 82,
        "intelligence": 66,
        "politics": 58,
        "charisma": 78
      },
      "hp": 1180,
      "atk": 140,
      "troop_type": "Giang Đông Cung Kỵ",
      "cost": 5.5,
      "troop_affinity": {
        "Cung Thủ": "S",
        "Kỵ Binh": "A",
        "Bộ Binh": "B"
      },
      "equipment": [
        {
          "id": "eq_song_kich",
          "name": "Đoản Kích Song Hành",
          "type": "weapon",
          "stat_bonus": {
            "force": 6
          },
          "description": "Cặp kích ngắn thiện xạ cận chiến."
        }
      ],
      "skills": [
        {
          "id": "sk_tien_vo_hu_phat",
          "name": "Tiễn Vô Hư Phát",
          "type": "active",
          "mana_cost": 2,
          "damage": 260,
          "effects": [
            "Double Shot",
            "Target 2 Units"
          ],
          "description": "Bắn hai mũi tên cùng lúc vào hai đơn vị địch khác nhau.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 95,
      "summon_cost_gold": null,
      "novel_first_appearance": 90
    },
    {
      "id": "hero_xuchu",
      "name": "Hứa Chử",
      "aliases": [
        "Xu Chu",
        "Hứa Trọng Khang",
        "Hổ Si"
      ],
      "rarity": "SSR",
      "faction": "Trung Lập",
      "realm": "Hoàng Cảnh Trung Kỳ",
      "base_stats": {
        "force": 98,
        "command": 65,
        "intelligence": 36,
        "politics": 20,
        "charisma": 56
      },
      "hp": 1450,
      "atk": 160,
      "troop_type": "Hổ Vệ Doanh",
      "cost": 6.5,
      "troop_affinity": {
        "Bộ Binh": "S",
        "Kỵ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_thiet_chuy",
          "name": "Bát Giác Đại Thiết Chùy",
          "type": "weapon",
          "stat_bonus": {
            "force": 10
          },
          "description": "Chùy sắt khổng lồ quật ngã chiến mã."
        }
      ],
      "skills": [
        {
          "id": "sk_khoa_ma_huyet_chien",
          "name": "Khỏa Mã Quyết Đấu",
          "type": "active",
          "mana_cost": 2,
          "damage": 400,
          "effects": [
            "Duel Lock",
            "Self Armor -10%",
            "Damage +30%"
          ],
          "description": "Cởi giáp xông vào một mất một còn với chủ tướng địch.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_ho_ve_song_sat",
          "name": "Hổ Vệ Song Dũng",
          "required_heroes": [
            "hero_dianwei"
          ],
          "bonus": {
            "hp_pct": 20.0,
            "force_pct": 10.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 35,
      "summon_cost_gold": null,
      "novel_first_appearance": 30
    },
    {
      "id": "hero_xiahoudun",
      "name": "Hạ Hầu Đôn",
      "aliases": [
        "Xiahou Dun",
        "Hạ Hầu Nguyên Nhượng",
        "Manh Hạ Hầu"
      ],
      "rarity": "SSR",
      "faction": "Trung Lập",
      "realm": "Hoàng Cảnh Sơ Kỳ",
      "base_stats": {
        "force": 90,
        "command": 89,
        "intelligence": 58,
        "politics": 70,
        "charisma": 80
      },
      "hp": 1350,
      "atk": 138,
      "troop_type": "Hổ Báo Kỵ Tiên Phong",
      "cost": 6.0,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Bộ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_pha_quan_dao",
          "name": "Phá Quân Đại Đao",
          "type": "weapon",
          "stat_bonus": {
            "force": 8
          },
          "description": "Đao chém kiên định không lùi bước."
        }
      ],
      "skills": [
        {
          "id": "sk_nuot_con_nguoi",
          "name": "Bạt Tiễn Thực Nhãn",
          "type": "active",
          "mana_cost": 2,
          "damage": 280,
          "effects": [
            "Taunt All",
            "Reflect 30% Damage"
          ],
          "description": "Rút tên nuốt con ngươi, gầm thét hút toàn bộ hỏa lực địch.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 45,
      "summon_cost_gold": null,
      "novel_first_appearance": 40
    },
    {
      "id": "hero_zhanghe",
      "name": "Trương Cáp",
      "aliases": [
        "Zhang He",
        "Trương Tuấn Nghệ"
      ],
      "rarity": "SR",
      "faction": "Trung Lập",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 89,
        "command": 90,
        "intelligence": 74,
        "politics": 57,
        "charisma": 71
      },
      "hp": 1200,
      "atk": 132,
      "troop_type": "Đại Vũ Cấm Vệ Doanh",
      "cost": 5.5,
      "troop_affinity": {
        "Bộ Binh": "S",
        "Kỵ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_xao_bien_thuong",
          "name": "Xảo Biến Thiết Thương",
          "type": "weapon",
          "stat_bonus": {
            "command": 6
          },
          "description": "Thương pháp linh hoạt ứng biến theo địa hình."
        }
      ],
      "skills": [
        {
          "id": "sk_xao_bien_tran_the",
          "name": "Xảo Biến Lâm Trận",
          "type": "active",
          "mana_cost": 2,
          "damage": 220,
          "effects": [
            "Dodge Next Attack",
            "Terrain Mastery"
          ],
          "description": "Nhìn thấu cạm bẫy địa hình để né tránh đòn công hiểm.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 50,
      "summon_cost_gold": null,
      "novel_first_appearance": 45
    },
    {
      "id": "hero_simayi",
      "name": "Tư Mã Ý",
      "aliases": [
        "Sima Yi",
        "Tư Mã Trọng Đạt",
        "Trủng Hổ"
      ],
      "rarity": "SSR",
      "faction": "Trung Lập",
      "realm": "Hoàng Cảnh Đỉnh Phong",
      "base_stats": {
        "force": 63,
        "command": 98,
        "intelligence": 98,
        "politics": 93,
        "charisma": 88
      },
      "hp": 1150,
      "atk": 105,
      "troop_type": "U Minh Trủng Hổ Vệ",
      "cost": 7.0,
      "troop_affinity": {
        "Bộ Binh": "S",
        "Cung Thủ": "S",
        "Kỵ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_trung_ho_kiem",
          "name": "Trủng Hổ Hàn Kiếm",
          "type": "weapon",
          "stat_bonus": {
            "intelligence": 10,
            "command": 8
          },
          "description": "Kiếm sắc giấu trong vỏ, chờ thời cơ đoạt thiên hạ."
        }
      ],
      "skills": [
        {
          "id": "sk_ung_thi_lang_co",
          "name": "Ưng Thị Lang Cố",
          "type": "active",
          "mana_cost": 3,
          "damage": 300,
          "effects": [
            "Drain Mana 2",
            "Silence 1 Turn"
          ],
          "description": "Ánh mắt lang sói phong tỏa chiêu thức của toàn bộ đối phương.",
          "trigger_rate": null
        },
        {
          "id": "sk_nhan_nhuc_phu_trong",
          "name": "Ẩn Nhẫn Đợi Thời",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Armor +40% when Defending"
          ],
          "description": "Phòng thủ kiên cố như bàn thạch không thể công phá.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 100,
      "summon_cost_gold": null,
      "novel_first_appearance": 95
    },
    {
      "id": "hero_lubu",
      "name": "Lữ Bố",
      "aliases": [
        "Lu Bu",
        "Lữ Phụng Tiên",
        "Vô Song Chiến Thần",
        "Phi Tướng"
      ],
      "rarity": "UR",
      "faction": "Trung Lập",
      "realm": "Đế Cảnh",
      "base_stats": {
        "force": 100,
        "command": 87,
        "intelligence": 26,
        "politics": 13,
        "charisma": 40
      },
      "hp": 1600,
      "atk": 200,
      "troop_type": "Tinh Châu Thiết Kỵ",
      "cost": 7.5,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Cung Thủ": "S",
        "Bộ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_phuong_thien",
          "name": "Phương Thiên Họa Kích",
          "type": "weapon",
          "stat_bonus": {
            "force": 15
          },
          "description": "Chiến kích thần thánh vô song trảm vạn quân."
        },
        {
          "id": "eq_xichtho_lubu",
          "name": "Xích Thố Thần Mã",
          "type": "mount",
          "stat_bonus": {
            "force": 5,
            "command": 5
          },
          "description": "Nhân trung Lữ Bố, mã trung Xích Thố."
        }
      ],
      "skills": [
        {
          "id": "sk_vo_song_loan_vu",
          "name": "Vô Song Loạn Vũ",
          "type": "active",
          "mana_cost": 4,
          "damage": 600,
          "effects": [
            "Attack All Units Across 3 Lanes",
            "Armor Ignore 50%"
          ],
          "description": "Múa kích cuồng bạo hủy diệt toàn bộ quân địch trên cả 3 làn.",
          "trigger_rate": null
        },
        {
          "id": "sk_chien_than",
          "name": "Thiên Hạ Vô Song",
          "type": "passive",
          "mana_cost": 0,
          "damage": 0,
          "effects": [
            "Immune to All Control"
          ],
          "description": "Miễn nhiễm mọi hiệu ứng khống chế, câm lặng và choáng.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_anh_hung_my_nhan",
          "name": "Anh Hùng Mỹ Nhân",
          "required_heroes": [
            "hero_diaochan"
          ],
          "bonus": {
            "atk_pct": 25.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 80,
      "summon_cost_gold": null,
      "novel_first_appearance": 70
    },
    {
      "id": "hero_huaxiong",
      "name": "Hoa Hùng",
      "aliases": [
        "Hua Xiong"
      ],
      "rarity": "SR",
      "faction": "Tây Lăng",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 90,
        "command": 80,
        "intelligence": 40,
        "politics": 25,
        "charisma": 50
      },
      "hp": 1250,
      "atk": 138,
      "troop_type": "Tây Lăng Cuồng Đao",
      "cost": 5.0,
      "troop_affinity": {
        "Kỵ Binh": "A",
        "Bộ Binh": "S"
      },
      "equipment": [
        {
          "id": "eq_tram_ma_dao",
          "name": "Trảm Mã Đại Đao",
          "type": "weapon",
          "stat_bonus": {
            "force": 6
          },
          "description": "Đao bản rộng chuyên phạt bộ binh và ngựa chiến."
        }
      ],
      "skills": [
        {
          "id": "sk_tram_tuong_truoc_tran",
          "name": "Trảm Tướng Trừ Trấn",
          "type": "active",
          "mana_cost": 2,
          "damage": 290,
          "effects": [
            "Execute Low HP Unit"
          ],
          "description": "Chém đứt đầu tướng địch có lượng máu dưới 20%.",
          "trigger_rate": null
        }
      ],
      "bonds": [],
      "summon_chapter": 25,
      "summon_cost_gold": null,
      "novel_first_appearance": 20
    },
    {
      "id": "hero_yanliang",
      "name": "Nhan Lương",
      "aliases": [
        "Yan Liang"
      ],
      "rarity": "SR",
      "faction": "Bắc Cương",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 93,
        "command": 83,
        "intelligence": 42,
        "politics": 30,
        "charisma": 52
      },
      "hp": 1280,
      "atk": 142,
      "troop_type": "Bắc Cương Thiết Kỵ",
      "cost": 5.5,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Bộ Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_khai_son_dao",
          "name": "Khai Sơn Đại Phủ",
          "type": "weapon",
          "stat_bonus": {
            "force": 7
          },
          "description": "Rìu lớn chém nát khiên đồng."
        }
      ],
      "skills": [
        {
          "id": "sk_dung_quan_tam_quan",
          "name": "Dũng Quán Tam Quân",
          "type": "active",
          "mana_cost": 2,
          "damage": 310,
          "effects": [
            "Shield Break"
          ],
          "description": "Đánh sập toàn bộ lá chắn phòng ngự của kẻ địch.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_ha_bac_song_dung",
          "name": "Hà Bắc Song Dũng",
          "required_heroes": [
            "hero_wenchou"
          ],
          "bonus": {
            "force_pct": 12.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 40,
      "summon_cost_gold": null,
      "novel_first_appearance": 35
    },
    {
      "id": "hero_wenchou",
      "name": "Văn Xú",
      "aliases": [
        "Wen Chou"
      ],
      "rarity": "SR",
      "faction": "Bắc Cương",
      "realm": "Vương Cảnh",
      "base_stats": {
        "force": 92,
        "command": 81,
        "intelligence": 35,
        "politics": 24,
        "charisma": 48
      },
      "hp": 1260,
      "atk": 140,
      "troop_type": "Bắc Cương Kỵ Xạ",
      "cost": 5.5,
      "troop_affinity": {
        "Kỵ Binh": "S",
        "Cung Thủ": "A"
      },
      "equipment": [
        {
          "id": "eq_xa_thiet_thuong",
          "name": "Xà Mâu Thiết Thương",
          "type": "weapon",
          "stat_bonus": {
            "force": 6
          },
          "description": "Ngọn giáo dài nhọn hoắt xông trận."
        }
      ],
      "skills": [
        {
          "id": "sk_hung_ma_xung_kich",
          "name": "Hung Mã Xung Trận",
          "type": "active",
          "mana_cost": 2,
          "damage": 290,
          "effects": [
            "Stun Front Target"
          ],
          "description": "Thúc ngựa húc bay kẻ chắn đường gây choáng.",
          "trigger_rate": null
        }
      ],
      "bonds": [
        {
          "id": "bnd_ha_bac_song_dung_wc",
          "name": "Hà Bắc Song Dũng",
          "required_heroes": [
            "hero_yanliang"
          ],
          "bonus": {
            "force_pct": 12.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 40,
      "summon_cost_gold": null,
      "novel_first_appearance": 35
    }
  ],
  "cards": [
    {
      "id": "c_bach_ma",
      "name": "Bạch Mã Xung Phong",
      "type": "unit",
      "rarity": "SR",
      "mana_cost": 3,
      "damage": 50,
      "shield": 0,
      "heal": 0,
      "target": "lane",
      "effects": [],
      "description": "Bạch Mã Nghĩa Tòng xung phong.",
      "unlock_chapter": 5,
      "hero_required": "hero_zhaoyun"
    },
    {
      "id": "c_ham_tran",
      "name": "Hãm Trận Doanh",
      "type": "unit",
      "rarity": "SR",
      "mana_cost": 4,
      "damage": 60,
      "shield": 20,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Break shield"
      ],
      "description": "Lực lượng tử sĩ.",
      "unlock_chapter": 20,
      "hero_required": "hero_gaoshun"
    },
    {
      "id": "c_cung_thu",
      "name": "Cung Thủ Thủ Thành",
      "type": "unit",
      "rarity": "R",
      "mana_cost": 2,
      "damage": 30,
      "shield": 0,
      "heal": 0,
      "target": "single",
      "effects": [],
      "description": "Cung thủ bảo vệ thành.",
      "unlock_chapter": 1
    },
    {
      "id": "c_thiet_ky",
      "name": "Thiết Kỵ Đột Kích",
      "type": "unit",
      "rarity": "SR",
      "mana_cost": 4,
      "damage": 70,
      "shield": 0,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Charge"
      ],
      "description": "Kỵ binh xung phong.",
      "unlock_chapter": 15
    },
    {
      "id": "c_bo_binh",
      "name": "Bộ Binh Trường Thương",
      "type": "unit",
      "rarity": "R",
      "mana_cost": 2,
      "damage": 25,
      "shield": 10,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Anti-Cavalry"
      ],
      "description": "Lính cầm giáo.",
      "unlock_chapter": 1
    },
    {
      "id": "c_that_tham",
      "name": "Thất Thám Bàn Xà",
      "type": "tactic",
      "rarity": "SSR",
      "mana_cost": 5,
      "damage": 120,
      "shield": 0,
      "heal": 0,
      "target": "single",
      "effects": [
        "Combo"
      ],
      "description": "Kỹ năng đặc trưng của Triệu Vân.",
      "unlock_chapter": 5,
      "hero_required": "hero_zhaoyun"
    },
    {
      "id": "c_bao_liet",
      "name": "Bạo Liệt Đao Pháp",
      "type": "tactic",
      "rarity": "SR",
      "mana_cost": 3,
      "damage": 80,
      "shield": 0,
      "heal": 0,
      "target": "single",
      "effects": [
        "Bleed"
      ],
      "description": "Chém mạnh.",
      "unlock_chapter": 10
    },
    {
      "id": "c_hoa_cong",
      "name": "Hỏa Công Liên Hoàn",
      "type": "tactic",
      "rarity": "SSR",
      "mana_cost": 6,
      "damage": 100,
      "shield": 0,
      "heal": 0,
      "target": "all_enemies",
      "effects": [
        "Burn"
      ],
      "description": "Đốt cháy địch.",
      "unlock_chapter": 27
    },
    {
      "id": "c_phuc_binh",
      "name": "Phục Binh",
      "type": "tactic",
      "rarity": "R",
      "mana_cost": 2,
      "damage": 0,
      "shield": 0,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Ambush"
      ],
      "description": "Tạo phục binh.",
      "unlock_chapter": 8
    },
    {
      "id": "c_xa_lu",
      "name": "Xả Lũ Thanh Thủy",
      "type": "stratagem",
      "rarity": "SSR",
      "mana_cost": 5,
      "damage": 150,
      "shield": 0,
      "heal": 0,
      "target": "all_enemies",
      "effects": [
        "Wet",
        "Slow"
      ],
      "description": "Kế thủy công.",
      "unlock_chapter": 35
    },
    {
      "id": "c_noi_ung",
      "name": "Nội Ứng Khai Môn",
      "type": "stratagem",
      "rarity": "SR",
      "mana_cost": 4,
      "damage": 0,
      "shield": 0,
      "heal": 0,
      "target": "wall",
      "effects": [
        "Reduce defense"
      ],
      "description": "Nội gián mở cửa thành.",
      "unlock_chapter": 20
    },
    {
      "id": "c_ly_gian",
      "name": "Ly Gián Kế",
      "type": "stratagem",
      "rarity": "SSR",
      "mana_cost": 4,
      "damage": 0,
      "shield": 0,
      "heal": 0,
      "target": "single",
      "effects": [
        "Betray"
      ],
      "description": "Làm địch tự đánh nhau.",
      "unlock_chapter": 25,
      "hero_required": "hero_diaochan"
    },
    {
      "id": "c_long_dam",
      "name": "Long Đảm Lượng Ngân Thương",
      "type": "equipment",
      "rarity": "SSR",
      "mana_cost": 3,
      "damage": 0,
      "shield": 0,
      "heal": 0,
      "target": "ally",
      "effects": [
        "+ATK",
        "+Pierce"
      ],
      "description": "Vũ khí của Triệu Vân.",
      "unlock_chapter": 5
    },
    {
      "id": "c_bach_ngan",
      "name": "Bạch Ngân Giáp",
      "type": "equipment",
      "rarity": "SR",
      "mana_cost": 2,
      "damage": 0,
      "shield": 50,
      "heal": 0,
      "target": "ally",
      "effects": [
        "+DEF"
      ],
      "description": "Áo giáp sáng loáng.",
      "unlock_chapter": 5
    },
    {
      "id": "c_tuong_thanh",
      "name": "Tường Thành Cao Lâm",
      "type": "terrain",
      "rarity": "R",
      "mana_cost": 3,
      "damage": 0,
      "shield": 100,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Fortify"
      ],
      "description": "Dựng tường bảo vệ.",
      "unlock_chapter": 1
    }
  ],
  "battles": [
    {
      "id": "battle_ch10_assassin",
      "name": "Thích khách Phò Mã Phủ",
      "chapter": 10,
      "type": "defense",
      "difficulty": 3,
      "player_wall_hp": 200,
      "enemy_units": [
        {
          "id": "eu_assassin_1",
          "name": "Sát thủ 1",
          "hp": 100,
          "atk": 20,
          "lane": "left",
          "intent_pattern": [
            "attack",
            "attack"
          ]
        },
        {
          "id": "eu_assassin_2",
          "name": "Sát thủ 2",
          "hp": 100,
          "atk": 20,
          "lane": "center",
          "intent_pattern": [
            "attack",
            "attack"
          ]
        },
        {
          "id": "eu_assassin_3",
          "name": "Sát thủ 3",
          "hp": 120,
          "atk": 25,
          "lane": "right",
          "intent_pattern": [
            "buff",
            "attack"
          ]
        }
      ],
      "victory_conditions": [
        "Tiêu diệt tất cả địch"
      ],
      "rewards": {
        "gold": 100
      },
      "unlocks": []
    },
    {
      "id": "battle_ch48_thanh_chau",
      "name": "Đại chiến Thanh Châu",
      "chapter": 48,
      "type": "defense",
      "difficulty": 8,
      "player_wall_hp": 500,
      "enemy_units": [
        {
          "id": "eu_dich_hoa",
          "name": "Boss Địch Hỏa",
          "hp": 1000,
          "atk": 80,
          "lane": "center",
          "intent_pattern": [
            "aoe",
            "attack",
            "buff"
          ]
        },
        {
          "id": "eu_soldier_1",
          "name": "Lính 1",
          "hp": 200,
          "atk": 30,
          "lane": "left",
          "intent_pattern": [
            "attack"
          ]
        },
        {
          "id": "eu_soldier_2",
          "name": "Lính 2",
          "hp": 200,
          "atk": 30,
          "lane": "right",
          "intent_pattern": [
            "attack"
          ]
        },
        {
          "id": "eu_soldier_3",
          "name": "Lính 3",
          "hp": 200,
          "atk": 30,
          "lane": "left",
          "intent_pattern": [
            "attack"
          ]
        },
        {
          "id": "eu_soldier_4",
          "name": "Lính 4",
          "hp": 200,
          "atk": 30,
          "lane": "right",
          "intent_pattern": [
            "attack"
          ]
        }
      ],
      "victory_conditions": [
        "Phòng thủ 10 hiệp hoặc Tiêu diệt Boss Địch Hỏa"
      ],
      "rewards": {
        "gold": 1000,
        "honor": 500
      },
      "unlocks": [
        "feature_thanh_chau"
      ]
    },
    {
      "id": "battle_ch27_gia_hu",
      "name": "Phục kích Giả Hủ",
      "chapter": 27,
      "type": "field",
      "difficulty": 5,
      "enemy_units": [
        {
          "id": "eu_ambush_1",
          "name": "Phục binh 1",
          "hp": 300,
          "atk": 40,
          "lane": "left",
          "intent_pattern": [
            "attack",
            "defend"
          ]
        },
        {
          "id": "eu_ambush_2",
          "name": "Phục binh 2",
          "hp": 300,
          "atk": 40,
          "lane": "right",
          "intent_pattern": [
            "attack",
            "defend"
          ]
        },
        {
          "id": "eu_ambush_3",
          "name": "Phục binh 3",
          "hp": 300,
          "atk": 40,
          "lane": "center",
          "intent_pattern": [
            "attack",
            "defend"
          ]
        },
        {
          "id": "eu_ambush_4",
          "name": "Phục binh tinh nhuệ",
          "hp": 500,
          "atk": 50,
          "lane": "center",
          "intent_pattern": [
            "attack",
            "skill"
          ]
        }
      ],
      "victory_conditions": [
        "Sống sót sau 5 hiệp"
      ],
      "rewards": {
        "gold": 500
      },
      "unlocks": [
        "feature_bai_tuong_dai_gia_hu"
      ]
    }
  ],
  "milestones": [
    {
      "chapter": 1,
      "title": "Xuyên Không",
      "scene_name": "Phò Mã Phủ",
      "unlocks": [
        "feature_basic_battle"
      ],
      "rewards": {},
      "narrative_summary": "Bắt đầu cuộc hành trình.",
      "prerequisites": []
    },
    {
      "chapter": 5,
      "title": "Bái Tướng Đài",
      "scene_name": "Bái Tướng Đài",
      "unlocks": [
        "feature_gacha"
      ],
      "rewards": {},
      "narrative_summary": "Chiêu mộ Triệu Vân.",
      "prerequisites": [
        1
      ]
    },
    {
      "chapter": 10,
      "title": "Ám Sát",
      "scene_name": "Phò Mã Phủ",
      "unlocks": [
        "feature_defense"
      ],
      "rewards": {},
      "narrative_summary": "Chống lại sát thủ.",
      "prerequisites": [
        5
      ]
    },
    {
      "chapter": 15,
      "title": "Điển Vi",
      "scene_name": "Doanh Trại",
      "unlocks": [
        "feature_barracks"
      ],
      "rewards": {},
      "narrative_summary": "Thu phục Điển Vi.",
      "prerequisites": [
        10
      ]
    },
    {
      "chapter": 20,
      "title": "Cao Thuận",
      "scene_name": "Biên Cương",
      "unlocks": [
        "feature_border"
      ],
      "rewards": {},
      "narrative_summary": "Gặp gỡ Cao Thuận.",
      "prerequisites": [
        15
      ]
    },
    {
      "chapter": 27,
      "title": "Độc Sĩ",
      "scene_name": "Mưu Khách Phủ",
      "unlocks": [
        "feature_strategy"
      ],
      "rewards": {},
      "narrative_summary": "Giả Hủ hiến kế.",
      "prerequisites": [
        20
      ]
    },
    {
      "chapter": 35,
      "title": "Thủy Công",
      "scene_name": "Bờ Sông",
      "unlocks": [
        "feature_naval"
      ],
      "rewards": {},
      "narrative_summary": "Trận chiến trên sông.",
      "prerequisites": [
        27
      ]
    },
    {
      "chapter": 48,
      "title": "Đại Chiến",
      "scene_name": "Thanh Châu",
      "unlocks": [
        "feature_thanh_chau"
      ],
      "rewards": {},
      "narrative_summary": "Chiến đấu sinh tử ở Thanh Châu.",
      "prerequisites": [
        35
      ]
    },
    {
      "chapter": 53,
      "title": "Kỷ Nguyên Mới",
      "scene_name": "Kinh Đô",
      "unlocks": [],
      "rewards": {},
      "narrative_summary": "Chương mới bắt đầu. (Tới 386)",
      "prerequisites": [
        48
      ]
    }
  ],
  "economy": {
    "currencies": [
      {
        "id": "gold",
        "name": "Vàng (Ngân Lượng)",
        "description": "Tiền tệ lưu thông chính, dùng nâng cấp thẻ bài, đúc khí giới và chi trả bổng lộc quân sĩ."
      },
      {
        "id": "jade",
        "name": "Ngọc Tỷ (Kim Bảo)",
        "description": "Bảo ngọc cao cấp thu được từ đại tiệc triều đình và chiến công hiển hách, dùng triệu hoán tại Bái Tướng Đài."
      },
      {
        "id": "rations",
        "name": "Lương Thảo",
        "description": "Quân lương vạn thạch đảm bảo sĩ khí và năng lực hành quân sa trường của các đạo quân."
      },
      {
        "id": "honor",
        "name": "Anh Hồn Lệnh",
        "description": "Tín vật thần bí chứa đựng linh hồn danh tướng thời Tam Quốc."
      }
    ],
    "faucets": [
      {
        "chapter": 1,
        "source": "Vũ Hoàng ban thưởng đối thơ",
        "amount": 100,
        "currency_id": "gold"
      },
      {
        "chapter": 1,
        "source": "Kích hoạt Hệ Thống Tam Quốc",
        "amount": 1,
        "currency_id": "honor"
      },
      {
        "chapter": 5,
        "source": "Mở khóa Bái Tướng Đài",
        "amount": 200,
        "currency_id": "gold"
      },
      {
        "chapter": 5,
        "source": "Kỳ ngộ mật thất",
        "amount": 10,
        "currency_id": "jade"
      },
      {
        "chapter": 8,
        "source": "Kinh doanh Thấu Hoa Cao",
        "amount": 3000,
        "currency_id": "gold"
      },
      {
        "chapter": 15,
        "source": "Vũ Hoàng ban bạc Bắc Chinh",
        "amount": 5000,
        "currency_id": "gold"
      },
      {
        "chapter": 15,
        "source": "Thánh chỉ sắc phong",
        "amount": 20,
        "currency_id": "jade"
      },
      {
        "chapter": 27,
        "source": "Tịch thu chiến lợi phẩm Nam Ly",
        "amount": 20000,
        "currency_id": "gold"
      },
      {
        "chapter": 43,
        "source": "Thu mua tích trữ quân lương",
        "amount": 50000,
        "currency_id": "rations"
      },
      {
        "chapter": 48,
        "source": "Đại thắng chiến dịch Thanh Châu",
        "amount": 20000,
        "currency_id": "gold"
      }
    ],
    "sinks": [
      {
        "sink_id": "summon_bai_tuong_dai",
        "cost": 160,
        "currency_id": "jade"
      },
      {
        "sink_id": "card_upgrade_basic",
        "cost": 500,
        "currency_id": "gold"
      },
      {
        "sink_id": "bribe_court_censor",
        "cost": 1500,
        "currency_id": "gold"
      },
      {
        "sink_id": "march_supply_consumption",
        "cost": 1000,
        "currency_id": "rations"
      }
    ],
    "balance": {
      "inflation_rate": 0.05,
      "max_storage": {
        "gold": 999999,
        "jade": 9999,
        "rations": 200000,
        "honor": 99
      }
    }
  },
  "gacha_banners": [
    {
      "id": "banner_1",
      "name": "Bái Tướng Đài Sơ Khai",
      "chapter": 5,
      "featured": [
        "hero_zhaoyun"
      ]
    },
    {
      "id": "banner_2",
      "name": "Độc Sĩ Giáng Lâm",
      "chapter": 27,
      "featured": [
        "hero_jiaxu"
      ]
    },
    {
      "id": "banner_3",
      "name": "Ngũ Hổ Tướng",
      "chapter": 100,
      "featured": [
        "hero_machao"
      ]
    }
  ],
  "ink_stories": {
    "ch01_15": "// ============================================================\n// Trấn Quốc Phò Mã Gia — Ink Scene Script\n// Chương 1: Xuyên Không & Đối Thơ Đại Điện\n// ============================================================\n// Biên soạn theo chuẩn Ink scripting (inkjs runtime)\n// Tham chiếu: narrative-scene-scripting skill\n// ============================================================\n\n// === GLOBAL VARIABLES ===\nVAR gold = 0\nVAR jade = 0\nVAR suspicion = 0\nVAR has_anh_hon_lenh = false\nVAR system_awakened = false\nVAR poetry_duel_won = false\nVAR imperial_prestige = 0\nVAR chapter = 1\n\n// Feature unlock flags\nVAR unlocked_gacha = false\nVAR unlocked_soap = false\nVAR unlocked_map = false\nVAR unlocked_flood = false\nVAR unlocked_granary = false\nVAR unlocked_battle = false\n\n// Affinity scores\nVAR affinity_trieu_van = 0\nVAR affinity_gia_hu = 0\nVAR affinity_dieu_thuyen = 0\n\n// NPC relationship flags\nVAR met_vu_hoang = false\nVAR met_to_kien_phong = false\nVAR met_ve_ti_vu = false\n\n// ============================================================\n// CHƯƠNG 1: XUYÊN KHÔNG & ĐỐI THƠ ĐẠI ĐIỆN\n// ============================================================\n\n=== chapter_1_start ===\n# BACKGROUND: bg_darkness\n# MUSIC: bgm_ethereal_void\n# CHAPTER_TITLE: Hồi 1 · Chương 1: Phò Mã Hàn Vi Nơm Nớp Lo Sợ\n\nHắn mở mắt.\n\nKhông phải trần nhà quen thuộc của căn hộ tầng 23 ở thành phố Hồ Chí Minh. Mà là một tấm màn lụa thêu rồng phượng, bụi thời gian phủ đầy nếp gấp.\n\nĐầu đau như búa bổ. Ký ức lạ lùng ồ ạt tràn vào — tên hắn là Quý Bình An, con trai thứ ba của Quý gia, một phò mã nổi tiếng bất tài bất đức của Đại Vũ Hoàng Triều.\n\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# ACTORS: qui_binh_an|right|worried\n\nHắn... đã xuyên không.\n\n* [Ngồi dậy, quan sát xung quanh]\n  Quý Bình An — hay nói đúng hơn, linh hồn hiện đại trong thân xác phò mã — chậm rãi ngồi dậy. Căn phòng rộng nhưng đồ đạc thưa thớt. Một bức tranh thủy mặc treo trên tường, vài cuốn sách cổ bám bụi trên giá.\n  \n  \"Phò mã hàn vi\" — danh xưng này không phải lời khen.\n  \n  -> arrival_of_servant\n\n=== arrival_of_servant ===\n# ACTORS: qui_binh_an|right|neutral, servant|left|respectful\n\nCửa phòng bật mở. Một tỳ nữ vội vã chạy vào, mặt tái mét:\n\n\"Phò mã gia! Ngài tỉnh rồi ạ! Vũ Hoàng bệ hạ triệu kiến, yến tiệc tiếp đón sứ đoàn Nam Ly Quốc sắp bắt đầu! Ngài phải vào cung ngay!\"\n\n* [Hỏi tình hình yến tiệc]\n  \"Yến tiệc? Sứ đoàn Nam Ly? Kể ta nghe.\"\n  \n  Tỳ nữ cuống quýt: \"Dạ, Nam Ly phái sứ thần đến, mang theo vế đối thách thức cả triều đình. Nghe đồn không ai đối được, Vũ Hoàng nổi giận triệu tập tất cả văn võ bá quan, kể cả... phò mã.\"\n  \n  \"Kể cả phò mã phế vật như ta?\" — Quý Bình An cười khổ.\n  \n  -> travel_to_palace\n\n* [Giả bệnh từ chối]\n  \"Ta vẫn chưa khỏe, nói với cung nhân...\"\n  \n  Tỳ nữ hoảng hốt quỳ xuống: \"Không được đâu Phò mã gia! Đây là thánh chỉ! Kháng chỉ là tội chết!\"\n  \n  ~ suspicion += 5\n  \n  Không có lựa chọn nào khác. Hắn phải đi.\n  \n  -> travel_to_palace\n\n=== travel_to_palace ===\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_imperial_procession\n\nKiệu rong ruổi qua đường phố kinh đô. Quý Bình An nhìn qua rèm kiệu — đây là một thế giới cổ đại, nhưng không hoàn toàn giống bất kỳ triều đại nào trong lịch sử Trung Hoa mà hắn biết.\n\nĐại Vũ Hoàng Triều. Một đế chế hư cấu nằm ở vị trí tương tự nhà Hán.\n\nKý ức của thân xác gốc cho hắn biết: Vũ Hoàng đa nghi, quần thần bè phái, và Quý gia đang ở thế yếu sau khi phụ thân Quý Trọng Dung bị giáng chức.\n\n\"Nếu đã xuyên không...\" — hắn lẩm bẩm — \"...thì phải sống cho ra trò.\"\n\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|right|determined\n\n-> imperial_banquet\n\n=== imperial_banquet ===\n# ACTORS: qui_binh_an|right|nervous, vu_hoang|center|stern, nam_ly_envoy|left|arrogant\n# EFFECT: screen_darken_edges\n\n~ met_vu_hoang = true\n\nĐại điện Kim Loan. Rồng chạm trổ trên cột trụ, đèn lồng đỏ treo khắp nơi.\n\nVũ Hoàng ngồi trên ngai vàng, mặt lạnh như băng. Hai bên văn võ bá quan đứng xếp hàng, không khí nặng nề.\n\nSứ thần Nam Ly — một lão già râu dài, áo gấm xanh — đứng giữa đại điện, nụ cười ngạo mạn không che giấu.\n\n\"Bệ hạ Đại Vũ, hạ thần mang theo một vế đối nhỏ. Nếu triều đình Đại Vũ không ai đối được...\"\n\nLão ta ngừng lại, ánh mắt lướt qua quần thần:\n\n\"...thì e rằng sĩ tử Đại Vũ không xứng đáng với danh xưng 'Lễ nghĩa chi bang' nữa rồi.\"\n\n-> poetry_challenge\n\n=== poetry_challenge ===\n# EFFECT: camera_shake|0.3\n# ACTORS: nam_ly_envoy|left|triumphant\n\nSứ thần Nam Ly dõng dạc đọc:\n\n\"「天当棋盘星作子，谁人敢下？」\"\n\n\"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?\"\n\n(Trời làm bàn cờ sao làm quân, ai dám đánh?)\n\n# EFFECT: sfx_crowd_murmur\n\nCả đại điện xôn xao. Quan văn nhìn nhau, lắc đầu. Quan võ im phắc.\n\nMột vế đối vừa kiêu ngạo vừa uyên bác — lấy trời đất làm bàn cờ, tinh tú làm quân cờ. Ai dám tự xưng có thể đánh cờ với trời?\n\nVũ Hoàng nhíu mày, ánh mắt quét qua triều thần. Không ai dám lên tiếng.\n\nRồi ánh mắt Vũ Hoàng dừng lại ở Quý Bình An — phò mã phế vật đứng cuối hàng.\n\n\"Quý Bình An!\"\n\n# ACTORS: qui_binh_an|right|shocked, vu_hoang|center|cold\n\n\"Ngươi cũng là người đọc sách. Đối đi.\"\n\nGiọng Vũ Hoàng không có chút kỳ vọng nào. Đây rõ ràng là một lời đẩy phò mã ra làm bia đỡ đạn.\n\n-> poetry_choice\n\n=== poetry_choice ===\n# SCENE_TYPE: choice\n\nQuý Bình An — linh hồn hiện đại với 4 năm đại học Văn và 6 năm đọc tiểu thuyết lịch sử — nhận ra ngay vế đối này.\n\nHắn biết câu trả lời. Nhưng...\n\n* [Đứng lên đối: \"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?\"]\n  -> poetry_triumph\n\n* [Đối một vế tầm thường để giấu thực lực]\n  -> poetry_mediocre\n\n* [Im lặng, cúi đầu giả ngu]\n  -> poetry_silence\n\n=== poetry_triumph ===\n# EFFECT: camera_shake|0.8\n# EFFECT: screen_flash|#FFD700|500\n# EFFECT: sfx_thunder_dramatic\n# ACTORS: qui_binh_an|right|confident, nam_ly_envoy|left|shocked\n\n~ gold += 100\n~ poetry_duel_won = true\n~ suspicion += 10\n~ imperial_prestige += 1\n\nQuý Bình An bước ra khỏi hàng, giọng trầm ấm vang vọng cả đại điện:\n\n\"「地作琵琶路作弦，盖世谁弹？」\"\n\n\"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?\"\n\n(Đất làm đàn tỳ bà đường làm dây, ai dám gảy?)\n\n# EFFECT: sfx_crowd_gasp\n\nTrời làm bàn cờ — Đất làm đàn tỳ bà.\nSao làm quân — Đường làm dây.\nAi dám đánh — Ai dám gảy.\n\nĐối thanh, đối ý, đối thế. Hoàn mỹ.\n\nSứ thần Nam Ly lùi một bước, mặt trắng bệch.\n\n# ACTORS: vu_hoang|center|surprised\n\nVũ Hoàng bật đứng dậy trên ngai: \"HAY! HAY LẮM!\"\n\n\"Trẫm không ngờ Quý gia lại có nhân tài ẩn giấu! Ban thưởng phò mã Quý Bình An — một trăm lượng hoàng kim!\"\n\n# EFFECT: show_toast|+100 Vàng|reward\n\n-> system_awakening\n\n=== poetry_mediocre ===\n# ACTORS: qui_binh_an|right|neutral, vu_hoang|center|disappointed\n\n~ suspicion -= 5\n~ gold += 10\n\nQuý Bình An lắp bắp một vế đối tàm tạm. Không xuất sắc, nhưng cũng không đến nỗi mất mặt.\n\nVũ Hoàng thở dài, vẫy tay: \"Tạm được. Ban cho phò mã mười lượng bạc.\"\n\nSứ thần Nam Ly cười mỉm — hắn không coi đây là thất bại.\n\nQuý Bình An lặng lẽ lui về cuối hàng, nhưng trong lòng có một tiếng nói lạ lùng vang lên...\n\n-> system_awakening_delayed\n\n=== poetry_silence ===\n# ACTORS: qui_binh_an|right|head_down, vu_hoang|center|contemptuous\n\n~ suspicion -= 10\n\nIm lặng. Cúi đầu. Phò mã phế vật vẫn là phế vật.\n\nVũ Hoàng lạnh lùng quay đi. Sứ thần Nam Ly cười lớn: \"Đại Vũ quả nhiên không có nhân tài!\"\n\nQuý Bình An nuốt nhục. Nhưng trong bóng tối cuối hàng, một tiếng nói kỳ lạ vang lên trong đầu hắn...\n\n-> system_awakening_delayed\n\n=== system_awakening ===\n# BACKGROUND: bg_void_golden\n# MUSIC: bgm_system_activation\n# EFFECT: screen_flash|#FFFFFF|1000\n# EFFECT: sfx_system_chime\n\n~ system_awakened = true\n~ has_anh_hon_lenh = true\n\n[HỆ THỐNG TAM QUỐC KÍCH HOẠT]\n\n⟨ Phát hiện Trí Huệ Xuyên Thời Đại ⟩\n⟨ Kích hoạt Hệ Thống Triệu Hoán Anh Linh ⟩\n⟨ Ban tặng: Anh Hồn Lệnh Sơ Cấp × 1 ⟩\n\n# EFFECT: show_toast|🎉 HỆ THỐNG KÍCH HOẠT! Nhận Anh Hồn Lệnh × 1|system\n\n\"Hệ thống... Tam Quốc?\" — Quý Bình An nghe thấy giọng nói cơ giới vang trong đầu.\n\n[HỆ THỐNG]: Ký chủ đã chứng minh trí tuệ vượt bậc. Hệ Thống Triệu Hoán Anh Linh Tam Quốc chính thức kích hoạt.\n\n[HỆ THỐNG]: Ký chủ có thể sử dụng Anh Hồn Lệnh để triệu hoán danh tướng, mưu thần, mỹ nhân từ thời Tam Quốc về phụ tá.\n\n[HỆ THỐNG]: Lưu ý — Anh linh được triệu hoán sẽ tồn tại dưới dạng thực thể vật lý, có sức mạnh và ý thức đầy đủ.\n\n* [Kiểm tra Anh Hồn Lệnh]\n  Quý Bình An nhìn xuống tay — một tấm lệnh bài cổ kính, viền vàng rực rỡ, khắc chữ \"英魂令\" (Anh Hồn Lệnh) phát ra ánh sáng ấm áp.\n  \n  [HỆ THỐNG]: Anh Hồn Lệnh Sơ Cấp có thể triệu hoán 1 Anh Linh cấp Hoàng Cảnh trở xuống. Đài chiêu mộ sẽ mở khóa khi Ký chủ đạt đủ điều kiện.\n  \n  -> chapter_1_aftermath\n\n=== system_awakening_delayed ===\n# MUSIC: bgm_mysterious\n# EFFECT: sfx_whisper\n\n~ system_awakened = true\n~ has_anh_hon_lenh = true\n\nTrong khoảnh khắc tĩnh lặng giữa đại điện ồn ào, Quý Bình An nghe thấy một giọng nói kỳ lạ — không phải từ bên ngoài, mà từ sâu trong ý thức:\n\n[HỆ THỐNG]: ...Phát hiện Linh Hồn Xuyên Không. Khởi động giao thức khẩn cấp.\n[HỆ THỐNG]: Hệ Thống Triệu Hoán Anh Linh Tam Quốc — kích hoạt ở chế độ ẩn.\n[HỆ THỐNG]: Ban tặng: Anh Hồn Lệnh Sơ Cấp × 1.\n\n# EFFECT: show_toast|🎉 HỆ THỐNG KÍCH HOẠT (Chế độ ẩn)! Nhận Anh Hồn Lệnh × 1|system\n\nHắn giật mình nhìn xuống — trong tay áo, một tấm lệnh bài phát sáng mờ nhạt xuất hiện từ hư không.\n\n-> chapter_1_aftermath\n\n=== chapter_1_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_courtyard\n# MUSIC: bgm_night_contemplation\n# ACTORS: qui_binh_an|right|thoughtful\n\n~ chapter = 1\n~ met_to_kien_phong = true\n\nĐêm khuya. Phò Mã Phủ.\n\nQuý Bình An ngồi trong sân viện, ngẩng đầu nhìn trăng. Tấm Anh Hồn Lệnh nằm trên bàn đá, phát ra ánh sáng vàng nhạt.\n\n\"Hệ thống Tam Quốc... Triệu hoán anh linh... Thế giới này thật điên rồ.\"\n\nNhưng hắn biết — nếu muốn sống, muốn bảo vệ Quý gia, muốn thoát khỏi cái danh \"phò mã phế vật\" — hắn cần sức mạnh.\n\n[HỆ THỐNG]: Ký chủ, Bái Tướng Đài (Đài Chiêu Mộ Anh Linh) sẽ mở khóa khi Ký chủ chuẩn bị đủ điều kiện. Hãy sẵn sàng.\n\n* [Kết thúc Chương 1]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 1: Xuyên Không & Đối Thơ Đại Điện|milestone\n  # EFFECT: chapter_complete|1\n  -> chapter_5_transition\n\n// ============================================================\n// CHƯƠNG 5: MẬT THẤT PHÒ MÃ PHỦ & BÁI TƯỚNG ĐÀI GACHA\n// ============================================================\n\n=== chapter_5_transition ===\n# CHAPTER_TITLE: Hồi 2 · Chương 5: Bái Tướng Đài Khai Mở\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_mystical_summoning\n\n~ chapter = 5\n\nBốn ngày trôi qua kể từ yến tiệc đại điện.\n\nQuý Bình An đã dành thời gian tìm hiểu về thế giới này — Đại Vũ Hoàng Triều, các thế lực xung quanh, và sức mạnh bí ẩn của Hệ Thống.\n\nĐêm nay, trong mật thất sâu nhất của Phò Mã Phủ, Anh Hồn Lệnh bỗng phát sáng chói lòa.\n\n[HỆ THỐNG]: Điều kiện đã đủ. Bái Tướng Đài — Khai Mở!\n\n# EFFECT: screen_flash|#FFD700|800\n# EFFECT: sfx_gong_ancient\n\n~ unlocked_gacha = true\n# EFFECT: show_toast|🎉 MỞ KHÓA: Bái Tướng Đài (Đài Chiêu Mộ Anh Linh)|unlock\n# EFFECT: unlock_feature|bai_tuong_dai\n\n[HỆ THỐNG]: Ký chủ có thể sử dụng Anh Hồn Lệnh tại Bái Tướng Đài để chiêu mộ anh linh Tam Quốc.\n\n[HỆ THỐNG]: Hiện tại Ký chủ sở hữu: Anh Hồn Lệnh Sơ Cấp × 1.\n\n* [Bước vào Bái Tướng Đài — Kích hoạt Gacha]\n  # EFFECT: trigger_gacha|bai_tuong_dai_v1\n  -> gacha_summoning\n\n=== gacha_summoning ===\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_bagua_ritual\n# EFFECT: sfx_bagua_spin\n\n// [Engine sẽ hiển thị Gacha Modal tại đây]\n// Sau khi người chơi hoàn thành ritual và rút được Triệu Vân:\n\n~ affinity_trieu_van = 50\n\n[HỆ THỐNG]: ⟨ SSR ⟩ Chiêu mộ thành công — TRIỆU TỬ LONG!\n[HỆ THỐNG]: Cảnh giới: Hoàng Cảnh Sơ Kỳ | Binh chủng: Bạch Mã Nghĩa Tòng\n\n# EFFECT: screen_flash|#C0C0C0|1000\n# EFFECT: sfx_hero_reveal_ssr\n\n-> trieu_van_arrival\n\n=== trieu_van_arrival ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# ACTORS: qui_binh_an|right|amazed, trieu_van|left|noble\n# MUSIC: bgm_hero_theme\n\nÁnh sáng bạc ngân lóe lên, sương mù tụ lại hình dáng một chiến tướng.\n\nGiáp bạc sáng loáng, bạch bào tung bay, tay phải cầm trường thương — Long Đảm Lượng Ngân Thương phát ra tiếng rung nhẹ.\n\nTriệu Tử Long — Thường Sơn Triệu Vân, một trong Ngũ Hổ Thượng Tướng của Lưu Bị — hiện thân trước mặt Quý Bình An.\n\n\"Triệu Vân, Triệu Tử Long, bái kiến Ký chủ.\"\n\nTử Long đơn gối quỳ, Long Đảm Thương dựng đứng bên cạnh, ánh mắt kiên nghị như sao.\n\n* [Đỡ Triệu Vân đứng lên: \"Tử Long, từ nay ta và ngươi cùng chiến đấu.\"]\n  ~ affinity_trieu_van += 10\n  \n  Triệu Vân ngẩng đầu, ánh mắt kiên định: \"Tử Long nguyện dùng Long Đảm Thương bảo vệ Ký chủ, dù phải đâm xuyên vạn quân!\"\n  \n  -> hero_inspector_prompt\n\n* [Quan sát kỹ — hắn thật sự là Triệu Tử Long?]\n  Quý Bình An nhíu mày: \"Chứng minh cho ta.\"\n  \n  Triệu Vân mỉm cười, Long Đảm Thương trong tay bỗng hóa thành tia sáng — bảy mũi thương bắn ra liên hoàn, xiên xuyên bảy cột gỗ trong mật thất mà không chạm một vật trang trí nào.\n  \n  \"Thất Thám Bàn Xà.\"\n  \n  ~ affinity_trieu_van += 5\n  \n  -> hero_inspector_prompt\n\n=== hero_inspector_prompt ===\n# EFFECT: show_toast|💠 Mở Bảng Thuộc Tính Tướng — Nhấp vào Avatar Triệu Vân để xem|info\n\n[HỆ THỐNG]: Đã mở khóa Bảng Tra Cứu Thuộc Tính Danh Tướng.\n[HỆ THỐNG]: Nhấp vào biểu tượng Triệu Vân bất cứ lúc nào để xem chi tiết.\n\n// [Engine hiển thị Hero Detail Inspector Modal]\n\n* [Tiếp tục câu chuyện]\n  -> chapter_5_aftermath\n\n=== chapter_5_aftermath ===\n# ACTORS: qui_binh_an|right|determined, trieu_van|left|standing_guard\n\nQuý Bình An nhìn Triệu Tử Long — vị chiến thần Tam Quốc giờ đây đứng trong phò mã phủ của hắn, trung thành và sẵn sàng.\n\n\"Tử Long, ta có một câu hỏi. Ngươi... biết gì về thế giới này?\"\n\nTriệu Vân lắc đầu: \"Thần chỉ biết Ký chủ cần thần. Thế giới này hay thế giới khác, Long Đảm Thương vẫn sắc bén.\"\n\nQuý Bình An mỉm cười. Ít nhất, hắn không còn một mình.\n\n[HỆ THỐNG]: Gợi ý — Chương tiếp theo sẽ mở khóa cơ hội Kinh Doanh. Hãy chuẩn bị.\n\n* [Kết thúc Chương 5]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 5: Chiêu Mộ Triệu Tử Long SSR|milestone\n  # EFFECT: chapter_complete|5\n  -> chapter_8_transition\n\n// ============================================================\n// CHƯƠNG 8: THIÊN KIM LÂU & PHÁT MINH THẤU HOA CAO\n// ============================================================\n\n=== chapter_8_transition ===\n# CHAPTER_TITLE: Hồi 3 · Chương 8: Phát Minh Thấu Hoa Cao\n# BACKGROUND: bg_thien_kim_lau\n# MUSIC: bgm_marketplace\n# ACTORS: qui_binh_an|right|clever, ve_ti_vu|left|curious\n\n~ chapter = 8\n~ met_ve_ti_vu = true\n\nBa ngày sau khi chiêu mộ Triệu Vân.\n\nQuý Bình An đang ngồi trong Thiên Kim Lâu — tửu lâu lớn nhất kinh đô, do lâu chủ Vệ Ti Vũ điều hành.\n\nHắn mang theo một mẫu vật nhỏ — một thanh xà phòng thơm, trắng tinh, mịn màng — thứ mà hắn đã bí mật chế tạo từ mỡ cừu và tro kiềm trong ba đêm liên tiếp.\n\n\"Vệ lâu chủ, ta có một thương phẩm... sẽ thay đổi toàn bộ thị trường mỹ phẩm Đại Vũ.\"\n\nVệ Ti Vũ nhíu mày, cầm thanh xà phòng lên ngửi: \"Thơm... và trơn láng. Đây là gì?\"\n\n\"Thấu Hoa Cao. Sản phẩm tinh chế từ nguyên liệu tự nhiên, có thể làm sạch da, khử mùi, và giữ ẩm. Mỗi thanh bán giá 10 lượng bạc cho giới quý tộc.\"\n\n* [Đề xuất hợp tác kinh doanh 50/50]\n  ~ gold += 3000\n  ~ unlocked_soap = true\n  \n  \"Ta cung cấp công thức độc quyền, lâu chủ lo sản xuất và phân phối. Lợi nhuận chia đôi.\"\n  \n  Vệ Ti Vũ gật đầu: \"Phò mã gia, thương vụ này sẽ khiến cả kinh đô phải xôn xao.\"\n  \n  # EFFECT: show_toast|🎉 MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+3.000 Vàng mỗi lượt)|unlock\n  # EFFECT: unlock_feature|thau_hoa_cao\n  \n  [HỆ THỐNG]: Mở khóa tính năng Kinh Doanh Xà Phòng! Thu nhập +3.000 Vàng mỗi lượt trên Sa Bàn.\n  \n  -> chapter_8_aftermath\n\n* [Giữ bí mật, tự sản xuất quy mô nhỏ]\n  ~ gold += 1000\n  ~ unlocked_soap = true\n  \n  \"Chưa vội. Ta sẽ tự kinh doanh trước, thử thị trường.\"\n  \n  # EFFECT: show_toast|🎉 MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+1.000 Vàng mỗi lượt, mở rộng sau)|unlock\n  # EFFECT: unlock_feature|thau_hoa_cao\n  \n  [HỆ THỐNG]: Mở khóa tính năng Kinh Doanh Xà Phòng! Thu nhập +1.000 Vàng mỗi lượt (có thể nâng cấp).\n  \n  -> chapter_8_aftermath\n\n=== chapter_8_aftermath ===\n# ACTORS: qui_binh_an|right|satisfied\n\nĐây mới là bước khởi đầu thực sự. Có tiền, có tướng — Quý Bình An bắt đầu xây dựng nền tảng quyền lực.\n\n* [Kết thúc Chương 8]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 8: Phát Minh Thấu Hoa Cao|milestone\n  # EFFECT: chapter_complete|8\n  -> chapter_10_transition\n\n// ============================================================\n// CHƯƠNG 10: THÍCH KHÁCH PHÒ MÃ PHỦ\n// ============================================================\n\n=== chapter_10_transition ===\n# CHAPTER_TITLE: Hồi 4 · Chương 10: Thích Khách Đêm Trăng\n# BACKGROUND: bg_pho_ma_phu_courtyard_night\n# MUSIC: bgm_suspense_night\n# ACTORS: qui_binh_an|right|alarmed\n\n~ chapter = 10\n\nĐêm khuya. Phò Mã Phủ.\n\nQuý Bình An đang đọc sách trong thư phòng thì cảm thấy luồng sát khí lạnh buốt.\n\n# EFFECT: sfx_blade_unsheath\n# EFFECT: screen_darken\n\nBa bóng đen từ trên mái nhà lao xuống — đao sáng lạnh, nhằm thẳng cổ phò mã!\n\n* [Hét gọi Triệu Vân!]\n  -> assassin_zhao_yun_saves\n\n* [Lăn sang bên, tự né tránh]\n  -> assassin_self_dodge\n\n=== assassin_zhao_yun_saves ===\n# EFFECT: sfx_spear_whoosh\n# EFFECT: screen_flash|#C0C0C0|300\n# ACTORS: trieu_van|left|battle_stance, assassin|center|attacking\n\n\"TỬ LONG!\"\n\nTrước khi tiếng hét tắt, ánh bạc đã lóe lên — Long Đảm Lượng Ngân Thương xé toang bóng đêm!\n\nTriệu Vân xuất hiện như luồng gió bạc. Ba mũi thương liên hoàn — ba thích khách ngã gục trước khi kịp chạm vào phò mã.\n\n\"Ký chủ, bọn chúng là sát thủ được huấn luyện bài bản.\" — Triệu Vân thu thương, mắt vẫn cảnh giác quét xung quanh.\n\n~ affinity_trieu_van += 15\n\n-> assassin_aftermath\n\n=== assassin_self_dodge ===\n# ACTORS: qui_binh_an|right|rolling, assassin|center|attacking\n\nQuý Bình An lăn sang bên — phản xạ sinh tồn từ kinh nghiệm đọc quá nhiều tiểu thuyết võ hiệp.\n\nNhưng thích khách thứ hai đã ở sau lưng—\n\n# EFFECT: sfx_spear_whoosh\n# EFFECT: screen_flash|#C0C0C0|300\n# ACTORS: trieu_van|left|battle_stance\n\nKịp thời! Triệu Vân đã phục sẵn bên ngoài từ lúc cảm nhận sát khí. Long Đảm Thương quét ngang — ba thích khách ngã gục.\n\n~ affinity_trieu_van += 10\n\n-> assassin_aftermath\n\n=== assassin_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_courtyard_night\n# MUSIC: bgm_investigation\n# ACTORS: qui_binh_an|right|serious, trieu_van|left|reporting\n\nTriệu Vân kiểm tra thi thể thích khách: \"Bọn chúng đều uống thuốc phong bế huyệt đạo, không thể tra khảo. Nhưng hình xăm trên cổ tay — đây là dấu hiệu của...\"\n\nHắn dừng lại.\n\n\"Ký chủ, bọn chúng không phải thích khách thường. Ai đó có quyền lực rất lớn muốn ngài chết.\"\n\n* [Ngụy tạo tai nạn giấu xác, bí mật điều tra]\n  ~ suspicion -= 10\n  ~ gold += 2000\n  \n  \"Không được để lộ. Giấu xác, xóa dấu vết. Ta sẽ tự điều tra.\"\n  \n  # EFFECT: set_flag|ch10_method|hide\n  \n  -> chapter_10_complete\n\n* [Áp giải thi thể lên Kim Loan Điện đối chất Vũ Hoàng]\n  ~ suspicion += 20\n  ~ gold += 5000\n  \n  \"Đưa xác lên triều! Ta muốn xem ai dám ám sát phò mã ngay giữa kinh đô!\"\n  \n  # EFFECT: set_flag|ch10_method|confront\n  \n  -> chapter_10_complete\n\n* [Hỏa tốc điều động kỵ binh thám thính tiền tuyến]\n  ~ suspicion += 5\n  \n  \"Tử Long, phái người đi kiểm tra biên giới phía Bắc. Ta nghi ngờ chuyện này liên quan đến ngoại bang.\"\n  \n  # EFFECT: set_flag|ch10_method|investigate\n  \n  -> chapter_10_complete\n\n=== chapter_10_complete ===\n* [Kết thúc Chương 10]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 10: Thích Khách Đêm Trăng|milestone\n  # EFFECT: chapter_complete|10\n  -> chapter_15_transition\n\n// ============================================================\n// CHƯƠNG 15: VŨ HOÀNG HẠ CHỈ BẮC CHINH\n// ============================================================\n\n=== chapter_15_transition ===\n# CHAPTER_TITLE: Hồi 5 · Chương 15: Chinh Phạt Bắc Cảnh\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_decree\n# ACTORS: vu_hoang|center|commanding, qui_binh_an|right|kneeling\n\n~ chapter = 15\n\nĐại điện Kim Loan. Vũ Hoàng ngồi trên ngai, mặt nghiêm trọng.\n\n\"Biên giới Bắc Cảnh bất ổn. Quân phiến loạn đã chiếm ba huyện, cắt đứt tuyến thương mại phương Bắc.\"\n\nVũ Hoàng đứng dậy, rút thanh kiếm truyền quốc:\n\n\"Trẫm phong Quý Bình An làm Chinh Bắc Đại Tướng Quân, lĩnh binh mã chinh phạt Bắc Cảnh!\"\n\n# EFFECT: screen_flash|#FFD700|500\n# EFFECT: sfx_imperial_decree\n\n~ unlocked_map = true\n~ imperial_prestige += 1\n~ gold += 5000\n~ jade += 20\n\n# EFFECT: show_toast|🎉 MỞ KHÓA: Tầng 2 — Đế Nghiệp Sa Bàn (Grand Strategy Map)|unlock\n# EFFECT: unlock_feature|de_nghiep_sa_ban\n\n[HỆ THỐNG]: Mở khóa Đế Nghiệp Sa Bàn! Bản đồ chiến lược 4 phương, hệ thống Điểm Hành Động (AP), và quản lý hậu cần quân đội.\n\n* [Nhận lệnh: \"Thần lĩnh chỉ!\"]\n  ~ suspicion += 5\n  ~ affinity_trieu_van += 5\n  \n  \"Thần Quý Bình An lĩnh chỉ! Tất sẽ bình định Bắc Cảnh, khôi phục cương thổ cho Đại Vũ!\"\n  \n  Triệu Vân đứng bên cạnh, Long Đảm Thương vang lên tiếng ngân: sẵn sàng.\n  \n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 15: Chinh Phạt Bắc Cảnh|milestone\n  # EFFECT: chapter_complete|15\n  \n  [HỆ THỐNG]: Từ đây, người chơi có thể chuyển sang Tầng 2 — Đế Nghiệp Sa Bàn để quản lý lãnh thổ và quân đội.\n  \n  -> END\n",
    "ch16_52": "// ============================================================\n// Trấn Quốc Phò Mã Gia — Ink Scene Script\n// Phần 2: Từ Chương 16 đến Chương 52 (Hồi 1 Hoàn Tất)\n// ============================================================\n// Biên soạn theo chuẩn Ink scripting (inkjs runtime)\n// Tham chiếu: narrative-scene-scripting & game-systems-architect skills\n// ============================================================\n\n// ============================================================\n// CHƯƠNG 20: BIÊN CƯƠNG TUYẾN ĐẦU & HÃM TRẬN DOANH (CAO THUẬN)\n// ============================================================\n\n=== chapter_20_start ===\n# CHAPTER_TITLE: Hồi 6 · Chương 20: Hãm Trận Dũng Sĩ Biên Cương\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_military_march\n# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard, gao_shun|left|stern\n\n~ chapter = 20\n\nGió lạnh phương Bắc gào thét qua ải Nhạn Môn.\n\nQuý Bình An đứng trên vọng lâu quân doanh Bắc Cương. Sau lưng hắn, Triệu Vân tay cầm Long Đảm Thương vững như bàn thạch.\n\nPhía đối diện, một vị chiến tướng mình mặc hắc giáp nặng trĩu, nét mặt nghiêm cẩn như khắc đá, chắp tay hành lễ nhưng lưng thẳng tắp:\n\n\"Bắc Cương tiền phong thống lĩnh Cao Thuận, bái kiến Phò mã đại tướng quân!\"\n\n# EFFECT: sfx_armor_clank\n\nQuý Bình An nhìn người này. Ký ức Tam Quốc trong đầu lập tức hiện lên:\n\n*Cao Thuận — thống soái Hãm Trận Doanh, tám trăm cảm tử quân trang bị giáp trụ tinh lương, mỗi trận đánh đều phá vỡ trận địa địch, tính tình thanh liêm trầm mặc, không uống rượu, không nhận quà cáp.*\n\n* [Hỏi về thực trạng quân nhu và binh sĩ]\n  \"Cao tướng quân bình thân. Quân sĩ Bắc Cương hiện nay thế nào?\"\n  \n  Cao Thuận trầm giọng báo cáo: \"Bẩm Phò mã, giáp trụ hư hỏng bốn phần, lương thực triều đình cấp phát trễ hai tháng. Nhưng tám trăm dũng sĩ Hãm Trận Doanh vẫn sẵn sàng quyết tử giữ ải!\"\n  \n  -> gao_shun_decision\n\n* [Khen ngợi khí phách Hãm Trận Doanh]\n  \"Ta nghe danh Hãm Trận Doanh đã lâu. Trăm trận trăm thắng, xung phong phá trận không gì cản nổi!\"\n  \n  Cao Thuận ánh mắt lóe lên vẻ xúc động hiếm hoi, cúi đầu tạ ơn: \"Tướng sĩ chỉ làm tròn bổn phận bảo quốc an dân.\"\n  \n  ~ affinity_gaoshun += 10\n  -> gao_shun_decision\n\n=== gao_shun_decision ===\n# SCENE_TYPE: choice\n\nQuý Bình An mở hòm quân nhu, trước mặt hắn là nguồn vàng ròng kiếm được từ việc kinh doanh xà phòng Thấu Hoa Cao tại kinh thành.\n\n* [Dốc 5.000 Vàng rèn lại toàn bộ giáp trụ cho Hãm Trận Doanh]\n  ~ gold -= 5000\n  ~ affinity_gaoshun += 25\n  ~ unlocked_granary = true\n  \n  Quý Bình An phất tay: \"Truyền lệnh! Xuất 5.000 lượng vàng từ ngân quỹ cá nhân của ta, mở lò rèn ngày đêm đúc giáp khiên thép tôi tốt nhất cho toàn quân!\"\n  \n  Cao Thuận quỳ rạp xuống, hai tay ôm quyền: \"Mạt tướng thay mặt tám trăm huynh đệ Hãm Trận Doanh, thề đem máu nóng đền đáp ân tri ngộ của Phò mã gia!\"\n  \n  # EFFECT: show_toast|🎉 MỞ KHÓA THẺ BÀI: Hãm Trận Doanh (SSR Shield Guard)|unlock\n  # EFFECT: unlock_feature|feature_ham_tran_doanh\n  \n  [HỆ THỐNG]: Thu phục thành công Danh tướng Cao Thuận! Mở khóa thẻ bài phòng thủ chiến thuật [Hãm Trận Doanh].\n  \n  -> chapter_20_complete\n\n* [Phối hợp chiến thuật Kỵ - Bộ giữa Triệu Vân và Cao Thuận]\n  ~ affinity_gaoshun += 15\n  ~ affinity_trieu_van += 15\n  \n  \"Tử Long, ngươi dẫn Bạch Mã Kỵ phối hợp cùng Hãm Trận Doanh của Cao tướng quân, luyện tập thế trận Kỵ Binh bọc sườn - Thiết Giáp chặn đầu.\"\n  \n  Triệu Vân mỉm cười gật đầu: \"Tuân lệnh Ký chủ! Bộ kỵ phối hợp, tất phá địch như chẻ tre!\"\n  \n  Cao Thuận gật đầu khâm phục tầm nhìn chiến thuật của Phò mã.\n  \n  # EFFECT: show_toast|⚔️ Sĩ Khí Quân Đội Tăng Vọt (+20% ATK Bộ Kỵ)|buff\n  \n  -> chapter_20_complete\n\n=== chapter_20_complete ===\n* [Kết thúc Chương 20]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 20: Thu Phục Cao Thuận & Hãm Trận Doanh|milestone\n  # EFFECT: chapter_complete|20\n  -> chapter_27_transition\n\n// ============================================================\n// CHƯƠNG 27: ĐỘC SĨ GIẢ HỦ XUẤT THẾ (MƯU KHÁCH PHỦ)\n// ============================================================\n\n=== chapter_27_transition ===\n# CHAPTER_TITLE: Hồi 7 · Chương 27: Độc Sĩ Giả Hủ Hiến Kế\n# BACKGROUND: bg_advisor_tent_night\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious\n\n~ chapter = 27\n\nĐêm khuya tại mật trướng soái phủ. Ngọn đèn dầu le lói chiếu lên tấm địa đồ sông Hoài Hà và Thanh Thủy.\n\nMột bóng người trung niên áo xám bước vào. Ánh mắt thâm sâu như đầm nước lạnh, nụ cười nửa miệng như thấu suốt mọi trò đời.\n\n\"Thảo dân Giả Hủ, tự Văn Hòa, bái kiến Phò mã gia.\"\n\n# EFFECT: sfx_whisper\n\n~ met_gia_hu = true\n\nQuý Bình An giật mình đứng bật dậy: \"Giả Hủ? Độc Sĩ Giả Hủ thời Tam Quốc?!\"\n\nGiả Hủ khẽ cười, nâng tay áo che miệng: \"Phò mã gia nhận ra thảo dân sao? Xem ra thảo dân đã tìm đúng minh chủ.\"\n\nHắn bước tới bàn sa bàn, ngón tay gầy guộc chỉ thẳng vào hạ lưu sông Thanh Thủy:\n\n\"Quân Nam Ly đã bí mật liên kết với thổ phỉ Bắc Cương, dự định ba ngày sau vây khốn quân doanh Phò mã tại thung lũng Hắc Phong. Nếu Phò mã dùng binh pháp thông thường, mười phần chết chín.\"\n\n* [Hỏi kế sách phá địch của Giả Hủ]\n  \"Văn Hòa tiên sinh đã đến, ắt đã có diệu kế cứu vãn?\"\n  \n  Giả Hủ cười lạnh: \"Kế thì có ba. Nhưng còn tùy Phò mã muốn làm 'Nhân Quân' cứu người, hay muốn làm 'Bá Chủ' đoạt thiên hạ.\"\n  \n  -> jia_xu_stratagem_choice\n\n=== jia_xu_stratagem_choice ===\n# SCENE_TYPE: choice\n\nGiả Hủ trình bày ba mưu kế với nét mặt thản nhiên như luận bàn thời tiết:\n\n* [Chọn Độc Kế: Nhử địch vào hẻm núi, dùng tên độc và hỏa dược triệt hạ toàn bộ]\n  ~ suspicion += 15\n  ~ affinity_gia_hu += 25\n  ~ gold += 20000\n  \n  \"Dùng độc kế! Trong chiến tranh, nhân từ với kẻ địch là tàn nhẫn với tướng sĩ của mình!\"\n  \n  Giả Hủ ánh mắt sáng rực: \"Hay! Rất quyết đoán! Giả vờ vứt bỏ doanh trại, nhử năm vạn quân địch chen chúc vào hẻm núi Tử Thần, sau đó chặn hai đầu phóng hỏa. Không một tên nào sống sót trở về!\"\n  \n  # EFFECT: show_toast|🔥 MỞ KHÓA MƯU KẾ: Hỏa Công Liên Hoàn & Bẫy Độc (Giả Hủ)|unlock\n  # EFFECT: unlock_feature|feature_poison_stratagem\n  \n  [HỆ THỐNG]: Giả Hủ hoàn toàn quy thuận! Nhận 20.000 Vàng chiến lợi phẩm tịch thu từ quân địch. Nghi Kỵ triều đình tăng nhẹ do thủ đoạn tàn khốc.\n  \n  -> chapter_27_complete\n\n* [Chọn Phản Gián Kế: Tung tin giả khiến tướng soái địch tự chém giết lẫn nhau]\n  ~ gold -= 3000\n  ~ affinity_gia_hu += 20\n  ~ suspicion -= 5\n  \n  \"Dùng mưu phản gián, cho người mang mật thư giả mua chuộc phó tướng Nam Ly, ly gián bọn chúng.\"\n  \n  Giả Hủ vuốt râu mỉm cười: \"Dùng đao giết người không dính máu. Kế này bảo toàn được binh lực, lại khiến Vũ Hoàng nghĩ rằng Phò mã chỉ nhờ may mắn.\"\n  \n  # EFFECT: show_toast|📜 MỞ KHÓA THẺ BÀI: Mưu Kế Phản Gián & Ly Gián Kế|unlock\n  # EFFECT: unlock_feature|feature_counter_espionage\n  \n  -> chapter_27_complete\n\n* [Chọn Vương Đạo: Kết hợp trinh sát và phục kích chính diện]\n  ~ affinity_trieu_van += 20\n  ~ affinity_gia_hu += 5\n  ~ suspicion -= 10\n  \n  \"Tử Long xông pha bắt sống tướng giặc, phân hóa bộ hạ, tha cho hàng binh.\"\n  \n  Triệu Vân từ bên ngoài bước vào, phấn khởi: \"Ký chủ nhân đức, Tử Long nguyện đi đầu vạn quân bắt sống tướng địch!\"\n  \n  Giả Hủ thở dài lắc đầu nhưng trong mắt lộ vẻ kính nể: \"Tuy đi đường vòng, nhưng quả thật có phong thái đế vương.\"\n  \n  -> chapter_27_complete\n\n=== chapter_27_complete ===\n* [Kết thúc Chương 27]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 27: Độc Sĩ Giả Hủ Hiến Kế|milestone\n  # EFFECT: chapter_complete|27\n  -> chapter_35_transition\n\n// ============================================================\n// CHƯƠNG 35: ĐẠI KẾ THỦY CÔNG DÒNG THANH THỦY\n// ============================================================\n\n=== chapter_35_transition ===\n# CHAPTER_TITLE: Hồi 8 · Chương 35: Đại Kế Thủy Công Dòng Thanh Thủy\n# BACKGROUND: bg_thanh_thuy_river_dam\n# MUSIC: bgm_river_roaring\n# ACTORS: qui_binh_an|right|observing, jia_xu|left|pointing, trieu_van|right|standing_guard\n\n~ chapter = 35\n\nMùa mưa Bắc Cương đổ xuống xối xả. Dòng sông Thanh Thủy đỏ ngầu phù sa cuộn sóng gầm thét.\n\nQuý Bình An cùng Giả Hủ đứng trên đỉnh đập đất thượng nguồn.\n\nHạ lưu cách đó ba mươi dặm chính là thành Thanh Châu — cứ điểm kiên cố nhất mà năm vạn quân chủ lực phản quân của Địch Hỏa đang chiếm đóng.\n\nGiả Hủ chỉ xuống dòng nước xiết:\n\n\"Phò mã gia, mùa mưa đã đến. Nước lũ thượng nguồn dâng cao từng ngày. Nếu chúng ta đắp đập ngăn sông trong bảy ngày, sau đó hạ lệnh xả lũ...\"\n\nGiọng Giả Hủ trầm xuống, lạnh lẽo:\n\n\"...thành Thanh Châu cùng năm vạn quân Địch Hỏa sẽ chìm trong biển nước. Một trận định giang sơn!\"\n\n# EFFECT: sfx_thunder_distant\n\n* [Khảo sát kỹ tác động tới bá tánh hạ lưu]\n  \"Nước lũ tràn bờ, liệu có nhấn chìm thôn xóm của dân thường?\"\n  \n  Giả Hủ thở dài: \"Chiến tranh xưa nay nào có vẹn toàn đôi đường. Nếu không xả lũ, quân ta phải công thành ròng rã nửa năm, thương vong tướng sĩ không dưới ba vạn, dân chúng trong thành cũng chết đói.\"\n  \n  -> flood_preparation_choice\n\n=== flood_preparation_choice ===\n# SCENE_TYPE: choice\n\n* [Bí mật di tản dân lành hạ lưu trước ba ngày rồi mới xả lũ]\n  ~ gold -= 3000\n  ~ affinity_trieu_van += 25\n  ~ suspicion -= 10\n  ~ unlocked_flood = true\n  \n  Quý Bình An quyết đoán: \"Ta muốn thắng, nhưng không muốn giẫm lên xương máu đồng bào vô tội! Xuất 3.000 Vàng, lệnh cho Triệu Vân dẫn kỵ binh cải trang thành thương đoàn, trong ba đêm bí mật di tản toàn bộ bách tính hạ lưu sang vùng cao!\"\n  \n  Triệu Vân rực sáng ánh mắt: \"Mạt tướng tuân lệnh! Dù phải thức trắng ba đêm cũng quyết đưa toàn bộ người già trẻ nhỏ an toàn!\"\n  \n  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Xả Lũ Sông Thanh Thủy (Tầng 3 Combat)|unlock\n  # EFFECT: unlock_feature|feature_water_stratagem\n  \n  [HỆ THỐNG]: Kế sách Thủy Công được kích hoạt! Tích lũy nước 3 giai đoạn để hủy diệt xe đục thành của địch. Lòng dân quy phục tột bậc!\n  \n  -> chapter_35_complete\n\n* [Xả lũ bất ngờ ngay trong đêm mưa bão để đạt hiệu quả tối đa]\n  ~ suspicion += 20\n  ~ affinity_gia_hu += 20\n  ~ unlocked_flood = true\n  \n  \"Quân cơ thần tốc! Địch Hỏa là kẻ xảo quyệt, nếu di tản sẽ để lộ phong thanh. Đắp đê thật cao, chờ thời cơ phóng thủy!\"\n  \n  Giả Hủ cúi đầu: \"Phò mã quyết đoán phi thường, tất thành đại nghiệp.\"\n  \n  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Bạo Lũ Diệt Địch (Sát Thương Tối Đa)|unlock\n  # EFFECT: unlock_feature|feature_water_stratagem\n  \n  -> chapter_35_complete\n\n=== chapter_35_complete ===\n* [Kết thúc Chương 35]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 35: Đại Kế Thủy Công Dòng Thanh Thủy|milestone\n  # EFFECT: chapter_complete|35\n  -> chapter_43_transition\n\n// ============================================================\n// CHƯƠNG 43: ĐẠI DOANH TÍCH TRỮ QUÂN LƯƠNG\n// ============================================================\n\n=== chapter_43_transition ===\n# CHAPTER_TITLE: Hồi 9 · Chương 43: Vạn Thạch Quân Lương Tiền Tuyến\n# BACKGROUND: bg_granary_depot\n# MUSIC: bgm_logistics_busy\n# ACTORS: qui_binh_an|right|armored, gao_shun|left|reporting\n\n~ chapter = 43\n\nĐoàn xe bò kéo chở đầy bao tải lương thực nối đuôi nhau như rồng rắn tiến vào đại doanh Bắc Cương.\n\nCao Thuận cầm sổ bộ kiểm đếm, nét mặt giãn ra nụ cười hiếm hoi:\n\n\"Báo cáo Phò mã gia! Toàn bộ 50.000 hộc lương thảo thu mua từ thương đoàn Giang Đông và Tây Lăng đã nhập kho an toàn. Quân ta hiện có đủ lương thực ăn trong trọn vẹn một năm!\"\n\n# EFFECT: sfx_cheer_soldiers\n\n~ rations += 50000\n~ jade += 10\n\nQuý Bình An nhìn kho lương cao như núi. Đây chính là quả ngọt của hệ thống kinh tế xà phòng Thấu Hoa Cao và tầm nhìn hậu cần chiến lược.\n\n\"Binh mã chưa động, lương thảo đi trước. Có kho lương này, quân sĩ không còn sợ hãi mùa đông lạnh giá nữa!\"\n\n* [Thưởng lớn cho binh sĩ và trích lương tế bần]\n  ~ gold -= 2000\n  ~ affinity_gaoshun += 15\n  ~ affinity_trieu_van += 15\n  \n  \"Phát rượu thịt cho toàn quân ăn mừng! Trích 5.000 hộc lương cứu đói cho nạn dân xung quanh quân doanh!\"\n  \n  Tiếng hoan hô vang dậy đất trời. Sĩ khí quân đoàn đạt mốc tuyệt đối 100%!\n  \n  # EFFECT: show_toast|🌾 QUÂN LƯƠNG ĐẠT 50.000 HỘC — Sĩ Khí Quân Sĩ Tối Đa|reward\n  \n  -> chapter_43_complete\n\n=== chapter_43_complete ===\n* [Kết thúc Chương 43]\n  # EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 43: Vạn Thạch Quân Lương Tiền Tuyến|milestone\n  # EFFECT: chapter_complete|43\n  -> chapter_48_transition\n\n// ============================================================\n// CHƯƠNG 48-52: ĐẠI CHIẾN THANH CHÂU & KHẢI HOÀN HỒI TRIỀU\n// ============================================================\n\n=== chapter_48_transition ===\n# CHAPTER_TITLE: Hồi 10 · Chương 48-52: Khúc Tráng Ca Thanh Châu — Đại Phá Địch Hỏa\n# BACKGROUND: bg_thanh_chau_fortress_siege\n# MUSIC: bgm_epic_final_battle\n# ACTORS: qui_binh_an|right|battle_armor, trieu_van|right|spear_ready, gao_shun|left|shield_wall, jia_xu|left|observing\n\n~ chapter = 48\n\nThành Thanh Châu rung chuyển dữ dội dưới làn mưa tên và đá lửa.\n\nDưới chân thành, năm vạn quân phản loạn do đại tướng Địch Hỏa chỉ huy dàn trận kín đặc như kiến cỏ.\n\nMười cỗ xe đục thành khổng lồ bọc thép đen kịt đang ầm ầm tiến thẳng tới cổng thành chính!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_siege_ram_hit\n\nĐịch Hỏa cưỡi hắc mã, vung thanh Bạo Liệt Đao gầm thét:\n\n\"Quý Bình An! Phò mã phế vật! Hôm nay ta sẽ san bằng thành này, lấy đầu ngươi dâng cho Nam Ly Vương!\"\n\nQuý Bình An đứng trên tường thành cao, áo choàng đỏ tung bay trong gió lộng. Triệu Vân giáp bạc sáng ngời, Cao Thuận dựng khiên thép Hãm Trận Doanh, Giả Hủ cầm cờ hiệu phát lệnh.\n\n\"Tướng sĩ Đại Vũ! Hôm nay là ngày định đoạt vận mệnh giang sơn!\"\n\n# EFFECT: screen_flash|#FFD700|600\n\n* [Hạ lệnh nghênh chiến toàn diện — Kích hoạt Tầng 3 Tactical Card Battler!]\n  # EFFECT: trigger_battle|battle_ch48_thanh_chau\n  -> thanh_chau_epic_battle\n\n=== thanh_chau_epic_battle ===\n// [Chiến trường chuyển sang Tầng 3 Thẻ Bài Sa Trường]\n// Người chơi trải qua trận thủ thành 3 làn, phá hủy xe đục thành và boss Địch Hỏa\n\n# BACKGROUND: bg_thanh_chau_aftermath\n# MUSIC: bgm_triumph_sunrise\n# ACTORS: qui_binh_an|right|triumphant, trieu_van|right|bowing, gao_shun|left|kneeling, jia_xu|left|satisfied\n\nNước lũ Thanh Thủy được xả xuống đúng thời khắc quyết định!\n\nThác nước cuồn cuộn như rồng gầm cuốn phăng toàn bộ trận địa xe đục thành của địch.\n\nTriệu Tử Long tung người xuống ngựa, Long Đảm Thương xuyên phá hàng ngũ bắt sống Địch Hỏa ngay giữa dòng nước xiết!\n\n# EFFECT: sfx_victory_fanfare\n# EFFECT: screen_flash|#FFFFFF|1000\n\nNăm vạn quân địch tan rã hoàn toàn. Cờ xí Đại Vũ bay phấp phới trên cổng thành Thanh Châu!\n\n~ gold += 20000\n~ rations += 50000\n~ imperial_prestige += 2\n~ suspicion -= 15\n\nTriệu Vân áp giải Địch Hỏa quỳ trước mặt Quý Bình An:\n\n\"Báo cáo Phò mã gia! Chủ tướng địch Địch Hỏa đã bị bắt sống! Toàn cõi Bắc Cảnh đã được bình định sạch bóng quân thù!\"\n\nCao Thuận thu khiên: \"Tướng sĩ không một ai làm nhục mệnh lệnh của Phò mã!\"\n\nGiả Hủ khẽ mỉm cười: \"Bản tin thắng trận đã hỏa tốc phi về kinh đô. Vũ Hoàng tất phải phong vương bái tướng cho ngài!\"\n\n* [Tuyên bố kết thúc chiến dịch Bắc Chinh — Khải hoàn hồi triều!]\n  -> season_1_finale\n\n=== season_1_finale ===\n# BACKGROUND: bg_imperial_hall_golden\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: vu_hoang|center|impressed, qui_binh_an|right|kneeling_hero\n\nKinh đô Kim Loan Điện rực rỡ cờ hoa chào đón đoàn quân thắng trận khải hoàn.\n\nVũ Hoàng đích thân rời ngai vàng bước xuống thềm rồng, đỡ lấy hai tay Quý Bình An:\n\n\"Trẫm thật không nhìn lầm ngươi! Từ một phò mã hàn vi, ngươi đã lập nên chiến công vĩ đại nhất trăm năm qua của Đại Vũ!\"\n\n\"Truyền chỉ trẫm! Thăng phong Quý Bình An làm CHINH BẮC ĐẠI TƯỚNG QUÂN, ban kim ấn tử thụ, thống lĩnh mười vạn đại quân!\"\n\n# EFFECT: screen_flash|#FFD700|1200\n# EFFECT: sfx_gong_ancient\n\n[HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ!\n[HỆ THỐNG]: Hoàn thành xuất sắc TOÀN BỘ HỒI 1 (Chương 1 ➔ Chương 52)!\n[HỆ THỐNG]: Mở khóa chức danh: Chinh Bắc Đại Tướng Quân. Uy danh triều đình đạt Cấp 4!\n\n* [Khép lại thiên sử thi Hồi 1 & Hướng tới mùa giải mới]\n  # EFFECT: show_toast|🏆 HOÀN THÀNH TOÀN BỘ HỒI 1 (CHƯƠNG 1 - 52) ĐẠI THẮNG!|triumph\n  # EFFECT: chapter_complete|52\n  -> END\n"
  },
  "meta": {
    "version": "3.0.0",
    "hero_count": 28,
    "card_count": 15,
    "battle_count": 3,
    "milestone_count": 9,
    "generated_at": "2026-09-20"
  }
};
  console.log("⚡ [GAME_DATA] Đã nạp thành công:", window.GAME_DATA.meta);
})();
