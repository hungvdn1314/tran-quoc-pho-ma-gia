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
      "id": "hero_matac",
      "name": "Mã Tắc",
      "aliases": [
        "Ma Su",
        "Mã Ấu Thường"
      ],
      "rarity": "SR",
      "faction": "Quý Gia / Quý Bình An",
      "realm": "Phàm Nhân",
      "base_stats": {
        "force": 50,
        "command": 70,
        "intelligence": 82,
        "politics": 74,
        "charisma": 65
      },
      "hp": 900,
      "atk": 85,
      "troop_type": "Trung Quân Binh",
      "cost": 4.5,
      "troop_affinity": {
        "Trung Quân Binh": "A"
      },
      "equipment": [
        {
          "id": "eq_thuthich",
          "name": "Thư Sinh Thiết Kiếm",
          "type": "weapon",
          "stat_bonus": {
            "force": 3
          },
          "description": "Binh thư thao lược."
        }
      ],
      "skills": [
        {
          "id": "sk_binh_thu",
          "name": "Binh Thư Giảng Luận",
          "type": "active",
          "mana_cost": 2,
          "damage": 120,
          "effects": [
            "Buff ally"
          ],
          "description": "Đàm luận thao lược binh thư, tăng sát thương cho toàn quân."
        },
        {
          "id": "sk_tu_bo_thanh",
          "name": "Tu Bổ Thành Phòng",
          "type": "passive",
          "effects": [
            "Add shield"
          ],
          "description": "Gia cố và tu bổ thành phòng vững chắc, tăng giáp cho thành trì."
        }
      ],
      "bonds": [
        {
          "id": "bnd_muu_than",
          "name": "Vạn Kim Mưu Sĩ",
          "required_heroes": [],
          "bonus": {
            "int_pct": 10.0
          },
          "is_active": false
        }
      ],
      "summon_chapter": 17,
      "novel_first_appearance": 17
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
      "summon_chapter": 200,
      "novel_first_appearance": 200
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
  "canon_heroes": [
    {
      "id": "trieu_van",
      "name": "Triệu Vân",
      "courtesyName": "Tử Long",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Tuyệt Thế Tiên Phong",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 1,
      "loyalty": 100,
      "baseStats": {
        "force": 85,
        "command": 92,
        "intelligence": 76,
        "politics": 65
      },
      "weapon": {
        "name": "Long Đảm Lượng Ngân Thương",
        "costGold": 10000,
        "forceBonus": 7,
        "specialEffect": "Kích hoạt Thương Nhân Hợp Nhất (+2 Võ Lực vĩnh viễn)"
      },
      "skills": [
        {
          "name": "Bách Điểu Triều Phượng Thương",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Thất Thám Bàn Xà Thương",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Dũng Giả Không Sợ",
        "costGold": 100000,
        "forceBonus": 12,
        "description": "Gan góc phi thường, không sợ sinh tử. Đối mặt tuyệt cảnh tăng gấp đôi chiến lực! Phá trần võ lực lên Đế Cấp."
      },
      "mount": {
        "name": "Dạ Chiếu Ngọc Sư Tử (Ngọc Lan Bạch Long Câu)",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 8,
        "description": "Mang dòng máu Long Huyết (Long Mã), đầu sừng dài, bụng sinh vảy rồng."
      },
      "troopType": "Bạch Mã Nghĩa Tòng (3.000 Bạch Kỵ)",
      "quote": "Long Đảm Nhất Xuất, Thiên Quân Vạn Mã Tẫn Đoạn Hồn!",
      "lore": "Danh tướng đầu tiên được Quý Bình An triệu hoán từ Anh Hồn Lệnh lúc giải câu đối cứu nguy tại Đại Vũ Hoàng Cung.",
      "hostReturnForce": 12
    },
    {
      "id": "ma_tac",
      "name": "Mã Tắc",
      "courtesyName": "Ấu Thường",
      "primaryClass": "Mưu Thần",
      "role": "Quân Sư",
      "classRoleBadge": "Mưu Thần • Tham Mưu Lược Sĩ",
      "summonTier": "Vạn Kim",
      "chapterSummon": 17,
      "loyalty": 100,
      "baseStats": {
        "force": 50,
        "command": 70,
        "intelligence": 82,
        "politics": 74
      },
      "weapon": {
        "name": "Thư Sinh Thiết Kiếm",
        "costGold": 10000,
        "forceBonus": 3
      },
      "skills": [
        {
          "name": "Binh Thư Giảng Luận",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "Tập Kích Doanh Trại",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Cố Thủ Nhai Đình",
        "costGold": 100000,
        "forceBonus": 4,
        "description": "Tăng cường khả năng bố trí doanh trại trên cao điểm, tăng sát thương tiễn trận."
      },
      "mount": {
        "name": "Khoái Mã Tây Vực",
        "costGold": 30000,
        "percentBonus": 5,
        "forceBonus": 2
      },
      "troopType": "Trung Quân Trụ Trát Binh",
      "quote": "Ấu Thường nguyện vì chúa công mưu tính quân cơ!",
      "lore": "Mưu sĩ Vạn Kim đầu tiên, được phái đi tiếp quản Bắc cảnh tam châu trước khi Quý Bình An xuất chinh.",
      "hostReturnForce": 2
    },
    {
      "id": "co_hu",
      "name": "Cổ Hủ (Giả Hủ)",
      "courtesyName": "Văn Hòa",
      "primaryClass": "Mưu Thần",
      "role": "Độc Sĩ",
      "classRoleBadge": "Mưu Thần • Độc Sĩ Vô Song",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 27,
      "loyalty": 100,
      "baseStats": {
        "force": 40,
        "command": 86,
        "intelligence": 98,
        "politics": 90
      },
      "weapon": {
        "name": "Độc Sĩ Hắc Vũ Phiến",
        "costGold": 10000,
        "forceBonus": 3
      },
      "skills": [
        {
          "name": "Mưu Lợi Đoạt Tâm",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "Loạn Vũ Thiên Hạ",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Toán Vô Di Sách",
        "costGold": 100000,
        "forceBonus": 5,
        "description": "Bày mưu độc tuyệt đối không sai sót, địch nhân hỗn loạn mất sĩ khí, bản thân bất bại."
      },
      "mount": {
        "name": "Hắc Ô Mã",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Hắc Dạ Điệp Vệ",
      "quote": "Mưu sĩ mưu lợi, Độc Sĩ mưu thân. Kế độc nhất là kế bảo toàn tính mạng Chúa Công!",
      "lore": "Đệ nhất Độc Sĩ Tam Quốc, được triệu hoán bằng 10 vạn kim từ tiền Thiên Kim Lâu.",
      "hostReturnForce": 5
    },
    {
      "id": "dien_vi",
      "name": "Điển Vi",
      "courtesyName": "Cổ Chi Ác Lai",
      "primaryClass": "Võ Tướng",
      "role": "Thiết Vệ",
      "classRoleBadge": "Võ Tướng • Cổ Chi Ác Lai",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 63,
      "loyalty": 100,
      "baseStats": {
        "force": 88,
        "command": 68,
        "intelligence": 38,
        "politics": 25
      },
      "weapon": {
        "name": "Tấn Thiết Song Kích",
        "costGold": 10000,
        "forceBonus": 6,
        "description": "Tay trái nặng 39 cân, tay phải nặng 41 cân (tổng 80 cân)."
      },
      "skills": [
        {
          "name": "Khu Hổ Quyền",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Ác Lai Bạo Kích",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Cổ Chi Ác Lai / Tử Thủ Hộ Chủ",
        "costGold": 100000,
        "forceBonus": 12,
        "description": "Khi bảo vệ Chúa Công, lực chiến bùng nổ, miễn nhiễm đòn chí mạng, cản phá vạn quân."
      },
      "mount": {
        "name": "Đại Uyển Mã (Hãn Huyết Bảo Mã)",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 7,
        "description": "Tính dịu dàng ngoan ngoãn, thể lực bền bỉ vô song."
      },
      "troopType": "Huyết Y Doanh Trọng Giáp Hộ Vệ",
      "quote": "Có Cổ Chi Ác Lai ở đây, đừng hòng ai chạm tới nửa sợi tóc của Chúa Công!",
      "lore": "Mãnh tướng sức mạnh hộ vệ đệ nhất, thân hình khôi ngô dã tính phi thường.",
      "hostReturnForce": 7
    },
    {
      "id": "ly_nho",
      "name": "Lý Nho",
      "courtesyName": "Văn Ưu",
      "primaryClass": "Mưu Thần",
      "role": "Độc Kế",
      "classRoleBadge": "Mưu Thần • Độc Kế Phụ Quốc",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 97,
      "loyalty": 100,
      "baseStats": {
        "force": 42,
        "command": 82,
        "intelligence": 96,
        "politics": 91
      },
      "weapon": {
        "name": "Hắc Ngọc Trượng",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Phần Thành Tuyệt Kế",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "Mật Độc Đoạt Hồn",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Tuyệt Mệnh Độc Kế",
        "costGold": 100000,
        "forceBonus": 4,
        "description": "Đoán trước thời cuộc, huấn luyện ngầm quân đội, thi triển mỹ nhân kế và mưu hại đối thủ triều đình."
      },
      "mount": {
        "name": "Thanh Phong Kỵ",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Huyết Y Doanh Ám Vệ",
      "quote": "Văn Ưu nguyện vì bá nghiệp của Chúa Công dọn sạch mọi chông gai nơi đế đô!",
      "lore": "Ngoan nhân từng độc sát Thiếu Đế, hỏa thiêu Lạc Dương; quân sư phụ trách huấn luyện ngầm Huyết Y Doanh.",
      "hostReturnForce": 4
    },
    {
      "id": "dieu_thuyen",
      "name": "Điêu Thuyền",
      "courtesyName": "Hồng Nhan",
      "primaryClass": "Tuyệt Thế Nữ Thần",
      "role": "Mật Thám",
      "classRoleBadge": "Tuyệt Thế Nữ Thần • Mật Thám Chủ Quản",
      "summonTier": "Sử Thi Tuyệt Thế Mỹ Nhân",
      "chapterSummon": 140,
      "loyalty": 100,
      "baseStats": {
        "force": 35,
        "command": 80,
        "intelligence": 92,
        "politics": 86
      },
      "weapon": {
        "name": "Bế Nguyệt Song Kiếm",
        "costGold": 10000,
        "forceBonus": 4
      },
      "skills": [
        {
          "name": "Bế Nguyệt Vũ Khúc",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "Liên Hoàn Điệp Báo",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Khuynh Quốc Khuynh Thành",
        "costGold": 100000,
        "forceBonus": 5,
        "description": "Thống lĩnh mạng lưới tình báo Hồng Nhan, thu thập tin tức lục quốc, mê hoặc gián điệp địch."
      },
      "mount": {
        "name": "Tuyết Lạc Bạch Câu",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Hồng Nhan Mật Thám Tiệp Báo Doanh",
      "quote": "Gia từng nói, tỉnh chưởng quyền thiên hạ, túy ngọa mỹ nhân đùi... Nô tỳ nguyện đời đời hầu hạ Gia.",
      "lore": "Thiên hạ đệ nhất mỹ nhân, người phụ nữ đầu tiên chính thức thuộc về Quý Bình An, trung thành tuyệt đối.",
      "hostReturnForce": 4
    },
    {
      "id": "hoa_hung",
      "name": "Hoa Hùng",
      "courtesyName": "Mãnh Tướng",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Quan Ngoại Mãnh Tướng",
      "summonTier": "Vạn Kim",
      "chapterSummon": 149,
      "loyalty": 100,
      "baseStats": {
        "force": 84,
        "command": 78,
        "intelligence": 45,
        "politics": 35
      },
      "weapon": {
        "name": "Trảm Mã Đại Đao",
        "costGold": 10000,
        "forceBonus": 5
      },
      "skills": [
        {
          "name": "Phách Sơn Đao Pháp",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Quan Tiền Uy Chấn",
        "costGold": 100000,
        "forceBonus": 6,
        "description": "Tăng uy áp khi trấn giữ ải môn, trảm sát tướng lĩnh tiền tiêu."
      },
      "mount": {
        "name": "Thiết Giáp Chiến Mã",
        "costGold": 30000,
        "percentBonus": 5,
        "forceBonus": 4
      },
      "troopType": "Thiết Kỵ Trảm Doanh",
      "quote": "Chủ công an tâm, có Hoa Hùng ở đây, ai dám xông qua quan môn!",
      "lore": "Mãnh tướng Vạn Kim thân hình cao lớn, cùng Khúc Nghĩa làm hộ vệ đêm trước khi rời đế đô.",
      "hostReturnForce": 4
    },
    {
      "id": "khuc_nghia",
      "name": "Khúc Nghĩa",
      "courtesyName": "Tiên Đăng",
      "primaryClass": "Võ Tướng",
      "role": "Hãm Trận",
      "classRoleBadge": "Võ Tướng • Tiên Đăng Tử Sĩ Thống Lĩnh",
      "summonTier": "Vạn Kim",
      "chapterSummon": 149,
      "loyalty": 100,
      "baseStats": {
        "force": 82,
        "command": 88,
        "intelligence": 65,
        "politics": 40
      },
      "weapon": {
        "name": "Tiên Đăng Trọng Cung & Trường Kích",
        "costGold": 10000,
        "forceBonus": 5
      },
      "skills": [
        {
          "name": "Cường Nỗ Phá Trận",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Tiên Đăng Thần Dũng",
        "costGold": 100000,
        "forceBonus": 6,
        "description": "Khắc chế hoàn toàn kỵ binh, lấy ít địch nhiều phá vỡ đội hình thiết kỵ."
      },
      "mount": {
        "name": "Bắc Lương Chiến Câu",
        "costGold": 30000,
        "percentBonus": 5,
        "forceBonus": 4
      },
      "troopType": "Tiên Đăng Tử Sĩ (800 Cường Nỗ Trọng Giáp)",
      "quote": "Tiên Đăng giành trước, phá kỵ diệt trận!",
      "lore": "Thống lĩnh Tiên Đăng Tử Sĩ lừng danh trận Giới Kiều, phá 20 vạn quân Công Tôn Toản.",
      "hostReturnForce": 4
    },
    {
      "id": "truong_lieu",
      "name": "Trương Liêu",
      "courtesyName": "Văn Viễn",
      "primaryClass": "Võ Tướng",
      "role": "Thống Soái",
      "classRoleBadge": "Võ Tướng • Trời Sinh Thống Soái",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 150,
      "loyalty": 100,
      "baseStats": {
        "force": 80,
        "command": 96,
        "intelligence": 84,
        "politics": 72
      },
      "weapon": {
        "name": "Nguyệt Nha Kích",
        "costGold": 10000,
        "forceBonus": 7,
        "specialEffect": "Mở khóa vũ khí thứ hai Vấn Thiên Đao (+3 Võ Lực)"
      },
      "skills": [
        {
          "name": "Nguyệt Nha Kích Pháp",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Hoành Tảo Bát Phương",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Huyết Chiến Thiên Lý",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Thống Ngự Chi Tài",
        "costGold": 100000,
        "forceBonus": 10,
        "description": "Tướng sĩ dưới trướng chiến lực +30%, không sợ sinh tử, tuyệt đối phục tùng mệnh lệnh."
      },
      "mount": {
        "name": "Bóng Xám (Hôi Ảnh) / Lô Mã",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 6,
        "description": "Phụ Vấn Thiên, vượt Bóng Xám, uy chấn bến Tiêu Diêu."
      },
      "troopType": "Tiêu Diêu Tân Tinh Kỵ (800 Phá Vạn)",
      "quote": "Trương Văn Viễn ở đây! Giang Đông tiểu nhi dạ bất cảm đề!",
      "lore": "Cổ kim 64 danh tướng, trời sinh thống soái, trăm kế Trương Liêu được Quý Bình An triệu hoán bằng 10 vạn kim.",
      "hostReturnForce": 6
    },
    {
      "id": "cao_thuan",
      "name": "Cao Thuận",
      "courtesyName": "Hãm Trận",
      "primaryClass": "Võ Tướng",
      "role": "Hãm Trận",
      "classRoleBadge": "Võ Tướng • Hãm Trận Doanh Chủ",
      "summonTier": "Vạn Kim",
      "chapterSummon": 200,
      "loyalty": 100,
      "baseStats": {
        "force": 78,
        "command": 90,
        "intelligence": 68,
        "politics": 45
      },
      "weapon": {
        "name": "Hãm Trận Trọng Khiên & Đại Mâu",
        "costGold": 10000,
        "forceBonus": 5
      },
      "skills": [
        {
          "name": "Hãm Trận Trọng Kích",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Bất Động Trận Đồ",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Hãm Trận Chi Chí",
        "costGold": 100000,
        "forceBonus": 8,
        "description": "Hãm Trận chi chí, hữu tử vô sinh! Toàn quân giảm 50% sát thương nhận vào, thiết giáp cối xay thịt."
      },
      "mount": {
        "name": "Hắc Giáp Trọng Kỵ Mã",
        "costGold": 30000,
        "percentBonus": 5,
        "forceBonus": 4
      },
      "troopType": "Hãm Trận Doanh (1.200 Trọng Giáp Tử Sĩ)",
      "quote": "Hãm Trận chi chí, hữu tử vô sinh! Xông pha không lùi!",
      "lore": "Người sáng lập chi bộ đội đặc chủng đệ nhất Hoa Hạ, quân lệnh như sơn, thương lính như con.",
      "hostReturnForce": 5
    },
    {
      "id": "tuan_uc",
      "name": "Tuân Úc",
      "courtesyName": "Văn Nhược",
      "primaryClass": "Năng Thần",
      "role": "Nội Chính",
      "classRoleBadge": "Tuyệt Thế Năng Thần • Vương Tá Chi Tài",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 201,
      "loyalty": 100,
      "baseStats": {
        "force": 38,
        "command": 85,
        "intelligence": 96,
        "politics": 99
      },
      "weapon": {
        "name": "Vương Tá Trầm Hương Trượng",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Điều Hòa Lương Thảo",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "An Dân Trị Quốc",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Vương Tá Hộ Quốc",
        "costGold": 100000,
        "forceBonus": 4,
        "description": "Quản lý kinh tế nội chính hoàn mỹ, sản lượng vàng và lương tăng 50%, hậu cần vô tận."
      },
      "mount": {
        "name": "Bạch Mã Thanh Kiệu",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Đại Hán Hộ Quốc Vệ",
      "quote": "Tuân Văn Nhược nguyện vì Chúa Công dốc lòng trị an thiên hạ!",
      "lore": "Vương tá chi tài đứng đầu hàng văn thần nội chính của Tào Tháo, rường cột phát triển lãnh địa cho Quý Bình An.",
      "hostReturnForce": 4
    },
    {
      "id": "chu_du",
      "name": "Chu Du",
      "courtesyName": "Công Cẩn",
      "primaryClass": "Võ Tướng",
      "role": "Thống Soái",
      "classRoleBadge": "Võ Tướng • Đại Đô Đốc Thống Soái",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 219,
      "loyalty": 100,
      "baseStats": {
        "force": 76,
        "command": 98,
        "intelligence": 96,
        "politics": 88
      },
      "weapon": {
        "name": "Cổ Đĩnh Kiếm",
        "costGold": 10000,
        "forceBonus": 6
      },
      "skills": [
        {
          "name": "Đàm Tiếu Can Qua",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Hỏa Vũ Thủy Thiên",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Hỏa Thiêu Xích Bích",
        "costGold": 100000,
        "forceBonus": 10,
        "description": "Chỉ huy thủy lục tam quân, phóng hỏa thiêu rụi chiến thuyền và đại quân đối phương."
      },
      "mount": {
        "name": "Bạch Lãng Câu",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 5
      },
      "troopType": "Giang Đông Lâu Thuyền Thủy Quân",
      "quote": "Hỏa thiêu Xích Bích, đàm tiếu gian can qua giai tẫn!",
      "lore": "Đại Đô Đốc Đông Ngô khôi ngô tuấn tú, kỳ tài thao lược quân sự thủy bộ.",
      "hostReturnForce": 6
    },
    {
      "id": "hoang_trung",
      "name": "Hoàng Trung",
      "courtesyName": "Hán Thăng",
      "primaryClass": "Võ Tướng",
      "role": "Thần Xạ",
      "classRoleBadge": "Võ Tướng • Tuyệt Thế Thần Xạ",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 220,
      "loyalty": 100,
      "baseStats": {
        "force": 86,
        "command": 89,
        "intelligence": 65,
        "politics": 52
      },
      "weapon": {
        "name": "Bát Bảo Kỳ Lân Cung & Xích Huyết Đao",
        "costGold": 10000,
        "forceBonus": 7
      },
      "skills": [
        {
          "name": "Bách Bộ Xuyên Dương",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Kỳ Lân Xạ Nguyệt",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Càng Già Càng Dẻo Dai (Lão Đương Ích Tráng)",
        "costGold": 100000,
        "forceBonus": 15,
        "description": "Từ 30 tuổi mỗi năm +1 võ lực, từ 50 tuổi mỗi năm +2 võ lực, tuổi tác càng cao võ lực càng khủng khiếp vượt 140!"
      },
      "mount": {
        "name": "Liêu Nguyên Hỏa",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 7
      },
      "troopType": "Thần Xạ Cung Nỗ Doanh",
      "quote": "Lão tướng Hoàng Hán Thăng giương cung chưa từng trượt phát nào!",
      "lore": "Thần xạ thủ lừng danh trảm Hạ Hầu Uyên tại Định Quân Sơn, đặc thù thiên phú tăng võ lực theo tuổi tác độc nhất vô nhị.",
      "hostReturnForce": 8
    },
    {
      "id": "hi_chi_tai",
      "name": "Hí Chí Tài",
      "courtesyName": "Chí Tài",
      "primaryClass": "Mưu Thần",
      "role": "Quân Sư",
      "classRoleBadge": "Mưu Thần • Tuệ Nhãn Kỳ Tài",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 288,
      "loyalty": 100,
      "baseStats": {
        "force": 36,
        "command": 80,
        "intelligence": 95,
        "politics": 86
      },
      "weapon": {
        "name": "Tuệ Mộc Trượng",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Minh Sát Thu Hào",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Biết Nhìn Người (Độc Tâm Tuệ Nhãn)",
        "costGold": 100000,
        "forceBonus": 4,
        "description": "Khi thấu hiểu 75% đối phương liền nhìn thấu mọi tâm cơ và bố trận của địch nhân."
      },
      "mount": {
        "name": "Hắc Phong Kỵ",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Quân Cơ Mật Sĩ",
      "quote": "Tuệ nhãn nhìn thấu lòng người, mưu tính không kẽ hở.",
      "lore": "Mưu sĩ kỳ tài thời đầu của Tào Tháo trước khi Quách Gia xuất thế.",
      "hostReturnForce": 4
    },
    {
      "id": "ma_sieu",
      "name": "Mã Siêu",
      "courtesyName": "Mạnh Khởi (Cẩm Mã Siêu)",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Tây Lương Thần Kỵ",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 350,
      "loyalty": 100,
      "baseStats": {
        "force": 87,
        "command": 88,
        "intelligence": 58,
        "politics": 42
      },
      "weapon": {
        "name": "Hổ Đầu Trạm Kim Thương",
        "costGold": 10000,
        "forceBonus": 7
      },
      "skills": [
        {
          "name": "Tây Lương Thương Pháp",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Đột Khởi Phong Lôi",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Sát Thần Tây Lương",
        "costGold": 100000,
        "forceBonus": 12,
        "description": "Tây Lương kỵ binh xung phong tăng gấp đôi tốc độ, uy áp khiến kẻ địch cắt râu vứt áo tháo chạy."
      },
      "mount": {
        "name": "Lý Tuyết Bác Hoa (Bạch Long Câu)",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 8,
        "description": "Ngựa trắng như tuyết, chạy như bay trên băng tuyết Tây Lương."
      },
      "troopType": "Thiết Kỵ Tây Lương (10.000 Thiết Kỵ)",
      "quote": "Tây Lương Cẩm Mã Siêu ở đây, ai dám quyết tử chiến?!",
      "lore": "Thống lĩnh Thiết Kỵ Tây Lương tung hoành thiên hạ, từng truy sát Tào Tháo.",
      "hostReturnForce": 8
    },
    {
      "id": "hoa_da",
      "name": "Hoa Đà",
      "courtesyName": "Nguyên Hóa",
      "primaryClass": "Kỳ Nhân Dị Sĩ",
      "role": "Thần Y",
      "classRoleBadge": "Kỳ Nhân Dị Sĩ • Tuyệt Thế Thần Y",
      "summonTier": "Đặc Thù Loại Tuyệt Thế",
      "chapterSummon": 361,
      "loyalty": 100,
      "baseStats": {
        "force": 40,
        "command": 60,
        "intelligence": 96,
        "politics": 80
      },
      "weapon": {
        "name": "Thanh Nang Thần Châm & Đao Mổ",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Ma Phí Tán",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Thần Y Khởi Tử Hồi Sinh",
        "costGold": 100000,
        "forceBonus": 5,
        "description": "Chữa lành mọi trọng thương cho tướng sĩ, giảm 90% tổn thất binh lực sau đại chiến."
      },
      "mount": {
        "name": "Thanh Ngưu Tiên Thú",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Cứu Thương Quân Y Doanh",
      "quote": "Bàn tay vàng cứu nhân độ thế, hồi sinh vạn quân.",
      "lore": "Thần y lừng danh Hoa Hạ, sáng tạo Ma Phí Tán và Ngũ Cầm Hí.",
      "hostReturnForce": 4
    },
    {
      "id": "quach_gia",
      "name": "Quách Gia",
      "courtesyName": "Phụng Hiếu",
      "primaryClass": "Mưu Thần",
      "role": "Thiên Mệnh Quỷ Tài",
      "classRoleBadge": "Mưu Thần • Thiên Mệnh Nghịch Cải",
      "summonTier": "Thiên Mệnh Mưu Thần (50 Vạn Kim)",
      "chapterSummon": 382,
      "loyalty": 100,
      "baseStats": {
        "force": 35,
        "command": 90,
        "intelligence": 100,
        "politics": 95
      },
      "weapon": {
        "name": "Quỷ Tài Huyền Thiên Phiến",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Thập Thắng Thập Bại Luận",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "Di Kế Định Liêu Đông",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Thiên Mệnh Nghịch Cải (Quỷ Tài Thần Toán)",
        "costGold": 100000,
        "forceBonus": 6,
        "description": "Thân phụ thiên mệnh, phá giải phong thủy và trận pháp, liệu việc như thần, định đoạt đại cục."
      },
      "mount": {
        "name": "Ngọc Phong Câu",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Thiên Mệnh Thần Cơ Vệ",
      "quote": "Trời sinh Quách Phụng Hiếu, quỷ tài định càn khôn!",
      "lore": "Đệ nhất thiên tài yểu mệnh được hồi sinh dưới thân phận Thiên Mệnh Mưu Thần (Nghịch thiên cải mệnh).",
      "hostReturnForce": 6
    },
    {
      "id": "hac_chieu",
      "name": "Hác Chiêu",
      "courtesyName": "Bá Đạo",
      "primaryClass": "Võ Tướng",
      "role": "Hộ Vệ",
      "classRoleBadge": "Võ Tướng • Thủ Thành Thần Tướng",
      "summonTier": "50 Ngàn Kim",
      "chapterSummon": 409,
      "loyalty": 100,
      "baseStats": {
        "force": 82,
        "command": 94,
        "intelligence": 78,
        "politics": 60
      },
      "weapon": {
        "name": "Cố Thành Đại Thương",
        "costGold": 10000,
        "forceBonus": 5
      },
      "skills": [
        {
          "name": "Kim Thành Thang Trì",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Tuyệt Đối Cố Thủ",
        "costGold": 100000,
        "forceBonus": 8,
        "description": "Thủ thành lực tăng 100%, ngăn chặn địch đông gấp chục lần vây công suốt nhiều tháng."
      },
      "mount": {
        "name": "Thiết Kỵ Trụ",
        "costGold": 30000,
        "percentBonus": 5,
        "forceBonus": 4
      },
      "troopType": "Thủ Thành Cự Nỗ Doanh",
      "quote": "Có Hác Chiêu ở đây, thành trì quyết không thể phá!",
      "lore": "Thần tướng phòng ngự từng dùng 1.000 quân cản phá 10 vạn quân Gia Cát Lượng tại Trần Thương.",
      "hostReturnForce": 5
    },
    {
      "id": "truong_phi",
      "name": "Trương Phi",
      "courtesyName": "Dực Đức",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Vạn Nhân Địch",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 443,
      "loyalty": 100,
      "baseStats": {
        "force": 89,
        "command": 86,
        "intelligence": 52,
        "politics": 35
      },
      "weapon": {
        "name": "Trượng Bát Xà Mâu",
        "costGold": 10000,
        "forceBonus": 7
      },
      "skills": [
        {
          "name": "Xà Mâu Bạo Kích",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Trường Bản Lôi Hống",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Trường Bản Nhất Hống (Vạn Nhân Địch)",
        "costGold": 100000,
        "forceBonus": 12,
        "description": "Tiếng thét làm vỡ mật kẻ địch, đảo ngược dòng nước, phá vỡ dũng khí đối phương."
      },
      "mount": {
        "name": "Ô Chức Mã (Vương Truy)",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 8
      },
      "troopType": "U Châu Đột Kỵ",
      "quote": "Ta là Yên Nhân Trương Dực Đức! Ai dám cùng ta quyết tử chiến?!",
      "lore": "Vạn nhân địch mãnh tướng, một tiếng thét đoạn cầu Trường Bản.",
      "hostReturnForce": 8
    },
    {
      "id": "hua_chu",
      "name": "Hứa Chử",
      "courtesyName": "Trọng Khang (Hổ Si)",
      "primaryClass": "Võ Tướng",
      "role": "Thiết Vệ",
      "classRoleBadge": "Võ Tướng • Hổ Si Thiết Vệ",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 554,
      "loyalty": 100,
      "baseStats": {
        "force": 88,
        "command": 72,
        "intelligence": 40,
        "politics": 28
      },
      "weapon": {
        "name": "Cửu Hợp Đại Đao",
        "costGold": 10000,
        "forceBonus": 6
      },
      "skills": [
        {
          "name": "Kéo Trâu Đổi Ngựa",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Hổ Si Cuồng Bạo",
        "costGold": 100000,
        "forceBonus": 11,
        "description": "Cởi giáp đực đấu, chiến lực tăng cuồng bạo, miễn nhiễm giảm công kích."
      },
      "mount": {
        "name": "Đại Hổ Kỵ",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 7
      },
      "troopType": "Hổ Vệ Quân",
      "quote": "Hổ Si Hứa Chử liều mạng bảo vệ Chúa Công!",
      "lore": "Hổ tướng cận vệ của Tào Tháo, từng tay không kéo đuôi trâu ngược dòng.",
      "hostReturnForce": 7
    },
    {
      "id": "cam_ninh",
      "name": "Cam Ninh",
      "courtesyName": "Hưng Bá",
      "primaryClass": "Võ Tướng",
      "role": "Thủy Quân",
      "classRoleBadge": "Võ Tướng • Cẩm Phàm Thủy Bá",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 555,
      "loyalty": 100,
      "baseStats": {
        "force": 86,
        "command": 88,
        "intelligence": 72,
        "politics": 45
      },
      "weapon": {
        "name": "Bá Vương Song Kích & Cẩm Phàm Linh Đao",
        "costGold": 10000,
        "forceBonus": 6
      },
      "skills": [
        {
          "name": "Bách Kỵ Kiếp Doanh",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Bách Kỵ Kiếp Ngụy Doanh",
        "costGold": 100000,
        "forceBonus": 10,
        "description": "Ban đêm tập kích doanh trại địch, không tổn thất một người, làm kinh hoàng toàn quân địch."
      },
      "mount": {
        "name": "Phi Yến Kỵ",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 6
      },
      "troopType": "Cẩm Phàm Thủy Quân",
      "quote": "Đeo chuông giong buồm gấm, trăm kỵ cướp trại Tào!",
      "lore": "Đại tướng dũng liệt Đông Ngô, chiến công trăm kỵ cướp trại Ngụy lừng danh sử sách.",
      "hostReturnForce": 6
    },
    {
      "id": "quan_vu",
      "name": "Quan Vũ",
      "courtesyName": "Vân Trường",
      "primaryClass": "Võ Tướng",
      "role": "Thiên Mệnh Võ Thánh",
      "classRoleBadge": "Võ Tướng • Thiên Mệnh Võ Thánh",
      "summonTier": "Thiên Mệnh Võ Tướng (50 Vạn Kim)",
      "chapterSummon": 598,
      "loyalty": 100,
      "baseStats": {
        "force": 92,
        "command": 96,
        "intelligence": 80,
        "politics": 65
      },
      "weapon": {
        "name": "Thanh Long Yển Nguyệt Đao (82 Cân)",
        "costGold": 10000,
        "forceBonus": 8,
        "specialEffect": "Trảm tướng đoạt kỳ (+3 Võ Lực khi đối đầu chủ tướng địch)"
      },
      "skills": [
        {
          "name": "Thanh Long Trảm",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Yển Nguyệt Bạt Đao Trảm",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Dâng Nước Ngập Bảy Quân",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Uy Chấn Hoa Hạ (Võ Thánh Thiên Mệnh)",
        "costGold": 100000,
        "forceBonus": 14,
        "description": "Khí phách Võ Thánh áp chế toàn bộ chiến trường, đòn đầu tiên có xác suất trảm sát ngay tướng địch."
      },
      "mount": {
        "name": "Xích Thố Mã (Bản Mệnh Lương Câu)",
        "costGold": 50000,
        "percentBonus": 10,
        "forceBonus": 10,
        "description": "Ngựa đỏ như lửa, vượt núi lội nước như đi trên đất bằng."
      },
      "troopType": "Kinh Châu Hiệu Đao Thủ",
      "quote": "Quan Vân Trường trảm Nhan Lương Văn Xú như thò tay vào túi lấy đồ!",
      "lore": "Thiên Mệnh Võ Thánh đứng đầu Ngũ Hổ Tướng, được triệu hoán với chi phí 500 ngàn kim.",
      "hostReturnForce": 14
    },
    {
      "id": "gia_cat_luong",
      "name": "Gia Cát Lượng",
      "courtesyName": "Khổng Minh (Ngọa Long)",
      "primaryClass": "Mưu Thần",
      "role": "Thiên Mệnh Thần Cơ",
      "classRoleBadge": "Mưu Thần • Thiên Mệnh Ngọa Long",
      "summonTier": "Thiên Mệnh Mưu Thần (50 Vạn Kim)",
      "chapterSummon": 725,
      "loyalty": 100,
      "baseStats": {
        "force": 38,
        "command": 98,
        "intelligence": 100,
        "politics": 100
      },
      "weapon": {
        "name": "Bạch Hạc Vũ Phiến",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Bát Trận Đồ",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Mượn Gió Đông",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Thiên Mệnh Thuận Hành (Thần Cơ Diệu Toán)",
        "costGold": 100000,
        "forceBonus": 6,
        "description": "Bát Trận Đồ vây nhốt trăm vạn quân, cải tạo cơ quan trâu gỗ ngựa máy, kinh tế quốc lực đỉnh phong."
      },
      "mount": {
        "name": "Tứ Lôn Xa",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Gia Cát Liên Nỗ Binh",
      "quote": "Cúc cung tận tụy, đến chết mới thôi!",
      "lore": "Ngọa Long Tiên Sinh đệ nhất thừa tướng muôn đời tôn kính, thân phụ thiên mệnh thuận hành.",
      "hostReturnForce": 6
    },
    {
      "id": "bang_duc",
      "name": "Bàng Đức",
      "courtesyName": "Lệnh Minh",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Khiêng Hòm Quyết Tử",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 730,
      "loyalty": 100,
      "baseStats": {
        "force": 87,
        "command": 84,
        "intelligence": 60,
        "politics": 40
      },
      "weapon": {
        "name": "Trọng Cương Đại Đao",
        "costGold": 10000,
        "forceBonus": 6
      },
      "skills": [
        {
          "name": "Hòm Gỗ Tử Chiến",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Khiêng Hòm Trảm Tướng",
        "costGold": 100000,
        "forceBonus": 10,
        "description": "Khiêng quan tài ra trận, ý chí quyết tử chiến đấu đến giọt máu cuối cùng."
      },
      "mount": {
        "name": "Bạch Trạch Mã",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 6
      },
      "troopType": "Tây Lương Tử Sĩ",
      "quote": "Hôm nay nếu ta không g·iết được địch, thì cái hòm này là mộ của ta!",
      "lore": "Dũng tướng Tây Lương lừng danh khiêng hòm quyết chiến Quan Vũ.",
      "hostReturnForce": 6
    },
    {
      "id": "thai_su_tu",
      "name": "Thái Sử Từ",
      "courtesyName": "Tử Nghĩa",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Đông Ngô Mãnh Thần",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 785,
      "loyalty": 100,
      "baseStats": {
        "force": 88,
        "command": 85,
        "intelligence": 68,
        "politics": 50
      },
      "weapon": {
        "name": "Cuồng Ca Song Kích",
        "costGold": 10000,
        "forceBonus": 6
      },
      "skills": [
        {
          "name": "Xạ Tiễn Đoạt Kỳ",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Trượng Kiếm Lập Công",
        "costGold": 100000,
        "forceBonus": 10,
        "description": "Xung phong phá trận, đơn thương độc mã đấu Tôn Sách."
      },
      "mount": {
        "name": "Giang Đông Liệp Mã",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 6
      },
      "troopType": "Đông Ngô Cung Kích Kỵ",
      "quote": "Đại trượng phu sinh ở đời, nên mang thước gươm lập công bất hủ!",
      "lore": "Danh tướng trung nghĩa Đông Ngô văn võ toàn tài.",
      "hostReturnForce": 6
    },
    {
      "id": "lu_bo",
      "name": "Lữ Bố",
      "courtesyName": "Phụng Tiên",
      "primaryClass": "Võ Tướng",
      "role": "Thiên Mệnh Chiến Thần",
      "classRoleBadge": "Võ Tướng • Vạn Thế Vô Song Chiến Thần",
      "summonTier": "Thiên Mệnh Võ Tướng (50 Vạn Kim)",
      "chapterSummon": 817,
      "loyalty": 100,
      "baseStats": {
        "force": 96,
        "command": 94,
        "intelligence": 50,
        "politics": 30
      },
      "weapon": {
        "name": "Phương Thiên Họa Kích",
        "costGold": 10000,
        "forceBonus": 10,
        "specialEffect": "Bá Vương Diệt Thế (+5 Võ Lực khi quần chiến)"
      },
      "skills": [
        {
          "name": "Họa Kích Bát Thức",
          "costGold": 1000,
          "forceBonus": 2
        },
        {
          "name": "Viên Môn Xạ Kích",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Chiến Thần Vô Song (Vô Địch Thiên Hạ)",
        "costGold": 100000,
        "forceBonus": 18,
        "description": "Chiến lực trần nhà Tam Quốc, võ lực bứt phá lên 159-160 đỉnh phong, một mình đực đấu tam đại thần tướng."
      },
      "mount": {
        "name": "Xích Thố Mã (Nhân Trung Lữ Bố, Mã Trung Xích Thố)",
        "costGold": 50000,
        "percentBonus": 10,
        "forceBonus": 12,
        "description": "Chiến mã vô địch thiên hạ, tốc độ và sức bật tuyệt đối."
      },
      "troopType": "Tinh Châu Thiết Kỵ (Thiết Kỵ Chiến Thần)",
      "quote": "Có ta Lữ Phụng Tiên ở đây, ai dám xưng đệ nhất thiên hạ?!",
      "lore": "Vạn thế lưu truyền chi Thiên Mệnh Võ Tướng, chiến thần võ lực trần nhà tối thượng.",
      "hostReturnForce": 18
    },
    {
      "id": "bang_thong",
      "name": "Bàng Thống",
      "courtesyName": "Sĩ Nguyên (Phượng Sồ)",
      "primaryClass": "Mưu Thần",
      "role": "Quân Sư",
      "classRoleBadge": "Mưu Thần • Phượng Sồ Niết Bàn",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 824,
      "loyalty": 100,
      "baseStats": {
        "force": 38,
        "command": 88,
        "intelligence": 98,
        "politics": 90
      },
      "weapon": {
        "name": "Phượng Vũ Cầm",
        "costGold": 10000,
        "forceBonus": 2
      },
      "skills": [
        {
          "name": "Liên Hoàn Kế",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Phượng Hoàng Niết Bàn",
        "costGold": 100000,
        "forceBonus": 5,
        "description": "Kích hoạt thiên phú Phượng Hoàng Niết Bàn, khi ngã xuống có thể niết bàn trùng sinh!"
      },
      "mount": {
        "name": "Bạch Hạc Kỵ",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 3
      },
      "troopType": "Liên Hoàn Mưu Sĩ Vệ",
      "quote": "Ngọa Long Phượng Sồ, được một trong hai có thể an thiên hạ!",
      "lore": "Phượng Sồ tiên sinh hiến liên hoàn kế tại Xích Bích, sở hữu thiên phú Niết Bàn trùng sinh.",
      "hostReturnForce": 5
    },
    {
      "id": "tu_ma_y",
      "name": "Tư Mã Ý",
      "courtesyName": "Trọng Đạt (Trủng Hổ)",
      "primaryClass": "Mưu Thần",
      "role": "Thiên Mệnh Trủng Hổ",
      "classRoleBadge": "Mưu Thần • Thiên Mệnh Tụ Về",
      "summonTier": "Thiên Mệnh Mưu Thần (50 Vạn Kim)",
      "chapterSummon": 885,
      "loyalty": 100,
      "baseStats": {
        "force": 52,
        "command": 98,
        "intelligence": 99,
        "politics": 98
      },
      "weapon": {
        "name": "Ưng Thị Lang Kiếm",
        "costGold": 10000,
        "forceBonus": 3
      },
      "skills": [
        {
          "name": "Nhẫn Nhục Chờ Thời",
          "costGold": 1000,
          "forceBonus": 1
        },
        {
          "name": "Trủng Hổ Thao Lược",
          "costGold": 1000,
          "forceBonus": 1
        }
      ],
      "specialTalent": {
        "name": "Thiên Mệnh Tụ Về (Ưng Thị Lang Cố)",
        "costGold": 100000,
        "forceBonus": 6,
        "description": "Ưng thị lang cố, tề tụ ba vị thiên mệnh mưu thần độc chiếm một phần khí vận trời đất."
      },
      "mount": {
        "name": "Hắc Lang Kỵ",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 4
      },
      "troopType": "Trủng Hổ Tinh Nhuệ Thần Vệ",
      "quote": "Ta vung kiếm chỉ một lần, nhưng đã mài kiếm suốt mấy chục năm!",
      "lore": "Trủng Hổ Tư Mã Ý, thiên mệnh mưu thần thứ ba hoàn thiện bộ ba Thiên Mệnh Mưu Thần cùng Quách Gia và Gia Cát Lượng.",
      "hostReturnForce": 6
    },
    {
      "id": "van_uong",
      "name": "Văn Ương",
      "courtesyName": "Thứ Khiên",
      "primaryClass": "Võ Tướng",
      "role": "Tiên Phong",
      "classRoleBadge": "Võ Tướng • Tiểu Triệu Vân Mãnh Tướng",
      "summonTier": "10 Vạn Kim",
      "chapterSummon": 1089,
      "loyalty": 100,
      "baseStats": {
        "force": 89,
        "command": 82,
        "intelligence": 60,
        "politics": 38
      },
      "weapon": {
        "name": "Điểm Cương Thương & Trọng Thiết Tiết",
        "costGold": 10000,
        "forceBonus": 7
      },
      "skills": [
        {
          "name": "Đột Phá Trùng Vây",
          "costGold": 1000,
          "forceBonus": 2
        }
      ],
      "specialTalent": {
        "name": "Đơn Kỵ Thoái Binh",
        "costGold": 100000,
        "forceBonus": 12,
        "description": "Một ngựa xông pha giết lùi ngàn quân truy kích, dũng khí sánh ngang Triệu Tử Long."
      },
      "mount": {
        "name": "Phi Hồng Mã",
        "costGold": 50000,
        "percentBonus": 7,
        "forceBonus": 7
      },
      "troopType": "Đột Khích Tiên Phong Doanh",
      "quote": "Một kích một thương, quét sạch quân thù!",
      "lore": "Mãnh tướng hậu Tam Quốc được xưng tụng là Tiểu Triệu Vân, đơn thương độc mã làm khiếp sợ toàn quân Tư Mã.",
      "hostReturnForce": 8
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
      "id": "c_huyet_y_doanh",
      "name": "Huyết Y Doanh",
      "type": "unit",
      "rarity": "SR",
      "mana_cost": 4,
      "damage": 55,
      "shield": 25,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Counter-attack",
        "Bleed"
      ],
      "description": "Tử sĩ áo máu Bắc Cương trung thành tuyệt đối, xung kích cảm tử.",
      "unlock_chapter": 27
    },
    {
      "id": "c_binh_thu_thao_luoc",
      "name": "Binh Thư Thao Lược",
      "type": "tactic",
      "rarity": "SR",
      "mana_cost": 3,
      "damage": 40,
      "shield": 30,
      "heal": 0,
      "target": "lane",
      "effects": [
        "Fortify",
        "Confuse"
      ],
      "description": "Mưu kế thao lược của Mã Tắc, gia cố thành phòng và làm rối loạn tiền quân địch.",
      "unlock_chapter": 17,
      "hero_required": "hero_matac"
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
      "description": "Lực lượng tử sĩ thép của Cao Thuận.",
      "unlock_chapter": 200,
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
      "title": "Xuyên Không Kim Loan Điện",
      "scene_name": "Kim Loan Điện",
      "unlocks": [
        "feature_basic_battle",
        "feature_anh_hon_lenh"
      ],
      "rewards": {
        "gold": 100,
        "item": "anh_hon_lenh"
      },
      "narrative_summary": "Đối thơ chấn động Kim Loan Điện, hóa giải mối nhục thể diện quốc gia, nhận thưởng Thượng Cổ Anh Hồn Lệnh.",
      "prerequisites": []
    },
    {
      "chapter": 5,
      "title": "Bái Tướng Thần Đàn",
      "scene_name": "Bái Tướng Đài",
      "unlocks": [
        "feature_gacha",
        "feature_bai_tuong_dai"
      ],
      "rewards": {
        "hero": "trieu_van"
      },
      "narrative_summary": "Khai mở Bái Tướng Thần Đàn, tiêu hao Anh Hồn Lệnh triệu hoán Thường Sơn Triệu Tử Long SSR xuất thế.",
      "prerequisites": [
        1
      ]
    },
    {
      "chapter": 8,
      "title": "Kinh Doanh Thấu Hoa Cao",
      "scene_name": "Thiên Kim Lâu",
      "unlocks": [
        "feature_commerce_soap"
      ],
      "rewards": {
        "gold_income": 3000
      },
      "narrative_summary": "Phát minh xà phòng Thấu Hoa Cao từ mỡ cừu, liên thủ Lâu chủ Vệ Ti Vũ gây dựng ngân quỹ bí mật.",
      "prerequisites": [
        5
      ]
    },
    {
      "chapter": 10,
      "title": "Ám Sát Đêm Trăng",
      "scene_name": "Phò Mã Phủ",
      "unlocks": [
        "feature_defense"
      ],
      "rewards": {},
      "narrative_summary": "Tử sĩ Nam Ly đột kích phủ đệ trong đêm mưa, Triệu Vân một thương quét sạch phản tặc.",
      "prerequisites": [
        8
      ]
    },
    {
      "chapter": 15,
      "title": "Thánh Chỉ Bắc Chinh",
      "scene_name": "Sơn Hà Sa Bàn",
      "unlocks": [
        "feature_strategy_map",
        "feature_ap_system"
      ],
      "rewards": {
        "gold": 5000,
        "ap": 3
      },
      "narrative_summary": "Vũ Hoàng hạ chỉ phong làm Chinh Bắc Tiền Phong Tướng Quân, mở khóa Tầng 2 Sơn Hà Sa Bàn và Hổ Phù Lệnh (AP).",
      "prerequisites": [
        10
      ]
    },
    {
      "chapter": 20,
      "title": "Vạn Kim Mưu Sĩ Mã Tắc",
      "scene_name": "Doanh Trại Bắc Cương",
      "unlocks": [
        "feature_ma_tac",
        "feature_binh_thu"
      ],
      "rewards": {
        "hero": "ma_tac"
      },
      "narrative_summary": "Triệu hoán Vạn Kim Mưu Sĩ Mã Tắc, thi triển diệu kế 'Cao Nâng Mã Tắc' gài sang phe Tô Vân, nắm toàn quyền kiểm soát Bắc Cảnh.",
      "prerequisites": [
        15
      ]
    },
    {
      "chapter": 27,
      "title": "Độc Sĩ Giả Hủ",
      "scene_name": "Mưu Khách Phủ",
      "unlocks": [
        "feature_strategy_cards"
      ],
      "rewards": {
        "hero": "gia_hu"
      },
      "narrative_summary": "Hố 20 vạn vàng triều đình, tế 10 vạn vàng triệu hoán Độc Sĩ Giả Hủ từ Bái Tướng Thần Đàn định độc kế.",
      "prerequisites": [
        20
      ]
    },
    {
      "chapter": 35,
      "title": "Đại Kế Thủy Công",
      "scene_name": "Thượng Nguồn Bờ Sông",
      "unlocks": [
        "feature_water_stratagem"
      ],
      "rewards": {},
      "narrative_summary": "Đắp đập ngăn sông Thanh Thủy thượng nguồn, chuẩn bị kế sách thủy công nhấn chìm quân địch.",
      "prerequisites": [
        27
      ]
    },
    {
      "chapter": 43,
      "title": "Kho Lương Khai Nguyên",
      "scene_name": "Hậu Cần Doanh",
      "unlocks": [
        "feature_grain_depot"
      ],
      "rewards": {
        "grain": 50000
      },
      "narrative_summary": "Bí mật thu mua và vận chuyển 5 vạn thạch quân lương, sĩ khí ba quân đạt mức tối đa.",
      "prerequisites": [
        35
      ]
    },
    {
      "chapter": 48,
      "title": "Đại Chiến Thanh Châu",
      "scene_name": "Chiến Thành Thanh Châu",
      "unlocks": [
        "feature_thanh_chau_battle"
      ],
      "rewards": {},
      "narrative_summary": "2 vạn thiết kỵ Nam Ly của Địch Hỏa vây hãm thành trì, bước vào trận đại chiến thủ thành 3 làn.",
      "prerequisites": [
        43
      ]
    },
    {
      "chapter": 52,
      "title": "Đại Thắng Khải Hoàn",
      "scene_name": "Thanh Châu Soái Phủ",
      "unlocks": [
        "feature_chinh_bac_dai_tuong_quan"
      ],
      "rewards": {
        "title": "Chinh Bắc Đại Tướng Quân"
      },
      "narrative_summary": "Xả lũ sông Thanh Thủy, Triệu Vân bắt sống Địch Hỏa; Vũ Hoàng ban phong Chinh Bắc Đại Tướng Quân, nắm trọn 3 châu Bắc Cảnh.",
      "prerequisites": [
        48
      ]
    },
    {
      "chapter": 63,
      "title": "Cổ Chi Ác Lai Điển Vi",
      "scene_name": "Đế Đô Kim Loan",
      "unlocks": [
        "feature_dian_wei"
      ],
      "rewards": {
        "hero": "dien_vi"
      },
      "narrative_summary": "Khải hoàn về kinh kỳ, triệu hoán Cổ Chi Ác Lai Điển Vi bảo vệ phủ đệ, chuẩn bị dẹp loạn binh biến Tô Kiến Phong (Ch.109).",
      "prerequisites": [
        52
      ]
    },
    {
      "chapter": 114,
      "title": "Vũ Hoàng Băng Hà",
      "scene_name": "Cung Đình Đại Vũ",
      "unlocks": [
        "feature_tan_hoang_era"
      ],
      "rewards": {},
      "narrative_summary": "Vũ Hoàng băng hà, Tân Hoàng Tử Ngọc Trạch kế vị, hoàng triều sóng ngầm cuộn trào tranh giành đại quyền.",
      "prerequisites": [
        63
      ]
    },
    {
      "chapter": 200,
      "title": "Đại Quân Hãm Trận",
      "scene_name": "Bắc Cương Soái Doanh",
      "unlocks": [
        "feature_ham_tran_doanh"
      ],
      "rewards": {
        "hero": "cao_thuan"
      },
      "narrative_summary": "Triệu hoán dũng tướng Cao Thuận và sáng lập 800 dũng sĩ Hãm Trận Doanh mình mặc giáp thép tôi, công phá thiên hạ.",
      "prerequisites": [
        114
      ]
    },
    {
      "chapter": 255,
      "title": "Trấn Quốc Phong Công",
      "scene_name": "Kim Loan Triều Đình",
      "unlocks": [
        "feature_tran_quoc_cong"
      ],
      "rewards": {
        "title": "Trấn Quốc Công"
      },
      "narrative_summary": "Dẹp yên giặc giã bốn cõi, Quý Bình An được sắc phong Trấn Quốc Công, uy chấn thiên hạ.",
      "prerequisites": [
        114
      ]
    },
    {
      "chapter": 303,
      "title": "Tịnh Kiên Phong Vương",
      "scene_name": "Vương Phủ Điện",
      "unlocks": [
        "feature_tinh_kien_vuong"
      ],
      "rewards": {
        "title": "Tịnh Kiên Vương"
      },
      "narrative_summary": "Tấn phong Tịnh Kiên Vương: Nhất ngôn nhi vi thiên hạ pháp, quyền lực chí cao vô thượng.",
      "prerequisites": [
        255
      ]
    },
    {
      "chapter": 386,
      "title": "Đăng Cơ Hoàng Đế",
      "scene_name": "Điện Kim Loan",
      "unlocks": [
        "feature_emperor_dai_vu"
      ],
      "rewards": {
        "title": "Hoàng Đế Đại Vũ"
      },
      "narrative_summary": "Muôn dân cầu xin, sau Tam Nhượng Đế Vị đăng cơ Hoàng Đế tại điện Kim Loan, chấm dứt loạn thế.",
      "prerequisites": [
        303
      ]
    },
    {
      "chapter": 411,
      "title": "Đại Hán Khai Quốc",
      "scene_name": "Đế Đô Tân Triều",
      "unlocks": [
        "feature_dai_han_dynasty"
      ],
      "rewards": {
        "era": "Định Quốc Năm Đầu"
      },
      "narrative_summary": "Cải quốc hiệu ĐẠI HÁN, niên hiệu Định Quốc năm đầu, mở ra thiên thu thịnh thế.",
      "prerequisites": [
        386
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
    "chapter_01_to_15": "// ============================================================\n// Trấn Quốc Phò Mã Gia — Ink Scene Script\n// Chương 1 - 15: Khởi Đầu Hàn Vi & Phong Vân Kinh Đô\n// ============================================================\n\n// === GLOBAL VARIABLES ===\nVAR gold = 0\nVAR jade = 0\nVAR suspicion = 0\nVAR has_anh_hon_lenh = false\nVAR system_awakened = false\nVAR poetry_duel_won = false\nVAR imperial_prestige = 0\nVAR chapter = 1\n\n// Feature unlock flags\nVAR unlocked_gacha = false\nVAR unlocked_soap = false\nVAR unlocked_map = false\nVAR unlocked_flood = false\nVAR unlocked_granary = false\nVAR unlocked_battle = false\n\n// Affinity scores\nVAR affinity_trieu_van = 0\nVAR affinity_gia_hu = 0\nVAR affinity_dieu_thuyen = 0\n\n// NPC relationship flags\nVAR met_vu_hoang = false\nVAR met_to_kien_phong = false\nVAR met_ve_ti_vu = false\n\n// Branch memory\nVAR ch10_method = \"none\"\n\n// ============================================================\n// CHƯƠNG 1: XUYÊN KHÔNG & ĐỐI THƠ ĐẠI ĐIỆN\n// ============================================================\n\n=== chapter_1_start ===\n# BACKGROUND: bg_darkness\n# MUSIC: bgm_ethereal_void\n# CHAPTER_TITLE: Hồi 1 · Chương 1: Phò Mã Hàn Vi Nơm Nớp Lo Sợ\n\nHắn mở mắt.\n\nKhông phải bóng tối hư vô của kiếp trước. Trước mắt hắn là tấm trướng lụa màu tím than thêu chỉ vàng đã sờn rách, thoang thoảng mùi trầm hương mục nát pha lẫn u uất.\n\nĐầu đau như búa bổ. Vô số mảnh vỡ ký ức xa lạ cuộn trào như thủy triều — hắn tên là Quý Bình An, đích tử thứ ba của phủ Trấn Quốc Công, cũng chính là kẻ phò mã hàn vi nức tiếng bất tài vô dụng của Đại Vũ Hoàng Triều.\n\nPhụ thân Quý Trọng Dung vừa bị tước đoạt binh quyền, gièm pha khắp kinh thành. Thê tử là Ninh An công chúa cao quý lạnh lùng chưa từng một lần ghé mắt. Còn bản thân hắn thì vừa trúng kỳ độc mê man ba ngày ba đêm, suýt nữa đã mất mạng trong âm thầm...\n\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# ACTORS: qui_binh_an|right|worried\n\nHắn... đã nhập thể trùng sinh vào tử cục ngập tràn hiểm nguy này. Muốn sinh tồn nơi triều chính, trước hết phải nhìn thấu cục diện, giấu kín phong mang.\n\nCánh cửa gỗ sơn mài đột ngột bật mở. Tỳ nữ thân cận Tiểu Thúy vội vã chạy vào, gương mặt tái nhợt không còn giọt máu:\n\n# ACTORS: qui_binh_an|right|neutral, servant|left|respectful\n\n\"Phò mã gia! Ngài rốt cuộc đã tỉnh lại rồi! Vũ Hoàng bệ hạ truyền khẩu dụ khẩn, yến tiệc tiếp đón sứ đoàn Nam Ly Quốc sắp sửa khai yến tại Kim Loan Điện! Ngài... ngài phải lập tức nhập cung ngay!\"\n\nQuý Bình An cất giọng trầm tĩnh: \"Bình tĩnh lại. Sứ đoàn Nam Ly mang theo điều gì đến yến tiệc mà khiến cả triều đình đại loạn?\"\n\nTiểu Thúy run giọng bẩm báo: \"Dạ bẩm... Nam Ly phái sứ thần đệ nhất học sĩ đến, mang theo một vế đối tuyệt đỉnh thách thức sĩ tử Đại Vũ. Nghe nói cả Hàn Lâm Viện lẫn các vị đại học sĩ đều câm nín, Vũ Hoàng nổi lôi đình lôi cả hoàng thân quốc thích và phò mã vào cung!\"\n\nQuý Bình An khẽ cười lạnh: \"Xem ra Vũ Hoàng không phải cần ta đối đáp, mà là muốn tìm một kẻ gánh tội thay khi triều đình mất mặt. Được, vậy để ta vào hoàng cung xem bọn họ muốn diễn vở kịch gì.\"\n\n-> travel_to_palace\n\n=== travel_to_palace ===\n# BACKGROUND: bg_imperial_road\n# AMBIENT: rain\n# MUSIC: bgm_imperial_procession\n\nCỗ xe ngựa lăn bánh trên đường đá hoa cương kinh đô, tiếng vó ngựa gõ dồn dập giữa màn mưa đêm lạnh buốt.\n\nĐại Vũ Hoàng Triều ba trăm năm định đô, bề ngoài phồn hoa tựa gấm, nhưng bên trong thì cửu vương đoạt đích, phiên trấn rục rịch binh đao, phương Bắc có Thác Bạt thiết kỵ rình rập, phương Nam có Nam Ly mưu toan cắn nuốt Trung Nguyên.\n\nCòn Quý gia — từng là danh môn khai quốc — nay chịu đủ mọi nghi kỵ của Vũ Hoàng, phụ thân Quý Trọng Dung bị phế chức, huynh trưởng trấn giữ biên thùy cô độc.\n\n\"Nếu đã bước vào ván cờ này... thì ta sẽ là người nắm giữ quân cờ.\"\n\n-> imperial_banquet\n\n=== imperial_banquet ===\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|right|nervous, vu_hoang|center|stern, nam_ly_envoy|left|arrogant\n\n~ met_vu_hoang = true\n\nĐại điện Kim Loan nguy nga tráng lệ, ngai vàng Cửu Long tỏa ánh kim quang thâm nghiêm, nhưng sát khí và sự ngột ngạt bao trùm từng tấc không khí.\n\nVũ Hoàng ngự trên bảo tọa, sắc mặt âm trầm như mây đen trước cơn bão. Hai bên bá quan văn võ cúi gầm mặt, không một ai dám ngẩng đầu thở mạnh.\n\nChính giữa đại điện, sứ thần Nam Ly Quốc khoác cẩm bào xanh thẫm ngạo nghễ vuốt râu, cất giọng sang sảng đầy vẻ khinh miệt:\n\n\"Bệ hạ Đại Vũ, vế đối này chỉ là chút thi tài tầm thường của phương Nam ta. Nếu vương triều trăm vạn sĩ tử mà không ai đối nổi, thì danh xưng 'Văn hiến thiên bang' từ nay xin giao lại cho Nam Ly ta vậy!\"\n\nSứ thần Nam Ly dõng dạc đọc vế đối vách đá:\n\n\"「天当棋盘星作子，谁人敢下？」\"\n\n\"Thiên đương kỳ bàn tinh tác tử, thùy nhân cảm hạ?\"\n(Trời làm bàn cờ sao làm quân, ai dám hạ cờ?)\n\nCả đại điện xôn xao. Quan văn nhìn nhau, lắc đầu. Quan võ im phắc. Một vế đối ngập tràn sát khí và cuồng vọng — lấy trời đất làm bàn cờ, biến nhật nguyệt tinh tú thành con tốt!\n\nVũ Hoàng nhíu mày, ánh mắt quét qua triều thần rồi dừng lại ở Quý Bình An — phò mã đứng cuối hàng:\n\n\"Quý Bình An! Ngươi dù sao cũng là con em Quý gia, đọc qua thi thư. Ngươi đối cho trẫm!\"\n\n-> poetry_choice\n\n=== poetry_choice ===\n# SCENE_TYPE: choice\n\nTrước mắt hắn là vận mệnh của cả một triều đại. Nếu vương triều chịu nhục, lửa chiến tranh sẽ thiêu rụi phương Nam. Quý Bình An quyết định xuất thế:\n\n* [Hoành Đao · Đối vế nghịch thiên: \"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?\"]\n  -> poetry_triumph\n\n* [Khiêm Cung · Đối vế mực thước: Giữ thể diện triều đình, giấu kín phong mang]\n  -> poetry_mediocre\n\n* [Quyền Mưu · Vạch trần dã tâm: Đanh thép chất vấn sứ thần Nam Ly trước điện Kim Loan]\n  -> poetry_silence\n\n=== poetry_triumph ===\n# EFFECT: camera_shake|0.8\n# EFFECT: screen_flash|#FFD700|500\n# EFFECT: sfx_thunder_dramatic\n# ACTORS: qui_binh_an|right|confident, nam_ly_envoy|left|shocked\n\n~ gold += 100\n~ poetry_duel_won = true\n~ suspicion += 10\n~ imperial_prestige += 1\n\nQuý Bình An tiến lên một bước, tà áo hắc bào tung bay giữa đại điện. Tiếng cười khẽ của hắn vang vọng khắp Kim Loan:\n\n\"Sứ thần Nam Ly ếch ngồi đáy giếng, cũng dám đem chút tài mọn ra bêu rếu trước mặt Hoàng thượng?\"\n\nHắn ngẩng đầu, ánh mắt uy nghiêm như sấm sét:\n\n\"「地作琵琶路作弦，盖世谁弹？」\"\n\n\"Địa tác tỳ bà lộ tác huyền, cái thế thùy đạn?\"\n(Đất làm đàn tỳ bà đường làm dây, bậc cái thế nào dám gảy?)\n\nMột câu xuất khẩu, sấm rền giữa trời quang! Trời làm bàn cờ — Đất làm tỳ bà. Sao làm quân cờ — Đường thiên lý làm dây đàn!\n\nKhí phách ngút trời, nuốt trọn càn khôn, biến cả non sông gấm vóc thành khúc đàn của bậc đế vương! Sứ thần Nam Ly lùi liền ba bước, sắc mặt trắng bệch không thốt nên lời.\n\nVũ Hoàng chấn động đứng phắt dậy khỏi long ngai, vỗ mạnh lên án thư: \"HẢO! HẢO MỘT CÂU CÁI THẾ THÙY ĐẠN!\"\n\n\"Quý gia quả nhiên không hổ danh Trấn Quốc hổ môn! Ban thưởng phò mã Quý Bình An một trăm lượng hoàng kim!\"\n\n# EFFECT: show_toast|[ 賜 ] +100 Hoàng Kim Thưởng Kim Loan Điện|reward\n\n-> system_awakening\n\n=== poetry_mediocre ===\n# ACTORS: qui_binh_an|right|neutral, vu_hoang|center|disappointed\n~ suspicion -= 5\n~ gold += 10\n\nQuý Bình An chắp tay hành lễ, từ tốn đọc một vế đối thanh nhã, vừa đủ giải vây cho triều đình mà không bộc lộ quá nhiều tài năng kinh thế hãi tục. Vũ Hoàng khẽ gật đầu, ban thưởng mười lượng bạc khích lệ.\n\n-> system_awakening\n\n=== poetry_silence ===\n# ACTORS: qui_binh_an|right|head_down, vu_hoang|center|contemptuous\n~ suspicion += 5\n~ imperial_prestige += 2\n~ gold += 50\n\nQuý Bình An cất giọng đanh thép vạch trần dã tâm mượn văn thăm dò quân sự của Nam Ly khiến sứ thần tái mặt, Vũ Hoàng thầm khen ngợi sự nhạy bén chính trị.\n\n-> system_awakening\n\n=== system_awakening ===\n# BACKGROUND: bg_void_golden\n# MUSIC: bgm_system_activation\n# EFFECT: screen_flash|#FFD700|1000\n# EFFECT: sfx_system_chime\n\n~ system_awakened = true\n~ has_anh_hon_lenh = true\n\n【 CÀN KHÔN ĐẢO CHUYỂN · THIÊN CƠ KÍCH HOẠT 】\n\n⟨ Cảm ứng: Hùng tài đại lược · Trí tuệ thấu suốt càn khôn ⟩\n⟨ Khởi động: Thượng Cổ Bái Tướng Thần Đàn ⟩\n⟨ Ban tặng vật phẩm: Thượng Cổ Anh Hồn Lệnh × 1 ⟩\n\n# EFFECT: show_toast|[ 賜 ] THỨC TỈNH THIÊN CƠ: Tiếp nhận Thượng Cổ Anh Hồn Lệnh|system\n# EFFECT: grant_ticket|1\n\nMột cỗ hàn khí hùng hồn hòa cùng kim quang chói lòa tràn vào đan điền Quý Bình An. Trong lòng bàn tay hắn, phiến Thượng Cổ Anh Hồn Lệnh bằng đồng khắc long phụng ngưng tụ thành thực thể, tỏa ra uy áp ngập tràn.\n\n[THIÊN CƠ HỆ THỐNG]: Ký chủ đã bước qua ngưỡng cửa sinh tử, đoạt lấy thiên mệnh. Kể từ giờ phút này, có thể chiêu mộ chiến thần, mưu sĩ ngàn năm về dưới trướng!\n\n-> chapter_1_aftermath\n\n=== chapter_1_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_night_contemplation\n# ACTORS: qui_binh_an|right|determined\n\n~ chapter = 1\n~ met_to_kien_phong = true\n\nĐêm khuya tẩm thất phò mã phủ. Ánh trăng lạnh rọi qua song cửa sổ, chiếu lên phiến Thượng Cổ Anh Hồn Lệnh nằm trên bàn gỗ đàn hương.\n\nQuý Bình An đứng chắp tay nhìn ra màn đêm kinh đô mịt mùng:\n\n\"Vũ Hoàng ngoài mặt khen thưởng nhưng ánh mắt đầy vẻ thăm dò kiêng kỵ. Còn Nam Ly chịu nhục tại điện tiền ắt sẽ giở thủ đoạn ám sát hoặc gây hấn biên cương...\"\n\n\"Không thể chần chừ thêm nữa. Phải mau chóng khởi động Bái Tướng Thần Đàn, chiêu mộ võ tướng trấn giữ cơ đồ!\"\n\n# EFFECT: show_toast|[ 卷 ] HOÀN TẤT HỒI 1: Phò Mã Thức Tỉnh & Đối Thơ Chấn Kinh Đô|milestone\n# EFFECT: chapter_complete|1\n\n-> chapter_5_transition\n\n// ============================================================\n// CHƯƠNG 5: MẬT THẤT PHÒ MÃ PHỦ & BÁI TƯỚNG ĐÀI\n// ============================================================\n\n=== chapter_5_transition ===\n# CHAPTER_TITLE: Hồi 2 · Chương 5: Bái Tướng Đài Khai Mở\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_mystical_summoning\n\n~ chapter = 5\n\nBốn ngày trôi qua kể từ yến tiệc đại điện. Quý Bình An dành trọn thời gian nắm bắt tình thế — Đại Vũ Hoàng Triều thù trong giặc ngoài, và sức mạnh bí ẩn của Thượng Cổ Bái Tướng Đàn.\n\nĐêm nay, trong mật thất sâu nhất của Phò Mã Phủ, phiến Anh Hồn Lệnh bỗng rung lên từng hồi chuông trầm hùng.\n\n[THIÊN CƠ HỆ THỐNG]: Địa mạch quy tụ. Thượng Cổ Bái Tướng Thần Đàn — Khai Mở!\n\n# EFFECT: screen_flash|#FFD700|800\n# EFFECT: sfx_gong_ancient\n\n~ unlocked_gacha = true\n# EFFECT: show_toast|[ 壇 ] KHAI MỞ: Bái Tướng Thần Đàn (Chiêu Mộ Danh Tướng)|unlock\n# EFFECT: unlock_feature|bai_tuong_dai\n\n[THIÊN CƠ HỆ THỐNG]: Ký chủ có thể tế xuất Anh Hồn Lệnh để thỉnh triệu anh linh danh tướng thời Tam Quốc quy vị.\n\n* [Thiên Cơ · Khởi Động Bái Tướng Thần Đàn: \"Thượng Cổ Bái Tướng Đài, phụng mệnh ta triệu hoán danh tướng ngàn năm quy vị!\"]\n  # EFFECT: trigger_gacha|bai_tuong_dai\n  -> waiting_gacha_ritual\n\n=== waiting_gacha_ritual ===\n# EFFECT: trigger_gacha|bai_tuong_dai\n// Trạng thái chờ người chơi thao tác trên Bái Tướng Đài\nKhai mở thần đàn tế tướng...\n-> END\n\n=== trieu_van_arrival ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# ACTORS: qui_binh_an|right|amazed, trieu_van|left|noble\n# MUSIC: bgm_hero_theme\n\n~ affinity_trieu_van = 50\n\nÁnh sáng bạc ngân lóe lên rực rỡ, sương khói ngưng tụ thành thân ảnh một vị dũng tướng oai phong lẫm liệt.\n\nGiáp bạc sáng loáng, bạch bào tung bay, tay cầm Long Đảm Lượng Ngân Thương tỏa ra chiến ý ngút trời.\n\nTriệu Tử Long — Thường Sơn Triệu Vân — quỳ một gối, thương cắm thẳng xuống sàn đá, giọng nói sang sảng chấn động mật thất:\n\n\"Triệu Vân, Triệu Tử Long, bái kiến Chúa Công!\"\n\nQuý Bình An xúc động tiến lên đỡ lấy hai tay Tử Long: \"Tử Long mau bình thân! Có ngươi bên cạnh, Quý Bình An ta hà tất phải sợ chông gai nghịch cảnh!\"\n\nTriệu Vân ngẩng đầu, ánh mắt kiên định như thiết thạch: \"Tử Long nguyện đem Long Đảm Thương bảo hộ Chúa Công, dù đối mặt vạn mã thiên quân cũng quyết không lùi nửa bước!\"\n\nMũi thương khẽ rung — bảy đạo thương ảnh hóa thành hàn quang xé toang hư không, xuyên qua bảy trụ đá mật thất trong chớp mắt mà không làm vỡ một viên ngói. Đó chính là Thất Thám Bàn Xà Thương Pháp cái thế vô song!\n\nQuý Bình An nhìn Triệu Tử Long đứng sừng sững trong phò mã phủ, trung trinh và sẵn sàng đẫm máu sa trường: \"Tử Long, muốn nuôi quân đúc giáp thì ngân quỹ phải dồi dào. Ngày mai đến Thiên Kim Lâu bàn chuyện làm ăn!\"\n\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 5: Chiêu Mộ Thường Sơn Triệu Tử Long SSR|milestone\n# EFFECT: chapter_complete|5\n\n-> chapter_8_transition\n\n// ============================================================\n// CHƯƠNG 8: THIÊN KIM LÂU & THẤU HOA CAO\n// ============================================================\n\n=== chapter_8_transition ===\n# CHAPTER_TITLE: Hồi 3 · Chương 8: Phát Minh Thấu Hoa Cao\n# BACKGROUND: bg_thien_kim_lau\n# MUSIC: bgm_marketplace\n# ACTORS: qui_binh_an|right|clever, ve_ti_vu|left|curious\n\n~ chapter = 8\n~ met_ve_ti_vu = true\n\nBa ngày sau khi chiêu mộ Triệu Vân.\n\nQuý Bình An ngồi trên lầu cao nhất của Thiên Kim Lâu — tửu lâu lớn nhất kinh đô, do lâu chủ Vệ Ti Vũ phong hoa tuyệt đại điều hành.\n\nHắn đặt lên bàn một chiếc hộp sơn mài — bên trong là thanh xà phòng ngát hương hoa nhài, mịn màng như ngọc thạch — bảo vật hắn đã bí mật điều chế từ nguyên liệu thảo dược tự nhiên.\n\n\"Vệ lâu chủ, thương phẩm này... sẽ khiến cả kinh đô điên đảo.\"\n\nVệ Ti Vũ khẽ ngửi làn hương thanh khiết, đôi mắt phượng sáng rực: \"Hương thơm thoát tục, trơn láng như mỡ đông. Phò mã gia, đây là kỳ trân dị bảo gì?\"\n\n\"Thấu Hoa Cao. Rửa sạch bụi trần, lưu hương bảy ngày, dưỡng nhan tuyệt phẩm. Mỗi bánh giá mười lượng bạc dành riêng cho vương tôn quý tộc.\"\n\n* [Hợp Tác Toàn Diện · Bắt tay cùng Vệ Ti Vũ: \"Ta xuất bí phương độc quyền, lâu chủ lo mạng lưới phân phối, lợi nhuận chia đôi!\"]\n  ~ gold += 3000\n  ~ unlocked_soap = true\n  \"Ta cung cấp công thức độc quyền, Thiên Kim Lâu lo vận chuyển và tiêu thụ. Lợi nhuận chia đều.\"\n  Vệ Ti Vũ khẽ cười quyến rũ, nâng chén rượu chúc mừng: \"Phò mã gia quả là bậc kỳ tài ẩn nhẫn. Thương vụ này, tiện thiếp nhận!\"\n  # EFFECT: show_toast|[ 商 ] MỞ KHÓA: Kinh Doanh Thấu Hoa Cao (+3.000 Vàng mỗi lượt Sa Bàn)|unlock\n  # EFFECT: unlock_feature|thau_hoa_cao\n  -> chapter_8_aftermath\n\n* [Ẩn Nhẫn Tự Chủ · Lập xưởng chế tạo riêng: \"Bí phương chưa thể để lộ ra ngoài, tạm thời sản xuất quy mô nhỏ tích lũy thực lực.\"]\n  ~ gold += 1000\n  ~ unlocked_soap = true\n  \"Chưa vội khuếch trương. Ta sẽ thăm dò thị trường trước, từng bước tích súc ngân quỹ.\"\n  # EFFECT: show_toast|[ 商 ] MỞ KHÓA: Phường Đúc Thấu Hoa Cao (+1.000 Vàng mỗi lượt)|unlock\n  # EFFECT: unlock_feature|thau_hoa_cao\n  -> chapter_8_aftermath\n\n=== chapter_8_aftermath ===\n# ACTORS: qui_binh_an|right|satisfied\n\nNguồn hoàng kim ròng rã bắt đầu chảy vào túi phò mã phủ. Có tiền, có tướng — Quý Bình An đã đặt viên đá tảng đầu tiên cho đại nghiệp tranh bá. Hắn âm thầm mở rộng tai mắt khắp các ngõ ngách kinh thành.\n\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 8: Phát Minh Thấu Hoa Cao Kinh Doanh|milestone\n# EFFECT: chapter_complete|8\n\n-> chapter_10_transition\n\n// ============================================================\n// CHƯƠNG 10: THÍCH KHÁCH ĐÊM TRĂNG\n// ============================================================\n\n=== chapter_10_transition ===\n# CHAPTER_TITLE: Hồi 4 · Chương 10: Thích Khách Đêm Trăng\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_suspense_night\n# ACTORS: qui_binh_an|right|alarmed\n\n~ chapter = 10\n\nĐêm rằm gió lộng. Phò Mã Phủ tịch mịch như tờ.\n\nQuý Bình An đang nghiên cứu bản đồ địa hình trong thư phòng thì một luồng sát khí lạnh buốt gáy ập tới! Ba đạo bóng đen xé gió lao xuống từ xà nhà — lưỡi đoản đao tẩm độc xanh biếc nhằm thẳng yếu huyệt của hắn!\n\n* [Sát Phạt · Hét gọi Triệu Vân: \"Tử Long, lưu lại kẻ sống!\"]\n  -> assassin_zhao_yun_saves\n\n* [Quyền Mưu · Lâm nguy không loạn: Phán đoán phương vị mũi đao, né tránh hiểm cảnh tìm chỗ sơ hở!]\n  -> assassin_self_dodge\n\n=== assassin_zhao_yun_saves ===\n# EFFECT: sfx_spear_whoosh\n# EFFECT: screen_flash|#C0C0C0|300\n# EFFECT: camera_shake|0.5\n# ACTORS: trieu_van|left|battle_stance, assassin|center|attacking\n\n\"TỬ LONG!\"\n\nThanh âm chưa dứt, một dải ngân hà rực sáng đã xé toang màn đêm — Long Đảm Thương xuất kích!\n\nTriệu Vân tựa như thần phong giáng thế. Ba mũi thương điểm chuẩn xác vào cổ tay thích khách, đánh bay binh khí, đá văng bọn chúng xuống sàn đá!\n\n\"Chúa Công, bọn chúng là tử sĩ chuyên nghiệp!\"\n\n~ affinity_trieu_van += 15\n-> assassin_aftermath\n\n=== assassin_self_dodge ===\n# ACTORS: qui_binh_an|right|rolling, assassin|center|attacking\n# EFFECT: camera_shake|0.3\n\nQuý Bình An xoay người ngã nhào ra sau bức bình phong gỗ lim, lưỡi đao độc chém toạc vạt áo!\n\nThích khách thứ hai vừa vung đao bồi tiếp thì hàn quang lóe lên! Long Đảm Thương của Triệu Vân quét ngang, đánh gãy xương sườn thích khách hất văng ra sân!\n\n~ affinity_trieu_van += 10\n-> assassin_aftermath\n\n=== assassin_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_investigation\n# ACTORS: qui_binh_an|right|serious, trieu_van|left|reporting\n\nTriệu Vân xốc ngược cánh tay thích khách: \"Bọn chúng đều cắn vỡ độc hoàn tự sát. Nhưng trên cổ tay có ấn triện hình đầu sói — đây là mật vụ thuộc Phi Báo Quân của Bắc Cương!\"\n\nHắn nhìn Quý Bình An trầm trọng: \"Chúa Công, có kẻ trong triều cấu kết với phiên trấn phương Bắc muốn trừ khử ngài.\"\n\n* [Ẩn Nhẫn · Xóa sạch dấu vết: \"Bí mật chôn xác, dĩ bất biến ứng vạn biến, âm thầm truy vết kẻ chủ mưu.\"]\n  ~ suspicion -= 10\n  ~ gold += 2000\n  ch10_method = \"hide\"\n  -> chapter_10_complete\n\n* [Hoành Đao · Đối chất triều đình: \"Đem xác ném trước mặt trăm quan, bức kẻ giấu mặt phải lộ sơ hở!\"]\n  ~ suspicion += 20\n  ~ gold += 5000\n  ch10_method = \"confront\"\n  -> chapter_10_complete\n\n* [Quân Cơ · Thám thính biên cương: \"Sát thủ mang dấu vết phương Bắc, lập tức sai thám mã cấp báo tiền tuyến!\"]\n  ~ suspicion += 5\n  ch10_method = \"investigate\"\n  -> chapter_10_complete\n\n=== chapter_10_complete ===\nQuý Bình An nhìn dấu ấn đầu sói trên cổ tay tử sĩ, ánh mắt lạnh như băng. Kinh đô đã là lò lửa, chỉ có nắm lấy binh quyền mới mong bảo toàn gia tộc và xoay chuyển càn khôn!\n\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 10: Thích Khách Đêm Trăng|milestone\n# EFFECT: chapter_complete|10\n\n-> chapter_15_transition\n\n// ============================================================\n// CHƯƠNG 15: VŨ HOÀNG HẠ CHỈ BẮC CHINH\n// ============================================================\n\n=== chapter_15_transition ===\n# CHAPTER_TITLE: Hồi 5 · Chương 15: Chinh Phạt Bắc Cảnh\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_decree\n# ACTORS: vu_hoang|center|commanding, qui_binh_an|right|kneeling\n\n~ chapter = 15\n\nĐại điện Kim Loan sớm hôm sau. Vũ Hoàng ngự trên ngai vàng, sắc diện ngập tràn phẫn nộ:\n\n\"Bắc Cương phản nghịch! Phi Báo Quân liên kết với nghịch tặc Địch Hỏa công hãm ba huyện, chém chết quan trấn thủ, uy hiếp kinh kỳ!\"\n\nVũ Hoàng rút ra Thượng Phương Bảo Kiếm, ánh mắt dừng lại trên người Quý Bình An:\n\n\"Quý Bình An! Phụ thân ngươi từng trấn thủ phương Bắc, ngươi lại có dũng khí phi thường. Trẫm lệnh ngươi tiếp nhận chức Chinh Bắc Tiền Phong Tướng Quân, lập tức xuất chinh dẹp loạn!\"\n\n# EFFECT: screen_flash|#FFD700|500\n# EFFECT: sfx_imperial_decree\n\n~ unlocked_map = true\n~ imperial_prestige += 1\n~ gold += 5000\n~ jade += 20\n~ suspicion += 5\n~ affinity_trieu_van += 5\n\n# EFFECT: show_toast|[ 輿 ] KHAI MỞ: Tầng 2 — Sơn Hà Sa Bàn (Grand Strategy)|unlock\n# EFFECT: unlock_feature|de_nghiep_sa_ban\n\n[THIÊN CƠ HỆ THỐNG]: Khai mở Tầng 2 — Sơn Hà Sa Bàn! Cho phép điều binh khiển tướng, bố trí quân lương và tuần tra các cứ điểm trọng yếu.\n\nQuý Bình An quỳ nhận Hổ Phù bằng đồng, ánh mắt sáng rực. Bên cạnh hắn, Triệu Tử Long nắm chặt chuôi thương — đại thời đại tranh bá chính thức bắt đầu!\n\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 15: Tiếp Nhận Thánh Chỉ Bắc Chinh|milestone\n# EFFECT: chapter_complete|15\n\n-> chapter_20_start\n\n",
    "chapter_115_to_182": "// ============================================================================\n// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK\n// HỒI 3: TÂN HOÀNG ĐĂNG CƠ, ĐIÊU THUYỀN - TRƯƠNG LIÊU QUY VỊ & HỎA CÔNG BẮC CÔ SƠN (CHƯƠNG 115 - 182)\n// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn\n// ============================================================================\n\n=== chapter_115_start ===\n# CHAPTER_TITLE: Hồi 3 · Chương 115: Tân Hoàng Tức Vị · Thế Cục Đổi Dời\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: tu_ngoc_trach|center|noble, qui_binh_an|right|determined, an_hoang_hau|left|stern\n\nSau quốc tang Vũ Hoàng, Đại Hoàng Tử Tử Ngọc Trạch chính thức đăng cơ Hoàng Đế Đại Vũ, tôn mẫu hậu làm An Thái Hậu. \n\nNơi triều đường, Tân Hoàng vốn tính nhân hòa nhu nhược, mọi việc triều chính dần rơi vào tay An Thái Hậu và cựu thần gia tộc Ngao thị. Ngao Khâm - đầu sỏ thế gia kinh đô - ỷ vào công lao ủng hộ lập hoàng, ngang nhiên dâng biểu đòi thu hồi toàn bộ binh quyền Bắc Cương từ tay Quý Bình An.\n\nAn Thái Hậu ngồi sau rèm châu, thanh âm lạnh lùng truyền xuống:\n\"Phò Mã Gia, tiên hoàng đã băng hà, ba châu Bắc Cảnh không thể để một mình Quý gia nắm giữ mãi. Ngao thị có công cần vương, trẫm ý muốn giao Liễu Châu cho Ngao Khâm tiếp quản, ngươi thấy thế nào?\"\n\n* [Cương Quyết · Cự tuyệt thẳng thừng: \"Biên cương là máu xương tướng sĩ, há để lũ sâu mọt nhúng tay?\"]\n    ~ suspicion += 15\n    ~ imperial_prestige += 3\n    Quý Bình An đứng thẳng người, giọng vang rền điện ngọc: \"Bắc Cương là phên dậu sinh tử của Đại Vũ! Ai dám tự ý đòi đất, trước hết hỏi thanh Long Đảm Thương của Triệu Tử Long và song kích của Điển Vi xem có đồng ý hay không!\"\n    Cả triều đình nín thở, Ngao Khâm tức giận run người nhưng không dám ho he.\n    -> ngao_thi_conspiracy\n\n* [Uyển Chuyển · Đòi tiền triều đình: \"Giao Liễu Châu cũng được, xin triều đình cấp đủ 50 vạn lượng quân phí trước đã.\"]\n    ~ suspicion -= 5\n    ~ gold += 20000\n    Ngao Khâm nghẹn họng: Triều đình quốc khố trống rỗng sau quốc tang, lấy đâu ra 50 vạn lượng bạc ròng? Ý đồ đoạt thành tạm thời bị bẻ gãy.\n    -> ngao_thi_conspiracy\n\n=== ngao_thi_conspiracy ===\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious\n\nTrở về Phò Mã Phủ, Độc Sĩ Giả Hủ và Lý Nho đã đợi sẵn trong mật thất. Lý Nho trải một phong mật thư lên bàn, ánh mắt lóe lên hàn mang rợn người:\n\n\"Chúa Công! Mạng lưới của chúng ta phát hiện Ngao thị cấu kết với Đình Úy Phủ, chuẩn bị hạ độc ám sát Ninh An Công Chúa và vu cáo Quý gia mưu phản! Người làm đại sự, tuyệt đối không thể nhân từ nương tay!\"\n\nGiả Hủ khẽ phẩy quạt lông vũ, cười lạnh: \"Độc xà muốn cắn người, trước hết phải đập nát đầu xà! Đêm nay, diệt tộc Ngao thị!\"\n\n* [Quyết Đoán · Ra lệnh huyết tẩy Ngao Phủ: \"Đêm nay nhổ cỏ tận gốc, một tên cũng không để thoát!\"]\n    -> huyet_tay_ngao_phu\n\n* [Thận Trọng · Cứu người tại Đình Úy Phủ trước]\n    -> dai_nao_dinh_uy_phu\n\n=== huyet_tay_ngao_phu ===\n# CHAPTER_TITLE: Hồi 3 · Chương 121: Đêm Trăng Tẩy Oán · Diệt Môn Ngao Thị\n# BACKGROUND: bg_darkness\n# MUSIC: bgm_epic_final_battle\n# ACTORS: trieu_van|center|spear_ready, qui_binh_an|right|commanding\n\nCanh ba đêm tối, sấm chớp rền vang khắp kinh thành, một trận mưa rào trút xuống che lấp tiếng gươm đao.\n\nTriệu Vân dẫn một trăm thiết kỵ Huyết Y Doanh phong tỏa bốn cổng Ngao Phủ. Điển Vi vung song thiết kích đập nát cổng đại viện bằng đá xanh ngàn cân!\n\n# EFFECT: camera_shake|0.8\n# EFFECT: screen_flash|#C0C0C0|400\n# EFFECT: sfx_spear_whoosh\n\nNgao Khâm kinh hoàng từ trong phòng ngủ lao ra: \"Quý Bình An! Ngươi dám tự tiện giết đại thần triều đình? Hoàng Đế và Thái Hậu sẽ tru diệt chín tộc ngươi!\"\n\nQuý Bình An từ từ bước vào, tay cầm bức thư thông đồng phản nghịch: \"Ngao Khâm, chứng cứ ngươi tư thông ngoại bang đều ở đây. Dưới cửu tuyền, hãy đi mà giải thích với Tiên Hoàng!\"\n\nTriệu Vân thương hóa vạn điểm hàn tinh, một thương xuyên tâm Ngao Khâm! Điển Vi và Huyết Y Doanh quét sạch toàn bộ phủ đệ.\n\nTịch thu tại hầm ngầm Ngao phủ: 200.000 lượng hoàng kim, hàng ngàn rương châu báu lụa là!\n\n~ gold += 200000\n~ suspicion += 10\n~ imperial_prestige += 5\n\n# EFFECT: show_toast|[ 誅 ] DIỆT MÔN NGAO THỊ · Thu Về 200.000 Vàng!|reward\n\n-> dai_nao_dinh_uy_phu\n\n=== dai_nao_dinh_uy_phu ===\n# CHAPTER_TITLE: Hồi 3 · Chương 136: Phá Ngục Đình Úy · Thu Phục Quỷ Y\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|right|confident, dien_vi|left|standing_guard\n\nNgay trong đêm, Điển Vi dẫn binh xông thẳng vào ngục tối Đình Úy Phủ, chém đứt xiềng xích huyền thiết cứu thoát hai kỳ nhân đang bị tra khảo dã man:\n- Quỷ y Cơ Vô Pháp: tinh thông độc thuật và cơ quan hỏa dược.\n- Cao thủ Cơ Vô Thiên: khinh công đệ nhất thiên hạ.\n\nCơ Vô Pháp quỳ rạp dưới chân Quý Bình An: \"Đa tạ Phò Mã cứu mạng! Huynh đệ Cơ thị từ nay nguyện làm trâu làm ngựa, tận hiến tài mọn chế tạo cơ quan hỏa khí cho ngài!\"\n\n~ unlocked_granary = true\n\n-> dieu_thuyen_summoning\n\n=== dieu_thuyen_summoning ===\n# CHAPTER_TITLE: Hồi 3 · Chương 140: Bế Nguyệt Tuyệt Đại · Mạng Lưới Hồng Nhan\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_ethereal_void\n# ACTORS: qui_binh_an|center|amazed\n# EFFECT: screen_flash|#FFC0CB|1500\n# EFFECT: camera_shake|0.5\n# EFFECT: sfx_system_chime\n\nTrong mật thất Phò Mã Phủ, Thần Đàn bỗng tỏa ra hương sen ngạt ngào dị thường. Từng cánh hoa đào bay lượn giữa không gian huyền ảo, ánh trăng vằng vặc chiếu rọi một bóng hình yểu điệu thướt tha, phong hoa tuyệt đại, nhan sắc khuynh quốc khuynh thành khiến thiên địa nhật nguyệt phải lu mờ!\n\n# EFFECT: summon_grand_reveal|hero_dieuthuyen\n# EFFECT: unlock_feature|feature_hong_nhan\n# EFFECT: show_toast|[ 巾 ] BÁI TƯỚNG THẦN ĐÀN: Tuyệt Thế Mỹ Nhân Điêu Thuyền Quy Vị!|triumph\n\nĐiêu Thuyền nhẹ nhàng bước xuống từ đài sen, đôi mắt long lanh tựa hồ thu thủy, cúi mình thi lễ e ấp nhưng khí chất đoan trang:\n\n\"Thiếp thân Điêu Thuyền, bái kiến lang quân... Từ nay nguyện bên chàng kết tóc phu thê, vì chàng dệt nên mạng lưới tình báo khắp bốn phương thiên hạ!\"\n\n~ gold -= 50000\n~ host_force += 6\n~ affinity_dieu_thuyen += 50\n\nĐiêu Thuyền vừa quy vị liền lập tức tiếp quản mạng lưới nữ điệp báo \"Hồng Nhan\". Chỉ trong vòng ba ngày, toàn bộ tin tức cơ mật từ nội cung Đại Vũ, Tây Lăng, Nam Ly và Đông Thương đều được truyền thẳng về bàn trà Phò Mã Phủ!\n\n-> triple_summoning\n\n=== triple_summoning ===\n# CHAPTER_TITLE: Hồi 3 · Chương 150: Hổ Tướng Huyết Y · Trương Liêu - Khúc Nghĩa - Hoa Hùng\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_hero_theme\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#FFD700|2000\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_thunder_dramatic\n\nTin khẩn cấp từ Hồng Nhan truyền về: Quân Thần Nam Ly Cung Sinh cùng Đại tướng Chu Bất Ninh dẫn ba mươi vạn đại quân áp sát Liễu Châu! Biên cương ngàn cân treo sợi tóc!\n\nQuý Bình An quyết đoán dồn toàn bộ gia sản mở đại tế Thần Đàn!\n\nBa đạo thiên lôi xé toạc bầu trời, ba vị danh tướng lừng lẫy Tam Quốc đồng loạt giáng lâm:\n\n1. TRƯƠNG LIÊU (Văn Viễn): Tuyệt thế thống soái, cầm Nguyệt Nha Kích, thống lĩnh toàn bộ năm vạn Huyết Y Doanh!\n# EFFECT: summon_grand_reveal|hero_truonglieu\n\n2. KHÚC NGHĨA: Dũng tướng Tiên Đăng, trang bị thần nỏ phá giáp và khiên sắt hạng nặng!\n# EFFECT: summon_grand_reveal|hero_khucnghia\n\n3. HOA HÙNG: Quan Tây dũng mãnh hổ tướng, cầm Trảm Mã Đại Đao uy chấn tiền quân!\n# EFFECT: summon_grand_reveal|hero_hoahung\n\n# EFFECT: show_toast|[ 帥 ] TAM ĐẠI HỔ TƯỚNG QUY VỊ: Trương Liêu · Khúc Nghĩa · Hoa Hùng!|triumph\n\n~ gold -= 120000\n~ host_force += 15\n\nTrương Liêu quỳ một gối, Nguyệt Nha Kích chống thẳng xuống đất, khí phách ngút trời: \"Chúa Công chớ lo! Ba mươi vạn giặc Nam Ly chẳng qua chỉ là đàn cừu đợi làm thịt! Mạt tướng xin lấy đầu tướng địch dâng lên người!\"\n\n-> thiet_de_invention\n\n=== thiet_de_invention ===\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_rising_power\n# ACTORS: qui_binh_an|right|clever, trieu_van|left|impressed\n\nTại quân doanh Bắc Cương, Cơ Vô Pháp đem đến một phát minh chấn động: MÓNG NGỰA SẮT (Thiết Đề).\n\nNhững thanh sắt cong hình bán nguyệt được đóng chặt vào móng ngựa Bạch Mã Nghĩa Tòng. Nhờ đó, chiến mã có thể phi nước đại trên địa hình núi đá sắc nhọn mà không sợ mòn móng, tốc độ hành quân tăng vọt gấp ba lần!\n\n# EFFECT: show_toast|[ 器 ] PHÁT MINH ĐỘC BẢN: Móng Ngựa Sắt (Tốc Độ Kỵ Binh +300%)!|unlock\n# EFFECT: unlock_feature|feature_horseshoe\n\nTriệu Vân cưỡi thử một vòng, mừng rỡ vỗ tay: \"Kỳ diệu thay! Có thiết đề này, Bạch Mã kỵ binh của ta có thể vượt đèo lội suối, xuất quỷ nhập thần đánh úp hậu phương quân Nam Ly!\"\n\n-> hoa_cong_bac_co_son_prep\n\n=== hoa_cong_bac_co_son_prep ===\n# CHAPTER_TITLE: Hồi 3 · Chương 170: Thung Lũng Tử Thần · Đại Kế Bắc Cô Sơn\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_dark_schemes\n# ACTORS: jia_xu|left|mysterious, qui_binh_an|right|commanding\n\nTrong quân trướng, sa bàn Bắc Cô Sơn hiện rõ địa thế hiểm trở: một thung lũng hẹp dài hình túi tiền, hai bên là vách đá dựng đứng ngàn thước.\n\nGiả Hủ cầm cờ đen cắm thẳng vào trung tâm thung lũng:\n\"Cung Sinh cậy quân đông, tất sẽ dốc toàn lực đánh thẳng vào Liễu Châu theo con đường độc đạo Bắc Cô Sơn. Chúng ta dùng Trương Liêu và Huyết Y Doanh thủ thành kiên cường, nhử ba mươi vạn quân địch lọt sâu vào đáy túi... rồi phóng hỏa thiêu rụi!\"\n\n* [Hỏa Công Toàn Lực · Dùng hỏa dược và dầu tràm đốt sạch thung lũng]\n    ~ unlocked_flood = true\n    -> battle_bac_co_son_climax\n\n* [Hỏa Kích Kết Hợp Vu Hồi · Sai Triệu Vân luồn sau lưng cắt đứt đường lui]\n    ~ unlocked_flood = true\n    -> battle_bac_co_son_climax\n\n=== battle_bac_co_son_climax ===\n# CHAPTER_TITLE: Hồi 3 · Chương 180: Khói Lửa Rực Trời · Trảm Tướng Chu Bất Ninh\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: trieu_van|center|attacking, chu_bat_ninh|left|alarmed\n\nĐêm định mệnh tại Bắc Cô Sơn!\nBa mươi vạn quân Nam Ly lọt thỏm giữa hẻm núi. Đúng lúc đó, hàng ngàn hỏa tiễn và ống trúc hỏa dược phát nổ kinh thiên động địa!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: screen_flash|#FF4500|1500\n# EFFECT: sfx_siege_ram_hit\n\nBiển lửa đỏ rực thiêu đốt màn đêm, tiếng gào khóc thảm thiết rung chuyển núi rừng. Lương thảo, khí giới của ba mươi vạn quân Nam Ly hóa thành tro bụi!\n\nĐại tướng Chu Bất Ninh liều mạng mở đường máu tháo chạy. Nhưng ngay khúc ngoặt hiểm trở, Triệu Vân cưỡi Bạch Long Mã, tay cầm Long Đảm Thương chặn đứng lối thoát!\n\nChu Bất Ninh vung đại đao chém tới, Triệu Vân khẽ nghiêng mình, Long Đảm Thương hóa thành một vệt bạc xé toạc không khí, đâm xuyên qua yết hầu Chu Bất Ninh!\n\n# EFFECT: sfx_spear_whoosh\n# EFFECT: camera_shake|0.7\n\nChủ tướng đền mạng, ba mươi vạn quân Nam Ly hoàn toàn tan rã. Quân Thần Cung Sinh uất hận thổ huyết, phải cải trang thành lính quèn chạy trốn về nước.\n\nToàn thắng rực rỡ tại Bắc Cô Sơn! Quý Bình An thu phục hoàn toàn lòng quân ba châu Bắc Cảnh!\n\n~ gold += 150000\n~ rations += 100000\n~ imperial_prestige += 10\n\n# EFFECT: show_toast|[ 捷 ] ĐẠI THẮNG BẮC CÔ SƠN · Quét Sạch 30 Vạn Quân Nam Ly!|triumph\n# EFFECT: chapter_complete|182\n\n-> chapter_183_start\n",
    "chapter_16_to_52": "// ============================================================\n// Trấn Quốc Phò Mã Gia — Ink Scene Script\n// Phần 2: Từ Chương 16 đến Chương 52 (Hồi 1 Hoàn Tất)\n// ============================================================\n\n// ============================================================\n// CHƯƠNG 17-21: VẠN KIM MƯU SĨ MÃ TẮC & CAO NÂNG MÃ TẮC\n// ============================================================\n\n=== chapter_20_start ===\n# CHAPTER_TITLE: Hồi 6 · Chương 17-21: Vạn Kim Mưu Sĩ Mã Tắc\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_military_march\n# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard\n\n~ chapter = 20\n\nGió lạnh phương Bắc gào thét qua ải Nhạn Môn, cuốn theo cát bụi mịt mù ngoài quan ải.\n\nQuý Bình An khoác chiến bào đứng trong soái trướng tiền tiêu Bắc Cương. Sau lưng hắn, Triệu Tử Long uy dũng khôi giáp, Long Đảm Thương cắm thẳng bên bàn sa bàn.\n\nNguồn hoàng kim thu hoạch từ việc kinh doanh Thấu Hoa Cao tại Thiên Kim Lâu nay đã tích lũy hơn một vạn lượng!\n\nQuý Bình An lập tức câu thông Thiên Cơ:\n\n[THIÊN CƠ HỆ THỐNG]: Khởi động Bái Tướng Thần Đàn — Tiêu hao 1 Vạn Kim triệu hoán Mưu Thần!\n\n# EFFECT: screen_flash|#FFD700|700\n# EFFECT: sfx_gong_ancient\n# EFFECT: camera_shake|0.6\n\nKim quang vạn đạo rực sáng giữa soái trướng! Trận đồ Bát Quái bốc lên từng hồi linh khí chấn động càn khôn!\n\n[THIÊN CƠ HỆ THỐNG]: Chúc mừng ký chủ thành công triệu hoán Vạn Kim Mưu Sĩ: Mã Tắc (Mã Ấu Thường)!\n\n# EFFECT: summon_grand_reveal|hero_matac\n\n# ACTORS: qui_binh_an|right|armored, trieu_van|right|standing_guard, ma_tac|left|scholarly\n\nKim quang tan biến, một vị thanh niên văn sĩ tuấn tú, mình khoác thanh bào nho nhã, tay ôm thẻ tre binh thư bước ra từ trận đồ linh khí, khom mình hành lễ:\n\n\"Thuộc hạ Mã Tắc, tự Ấu Thường, bái kiến Chúa Công!\"\n\n~ affinity_matac = 50\n\nQuý Bình An bước tới đỡ Mã Tắc dậy, ôn tồn hỏi: \"Ấu Thường tinh thông binh thư, nay Bắc Cương khói lửa, ngươi có mưu kế gì phá địch?\"\n\nMã Tắc mở tung thẻ tre, ánh mắt sáng rực, đàm luận thao thao bất tuyệt:\n\n\"Khởi bẩm Chúa Công! Binh pháp có vân: 'Dĩ địa hình vi phụ, liêu địch chế thắng'. Bắc Cương núi non hiểm trở, nếu ta dẫn đại quân đóng trại trên đỉnh núi cô lập cao nhất, mượn thế trên cao nhìn xuống, địch quân ắt không dám tiến, khi chúng mỏi mệt ta ùa xuống tất đại thắng!\"\n\nTriệu Vân khẽ nhíu mày. Quý Bình An nghe xong thầm rùng mình trong bụng:\n\n'Quả nhiên là Mã Tắc! Lý thuyết binh pháp đầy ắp trong đầu, nhưng nếu thực sự giao binh quyền cho hắn lâm trận, e rằng lại tái hiện thảm cảnh Nhai Đình năm xưa!'\n\nĐúng lúc này, thám mã phi vào cấp báo: \"Báo! Vũ Hoàng ban chỉ phong Tô Vân làm Bắc Chinh Tướng Quân mang theo 3 vạn quân cùng tiến về phương Bắc, danh nghĩa phối hợp nhưng thực chất là giám sát và tranh đoạt quân công của Chúa Công!\"\n\nÁnh mắt Quý Bình An bỗng lóe lên tia sáng giảo hoạt — kế sách 'Cao Nâng Mã Tắc' lập tức thành hình!\n\n-> ma_tac_decision\n\n=== ma_tac_decision ===\n# SCENE_TYPE: choice\n\n* [Quyền Mưu · Kế Sách \"Cao Nâng Mã Tắc\": Khen Mã Tắc lên mây, xin Miễn Tử Lệnh và gài sang làm quân sư cho Tô Vân!]\n  ~ suspicion -= 5\n  ~ gold += 5000\n  Quý Bình An vỗ tay cười lớn: \"Ấu Thường quả là bậc kỳ tài kinh thiên vĩ địa! Mưu kế đóng quân trên núi này quá đỗi siêu phàm!\"\n  Hắn lập tức viết tấu chương dâng lên Vũ Hoàng khen ngợi Mã Tắc hết lời, xin ban Miễn Tử Lệnh cho Mã Tắc, rồi nhiệt tình tiến cử Mã Tắc sang làm đại quân sư bên cạnh Tô Vân!\n  Tô Vân mừng rỡ thu nạp, răm rắp làm theo mưu kế 'đóng quân trên cao' của Mã Tắc. Quả nhiên quân Tô Vân bị phản quân Nam Ly cắt đứt đường nước bao vây sa lầy, hoàn toàn mất đi thế chủ động!\n  Quý Bình An ung dung nắm toàn bộ thế cờ Bắc Cương mà không tốn nửa mũi tên!\n  # EFFECT: show_toast|[ 策 ] MỞ KHÓA MƯU KẾ: Cao Nâng Mã Tắc & Phản Gián Tô Vân|unlock\n  # EFFECT: unlock_feature|feature_ma_tac\n  -> chapter_20_complete\n\n* [Nội Chính · Khai Thác Sở Trường: Giao cho Mã Tắc phụ trách tu bổ và củng cố thành phòng Liễu Châu!]\n  ~ gold -= 2000\n  ~ rations += 10000\n  Quý Bình An biết Mã Tắc rất giỏi tính toán công sự và kiến trúc quân sự, liền hạ lệnh:\n  \"Ấu Thường, Liễu Châu là yết hầu hậu phương của đại quân. Ta giao cho ngươi toàn quyền đốc thúc đào hào, đắp lũy kiên cố, biến Liễu Châu thành pháo đài thép bất khả xâm phạm!\"\n  Mã Tắc cảm kích dốc hết tâm lực ngày đêm, hoàn thành xuất sắc công tác phòng ngự vững chắc thành trì hậu phương!\n  # EFFECT: show_toast|[ 策 ] MỞ KHÓA THẺ BÀI: Binh Thư Thao Lược & Tu Bổ Thành Phòng|unlock\n  # EFFECT: unlock_feature|feature_ma_tac\n  -> chapter_20_complete\n\n=== chapter_20_complete ===\nThế cờ phân hóa đã định, Quý Bình An nắm trọn quyền chủ động tiến quân về Bắc Cảnh, chuẩn bị tuyển mộ tân binh trung thành!\n\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 17-21: Vạn Kim Mưu Sĩ Mã Tắc|milestone\n# EFFECT: chapter_complete|20\n\n-> chapter_27_transition\n\n// ============================================================\n// CHƯƠNG 27: HỐ VŨ HOÀNG 20 VẠN VÀNG & TRIỆU HOÁN ĐỘC SĨ GIẢ HỦ\n// ============================================================\n\n=== chapter_27_transition ===\n# CHAPTER_TITLE: Hồi 7 · Chương 27: Triệu Hoán Độc Sĩ Giả Hủ\n# BACKGROUND: bg_pho_ma_phu_secret_room\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|thoughtful, trieu_van|right|standing_guard\n\n~ chapter = 27\n\nĐêm khuya tại mật thất phò mã phủ.\n\nQuý Bình An vừa hoàn tất một vố lừa ngoạn mục hố Vũ Hoàng và triều đình chi trọn 20 vạn lượng hoàng kim (200.000 Vàng) để chuộc lấy quân công cho Thập Tam Hoàng Tử và tiếp quản Huyết Y Doanh.\n\nTrước mắt hắn, đống vàng rực rỡ xếp cao như núi.\n\nQuý Bình An xuất 10 vạn kim kích hoạt thiên phú đặc thù \"Dũng Giả Vô Sợ\" cho Triệu Vân, tăng thêm mười điểm chiến lực vượt ngưỡng trăm, đạt tới Hoàng Cảnh đỉnh phong!\n\nHắn nhìn số hoàng kim còn lại, trong mắt ánh lên tia sáng dã tâm:\n\n\"Tử Long, canh giữ ngoài cửa phòng! Tuyệt đối không cho phép bất kỳ ai bước vào!\"\n\nTriệu Vân nghiêm cẩn chắp tay: \"Mạt tướng tuân mệnh!\"\n\nQuý Bình An một mình trong phòng kín, ấn mở Bái Tướng Thần Đàn, chọn mục [TRIỆU HOÁN TUYỆT THẾ MƯU THẦN - 10 VẠN KIM]!\n\n# EFFECT: screen_flash|#FFD700|1000\n# EFFECT: sfx_gong_ancient\n# EFFECT: camera_shake|0.7\n\n[THIÊN CƠ HỆ THỐNG]: Tiêu hao 10 vạn lượng hoàng kim! Địa mạch chấn động, Càn Khôn nghịch chuyển!\n[THIÊN CƠ HỆ THỐNG]: Chúc mừng ký chủ triệu hoán Tuyệt Thế Mưu Thần thành công — Độc Sĩ Giả Hủ (Cổ Hủ)!\n\n# EFFECT: summon_grand_reveal|hero_jiaxu\n\n# ACTORS: qui_binh_an|right|thoughtful, jia_xu|left|mysterious\n\n[THIÊN CƠ BẢNG]: Mưu Thần: Giả Hủ (Văn Hòa) · Trí Lực: 92 · Độ Trung Thành: 80 · Kỹ Năng: Độc Tâm (Kế càng độc xác suất thành công càng cao) · Ẩn chứa Phản Cốt!\n\nGiữa luồng khói đen pha lẫn ánh kim quang, một bóng người trung niên khoác trường bào màu xám tro chậm rãi ngưng hình. Diện mạo bình dị tựa như một hàn nho tay trói gà không chặt, nhưng đôi mắt thâm sâu như đầm lầy vạn trượng, lạnh lẽo đến thấu tận tim gan.\n\nGiả Hủ khom mình thi lễ:\n\n\"Thuộc hạ Cổ Hủ, bái kiến Chúa Công!\"\n\n~ met_gia_hu = true\n~ affinity_gia_hu = 40\n\nQuý Bình An đáy lòng chấn động: \"Độc Sĩ Giả Hủ! Kẻ tính toán không bỏ sót một nước cờ thời loạn thế!\"\n\nHắn tiến lên đỡ Giả Hủ: \"Được Văn Hòa tương trợ, bình sinh đại nghiệp của ta ắt thành!\"\n\nQuý Bình An mở tác chiến đồ Bắc Cương và khúc quanh sông Thanh Thủy: \"Văn Hòa, nghịch tặc Địch Hỏa liên kết năm vạn phản quân toan tính vây khốn ba châu, ngươi xem trận này nên phá thế nào?\"\n\nGiả Hủ khẽ vuốt chòm râu ngắn, ánh mắt lạnh lùng nhìn vào khúc quanh sông Thanh Thủy:\n\n\"Chúa Công, đã là chiến trận thì không có chỗ cho nhân từ. Mưu kế có ba đường, tùy Chúa Công định đoạt.\"\n\n-> jia_xu_stratagem_choice\n\n=== jia_xu_stratagem_choice ===\n# SCENE_TYPE: choice\n\nGiả Hủ từ tốn mở tấm lụa mật đồ:\n\n* [Độc Kế · Nhử địch vào tử địa hẻm núi, dùng hỏa dược và tên độc tiêu diệt hoàn toàn]\n  ~ suspicion += 15\n  ~ affinity_gia_hu += 25\n  ~ gold += 20000\n  Quý Bình An ánh mắt sắc lạnh: \"Dùng độc kế! Trong chiến trận, nhân từ với kẻ địch chính là tàn nhẫn với tướng sĩ của mình!\"\n  Giả Hủ khen ngợi: \"Quyết đoán phi thường! Giả vờ vứt bỏ doanh trại, nhử năm vạn quân địch chen chúc vào hẻm núi rồi chặn hai đầu phóng hỏa!\"\n  # EFFECT: show_toast|[ 炎 ] MỞ KHÓA MƯU KẾ: Hỏa Công Bẫy Độc (Giả Hủ)|unlock\n  # EFFECT: unlock_feature|feature_poison_stratagem\n  -> chapter_27_complete\n\n* [Phản Gián · Tung mật thư giả ly gián tướng soái địch tự sát hại lẫn nhau]\n  ~ gold -= 3000\n  ~ affinity_gia_hu += 20\n  ~ suspicion -= 5\n  \"Dùng mưu phản gián, cho nội gián mang mật thư giả mua chuộc phó tướng Nam Ly, khiến chúng nghi kỵ tương tàn.\"\n  Giả Hủ vuốt râu: \"Mượn đao giết người không dính máu, bảo toàn sinh lực ba quân.\"\n  # EFFECT: show_toast|[ 策 ] MỞ KHÓA THẺ BÀI: Phản Gián Kế & Ly Gián Kế|unlock\n  # EFFECT: unlock_feature|feature_counter_espionage\n  -> chapter_27_complete\n\n* [Vương Đạo · Đích thân dẫn chủ lực tập kích chính diện bắt sống tướng địch]\n  ~ affinity_trieu_van += 20\n  ~ affinity_gia_hu += 5\n  ~ suspicion -= 10\n  \"Tử Long xông pha bắt sống đầu sỏ, phân hóa quân giặc, khoan dung cho hàng binh.\"\n  Triệu Vân từ ngoài bước vào, hào khí ngút trời: \"Chúa Công nhân đức, Tử Long nguyện đạp bằng vạn quân bắt sống Địch Hỏa!\"\n  -> chapter_27_complete\n\n=== chapter_27_complete ===\nGiả Hủ khẽ ghé tai Quý Bình An hiến kế: \"Chúa Công, quân chính quy triều đình đầy rẫy tai mắt Tô gia, khó lòng phó thác sinh tử. Xin Chúa Công tiếp quản toàn bộ tử tù và tân binh nghèo khó ở Bắc Cương, tự tay tôi luyện thành quân đoàn trung thành tuyệt đối!\"\n\nQuý Bình An tiếp nhận tân binh, tự tay ban phát áo máu và quân nhu: \"Kể từ hôm nay, các ngươi chính là HUYẾT Y DOANH! Theo ta định đoạt càn khôn!\"\n\n# EFFECT: show_toast|[ 血 ] SÁNG LẬP QUÂN ĐOÀN: Huyết Y Doanh (Tử Sĩ Áo Máu)|unlock\n# EFFECT: unlock_feature|feature_huyet_y_doanh\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 27-30: Triệu Hoán Giả Hủ & Huyết Y Doanh|milestone\n# EFFECT: chapter_complete|27\n\n-> chapter_35_transition\n\n// ============================================================\n// CHƯƠNG 35: ĐẠI KẾ THỦY CÔNG DÒNG THANH THỦY\n// ============================================================\n\n=== chapter_35_transition ===\n# CHAPTER_TITLE: Hồi 8 · Chương 35: Đại Kế Thủy Công Dòng Thanh Thủy\n# BACKGROUND: bg_thanh_thuy_river_dam\n# AMBIENT: rain\n# MUSIC: bgm_river_roaring\n# ACTORS: qui_binh_an|right|observing, jia_xu|left|pointing, trieu_van|right|standing_guard\n\n~ chapter = 35\n\nMùa mưa phương Bắc trút nước như thác đổ. Dòng sông Thanh Thủy đỏ ngầu phù sa cuộn sóng gầm thét như rồng lội.\n\nQuý Bình An cùng Giả Hủ đứng trên đỉnh đập đất thượng nguồn ngắm nhìn hạ lưu. Ba mươi dặm phía trước chính là sào huyệt kiên cố nhất của năm vạn phản quân do Địch Hỏa trấn giữ.\n\nGiả Hủ chỉ xuống dòng nước xiết: \"Chúa Công, nếu ta đắp đập ngăn sông bảy ngày, đợi lũ thượng nguồn dâng cao rồi bất thần xả đập, toàn bộ chiến xa và thành lũy của Địch Hỏa sẽ chìm trong biển nước. Một trận định càn khôn!\"\n\n-> flood_preparation_choice\n\n=== flood_preparation_choice ===\n# SCENE_TYPE: choice\n\n* [Nhân Nghĩa · Bí mật di tản dân lành hạ lưu trước ba ngày: \"Muốn thắng giặc nhưng không giẫm lên xương máu bách tính vô tội!\"]\n  ~ gold -= 3000\n  ~ affinity_trieu_van += 25\n  ~ suspicion -= 10\n  ~ unlocked_flood = true\n  Quý Bình An quả quyết: \"Ta muốn lập công, nhưng tuyệt đối không biến vạn dân vô tội thành mồi cho cá bèo! Xuất 3.000 Vàng, lệnh cho Tử Long âm thầm di dời toàn bộ thôn làng hạ lưu lên gò cao!\"\n  Triệu Vân xúc động ôm quyền: \"Chúa Công lấy đức phục nhân, Tử Long dù thức trắng ba đêm cũng quyết hộ tống bá tánh an toàn!\"\n  # EFFECT: show_toast|[ 潮 ] MỞ KHÓA THỦY CÔNG: Xả Lũ Sông Thanh Thủy (Tầng 3 Combat)|unlock\n  # EFFECT: unlock_feature|feature_water_stratagem\n  -> chapter_35_complete\n\n* [Bá Đạo · Bất ngờ xả lũ ngay trong đêm mưa bão: \"Binh quý thần tốc! Đập vỡ thác tràn, hủy diệt toàn bộ chiến xa của địch!\"]\n  ~ suspicion += 20\n  ~ affinity_gia_hu += 20\n  ~ unlocked_flood = true\n  \"Địch Hỏa quỷ quyệt, nếu sơ hở ắt mất đại cục. Khóa chặt mọi ngả đường, đúng giờ Tý phá đập!\"\n  # EFFECT: show_toast|[ 潮 ] MỞ KHÓA THỦY CÔNG: Bạo Lũ Phá Đập (Sát Thương Chí Mạng)|unlock\n  # EFFECT: unlock_feature|feature_water_stratagem\n  -> chapter_35_complete\n\n=== chapter_35_complete ===\nBố trí tử sĩ canh giữ van xả lũ thượng nguồn, chờ thời khắc quyết chiến phát lệnh công thành!\n\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 35: Đại Kế Thủy Công Dòng Thanh Thủy|milestone\n# EFFECT: chapter_complete|35\n\n-> chapter_43_transition\n\n// ============================================================\n// CHƯƠNG 43: VẠN THẠCH QUÂN LƯƠNG TIỀN TUYẾN\n// ============================================================\n\n=== chapter_43_transition ===\n# CHAPTER_TITLE: Hồi 9 · Chương 43: Vạn Thạch Quân Lương Tiền Tuyến\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_logistics_busy\n# ACTORS: qui_binh_an|right|armored, ma_tac|left|reporting\n\n~ chapter = 43\n\nHàng trăm cỗ xe ngựa chở đầy bao tải quân lương nối đuôi nhau rầm rộ tiến vào tổng hành dinh Bắc Cương.\n\nMã Tắc cầm thẻ trúc kiểm kê, ánh mắt lộ vẻ hân hoan hiếm thấy: \"Khởi bẩm Chúa Công! Toàn bộ năm vạn hộc lương thực từ Khai Nguyên và hậu phương Liễu Châu đã vận chuyển nhập kho an toàn. Kho lương hiện tại đủ cung ứng cho mười vạn quân trong suốt một năm!\"\n\n~ rations += 50000\n~ jade += 10\n~ gold -= 2000\n~ affinity_matac += 15\n~ affinity_trieu_van += 15\n\nQuý Bình An ban thưởng rượu thịt cho toàn quân, trích năm ngàn hộc lương cứu đói cho bá tánh chạy loạn. Tiếng tung hô của vạn quân vang dội núi rừng, sĩ khí đạt mức cực hạn!\n\n# EFFECT: show_toast|[ 糧 ] QUÂN LƯƠNG ĐẠT 50.000 HỘC — Sĩ Khí Ba Quân Cực Hạn|reward\n# EFFECT: show_toast|[ 卷 ] HOÀN THÀNH CHƯƠNG 43: Vạn Thạch Quân Lương Tiền Tuyến|milestone\n# EFFECT: chapter_complete|43\n\n-> chapter_48_transition\n\n// ============================================================\n// CHƯƠNG 48-52: ĐẠI CHIẾN THANH CHÂU & KHẢI HOÀN HỒI TRIỀU\n// ============================================================\n\n=== chapter_48_transition ===\n# CHAPTER_TITLE: Hồi 10 · Chương 48-52: Khúc Tráng Ca Thanh Châu — Đại Phá Địch Hỏa\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: qui_binh_an|right|battle_armor, trieu_van|right|spear_ready, jia_xu|left|observing\n\n~ chapter = 48\n\nThành Thanh Châu rung chuyển dữ dội dưới làn mưa tên bốc lửa và đá tảng ném công thành. Dưới chân thành, năm vạn phản quân do dũng tướng Địch Hỏa chỉ huy dàn trận đen kịt như sóng thần. Mười cỗ Xe Đục Thành bọc thép dày ầm ầm húc thẳng vào cổng thành chính!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_siege_ram_hit\n# EFFECT: screen_flash|#FFD700|600\n\nĐịch Hỏa vung thanh Bạo Liệt Đao gầm vang: \"Quý Bình An! Hôm nay ta sẽ san phẳng Thanh Châu, lấy đầu ngươi tế cờ!\"\n\nQuý Bình An đứng uy nghiêm trên đỉnh thành, áo choàng đỏ tung bay trong bão gió: \"Tướng sĩ Huyết Y Doanh! Đại quân Đại Vũ! Hôm nay là ngày định đoạt vận mệnh non sông! Giương cờ phát lệnh quyết chiến!\"\n\n# EFFECT: trigger_battle|battle_ch48_thanh_chau\n\n-> thanh_chau_epic_battle\n\n=== thanh_chau_epic_battle ===\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_triumph_sunrise\n# ACTORS: qui_binh_an|right|triumphant, trieu_van|right|bowing, jia_xu|left|satisfied\n\nĐúng thời khắc nguy nan, dũng sĩ Huyết Y Doanh kết trận liều chết cản phá quân địch trên mặt thành, cờ hiệu xả lũ phất lên!\n\nNước sông Thanh Thủy như ngàn con rồng cuộn trào ập xuống thung lũng, nhấn chìm toàn bộ chiến xa đục thành của địch! Triệu Tử Long tung người xuống ngựa, đơn thương độc mã xông thẳng vào vòng vây bắt sống Địch Hỏa giữa dòng nước xiết!\n\n# EFFECT: sfx_victory_fanfare\n# EFFECT: screen_flash|#FFFFFF|1000\n\nNăm vạn phản quân tan rã hoàn toàn. Chiến kỳ Đại Vũ bay ngạo nghễ trên đỉnh ải Thanh Châu!\n\n~ gold += 20000\n~ rations += 50000\n~ imperial_prestige += 2\n~ suspicion -= 15\n\nBắc Cương đại định, khói lửa tan biến! Toàn quân khải hoàn trở về kinh kỳ báo công!\n\n-> season_1_finale\n\n=== season_1_finale ===\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: vu_hoang|center|impressed, qui_binh_an|right|kneeling_hero\n\nKinh đô Kim Loan Điện rợp cờ hoa gấm vóc đón mừng đoàn quân Chinh Bắc khải hoàn.\n\nVũ Hoàng đích thân rời khỏi Cửu Long Bảo Tọa, bước xuống thềm ngọc đỡ lấy hai tay Quý Bình An:\n\n\"Trẫm quả nhiên không nhìn lầm ngươi! Từ một phò mã hàn vi, ngươi đã lập nên chiến công cái thế ngút trời cho Đại Vũ triều!\"\n\n\"Truyền chỉ trẫm! Thăng phong Quý Bình An làm CHINH BẮC ĐẠI TƯỚNG QUÂN, ban kim ấn tử thụ, thống lĩnh mười vạn cấm quân!\"\n\n# EFFECT: screen_flash|#FFD700|1200\n# EFFECT: sfx_gong_ancient\n\n[THIÊN CƠ HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ! Hoàn thành toàn vẹn HỒI 1 (Chương 1 → Chương 52)!\n[THIÊN CƠ HỆ THỐNG]: Mở khóa tôn hiệu: Chinh Bắc Đại Tướng Quân. Uy danh triều đình đạt Cấp 4!\n\nĐây chỉ là khởi đầu của con đường định đoạt giang sơn thiên hạ!\n\n# EFFECT: show_toast|[ 捷 ] TOÀN BỘ HỒI 1 ĐẠI KHẢI HOÀN (CHƯƠNG 1 - 52)!|triumph\n# EFFECT: chapter_complete|52\n\n-> chapter_53_start\n",
    "chapter_183_to_255": "// ============================================================================\n// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK\n// HỒI 4: KHÍ TÀI CƠ QUAN, TỨ ĐẠI DANH TƯỚNG & TRẤN QUỐC PHONG CÔNG (CHƯƠNG 183 - 255)\n// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn\n// ============================================================================\n\n=== chapter_183_start ===\n# CHAPTER_TITLE: Hồi 4 · Chương 183: Liễu Châu Hùng Cứ · Đại Mở Thần Đàn\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_rising_power\n# ACTORS: qui_binh_an|right|commanding, jia_xu|left|thoughtful\n\nChiến thắng rực rỡ trước 30 vạn đại quân Nam Ly biến Liễu Châu thành trung tâm quyền lực thực tế của toàn cõi Đại Vũ. Binh hùng tướng mạnh, quốc khố dồi dào, dân chúng ba châu Bắc Cảnh chỉ biết đến danh tiếng Phò Mã Gia Quý Bình An mà không còn đoái hoài gì đến chiếu chỉ kinh đô.\n\nNhưng trong phòng nghị sự, Giả Hủ khẽ vuốt chòm râu, chỉ tay vào sa bàn thiên hạ:\n\"Chúa Công, Nam Ly tạm lui, nhưng Tây Lăng rình rập, triều đình kinh đô lại sinh lòng nghi kỵ sâu sắc. Quân sự muốn bách chiến bách thắng, ắt phải có thiết giáp phòng ngự kiên cố, thủy quân khống chế Hoài Hà, và một vị vương tá năng thần điều hành toàn bộ quốc sách!\"\n\nQuý Bình An gật đầu mỉm cười: \"Văn Hòa nói rất hợp ý ta. Hôm nay, ta sẽ triệu hoán hiền tài Tam Quốc, định hình cơ nghiệp muôn đời!\"\n\n-> cao_thuan_summoning\n\n=== cao_thuan_summoning ===\n# CHAPTER_TITLE: Hồi 4 · Chương 200: Thiết Giáp Vô Song · Hãm Trận Doanh\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_hero_theme\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#708090|1500\n# EFFECT: camera_shake|0.7\n# EFFECT: sfx_thunder_dramatic\n\nThượng Cổ Bái Tướng Đài rền vang tiếng va chạm của ngàn vạn phiến giáp thép. Một vị tướng quân khôi giáp nặng nề, tay cầm thiết thuẫn và đoản mâu hạng nặng bước ra từ làn sương đục, ánh mắt sắc như dao cạo, phong thái trầm ổn tựa bàn thạch:\n\n# EFFECT: summon_grand_reveal|hero_caothuan\n# EFFECT: unlock_feature|feature_gaoshun_formation\n# EFFECT: show_toast|[ 營 ] BÁI TƯỚNG THẦN ĐÀN: Cao Thuận (Hãm Trận Doanh) Quy Vị!|triumph\n\n\"Mạt tướng Cao Thuận, bái kiến Chúa Công! Tám trăm dũng sĩ Hãm Trận Doanh đã chuẩn bị xong xuôi! Dù phía trước là núi đao biển lửa, Hãm Trận xông lên, có tiến không lui!\"\n\n~ gold -= 10000\n~ host_force += 4\n~ affinity_gaoshun += 30\n\nCao Thuận lập tức tuyển chọn tám trăm tử sĩ tinh nhuệ nhất, trang bị toàn bộ thiết giáp hạng nặng, tạo thành bức tường thép bất khả xâm phạm của quân đội họ Quý!\n\n-> tuan_uc_summoning\n\n=== tuan_uc_summoning ===\n# CHAPTER_TITLE: Hồi 4 · Chương 201: Vương Tá Chi Tài · Tuân Úc (Văn Nhược)\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|center|impressed\n# EFFECT: screen_flash|#FFD700|1500\n# EFFECT: camera_shake|0.5\n# EFFECT: sfx_imperial_decree\n\nKim quang dịu dàng rọi chiếu. Một vị danh sĩ cốt cách thanh cao, tay nâng ngọc giản, trường bào phiêu dật bước ra, phong thái nho nhã nhưng tàng ẩn mưu lược kinh bang tế thế:\n\n# EFFECT: summon_grand_reveal|hero_tuanuc\n# EFFECT: unlock_feature|feature_tuan_uc_governance\n# EFFECT: show_toast|[ 宰 ] BÁI TƯỚNG THẦN ĐÀN: Vương Tá Chi Tài Tuân Úc Quy Vị!|triumph\n\n\"Thần Tuân Úc (Tuân Văn Nhược), khấu kiến Chúa Công! Nguyện dâng 'Ngũ Bộ Định Thiên Hạ': chỉnh đốn nội chính, mở kho khuyến nông, dung hòa thế gia, bình định biên ải, kiến lập tân triều!\"\n\n~ gold -= 100000\n~ host_force += 5\n\nCó Tuân Úc chủ trì nội chính, hiệu suất thu thuế, phát triển nông nghiệp và chế tạo khí giới của ba châu Bắc Cảnh tăng vọt gấp bội!\n\n-> thich_sat_tay_lang\n\n=== thich_sat_tay_lang ===\n# CHAPTER_TITLE: Hồi 4 · Chương 203: Chu Nho Thích Sát · Bán Thánh Hiển Uy\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_battle_tactical\n# ACTORS: qui_binh_an|right|alarmed, trieu_van|center|battle_armor\n\nNửa đêm tại thư phòng Liễu Châu, mặt đất bỗng nứt toác!\nMột gã thích khách người lùn (Chu Nho) của Tây Lăng độn thổ xông lên, đoản kiếm tẩm kịch độc nhằm thẳng ngực Quý Bình An đâm tới!\n\nĐiển Vi lao vào che chắn trúng phải ám khí tê liệt ngã quỵ. Trong khoảnh khắc ngàn cân treo sợi tóc, một tiếng rồng ngâm xé rách màn đêm!\n\n# EFFECT: screen_flash|#FFFFFF|1000\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_spear_whoosh\n\nTriệu Vân từ ngoài bay vào, khí thế BÁN THÁNH bùng nổ cuốn phăng toàn bộ đồ đạc trong phòng! Long Đảm Thương chớp lóe một vệt lôi đình, đóng đinh thích khách Chu Nho găm chặt vào cột gỗ lim ba người ôm, tan xương nát thịt!\n\nTriệu Vân thu thương quỳ xuống: \"Tử Long hộ giá chậm trễ, xin Chúa Công trách phạt!\"\n\nQuý Bình An nâng Triệu Vân dậy: \"Tử Long đã đột phá cảnh giới Bán Thánh! Thiên hạ này từ nay không ai có thể làm tổn thương ta!\"\n\n-> chu_du_and_hoang_trung\n\n=== chu_du_and_hoang_trung ===\n# CHAPTER_TITLE: Hồi 4 · Chương 219: Thủy Quân Đô Đốc & Thần Tiễn Bách Bước\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_hero_theme\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#1E90FF|1500\n# EFFECT: camera_shake|0.8\n# EFFECT: sfx_thunder_dramatic\n\nĐể chuẩn bị vượt sông Hoài Hà và kiềm chế xạ thủ địch, Quý Bình An tiếp tục triệu hoán hai vị đại danh tướng:\n\n1. CHU DU (Chu Công Cẩn): Đại Đô Đốc phong lưu phóng khoáng, tinh thông âm luật và thủy chiến, chỉ huy toàn bộ chiến hạm Hoài Hà!\n# EFFECT: summon_grand_reveal|hero_chudu\n\n2. HOÀNG TRUNG (Hoàng Hán Thăng): Lão tướng tóc bạc dũng mãnh, cầm Cửu Tinh Thần Cung và Xích Huyết Đao, bách bộ xuyên dương!\n# EFFECT: summon_grand_reveal|hero_hoangtrung\n\n# EFFECT: show_toast|[ 雄 ] ĐẠI ĐÔ ĐỐC CHU DU & THẦN TIỄN HOÀNG TRUNG QUY VỊ!|triumph\n\n~ gold -= 200000\n~ host_force += 16\n\nChu Du lập tức dàn dựng hạm đội lâu thuyền trên sông Hoài Hà; Hoàng Trung thành lập Thần Tiễn Doanh tinh nhuệ. Quân lực Quý gia lúc này đã hoàn thiện cả Thủy - Lục - Cung - Kỵ!\n\n-> can_chinh_dien_ambush\n\n=== can_chinh_dien_ambush ===\n# CHAPTER_TITLE: Hồi 4 · Chương 238: Huyết Chiến Cần Chính Điện · Độc Chiến Tam Đế\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_epic_final_battle\n# ACTORS: trieu_van|center|spear_ready, tu_ngoc_trach|left|worried\n\nTại kinh đô, Tân Hoàng Tử Ngọc Trạch và Khai Sơn Vương Tử Triệu Phong vì quá sợ hãi uy thế của Quý Bình An, đã bày tiệc dụ Triệu Vân vào hoàng cung rồi đóng chặt cửa đại điện Cần Chính Điện!\n\nBa vị đại cao thủ Đế Cảnh hoàng gia đồng loạt rút bảo kiếm vây ráp Triệu Vân:\n\"Triệu Vân! Ngươi chỉ là gia nô của Quý Bình An! Mau bỏ thương đầu hàng, hoàng thượng sẽ phong ngươi làm Thượng Tướng Quân!\"\n\nTriệu Vân cười vang rền rĩ, Long Đảm Thương rung lên bần bật tỏa ra bạch sắc cương khí rực rỡ:\n\"Gia nô? Triệu Vân ta chỉ phụng mệnh Chúa Công Quý Bình An! Lũ sâu kiến các ngươi, dám bẫy hãm Thường Sơn Triệu Tử Long sao?\"\n\n* [Thất Thám Bàn Xà Thương · Độc chiến ba đại cao thủ Đế Cảnh]\n    Triệu Vân múa thương hóa thành ngàn vạn bạch xà lôi điện!\n    # EFFECT: camera_shake|0.9\n    # EFFECT: screen_flash|#FFFFFF|800\n    # EFFECT: sfx_spear_whoosh\n    Chỉ trong hai mươi hiệp, ba đại cao thủ Đế Cảnh bị đánh văng vào vách đá ngọc thạch, hộc máu trọng thương! Cửa Cần Chính Điện bị một thương của Triệu Vân xé toạc làm đôi!\n    -> cong_pha_hoang_cung\n\n=== cong_pha_hoang_cung ===\n# CHAPTER_TITLE: Hồi 4 · Chương 251: Khí Thế Ngút Trời · Công Phá Hoàng Cung\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_epic_final_battle\n# ACTORS: qui_binh_an|right|commanding, hoang_trung|left|battle_stance\n\nNghe tin Cần Chính Điện phát động mai phục, Quý Bình An giận dữ lôi đình!\n\nKhông cần che giấu nữa! Quý Bình An thống lĩnh Điển Vi, Hoàng Trung, Trương Liêu và tám trăm Hãm Trận Doanh tiến thẳng vào hoàng thành!\n\nCung thủ hoàng gia đứng chật trên tường thành chuẩn bị bắn tên. Hoàng Trung giương Cửu Tinh Thần Cung, một hơi bắn liền chín mũi tên vàng xuyên thủng lá cờ soái và bắn rơi chín đầu lĩnh cung thủ!\n\n# EFFECT: camera_shake|0.8\n# EFFECT: sfx_siege_ram_hit\n\nĐiển Vi vung song thiết kích phá toang cổng Đại Minh Môn. Tám trăm Hãm Trận Doanh khiên sắt áp sát, đẩy lùi toàn bộ cấm quân cản đường. Chưa đầy một khắc đồng hồ, toàn bộ hoàng cung bị quân đội Quý gia phong tỏa kín như bưng!\n\n-> tran_quoc_phong_cong\n\n=== tran_quoc_phong_cong ===\n# CHAPTER_TITLE: Hồi 4 · Chương 255: Uy Áp Điện Ngọc · Phong Trấn Quốc Công\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: tu_ngoc_trach|left|kneeling, qui_binh_an|right|commanding, tuan_uc|center|thoughtful\n\nQuý Bình An sải bước tiến vào Kim Loan Điện, kiếm đeo bên hông, giày không thèm cởi, hiên ngang bước lên trước ngự tọa. \n\nTân Hoàng Tử Ngọc Trạch mặt cắt không còn giọt máu, run rẩy quỳ xuống ngọc thềm:\n\"Phò Mã... Trẫm... Trẫm bị lũ nghịch thần mê muội... Xin Phò Mã tha mạng!\"\n\nTuân Úc bước ra, trải một đạo chiếu thư đã soạn sẵn lên long án:\n\"Khởi bẩm Bệ Hạ, quốc gia tao loạn, duy có Phò Mã Gia Quý Bình An mới đủ đức tài định đoạt càn khôn. Xin Bệ Hạ hạ chiếu:\n1. Tôn phong Quý Bình An làm TRẤN QUỐC CÔNG, ban cửu tích, nắm toàn bộ binh quyền thiên hạ!\n2. Bãi miễn tham quan Hứa Hòa Lâm, phong Tuân Úc làm Thừa Tướng Đại Vũ!\"\n\n# EFFECT: screen_flash|#FFD700|1500\n# EFFECT: sfx_imperial_decree\n# EFFECT: show_toast|[ 國 ] THĂNG PHONG: TRẤN QUỐC CÔNG QUÝ BÌNH AN!|triumph\n\nTử Ngọc Trạch không dám do dự, vội vã đóng ngọc tỷ lên chiếu thư.\n\nTừ thời khắc này, Quý Bình An chính thức bước lên đỉnh cao quyền lực tối thượng của triều đình Đại Vũ!\n\n~ imperial_prestige += 20\n~ suspicion = 0\n~ gold += 200000\n\n# EFFECT: chapter_complete|255\n\n-> chapter_256_start\n",
    "chapter_256_to_300": "// ============================================================================\n// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK\n// HỒI 5: CHIẾN DỊCH HỒN HUYẾT SƠN, HÍ CHÍ TÀI QUY VỊ & ĐẠI KẾ MƯU QUỐC (CHƯƠNG 256 - 300)\n// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn\n// ============================================================================\n\n=== chapter_256_start ===\n# CHAPTER_TITLE: Hồi 5 · Chương 256: Phong Ba Nam Cương · Hồn Huyết Sơn Hiểm Ải\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|commanding, tuan_uc|left|scholarly\n\nSau khi nhận tước Trấn Quốc Công, Quý Bình An nắm trọn binh quyền trong triều, nhưng tình hình biên giới phương Nam lại bùng phát biến cố nghiêm trọng.\n\nQuân Đông Thương do danh tướng Triệu Văn Dụ chỉ huy đã cấu kết với năm vạn phản quân của thế gia An gia, đánh chiếm Nam Quan và đóng quân trên dải núi hiểm trở Hồn Huyết Sơn. Đối phương còn mang theo một loại vũ khí bí mật khủng khiếp: \"Lưu Hỏa Đạn\" — đất nung chứa chất cháy dính chặt vào da thịt, đốt cháy cả binh giáp!\n\nTuân Úc mở bản đồ địa hình Nam Quan, trầm ngâm:\n\"Chúa Công, Hồn Huyết Sơn thế núi dốc đứng, dễ thủ khó công. Phía sau An gia còn có Khai Sơn Vương Tử Triệu Phong ngấm ngầm tiếp ứng. Muốn nhổ cái gai này, phải một mũi tên trúng hai đích: vừa diệt giặc Đông Thương, vừa thanh trừng Khai Sơn Vương!\"\n\n* [Quyết Định · Giao việc này cho Độc Sĩ Lý Nho bày mưu]\n    -> ly_nho_muon_dao_diet_dich\n\n* [Trực Diện Tấn Công · Điều động Hoàng Trung và Hãm Trận Doanh công sơn]\n    -> ly_nho_muon_dao_diet_dich\n\n=== ly_nho_muon_dao_diet_dich ===\n# CHAPTER_TITLE: Hồi 5 · Chương 269: Kế Mượn Đao Diệt Địch · Trảm Khai Sơn Vương\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_dark_schemes\n# ACTORS: ly_nho|left|mysterious, qui_binh_an|right|thoughtful\n\nLý Nho cười khẩy, bước ra hiến kế:\n\"Chúa Công, Khai Sơn Vương Tử Triệu Phong lâu nay cậy thân phận vương thúc, luôn tìm cách ám toán chúng ta. Lần này lấy danh nghĩa triều đình, lệnh cho y mang năm vạn quân An gia đi tiên phong phá Hồn Huyết Sơn! Nếu thắng, giặc tan; nếu bại, mượn đao Đông Thương chém đầu y!\"\n\nQuý Bình An hạ lệnh cưỡng chế Khai Sơn Vương xuất trận. \n\nTại chân núi Hồn Huyết Sơn, Triệu Văn Dụ từ trên đỉnh núi ném xuống hàng ngàn Lưu Hỏa Đạn! Biển lửa bốc cháy ngùn ngụt, quân tiên phong của Khai Sơn Vương tan tác. Triệu Văn Dụ lao xuống như mãnh hổ, một kích đâm Tử Triệu Phong ngã ngựa thổ huyết!\n\nLý Nho đứng trên quan sát đài khẽ vẫy tay, một mũi tên ngầm tẩm Toái Mệnh Đan kết liễu luôn Khai Sơn Vương trong khói lửa mịt mù. Một mối họa hoàng tộc được giải quyết êm thấm không tì vết!\n\n-> trieu_van_tram_trieu_van_du\n\n=== trieu_van_tram_trieu_van_du ===\n# CHAPTER_TITLE: Hồi 5 · Chương 277: Huyết Chiến Nam Quan · Long Đảm Phá Quân\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: trieu_van|center|attacking, qui_binh_an|right|commanding\n\nNhìn thấy Khai Sơn Vương đền mạng, Quý Bình An vung kiếm phát lệnh tổng phản công!\n\nTriệu Vân dẫn đầu Bạch Mã Nghĩa Tòng mang móng ngựa sắt xông thẳng lên vách đá Hồn Huyết Sơn. Hoàng Trung giương Cửu Tinh Thần Cung liên tiếp bắn hạ các ụ phóng Lưu Hỏa của quân Đông Thương!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: screen_flash|#C0C0C0|600\n# EFFECT: sfx_spear_whoosh\n\nTriệu Văn Dụ múa trường mâu đón đánh Triệu Vân. Nhưng trước một Bán Thánh như Triệu Tử Long, chỉ trong ba hiệp, Long Đảm Thương xé toạc tấm khiên hộ thể, xuyên thủng lồng ngực Triệu Văn Dụ ghim chặt lên vách núi đá!\n\nTướng địch đền mạng, năm vạn quân Đông Thương tan rã đầu hàng. Toàn bộ Nam Quan và Hồn Huyết Sơn được thu hồi trọn vẹn!\n\n-> thu_hoi_nam_quan\n\n=== thu_hoi_nam_quan ===\n# CHAPTER_TITLE: Hồi 5 · Chương 280: Trăm Xe Mỏ Vàng · Thu Về Bảy Mươi Lăm Vạn Kim\n# BACKGROUND: bg_northern_border_camp\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: qui_binh_an|right|confident, tuan_uc|left|impressed\n\nTại đại bản doanh Nam Quan, binh sĩ mở toang các kho ngầm bí mật của Đông Thương và An gia.\n\nHơn một trăm cỗ xe ngựa chở đầy những thỏi vàng ròng nguyên chất khai thác từ mỏ vàng Nam Quan xếp thành hàng dài hàng cây số, lấp lánh chói lòa dưới ánh mặt trời!\n\nTuân Úc cầm sổ sách phấn khởi bẩm báo:\n\"Chúc mừng Trấn Quốc Công! Tổng số vàng thu giữ từ mỏ vàng Nam Quan lên tới BẢY MƯƠI LĂM VẠN LƯỢNG HOÀNG KIM (750.000 Vàng)! Số tài sản này đủ sức nuôi mười vạn quân tinh nhuệ trong suốt năm năm!\"\n\n~ gold += 750000\n~ rations += 100000\n~ imperial_prestige += 10\n\n# EFFECT: show_toast|[ 金 ] ĐẠI PHÁT TÀI: Thu Giữ 750.000 Vàng Từ Mỏ Vàng Nam Quan!|reward\n\nQuý Bình An nhìn đống hoàng kim ngút ngàn, trong mắt lóe lên ngọn lửa dã tâm: \"Có số vàng này, ta có thể triệu hoán thêm những mưu thần tuyệt đỉnh nhất của Tam Quốc!\"\n\n-> hi_chi_tai_summoning\n\n=== hi_chi_tai_summoning ===\n# CHAPTER_TITLE: Hồi 5 · Chương 288: Kỳ Mưu Quỷ Kế · Hí Chí Tài Quy Vị\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#4B0082|1500\n# EFFECT: camera_shake|0.6\n# EFFECT: sfx_thunder_dramatic\n\nThần Đàn lại bùng nổ kỳ quang ngũ sắc!\n\nMột vị mưu sĩ phong trần, tay cầm trúc giản mưu lược, ánh mắt sâu thẳm tựa như nhìn thấu mọi quỷ kế của nhân gian bước ra, cúi đầu thi lễ:\n\n# EFFECT: summon_grand_reveal|hero_hichitai\n# EFFECT: unlock_feature|feature_hi_chi_tai_resonance\n# EFFECT: show_toast|[ 策 ] BÁI TƯỚNG THẦN ĐÀN: Tuyệt Thế Mưu Thần Hí Chí Tài Quy Vị!|triumph\n\n\"Hí Chí Tài bái kiến Chúa Công! Kỳ mưu xuất kỳ, đoạt mệnh mưu quốc, thần nguyện cùng ba vị đồng liêu hợp sức bày bố thiên la địa võng!\"\n\n~ gold -= 100000\n~ host_force += 5\n\n[THIÊN CƠ HỆ THỐNG]: KÍCH HOẠT DUYÊN PHẬN ĐẶC BIỆT: 'TỨ ĐẠI MƯU THẦN CỘNG HƯỞNG' (Giả Hủ · Tuân Úc · Lý Nho · Hí Chí Tài)! Trí lực toàn quân tăng 20%, mở khóa đại kế hoạch 'Mưu Quốc'!\n\n-> dai_ke_muu_quoc\n\n=== dai_ke_muu_quoc ===\n# CHAPTER_TITLE: Hồi 5 · Chương 296: Tứ Thần Hội Tụ · Khởi Động Kế Mưu Quốc\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|commanding, tuan_uc|center|thoughtful, jia_xu|left|mysterious\n\nTrong mật thất Trấn Quốc Công Phủ, bốn vị mưu thần hàng đầu của thời Tam Quốc tề tựu đông đủ quanh bàn cát:\n- Tuân Úc: Vương tá kinh bang tế thế\n- Giả Hủ: Độc kế loạn vũ\n- Lý Nho: Trảm thảo trừ căn\n- Hí Chí Tài: Kỳ mưu quỷ quyệt\n\nTuân Úc mở lời: \"Tân Hoàng Tử Ngọc Trạch ho lao trầm trọng, không sống quá ba năm, lại không có con nối dõi. Đại Vũ triều khí số đã tận!\"\n\nHí Chí Tài khẽ cười: \"Chúng ta mở kho lương phát chẩn cho vạn dân khắp mười ba châu, xây dựng trường học, giảm thuế cho bách tính họ Quý. Thiên hạ này, lòng dân hướng về ai, người đó chính là Chân Mệnh Thiên Tử!\"\n\nGiả Hủ gật đầu: \"Bước tiếp theo: Tiến phong Tịnh Kiên Vương, thâu tóm danh phận 'Nhất ngôn vi thiên hạ pháp'!\"\n\nQuý Bình An nâng chén rượu hoàng kim: \"Được! Chúng ta bắt đầu kế hoạch MƯU QUỐC!\"\n\n# EFFECT: show_toast|[ 國 ] KHỞI ĐỘNG ĐẠI KẾ MƯU QUỐC: Thu Phục Lòng Dân Cả Nước!|milestone\n# EFFECT: chapter_complete|300\n\n-> chapter_301_start\n",
    "chapter_301_to_359": "// ============================================================================\n// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK\n// HỒI 6: TỊNH KIÊN VƯƠNG NHIẾP CHÍNH, TÂY CHINH & CẨM MÃ SIÊU QUY VỊ (CHƯƠNG 301 - 359)\n// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn\n// ============================================================================\n\n=== chapter_301_start ===\n# CHAPTER_TITLE: Hồi 6 · Chương 301: Xử Trảm Nội Gian · Thu Phục Quỷ Y\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|right|commanding, ly_nho|left|mysterious\n\nTại đại sảnh Trấn Quốc Công Phủ, hai tên mật thám nội gian Hoa Chấn Viễn và Huyết Tùng bị lôi xộc vào, quỳ rạp dưới sàn đá lạnh ngắt.\n\nLý Nho bước lên, vứt xuống đất chiếc lệnh bài bí mật của thế lực Thiên Cơ Lâu:\n\"Chúa Công, hai kẻ này chính là nội ứng do Thiên Cơ Lâu cài vào hạ độc Ninh An Công Chúa và mưu hại Cơ Vô Pháp. Chứng cứ xác thực!\"\n\nQuý Bình An lạnh lùng phất tay: \"Lôi ra ngoài cửa thành trảm quyết răn đe!\"\n\nCơ Vô Pháp chứng kiến cảnh tượng này, rơi lệ quỳ lạy cảm tạ: \"Từ nay mạng này của Cơ Vô Pháp hoàn toàn thuộc về Trấn Quốc Công!\"\n\n-> tinh_kien_phong_vuong\n\n=== tinh_kien_phong_vuong ===\n# CHAPTER_TITLE: Hồi 6 · Chương 303: Tịnh Kiên Phong Vương · Nhất Ngôn Vi Pháp\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: tu_ngoc_trach|left|head_down, qui_binh_an|right|commanding, tuan_uc|center|scholarly\n\nTân Hoàng Tử Ngọc Trạch ngày một hao mòn, ngực ho ra máu không ngớt. Trước mặt văn võ bá quan, Tân Hoàng run rẩy tuyên đọc đạo chiếu thư tối hậu:\n\n\"Trấn Quốc Công Quý Bình An có công bình định thiên hạ, cứu giá vạn dân. Nay tấn phong làm TỊNH KIÊN VƯƠNG! Thiên Uy Thượng Tướng Quân! Cùng trẫm cùng ngồi ngang hàng, 'Nhất ngôn nhi vi thiên hạ pháp' (Một lời nói ra là luật pháp thiên hạ)!\"\n\n# EFFECT: screen_flash|#FFD700|2000\n# EFFECT: sfx_imperial_decree\n# EFFECT: show_toast|[ 王 ] TẤN PHONG TỊNH KIÊN VƯƠNG: Nhất Ngôn Vi Thiên Hạ Pháp!|triumph\n\nCả triều đình quỳ rạp tung hô: \"Tham kiến Tịnh Kiên Vương gia! Vạn vạn tuế!\"\n\nTừ thời khắc này, Hoàng Đế chỉ còn là hư vị. Mọi quyền lực quân chính ngoại giao của Đại Vũ đều nằm trọn trong tay Quý Bình An!\n\n~ imperial_prestige += 30\n~ suspicion = 0\n\n-> ninh_an_qua_doi\n\n=== ninh_an_qua_doi ===\n# CHAPTER_TITLE: Hồi 6 · Chương 307: Hoa Lê Lệ Rơi · Vĩnh Biệt Ninh An\n# BACKGROUND: bg_palace_chamber\n# MUSIC: bgm_ethereal_void\n# ACTORS: qui_binh_an|right|head_down, dieu_thuyen|left|worried\n\nNhưng niềm vui chưa trọn vẹn thì bi kịch ập đến.\n\nTại hậu hoa viên phủ Tịnh Kiên Vương, dưới gốc cây hoa lê trắng muốt rụng tơi bời, Ninh An Công Chúa mỉm cười thanh thản trút hơi thở cuối cùng trong vòng tay Quý Bình An. Kỳ độc do thế lực hắc ám Thiên Cơ Lâu hạ từ nhiều năm trước đã ngấm sâu vào tủy, dù Quỷ y Cơ Vô Pháp tận lực cũng không thể cứu vãn.\n\nQuý Bình An ôm chặt thi thể thê tử, ánh mắt đỏ rực sát khí ngút trời:\n\"Thiên Cơ Lâu... Ta thề sẽ san bằng sào huyệt các ngươi, tế sống linh hồn Ninh An!\"\n\nĐiêu Thuyền tiến lại gần, nhẹ nhàng đặt tay lên vai lang quân: \"Chàng hãy yên tâm... Mạng lưới Hồng Nhan đã tìm ra manh mối của kẻ đứng đầu Thiên Cơ Lâu tại kinh đô!\"\n\n-> pha_thien_co_lau\n\n=== pha_thien_co_lau ===\n# CHAPTER_TITLE: Hồi 6 · Chương 310: Cửa Tây Bắt Gián · Phá Thiên Cơ Lâu\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_epic_final_battle\n# ACTORS: qui_binh_an|right|commanding, dien_vi|left|battle_stance\n\nNgay tại cổng Tây kinh đô, một cỗ xe ngựa cải trang thương nhân đang vội vã chạy trốn.\n\n\"Ầm!\"\nĐiển Vi từ trên trời giáng xuống như thiên thạch, một kích đập nát bánh xe! Triệu Vân dẫn kỵ binh khép chặt vòng vây.\n\nNgười bước ra khỏi xe chính là Vu Văn Châu — đầu lĩnh gián điệp \"Đại Vũ Thiên Cơ\" của Thiên Cơ Lâu!\n\nVu Văn Châu run rẩy quỳ xuống: \"Tịnh Kiên Vương tha mạng! Ta xin dâng toàn bộ bản đồ bố phòng và mật ước của Tây Lăng và Đông Thương!\"\n\nNhổ tận gốc sào huyệt Thiên Cơ Lâu, Quý Bình An nắm trọn bản đồ quân sự Tây Lăng, hạ lệnh: TÂY CHINH KHỞI BÌNH!\n\n~ gold += 100000\n\n-> dai_chien_lam_quan\n\n=== dai_chien_lam_quan ===\n# CHAPTER_TITLE: Hồi 6 · Chương 321: Tây Chinh Phá Cửa · Đại Chiến Lâm Quan\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: trieu_van|center|attacking, qui_binh_an|right|commanding\n\nCửa ải Lâm Quan Thành — yết hầu tiến vào mười ba châu Tây Lăng!\n\nTrấn Quốc Tướng Quân Tây Lăng là Tần Tứ Nghiệp chỉ huy ba vạn Thiết Kỵ Tây Lăng dàn trận rào sắt kiên cố trước cổng thành khiêu chiến.\n\nTriệu Vân cưỡi Bạch Long Mã, Long Đảm Thương rực sáng như bạch long xuất thế!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: screen_flash|#C0C0C0|800\n# EFFECT: sfx_spear_whoosh\n\nMột tiếng ngựa hí vang trời, Triệu Vân một thương xé toạc trận đồ thiết kỵ đối phương, đâm bay mười viên phó tướng! Bạch Mã Nghĩa Tòng mang móng ngựa sắt tràn lên như thác lũ, đạp bằng phòng tuyến rào sắt. \n\nPhó tướng Tây Lăng Đổng Vệ Đông bị Triệu Vân bắt sống tại trận! Lâm Quan Thành thất thủ, cửa ngõ Tây Lăng mở toang!\n\n-> phuc_kich_hoai_ha\n\n=== phuc_kich_hoai_ha ===\n# CHAPTER_TITLE: Hồi 6 · Chương 326: Phục Kích Hoài Hà · Chu Du Bày Trận\n# BACKGROUND: bg_thanh_thuy_river_dam\n# MUSIC: bgm_battle_tactical\n# ACTORS: chu_du|center|commanding, truong_lieu|left|armored\n\nTần Tứ Nghiệp dẫn tàn quân tháo chạy qua sông Hoài Hà về Nghiệp Thành.\n\nĐúng lúc đó, trên mặt sông mù sương, hàng trăm chiến hạm lâu thuyền của Đại Đô Đốc Chu Du đồng loạt xuất kích!\n\n# EFFECT: camera_shake|0.7\n# EFFECT: sfx_siege_ram_hit\n\nChu Du đứng trên mũi thuyền gảy khúc cổ cầm, tiếng đàn dứt điểm thì ngàn mũi tên lửa bắn xối xả thiêu rụi thuyền bè Tây Lăng. Trương Liêu dẫn Huyết Y Doanh chặn đầu trên bờ, ép Tần Tứ Nghiệp vào tuyệt lộ!\n\nTheo kế của Quý Bình An, Trương Liêu cố ý mở một đường máu tha mạng cho Tần Tứ Nghiệp chạy về, nhằm gieo rắc mối nghi ngờ ly gián nội bộ triều đình Tây Lăng!\n\n-> phong_thu_bac_co_son_2\n\n=== phong_thu_bac_co_son_2 ===\n# CHAPTER_TITLE: Hồi 6 · Chương 334: Giai Nhân Đánh Trống · Điển Vi Đại Chiến\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: dieu_thuyen|center|determined, dien_vi|left|attacking\n\nLợi dụng Quý Bình An đang tây chinh, đại tướng Đông Thương là Bùi Nguyên dẫn năm vạn quân tập kích Liễu Châu!\n\nTại cửa ải Bắc Cô Sơn, Chu Thái đổ một trăm thùng dầu hỏa chặn cổng. Điêu Thuyền thân khoác chiến bào mỏng, đích thân bước lên vọng lâu thành lũy, vung dùi gióng lên hồi trống trận dồn dập rền vang mây xanh!\n\nTiếng trống của giai nhân khơi dậy nhuệ khí ngút trời của tướng sĩ! Điển Vi mắt đỏ rực gầm thét, mở toang cổng thành xông thẳng vào biển quân địch, song kích múa lượn chém địch như chém dưa thái rau!\n\nBùi Nguyên bị Điển Vi một tay túm cổ nhấc bổng lên không ném mạnh xuống đất, bắt sống tại trận! Năm vạn quân Đông Thương tan rã hoàn toàn!\n\n-> danh_up_linh_khe\n\n=== danh_up_linh_khe ===\n# CHAPTER_TITLE: Hồi 6 · Chương 346: Đánh Úp Linh Khê · Tống Tiền Triệu Vàng\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: trieu_van|left|spear_ready, qui_binh_an|right|commanding\n\nTại chiến trường Tây Lăng, Triệu Vân hành quân thần tốc đánh úp Linh Khê Thành, bắt sống Bán Thánh Vân Ninh — trụ cột võ học của hoàng gia Tây Lăng!\n\nQuý Bình An ngồi trên đài cao gửi tối hậu thư cho triều đình Tây Lăng: Muốn chuộc Bán Thánh Vân Ninh và giữ lấy kinh đô Tây Kinh, phải giao nộp đúng MỘT TRIỆU HAI TRĂM NGÀN VÀNG (1.200.000 Vàng)!\n\nHoàng Đế Tây Lăng hoảng sợ tột cùng, đành mở toang quốc khố, vét sạch vàng ròng chất lên xe chuyển sang quân doanh họ Quý để cầu hòa!\n\n~ gold += 1200000\n~ imperial_prestige += 20\n\n# EFFECT: show_toast|[ 金 ] TỐNG TIỀN TÂY LĂNG: Thu Về 1.200.000 Vàng Ròng!|reward\n\nQuý Bình An đứng trước kho vàng ngút ngàn, bật cười sảng khoái: \"Có một triệu hai này, ta sẽ chiêu mộ vị hổ tướng thứ ba của Ngũ Hổ Thượng Tướng!\"\n\n-> ma_sieu_summoning\n\n=== ma_sieu_summoning ===\n# CHAPTER_TITLE: Hồi 6 · Chương 350: Cẩm Mã Siêu · Ngũ Hổ Thượng Tướng (3/5)\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_hero_theme\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#00FFFF|2000\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_thunder_dramatic\n\nThượng Cổ Bái Tướng Đài chớp lóa hàn băng cuồng nộ!\n\nMột vị tướng quân trẻ tuổi tuấn tú phi phàm, khoác bạch bào ngân giáp, tay cầm Long Kỵ Thương, lưng đeo Thất Tinh Kiếm, cưỡi thần mã Sa Lý Phi đạp gió rẽ mây giáng lâm trần thế!\n\n# EFFECT: summon_grand_reveal|hero_masieu\n# EFFECT: unlock_feature|feature_ma_chao_cavalry\n# EFFECT: show_toast|[ 騎 ] BÁI TƯỚNG THẦN ĐÀN: Cẩm Mã Siêu Quy Vị (Ngũ Hổ 3/5)!|triumph\n\n\"Tây Lương Mã Siêu (Mã Mạnh Khởi), bái kiến Chúa Công! Nguyện dẫn thiết kỵ tung hoành thiên hạ, đạp bằng mọi chiến trường cho người!\"\n\n~ gold -= 500000\n~ host_force += 10\n\n[THIÊN CƠ HỆ THỐNG]: KÍCH HOẠT DUYÊN PHẬN 'TAM HỔ HỘ QUỐC' (Triệu Vân · Hoàng Trung · Mã Siêu)! Sát thương kỵ xạ tăng 30%!\n\nMã Siêu vừa xuất thế liền dẫn kỵ binh Tây Lương phối hợp cùng Quý Bình Sinh chém chết tướng địch An Đức Lộc, bình định toàn bộ chiến trường Đông Sơn Thành!\n\n# EFFECT: show_toast|[ 捷 ] TOÀN THẮNG TÂY CHINH · BẢO VỆ TOÀN VẸN CƠ NGHIỆP!|triumph\n# EFFECT: chapter_complete|359\n\n-> chapter_360_start\n",
    "chapter_360_to_386": "// ============================================================================\n// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK\n// HỒI 7: HỆ THỐNG TRANH BÁ, QUÁCH GIA QUY VỊ & ĐĂNG CƠ HOÀNG ĐẾ (CHƯƠNG 360 - 386)\n// ĐẠI KẾT CỤC SEASON 1 (SEASON 1 FINALE)\n// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn\n// ============================================================================\n\n=== chapter_360_start ===\n# CHAPTER_TITLE: Hồi 7 · Chương 360: Hệ Thống Thăng Cấp · Khí Vận Tranh Bá\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_ethereal_void\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#FFD700|2000\n# EFFECT: camera_shake|0.8\n# EFFECT: sfx_system_chime\n\nBên trong Bái Tướng Thần Đàn, hư không bỗng ngưng đọng. Một luồng kim quang chói lọi từ chín tầng mây chiếu thẳng xuống linh hồn Quý Bình An!\n\n[THIÊN CƠ HỆ THỐNG]: TÍCH LŨY CHIẾN CÔNG ĐẠT ĐỈNH! HỆ THỐNG CHÍNH THỨC NÂNG CẤP LÊN GIAI ĐOẠN 2: 'TAM QUỐC ANH LINH TRANH BÁ'!\n- Hủy bỏ bậc triệu hoán sơ cấp 1.000 vàng.\n- Mở khóa các bậc triệu hoán đỉnh cao: 100.000 kim (Tuyệt Thế), 500.000 kim (Thiên Mệnh Mưu Thần), 2.000.000 kim (Thiên Mệnh Võ Tướng - Quan Vũ/Lữ Bố)!\n- KÍCH HOẠT HỆ THỐNG ANH LINH ĐIỂM: 1 Điểm = 1 Vàng. Mỗi tiêu diệt một quân địch = +1 điểm; mỗi chiếm một thành = +10.000 điểm!\n- ĐIỀU KIỆN TIÊN QUYẾT BẮT BUỘC: Ký chủ phải ĐĂNG CƠ HOÀNG ĐẾ để chuyển đổi toàn bộ lãnh thổ quốc gia thành nguồn cung Anh Linh Điểm vô tận!\n\n# EFFECT: show_toast|[ 戈 ] HỆ THỐNG NÂNG CẤP: Kích Hoạt Anh Linh Điểm & Cơ Chế Tranh Bá!|system\n# EFFECT: unlock_feature|feature_hero_points\n\nQuý Bình An hít sâu một hơi, long lanh ánh mắt: \"Muốn thâu tóm toàn bộ điểm số thiên hạ, bước tiếp theo chỉ có thể là... XƯNG ĐẾ!\"\n\n-> hoa_da_summoning\n\n=== hoa_da_summoning ===\n# CHAPTER_TITLE: Hồi 7 · Chương 361: Y Thánh Hoa Đà · Thanh Nang Thần Thuật\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_rising_power\n# ACTORS: qui_binh_an|center|thoughtful\n# EFFECT: screen_flash|#00FF7F|1500\n# EFFECT: camera_shake|0.5\n# EFFECT: sfx_system_chime\n\nĐể bảo hộ sinh mạng cho các mưu thần tướng sĩ, Quý Bình An triệu hoán vị Thần Y huyền thoại bậc nhất lịch sử:\n\n# EFFECT: summon_grand_reveal|hero_hoada\n# EFFECT: unlock_feature|feature_medical_surgery\n# EFFECT: show_toast|[ 醫 ] BÁI TƯỚNG THẦN ĐÀN: Y Thánh Hoa Đà (Nguyên Hóa) Quy Vị!|triumph\n\nMột lão nhân râu tóc bạc phơ nhưng sắc diện hồng hào, vai đeo hòm thuốc Thanh Nang, tay cầm kim châm bước ra:\n\"Lão phu Hoa Đà, bái kiến Chúa Công! Sinh tử do mệnh, nhưng có Ma Phế Tán và phẫu thuật Thanh Nang của lão phu, diêm vương cũng không cướp nổi người của Chúa Công!\"\n\n~ gold -= 100000\n~ host_force += 4\n\nHoa Đà lập tức bào chế linh đan giải trừ toàn bộ tàn độc trong cơ thể các đại tướng, bảo toàn tuyệt đối nguyên khí cho trận đại sự sắp tới!\n\n-> quach_gia_summoning\n\n=== quach_gia_summoning ===\n# CHAPTER_TITLE: Hồi 7 · Chương 382: Thiên Mệnh Mưu Thần · Quỷ Tài Quách Gia\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#FFD700|2500\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_thunder_dramatic\n\nNăm mươi vạn hoàng kim hóa thành một cột sáng chọc thủng vòm trời! \n\nTừ trong cơn bão sấm chớp, một thanh niên áo xanh phiêu dật bước ra, tay cầm quạt xếp, một tay nâng bầu rượu hồ lô, phong lưu phóng khoáng, đôi mắt nhìn thấu ngàn năm thế sự:\n\n# EFFECT: summon_grand_reveal|hero_quachgia\n# EFFECT: unlock_feature|feature_guojia_prophecy\n# EFFECT: show_toast|[ 天 ] THIÊN MỆNH MƯU THẦN QUỶ TÀI QUÁCH GIA (PHỤNG HIẾU) QUY VỊ!|triumph\n\n\"Dĩnh Xuyên Quách Gia (Quách Phụng Hiếu), bái kiến Chúa Công! Thần chờ ngày này đã lâu... Thiên hạ này đã rách nát đến cực điểm, xin để Phụng Hiếu làm tổng đạo diễn màn kịch Đăng Cơ Xưng Đế cho Chúa Công!\"\n\n~ gold -= 500000\n~ host_force += 8\n\nQuách Gia mỉm cười nhấp một ngụm rượu, rút ra một tờ giấy hoa tiên dâng lên:\n\"Chúa Công, việc xưng đế muốn danh chính ngôn thuận, muôn đời tôn sùng thì không thể dùng vũ lực bức ép thô bạo. Chúng ta phải dùng kế: 'Tam Nhượng Đế Vị'!\"\n\n-> tam_nhuong_de_vi\n\n=== tam_nhuong_de_vi ===\n# CHAPTER_TITLE: Hồi 7 · Chương 385: Ba Lần Từ Chối · Thu Trọn Lòng Dân\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: tu_ngoc_trach|left|kneeling, qui_binh_an|right|determined, quach_gia|center|scholarly\n\nTại Kim Loan Điện uy nghiêm, màn kịch kinh điển của Quách Gia bắt đầu diễn ra:\n\nLần thứ nhất: Tân Hoàng Tử Ngọc Trạch quỳ dâng ngọc tỷ truyền quốc, cầu xin thoái vị nhường ngôi.\nQuý Bình An nghiêm mặt cự tuyệt: \"Ta là phò mã Đại Vũ, một đời trung liệt, há có thể làm chuyện cướp ngôi thoán nghịch?\"\n\nLần thứ hai: Toàn bộ văn võ bá quan do Tuân Úc và Giả Hủ dẫn đầu quỳ rạp dâng biểu xin Tịnh Kiên Vương lên ngôi cứu vớt sinh linh.\nQuý Bình An vẫn lắc đầu từ chối: \"Tài đức ta còn mỏng, chưa dám gánh vác trọng trách trời đất!\"\n\nLần thứ ba: Tại cửa Tây kinh đô, Quách Gia tổ chức \"Thiên Hạ Tập Thể Nguyện\"!\nĐại diện bách tính mười ba châu cùng mười vạn tướng sĩ Huyết Y Doanh, Hãm Trận Doanh, Bạch Mã Nghĩa Tòng quỳ chật kín mười dặm ngự đạo, đồng thanh gào khóc cầu xin:\n\"Xin Vương Gia thương lấy lê dân bá tánh! Xin người lên ngôi hoàng đế, định đoạt thái bình!\"\n\nTiếng hô vang dậy thấu tận trời xanh, khí thế cuồn cuộn tựa sóng thần!\n\n-> dang_co_hoang_de\n\n=== dang_co_hoang_de ===\n# CHAPTER_TITLE: Hồi 7 · Chương 386: Cửu Long Ngâm Vang · Đăng Cơ Hoàng Đế\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: qui_binh_an|center|commanding, tuan_uc|left|impressed, quach_gia|right|triumphant\n# EFFECT: screen_flash|#FFD700|2000\n# EFFECT: camera_shake|0.9\n# EFFECT: sfx_dragon_roar_nine\n\nKhông còn lý do gì để từ chối nữa!\nThời cơ ngàn năm có một đã chín muồi!\n\nQuý Bình An sải bước vững chãi bước lên thềm ngọc chín bậc, khoác lên mình tấm long bào hoàng kim thêu chín con rồng vàng uốn lượn, uy nghi ngồi xuống Cửu Long Bảo Tọa!\n\n\"Ngao... o... o...!\"\nThiên địa dị tượng bùng nổ! Chín tiếng rồng ngâm vang dội từ hư không rền vang khắp mười ba châu, mây lành ngũ sắc bao phủ khắp bầu trời kinh đô!\n\nBá quan văn võ, mười vạn đại quân cùng hàng triệu bách tính đồng loạt dập đầu tung hô vang dội trời đất:\n\"HOÀNG ĐẾ VẠN TUẾ! VẠN TUẾ! VẠN VẠN TUẾ!\"\n\n[THIÊN CƠ HỆ THỐNG]: CHÚC MỪNG KÝ CHỦ QUÝ BÌNH AN CHÍNH THỨC ĐĂNG CƠ HOÀNG ĐẾ ĐẠI VŨ!\n- Mở khóa đặc quyền: 'Hoàng Đạo Long Khí Hộ Thể' (Miễn nhiễm ám sát và kỳ độc)!\n- Mở khóa đặc quyền: 'Ngôn Xuất Pháp Tùy' (Khí thế thiên tử chấn nhiếp muôn dân)!\n- Kích hoạt cơ chế tự động chuyển hóa chiến sự toàn quốc thành Anh Linh Điểm!\n\n# EFFECT: show_toast|[ 帝 ] THIÊN TỬ ĐĂNG CƠ: KHỞI TẠO ĐẾ NGHIỆP HOÀNG KIM!|triumph\n\n-> bon_dai_chinh_lenh\n\n=== bon_dai_chinh_lenh ===\n# CHAPTER_TITLE: Hồi 7 · Chương 387: Khai Sáng Kỷ Nguyên · Bốn Đại Chính Lệnh\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: qui_binh_an|center|commanding, tuan_uc|left|scholarly\n\nNgay trên Cửu Long Bảo Tọa, Tân Hoàng Quý Bình An vung tay áo rồng, ban bố BỐN ĐẠI CHÍNH LỆNH khai sáng kỷ nguyên thịnh thế:\n\n1. GIẢM THUẾ TOÀN DÂN: Miễn giảm 30% tô thuế cho bách tính khắp mười ba châu trong ba năm!\n2. KHAI HOANG MỞ CÕI: Khuyến khích di dân mở rộng biên giới, cấp đất canh tác cho người nghèo!\n3. TRỌNG THƯỞNG QUÂN TỬ: Tăng 30% quân hưởng, triều đình chu cấp trọn đời cho thân nhân liệt sĩ tử trận!\n4. CHIÊU HIỀN LỆNH: Mở khoa cử tuyển chọn hiền tài khắp thiên hạ, không phân biệt xuất thân thế gia hay hàn môn!\n\nChiếu lệnh ban ra, lòng dân khắp thiên hạ hân hoan nhảy múa, sĩ khí ba quân ngút trời mây!\n\n-> season_1_finale_coronation\n\n=== season_1_finale_coronation ===\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_imperial_grandeur\n# ACTORS: qui_binh_an|center|commanding\n\nNhìn giang sơn cẩm tú trải dài vạn dặm ngoài cửa điện, Quý Bình An tay nắm chặt chuôi kiếm, bên cạnh là Tuân Úc, Quách Gia, Giả Hủ, Lý Nho cùng Triệu Vân, Điển Vi, Mã Siêu, Hoàng Trung, Cao Thuận, Trương Liêu...\n\nTừ một phò mã hàn vi nơm nớp lo sợ nơi tẩm thất hoang tàn, trải qua 386 chương khói lửa quyền mưu và huyết chiến, y đã chính thức đạp bằng mọi chông gai để bước lên ngôi vị cửu ngũ chí tôn!\n\nĐại Vũ đã thuộc về họ Quý. Mục tiêu tiếp theo: Thâu tóm Tây Lăng, bình định Nam Ly, quét sạch Đông Thương, thống nhất toàn cõi đại lục, lập nên ĐẾ CHẾ ĐẠI HÁN muôn đời bất hủ!\n\n# EFFECT: show_toast|[ 完 ] HOÀN THÀNH TOÀN BỘ SEASON 1 (CHƯƠNG 1 - 386)!|triumph\n# EFFECT: chapter_complete|386\n\n-> END\n",
    "chapter_53_to_114": "// ============================================================================\n// TRẤN QUỐC PHÒ MÃ GIA (镇国驸马爷) — KỊCH BẢN PHÂN NHÁNH INK\n// HỒI 2: KHẢI HOÀN KINH KỲ, ĐIỂN VI XUẤT THẾ & VŨ HOÀNG BĂNG HÀ (CHƯƠNG 53 - 114)\n// Tuân thủ 100% Inviolable Canon Rules & Nghi Thức Bái Tướng Thần Đàn\n// ============================================================================\n\n=== chapter_53_start ===\n# CHAPTER_TITLE: Hồi 2 · Chương 53: Khải Hoàn Kinh Kỳ · Sóng Ngầm Kinh Đô\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_court_tension\n# ACTORS: qui_binh_an|right|determined, to_kien_phong|left|stern\n\nSau đại thắng sông Thanh Thủy, danh tiếng Chinh Bắc Đại Tướng Quân Quý Bình An vang dội khắp bốn cõi Đại Vũ triều. Đoàn chiến xa khải hoàn tiến vào cửa đông kinh thành trong tiếng reo hò dậy đất của vạn dân.\n\nThế nhưng, dưới vẻ phồn hoa rực rỡ ấy, sóng ngầm nơi hoàng đô lại cuộn trào dữ dội hơn bao giờ hết.\n\nTô Kiến Phong khoác chiến bào Chấn Uy Tướng Quân, dắt chiến mã đứng sừng sững chặn lối vào ngự đạo, ánh mắt âm lãnh quét qua đoàn quân Huyết Y:\n\n\"Phò Mã Gia, ngươi lập công lớn ngoài biên cương, nhưng tự tiện dung nạp tử tù thành lập Huyết Y Doanh, lại giam cầm sứ thần Nam Ly... Triều đình trên dưới đang dâng biểu đàn hặc ngươi lộng quyền!\"\n\n* [Hoành Đao · Cười nhạt đáp trả: \"Tô tướng quân, đao của ta chém giặc cứu nước, đao của ngươi chém ai?\"]\n    ~ imperial_prestige += 2\n    ~ suspicion += 5\n    Quý Bình An ngẩng đầu cười lạnh, tay ghì cương ngựa, khí thế bức người: \"Nếu không có Huyết Y Doanh phá đê dìm giặc, lúc này Liễu Châu đã đổi chủ, đầu trên cổ Tô tướng quân liệu còn giữ nổi không?\"\n    Tô Kiến Phong biến sắc, nắm chặt chuôi kiếm nhưng không thể phản bác nửa lời.\n    -> imperial_return_choice_aftermath\n\n* [Khiêm Cung · Lấy lui làm tiến: \"Mọi việc đều vì giang sơn xã tắc, ta tự có giải trình trước thánh thượng.\"]\n    ~ suspicion -= 5\n    Quý Bình An chắp tay điềm đạm: \"Tô tướng quân lo cho thể chế triều đình là phải. Lát nữa vào triều yết kiến Bệ Hạ, ta sẽ dâng toàn bộ sổ sách binh bộ.\"\n    Tô Kiến Phong hừ lạnh một tiếng, đành phất tay cho mở đường.\n    -> imperial_return_choice_aftermath\n\n=== imperial_return_choice_aftermath ===\n# BACKGROUND: bg_pho_ma_phu_bedroom\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|right|thoughtful, servant|left|worried\n\nĐêm xuống, Quý Bình An trở về Phò Mã Phủ. Tiểu Thúy vội vàng mang trà nóng bước vào, thần sắc đầy vẻ bất an:\n\n\"Công tử... mấy hôm nay quanh phủ đệ liên tục xuất hiện bóng người rình rập. Tứ Hoàng Tử Tử Ngọc Hằng và Tô phủ đã cấu kết với Cấm Vệ Quân, tựa hồ muốn ra tay đoạt mạng người!\"\n\nQuý Bình An nhấp một ngụm trà, trong lòng hiểu rõ: Kinh thành không như sa trường, minh thương dễ tránh, ám tiến khó phòng. Lúc này, Triệu Vân phải tọa trấn quân doanh ngoài thành, bên cạnh mình thiếu một vị mãnh tướng tuyệt đối có thể cận thân hộ giá!\n\n[THIÊN CƠ HỆ THỐNG]: Tinh tích lũy đạt 100.000 Vàng! Đủ điều kiện khởi động Thượng Cổ Bái Tướng Đài bậc Tuyệt Thế Võ Tướng!\n\nQuý Bình An đứng dậy, ánh mắt sáng rực bước thẳng vào mật thất.\n\n-> dian_wei_summoning\n\n=== dian_wei_summoning ===\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_hero_theme\n# ACTORS: qui_binh_an|center|commanding\n# EFFECT: screen_flash|#FFD700|1500\n# EFFECT: camera_shake|0.8\n# EFFECT: sfx_thunder_dramatic\n\nThượng Cổ Bái Tướng Thần Đàn bùng nổ kim quang vạn trượng! \nTám trận đồ Bát Quái xoay chuyển điên cuồng, vết rạn Kintsugi hoàng kim nứt toác từ hư không, tiếng sấm sét rền vang rung chuyển càn khôn!\n\nMột bóng hình khổng lồ tựa thiết tháp giáng lâm, thân cao chín thước, cơ bắp cuồn cuộn như thiết đúc, tay lăm lăm đôi Tấn Thiết Song Kích nặng tám mươi cân, sát khí hung hãn chấn nhiếp quỷ thần!\n\n# EFFECT: summon_grand_reveal|hero_dianwei\n# EFFECT: grant_ticket|1\n# EFFECT: unlock_feature|feature_dian_wei_guard\n# EFFECT: show_toast|[ 將 ] BÁI TƯỚNG THẦN ĐÀN: Cổ Chi Ác Lai Điển Vi Quy Vị!|triumph\n\nMột tiếng gầm vang như sấm dậy đất bằng, Điển Vi quỳ một gối xuống trước mặt Quý Bình An, thanh âm trầm hùng như chuông đồng:\n\n\"Mạt tướng Điển Vi, phụng mệnh Thượng Cổ Anh Linh giáng thế! Nguyện vì Chúa Công xông pha khói lửa, ai dám động đến ngài, thiết kích của Điển Vi tất nghiền nát kẻ đó!\"\n\n~ gold -= 100000\n~ host_force += 8\n~ affinity_dian_vi += 30\n\nQuý Bình An bước tới đỡ lấy Điển Vi, trong lòng đại định. Có Cổ Chi Ác Lai hộ thân, kinh thành này còn ai cản nổi bước chân ta!\n\n-> gate_battle_dianwei\n\n=== gate_battle_dianwei ===\n# CHAPTER_TITLE: Hồi 2 · Chương 66: Thiết Kích Phá Cửa Thành · Uy Chấn Đế Đô\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_epic_final_battle\n# ACTORS: qui_binh_an|right|confident, dien_vi|left|battle_stance\n\nSáng hôm sau, Quý Bình An dẫn theo Điển Vi tiến vào Kim Loan Điện. Đúng như dự đoán, tại cửa Chu Tước, Tứ Hoàng Tử Tử Ngọc Hằng bố trí năm mươi thiết giáp vệ binh chặn đứng xe ngựa:\n\n\"Phò Mã Gia! Bệ Hạ có khẩu dụ, hôm nay chỉ một mình ngươi được vào điện, tùy tùng võ phu đều phải cởi giáp giải giới ngoài cổng!\"\n\nTử Ngọc Hằng khoanh tay cười khẩy, ý đồ bắt chẹt Quý Bình An ngay trước bá quan văn võ.\n\n* [Bá Đạo · Sai Điển Vi phá trận: \"Điển Vi! Cho bọn chúng thấy thế nào là thiết kích!\"]\n    Điển Vi gầm lên một tiếng, chân đạp vỡ phiến đá hoa cương, hai thanh Tấn Thiết Song Kích múa tít thành vòng tròn bão thép!\n    # EFFECT: camera_shake|0.9\n    # EFFECT: sfx_siege_ram_hit\n    Chỉ trong mười nhịp thở, năm mươi thiết giáp vệ binh bị đánh bay tứ tán, giáp trụ vỡ vụn, lăn lộn kêu la thảm thiết dưới đất! Điển Vi đứng chắn trước xa giá, uy vũ tựa thiên thần giáng thế!\n    ~ imperial_prestige += 3\n    ~ suspicion += 10\n    -> tang_phuc_doi_cau\n\n* [Quyền Mưu · Vạch trần mưu kế: \"Thánh chỉ miệng? Ngươi dám giả truyền ý chỉ trước mặt ta?\"]\n    Quý Bình An rút ra Tử Kinh Ngọc Bội: \"Trẫm tứ kim bài, ai cản trảm nấy! Điển Vi, mở đường!\"\n    Điển Vi gầm thét vung kích đánh bay rào chắn bằng gỗ lim ngàn cân, khiến đám vệ binh sợ mất mật dạt ra hai bên!\n    ~ imperial_prestige += 2\n    -> tang_phuc_doi_cau\n\n=== tang_phuc_doi_cau ===\n# CHAPTER_TITLE: Hồi 2 · Chương 69: Mặc Tang Phục Lên Điện · Trực Thần Phong Tướng\n# BACKGROUND: bg_imperial_hall\n# MUSIC: bgm_court_tension\n# ACTORS: vu_hoang|center|stern, qui_binh_an|right|determined\n\nKim Loan Điện uy nghiêm lộng lẫy, nhưng Quý Bình An hôm nay lại mặc một thân bạch sắc tang phục bước vào. Cả triều đình xôn xao kinh hãi, ngự sử các bộ đồng loạt quát mắng:\n\n\"Phò Mã to gan! Ngày đại triều sao dám mặc áo tang lên điện? Đây là đại nghịch bất đạo!\"\n\nVũ Hoàng trên long ngai mày rồng nhíu chặt, trầm giọng hỏi: \"Quý Bình An, ngươi mặc tang phục vì ai?\"\n\nQuý Bình An quỳ xuống nhưng sống lưng thẳng tắp: \"Thần mặc tang phục không phải vì tư gia, mà là vì mười vạn trung hồn tử sĩ biên thùy Đại Vũ! Họ máu chảy đầu rơi giữ lấy biên cương, nhưng nơi kinh đô, quyền thần lại bớt xén lương thảo, mưu hại trung lương!\"\n\nNói đoạn, Quý Bình An đọc vế đối trắng ngâm vang điện ngọc:\n\"Bạch cốt chôn nơi ải lạnh, ngàn năm trung liệt chiếu thanh thiên;\nTử bào ngồi chốn kinh kỳ, một tấc công lao thẹn quỷ thần!\"\n\nVũ Hoàng nghe xong im lặng hồi lâu, bỗng vỗ mạnh long án: \"Nói hay lắm! Một câu thẹn quỷ thần đánh trúng tim đen lũ tham quan ô lại!\"\n\n# EFFECT: screen_flash|#FFD700|800\n# EFFECT: sfx_imperial_decree\n# EFFECT: show_toast|[ 詔 ] THÁNH CHỈ: Phong Quý Bình An làm Điển Nông Trung Lang Tướng!|unlock\n# EFFECT: unlock_feature|dien_nong_trung_lang\n\n\"Truyền chỉ! Phong Quý Bình An làm ĐIỂN NÔNG TRUNG LANG TƯỚNG, nắm toàn quyền điều phối kho lương và thuế khóa ba châu Bắc Cảnh!\"\n\n~ imperial_prestige += 5\n~ suspicion -= 10\n~ gold += 50000\n\n-> dien_vo_tam_quan\n\n=== dien_vo_tam_quan ===\n# CHAPTER_TITLE: Hồi 2 · Chương 80: Diễn Võ Tam Quan · Ép Đạo Tây Lăng\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_battle_tactical\n# ACTORS: qui_binh_an|right|confident, dien_vi|center|battle_stance\n\nMấy ngày sau, đoàn sứ giả Tây Lăng do Hề Nhan Công Chúa dẫn đầu đến kinh đô nghị hòa, đồng thời mang theo mười đại cao thủ Hoàng Cảnh thách đấu Diễn Võ Tam Quan.\n\nTrịnh Trung Hà - đệ nhất dũng sĩ Tây Lăng - cầm trường đao đứng giữa lôi đài gầm thét: \"Đại Vũ triều chẳng lẽ không có nổi một nam nhi dám tiếp một đao của ta sao?\"\n\n* [Phái Điển Vi xuất chiến: \"Điển Vi, phế hắn đi!\"]\n    Điển Vi cười lớn sải bước lên đài. Trịnh Trung Hà chém một đao bổ ngọn núi xuống, Điển Vi tay không vươn ra tóm chặt lấy lưỡi đao sáng loáng!\n    # EFFECT: camera_shake|0.7\n    # EFFECT: sfx_iron_halberd\n    \"Răng rắc!\" Thanh bảo đao gãy đôi. Điển Vi tiện tay vung một quyền hất văng Trịnh Trung Hà bay xa ba trượng, hộc máu ngất lịm!\n    Hề Nhan Công Chúa tái mặt, toàn trường ồ lên thán phục.\n    -> ly_nho_summoning\n\n* [Quý Bình An tự mình đối thơ áp chế tâm lý đối phương]\n    Quý Bình An xuất khẩu thành chương, dùng ba bài thơ hào sảng áp đảo toàn bộ văn thần Tây Lăng, đoạt lấy Huyết Long Lệnh của sứ đoàn!\n    -> ly_nho_summoning\n\n=== ly_nho_summoning ===\n# CHAPTER_TITLE: Hồi 2 · Chương 97: Tuyệt Thế Mưu Thần Lý Nho · Độc Tâm Khống Triều\n# BACKGROUND: bg_summoning_altar\n# MUSIC: bgm_dark_schemes\n# ACTORS: qui_binh_an|center|thoughtful\n# EFFECT: screen_flash|#800080|1500\n# EFFECT: camera_shake|0.6\n# EFFECT: sfx_thunder_dramatic\n\nTrở về mật thất, Quý Bình An cảm nhận thấy làn sóng sát cơ tại kinh đô đang dồn dập kéo tới. Lần này không chỉ là võ lực, mà là quyền mưu thâm độc chốn thâm cung. Ta cần một mưu sĩ hiểu rõ lòng người hiểm ác, thủ đoạn tàn độc nhưng trung thành tuyệt đối!\n\nHệ thống Bái Tướng Thần Đàn lại một lần nữa sáng rực hắc sắc độc khí!\n\n# EFFECT: summon_grand_reveal|hero_lynho\n# EFFECT: unlock_feature|feature_poison_stratagem\n# EFFECT: show_toast|[ 謀 ] BÁI TƯỚNG THẦN ĐÀN: Độc Sĩ Lý Nho (Văn Ưu) Quy Vị!|triumph\n\nMột trung niên văn sĩ khoác trường bào màu tro đen, ánh mắt thâm thúy tựa hồ đầm lầy vạn trượng, chậm rãi bước ra từ làn sương độc, cúi đầu thi lễ:\n\n\"Thuộc hạ Lý Nho (Văn Ưu), bái kiến Chúa Công! Mưu sự trong thiên hạ, phàm việc lớn muốn thành thì tâm phải sắt đá, nhổ cỏ phải nhổ tận gốc. Nguyện đem độc kế tàn sát yêu tà, phò tá đại nghiệp cho Chúa Công!\"\n\n~ gold -= 100000\n~ host_force += 5\n~ affinity_gia_hu += 15\n\nLý Nho vừa xuất thế liền dâng lên một mật báo kinh hoàng:\n\"Chúa Công, thuộc hạ vừa quan sát khí sắc của Vũ Hoàng hôm nay... Bệ Hạ không phải bệnh tật thông thường, mà là trúng Thực Tâm Bách Cốt Cổ Độc! Chỉ trong vòng nửa tháng nữa, kinh thành tất có biến loạn long trời lở đất!\"\n\n-> binh_bien_cung_dinh_start\n\n=== binh_bien_cung_dinh_start ===\n# CHAPTER_TITLE: Hồi 2 · Chương 104: Dạ Chiến Kinh Thành · Tô Kiến Phong Binh Biến\n# BACKGROUND: bg_imperial_road\n# MUSIC: bgm_epic_final_battle\n# ACTORS: to_kien_phong|left|armored, qui_binh_an|right|commanding\n\nQuả đúng như lời Lý Nho dự liệu!\nĐêm trăng tròn mười lăm, tiếng trống báo động từ Cấm Thành xé toạc màn đêm tĩnh mịch. Tô Kiến Phong câu kết cùng Tứ Hoàng Tử Tử Ngọc Hằng, điều động hai vạn cấm vệ phản loạn công phá cổng bắc hoàng cung, mưu đồ bức cung thoán vị!\n\nKhói lửa bốc cao ngùn ngụt, tiếng la sát vang rền ngõ hẻm.\n\nTại ngã tư ngự đạo, Quý Bình Sinh dẫn đầu ba ngàn kỵ binh Chiến Hổ Quân dàn trận đối lũy. Quý Bình An cùng Điển Vi và Lý Nho kịp thời tiếp ứng!\n\nTô Kiến Phong cưỡi hắc mã, cầm đại đao chỉ thẳng vào Quý Bình An: \"Quý Bình An! Hôm nay Vũ Hoàng hấp hối, thiên hạ đổi chủ! Ngươi thúc thủ chịu trói thì ta còn giữ cho toàn thây!\"\n\n* [Quyết Chiến · Lệnh cho Điển Vi trảm tướng: \"Điển Vi! Lấy đầu Tô Kiến Phong cho ta!\"]\n    Điển Vi gầm lên một tiếng như sấm sét: \"Nghịch tặc nhận lấy cái chết!\"\n    -> dien_vi_vs_to_kien_phong\n\n* [Mưu Lược · Lý Nho kích động phản quân: \"Cấm vệ nghe đây, ai bắt Tô Kiến Phong được phong vạn hộ hầu!\"]\n    Lý Nho tung ra chiếu thư giả của Vũ Hoàng khiến cấm vệ quân hoang mang dao động dữ dội!\n    -> dien_vi_vs_to_kien_phong\n\n=== dien_vi_vs_to_kien_phong ===\n# BACKGROUND: bg_fortress_battle\n# MUSIC: bgm_epic_final_battle\n# ACTORS: dien_vi|center|attacking, to_kien_phong|left|shocked\n\nTô Kiến Phong vung đại đao bổ xuống đầu Điển Vi. Nhưng Điển Vi không thèm né tránh, thanh Tấn Thiết Song Kích kẹp chặt lưỡi đao bẻ gãy làm đôi!\n\n# EFFECT: camera_shake|0.9\n# EFFECT: screen_flash|#FFFFFF|500\n# EFFECT: sfx_spear_whoosh\n\nTrước khi Tô Kiến Phong kịp thối lui, Điển Vi tung người lên không, song kích như hai luồng thiên lôi cắm phập vào hai bả vai Tô Kiến Phong, đóng đinh gã phản tướng xuống mặt đất!\n\n\"A a a!\" Tiếng gào thét thảm thiết vang lên. Toàn bộ võ công kinh mạch của Tô Kiến Phong bị phế sạch!\n\nBa ngàn Chiến Hổ Quân của Quý Bình Sinh thừa thế xông lên quét sạch tàn quân cấm vệ phản loạn. Tứ Hoàng Tử Tử Ngọc Hằng bị bắt sống ngay tại trận. Binh biến kinh hoàng bị dập tắt trong biển máu!\n\n-> vu_hoang_bang_ha\n\n=== vu_hoang_bang_ha ===\n# CHAPTER_TITLE: Hồi 2 · Chương 114: Chín Tiếng Chuông Tang · Vũ Hoàng Băng Hà\n# BACKGROUND: bg_palace_chamber\n# MUSIC: bgm_court_tension\n# ACTORS: vu_hoang|center|head_down, qui_binh_an|right|kneeling, tu_ngoc_trach|left|worried\n\nBên trong tẩm điện hoàng cung, mùi thuốc đắng nồng nặc bao trùm. Vũ Hoàng nằm trên long sàng, sắc mặt xám như tro tàn, hơi thở đứt quãng. Cổ độc đã phát tác vào tim phổi.\n\nTrước giường bệnh chỉ có Quý Bình An và Đại Hoàng Tử Tử Ngọc Trạch.\n\nVũ Hoàng run rẩy nắm lấy tay Quý Bình An, giọng thều thào nhưng ánh mắt vẫn lóe lên tia sáng cuối cùng của bậc đế vương:\n\n\"Bình An... trẫm biết... ngươi là rồng trong loài người, chiếc ao nhỏ Đại Vũ này không giữ nổi ngươi... Nhưng trẫm xin ngươi... hãy giữ lấy giang sơn họ Tử... Trạch nhi tính tình nhân hậu, không trị nổi loạn thế... Ngươi phải... phò tá nó...\"\n\nNói đoạn, Vũ Hoàng đưa ngọc tỷ truyền quốc cho Tử Ngọc Trạch, rồi trút hơi thở cuối cùng.\n\n# EFFECT: screen_flash|#000000|1500\n# EFFECT: sfx_gong_ancient\n# EFFECT: show_toast|[ 崩 ] VŨ HOÀNG BĂNG HÀ · ĐẠI VŨ ĐỔI CHỦ!|milestone\n\n\"Đoàng... Đoàng... Đoàng...\"\nChín tiếng chuông tang của hoàng triều vang vọng khắp kinh thành trong đêm lạnh. Một triều đại cũ khép lại, bánh xe lịch sử bắt đầu lăn sang trang mới đầy khốc liệt!\n\nQuý Bình An đứng dậy, nhìn Tử Ngọc Trạch đang quỳ khóc bên long sàng. Lý Nho đứng sau lưng khẽ thì thầm: \"Chúa Công, tân hoàng nhu nhược, đây chính là cơ hội trời ban để chúng ta thâu tóm toàn bộ binh quyền Đại Vũ!\"\n\n# EFFECT: chapter_complete|114\n\n-> chapter_115_start\n"
  },
  "meta": {
    "version": "3.0.0",
    "hero_count": 29,
    "card_count": 17,
    "battle_count": 3,
    "milestone_count": 18,
    "generated_at": "2026-09-20"
  }
};
  console.log("[ 天 ] [GAME_DATA] Đã nạp thành công:", window.GAME_DATA.meta);
})();
