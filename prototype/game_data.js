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
    "ch01_15": "// ============================================================\n// Trấn Quốc Phò Mã Gia — Ink Scene Script\n// Chương 1 - 15: Khởi Đầu Hàn Vi & Phong Vân Kinh Đô\n// ============================================================\n\n// === GLOBAL VARIABLES ===\nVAR gold = 0\nVAR jade = 0\nVAR suspicion = 0\nVAR has_anh_hon_lenh = false\nVAR system_awakened = false\nVAR poetry_duel_won = false\nVAR imperial_prestige = 0\nVAR chapter = 1\n\n// Feature unlock flags\nVAR unlocked_gacha = false\nVAR unlocked_soap = false\nVAR unlocked_map = false\nVAR unlocked_flood = false\nVAR unlocked_granary = false\nVAR unlocked_battle = false\n\n// Affinity scores\nVAR affinity_trieu_van = 0\nVAR affinity_gia_hu = 0\nVAR affinity_dieu_thuyen = 0\n\n// NPC relationship flags\nVAR met_vu_hoang = false\nVAR met_to_kien_phong = false\nVAR met_ve_ti_vu = false\n\n// Branch memory\nVAR ch10_method = \"none\"\n\n// ============================================================\n// CHƯƠNG 1: XUYÊN KHÔNG & ĐỐI THƠ ĐẠI ĐIỆN\n// ============================================================\n\n=== chapter_1_start ===\n# BACKGROUND: bg_darkness\n# MUSIC: bgm_ethereal_void\n# CHAPTER_TITLE: Hồi 1 · Chương 1: Phò Mã Hàn Vi Nơm Nớp Lo Sợ\n\nHắn mở mắt.\n\nKhông phải bóng tối hư vô của kiếp trước. Trước mắt hắn là tấm trướng lụa màu tím than thêu chỉ vàng đã sờn rách, thoang thoảng mùi trầm hương mục nát pha lẫn u uất.\n\nĐầu đau như búa bổ. Vô số mảnh vỡ ký ức xa lạ cuộn trào như thủy triều — hắn tên là Quý Bình An, đích tử thứ ba của phủ Trấn Quốc Công, cũng chính là kẻ phò mã hàn vi nức tiếng bất tài vô dụng của Đại Vũ Hoàng Triều.\n\nPhụ thân Quý Trọng Dung vừa bị tước đoạt binh quyền, gièm pha khắp kinh thành. Thê tử là Ninh An công chúa cao quý lạnh lùng chưa từng một lần ghé mắt. Còn bản thân hắn thì vừa trúng kỳ độc mê man ba ngày ba đêm, suýt nữa đã mất mạng trong âm thầm...\n\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# ACTORS: qui_binh_an|right|worried\n\nHắn... đã nhập thể trùng sinh vào tử cục ngập tràn hiểm nguy này. Muốn sinh tồn nơi triều chính, trước hết phải nhìn thấu cục diện, giấu kín phong mang.\n\nCánh cửa gỗ sơn mài đột ngột bật mở. Tỳ nữ thân cận Tiểu Thúy vội vã chạy vào, gương mặt tái nhợt không còn giọt máu:\n\n# ACTORS: qui_binh_an|right|neutral, servant|left|respectful\n\n\"Phò mã gia! Ngài rốt cuộc đã tỉnh lại rồi! Vũ Hoàng bệ hạ truyền khẩu dụ khẩn, yến tiệc tiếp đón sứ đoàn Nam Ly Quốc sắp sửa khai yến tại Kim Loan Điện! Ngài... ngài phải lập tức nhập cung ngay!\"\n\nQuý Bình An cất giọng trầm tĩnh: \"Bình tĩnh lại. Sứ đoàn Nam Ly mang theo điều gì đến yến tiệc mà khiến cả triều đình đại loạn?\"\n\nTiểu Thúy run giọng bẩm báo: \"Dạ bẩm... Nam Ly phái sứ thần đệ nhất học sĩ đến, mang theo một vế đối tuyệt đỉnh thách thức sĩ tử Đại Vũ. Nghe nói cả Hàn Lâm Viện lẫn các vị đại học sĩ đều câm nín, Vũ Hoàng nổi lôi đình lôi cả hoàng thân quốc thích và phò mã vào cung!\"\n\nQuý Bình An khẽ cười lạnh: \"Xem ra Vũ Hoàng không phải cần ta đối đáp, mà là muốn tìm một kẻ gánh tội thay khi triều đình mất mặt. Được, vậy để ta vào hoàng cung xem bọn họ muốn diễn vở kịch gì.\"\n\n-> travel_to_palace\n\n=== travel_to_palace ===\n# BACKGROUND: bg_imperial_road\n# AMBIENT: rain\n# MUSIC: bgm_imperial_procession\n\nCỗ xe ngựa lăn bánh trên đường đá hoa cương kinh đô, tiếng vó ngựa gõ dồn dập giữa màn mưa đêm lạnh buốt.\n\nĐại Vũ Hoàng Triều ba trăm năm định đô, bề ngoài phồn hoa tựa gấm, nhưng bên trong thì cửu vương đoạt đích, phiên trấn rục rịch binh đao, phương Bắc có Thác Bạt thiết kỵ rình rập, phương Nam có Nam Ly mưu toan cắn nuốt Trung Nguyên.\n\nCòn Quý gia — từng là danh môn khai quốc — nay chịu đủ mọi nghi kỵ của Vũ Hoàng, phụ thân Quý Trọng Dung bị phế chức, huynh trưởng trấn giữ biên thùy cô độc.\n\n\"Nếu đã bước vào ván cờ này... thì ta sẽ là người nắm giữ quân cờ.\"\n\n-> imperial_banquet\n\n=== imperial_banquet ===\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|right|nervous, vu_hoang|center|stern, nam_ly_envoy|left|arrogant\n\n~ met_vu_hoang = true\n\nĐại điện Kim Loan nguy nga tráng lệ, ngai vàng Cửu Long tỏa ánh kim quang thâm nghiêm, nhưng sát khí và sự ngột ngạt bao trùm từng tấc không khí.\n\nVũ Hoàng ngự trên bảo tọa, sắc mặt âm trầm như mây đen trước cơn bão. Hai bên bá quan văn võ cúi gầm mặt, không một ai dám ngẩng đầu thở mạnh.\n\nChính giữa đại điện, sứ thần Nam Ly Quốc khoác cẩm bào xanh thẫm ngạo nghễ vuốt râu, cất giọng sang sảng đầy vẻ khinh miệt:\n\n\"Bệ hạ Đại Vũ, vế đối này chỉ là chút thi tài tầm thường của phương Nam ta. Nếu vương triều trăm vạn sĩ tử mà không ai đối nổi, thì danh xưng 'Văn hiến thiên bang' từ nay xin giao lại cho Nam Ly ta vậy!\"\n\nSứ thần Nam Ly dõng dạc đọc vế đối vách đá:\n\n\"「天当棋盘星作子，谁人敢下？」\"\n\n\"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?\"\n(Trời làm bàn cờ sao làm quân, ai dám hạ cờ?)\n\nCả đại điện xôn xao. Quan văn nhìn nhau, lắc đầu. Quan võ im phắc. Một vế đối ngập tràn sát khí và cuồng vọng — lấy trời đất làm bàn cờ, biến nhật nguyệt tinh tú thành con tốt!\n\nVũ Hoàng nhíu mày, ánh mắt quét qua triều thần rồi dừng lại ở Quý Bình An — phò mã đứng cuối hàng:\n\n\"Quý Bình An! Ngươi dù sao cũng là con em Quý gia, đọc qua thi thư. Ngươi đối cho trẫm!\"\n\n-> poetry_choice\n\n=== poetry_choice ===\n# SCENE_TYPE: choice\n\nTrước mắt hắn là vận mệnh của cả một triều đại. Nếu vương triều chịu nhục, lửa chiến tranh sẽ thiêu rụi phương Nam. Quý Bình An quyết định xuất thế:\n\n* [Hoành Đao · Đối vế nghịch thiên: \"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?\"]\n  -> poetry_triumph\n\n* [Khiêm Cung · Đối vế mực thước: Giữ thể diện triều đình, giấu kín phong mang]\n  -> poetry_mediocre\n\n* [Quyền Mưu · Vạch trần dã tâm: Đanh thép chất vấn sứ thần Nam Ly trước điện Kim Loan]\n  -> poetry_silence\n\n=== poetry_triumph ===\n# EFFECT: camera_shake|0.8\n# EFFECT: screen_flash|#FFD700|500\n# EFFECT: sfx_thunder_dramatic\n# ACTORS: qui_binh_an|right|confident, nam_ly_envoy|left|shocked\n\n~ gold += 100\n~ poetry_duel_won = true\n~ suspicion += 10\n~ imperial_prestige += 1\n\nQuý Bình An tiến lên một bước, tà áo hắc bào tung bay giữa đại điện. Tiếng cười khẽ của hắn vang vọng khắp Kim Loan:\n\n\"Sứ thần Nam Ly ếch ngồi đáy giếng, cũng dám đem chút tài mọn ra bêu rếu trước mặt Hoàng thượng?\"\n\nHắn ngẩng đầu, ánh mắt uy nghiêm như sấm sét:\n\n\"「地作琵琶路作弦，盖世谁弹？」\"\n\n\"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?\"\n(Đất làm đàn tỳ bà đường làm dây, bậc cái thế nào dám gảy?)\n\nMột câu xuất khẩu, sấm rền giữa trời quang! Trời làm bàn cờ — Đất làm tỳ bà. Sao làm quân cờ — Đường thiên lý làm dây đàn!\n\nKhí phách ngút trời, nuốt trọn càn khôn, biến cả non sông gấm vóc thành khúc đàn của bậc đế vương! Sứ thần Nam Ly lùi liền ba bước, sắc mặt trắng bệch không thốt nên lời.\n\nVũ Hoàng chấn động đứng phắt dậy khỏi long ngai, vỗ mạnh lên án thư: \"HẢO! HẢO MỘT CÂU CÁI THẾ THÙY ĐẠN!\"\n\n\"Quý gia quả nhiên không hổ danh Trấn Quốc hổ môn! Ban thưởng phò mã Quý Bình An một trăm lượng hoàng kim!\"\n\n# EFFECT: show_toast|+100 Hoàng Kim Thưởng Kim Loan Điện|reward\n\n-> system_awakening\n\n=== poetry_mediocre ===\n# ACTORS: qui_binh_an|right|neutral, vu_hoang|center|disappointed\n~ suspicion -= 5\n~ gold += 10\n\nQuý Bình An chắp tay hành lễ, từ tốn đọc một vế đối thanh nhã, vừa đủ giải vây cho triều đình mà không bộc lộ quá nhiều tài năng kinh thế hãi tục. Vũ Hoàng khẽ gật đầu, ban thưởng mười lượng bạc khích lệ.\n\n-> system_awakening\n\n=== poetry_silence ===\n# ACTORS: qui_binh_an|right|head_down, vu_hoang|center|contemptuous\n~ suspicion += 5\n~ imperial_prestige += 2\n~ gold += 50\n\nQuý Bình An cất giọng đanh thép vạch trần dã tâm mượn văn thăm dò quân sự của Nam Ly khiến sứ thần tái mặt, Vũ Hoàng thầm khen ngợi sự nhạy bén chính trị.\n\n-> system_awakening\n\n=== system_awakening ===\n# BACKGROUND: bg_void_golden\n# MUSIC: bgm_system_activation\n# EFFECT: screen_flash|#FFD700|1000\n# EFFECT: sfx_system_chime\n\n~ system_awakened = true\n~ has_anh_hon_lenh = true\n\n【 CÀN KHÔN ĐẢO CHUYỂN · THIÊN CƠ KÍCH HOẠT 】\n\n⟨ Cảm ứng: Hùng tài đại lược · Trí tuệ thấu suốt càn khôn ⟩\n⟨ Khởi động: Thượng Cổ Bái Tướng Thần Đàn ⟩\n⟨ Ban tặng vật phẩm: Thượng Cổ Anh Hồn Lệnh × 1 ⟩\n\n# EFFECT: show_toast|🎉 THỨC TỈNH THIÊN CƠ: Tiếp nhận Thượng Cổ Anh Hồn Lệnh|system\n# EFFECT: grant_ticket|1\n\nMột cỗ hàn khí hùng hồn hòa cùng kim quang chói lòa tràn vào đan điền Quý Bình An. Trong lòng bàn tay hắn, phiến Thượng Cổ Anh Hồn Lệnh bằng đồng khắc long phụng ngưng tụ thành thực thể, tỏa ra uy áp ngập tràn.\n\n[THIÊN CƠ HỆ THỐNG]: Ký chủ đã bước qua ngưỡng cửa sinh tử, đoạt lấy thiên mệnh. Kể từ giờ phút này, có thể chiêu mộ chiến thần, mưu sĩ ngàn năm về dưới trướng!\n\n-> chapter_1_aftermath\n\n=== chapter_1_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_night_contemplation\n# ACTORS: qui_binh_an|right|determined\n\n~ chapter = 1\n~ met_to_kien_phong = true\n\nĐêm khuya tẩm thất phò mã phủ. Ánh trăng lạnh rọi qua song cửa sổ, chiếu lên phiến Thượng Cổ Anh Hồn Lệnh nằm trên bàn gỗ đàn hương.\n\nQuý Bình An đứng chắp tay nhìn ra màn đêm kinh đô mịt mùng:\n\n\"Vũ Hoàng ngoài mặt khen thưởng nhưng ánh mắt đầy vẻ thăm dò kiêng kỵ. Còn Nam Ly chịu nhục tại điện tiền ắt sẽ giở thủ đoạn ám sát hoặc gây hấn biên cương...\"\n\n\"Không thể chần chừ thêm nữa. Phải mau chóng khởi động Bái Tướng Thần Đàn, chiêu mộ võ tướng trấn giữ cơ đồ!\"\n\n# EFFECT: show_toast|📜 HOÀN TẤT HỒI 1: Phò Mã Thức Tỉnh & Đối Thơ Chấn Kinh Đô|milestone\n# EFFECT: chapter_complete|1\n\n-> chapter_5_transition\n\n// ============================================================\n// CHƯƠNG 5: MẬT THẤT PHÒ MÃ PHỦ & BÁI TƯỚNG ĐÀI\n// ============================================================\n\n=== chapter_5_transition ===\n# CHAPTER_TITLE: Hồi 2 · Chương 5: Bái Tướng Đài Khai Mở\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_mystical_summoning\n\n~ chapter = 5\n\nBốn ngày trôi qua kể từ yến tiệc đại điện. Quý Bình An dành trọn thời gian nắm bắt tình thế — Đại Vũ Hoàng Triều thù trong giặc ngoài, và sức mạnh bí ẩn của Thượng Cổ Bái Tướng Đàn.\n\nĐêm nay, trong mật thất sâu nhất của Phò Mã Phủ, phiến Anh Hồn Lệnh bỗng rung lên từng hồi chuông trầm hùng.\n\n[THIÊN CƠ HỆ THỐNG]: Địa mạch quy tụ. Thượng Cổ Bái Tướng Thần Đàn — Khai Mở!\n\n# EFFECT: screen_flash|#FFD700|800\n# EFFECT: sfx_gong_ancient\n\n~ unlocked_gacha = true\n# EFFECT: show_toast|🎉 KHAI MỞ: Bái Tướng Thần Đàn (Chiêu Mộ Danh Tướng)|unlock\n# EFFECT: unlock_feature|bai_tuong_dai\n\n[THIÊN CƠ HỆ THỐNG]: Ký chủ có thể tế xuất Anh Hồn Lệnh để thỉnh triệu anh linh danh tướng thời Tam Quốc quy vị.\n\n* [Thiên Cơ · Khởi Động Bái Tướng Thần Đàn: \"Thượng Cổ Bái Tướng Đài, phụng mệnh ta triệu hoán danh tướng ngàn năm quy vị!\"]\n  # EFFECT: trigger_gacha|bai_tuong_dai\n  -> waiting_gacha_ritual\n\n=== waiting_gacha_ritual ===\n// Trạng thái chờ người chơi thao tác trên Bái Tướng Đài\nKhai mở thần đàn tế tướng...\n-> END\n\n=== trieu_van_arrival ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# ACTORS: qui_binh_an|right|amazed, trieu_van|left|noble\n# MUSIC: bgm_hero_theme\n\n~ affinity_trieu_van = 50\n\nÁnh sáng bạc ngân lóe lên rực rỡ, sương khói ngưng tụ thành thân ảnh một vị dũng tướng oai phong lẫm liệt.\n\nGiáp bạc sáng loáng, bạch bào tung bay, tay cầm Long Đảm Lượng Ngân Thương tỏa ra chiến ý ngút trời.\n\nTriệu Tử Long — Thường Sơn Triệu Vân — quỳ một gối, thương cắm thẳng xuống sàn đá, giọng nói sang sảng chấn động mật thất:\n\n\"Triệu Vân, Triệu Tử Long, bái kiến Chúa Công!\"\n\nQuý Bình An xúc động tiến lên đỡ lấy hai tay Tử Long: \"Tử Long mau bình thân! Có ngươi bên cạnh, Quý Bình An ta hà tất phải sợ chông gai nghịch cảnh!\"\n\nTriệu Vân ngẩng đầu, ánh mắt kiên định như thiết thạch: \"Tử Long nguyện đem Long Đảm Thương bảo hộ Chúa Công, dù đối mặt vạn mã thiên quân cũng quyết không lùi nửa bước!\"\n\nMũi thương khẽ rung — bảy đạo thương ảnh hóa thành hàn quang xé toang hư không, xuyên qua bảy trụ đá mật thất trong chớp mắt mà không làm vỡ một viên ngói. Đó chính là Thất Thám Bàn Xà Thương Pháp cái thế vô song!\n\nQuý Bình An nhìn Triệu Tử Long đứng sừng sững trong phò mã phủ, trung trinh và sẵn sàng đẫm máu sa trường: \"Tử Long, muốn nuôi quân đúc giáp thì ngân quỹ phải dồi dào. Ngày mai đến Thiên Kim Lâu bàn chuyện làm ăn!\"\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 5: Chiêu Mộ Thường Sơn Triệu Tử Long SSR|milestone\n# EFFECT: chapter_complete|5\n\n-> chapter_8_transition\n\n// ============================================================\n// CHƯƠNG 8: THIÊN KIM LÂU & THẤU HOA CAO\n// ============================================================\n\n=== chapter_8_transition ===\n# CHAPTER_TITLE: Hồi 3 · Chương 8: Phát Minh Thấu Hoa Cao\n# BACKGROUND: bg_thien_kim_lau\n# MUSIC: bgm_marketplace\n# ACTORS: qui_binh_an|right|clever, ve_ti_vu|left|curious\n\n~ chapter = 8\n~ met_ve_ti_vu = true\n\nBa ngày sau khi chiêu mộ Triệu Vân.\n\nQuý Bình An ngồi trên lầu cao nhất của Thiên Kim Lâu — tửu lâu lớn nhất kinh đô, do lâu chủ Vệ Ti Vũ phong hoa tuyệt đại điều hành.\n\nHắn đặt lên bàn một chiếc hộp sơn mài — bên trong là thanh xà phòng ngát hương hoa nhài, mịn màng như ngọc thạch — bảo vật hắn đã bí mật điều chế từ nguyên liệu thảo dược tự nhiên.\n\n\"Vệ lâu chủ, thương phẩm này... sẽ khiến cả kinh đô điên đảo.\"\n\nVệ Ti Vũ khẽ ngửi làn hương thanh khiết, đôi mắt phượng sáng rực: \"Hương thơm thoát tục, trơn láng như mỡ đông. Phò mã gia, đây là kỳ trân dị bảo gì?\"\n\n\"Thấu Hoa Cao. Rửa sạch bụi trần, lưu hương bảy ngày, dưỡng nhan tuyệt phẩm. Mỗi bánh giá mười lượng bạc dành riêng cho vương tôn quý tộc.\"\n\n* [Hợp Tác Toàn Diện · Bắt tay cùng Vệ Ti Vũ: \"Ta xuất bí phương độc quyền, lâu chủ lo mạng lưới phân phối, lợi nhuận chia đôi!\"]\n  ~ gold += 3000\n  ~ unlocked_soap = true\n  \"Ta cung cấp công thức độc quyền, Thiên Kim Lâu lo vận chuyển và tiêu thụ. Lợi nhuận chia đều.\"\n  Vệ Ti Vũ khẽ cười quyến rũ, nâng chén rượu chúc mừng: \"Phò mã gia quả là bậc kỳ tài ẩn nhẫn. Thương vụ này, tiện thiếp nhận!\"\n  # EFFECT: show_toast|🎉 MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+3.000 Vàng mỗi lượt Sa Bàn)|unlock\n  # EFFECT: unlock_feature|thau_hoa_cao\n  -> chapter_8_aftermath\n\n* [Ẩn Nhẫn Tự Chủ · Lập xưởng chế tạo riêng: \"Bí phương chưa thể để lộ ra ngoài, tạm thời sản xuất quy mô nhỏ tích lũy thực lực.\"]\n  ~ gold += 1000\n  ~ unlocked_soap = true\n  \"Chưa vội khuếch trương. Ta sẽ thăm dò thị trường trước, từng bước tích súc ngân quỹ.\"\n  # EFFECT: show_toast|🎉 MỞ KHÓA: Phường Đúc Thấu Hoa Cao (+1.000 Vàng mỗi lượt)|unlock\n  # EFFECT: unlock_feature|thau_hoa_cao\n  -> chapter_8_aftermath\n\n=== chapter_8_aftermath ===\n# ACTORS: qui_binh_an|right|satisfied\n\nNguồn hoàng kim ròng rã bắt đầu chảy vào túi phò mã phủ. Có tiền, có tướng — Quý Bình An đã đặt viên đá tảng đầu tiên cho đại nghiệp tranh bá. Hắn âm thầm mở rộng tai mắt khắp các ngõ ngách kinh thành.\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 8: Phát Minh Thấu Hoa Cao Kinh Doanh|milestone\n# EFFECT: chapter_complete|8\n\n-> chapter_10_transition\n\n// ============================================================\n// CHƯƠNG 10: THÍCH KHÁCH ĐÊM TRĂNG\n// ============================================================\n\n=== chapter_10_transition ===\n# CHAPTER_TITLE: Hồi 4 · Chương 10: Thích Khách Đêm Trăng\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_suspense_night\n# ACTORS: qui_binh_an|right|alarmed\n\n~ chapter = 10\n\nĐêm rằm gió lộng. Phò Mã Phủ tịch mịch như tờ.\n\nQuý Bình An đang nghiên cứu bản đồ địa hình trong thư phòng thì một luồng sát khí lạnh buốt gáy ập tới! Ba đạo bóng đen xé gió lao xuống từ xà nhà — lưỡi đoản đao tẩm độc xanh biếc nhằm thẳng yếu huyệt của hắn!\n\n* [Sát Phạt · Hét gọi Triệu Vân: \"Tử Long, lưu lại kẻ sống!\"]\n  -> assassin_zhao_yun_saves\n\n* [Quyền Mưu · Lâm nguy không loạn: Phán đoán phương vị mũi đao, né tránh hiểm cảnh tìm chỗ sơ hở!]\n  -> assassin_self_dodge\n\n=== assassin_zhao_yun_saves ===\n# EFFECT: sfx_spear_whoosh\n# EFFECT: screen_flash|#C0C0C0|300\n# EFFECT: camera_shake|0.5\n# ACTORS: trieu_van|left|battle_stance, assassin|center|attacking\n\n\"TỬ LONG!\"\n\nThanh âm chưa dứt, một dải ngân hà rực sáng đã xé toang màn đêm — Long Đảm Thương xuất kích!\n\nTriệu Vân tựa như thần phong giáng thế. Ba mũi thương điểm chuẩn xác vào cổ tay thích khách, đánh bay binh khí, đá văng bọn chúng xuống sàn đá!\n\n\"Chúa Công, bọn chúng là tử sĩ chuyên nghiệp!\"\n\n~ affinity_trieu_van += 15\n-> assassin_aftermath\n\n=== assassin_self_dodge ===\n# ACTORS: qui_binh_an|right|rolling, assassin|center|attacking\n# EFFECT: camera_shake|0.3\n\nQuý Bình An xoay người ngã nhào ra sau bức bình phong gỗ lim, lưỡi đao độc chém toạc vạt áo!\n\nThích khách thứ hai vừa vung đao bồi tiếp thì hàn quang lóe lên! Long Đảm Thương của Triệu Vân quét ngang, đánh gãy xương sườn thích khách hất văng ra sân!\n\n~ affinity_trieu_van += 10\n-> assassin_aftermath\n\n=== assassin_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_investigation\n# ACTORS: qui_binh_an|right|serious, trieu_van|left|reporting\n\nTriệu Vân xốc ngược cánh tay thích khách: \"Bọn chúng đều cắn vỡ độc hoàn tự sát. Nhưng trên cổ tay có ấn triện hình đầu sói — đây là mật vụ thuộc Phi Báo Quân của Bắc Cương!\"\n\nHắn nhìn Quý Bình An trầm trọng: \"Chúa Công, có kẻ trong triều cấu kết với phiên trấn phương Bắc muốn trừ khử ngài.\"\n\n* [Ẩn Nhẫn · Xóa sạch dấu vết: \"Bí mật chôn xác, dĩ bất biến ứng vạn biến, âm thầm truy vết kẻ chủ mưu.\"]\n  ~ suspicion -= 10\n  ~ gold += 2000\n  ch10_method = \"hide\"\n  -> chapter_10_complete\n\n* [Hoành Đao · Đối chất triều đình: \"Đem xác ném trước mặt trăm quan, bức kẻ giấu mặt phải lộ sơ hở!\"]\n  ~ suspicion += 20\n  ~ gold += 5000\n  ch10_method = \"confront\"\n  -> chapter_10_complete\n\n* [Quân Cơ · Thám thính biên cương: \"Sát thủ mang dấu vết phương Bắc, lập tức sai thám mã cấp báo tiền tuyến!\"]\n  ~ suspicion += 5\n  ch10_method = \"investigate\"\n  -> chapter_10_complete\n\n=== chapter_10_complete ===\nQuý Bình An nhìn dấu ấn đầu sói trên cổ tay tử sĩ, ánh mắt lạnh như băng. Kinh đô đã là lò lửa, chỉ có nắm lấy binh quyền mới mong bảo toàn gia tộc và xoay chuyển càn khôn!\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 10: Thích Khách Đêm Trăng|milestone\n# EFFECT: chapter_complete|10\n\n-> chapter_15_transition\n\n// ============================================================\n// CHƯƠNG 15: VŨ HOÀNG HẠ CHỈ BẮC CHINH\n// ============================================================\n\n=== chapter_15_transition ===\n# CHAPTER_TITLE: Hồi 5 · Chương 15: Chinh Phạt Bắc Cảnh\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_decree\n# ACTORS: vu_hoang|center|commanding, qui_binh_an|right|kneeling\n\n~ chapter = 15\n\nĐại điện Kim Loan sớm hôm sau. Vũ Hoàng ngự trên ngai vàng, sắc diện ngập tràn phẫn nộ:\n\n\"Bắc Cương phản nghịch! Phi Báo Quân liên kết với nghịch tặc Địch Hỏa công hãm ba huyện, chém chết quan trấn thủ, uy hiếp kinh kỳ!\"\n\nVũ Hoàng rút ra Thượng Phương Bảo Kiếm, ánh mắt dừng lại trên người Quý Bình An:\n\n\"Quý Bình An! Phụ thân ngươi từng trấn thủ phương Bắc, ngươi lại có dũng khí phi thường. Trẫm lệnh ngươi tiếp nhận chức Chinh Bắc Tiền Phong Tướng Quân, lập tức xuất chinh dẹp loạn!\"\n\n# EFFECT: screen_flash|#FFD700|500\n# EFFECT: sfx_imperial_decree\n\n~ unlocked_map = true\n~ imperial_prestige += 1\n~ gold += 5000\n~ jade += 20\n~ suspicion += 5\n~ affinity_trieu_van += 5\n\n# EFFECT: show_toast|🎉 KHAI MỞ: Tầng 2 — Sơn Hà Sa Bàn (Grand Strategy)|unlock\n# EFFECT: unlock_feature|de_nghiep_sa_ban\n\n[THIÊN CƠ HỆ THỐNG]: Khai mở Tầng 2 — Sơn Hà Sa Bàn! Cho phép điều binh khiển tướng, bố trí quân lương và tuần tra các cứ điểm trọng yếu.\n\nQuý Bình An quỳ nhận Hổ Phù bằng đồng, ánh mắt sáng rực. Bên cạnh hắn, Triệu Tử Long nắm chặt chuôi thương — đại thời đại tranh bá chính thức bắt đầu!\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 15: Tiếp Nhận Thánh Chỉ Bắc Chinh|milestone\n# EFFECT: chapter_complete|15\n\n-> chapter_20_start\n",
    "ch16_52": "// ============================================================\n// Trấn Quốc Phò Mã Gia — Ink Scene Script\n// Phần 2: Từ Chương 16 đến Chương 52 (Hồi 1 Hoàn Tất)\n// ============================================================\n\n// ============================================================\n// CHƯƠNG 20: BIÊN CƯƠNG TUYẾN ĐẦU & HÃM TRẬN DOANH (CAO THUẬN)\n// ============================================================\n\n=== chapter_20_start ===\n# CHAPTER_TITLE: Hồi 6 · Chương 20: Hãm Trận Dũng Sĩ Biên Cương\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_military_march\n# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard, gao_shun|left|stern\n\n~ chapter = 20\n\nGió lạnh phương Bắc gào thét qua ải Nhạn Môn, cuốn theo cát bụi sương mù mịt mù.\n\nQuý Bình An khoác chiến bào đứng trên vọng lâu tiền tiêu quân doanh Bắc Cương. Sau lưng hắn, Triệu Tử Long uy dũng khôi giáp, Long Đảm Thương cắm thẳng bên bàn cờ sa bàn.\n\nPhía đối diện, một vị chiến tướng khoác hắc giáp nặng trĩu, phong trần sương gió, nét mặt nghiêm cẩn tựa như tảng đá ngàn năm, hai tay ôm quyền thi lễ:\n\n\"Bắc Cương tiền phong thống lĩnh Cao Thuận, bái kiến Phò mã đại tướng quân!\"\n\nCao Thuận — thống soái Hãm Trận Doanh nức tiếng Tam Quốc, tám trăm dũng sĩ cảm tử trang bị giáp trụ tinh lương, mỗi trận xông pha đều bạt núi phá lũy, tính tình trầm mặc thanh liêm, tuyệt đối không vướng bụi trần.\n\n\"Bẩm Phò mã, chiến giáp hư hại bốn phần, lương thảo triều đình cấp phát trễ hai tháng. Nhưng tám trăm huynh đệ Hãm Trận Doanh thề chết giữ vững cửa ải, quyết không lùi nửa bước!\"\n\n-> gao_shun_decision\n\n=== gao_shun_decision ===\n# SCENE_TYPE: choice\n\nQuý Bình An mở rương bạc vàng — đây chính là nguồn lợi nhuận kếch xù thu hoạch từ việc kinh doanh Thấu Hoa Cao tại kinh thành:\n\n* [Kinh Tài · Dốc 5.000 Vàng rèn đúc chiến giáp: \"Xuất ngân quỹ cá nhân, mở lò rèn đúc giáp khiên thép tôi tốt nhất cho Hãm Trận Doanh!\"]\n  ~ gold -= 5000\n  ~ affinity_gaoshun += 25\n  ~ unlocked_granary = true\n  Quý Bình An vung tay hạ lệnh: \"Mở lò rèn suốt ngày đêm! Tám trăm dũng sĩ Hãm Trận Doanh phải được trang bị hắc giáp và thuẫn thép cứng cáp nhất!\"\n  Cao Thuận quỳ rạp xuống nền đá, giọng nói nghẹn ngào chấn động: \"Mạt tướng thay mặt tám trăm huynh đệ, thề đem tính mạng báo đáp ân tri ngộ của Phò mã gia!\"\n  # EFFECT: show_toast|🎉 MỞ KHÓA THẺ BÀI: Hãm Trận Doanh (SSR Thuẫn Vệ)|unlock\n  # EFFECT: unlock_feature|feature_ham_tran_doanh\n  -> chapter_20_complete\n\n* [Quân Cơ · Kết hợp chiến thuật Kỵ - Bộ: \"Triệu Tử Long dẫn Bạch Mã Kỵ phối hợp Hãm Trận Doanh luyện thế bọc sườn chặn đầu!\"]\n  ~ affinity_gaoshun += 15\n  ~ affinity_trieu_van += 15\n  Triệu Vân tuốt gươm hưởng ứng: \"Chúa Công nhìn xa trông rộng! Kỵ binh tập kích mạn sườn, bộ binh thiết giáp chặn đầu, kẻ địch ắt tan như tro bụi!\"\n  # EFFECT: show_toast|⚔️ Sĩ Khí Ba Quân Tăng Cao (+20% Uy Lực Bộ Kỵ)|buff\n  -> chapter_20_complete\n\n=== chapter_20_complete ===\nThiết giáp Hãm Trận và kỵ binh Tử Long đã hợp nhất, Quý Bình An hạ lệnh nhổ trại tiến quân về thung lũng Hắc Phong!\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 20: Thu Phục Cao Thuận & Hãm Trận Doanh|milestone\n# EFFECT: chapter_complete|20\n\n-> chapter_27_transition\n\n// ============================================================\n// CHƯƠNG 27: ĐỘC SĨ GIẢ HỦ XUẤT THẾ (MƯU KHÁCH PHỦ)\n// ============================================================\n\n=== chapter_27_transition ===\n# CHAPTER_TITLE: Hồi 7 · Chương 27: Độc Sĩ Giả Hủ Hiến Kế\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious\n\n~ chapter = 27\n\nĐêm khuya tại mật trướng soái phủ. Ánh đuốc bập bùng soi rọi tấm địa đồ sông Hoài Hà và Thanh Thủy.\n\nMột bóng người trung niên khoác trường bào màu xám tro chậm rãi bước vào. Đôi mắt thâm sâu như đầm lầy vạn trượng, nụ cười nửa miệng như thấu suốt mọi mưu mô nhân gian:\n\n\"Thảo dân Giả Hủ, tự Văn Hòa, bái kiến Phò mã gia.\"\n\n~ met_gia_hu = true\n\nQuý Bình An khẽ chấn động: \"Giả Hủ? Độc Sĩ Giả Hủ mưu định Tam Quốc?!\"\n\nGiả Hủ bước tới bên sa bàn, ngón tay gầy gò điểm thẳng vào khúc quanh hiểm trở của sông Thanh Thủy:\n\n\"Nghịch tặc Địch Hỏa đã bí mật liên kết thổ phỉ Bắc Cương, toan tính nội trong ba ngày sẽ vây khốn quân doanh Phò mã tại hẻm núi Hắc Phong. Kế sách có ba đường, tùy Phò mã định đoạt.\"\n\n-> jia_xu_stratagem_choice\n\n=== jia_xu_stratagem_choice ===\n# SCENE_TYPE: choice\n\nGiả Hủ từ tốn mở tấm lụa mật đồ:\n\n* [Độc Kế · Nhử địch vào tử địa hẻm núi, dùng hỏa dược và tên độc tiêu diệt hoàn toàn]\n  ~ suspicion += 15\n  ~ affinity_gia_hu += 25\n  ~ gold += 20000\n  Quý Bình An ánh mắt sắc lạnh: \"Dùng độc kế! Trong chiến trận, nhân từ với kẻ địch chính là tàn nhẫn với tướng sĩ của mình!\"\n  Giả Hủ khen ngợi: \"Quyết đoán phi thường! Giả vờ vứt bỏ doanh trại, nhử năm vạn quân địch chen chúc vào hẻm núi rồi chặn hai đầu phóng hỏa!\"\n  # EFFECT: show_toast|🔥 MỞ KHÓA MƯU KẾ: Hỏa Công Bẫy Độc (Giả Hủ)|unlock\n  # EFFECT: unlock_feature|feature_poison_stratagem\n  -> chapter_27_complete\n\n* [Phản Gián · Tung mật thư giả ly gián tướng soái địch tự sát hại lẫn nhau]\n  ~ gold -= 3000\n  ~ affinity_gia_hu += 20\n  ~ suspicion -= 5\n  \"Dùng mưu phản gián, cho nội gián mang mật thư giả mua chuộc phó tướng Nam Ly, khiến chúng nghi kỵ tương tàn.\"\n  Giả Hủ vuốt râu: \"Mượn đao giết người không dính máu, bảo toàn sinh lực ba quân.\"\n  # EFFECT: show_toast|📜 MỞ KHÓA THẺ BÀI: Phản Gián Kế & Ly Gián Kế|unlock\n  # EFFECT: unlock_feature|feature_counter_espionage\n  -> chapter_27_complete\n\n* [Vương Đạo · Đích thân dẫn chủ lực tập kích chính diện bắt sống tướng địch]\n  ~ affinity_trieu_van += 20\n  ~ affinity_gia_hu += 5\n  ~ suspicion -= 10\n  \"Tử Long xông pha bắt sống đầu sỏ, phân hóa quân giặc, khoan dung cho hàng binh.\"\n  Triệu Vân từ ngoài bước vào, hào khí ngút trời: \"Chúa Công nhân đức, Tử Long nguyện đạp bằng vạn quân bắt sống Địch Hỏa!\"\n  -> chapter_27_complete\n\n=== chapter_27_complete ===\nLệnh cho toàn quân tuyệt đối giữ bí mật, đêm nay lập tức di chuyển trận địa theo mưu kế!\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 27: Độc Sĩ Giả Hủ Hiến Kế|milestone\n# EFFECT: chapter_complete|27\n\n-> chapter_35_transition\n\n// ============================================================\n// CHƯƠNG 35: ĐẠI KẾ THỦY CÔNG DÒNG THANH THỦY\n// ============================================================\n\n=== chapter_35_transition ===\n# CHAPTER_TITLE: Hồi 8 · Chương 35: Đại Kế Thủy Công Dòng Thanh Thủy\n# BACKGROUND: bg_thanh_thuy_river_dam\n# AMBIENT: rain\n# MUSIC: bgm_river_roaring\n# ACTORS: qui_binh_an|right|observing, jia_xu|left|pointing, trieu_van|right|standing_guard\n\n~ chapter = 35\n\nMùa mưa phương Bắc trút nước như thác đổ. Dòng sông Thanh Thủy đỏ ngầu phù sa cuộn sóng gầm thét như rồng lội.\n\nQuý Bình An cùng Giả Hủ đứng trên đỉnh đập đất thượng nguồn ngắm nhìn hạ lưu. Ba mươi dặm phía trước chính là sào huyệt kiên cố nhất của năm vạn phản quân do Địch Hỏa trấn giữ.\n\nGiả Hủ chỉ xuống dòng nước xiết: \"Chúa Công, nếu ta đắp đập ngăn sông bảy ngày, đợi lũ thượng nguồn dâng cao rồi bất thần xả đập, toàn bộ chiến xa và thành lũy của Địch Hỏa sẽ chìm trong biển nước. Một trận định càn khôn!\"\n\n-> flood_preparation_choice\n\n=== flood_preparation_choice ===\n# SCENE_TYPE: choice\n\n* [Nhân Nghĩa · Bí mật di tản dân lành hạ lưu trước ba ngày: \"Muốn thắng giặc nhưng không giẫm lên xương máu bách tính vô tội!\"]\n  ~ gold -= 3000\n  ~ affinity_trieu_van += 25\n  ~ suspicion -= 10\n  ~ unlocked_flood = true\n  Quý Bình An quả quyết: \"Ta muốn lập công, nhưng tuyệt đối không biến vạn dân vô tội thành mồi cho cá bèo! Xuất 3.000 Vàng, lệnh cho Tử Long âm thầm di dời toàn bộ thôn làng hạ lưu lên gò cao!\"\n  Triệu Vân xúc động ôm quyền: \"Chúa Công lấy đức phục nhân, Tử Long dù thức trắng ba đêm cũng quyết hộ tống bá tánh an toàn!\"\n  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Xả Lũ Sông Thanh Thủy (Tầng 3 Combat)|unlock\n  # EFFECT: unlock_feature|feature_water_stratagem\n  -> chapter_35_complete\n\n* [Bá Đạo · Bất ngờ xả lũ ngay trong đêm mưa bão: \"Binh quý thần tốc! Đập vỡ thác tràn, hủy diệt toàn bộ chiến xa của địch!\"]\n  ~ suspicion += 20\n  ~ affinity_gia_hu += 20\n  ~ unlocked_flood = true\n  \"Địch Hỏa quỷ quyệt, nếu sơ hở ắt mất đại cục. Khóa chặt mọi ngả đường, đúng giờ Tý phá đập!\"\n  # EFFECT: show_toast|🌊 MỞ KHÓA THỦY CÔNG: Bạo Lũ Phá Đập (Sát Thương Chí Mạng)|unlock\n  # EFFECT: unlock_feature|feature_water_stratagem\n  -> chapter_35_complete\n\n=== chapter_35_complete ===\nBố trí tử sĩ canh giữ van xả lũ thượng nguồn, chờ thời khắc quyết chiến phát lệnh công thành!\n\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 35: Đại Kế Thủy Công Dòng Thanh Thủy|milestone\n# EFFECT: chapter_complete|35\n\n-> chapter_43_transition\n\n// ============================================================\n// CHƯƠNG 43: VẠN THẠCH QUÂN LƯƠNG TIỀN TUYẾN\n// ============================================================\n\n=== chapter_43_transition ===\n# CHAPTER_TITLE: Hồi 9 · Chương 43: Vạn Thạch Quân Lương Tiền Tuyến\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_logistics_busy\n# ACTORS: qui_binh_an|right|armored, gao_shun|left|reporting\n\n~ chapter = 43\n\nHàng trăm cỗ xe ngựa chở đầy bao tải quân lương nối đuôi nhau rầm rộ tiến vào tổng hành dinh Bắc Cương.\n\nCao Thuận cầm thẻ trúc kiểm kê, ánh mắt lộ vẻ hân hoan hiếm thấy: \"Khởi bẩm Phò mã gia! Toàn bộ năm vạn hộc lương thực đã vận chuyển nhập kho an toàn. Kho lương hiện tại đủ cung ứng cho mười vạn quân trong suốt một năm!\"\n\n~ rations += 50000\n~ jade += 10\n~ gold -= 2000\n~ affinity_gaoshun += 15\n~ affinity_trieu_van += 15\n\nQuý Bình An ban thưởng rượu thịt cho toàn quân, trích năm ngàn hộc lương cứu đói cho bá tánh chạy loạn. Tiếng tung hô của vạn quân vang dội núi rừng, sĩ khí đạt mức cực hạn!\n\n# EFFECT: show_toast|🌾 QUÂN LƯƠNG ĐẠT 50.000 HỘC — Sĩ Khí Ba Quân Cực Hạn|reward\n# EFFECT: show_toast|📜 HOÀN THÀNH CHƯƠNG 43: Vạn Thạch Quân Lương Tiền Tuyến|milestone\n# EFFECT: chapter_complete|43\n\n-> chapter_48_transition\n\n// ============================================================\n// CHƯƠNG 48-52: ĐẠI CHIẾN THANH CHÂU & KHẢI HOÀN HỒI TRIỀU\n// ============================================================\n\n=== chapter_48_transition ===\n# CHAPTER_TITLE: Hồi 10 · Chương 48-52: Khúc Tráng Ca Thanh Châu — Đại Phá Địch Hỏa\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: qui_binh_an|right|battle_armor, trieu_van|right|spear_ready, gao_shun|left|shield_wall, jia_xu|left|observing\n\n~ chapter = 48\n\nThành Thanh Châu rung chuyển dữ dội dưới làn mưa tên bốc lửa và đá tảng ném công thành. Dưới chân thành, năm vạn phản quân do dũng tướng Địch Hỏa chỉ huy dàn trận đen kịt như sóng thần. Mười cỗ Xe Đục Thành bọc thép dày ầm ầm húc thẳng vào cổng thành chính!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_siege_ram_hit\n# EFFECT: screen_flash|#FFD700|600\n\nĐịch Hỏa vung thanh Bạo Liệt Đao gầm vang: \"Quý Bình An! Hôm nay ta sẽ san phẳng Thanh Châu, lấy đầu ngươi tế cờ!\"\n\nQuý Bình An đứng uy nghiêm trên đỉnh thành, áo choàng đỏ tung bay trong bão gió: \"Tướng sĩ Đại Vũ! Hôm nay là ngày định đoạt vận mệnh non sông! Giương cờ phát lệnh quyết chiến!\"\n\n# EFFECT: trigger_battle|battle_ch48_thanh_chau\n\n-> thanh_chau_epic_battle\n\n=== thanh_chau_epic_battle ===\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_triumph_sunrise\n# ACTORS: qui_binh_an|right|triumphant, trieu_van|right|bowing, gao_shun|left|kneeling, jia_xu|left|satisfied\n\nĐúng thời khắc nguy nan, cờ hiệu xả lũ phất lên!\n\nNước sông Thanh Thủy như ngàn con rồng cuộn trào ập xuống thung lũng, nhấn chìm toàn bộ chiến xa đục thành của địch! Triệu Tử Long tung người xuống ngựa, đơn thương độc mã xông thẳng vào vòng vây bắt sống Địch Hỏa giữa dòng nước xiết!\n\n# EFFECT: sfx_victory_fanfare\n# EFFECT: screen_flash|#FFFFFF|1000\n\nNăm vạn phản quân tan rã hoàn toàn. Chiến kỳ Đại Vũ bay ngạo nghễ trên đỉnh ải Thanh Châu!\n\n~ gold += 20000\n~ rations += 50000\n~ imperial_prestige += 2\n~ suspicion -= 15\n\nBắc Cương đại định, khói lửa tan biến! Toàn quân khải hoàn trở về kinh kỳ báo công!\n\n-> season_1_finale\n\n=== season_1_finale ===\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: vu_hoang|center|impressed, qui_binh_an|right|kneeling_hero\n\nKinh đô Kim Loan Điện rợp cờ hoa gấm vóc đón mừng đoàn quân Chinh Bắc khải hoàn.\n\nVũ Hoàng đích thân rời khỏi Cửu Long Bảo Tọa, bước xuống thềm ngọc đỡ lấy hai tay Quý Bình An:\n\n\"Trẫm quả nhiên không nhìn lầm ngươi! Từ một phò mã hàn vi, ngươi đã lập nên chiến công cái thế ngút trời cho Đại Vũ triều!\"\n\n\"Truyền chỉ trẫm! Thăng phong Quý Bình An làm CHINH BẮC ĐẠI TƯỚNG QUÂN, ban kim ấn tử thụ, thống lĩnh mười vạn cấm quân!\"\n\n# EFFECT: screen_flash|#FFD700|1200\n# EFFECT: sfx_gong_ancient\n\n[THIÊN CƠ HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ! Hoàn thành toàn vẹn HỒI 1 (Chương 1 ➔ Chương 52)!\n[THIÊN CƠ HỆ THỐNG]: Mở khóa tôn hiệu: Chinh Bắc Đại Tướng Quân. Uy danh triều đình đạt Cấp 4!\n\nĐây chỉ là khởi đầu của con đường định đoạt giang sơn thiên hạ!\n\n# EFFECT: show_toast|🏆 TOÀN BỘ HỒI 1 ĐẠI KHẢI HOÀN (CHƯƠNG 1 - 52)!|triumph\n# EFFECT: chapter_complete|52\n\n-> END\n"
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
