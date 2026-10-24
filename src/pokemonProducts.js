// Danh mục Pokémon TCG (64 sản phẩm)
// Giá = giá tham chiếu lildeegame + 10% (tối thiểu 30.000₫, tối đa 300.000₫), làm tròn lên hàng chục nghìn (lấy ngày 20/10/2026). Ảnh: public/products/pokemon/
// Tạo tự động bằng script; muốn sửa giá từng món thì sửa trực tiếp "price" bên dưới.

export const pokemonTypes = ["Collection & Box","Case","Deck","Booster Bundle","Elite Trainer Box","Tin","Booster Box","Pack & Blister","Phụ kiện"];

export const pokemonPerks = ["Giao hỏa tốc 2h nội thành Hà Nội", "Sản phẩm TCG không áp dụng bảo hành / đổi 1–1"];

export const pokemonProducts = [
  {
    "id": 100,
    "name": "2026 Pokémon Chinese Eeveelutions Glitter Card Display Charm Gift Case",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 6100000,
    "confirmedPrice": true,
    "image": "/products/pokemon/2026-pokemon-chinese-eeveelutions-glitter-card-display-charm-gift-case.jpg",
    "description": "Pokémon TCG · Collection & Box · Bản tiếng Trung."
  },
  {
    "id": 101,
    "name": "30th Anniversary Celebration Pokemon Chinese Box",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 440000,
    "confirmedPrice": true,
    "image": "/products/pokemon/30th-anniversary-celebration-pokemon-chinese-box.jpg",
    "description": "Pokémon TCG · Collection & Box · Bản tiếng Trung."
  },
  {
    "id": 102,
    "name": "30th Anniversary Celebration Pokemon Chinese Case (8 Boxes)",
    "category": "pokemon",
    "type": "Case",
    "badge": "CASE",
    "price": 3300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/30th-anniversary-celebration-pokemon-chinese-case-8-boxes.jpg",
    "description": "Pokémon TCG · Case · Bản tiếng Trung."
  },
  {
    "id": 103,
    "name": "30th CELEBRATION Premium Deck Set Espeon & Umbreon",
    "category": "pokemon",
    "type": "Deck",
    "badge": "DECK",
    "price": 4100000,
    "confirmedPrice": true,
    "image": "/products/pokemon/30th-celebration-premium-deck-set-espeon-umbreon.jpg",
    "description": "Pokémon TCG · Deck."
  },
  {
    "id": 104,
    "name": "Ascended Heroes Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 2200000,
    "confirmedPrice": true,
    "image": "/products/pokemon/ascended-heroes-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 105,
    "name": "Ascended Heroes Elite Trainer Box",
    "category": "pokemon",
    "type": "Elite Trainer Box",
    "badge": "ELITE TRAINER BOX",
    "price": 4000000,
    "confirmedPrice": true,
    "image": "/products/pokemon/ascended-heroes-elite-trainer-box.jpg",
    "gallery": ["/products/photos/pokemon-ascended-heroes-etb.jpg"],
    "description": "Pokémon TCG · Elite Trainer Box."
  },
  {
    "id": 106,
    "name": "Ascended Heroes Elite Trainer Box (Bản Tây Ban Nha)",
    "category": "pokemon",
    "type": "Elite Trainer Box",
    "badge": "ELITE TRAINER BOX",
    "price": 2420000,
    "confirmedPrice": true,
    "image": "/products/pokemon/ascended-heroes-elite-trainer-box-phien-ban-spainish.jpg",
    "description": "Pokémon TCG · Elite Trainer Box · Bản Tây Ban Nha."
  },
  {
    "id": 107,
    "name": "Ascended Heroes Mega ex Box",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 1760000,
    "confirmedPrice": true,
    "image": "/products/pokemon/ascended-heroes-mega-ex-box.jpg",
    "description": "Pokémon TCG · Collection & Box.",
    "editionLabel": "CHỌN MẪU",
    "editionNoun": "mẫu",
    "editions": [
      {
        "name": "Feraligatr",
        "surcharge": 0
      },
      {
        "name": "Meganium",
        "surcharge": 0
      },
      {
        "name": "Emboar",
        "surcharge": 0
      }
    ]
  },
  {
    "id": 108,
    "name": "Ascended Heroes Mini Tin",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 950000,
    "confirmedPrice": true,
    "image": "/products/pokemon/ascended-heroes-mini-tin.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 109,
    "name": "Blooming Waters Premium Collection",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 10100000,
    "confirmedPrice": true,
    "image": "/products/pokemon/blooming-waters-premium-collection.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 110,
    "name": "Blue Sky Stream (S7 R)- Thailand Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 3900000,
    "confirmedPrice": true,
    "image": "/products/pokemon/blue-sky-stream-s7-r-thailand-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box · Bản Thái."
  },
  {
    "id": 111,
    "name": "Brilliant Stars Sleeved Booster Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 720000,
    "confirmedPrice": true,
    "image": "/products/pokemon/brilliant-stars-sleeved-booster-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 112,
    "name": "Chaos Rising Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 5900000,
    "confirmedPrice": true,
    "image": "/products/pokemon/chaos-rising-booster-box-2.jpg",
    "description": "Pokémon TCG · Booster Box."
  },
  {
    "id": 113,
    "name": "Chaos Rising Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 1320000,
    "confirmedPrice": true,
    "image": "/products/pokemon/chaos-rising-booster-bundle.jpg",
    "gallery": ["/products/photos/pokemon-chaos-rising-booster-bundle.jpg"],
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 114,
    "name": "Chaos Rising Booster Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 210000,
    "confirmedPrice": true,
    "image": "/products/pokemon/chaos-rising-booster-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 115,
    "name": "Chaos Rising Elite Trainer Box",
    "category": "pokemon",
    "type": "Elite Trainer Box",
    "badge": "ELITE TRAINER BOX",
    "price": 2040000,
    "confirmedPrice": true,
    "image": "/products/pokemon/chaos-rising-elite-trainer-box.jpg",
    "gallery": ["/products/photos/pokemon-chaos-rising-etb-1.jpg","/products/photos/pokemon-chaos-rising-etb-2.jpg"],
    "description": "Pokémon TCG · Elite Trainer Box."
  },
  {
    "id": 116,
    "name": "Chaos Rising Pokemon Center Elite Trainer Box",
    "category": "pokemon",
    "type": "Elite Trainer Box",
    "badge": "ELITE TRAINER BOX",
    "price": 5500000,
    "confirmedPrice": true,
    "image": "/products/pokemon/chaos-rising-pokemon-center-elite-trainer-box.jpg",
    "description": "Pokémon TCG · Elite Trainer Box."
  },
  {
    "id": 117,
    "name": "Charizard ex Special Collection",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 2420000,
    "confirmedPrice": true,
    "image": "/products/pokemon/charizard-ex-special-collection.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 118,
    "name": "Chilling Reign 3 Pack Blister [Eevee]",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 1650000,
    "confirmedPrice": true,
    "image": "/products/pokemon/chilling-reign-3-pack-blister-eevee.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 119,
    "name": "Collect 151: First Partners Premium Gift Box – Charmander",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 3500000,
    "confirmedPrice": true,
    "image": "/products/pokemon/collect-151-first-partners-premium-gift-box-charmander.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 120,
    "name": "Costco Pokemon Scarlet & Violet 151 Mini Tin 5-pack (Magneton)",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 8800000,
    "confirmedPrice": true,
    "image": "/products/pokemon/costco-pokemon-scarlet-violet-151-mini-tin-5-pack-magneton.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 121,
    "name": "Crystal Gathering Leafeon Binder Box",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 3080000,
    "confirmedPrice": true,
    "image": "/products/pokemon/crystal-gathering-leafeon-binder-box.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 122,
    "name": "Crystal Gathering Umbreon Binder Box",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 3300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/crystal-gathering-umbreon-binder-box.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 123,
    "name": "Darkness Ablaze 3 Pack Blister",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 1320000,
    "confirmedPrice": true,
    "image": "/products/pokemon/darkness-ablaze-3-pack-blister.jpg",
    "description": "Pokémon TCG · Pack & Blister.",
    "editionLabel": "CHỌN MẪU",
    "editionNoun": "mẫu",
    "editions": [
      {
        "name": "Eevee",
        "surcharge": 0
      },
      {
        "name": "Flareon",
        "surcharge": 110000
      }
    ]
  },
  {
    "id": 124,
    "name": "Darkness Ablaze Single Pack Blister [Hatenna]",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 330000,
    "confirmedPrice": true,
    "image": "/products/pokemon/darkness-ablaze-single-pack-blister-hatenna.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 125,
    "name": "Destined Rival Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 1980000,
    "confirmedPrice": true,
    "image": "/products/pokemon/destined-rival-booster-bundle.jpg",
    "gallery": ["/products/photos/pokemon-destined-rivals-booster-bundle.jpg"],
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 126,
    "name": "Eevee Heroes S6a- Thailand Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 5300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/eevee-heroes-s6a-thailand-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box · Bản Thái."
  },
  {
    "id": 127,
    "name": "First Partner Illustration Collection (Series 1)",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 2090000,
    "confirmedPrice": true,
    "image": "/products/pokemon/first-partner-illustration-collection-series-1.jpg",
    "gallery": ["/products/photos/pokemon-first-partner-1.jpg","/products/photos/pokemon-first-partner-2.jpg"],
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 128,
    "name": "Fusion Art (S8 F) – Hongkong and Taiwan Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 2200000,
    "confirmedPrice": true,
    "image": "/products/pokemon/fusion-art-s8-f-hongkong-and-taiwan-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box · Bản Hồng Kông / Đài Loan."
  },
  {
    "id": 129,
    "name": "Great Tusk ex & Iron Treads ex Premium Collection",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 7800000,
    "confirmedPrice": true,
    "image": "/products/pokemon/great-tusk-ex-iron-treads-ex-premium-collection.jpg",
    "gallery": ["/products/photos/pokemon-great-tusk-iron-treads.jpg"],
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 130,
    "name": "Lumiose City Mini Tin Display",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 3800000,
    "confirmedPrice": true,
    "image": "/products/pokemon/lumiose-city-mini-tin-display.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 131,
    "name": "Magnetic Acrylic Case – Hộp nam châm bảo vệ và sưu tầm TCG Pokemon",
    "category": "pokemon",
    "type": "Phụ kiện",
    "badge": "PHỤ KIỆN",
    "price": 440000,
    "confirmedPrice": true,
    "image": "/products/pokemon/magnetic-acrylic-case-hop-nam-cham-bao-ve-va-suu-tam-tcg-pokemon.jpg",
    "description": "Pokémon TCG · Phụ kiện.",
    "editionLabel": "CHỌN MẪU",
    "editionNoun": "mẫu",
    "editions": [
      {
        "name": "Booster Box",
        "surcharge": 0
      },
      {
        "name": "ETB",
        "surcharge": 60000
      }
    ]
  },
  {
    "id": 132,
    "name": "Mega Evolution Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 1980000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-evolution-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 133,
    "name": "Mega Evolution Mini Tin",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 770000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-evolution-mini-tin.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 134,
    "name": "Mega Evolution Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-evolution-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 135,
    "name": "Mega Moonlit Tin [Mega Clefable ex]",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 830000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-moonlit-tin-mega-clefable-ex.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 136,
    "name": "Mega Moonlit Tin [Mega Gengar ex]",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 940000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-moonlit-tin-mega-gengar-ex.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 137,
    "name": "Mega Symphonia Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 2530000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-symphonia-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box."
  },
  {
    "id": 138,
    "name": "Mega Zygarde ex Premium Collection",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 1430000,
    "confirmedPrice": true,
    "image": "/products/pokemon/mega-zygarde-ex-premium-collection.jpg",
    "gallery": ["/products/photos/pokemon-mega-zygarde.jpg"],
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 139,
    "name": "Obsidian Flames Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 9700000,
    "confirmedPrice": true,
    "image": "/products/pokemon/obsidian-flames-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box."
  },
  {
    "id": 140,
    "name": "Obsidian Flames Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 3300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/obsidian-flames-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 141,
    "name": "Paldean Fate Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 4600000,
    "confirmedPrice": true,
    "image": "/products/pokemon/paldean-fate-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 142,
    "name": "Perfect Order Blister Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 230000,
    "confirmedPrice": true,
    "image": "/products/pokemon/perfect-order-blister-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 143,
    "name": "Perfect Order Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 4800000,
    "confirmedPrice": true,
    "image": "/products/pokemon/perfect-order-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box."
  },
  {
    "id": 144,
    "name": "Phantasmal Flame Sleeved Booster Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 390000,
    "confirmedPrice": true,
    "image": "/products/pokemon/phantasmal-flame-sleeved-booster-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 145,
    "name": "Phantasmal Flames Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 9900000,
    "confirmedPrice": true,
    "image": "/products/pokemon/phantasmal-flames-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box."
  },
  {
    "id": 146,
    "name": "Phantasmal Flames Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 2200000,
    "confirmedPrice": true,
    "image": "/products/pokemon/phantasmal-flames-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 147,
    "name": "Pitch Black Elite Trainer Box (Pokemon Center)",
    "category": "pokemon",
    "type": "Elite Trainer Box",
    "badge": "ELITE TRAINER BOX",
    "price": 5100000,
    "confirmedPrice": true,
    "image": "/products/pokemon/pitch-black-elite-trainer-box-pokemon-center.jpg",
    "description": "Pokémon TCG · Elite Trainer Box."
  },
  {
    "id": 148,
    "name": "Pokemon Collect 151 First Partner Gift Box Squirtle (Simplified Chinese)",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 3300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/pokemon-collect-151-first-partner-gift-box-squirtle-simplified-chinese.jpg",
    "description": "Pokémon TCG · Collection & Box · Bản Trung giản thể."
  },
  {
    "id": 149,
    "name": "Pokemon Sword & Shield Base set (SC 1B)- Hongkong and Taiwan Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 1050000,
    "confirmedPrice": true,
    "image": "/products/pokemon/pokemon-sword-shield-base-set-sc-1b-hongkong-and-taiwan-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box · Bản Hồng Kông / Đài Loan."
  },
  {
    "id": 150,
    "name": "Prismatic Evolutions Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 2200000,
    "confirmedPrice": true,
    "image": "/products/pokemon/prismatic-evolutions-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 151,
    "name": "Prismatic Evolutions Super-Premium Collection",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 8300000,
    "confirmedPrice": true,
    "image": "/products/pokemon/prismatic-evolutions-super-premium-collection.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 152,
    "name": "Sleeved Booster Pack Pokemon Darkness Ablaze",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 330000,
    "confirmedPrice": true,
    "image": "/products/pokemon/sleeved-booster-pack-pokemon-darkness-ablaze.jpg",
    "description": "Pokémon TCG · Pack & Blister.",
    "editionLabel": "CHỌN MẪU",
    "editionNoun": "mẫu",
    "editions": [
      {
        "name": "Eternatus",
        "surcharge": 0
      },
      {
        "name": "Charizard",
        "surcharge": 30000
      }
    ]
  },
  {
    "id": 153,
    "name": "Star Collection (AC1a)- Hongkong and Taiwan Booster Box",
    "category": "pokemon",
    "type": "Booster Box",
    "badge": "BOOSTER BOX",
    "price": 1540000,
    "confirmedPrice": true,
    "image": "/products/pokemon/brilliant-stars-ac1a-hongkong-and-taiwan-booster-box.jpg",
    "description": "Pokémon TCG · Booster Box · Bản Hồng Kông / Đài Loan."
  },
  {
    "id": 154,
    "name": "Start Deck Generations Special Battle Set (SVM)",
    "category": "pokemon",
    "type": "Deck",
    "badge": "DECK",
    "price": 3080000,
    "confirmedPrice": true,
    "image": "/products/pokemon/start-deck-generations-special-battle-set-svm.jpg",
    "description": "Pokémon TCG · Deck."
  },
  {
    "id": 155,
    "name": "Surging Sparks Booster Bundle",
    "category": "pokemon",
    "type": "Booster Bundle",
    "badge": "BOOSTER BUNDLE",
    "price": 1650000,
    "confirmedPrice": true,
    "image": "/products/pokemon/surging-sparks-booster-bundle.jpg",
    "description": "Pokémon TCG · Booster Bundle."
  },
  {
    "id": 156,
    "name": "Surging Sparks Elite Trainer Box (2 pack Bundle)",
    "category": "pokemon",
    "type": "Elite Trainer Box",
    "badge": "ELITE TRAINER BOX",
    "price": 5500000,
    "confirmedPrice": true,
    "image": "/products/pokemon/surging-sparks-elite-trainer-box-2-pack-bundle.jpg",
    "description": "Pokémon TCG · Elite Trainer Box."
  },
  {
    "id": 157,
    "name": "Surging Sparks Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 280000,
    "confirmedPrice": true,
    "image": "/products/pokemon/surging-sparks-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  },
  {
    "id": 158,
    "name": "Surprise Box Pokemon Prismatic Evolutions",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 1980000,
    "confirmedPrice": true,
    "image": "/products/pokemon/surprise-box-pokemon-prismatic-evolutions.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 159,
    "name": "Unova Mini Tin Display",
    "category": "pokemon",
    "type": "Tin",
    "badge": "TIN",
    "price": 7100000,
    "confirmedPrice": true,
    "image": "/products/pokemon/unova-mini-tin-display.jpg",
    "description": "Pokémon TCG · Tin."
  },
  {
    "id": 160,
    "name": "Unova Poster Collection Pokemon Black Bolt",
    "category": "pokemon",
    "type": "Collection & Box",
    "badge": "COLLECTION & BOX",
    "price": 2420000,
    "confirmedPrice": true,
    "image": "/products/pokemon/unova-poster-collection-pokemon-black-bolt.jpg",
    "description": "Pokémon TCG · Collection & Box."
  },
  {
    "id": 161,
    "name": "Vivid Voltage 3 Pack Blister",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 1320000,
    "confirmedPrice": true,
    "image": "/products/pokemon/vivid-voltage-3-pack-blister.jpg",
    "description": "Pokémon TCG · Pack & Blister.",
    "editionLabel": "CHỌN MẪU",
    "editionNoun": "mẫu",
    "editions": [
      {
        "name": "Vaporeon",
        "surcharge": 0
      },
      {
        "name": "Sobble",
        "surcharge": 110000
      }
    ]
  },
  {
    "id": 162,
    "name": "Vivid Voltage Single Pack Blister",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 660000,
    "confirmedPrice": true,
    "image": "/products/pokemon/vivid-voltage-single-pack-blister.jpg",
    "description": "Pokémon TCG · Pack & Blister.",
    "editionLabel": "CHỌN MẪU",
    "editionNoun": "mẫu",
    "editions": [
      {
        "name": "Grookey",
        "surcharge": 0
      },
      {
        "name": "Scorbunny",
        "surcharge": 0
      }
    ]
  },
  {
    "id": 163,
    "name": "Vivid Voltage Sleeved Booster Pack",
    "category": "pokemon",
    "type": "Pack & Blister",
    "badge": "PACK & BLISTER",
    "price": 360000,
    "confirmedPrice": true,
    "image": "/products/pokemon/vivid-voltage-sleeved-booster-pack.jpg",
    "description": "Pokémon TCG · Pack & Blister."
  }
];
