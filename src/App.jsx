import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { pokemonPerks, pokemonProducts, pokemonTypes } from "./pokemonProducts";
import { isScheduled, newsCategories, visibleNews } from "./news";
import { ComparePage, GoogleReviews, TradeInPage } from "./features";
import Picture from "./Picture";
import { initAnalytics, trackContact, trackPageView, trackProductView } from "./analytics";
import { initTilt3d } from "./tilt3d";

initTilt3d();

const CONTACT_URL = "https://m.me/pixostation";
// Zalo dùng chung số điện thoại cửa hàng (đổi 24/10/2026)
const ZALO_URL = "https://zalo.me/0792371904";

// Thông tin cửa hàng (xác nhận 20/10/2026)
const SHOP = {
  address: "23 Lê Đại Hành, Hai Bà Trưng, Hà Nội",
  hours: "10:00 – 19:00",
  phone: "0792 371 904",
  phoneUrl: "tel:0792371904",
  zalo: "0792 371 904",
  mapsUrl: "https://www.google.com/maps/place/PixoStation/data=!4m2!3m1!1s0x0:0xcf5f3f432daf6979",
  mapsEmbed: "https://www.google.com/maps?q=PixoStation,+23+L%C3%AA+%C4%90%E1%BA%A1i+H%C3%A0nh,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i&output=embed",
  facebookUrl: "https://www.facebook.com/pixostation",
};

// Cam kết cho máy chơi game (xác nhận 20/10/2026)
const consolePerks = ["Bảo hành 6 tháng", "Đổi 1–1 trong 7 ngày", "Hỏa tốc 2h nội thành Hà Nội", "Full box đầy đủ phụ kiện", "Trả góp qua thẻ tín dụng", "Thu cũ đổi mới"];

// Giải thích gói: Zin = máy nguyên bản; Free Game = kèm thẻ nhớ
const packageSpecs = [
  { label: "Gói Zin", value: "Máy nguyên bản" },
  { label: "Gói Free Game", value: "Kèm thêm thẻ nhớ theo dung lượng đã chọn (128GB / 256GB / 512GB)" },
];

const switch2Specs = [
  { label: "Màn hình", value: "LCD 7.9 inch, 1920×1080, HDR10, tối đa 120Hz" },
  { label: "Xuất hình lên TV", value: "Tối đa 4K 60fps qua dock" },
  { label: "Bộ nhớ trong", value: "256GB, mở rộng bằng thẻ microSD Express (tối đa 2TB)" },
  { label: "Pin", value: "Khoảng 2–6.5 giờ (tùy game)" },
  { label: "Trọng lượng", value: "Khoảng 535g (kèm Joy-Con 2)" },
  { label: "Trong hộp", value: "Máy Switch 2 · Joy-Con 2 (L) và (R) · 2 dây đeo Joy-Con 2 · Tay cầm Joy-Con 2 Grip · Dock · Sạc AC adapter · Cáp HDMI Ultra High Speed" },
];

// Thứ tự hiện máy chơi game (mục "Nổi bật"): Switch 2 → OLED → V2 → Lite
const consoleOrder = ["switch2", "switch2-bundle", "switch2-pokopia", "switch2-zelda", "oled", "v2", "lite"];

const consoles = [
  {
    id: "lite",
    perks: consolePerks,
    specs: [
      { label: "Tình trạng", value: "Máy like new" },
      ...packageSpecs,
      { label: "Màn hình", value: "LCD 5.5 inch cảm ứng, 1280×720" },
      { label: "Bộ nhớ trong", value: "32GB, mở rộng bằng thẻ microSD" },
      { label: "Pin", value: "Khoảng 3–7 giờ (tùy game)" },
      { label: "Trọng lượng", value: "Khoảng 275g" },
      { label: "Lưu ý", value: "Chỉ chơi cầm tay: Joy-Con gắn liền, không kết nối TV" },
      { label: "Trong hộp", value: "Máy Switch Lite · Sạc AC adapter" },
    ],
    name: "Nintendo Switch Lite",
    image: "/products/switch-lite.jpg",
    badge: "NHỎ GỌN",
    description: "Máy like new, nhỏ gọn, chuyên chơi cầm tay, phù hợp mang theo mỗi ngày.",
    editions: [
      { name: "Gray (Xám)", surcharge: 0, type: "base", image: "/products/switch-lite-gray.jpg" },
      { name: "Yellow (Vàng)", surcharge: 0, type: "base", image: "/products/switch-lite-yellow.jpg" },
      { name: "Turquoise (Xanh ngọc)", surcharge: 0, type: "base", image: "/products/switch-lite-turquoise.jpg" },
      { name: "Coral (Hồng san hô)", surcharge: 0, type: "base", image: "/products/switch-lite-coral.jpg" },
      { name: "Blue (Xanh dương)", surcharge: 0, type: "base", image: "/products/switch-lite-blue.jpg" },
      { name: "Pokémon Zacian & Zamazenta Edition", surcharge: 500000, type: "limited", image: "/products/switch-lite-pokemon-zacian-zamazenta.jpg" },
      { name: "Pokémon Dialga & Palkia Edition", surcharge: 500000, type: "limited", image: "/products/switch-lite-pokemon-dialga-palkia.jpg" },
      { name: "Animal Crossing Isabelle’s Aloha Edition", surcharge: 500000, type: "limited", image: "/products/switch-lite-animal-crossing-isabelles-aloha.jpg" },
      { name: "Animal Crossing Timmy & Tommy’s Aloha Edition", surcharge: 500000, type: "limited", image: "/products/switch-lite-animal-crossing-timmy-tommys-aloha.jpg" },
      { name: "The Legend of Zelda: Hyrule Edition", surcharge: 500000, type: "limited", image: "/products/switch-lite-the-legend-of-zelda-hyrule.jpg" },
    ],
    variants: [
      { name: "Zin", original: 3450000, price: 3300000 },
      { name: "Free Game 128GB", original: 4800000, price: 4550000 },
      { name: "Free Game 256GB", original: 5100000, price: 4850000 },
      { name: "Free Game 512GB", original: 6000000, price: 5700000 },
    ],
  },
  {
    id: "v2",
    perks: consolePerks,
    specs: [
      { label: "Tình trạng", value: "Máy like new" },
      ...packageSpecs,
      { label: "Màn hình", value: "LCD 6.2 inch cảm ứng, 1280×720" },
      { label: "Bộ nhớ trong", value: "32GB, mở rộng bằng thẻ microSD" },
      { label: "Pin", value: "Khoảng 4.5–9 giờ (tùy game)" },
      { label: "Chế độ chơi", value: "Cầm tay, để bàn, kết nối TV qua dock" },
      { label: "Joy-Con", value: "Tháo rời được, chơi 2 người ngay" },
      { label: "Trong hộp", value: "Máy Switch · Joy-Con (L) và (R) · 2 dây đeo Joy-Con · Tay cầm Joy-Con Grip · Dock · Sạc AC adapter · Cáp HDMI" },
    ],
    name: "Nintendo Switch V2",
    image: "/products/switch-v2.jpg",
    badge: "ĐA NĂNG",
    description: "Máy like new, chơi cầm tay hoặc kết nối TV qua dock.",
    editions: [
      { name: "Neon Red / Neon Blue", surcharge: 100000, type: "neon", image: "/products/switch-v2-neon-red-neon-blue.jpg", gallery: ["/products/switch-v2-neon-red-neon-blue-box.jpg"] },
      { name: "Gray Joy-Con", surcharge: 0, type: "base", image: "/products/switch-v2-gray-joy-con.jpg" },
      { name: "Dragon Quest XI S Loto Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-dragon-quest-xi-s-loto.jpg" },
      { name: "Animal Crossing: New Horizons Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-animal-crossing-new-horizons.jpg", gallery: ["/products/switch-v2-animal-crossing-new-horizons-box.jpg"] },
      { name: "Mario Red & Blue Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-mario-red-blue.jpg", gallery: ["/products/switch-v2-mario-red-blue-box.jpg"] },
      { name: "Monster Hunter Rise Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-monster-hunter-rise.jpg" },
    ],
    variants: [
      { name: "Zin", original: 5100000, price: 4850000 },
      { name: "Free Game 128GB", original: 6400000, price: 6100000 },
      { name: "Free Game 256GB", original: 6750000, price: 6400000 },
      { name: "Free Game 512GB", original: 7650000, price: 7250000 },
    ],
  },
  {
    id: "oled",
    perks: consolePerks,
    specs: [
      { label: "Tình trạng", value: "Máy like new" },
      ...packageSpecs,
      { label: "Màn hình", value: "OLED 7 inch cảm ứng, 1280×720" },
      { label: "Bộ nhớ trong", value: "64GB, mở rộng bằng thẻ microSD" },
      { label: "Pin", value: "Khoảng 4.5–9 giờ (tùy game)" },
      { label: "Trọng lượng", value: "Khoảng 420g (kèm Joy-Con)" },
      { label: "Chế độ chơi", value: "Cầm tay, để bàn, kết nối TV qua dock" },
      { label: "Trong hộp", value: "Máy Switch OLED · Joy-Con (L) và (R) · 2 dây đeo Joy-Con · Tay cầm Joy-Con Grip · Dock (có cổng LAN) · Sạc AC adapter · Cáp HDMI" },
    ],
    name: "Nintendo Switch OLED",
    image: "/products/switch-oled.jpg",
    badge: "PHỔ BIẾN",
    description: "Máy like new, màn hình OLED 7 inch cho màu sắc nổi bật khi chơi game.",
    editions: [
      { name: "White Base", surcharge: 0, type: "base", image: "/products/switch-oled-white-base.jpg" },
      { name: "Neon Red / Neon Blue", surcharge: 100000, type: "neon", image: "/products/switch-oled-neon-red-neon-blue.jpg" },
      { name: "Splatoon Limited Edition", surcharge: 500000, type: "limited", image: "/products/switch-oled-splatoon.jpg" },
      { name: "Zelda Limited Edition", surcharge: 500000, type: "limited", image: "/products/switch-oled-zelda.jpg" },
      { name: "Pokémon Limited Edition", surcharge: 500000, type: "limited", image: "/products/switch-oled-pokemon.jpg" },
      { name: "Mario Limited Edition", surcharge: 500000, type: "limited", image: "/products/switch-oled-mario.jpg" },
    ],
    variants: [
      { name: "Zin", original: 6400000, price: 6050000 },
      { name: "Free Game 128GB", original: 7700000, price: 7350000 },
      { name: "Free Game 256GB", original: 8050000, price: 7650000 },
      { name: "Free Game 512GB", original: 8900000, price: 8500000 },
    ],
  },
  {
    id: "switch2",
    perks: consolePerks,
    specs: [{ label: "Tình trạng", value: "Có máy mới (New) và máy like new: chọn ở mục Tình trạng" }, ...switch2Specs],
    notes: ["Switch 2 dùng thẻ microSD Express; thẻ microSD thường chỉ dùng để sao chép ảnh và video."],
    name: "Nintendo Switch 2",
    // SEO: tiêu đề/mô tả theo cách khách tìm trên Google; {price} = giá thấp nhất hiện tại
    seoTitle: "Mua Nintendo Switch 2 chính hãng tại Hà Nội – Giá từ {price}",
    seoDescription:
      "Nintendo Switch 2 mới và like new tại Pixo Station, 23 Lê Đại Hành, Hà Nội. Full box, bảo hành 6 tháng, trả góp qua thẻ tín dụng, thu cũ đổi mới, giao hỏa tốc 2 giờ nội thành.",
    // Ảnh: hộp → máy → dock, sau đó ảnh chụp thật tại Pixo
    image: "/products/switch-2-box.jpg",
    gallery: ["/products/switch-2.jpg", "/products/switch-2-dock.jpg", "/products/photos/switch-2-thuc-te-1.jpg", "/products/photos/switch-2-thuc-te-2.jpg"],
    badge: "THẾ HỆ MỚI",
    description: "Máy chơi game thế hệ mới, bản thường (máy không kèm game).",
    variantLabel: "CHỌN TÌNH TRẠNG",
    variants: [
      { name: "Like New", original: 14500000, price: 13500000 },
      { name: "New", original: 15000000, price: 14000000 },
    ],
  },
  // Các bản Switch 2 kèm game / đặc biệt: sản phẩm riêng, giá "Liên hệ" (xác nhận 24/10/2026)
  {
    id: "switch2-bundle",
    name: "Nintendo Switch 2 Bundle – chọn 1 trong 3 game",
    image: "/products/switch-2-bundle.jpg",
    gallery: ["/products/switch-2.jpg", "/products/switch-2-dock.jpg"],
    badge: "KÈM GAME",
    contactPrice: true,
    description: "Hộp Switch 2 kèm code tải 1 trong 3 game: Mario Kart World, Donkey Kong Bananza hoặc Pokémon Pokopia.",
    perks: consolePerks,
    specs: [{ label: "Kèm game", value: "Code tải 1 trong 3 game: Mario Kart World, Donkey Kong Bananza hoặc Pokémon Pokopia" }, { label: "Tình trạng", value: "Máy mới" }, ...switch2Specs],
  },
  {
    id: "switch2-zelda",
    name: "Nintendo Switch 2 – The Legend of Zelda Edition",
    image: "/products/switch-2-zelda.jpg",
    gallery: ["/products/switch-2-zelda-docked.jpg"],
    badge: "PHIÊN BẢN GIỚI HẠN",
    contactPrice: true,
    description: "Switch 2 bản đặc biệt The Legend of Zelda, máy và dock thiết kế riêng.",
    perks: consolePerks,
    specs: [{ label: "Tình trạng", value: "Máy mới" }, ...switch2Specs],
  },
  {
    id: "switch2-pokopia",
    name: "Nintendo Switch 2 + Pokémon Pokopia Bundle",
    image: "/products/switch-2-pokopia.jpg",
    gallery: ["/products/switch-2.jpg", "/products/switch-2-dock.jpg"],
    badge: "KÈM GAME",
    contactPrice: true,
    description: "Hộp Switch 2 kèm bản tải đầy đủ Pokémon Pokopia.",
    perks: consolePerks,
    specs: [{ label: "Kèm game", value: "Pokémon Pokopia (bản tải)" }, { label: "Tình trạng", value: "Máy mới" }, ...switch2Specs],
  },
];

// Riftbound: mỗi set là 1 sản phẩm riêng. Giá 4.900.000₫/box (xác nhận 20/10/2026).
const riftboundSpecs = [
  { label: "Ngôn ngữ", value: "Tiếng Anh" },
  { label: "Tình trạng", value: "Box nguyên seal" },
  { label: "Quy cách", value: "1 booster box = 24 gói (booster pack)" },
  { label: "Mỗi gói", value: "14 lá → 336 lá / box" },
  { label: "Cấu trúc 1 gói", value: "7 Common · 3 Uncommon · 2 Rare trở lên · 1 lá Foil · 1 Token/Rune" },
  { label: "Lá Epic", value: "Khoảng 1/4 số gói có Epic (trung bình ~6 lá / box)" },
  { label: "Độ tuổi", value: "14+" },
];

const riftboundSets = [
  { set: 1, name: "Origins", image: "/products/riftbound-set1-origins.jpg" },
  { set: 2, name: "Spiritforged", image: "/products/riftbound-set2-spiritforged.jpg", gallery: ["/products/photos/riftbound-spiritforged-thuc-te.jpg"] },
  { set: 3, name: "Unleashed", image: "/products/riftbound-set3-unleashed.jpg", gallery: ["/products/photos/riftbound-unleashed-thuc-te.jpg"] },
  { set: 4, name: "Vendetta", image: "/products/riftbound-set4-vendetta.jpg", gallery: ["/products/photos/riftbound-vendetta-thuc-te.jpg"] },
  { set: 5, name: "Radiance", image: "/products/riftbound-set5-radiance.jpg", gallery: ["/products/photos/riftbound-radiance-thuc-te.jpg"], preorder: true },
].map((item) => ({
  id: 14 + item.set,
  name: `Riftbound Booster Box – Set ${item.set}: ${item.name}`,
  category: "riftbound",
  badge: item.preorder ? "ĐẶT TRƯỚC" : `RIFTBOUND · SET ${item.set}`,
  price: 4900000,
  unit: "box",
  confirmedPrice: true,
  image: item.image,
  gallery: item.gallery,
  description: `Booster box Riftbound: League of Legends TCG – Set ${item.set} ${item.name}, bản tiếng Anh, nguyên seal.${item.preorder ? " Đang nhận đặt trước, cọc 1.000.000₫." : ""}`,
  // TCG không áp dụng bảo hành / đổi 1–1 (xác nhận 20/10/2026)
  perks: item.preorder
    ? ["Box nguyên seal", "Bản tiếng Anh", "Hỏa tốc 2h nội thành Hà Nội", "Đặt trước, cọc 1.000.000₫"]
    : ["Box nguyên seal", "Bản tiếng Anh", "Hỏa tốc 2h nội thành Hà Nội"],
  // Nguồn: riftbound.leagueoflegends.com (Collectability in Riftbound: Origins) và các nhà bán lẻ
  specs: riftboundSpecs,
  notes: [
    "Cấu trúc gói theo công bố chính thức của nhà phát hành cho Set 1 – Origins; các set sau cũng là box 24 gói × 14 lá.",
    "Tỉ lệ lá hiếm là mức trung bình, không đảm bảo cho từng box.",
    "Sản phẩm TCG không áp dụng bảo hành và đổi 1–1.",
    ...(item.preorder ? ["Set 5 – Radiance phát hành ngày 23/10/2026. Nhận đặt trước, đặt cọc 1.000.000₫."] : []),
  ],
}));

// Băng game Pixo đang có (theo ảnh kho/kệ Pixo). Ảnh: key art trên nintendo.com. platform: 1 = băng Switch đời đầu, mặc định Switch 2.
// price: giá bán (₫); bỏ trống = hiện "Liên hệ".
const gameCatalog = [
  { slug: "nba-2k26", name: "NBA 2K26", genre: "Thể thao · Bóng rổ", price: 1200000 },
  { slug: "reanimal", name: "REANIMAL", genre: "Kinh dị · Phiêu lưu", price: 1250000 },
  { slug: "pokemon-pokopia", name: "Pokémon Pokopia", genre: "Mô phỏng · Xây dựng", price: 1550000 },
  { slug: "super-mario-party-jamboree-ns2", name: "Super Mario Party Jamboree – Nintendo Switch 2 Edition + Jamboree TV", genre: "Party · Chơi nhóm", gallery: ["/products/photos/game-mario-party-jamboree.jpg"], price: 1500000 },
  { slug: "monster-hunter-stories-3", name: "Monster Hunter Stories 3: Twisted Reflection", genre: "Nhập vai", price: 1300000 },
  { slug: "final-fantasy-vii-remake-intergrade", name: "Final Fantasy VII Remake Intergrade", genre: "Nhập vai hành động" },
  { slug: "mario-tennis-fever", name: "Mario Tennis Fever", genre: "Thể thao · Chơi nhóm", gallery: ["/products/photos/game-mario-tennis-fever.jpg"], price: 1350000 },
  { slug: "zelda-tears-of-the-kingdom-ns2", name: "The Legend of Zelda: Tears of the Kingdom – Nintendo Switch 2 Edition", genre: "Phiêu lưu thế giới mở", gallery: ["/products/photos/game-zelda-totk-switch2.jpg"], price: 1650000 },
  { slug: "pragmata", name: "PRAGMATA", genre: "Hành động · Khoa học viễn tưởng", price: 1700000 },
  { slug: "efootball-kick-off", name: "eFootball Kick-Off!", genre: "Thể thao · Bóng đá", price: 850000 },
  { slug: "onimusha-way-of-the-sword", name: "Onimusha: Way of the Sword", genre: "Hành động" },
  { slug: "ea-sports-fc-27", name: "EA SPORTS FC 27", genre: "Thể thao · Bóng đá", price: 1700000 },
  { slug: "fire-emblem-fortunes-weave", name: "Fire Emblem: Fortune's Weave", genre: "Chiến thuật nhập vai", price: 1850000 },
  { slug: "elden-ring-tarnished-edition", name: "ELDEN RING Tarnished Edition", genre: "Nhập vai hành động" },
  // Thêm 24/10/2026 theo ảnh kệ game
  { slug: "final-fantasy-vii-rebirth", name: "Final Fantasy VII Rebirth", genre: "Nhập vai hành động", price: 1300000 },
  { slug: "trails-beyond-the-horizon", name: "The Legend of Heroes: Trails beyond the Horizon", genre: "Nhập vai" },
  { slug: "hades-ii", name: "Hades II – Nintendo Switch 2 Edition", genre: "Hành động roguelike" },
  { slug: "xenoblade-chronicles-de-ns2", name: "Xenoblade Chronicles: Definitive Edition – Nintendo Switch 2 Edition", genre: "Nhập vai" },
  { slug: "xenoblade-chronicles-2-ns2", name: "Xenoblade Chronicles 2 – Nintendo Switch 2 Edition", genre: "Nhập vai" },
  { slug: "trails-in-the-sky-2nd-chapter", name: "Trails in the Sky 2nd Chapter – Nintendo Switch 2 Edition", genre: "Nhập vai" },
  { slug: "cyberpunk-2077-ultimate", name: "Cyberpunk 2077: Ultimate Edition", genre: "Nhập vai hành động" },
  { slug: "donkey-kong-bananza", name: "Donkey Kong Bananza", genre: "Phiêu lưu 3D", price: 1350000 },
  { slug: "hyrule-warriors-age-of-imprisonment", name: "Hyrule Warriors: Age of Imprisonment", genre: "Hành động" },
  { slug: "oblivion-remastered", name: "The Elder Scrolls IV: Oblivion Remastered", genre: "Nhập vai thế giới mở" },
  { slug: "pokemon-legends-z-a-ns2", name: "Pokémon Legends: Z-A – Nintendo Switch 2 Edition", genre: "Nhập vai", price: 1300000 },
  { slug: "zelda-breath-of-the-wild-ns2", name: "The Legend of Zelda: Breath of the Wild – Nintendo Switch 2 Edition", genre: "Phiêu lưu thế giới mở" },
  { slug: "animal-crossing-new-horizons-ns2", name: "Animal Crossing: New Horizons – Nintendo Switch 2 Edition", genre: "Mô phỏng cuộc sống" },
  { slug: "lies-of-p-complete", name: "Lies of P: Complete Edition", genre: "Hành động soulslike", price: 1600000 },
  { slug: "cronos-the-new-dawn", name: "Cronos: The New Dawn", genre: "Kinh dị sinh tồn" },
  { slug: "granblue-fantasy-relink-endless-ragnarok", name: "Granblue Fantasy: Relink – Endless Ragnarok", genre: "Nhập vai hành động" },
  { slug: "resident-evil-7-gold", name: "Resident Evil 7 biohazard Gold Edition", genre: "Kinh dị sinh tồn" },
  { slug: "trails-to-azure", name: "The Legend of Heroes: Trails to Azure", genre: "Nhập vai", platform: 1 },
  { slug: "trails-from-zero", name: "The Legend of Heroes: Trails from Zero", genre: "Nhập vai", platform: 1 },
  { slug: "trails-through-daybreak", name: "The Legend of Heroes: Trails through Daybreak", genre: "Nhập vai", platform: 1 },
  { slug: "trails-through-daybreak-ii", name: "The Legend of Heroes: Trails through Daybreak II", genre: "Nhập vai", platform: 1 },
  { slug: "hades", name: "Hades", genre: "Hành động roguelike", platform: 1 },
  { slug: "trails-in-the-sky-1st-chapter", name: "Trails in the Sky 1st Chapter", genre: "Nhập vai", platform: 1 },
  { slug: "pokemon-shining-pearl", name: "Pokémon Shining Pearl", genre: "Nhập vai", platform: 1 },
  { slug: "pokemon-brilliant-diamond", name: "Pokémon Brilliant Diamond", genre: "Nhập vai", platform: 1 },
  { slug: "neon-white", name: "Neon White", genre: "Hành động · Bắn súng", platform: 1 },
  { slug: "splatoon-3", name: "Splatoon 3", genre: "Bắn súng · Chơi nhóm", platform: 1 },
  { slug: "ori-blind-forest", name: "Ori and the Blind Forest: Definitive Edition", genre: "Phiêu lưu · Platformer", platform: 1 },
  { slug: "super-smash-bros-ultimate", name: "Super Smash Bros. Ultimate", genre: "Đối kháng · Chơi nhóm", platform: 1, price: 750000 },
  { slug: "hollow-knight", name: "Hollow Knight", genre: "Phiêu lưu · Metroidvania", platform: 1 },
  { slug: "ring-fit-adventure", name: "Ring Fit Adventure", genre: "Thể dục · Vận động", platform: 1 },
  { slug: "octopath-traveler-ii", name: "Octopath Traveler II", genre: "Nhập vai", platform: 1 },
  { slug: "ori-will-of-the-wisps", name: "Ori and the Will of the Wisps", genre: "Phiêu lưu · Platformer", platform: 1 },
  { slug: "pokemon-mystery-dungeon-dx", name: "Pokémon Mystery Dungeon: Rescue Team DX", genre: "Nhập vai", platform: 1 },
  { slug: "new-pokemon-snap", name: "New Pokémon Snap", genre: "Chụp ảnh · Phiêu lưu", platform: 1 },
  // Thêm 24/10/2026 theo bảng kho Pixo
  { slug: "assassins-creed-shadows", name: "Assassin's Creed Shadows", genre: "Hành động thế giới mở", price: 1200000 },
  { slug: "devil-may-cry-5", name: "Devil May Cry 5 Devil Hunter Edition", genre: "Hành động", price: 1200000 },
  { slug: "dragons-dogma-2", name: "Dragon's Dogma 2: Dark Arisen", genre: "Nhập vai hành động", price: 1400000 },
  { slug: "metroid-prime-4", name: "Metroid Prime 4: Beyond – Nintendo Switch 2 Edition", genre: "Hành động · Phiêu lưu", price: 1100000 },
  { slug: "resident-evil-requiem", name: "Resident Evil Requiem", genre: "Kinh dị sinh tồn", price: 1300000 },
  { slug: "splatoon-raiders", name: "Splatoon Raiders", genre: "Hành động · Phiêu lưu", price: 1650000 },
  { slug: "super-mario-bros-wonder-ns2", name: "Super Mario Bros. Wonder – Nintendo Switch 2 Edition + Meetup in Bellabel Park", genre: "Platformer · Chơi nhóm", price: 1600000 },
  { slug: "yakuza-0-directors-cut", name: "Yakuza 0 Director's Cut", genre: "Hành động · Phiêu lưu", price: 1100000 },
  { slug: "zelda-ocarina-of-time", name: "The Legend of Zelda: Ocarina of Time", genre: "Phiêu lưu", price: 1800000 },
  { slug: "mario-kart-world", name: "Mario Kart World", genre: "Đua xe · Chơi nhóm", price: 1700000 },
  { slug: "street-fighter-6", name: "Street Fighter 6 Years 1-2 Fighters Edition", genre: "Đối kháng", price: 1300000 },
  { slug: "astral-chain", name: "Astral Chain", genre: "Hành động", platform: 1, price: 650000 },
  { slug: "monster-hunter-rise", name: "Monster Hunter Rise", genre: "Nhập vai hành động", platform: 1, price: 750000 },
  { slug: "xenoblade-chronicles-3", name: "Xenoblade Chronicles 3", genre: "Nhập vai", platform: 1, price: 650000 },
].map((game, index) => ({
  id: 20 + index,
  name: game.name,
  category: "game",
  // Băng Switch đời đầu vẫn chơi được trên Switch 2
  badge: game.platform === 1 ? "SWITCH 2 / SWITCH" : "SWITCH 2",
  // Giá bán theo bảng kho Pixo (24/10/2026); chưa có giá thì hiện "Liên hệ"
  price: game.price ?? null,
  confirmedPrice: true,
  image: `/products/game-${game.slug}.jpg`,
  gallery: game.gallery,
  description: `Băng game Nintendo Switch${game.platform === 1 ? " · chơi được trên cả Switch 2" : " 2"} · ${game.genre}. ${game.price ? "Nhắn Pixo để kiểm tra tình trạng hàng." : "Nhắn Pixo để nhận giá và tình trạng hàng."}`,
}));

const otherProducts = [
  ...gameCatalog,
  { id: 11, name: "Túi đựng máy chơi game", category: "accessory", badge: "BẢO VỆ MÁY", price: 250000, image: "/products/carrying-case.jpg", description: "Túi đựng máy và phụ kiện khi di chuyển." },
  { id: 12, name: "Ốp bảo vệ Nintendo Switch", category: "accessory", badge: "PHỤ KIỆN", price: 150000, image: "/products/switch-case.jpg", description: "Nhiều mẫu ốp tùy theo model máy." },
  { id: 13, name: "Tay cầm chơi game", category: "accessory", badge: "CHƠI CÙNG BẠN", price: 590000, image: "/products/controller.jpg", description: "Tay cầm bổ sung cho những buổi chơi game." },
  ...riftboundSets,

];

// Danh mục Pokémon TCG (dữ liệu ở src/pokemonProducts.js)
otherProducts.push(...pokemonProducts.map((product) => ({ ...product, perks: pokemonPerks })));

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "console", label: "Máy chơi game" },
  { id: "game", label: "Băng game" },
  { id: "accessory", label: "Phụ kiện" },
  { id: "pokemon", label: "Pokémon TCG" },
  { id: "riftbound", label: "Riftbound TCG" },
];

const services = [
  { number: "01", title: "Sửa chữa máy", description: "Kiểm tra lỗi phần cứng, nút bấm, màn hình và pin." },
  { number: "02", title: "Cài đặt game", description: "Hỗ trợ cài đặt và quản lý game theo phương án tương thích, hợp pháp." },
  { number: "03", title: "Khắc phục phần mềm", description: "Hỗ trợ kiểm tra lỗi hệ thống và xử lý sự cố phần mềm." },
];

// Ảnh khách hàng thật (không ghi tên khách)
const customerPhotos = [
  { src: "/community/khach-switch-2.jpg", caption: "Nintendo Switch 2" },
  { src: "/community/khach-switch-oled.jpg", caption: "Switch OLED Neon" },
  { src: "/community/khach-switch-lite-pokemon.jpg", caption: "Switch Lite bản Pokémon" },
  { src: "/community/khach-pokemon-tcg.jpg", caption: "Pokémon TCG Ascended Heroes" },
  { src: "/community/khach-switch-v2.jpg", caption: "Nintendo Switch" },
  { src: "/community/khach-pokemon-etb.jpg", caption: "Pokémon TCG Elite Trainer Box" },
  { src: "/community/khach-switch-2-tui.jpg", caption: "Nhận máy tại Pixo" },
  { src: "/community/khach-showroom.jpg", caption: "Mua sắm tại showroom" },
];

// Ảnh Pixo Nexus Night (giao lưu Riftbound hằng tuần)
const nexusPhotos = [
  { src: "/community/nexus-night-ban-bai.jpg", alt: "Người chơi Riftbound đang xếp bài" },
  { src: "/community/nexus-night-ban-choi.jpg", alt: "Các bàn chơi tại Pixo Nexus Night" },
  { src: "/community/nexus-night-goc.jpg", alt: "Người chơi giao lưu Riftbound" },
  { src: "/community/nexus-night-ba-ban.jpg", alt: "Người chơi nhận gói Riftbound" },
];

const events = [
  { tag: "POKÉMON TCG", title: "Gặp gỡ cộng đồng Pokémon", description: "Giao lưu, chia sẻ bộ bài và tìm người chơi cùng." },
  { tag: "RIFTBOUND", title: "Pixo Nexus Night", description: "19:00 thứ 4 hằng tuần tại showroom Pixo Station." },
];

const aboutValues = [
  { kicker: "01 / TƯ VẤN THẬT", title: "Không vẽ thêm nhu cầu", description: "Lite đủ chơi thì tụi mình nói Lite. Không ép bạn lên OLED chỉ vì nó đắt hơn." },
  { kicker: "02 / ĐỒNG HÀNH", title: "Bán xong, Pixo vẫn ở đây", description: "Máy lỗi nút, chai pin hay trục trặc phần mềm, cứ mang qua. Tụi mình kiểm tra và nói rõ phương án." },
  { kicker: "03 / CỘNG ĐỒNG", title: "Nhiều hơn một cửa hàng", description: "Nơi để gặp người chơi cùng, đổi bài, giao lưu TCG và tìm đồng đội cho trận tiếp theo." },
];

// Banner đầu trang. Thêm banner mới: bỏ ảnh vào public/banners rồi thêm 1 dòng vào đây.
// link: bấm vào banner sẽ mở link này (để trống thì banner không bấm được).
const banners = [
  {
    image: "/banners/sinh-nhat-pixo.jpg",
    alt: "Sinh nhật Pixo: Mua 1 tặng 1 Nintendo Switch, check-in rinh OLED miễn phí",
    link: CONTACT_URL,
  },
];

const BANNER_INTERVAL = 5000;

// Máy bán chạy ở đầu trang chủ. Đổi máy: sửa productId / editionName / title (image không bắt buộc).
const bestsellerConfig = [
  { productId: "oled", editionName: "White Base", title: "Switch OLED Trắng", image: "/products/featured-oled-white.jpg" },
  { productId: "switch2", title: "Nintendo Switch 2" },
  { productId: "v2", editionName: "Neon Red / Neon Blue", title: "Switch V2 Neon" },
  { productId: "lite", editionName: "Gray (Xám)", title: "Switch Lite Xám" },
];

const bestsellers = bestsellerConfig.map((config) => {
  const product = consoles.find((item) => item.id === config.productId);
  const editionIndex = product.editions
    ? Math.max(0, product.editions.findIndex((item) => item.name === config.editionName))
    : 0;
  const baseEdition = product.editions ? product.editions[editionIndex] : null;
  const edition = config.image ? { ...baseEdition, image: config.image } : baseEdition;
  const price = product.variants[0].price + (baseEdition ? baseEdition.surcharge : 0);
  return { ...config, product, editionIndex, edition, price };
});

// Dải cam kết ngay dưới banner trang chủ (xác nhận 24/10/2026)
const trustBadges = [
  { title: "Bảo hành 6 tháng", text: "Cho máy chơi game" },
  { title: "Đổi 1–1 trong 7 ngày", text: "Theo chính sách Pixo" },
  { title: "Hỏa tốc 2 giờ", text: "Nội thành Hà Nội" },
  { title: "Trả góp 0đ trả trước", text: "Qua thẻ tín dụng" },
];

// Hàng đặt trước / mới về. productName: mở trang sản phẩm đó; category: mở danh mục; không có cả hai thì mở Zalo.
const preorders = [
  {
    title: "Switch 2 bản Zelda",
    image: "/home/preorder-switch-2-zelda.jpg",
    tag: "ĐẶT TRƯỚC",
    price: 16000000,
    note: "Dự kiến giao 29/10. Nhắn Zalo để giữ máy.",
  },
  {
    title: "Riftbound Set 5 – Radiance",
    image: "/products/photos/riftbound-radiance-thuc-te.jpg",
    tag: "ĐẶT TRƯỚC",
    productName: "Riftbound Booster Box – Set 5: Radiance",
    note: "Booster box tiếng Anh, nguyên seal.",
  },
  {
    title: "Pokémon Chaos Rising ETB",
    image: "/products/photos/pokemon-chaos-rising-etb-1.jpg",
    tag: "MỚI VỀ",
    productName: "Chaos Rising Elite Trainer Box",
    note: "Hàng có sẵn tại showroom.",
  },
  {
    title: "Băng game Switch 2",
    image: "/products/photos/game-switch2-bo-suu-tap.jpg",
    tag: "MỚI VỀ",
    category: "game",
    note: "NBA 2K26, Mario Party, Zelda, FC27…",
  },
];

// Combo tiết kiệm (giá theo poster combo của Pixo)
const combos = [
  {
    name: "Combo Khởi Đầu",
    image: "/home/combo-khoi-dau.jpg",
    items: "Switch V2 128GB + Joy-Con + Túi đựng máy + Host trọn đời + Cường lực + Ốp bảo vệ",
    original: 8000000,
    price: 7480000,
  },
  {
    name: "Combo Gia Đình",
    image: "/home/combo-gia-dinh.jpg",
    items: "Switch OLED 256GB + Joy-Con + Túi đựng máy + Host trọn đời + Cường lực + Ốp bảo vệ",
    original: 9650000,
    price: 9080000,
  },
  {
    name: "Combo Game Thủ",
    image: "/home/combo-game-thu.jpg",
    items: "Switch OLED 512GB + Pro Controller + Túi đựng máy + Host trọn đời + Cường lực + Ốp bảo vệ",
    original: 10500000,
    price: 9850000,
  },
];

// Dải Pokémon lướt ngang trên trang chủ: ưu tiên sản phẩm đã có ảnh chụp thực tế
const pokemonRail = [
  ...pokemonProducts.filter((item) => item.gallery),
  ...pokemonProducts.filter((item) => !item.gallery),
].slice(0, 10);

const iconProps = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

const quickCategories = [
  { label: "Máy chơi game", category: "console", icon: <svg {...iconProps}><rect x="2" y="6" width="20" height="12" rx="4" /><path d="M7 10v4M5 12h4M16 11h.01M18 13h.01" /></svg> },
  { label: "Băng game", category: "game", icon: <svg {...iconProps}><path d="M6 3h9l3 3v15H6z" /><path d="M9 7h6M9 17h6" /></svg> },
  { label: "Phụ kiện", category: "accessory", icon: <svg {...iconProps}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg> },
  { label: "Pokémon TCG", category: "pokemon", icon: <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h6M15 12h6" /><circle cx="12" cy="12" r="3" /></svg> },
  { label: "Riftbound", category: "riftbound", icon: <svg {...iconProps}><rect x="5" y="3" width="11" height="15" rx="2" /><path d="M9 21h8a2 2 0 0 0 2-2V7" /></svg> },
  { label: "Sửa máy", section: "services", icon: <svg {...iconProps}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.6-.4-.4-2.6z" /></svg> },
];

function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const count = banners.length;

  const go = (step) => setIndex((current) => (current + step + count) % count);

  // Tự chuyển banner sau mỗi 5 giây, dừng khi rê chuột vào
  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      BANNER_INTERVAL
    );
    return () => window.clearInterval(timer);
  }, [count, paused, index]);

  if (count === 0) return null;

  return (
    <section
      className="banner-slider"
      aria-label="Chương trình nổi bật"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStartX === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
        setTouchStartX(null);
      }}
    >
      <div className="banner-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {banners.map((banner, i) => {
          const image = (
            <Picture
              src={banner.image}
              sizes="100vw"
              alt={banner.alt}
              loading={i === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          );
          return (
            <div className="banner-slide" key={banner.image} aria-hidden={i !== index}>
              {banner.link ? (
                <a href={banner.link} rel="noreferrer" tabIndex={i === index ? 0 : -1}>
                  {image}
                </a>
              ) : image}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button className="banner-arrow banner-prev" onClick={() => go(-1)} aria-label="Banner trước">‹</button>
          <button className="banner-arrow banner-next" onClick={() => go(1)} aria-label="Banner tiếp theo">›</button>
          <div className="banner-dots">
            {banners.map((banner, i) => (
              <button
                key={banner.image}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
                aria-label={`Xem banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// value null/undefined = sản phẩm chưa có giá → hiện "Liên hệ"
function money(value) {
  if (value == null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}

// Câu hỏi thường gặp: chỉ dùng thông tin Pixo đã xác nhận (20/10/2026)
const faqs = [
  { q: "Máy ở Pixo là máy mới hay máy cũ?", a: "Switch Lite, Switch V2 và Switch OLED là máy like new. Switch 2 có cả máy mới (New) và máy like new, bạn chọn ở mục Gói / Tình trạng." },
  { q: "Gói Zin và gói Free Game khác nhau thế nào?", a: "Gói Zin là máy nguyên bản. Gói Free Game kèm thêm thẻ nhớ theo dung lượng bạn chọn (128GB, 256GB hoặc 512GB)." },
  { q: "Trong hộp có đủ phụ kiện không?", a: "Có. Máy bán ra full box đầy đủ phụ kiện. Danh sách chi tiết từng món có trong mục Thông tin sản phẩm của mỗi máy." },
  { q: "Pixo có bảo hành và đổi trả không?", a: "Máy chơi game được bảo hành 6 tháng và hỗ trợ đổi 1–1 trong 7 ngày theo chính sách. Sản phẩm TCG (Pokémon, Riftbound) không áp dụng bảo hành và đổi 1–1." },
  { q: "Có trả góp không?", a: "Có. Pixo hỗ trợ trả góp bằng thẻ tín dụng qua mPOS. Nhắn Pixo để được tư vấn kỳ hạn." },
  { q: "Thanh toán bằng cách nào?", a: "Chuyển khoản, tiền mặt tại cửa hàng hoặc thanh toán khi nhận hàng (COD)." },
  { q: "Giao hàng mất bao lâu?", a: "Nội thành Hà Nội giao hỏa tốc trong 2 giờ. Đơn đi tỉnh: Pixo báo phí ship và thời gian giao dự kiến khi bạn chốt đơn." },
  { q: "Pixo có thu cũ đổi mới không?", a: "Có. Gửi ảnh và mô tả tình trạng máy qua Zalo hoặc Messenger để Pixo định giá." },
  { q: "Switch Lite có kết nối TV được không?", a: "Không. Switch Lite chỉ chơi cầm tay. Nếu muốn chơi trên TV, bạn nên chọn Switch V2, Switch OLED hoặc Switch 2." },
  { q: "Đặt trước Riftbound Set 5 – Radiance thế nào?", a: "Nhắn Pixo để giữ suất, đặt cọc 1.000.000₫." },
  { q: "Tôi có thể đến xem máy trực tiếp không?", a: "Được. Pixo ở 23 Lê Đại Hành, Hai Bà Trưng, Hà Nội, mở cửa từ 10:00 đến 19:00." },
];

const navSections = [
  { id: "tcg", label: "TCG & cộng đồng" },
  { id: "services", label: "Dịch vụ" },
  { id: "about", label: "Về Pixo" },
  { id: "policies", label: "Chính sách" },
  { id: "news", label: "Tin tức" },
  { id: "faq", label: "Hỏi đáp" },
  { id: "contact", label: "Liên hệ" },
];

// Mỗi mục menu là một trang riêng (link riêng), không cuộn dài trên trang chủ
const pagePaths = {
  home: "/",
  products: "/san-pham",
  tcg: "/tcg",
  services: "/dich-vu",
  about: "/ve-pixo",
  policies: "/chinh-sach",
  faq: "/hoi-dap",
  contact: "/lien-he",
  compare: "/so-sanh-may",
  tradein: "/thu-cu",
};

function pageFromLocation() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const found = Object.entries(pagePaths).find(([, value]) => value === path);
  return found ? found[0] : "home";
}

function Header({ current, onHome, onSection, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    onSearch(query.trim());
  };

  const searchForm = (className) => (
    <form className={className} onSubmit={submitSearch} role="search">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm máy, băng game, Pokémon..."
        aria-label="Tìm sản phẩm"
      />
      <button type="submit" aria-label="Tìm">⌕</button>
    </form>
  );

  // Bấm một mục thì đóng menu điện thoại rồi mới chuyển trang/cuộn
  const navigate = (action) => {
    setMenuOpen(false);
    action();
  };

  const links = (
    <>
      <button className={current === "home" ? "active" : ""} onClick={() => navigate(onHome)}>Trang chủ</button>
      <button className={current === "products" ? "active" : ""} onClick={() => navigate(() => onSection("products"))}>Sản phẩm</button>
      {navSections.map((section) => (
        <button
          key={section.id}
          className={current === section.id ? "active" : ""}
          onClick={() => navigate(() => onSection(section.id))}
        >
          {section.label}
        </button>
      ))}
    </>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => navigate(onHome)}>
          <img className="brand-logo" src="/logo-pixo-dark.png" alt="Pixo Station" />
        </button>

        <nav className="main-nav">{links}</nav>

        {searchForm("header-search")}

        <a className="header-cta" href={SHOP.phoneUrl}>
          ☎ {SHOP.phone}
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {searchForm("header-search header-search-mobile")}

      {menuOpen && <nav className="mobile-menu">{links}</nav>}
    </header>
  );
}

// Ảnh hiển thị: ảnh theo màu/phiên bản → ảnh chung của sản phẩm → khung "Ảnh sẽ cập nhật"
function ProductImage({ product, edition, sizes }) {
  const sources = [edition?.image, product.image].filter(Boolean);
  const [failedCount, setFailedCount] = useState(0);
  const src = sources[failedCount];

  return (
    <div className="product-image">
      {src ? (
        <Picture
          src={src}
          sizes={sizes}
          alt={edition?.name ? `${product.name} - ${edition.name}` : product.name}
          loading="lazy"
          onError={() => setFailedCount((count) => count + 1)}
        />
      ) : (
        <div className="image-fallback">
          <span>PIXO</span>
          <strong>{product.name}</strong>
          <small>Ảnh sản phẩm sẽ cập nhật</small>
        </div>
      )}
      <span className="product-badge">{product.badge}</span>
    </div>
  );
}

// Nhãn tồn kho trên thẻ sản phẩm. product.stock: "in" (còn hàng) | "out" (hết hàng) | "preorder" (đặt trước)
const stockLabels = { in: "Còn hàng", out: "Hết hàng", preorder: "Đặt trước" };

function StockLabel({ product, fallback }) {
  const label = stockLabels[product.stock];
  return (
    <span className={label ? `availability stock-${product.stock}` : "availability"}>
      ● {label ?? fallback}
    </span>
  );
}

function ConsoleCard({ product, onSelect }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [editionIndex, setEditionIndex] = useState(0);

  const variant = product.variants?.[variantIndex];
  const edition = product.editions ? product.editions[editionIndex] : null;
  const surcharge = edition ? edition.surcharge : 0;
  // Phiên bản kèm game / đặc biệt: không chia gói, giá "Liên hệ"
  const contact = Boolean(edition?.contactPrice || product.contactPrice);
  const original = contact ? null : variant.original + surcharge;
  const price = contact ? null : variant.price + surcharge;
  const saving = contact ? null : original - price;

  return (
    <article className="product-card console-card">
      <button
        className="product-image-button"
        onClick={() => onSelect(product, variantIndex, editionIndex)}
      >
        <ProductImage key={editionIndex} product={product} edition={edition} />
      </button>

      <div className="product-info">
        <div className="product-condition">
          <span>NINTENDO SWITCH</span>
          <StockLabel product={product} fallback="Hỏi tình trạng" />
        </div>

        <button
          className="product-title"
          onClick={() => onSelect(product, variantIndex, editionIndex)}
        >
          {product.name}
        </button>

        <p>{product.description}</p>

        {product.editions && (
          <>
            <label className="variant-label" htmlFor={`edition-${product.id}`}>
              CHỌN MÀU / PHIÊN BẢN MÁY
            </label>
            <select
              id={`edition-${product.id}`}
              className="variant-select"
              value={editionIndex}
              onChange={(event) => setEditionIndex(Number(event.target.value))}
            >
              {product.editions.map((item, index) => (
                <option key={item.name} value={index}>
                  {item.name}{item.surcharge ? ` (+${money(item.surcharge)})` : ""}
                </option>
              ))}
            </select>
          </>
        )}

        {!contact && (
          <>
            <label className="variant-label" htmlFor={`variant-${product.id}`}>
              {product.variantLabel ?? "CHỌN GÓI BỘ NHỚ"}
            </label>
            <select
              id={`variant-${product.id}`}
              className="variant-select"
              value={variantIndex}
              onChange={(event) => setVariantIndex(Number(event.target.value))}
            >
              {product.variants.map((item, index) => (
                <option key={item.name} value={index}>{item.name}</option>
              ))}
            </select>
          </>
        )}

        {contact ? (
          <div className="price-block">
            <strong className="sale-price">{money(null)}</strong>
          </div>
        ) : (
          <div className="price-block">
            <span className="original-price">{money(original)}</span>
            <strong className="sale-price">{money(price)}</strong>
            <span className="saving-label">Tiết kiệm {money(saving)}</span>
          </div>
        )}

        <button
          className="product-link"
          onClick={() => onSelect(product, variantIndex, editionIndex)}
        >
          Xem chi tiết <span>↗</span>
        </button>
      </div>
    </article>
  );
}

function OtherProductCard({ product, onSelect }) {
  const [editionIndex, setEditionIndex] = useState(0);
  const edition = product.editions ? product.editions[editionIndex] : null;

  return (
    <article className="product-card">
      <button className="product-image-button" onClick={() => onSelect(product, 0, editionIndex)}>
        <ProductImage key={editionIndex} product={product} edition={edition} />
      </button>

      <div className="product-info">
        <div className="product-condition">
          <span>{product.category.toUpperCase()}</span>
          <StockLabel product={product} fallback="Liên hệ xác nhận" />
        </div>

        <button className="product-title" onClick={() => onSelect(product)}>
          {product.name}
        </button>

        <p>{product.description}</p>

        {product.editions && (
          <>
            <label className="variant-label" htmlFor={`edition-${product.id}`}>
              {product.editionLabel ?? "CHỌN PHIÊN BẢN"}
            </label>
            <select
              id={`edition-${product.id}`}
              className="variant-select"
              value={editionIndex}
              onChange={(event) => setEditionIndex(Number(event.target.value))}
            >
              {product.editions.map((item, index) => (
                <option key={item.name} value={index}>{item.name}</option>
              ))}
            </select>
          </>
        )}

        <div className="price-block">
          <strong className="sale-price">
            {money(product.price == null ? null : product.price + (edition ? edition.surcharge : 0))}{product.unit && <small> / {product.unit}</small>}
          </strong>
          {!product.confirmedPrice && product.price != null && <span className="saving-label">Giá tham khảo</span>}
        </div>

        <button className="product-link" onClick={() => onSelect(product, 0, editionIndex)}>
          Xem chi tiết <span>↗</span>
        </button>
      </div>
    </article>
  );
}

// Sản phẩm gợi ý ở cuối trang chi tiết: cùng danh mục trước, sau đó là các sản phẩm khác
function relatedProducts(product) {
  const all = [...consoles, ...otherProducts];
  const tcg = ["pokemon", "riftbound"];
  const isSameGroup = (item) =>
    item.category === product.category ||
    (tcg.includes(item.category) && tcg.includes(product.category));
  const sameCategory = otherProducts.filter((item) => isSameGroup(item) && item.id !== product.id);
  const others = all.filter((item) => item.id !== product.id && !sameCategory.includes(item));
  return [...sameCategory, ...others].slice(0, 4);
}

// Ảnh đại diện cho thẻ gợi ý: phiên bản đầu tiên có ảnh riêng (nếu sản phẩm chưa có ảnh chung)
function coverEdition(item) {
  return item.editions?.find((edition) => edition.image) ?? null;
}

function startingPrice(item) {
  return item.variants ? item.variants[0].price : item.price;
}

// TRẢ GÓP QUA THẺ TÍN DỤNG (mPOS). Kỳ hạn Pixo áp dụng: 3 / 6 / 9 / 12 tháng (xác nhận 24/10/2026).
const installmentTerms = [3, 6, 9, 12];
// Chỉ hiện công cụ cho sản phẩm từ mức giá này (máy chơi game, box TCG lớn)
const INSTALLMENT_MIN_PRICE = 3000000;
// Logo hãng thẻ lấy từ mpos.vn, logo ngân hàng từ nextpay.vn (public/payment)
const cardNetworks = [
  { name: "Visa", logo: "/payment/card-visa.svg" },
  { name: "Mastercard", logo: "/payment/card-master.svg" },
  { name: "JCB", logo: "/payment/card-jcb.svg" },
  { name: "UnionPay", logo: "/payment/card-union.svg" },
];
// Phí chuyển đổi trả góp THAM KHẢO (%), theo kỳ hạn [3, 6, 9, 12] tháng; null = ngân hàng không hỗ trợ kỳ đó.
// Nguồn: bảng phí mPOS công khai tại thanhnamstudio.vn/tinh-phi-chuyen-doi (cập nhật 14/09/2026).
// Phí thật theo hợp đồng mPOS của Pixo: lấy trong app mPOS.vn rồi sửa các con số dưới đây.
// MSB đã cộng phí quản lý 3% (kỳ 3, 9, 12); FE Credit đã cộng phí quản lý 2,99% + VAT (kỳ 9, 12).
const installmentBanks = [
  { name: "Vietcombank", logo: "vcb.svg", fees: [2.9, 3.9, 4.9, 6.9] },
  { name: "Techcombank", logo: "tcb.svg", fees: [2.0, 3.9, 4.9, 6.9] },
  { name: "VPBank", logo: "vpb.png", fees: [2.9, 3.9, 7.9, 8.9] },
  { name: "Sacombank", logo: "stb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "MB Bank", logo: "mb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "TPBank", logo: "tpb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "VIB", logo: "vib.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "ACB", logo: "acb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "BIDV", logo: "bidv.png", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "VietinBank", logo: "icb.svg", fees: [2.0, 3.9, 4.9, 6.9] },
  { name: "HDBank", logo: "hdb.svg", fees: [2.9, 3.9, 4.9, 5.9] },
  { name: "SHB", logo: "shb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "MSB", logo: "msb.svg", fees: [5.0, 3.9, 7.9, 8.9] },
  { name: "OCB", logo: "ocb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "SeABank", logo: "sea.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "Eximbank", logo: "exb.svg", fees: [2.0, 3.9, 4.9, 6.9] },
  { name: "LPBank", logo: "lvpb.png", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "PVcomBank", logo: "pvb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "Kienlongbank", logo: "klb.png", fees: [2.0, 3.9, 4.9, 6.9] },
  { name: "BVBank (Bản Việt)", logo: "vccb.png", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "Shinhan Bank", logo: "shihanbank.svg", fees: [null, 3.9, 4.9, 5.9] },
  { name: "HSBC", logo: "hsbc.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "Citibank", logo: "ctb.svg", fees: [2.0, 3.9, 4.9, 5.9] },
  { name: "FE Credit", logo: "fec.svg", fees: [null, null, 8.19, 9.19] },
  { name: "Home Credit", logo: "homec.svg", fees: [2.9, 3.9, 5.9, 6.9] },
  { name: "Mcredit", logo: "mcredit.png", fees: [2.0, 3.9, 4.9, null] },
  { name: "Ngân hàng khác", fees: null },
].map((bank) => ({ ...bank, logo: bank.logo && `/payment/bank-${bank.logo}` }));

// Phí (%) của ngân hàng cho kỳ hạn; undefined = chưa có biểu phí (ngân hàng khác), null = không hỗ trợ kỳ này
function bankFee(bank, term) {
  if (!bank.fees) return undefined;
  return bank.fees[installmentTerms.indexOf(term)];
}

function InstallmentCalculator({ price, onContact, onMessenger }) {
  const [bankName, setBankName] = useState(installmentBanks[0].name);
  const [term, setTerm] = useState(6);

  const bank = installmentBanks.find((item) => item.name === bankName);
  const fee = bankFee(bank, term);
  // Phí chuyển đổi cộng vào tổng tiền; làm tròn lên hàng nghìn để khách không thiếu tiền kỳ cuối
  const feeAmount = fee ? Math.round((price * fee) / 100) : 0;
  const total = price + feeAmount;
  const monthly = Math.ceil(total / term / 1000) * 1000;

  const chooseBank = (item) => {
    setBankName(item.name);
    // Ngân hàng không có kỳ đang chọn: chuyển sang kỳ gần nhất ngân hàng có hỗ trợ
    if (bankFee(item, term) === null) {
      const available = installmentTerms.filter((option) => bankFee(item, option) !== null);
      setTerm(available.reduce((best, option) => (Math.abs(option - term) < Math.abs(best - term) ? option : best)));
    }
  };

  const plan =
    `Mình muốn trả góp qua thẻ tín dụng ${bank.name}, kỳ hạn ${term} tháng ` +
    `(web tạm tính khoảng ${money(monthly)}/tháng${fee ? `, tổng ${money(total)}` : ""}).`;

  return (
    <section className="detail-section installment" id="tra-gop">
      <div className="installment-head">
        <span className="eyebrow">TRẢ GÓP QUA THẺ TÍN DỤNG</span>
        <h2>Tự tính trả góp</h2>
        <p>Chọn ngân hàng phát hành thẻ và kỳ hạn để xem số tiền trả mỗi tháng.</p>
      </div>

      <div className="installment-grid">
        <div className="installment-form">
          <span className="variant-label">CHẤP NHẬN THẺ TÍN DỤNG</span>
          <div className="card-strip">
            {cardNetworks.map((item) => (
              <Picture key={item.name} src={item.logo} alt={item.name} title={item.name} />
            ))}
          </div>

          <span className="variant-label">NGÂN HÀNG PHÁT HÀNH THẺ: <b>{bank.name}</b></span>
          <div className="bank-grid">
            {installmentBanks.map((item) => (
              <button
                key={item.name}
                className={bankName === item.name ? "active" : ""}
                onClick={() => chooseBank(item)}
                aria-label={item.name}
                title={item.name}
              >
                {item.logo ? <Picture src={item.logo} alt="" loading="lazy" /> : <span>{item.name}</span>}
              </button>
            ))}
          </div>

          <span className="variant-label">KỲ HẠN</span>
          <div className="installment-options">
            {installmentTerms.map((item) => {
              const supported = bankFee(bank, item) !== null;
              return (
                <button
                  key={item}
                  className={term === item ? "active" : ""}
                  onClick={() => setTerm(item)}
                  disabled={!supported}
                  title={supported ? undefined : `${bank.name} không hỗ trợ kỳ ${item} tháng`}
                >
                  {item} tháng
                </button>
              );
            })}
          </div>
        </div>

        <div className="installment-result">
          <span>Trả mỗi tháng (tạm tính)</span>
          <strong>{money(monthly)}</strong>
          <dl>
            <div><dt>Giá sản phẩm</dt><dd>{money(price)}</dd></div>
            <div>
              <dt>Phí chuyển đổi{fee ? ` (${String(fee).replace(".", ",")}%)` : ""}</dt>
              <dd>{fee ? money(feeAmount) : "Pixo báo khi làm thủ tục"}</dd>
            </div>
            {fee ? <div><dt>Tổng thanh toán</dt><dd>{money(total)}</dd></div> : null}
            <div><dt>Kỳ hạn</dt><dd>{term} tháng</dd></div>
            <div><dt>Trả trước</dt><dd>0₫</dd></div>
          </dl>
          <p>
            Phí chuyển đổi là mức tham khảo theo biểu phí trả góp mPOS của từng ngân hàng, có thể thay
            đổi theo chương trình. Pixo xác nhận điều kiện thẻ và số tiền chính xác khi làm thủ tục.
          </p>
          <div className="installment-cta">
            <div>
              <h3>Tính xong rồi?</h3>
              <p>Liên hệ Pixo để làm thủ tục trả góp ngay. Tin nhắn đã ghi sẵn phương án bạn vừa chọn.</p>
            </div>
            <div className="detail-actions">
              <button className="primary-button" onClick={() => onMessenger(plan)}>
                Làm thủ tục qua Messenger
              </button>
              <button className="outline-button zalo-outline" onClick={() => onContact(plan)}>
                Qua Zalo
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function ProductDetail({
  product,
  initialVariant = 0,
  initialEdition = 0,
  onBack,
  onSelect,
}) {
  const hasVariants = Array.isArray(product.variants);
  const [variantIndex, setVariantIndex] = useState(initialVariant);
  const [editionIndex, setEditionIndex] = useState(initialEdition);

  const variant = hasVariants ? product.variants[variantIndex] : null;
  const edition = product.editions ? product.editions[editionIndex] : null;
  const surcharge = edition ? edition.surcharge : 0;
  const contact = Boolean(edition?.contactPrice || product.contactPrice);
  const basePrice = contact ? null : variant ? variant.price : product.price;
  const price = basePrice == null ? null : basePrice + surcharge;
  const canInstall = price != null && price >= INSTALLMENT_MIN_PRICE;

  // Đo lường: một lượt xem sản phẩm mỗi lần mở trang chi tiết
  useEffect(() => trackProductView(product, price), [product.id]);
  const original = variant && !contact ? variant.original + surcharge : null;

  // Các ảnh của phiên bản đang chọn (hoặc của sản phẩm nếu không có phiên bản): ảnh chính trước, ảnh thực tế (gallery) sau
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = edition?.image
    ? [edition.image, ...(edition.gallery ?? [])]
    : product.gallery
      ? [product.image, ...product.gallery]
      : [];
  const shownEdition = photos.length ? { ...edition, image: photos[photoIndex] } : edition;

  const chooseEdition = (index) => {
    setEditionIndex(index);
    setPhotoIndex(0);
    // Cập nhật link theo phiên bản đang chọn (không tạo thêm bước "Quay lại")
    window.history.replaceState(null, "", productPath(product, index));
  };

  // Sao chép tin nhắn trước rồi mới mở Zalo/Messenger: tab mới làm trang mất focus và trình duyệt sẽ chặn sao chép
  // extra: câu bổ sung (VD: phương án trả góp khách vừa tính)
  const askToBuy = async (url, appName, extra = "") => {
    const editionText = edition
      ? `, ${product.editionNoun ?? "màu/phiên bản"} ${edition.name}`
      : "";
    const variantText = variant && !contact ? `, gói bộ nhớ/tình trạng ${variant.name}` : "";
    const message =
      `Chào Pixo Station! Mình muốn hỏi mua ${product.name}` +
      `${editionText}${variantText}. ${price == null ? "Shop báo giá giúp mình nhé." : `Giá hiển thị: ${money(price)}.`} ` +
      `${extra ? `${extra} ` : ""}Shop tư vấn giúp mình nhé!\n${window.location.href}`;

    const copying = navigator.clipboard
      ? navigator.clipboard.writeText(message)
      : Promise.reject(new Error("Clipboard không khả dụng"));

    trackContact(appName, product.name);
    window.location.assign(url);

    try {
      await copying;
      alert(`Đã sao chép tin nhắn! Hãy dán vào ${appName} để gửi.`);
    } catch {
      alert(`Bạn hãy gửi tin nhắn này cho Pixo Station:\n\n${message}`);
    }
  };

  return (
    <main className="detail-page page-width">
      <button className="back-button" onClick={onBack}>
        ← Quay lại sản phẩm
      </button>

      <div className="detail-grid">
        <div className="detail-media">
          <ProductImage
            sizes="(max-width: 720px) 100vw, 640px"
            key={`${editionIndex}-${photoIndex}`}
            product={product}
            edition={shownEdition}
          />

          {photos.length > 1 && (
            <div className="detail-thumbs">
              {photos.map((photo, index) => (
                <button
                  key={photo}
                  className={index === photoIndex ? "active" : ""}
                  onClick={() => setPhotoIndex(index)}
                  aria-label={`Xem ảnh ${index + 1}`}
                >
                  <Picture src={photo} sizes="96px" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-copy">
          <span className="eyebrow">PIXO STATION</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          {product.editions && product.editionPicker === "images" && (
            <>
              <span className="variant-label">
                {product.editionLabel ?? "CHỌN PHIÊN BẢN"}: <b>{edition.name}</b>
              </span>
              <div className="edition-tiles">
                {product.editions.map((item, index) => (
                  <button
                    key={item.name}
                    className={index === editionIndex ? "active" : ""}
                    onClick={() => chooseEdition(index)}
                    aria-label={item.name}
                    title={item.name}
                  >
                    <Picture src={item.image} sizes="96px" alt="" />
                    <span>{item.shortName ?? item.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {product.editions && product.editionPicker !== "images" && (
            <>
              <label className="variant-label" htmlFor="detail-edition">
                {product.editionLabel ?? "CHỌN MÀU / PHIÊN BẢN MÁY"}
              </label>
              <select
                id="detail-edition"
                className="variant-select"
                value={editionIndex}
                onChange={(event) => chooseEdition(Number(event.target.value))}
              >
                {product.editions.map((item, index) => (
                  <option key={item.name} value={index}>
                    {item.name}{item.surcharge ? ` (+${money(item.surcharge)})` : ""}
                  </option>
                ))}
              </select>
            </>
          )}

          {hasVariants && !contact && (
            <>
              <label className="variant-label" htmlFor="detail-variant">
                {product.variantLabel ?? "CHỌN GÓI BỘ NHỚ / TÌNH TRẠNG"}
              </label>
              <select
                id="detail-variant"
                className="variant-select"
                value={variantIndex}
                onChange={(event) => setVariantIndex(Number(event.target.value))}
              >
                {product.variants.map((item, index) => (
                  <option key={item.name} value={index}>{item.name}</option>
                ))}
              </select>
            </>
          )}

          {original && (
            <span className="original-price detail-original">{money(original)}</span>
          )}
          <strong className="detail-price">{money(price)}{product.unit && <small> / {product.unit}</small>}</strong>
          {original && (
            <span className="saving-label">
              Tiết kiệm {money(original - price)}
            </span>
          )}

          <div className="detail-actions">
            <button className="primary-button" onClick={() => askToBuy(CONTACT_URL, "Messenger")}>
              Nhắn tin mua hàng
            </button>
            <button className="outline-button zalo-outline" onClick={() => askToBuy(ZALO_URL, "Zalo")}>
              Hỏi qua Zalo
            </button>
            {canInstall && (
              <button
                className="primary-button installment-button"
                onClick={() => document.getElementById("tra-gop")?.scrollIntoView({ behavior: "smooth" })}
              >
                Trả góp
              </button>
            )}
          </div>

          {product.perks ? (
            <ul className="detail-perks">
              {product.perks.map((perk) => (
                <li key={perk}>✓ {perk}</li>
              ))}
            </ul>
          ) : (
            <div className="demo-notice">
              Vui lòng liên hệ Pixo để xác nhận giá, tình trạng, phụ kiện đi kèm
              và chính sách bảo hành trước khi mua.
            </div>
          )}
        </div>
      </div>

      {product.specs && (
        <section className="detail-section">
          <h2>Thông tin sản phẩm</h2>
          <dl className="spec-list">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          {product.notes && (
            <ul className="detail-notes">
              {product.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {canInstall && (
        <InstallmentCalculator
          price={price}
          onContact={(plan) => askToBuy(ZALO_URL, "Zalo", plan)}
          onMessenger={(plan) => askToBuy(CONTACT_URL, "Messenger", plan)}
        />
      )}

      <section className="detail-section">
        <h2>Có thể bạn cũng thích</h2>
        <div className="bestseller-grid">
          {relatedProducts(product).map((item) => (
            <article className="bestseller-card" key={item.id}>
              <button className="bestseller-image" onClick={() => onSelect(item)}>
                <ProductImage product={item} edition={coverEdition(item)} />
              </button>
              <div className="bestseller-info">
                <h3>{item.name}</h3>
                <p>
                  {item.variants || item.editions?.some((edition) => edition.surcharge) ? "Từ " : ""}
                  <strong>{money(startingPrice(item))}</strong>
                  {item.unit && ` / ${item.unit}`}
                </p>
                <button className="primary-button" onClick={() => onSelect(item)}>
                  Xem sản phẩm
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

// TIN TỨC: thẻ bài, trang danh sách, trang chi tiết
function formatDate(date) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

function NewsCover({ post }) {
  return (
    <div className={post.cover ? "news-cover" : "news-cover news-cover-text"}>
      {post.cover ? <Picture src={post.cover} alt="" loading="lazy" /> : <span>{newsCategories[post.category]}</span>}
      {post.status === "draft" && <b className="news-draft">BẢN NHÁP</b>}
      {isScheduled(post) && <b className="news-draft news-scheduled">HẸN ĐĂNG {post.publishAt.slice(11)} {formatDate(post.publishAt.slice(0, 10))}</b>}
    </div>
  );
}

function NewsCard({ post, onOpen }) {
  return (
    <article className="news-card">
      <button className="news-card-link" onClick={() => onOpen(post)}>
        <NewsCover post={post} />
        <div className="news-card-body">
          <span className="news-meta">{newsCategories[post.category]} · {formatDate(post.date)}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <span className="news-more">Đọc tiếp →</span>
        </div>
      </button>
    </article>
  );
}

function NewsList({ onOpen, onBack }) {
  return (
    <main className="news-page page-width">
      <button className="back-button" onClick={onBack}>← Về trang chủ</button>
      <span className="eyebrow">TIN TỨC & SỰ KIỆN</span>
      <h1 className="news-page-title">Tin tức gaming & TCG</h1>
      <div className="news-grid">
        {visibleNews.map((post) => <NewsCard key={post.slug} post={post} onOpen={onOpen} />)}
      </div>
    </main>
  );
}

function NewsPost({ post, onOpen, onBack }) {
  const others = visibleNews.filter((item) => item.slug !== post.slug).slice(0, 3);
  return (
    <main className="news-page page-width">
      <button className="back-button" onClick={onBack}>← Tất cả tin tức</button>
      <article className="news-article">
        <span className="news-meta">{newsCategories[post.category]} · {formatDate(post.date)}</span>
        <h1>{post.title}</h1>
        <NewsCover post={post} />
        {post.coverCredit && <p className="news-credit">{post.coverCredit}</p>}
        {post.body.map((block) =>
          typeof block === "string" ? (
            <p key={block.slice(0, 40)}>{block}</p>
          ) : (
            <figure className="news-figure" key={block.image}>
              <Picture src={block.image} alt={block.caption ?? ""} loading="lazy" />
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          )
        )}
        {post.cta && (
          <a
            className="primary-button news-cta"
            href={post.cta.href}
            {...(post.cta.href.startsWith("http") ? { rel: "noreferrer" } : {})}
          >
            {post.cta.label} ↗
          </a>
        )}
        {post.sources?.length > 0 && (
          <div className="news-sources">
            <b>Nguồn tham khảo:</b>
            {post.sources.map((source) => (
              <a key={source.url} href={source.url} rel="noreferrer nofollow">{source.name} ↗</a>
            ))}
          </div>
        )}
      </article>
      {others.length > 0 && (
        <section className="detail-section">
          <h2>Tin khác</h2>
          <div className="news-grid">
            {others.map((item) => <NewsCard key={item.slug} post={item} onOpen={onOpen} />)}
          </div>
        </section>
      )}
    </main>
  );
}

// Đọc link hiện tại: /tin-tuc (danh sách) hoặc /tin-tuc/<slug> (bài viết)
function newsFromLocation() {
  const match = window.location.pathname.match(/^\/tin-tuc(?:\/([^/]+))?\/?$/);
  if (!match) return null;
  if (!match[1]) return { list: true };
  const post = visibleNews.find((item) => item.slug === match[1]);
  return post ? { post } : { list: true };
}

// LINK RIÊNG CHO TỪNG SẢN PHẨM: /san-pham/<slug>?pb=<số thứ tự phiên bản>&gb=<số thứ tự gói>
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const allProducts = [...consoles, ...otherProducts];

function productPath(product, editionIndex = 0, variantIndex = 0) {
  const params = new URLSearchParams();
  if (editionIndex) params.set("pb", editionIndex);
  if (variantIndex) params.set("gb", variantIndex);
  const query = params.toString();
  return `/san-pham/${slugify(product.name)}${query ? `?${query}` : ""}`;
}

// Đọc link hiện tại để biết đang xem sản phẩm nào (null = trang chủ)
function selectionFromLocation() {
  const match = window.location.pathname.match(/^\/san-pham\/([^/]+)\/?$/);
  if (!match) return null;
  const product = allProducts.find((item) => slugify(item.name) === match[1]);
  if (!product) return null;
  const params = new URLSearchParams(window.location.search);
  const editionIndex = Number(params.get("pb")) || 0;
  const variantIndex = Number(params.get("gb")) || 0;
  const validEdition = product.editions && editionIndex < product.editions.length ? editionIndex : 0;
  const validVariant = product.variants && variantIndex < product.variants.length ? variantIndex : 0;
  return { product, variantIndex: validVariant, editionIndex: validEdition };
}

// Tìm theo tên, mô tả và tên màu/phiên bản (gõ "zelda" ra cả máy bản Zelda)
function matchesSearch(product, search) {
  const query = slugify(search);
  if (!query) return true;
  const text = [product.name, product.description, ...(product.editions ?? []).map((item) => item.name)].join(" ");
  return slugify(text).includes(query);
}

// ===== SEO =====
const DEFAULT_DESCRIPTION =
  "Pixo Station – cửa hàng Nintendo Switch, Switch 2, băng game và Pokémon TCG, Riftbound tại 23 Lê Đại Hành, Hà Nội. Bảo hành 6 tháng, trả góp 0đ, thu cũ đổi mới.";

const pageDescriptions = {
  products: "Máy Nintendo Switch, Switch 2, băng game, Pokémon TCG và Riftbound tại Pixo Station Hà Nội. Giá rõ ràng, bảo hành 6 tháng, trả góp qua thẻ tín dụng.",
  compare: "So sánh Nintendo Switch Lite, V2, OLED và Switch 2: màn hình, pin, bộ nhớ, chơi trên TV. Chọn đúng máy theo nhu cầu cùng Pixo Station.",
  tradein: "Thu cũ đổi mới Nintendo Switch tại Pixo Station Hà Nội: chọn máy và tình trạng, gửi ảnh để nhận giá thu, trừ thẳng khi lên đời.",
  tcg: "Pokémon TCG, Riftbound và Pixo Nexus Night 19:00 thứ 4 hằng tuần tại Pixo Station, 23 Lê Đại Hành, Hà Nội.",
};

function pageDescription({ selected, newsView, page }) {
  if (selected) {
    const product = selected.product;
    if (product.seoDescription) return product.seoDescription;
    return `${product.name} tại Pixo Station Hà Nội. ${product.description ?? ""}`.trim().slice(0, 300);
  }
  if (newsView?.post) return newsView.post.excerpt ?? DEFAULT_DESCRIPTION;
  return pageDescriptions[page] ?? DEFAULT_DESCRIPTION;
}

function lowestPrice(product) {
  return product.variants ? Math.min(...product.variants.map((variant) => variant.price)) : product.price;
}

function pageTitle({ selected, newsView, page }) {
  const extraTitles = {
    products: "Mua máy Nintendo Switch, Switch 2, băng game, Pokémon TCG, Riftbound tại Hà Nội",
    tcg: "Pokémon TCG & Riftbound tại Hà Nội – Booster box, ETB, Nexus Night",
    compare: "So sánh máy Nintendo Switch",
    tradein: "Thu cũ đổi mới",
  };
  if (selected) {
    const product = selected.product;
    if (product.seoTitle) return `${product.seoTitle.replace("{price}", money(lowestPrice(product)))} | Pixo Station`;
    return `${product.name} – Mua tại Hà Nội | Pixo Station`;
  }
  if (newsView?.post) return `${newsView.post.title} – Pixo Station`;
  if (newsView) return "Tin tức – Pixo Station";
  if (extraTitles[page]) return `${extraTitles[page]} – Pixo Station`;
  if (page === "home") return "Pixo Station – Mua Nintendo Switch, Switch 2, Pokémon TCG, Riftbound tại Hà Nội";
  if (page !== "home") return `${navSections.find((section) => section.id === page)?.label} – Pixo Station`;
  return SITE_TITLE;
}

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "description";
    document.head.appendChild(tag);
  }
  tag.content = content;
}

// Dữ liệu sản phẩm (schema.org) để Google hiện tên, giá, ảnh sản phẩm trong kết quả tìm kiếm
function setProductSchema(product) {
  document.getElementById("product-schema")?.remove();
  if (!product) return;
  const price = product.variants ? Math.min(...product.variants.map((variant) => variant.price)) : product.price;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: new URL(product.image, window.location.origin).href,
    description: product.description,
    brand: { "@type": "Brand", name: product.category === "pokemon" ? "Pokémon" : product.category === "riftbound" ? "Riftbound" : "Nintendo" },
    ...(price && !product.contactPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "VND",
            price,
            url: window.location.href,
            seller: { "@type": "Organization", name: "Pixo Station" },
          },
        }
      : {}),
  };
  const script = document.createElement("script");
  script.id = "product-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

const SITE_TITLE = "Pixo Station – Trạm Game của thế hệ bạn";

function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [pokemonType, setPokemonType] = useState("all");

  // Ở mục "Tất cả" (không tìm kiếm) chỉ hiện ô giới thiệu Pokémon thay vì cả 64 sản phẩm
  const collapsePokemon = category === "all" && !search.trim();
  const [selected, setSelected] = useState(selectionFromLocation);
  const [newsView, setNewsView] = useState(newsFromLocation);
  const [page, setPage] = useState(pageFromLocation);

  // Nút Quay lại / Tiến tới của trình duyệt
  useEffect(() => {
    const onPopState = () => {
      setSelected(selectionFromLocation());
      setNewsView(newsFromLocation());
      setPage(pageFromLocation());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Tiêu đề tab + mô tả trang (SEO) theo trang đang xem
  useEffect(() => {
    document.title = pageTitle({ selected, newsView, page });
    initAnalytics();
    trackPageView(document.title);
    setMetaDescription(pageDescription({ selected, newsView, page }));
    setProductSchema(selected?.product ?? null);
  }, [selected, newsView, page]);

  // Chuyển sang một trang (trang chủ, sản phẩm, TCG, chính sách...) và lên đầu trang
  const goPage = (id) => {
    const path = pagePaths[id] ?? "/";
    if (window.location.pathname !== path || window.location.search) {
      window.history.pushState(null, "", path);
    }
    setSelected(null);
    setNewsView(null);
    setPage(id);
    window.scrollTo({ top: 0 });
  };

  const openNews = (post) => {
    window.history.pushState(null, "", post ? `/tin-tuc/${post.slug}` : "/tin-tuc");
    setSelected(null);
    setNewsView(post ? { post } : { list: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleConsoles = useMemo(() => {
    return consoles
      .filter(() => category === "all" || category === "console")
      .filter((product) => matchesSearch(product, search))
      .sort((a, b) => {
        // Máy giá "Liên hệ" luôn xếp cuối
        if (sort === "low") return (a.variants?.[0].price ?? Infinity) - (b.variants?.[0].price ?? Infinity);
        if (sort === "high") return (b.variants?.[0].price ?? -Infinity) - (a.variants?.[0].price ?? -Infinity);
        return consoleOrder.indexOf(a.id) - consoleOrder.indexOf(b.id);
      });
  }, [category, search, sort]);

  const visibleOthers = useMemo(() => {
    return otherProducts
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => !(collapsePokemon && product.category === "pokemon"))
      .filter((product) =>
        category !== "pokemon" || pokemonType === "all" || product.type === pokemonType
      )
      .filter((product) => matchesSearch(product, search))
      .sort((a, b) => {
        // Sản phẩm chưa có giá luôn xếp cuối
        if (sort === "low") return (a.price ?? Infinity) - (b.price ?? Infinity);
        if (sort === "high") return (b.price ?? -Infinity) - (a.price ?? -Infinity);
        return a.id - b.id;
      });
  }, [category, search, sort, pokemonType, collapsePokemon]);

  const goHome = () => goPage("home");

  // Mục "Tin tức" dùng trang tin riêng, các mục khác là trang theo pagePaths
  const goSection = (id) => (id === "news" ? openNews(null) : goPage(id));

  const goShop = () => goPage("products");

  // Tìm từ ô tìm kiếm trên header: mở trang Sản phẩm với từ khóa đã gõ
  const searchProducts = (query) => {
    setSearch(query);
    setCategory("all");
    goShop();
  };

  const shopCategory = (id) => {
    setCategory(id);
    goShop();
  };

  // Bấm thẻ đặt trước / mới về: mở trang sản phẩm hoặc danh mục nếu có, không thì mở Zalo
  const openPreorder = (item) => {
    const product = allProducts.find((entry) => entry.name === item.productName);
    if (product) openProduct(product, 0, item.editionIndex ?? 0);
    else if (item.category) shopCategory(item.category);
    else window.location.assign(CONTACT_URL);
  };

  // Mở trang chi tiết sản phẩm ngay trong tab hiện tại
  const openProduct = (product, variantIndex = 0, editionIndex = 0) => {
    window.location.assign(productPath(product, editionIndex, variantIndex));
  };

  const current = selected ? "products" : newsView ? "news" : page;

  return (
    <>
      <Header current={current} onHome={goHome} onSection={goSection} onSearch={searchProducts} />

      <div className="floating-contact">
        <a
          href={CONTACT_URL}
         
          rel="noreferrer"
          aria-label="Nhắn tin cho Pixo Station qua Messenger"
        >
          💬 Nhắn Pixo
        </a>
        <a
          className="floating-zalo"
          href={ZALO_URL}
         
          rel="noreferrer"
          aria-label="Nhắn tin cho Pixo Station qua Zalo"
        >
          Zalo
        </a>
      </div>

      {selected ? (
        <ProductDetail
          key={selected.product.id}
          product={selected.product}
          initialVariant={selected.variantIndex}
          initialEdition={selected.editionIndex}
          onBack={goShop}
          onSelect={openProduct}
        />
      ) : newsView?.post ? (
        <NewsPost key={newsView.post.slug} post={newsView.post} onOpen={openNews} onBack={() => openNews(null)} />
      ) : newsView ? (
        <NewsList onOpen={openNews} onBack={goHome} />
      ) : (
        <>
          <main className={page === "home" ? "" : "single-page"}>
            {page === "home" && (<>
            <BannerSlider />

            <section className="trust-bar page-width" aria-label="Cam kết của Pixo">
              {trustBadges.map((badge) => (
                <div key={badge.title}>
                  <b>✓ {badge.title}</b>
                  <span>{badge.text}</span>
                </div>
              ))}
            </section>

            <section className="quick-categories page-width" aria-label="Danh mục">
              {quickCategories.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.section) {
                      goSection(item.section);
                    } else {
                      setCategory(item.category);
                      goShop();
                    }
                  }}
                >
                  <span className="quick-icon" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </section>

            <section className="bestsellers page-width">
              <div className="bestsellers-head">
                <h2>Máy bán chạy</h2>
                <div className="head-links">
                  <button className="text-link" onClick={() => goPage("compare")}>
                    So sánh máy
                  </button>
                  <button className="text-link" onClick={() => { setCategory("console"); goShop(); }}>
                    Xem tất cả máy →
                  </button>
                </div>
              </div>

              <div className="bestseller-grid">
                {bestsellers.map((item) => (
                  <article className="bestseller-card" key={item.title}>
                    <button
                      className="bestseller-image"
                      onClick={() => openProduct(item.product, 0, item.editionIndex)}
                    >
                      <ProductImage product={item.product} edition={item.edition} />
                    </button>
                    <div className="bestseller-info">
                      <h3>{item.title}</h3>
                      <p>Từ <strong>{money(item.price)}</strong></p>
                      <button
                        className="primary-button"
                        onClick={() => openProduct(item.product, 0, item.editionIndex)}
                      >
                        Xem máy
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ĐẶT TRƯỚC & HÀNG MỚI VỀ */}
            <section className="home-block page-width">
              <div className="bestsellers-head">
                <h2>Đặt trước & hàng mới về</h2>
                <button className="text-link" onClick={() => shopCategory("all")}>Xem tất cả →</button>
              </div>
              <div className="home-rail">
                {preorders.map((item) => (
                  <article className="rail-card" key={item.title}>
                    <button className="rail-image" onClick={() => openPreorder(item)}>
                      <Picture src={item.image} alt={item.title} loading="lazy" />
                      <span className={item.tag === "ĐẶT TRƯỚC" ? "rail-tag preorder" : "rail-tag"}>{item.tag}</span>
                    </button>
                    <div className="rail-info">
                      <h3>{item.title}</h3>
                      {item.price && <strong>{money(item.price)}</strong>}
                      <p>{item.note}</p>
                      <button className="text-link" onClick={() => openPreorder(item)}>
                        {item.productName ? "Xem sản phẩm →" : item.category ? "Xem tất cả →" : "Đặt trước qua Zalo →"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* DẢI POKÉMON TCG */}
            <section className="home-block page-width">
              <div className="bestsellers-head">
                <h2>Pokémon TCG</h2>
                <button className="text-link" onClick={() => shopCategory("pokemon")}>
                  Xem {pokemonProducts.length} sản phẩm →
                </button>
              </div>
              <div className="home-rail">
                {pokemonRail.map((item) => (
                  <article className="rail-card" key={item.id}>
                    <button className="rail-image contain" onClick={() => openProduct(item)}>
                      <Picture src={item.gallery?.[0] ?? item.image} alt={item.name} loading="lazy" />
                    </button>
                    <div className="rail-info">
                      <h3>{item.name}</h3>
                      <strong>{money(item.price)}</strong>
                      <button className="text-link" onClick={() => openProduct(item)}>Xem sản phẩm →</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* COMBO TIẾT KIỆM */}
            <section className="home-block page-width">
              <div className="bestsellers-head">
                <h2>Combo tiết kiệm</h2>
                <span className="head-note">Host trọn đời · Đủ phụ kiện</span>
              </div>
              <div className="combo-grid">
                {combos.map((combo) => (
                  <article className="combo-card" key={combo.name}>
                    <Picture src={combo.image} alt={combo.name} loading="lazy" />
                    <div className="combo-info">
                      <h3>{combo.name}</h3>
                      <p>{combo.items}</p>
                      <div className="combo-price">
                        <span className="original-price">{money(combo.original)}</span>
                        <strong>{money(combo.price)}</strong>
                      </div>
                      <a className="primary-button" href={CONTACT_URL} rel="noreferrer">
                        Nhắn tin hỏi combo
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* CỘNG ĐỒNG PIXO */}
            <section className="home-community">
              <div className="page-width community-inner">
                <div className="community-copy">
                  <span className="eyebrow">CỘNG ĐỒNG PIXO</span>
                  <h2>Không chỉ mua bán.<br /><span>Còn là nơi để chơi cùng nhau.</span></h2>
                  <p>
                    <b>Pixo Nexus Night</b>: giao lưu Riftbound lúc <b>19:00 thứ 4 hằng tuần</b>{" "}
                    tại showroom 23 Lê Đại Hành. Người mới cũng được chào đón.
                  </p>
                  <div className="contact-actions">
                    <a className="primary-button" href={CONTACT_URL} rel="noreferrer">
                      Nhắn tin đăng ký
                    </a>
                    <button className="outline-button" onClick={() => goPage("tcg")}>
                      Xem lịch & ảnh sự kiện
                    </button>
                  </div>
                </div>
                <div className="community-posters">
                  <Picture src="/home/nexus-night.jpg" alt="Poster Pixo Nexus Night" loading="lazy" />
                  <Picture src="/community/nexus-night-nhom.jpg" alt="Người chơi tại Pixo Nexus Night" loading="lazy" />
                </div>
              </div>
            </section>

            <section className="customers page-width">
              <div className="customers-head">
                <h2>Game thủ thật, máy thật</h2>
                <p>Một năm đồng hành cùng cộng đồng game thủ Hà Nội.</p>
              </div>
              {/* Dải ảnh chạy ngang: danh sách lặp 2 lần để chạy liền mạch */}
              <div className="customer-strip">
                <div className="customer-track">
                  {[...customerPhotos, ...customerPhotos].map((photo, index) => (
                    <figure key={`${photo.src}-${index}`} aria-hidden={index >= customerPhotos.length}>
                      <Picture src={photo.src} alt={`Khách hàng nhận ${photo.caption} tại Pixo Station`} loading="lazy" />
                      <figcaption>{photo.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>

            <GoogleReviews mapsUrl={SHOP.mapsUrl} />

            {/* THU CŨ ĐỔI MỚI & TRẢ GÓP */}
            <section className="home-block page-width offer-grid">
              <article className="offer-card">
                <span className="eyebrow">THU CŨ ĐỔI MỚI</span>
                <h3>Máy cũ vẫn đáng tiền.</h3>
                <p>
                  Chọn máy và tình trạng để xem khoảng giá thu, Pixo trừ thẳng
                  vào máy mới.
                </p>
                <button className="primary-button" onClick={() => goPage("tradein")}>
                  Định giá máy cũ
                </button>
              </article>
              <article className="offer-card offer-card-image">
                <Picture src="/home/tra-gop.jpg" alt="Mua trước trả sau, trả trước 0đ tại Pixo" loading="lazy" />
                <div>
                  <span className="eyebrow">TRẢ GÓP</span>
                  <h3>Trả trước 0đ.</h3>
                  <p>Trả góp qua thẻ tín dụng, thủ tục nhanh. Nhắn Pixo để chọn kỳ hạn.</p>
                  <a className="outline-button" href={CONTACT_URL} rel="noreferrer">
                    Tư vấn trả góp
                  </a>
                </div>
              </article>
            </section>
            </>)}

            {page === "products" && (
            <section className="catalog-section page-width" id="products">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">TẤT CẢ SẢN PHẨM</span>
                  <h2>Chọn món đồ <span>tiếp theo.</span></h2>
                </div>
                <p>
                  Giá máy hiển thị theo bảng giá Pixo cung cấp. Vui lòng xác
                  nhận tình trạng hàng trước khi mua.
                </p>
              </div>

              <div className="catalog-toolbar">
                <div className="category-filters">
                  {categories.map((item) => (
                    <button
                      key={item.id}
                      className={category === item.id ? "filter-chip active" : "filter-chip"}
                      onClick={() => setCategory(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="catalog-controls">
                  <label className="search-field">
                    <span>⌕</span>
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Tìm sản phẩm..."
                    />
                  </label>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label="Sắp xếp giá"
                  >
                    <option value="featured">Nổi bật</option>
                    <option value="low">Giá thấp đến cao</option>
                    <option value="high">Giá cao đến thấp</option>
                  </select>
                </div>
              </div>

              {category === "pokemon" && (
                <div className="subtype-filters">
                  {["all", ...pokemonTypes].map((type) => (
                    <button
                      key={type}
                      className={pokemonType === type ? "active" : ""}
                      onClick={() => setPokemonType(type)}
                    >
                      {type === "all" ? "Tất cả Pokémon" : type}
                    </button>
                  ))}
                </div>
              )}

              {category === "console" && (
                <button className="compare-hint" onClick={() => goPage("compare")}>
                  Phân vân Lite, V2, OLED hay Switch 2? <b>Xem bảng so sánh →</b>
                </button>
              )}

              <div className="result-line">
                <span>{visibleConsoles.length + visibleOthers.length} SẢN PHẨM</span>
              </div>

              {visibleConsoles.length + visibleOthers.length > 0 ? (
                <div className="product-grid">
                  {visibleConsoles.map((product) => (
                    <ConsoleCard key={product.id} product={product} onSelect={openProduct} />
                  ))}
                  {visibleOthers.map((product) => (
                    <OtherProductCard key={product.id} product={product} onSelect={openProduct} />
                  ))}
                  {collapsePokemon && (
                    // Cùng khung với thẻ sản phẩm thường, chỉ thay ảnh bằng ô ghép 4 ảnh
                    <article className="product-card">
                      <button className="product-image-button" onClick={() => setCategory("pokemon")}>
                        <div className="product-image pokemon-collage">
                          {pokemonProducts.slice(4, 8).map((item) => (
                            <Picture key={item.id} src={item.image} alt="" loading="lazy" />
                          ))}
                          <span className="product-badge">POKÉMON TCG</span>
                        </div>
                      </button>

                      <div className="product-info">
                        <div className="product-condition">
                          <span>POKEMON</span>
                          <span className="availability">● {pokemonProducts.length} sản phẩm</span>
                        </div>

                        <button className="product-title" onClick={() => setCategory("pokemon")}>
                          Pokémon TCG
                        </button>

                        <p>Booster Box, Elite Trainer Box, Booster Bundle, Pack, Tin, Collection và phụ kiện.</p>

                        <div className="price-block">
                          <strong className="sale-price">
                            <small>Từ </small>{money(Math.min(...pokemonProducts.map((item) => item.price)))}
                          </strong>
                        </div>

                        <button className="product-link" onClick={() => setCategory("pokemon")}>
                          Xem tất cả <span>↗</span>
                        </button>
                      </div>
                    </article>
                  )}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>Chưa tìm thấy sản phẩm</h3>
                  <p>Thử từ khóa hoặc danh mục khác.</p>
                  <button
                    className="primary-button"
                    onClick={() => { setSearch(""); setCategory("all"); }}
                  >
                    Xem tất cả
                  </button>
                </div>
              )}

              <p className="disclaimer">
                Giá băng game và phụ kiện hiện là giá tham khảo. Vui lòng
                liên hệ Pixo để nhận báo giá chính xác.
              </p>
            </section>
            )}

            {page === "home" && visibleNews.length > 0 && (
              <section className="news-home page-width" id="news">
                <div className="bestsellers-head">
                  <h2>Tin tức & sự kiện</h2>
                  <button className="text-link" onClick={() => openNews(null)}>Xem tất cả →</button>
                </div>
                <div className="news-grid">
                  {visibleNews.slice(0, 3).map((post) => <NewsCard key={post.slug} post={post} onOpen={openNews} />)}
                </div>
              </section>
            )}

            {/* SHOWROOM */}
            {page === "home" && (
              <section className="home-block page-width showroom-block">
                <Picture src="/home/showroom-trung-bay.jpg" alt="Máy và hộp TCG trưng bày tại showroom Pixo Station" loading="lazy" />
                <div>
                  <span className="eyebrow">SHOWROOM</span>
                  <h2>Ghé Pixo chơi thử máy</h2>
                  <ul>
                    <li><b>Địa chỉ</b>{SHOP.address}</li>
                    <li><b>Giờ mở cửa</b>{SHOP.hours}</li>
                    <li><b>Điện thoại / Zalo</b><a href={ZALO_URL} rel="noreferrer">{SHOP.phone} ↗</a></li>
                  </ul>
                  <div className="contact-actions">
                    <a className="primary-button" href={SHOP.mapsUrl} rel="noreferrer">Chỉ đường ↗</a>
                    <a className="outline-button" href={SHOP.phoneUrl}>Gọi ngay</a>
                  </div>
                </div>
              </section>
            )}

            {page === "tcg" && (
            <section className="tcg-section" id="tcg">
              <div className="page-width tcg-inner">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">TCG & CỘNG ĐỒNG</span>
                    <h2>TCG & <span>cộng đồng.</span></h2>
                  </div>
                  <p>
                    Không chỉ là những lá bài. Đó còn là chiến thuật, bộ sưu tập
                    và những người chơi cùng đam mê.
                  </p>
                </div>

                <div className="tcg-grid">
                  {/* Ảnh chụp thật tại Pixo thay cho ô chữ trang trí */}
                  <article className="tcg-card pokemon-card">
                    <button className="tcg-photo tcg-collage" onClick={() => shopCategory("pokemon")} aria-label="Xem Pokémon TCG">
                      {pokemonRail.slice(0, 4).map((item) => (
                        <Picture key={item.id} src={item.gallery?.[0] ?? item.image} alt={item.name} loading="lazy" />
                      ))}
                    </button>
                    <div className="tcg-card-info">
                      <span>TRADING CARD GAME</span>
                      <h3>Pokémon TCG</h3>
                      <p className="tcg-stats">
                        <b>{pokemonProducts.length} sản phẩm</b> · Từ {money(Math.min(...pokemonProducts.map((item) => item.price)))}
                      </p>
                      <p>Booster Box, Elite Trainer Box, Booster Bundle, Tin và hộp sưu tầm. Hàng nguyên seal, có sẵn tại showroom.</p>
                      <button onClick={() => shopCategory("pokemon")}>
                        Xem Pokémon TCG ↗
                      </button>
                    </div>
                  </article>

                  <article className="tcg-card riftbound-card">
                    <button className="tcg-photo" onClick={() => shopCategory("riftbound")} aria-label="Xem Riftbound">
                      <Picture src="/products/photos/riftbound-radiance-thuc-te.jpg" alt="Booster box Riftbound Radiance tại Pixo" loading="lazy" />
                    </button>
                    <div className="tcg-card-info">
                      <span>STRATEGY CARD GAME</span>
                      <h3>Riftbound</h3>
                      <p className="tcg-stats">
                        <b>Set 1 – 5</b> · Đang nhận đặt trước Radiance
                      </p>
                      <p>Booster box Riftbound: League of Legends TCG bản tiếng Anh, nguyên seal. Chơi cùng cộng đồng ở Nexus Night 19:00 thứ 4.</p>
                      <button onClick={() => shopCategory("riftbound")}>
                        Xem Riftbound ↗
                      </button>
                    </div>
                  </article>
                </div>

                <div className="community-heading">
                  <div>
                    <span className="eyebrow">SỰ KIỆN</span>
                    <h3>Chơi cùng cộng đồng.</h3>
                  </div>
                  <a href={CONTACT_URL} rel="noreferrer">
                    Theo dõi hoạt động ↗
                  </a>
                </div>

                <div className="nexus-feature">
                  <Picture
                    className="nexus-hero"
                    src="/community/nexus-night-nhom.jpg"
                    alt="Người chơi tham gia Pixo Nexus Night"
                    loading="lazy"
                  />
                  <div className="nexus-copy">
                    <span className="eyebrow">RIFTBOUND · 19:00 THỨ 4 HẰNG TUẦN</span>
                    <h3>Pixo Nexus Night</h3>
                    <p className="nexus-time">19:00 thứ 4 hằng tuần · {SHOP.address}</p>
                    <p>
                      Buổi giao lưu Riftbound diễn ra hằng tuần: đánh giao hữu, đổi
                      bài, mở pack cùng nhau và làm quen với cộng đồng người chơi
                      Hà Nội. Người mới cũng được chào đón.
                    </p>
                    <div className="contact-actions">
                      <a className="primary-button" href={CONTACT_URL} rel="noreferrer">
                        Nhắn tin hỏi lịch &amp; đăng ký
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nexus-gallery">
                  {nexusPhotos.map((photo) => (
                    <Picture key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
                  ))}
                </div>

                <div className="event-grid">
                  {events.filter((event) => event.title !== "Pixo Nexus Night").map((event) => (
                    <article className="event-card" key={event.title}>
                      <span>{event.tag}</span>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <a href={CONTACT_URL} rel="noreferrer">
                        Hỏi lịch hoạt động ↗
                      </a>
                    </article>
                  ))}
                </div>

                <p className="disclaimer">
                  Nexus Night diễn ra 19:00 thứ 4 hằng tuần. Nhắn Zalo để giữ chỗ và hỏi thể lệ tuần này.
                </p>
              </div>
            </section>
            )}

            {page === "services" && (
            <section className="services-section page-width" id="services">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">DỊCH VỤ KỸ THUẬT</span>
                  <h2>Máy có vấn đề?<br /><span>Để Pixo hỗ trợ.</span></h2>
                </div>
                <p>
                  Mô tả tình trạng máy để trao đổi phương án kiểm tra, sửa chữa
                  hoặc hỗ trợ phần mềm.
                </p>
              </div>

              <div className="service-grid">
                {services.map((service) => (
                  <article className="service-card" key={service.number}>
                    <div className="service-top">
                      <span>{service.number}</span><b>✳</b>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href={CONTACT_URL} rel="noreferrer">
                      Liên hệ tư vấn ↗
                    </a>
                  </article>
                ))}
              </div>

              <div className="service-cta">
                <div>
                  <span className="eyebrow">CẦN HỖ TRỢ?</span>
                  <h3>Hãy mô tả lỗi máy bạn đang gặp.</h3>
                </div>
                <a className="primary-button" href={CONTACT_URL} rel="noreferrer">
                  Trao đổi với Pixo ↗
                </a>
              </div>
            </section>
            )}

            {/* VỀ PIXO */}
            {page === "about" && (
            <section className="about-section" id="about">
              <div className="page-width">
                <div className="about-story">
                  <div className="section-intro">
                    <span className="eyebrow">VỀ PIXO</span>
                    <h2>Từ game thủ,<br /><span>cho game thủ.</span></h2>
                    <Picture
                      className="about-photo"
                      src="/community/showroom-quay.jpg"
                      alt="Quầy và khách hàng tại showroom Pixo Station"
                      loading="lazy"
                    />
                  </div>
                  <div className="about-copy">
                    <p>
                      Pixo Station là điểm đến dành cho thế hệ trẻ yêu công nghệ
                      và đam mê trải nghiệm game chất lượng. Tụi mình muốn ai mua
                      máy cũng được tư vấn như đang hỏi một người bạn chơi game lâu
                      năm, chứ không phải nghe một bài chào hàng.
                    </p>
                    <p>
                      Tiêu chí của Pixo rất rõ: <strong>chất lượng thật, giá trị
                      xứng đáng</strong>. Giúp bạn nâng tầm trải nghiệm chơi game
                      một cách thông minh và bền vững.
                    </p>
                    <p>
                      Ở Pixo, bạn không chỉ mua một chiếc máy. Bạn có người tư vấn
                      đúng nhu cầu, người hỗ trợ khi máy "dở chứng", và một cộng
                      đồng để rủ nhau đánh Pokémon TCG, Riftbound hay đơn giản là
                      ngồi tám chuyện game.
                    </p>
                  </div>
                </div>

                <div className="policy-grid">
                  {aboutValues.map((value) => (
                    <article className="policy-card" key={value.kicker}>
                      <span className="policy-kicker">{value.kicker}</span>
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </article>
                  ))}
                </div>

                <a className="policy-contact" href={CONTACT_URL} rel="noreferrer">
                  Ghé chơi hoặc nhắn Pixo một câu ↗
                </a>
              </div>
            </section>
            )}

            {/* CHÍNH SÁCH BÁN HÀNG */}
            {page === "policies" && (
            <section className="policies-section" id="policies">
              <div className="page-width policies-inner">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">CHÍNH SÁCH</span>
                    <h2>Chính sách <span>tại Pixo.</span></h2>
                  </div>
                  <p>
                    Thông tin rõ ràng để bạn yên tâm chọn thiết bị và bắt đầu
                    cuộc chơi.
                  </p>
                </div>

                <div className="policy-grid">
                  <article className="policy-card">
                    <span className="policy-icon">↻</span>
                    <span className="policy-kicker">01 / BẢO HÀNH</span>
                    <h3>Bảo hành 6 tháng</h3>
                    <p>
                      Máy chơi game được bảo hành 6 tháng. Liên hệ Pixo để biết
                      phạm vi và điều kiện bảo hành. Sản phẩm TCG không áp dụng
                      bảo hành.
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">⇄</span>
                    <span className="policy-kicker">02 / ĐỔI TRẢ</span>
                    <h3>Đổi 1–1 trong 7 ngày</h3>
                    <p>
                      Hỗ trợ đổi máy 1–1 trong 7 ngày theo chính sách áp dụng.
                      Liên hệ Pixo để được hướng dẫn điều kiện và quy trình
                      đổi máy.
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">⌁</span>
                    <span className="policy-kicker">03 / GIAO HÀNG</span>
                    <h3>Giao hỏa tốc trong 2 giờ</h3>
                    <p>
                      Áp dụng trong nội thành Hà Nội. Đơn đi tỉnh: Pixo sẽ báo
                      phí ship và thời gian giao dự kiến khi bạn chốt đơn.
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">₫</span>
                    <span className="policy-kicker">04 / THANH TOÁN</span>
                    <h3>Thanh toán linh hoạt</h3>
                    <p>
                      Chuyển khoản, tiền mặt tại cửa hàng hoặc thanh toán khi
                      nhận hàng (COD).
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">▤</span>
                    <span className="policy-kicker">05 / TRẢ GÓP</span>
                    <h3>Trả góp qua thẻ tín dụng</h3>
                    <p>
                      Hỗ trợ trả góp bằng thẻ tín dụng qua mPOS. Nhắn Pixo để
                      được tư vấn kỳ hạn phù hợp.
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">⟲</span>
                    <span className="policy-kicker">06 / THU CŨ ĐỔI MỚI</span>
                    <h3>Thu cũ đổi mới</h3>
                    <p>
                      Thu mua và đổi máy cũ lên đời. Gửi ảnh và tình trạng máy
                      để Pixo định giá.
                    </p>
                  </article>
                </div>

                <a className="policy-contact" href={CONTACT_URL} rel="noreferrer">
                  Hỏi Pixo về chính sách ↗
                </a>
              </div>
            </section>
            )}

            {page === "compare" && (
              <ComparePage
                consoles={consoles}
                onOpenProduct={(id) => openProduct(consoles.find((item) => item.id === id))}
                onShop={() => shopCategory("console")}
              />
            )}

            {page === "tradein" && <TradeInPage consoles={consoles} zaloUrl={ZALO_URL} messengerUrl={CONTACT_URL} />}

            {page === "faq" && (
            <section className="faq-section page-width" id="faq">
              <span className="eyebrow">HỎI ĐÁP</span>
              <h2>Câu hỏi thường gặp</h2>
              <div className="faq-list">
                {faqs.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
            )}

            {page === "contact" && (
            <section className="contact-section" id="contact">
              <div className="page-width contact-inner">
                <div className="contact-info">
                  <span className="eyebrow">LIÊN HỆ</span>
                  <h2>Ghé Pixo chơi thử máy</h2>
                  <ul>
                    <li><b>Địa chỉ</b>{SHOP.address}</li>
                    <li><b>Giờ mở cửa</b>{SHOP.hours}</li>
                    <li><b>Điện thoại / Zalo</b><a href={ZALO_URL} rel="noreferrer">{SHOP.phone} ↗</a></li>
                  </ul>
                  <div className="contact-actions">
                    <a className="primary-button" href={SHOP.mapsUrl} rel="noreferrer">
                      Chỉ đường ↗
                    </a>
                    <a className="outline-button" href={SHOP.phoneUrl}>
                      Gọi ngay
                    </a>
                  </div>
                </div>
                <iframe
                  className="contact-map"
                  title="Bản đồ Pixo Station"
                  src={SHOP.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
            )}
          </main>
        </>
      )}

      {/* Thanh menu dưới đáy, chỉ hiện trên điện thoại */}
      <nav className="bottom-nav" aria-label="Menu nhanh">
        <button className={current === "home" ? "active" : ""} onClick={goHome}>
          <span aria-hidden="true">⌂</span>Trang chủ
        </button>
        <button className={current === "products" ? "active" : ""} onClick={() => shopCategory("all")}>
          <span aria-hidden="true">▦</span>Sản phẩm
        </button>
        <a href={CONTACT_URL} rel="noreferrer">
          <span aria-hidden="true">💬</span>Messenger
        </a>
        <a href={ZALO_URL} rel="noreferrer">
          <span aria-hidden="true">Z</span>Zalo
        </a>
        <a href={SHOP.phoneUrl}>
          <span aria-hidden="true">☎</span>Gọi
        </a>
      </nav>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <button className="brand" onClick={goHome}>
            <img className="brand-logo" src="/logo-pixo.png" alt="Pixo Station" />
          </button>
          <div className="footer-contact">
            <span>{SHOP.address}</span>
            <span>{SHOP.hours}</span>
            <span>
              <a href={ZALO_URL} rel="noreferrer">☎ Điện thoại / Zalo {SHOP.phone} ↗</a>
            </span>
          </div>
          <div className="footer-links">
            <button onClick={() => goPage("compare")}>So sánh máy</button>
            <button onClick={() => goPage("tradein")}>Thu cũ đổi mới</button>
            <a href={SHOP.facebookUrl} rel="noreferrer">Facebook ↗</a>
            <a href={SHOP.mapsUrl} rel="noreferrer">Google Maps ↗</a>
          </div>
        </div>
        <div className="page-width footer-bottom">
          <span>© 2026 PIXO STATION</span>
          <span>MADE FOR PLAYERS.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
// Danh sách mọi đường dẫn của web, dùng để tạo sitemap.xml khi build (vite.config.js)
export function listSitePaths() {
  const publishedNews = visibleNews.filter((post) => post.status === "published" && !isScheduled(post));
  return [
    ...Object.values(pagePaths),
    "/tin-tuc",
    ...publishedNews.map((post) => `/tin-tuc/${post.slug}`),
    ...allProducts.map((product) => productPath(product)),
  ];
}

// Tiêu đề, mô tả, ảnh của từng trang: vite.config.js ghi sẵn vào HTML từng trang khi build,
// để Google, Facebook, Zalo đọc được ngay mà không cần chạy JavaScript (khung xem trước khi gửi link)
export function listSitePages() {
  const publishedNews = visibleNews.filter((post) => post.status === "published" && !isScheduled(post));
  const head = (path, view, image = "/home/showroom-trung-bay.jpg") => ({
    path,
    title: pageTitle(view),
    description: pageDescription(view),
    image,
  });
  return [
    ...Object.entries(pagePaths).map(([page, path]) => head(path, { page })),
    head("/tin-tuc", { newsView: {} }),
    ...publishedNews.map((post) => head(`/tin-tuc/${post.slug}`, { newsView: { post } }, post.cover)),
    ...allProducts.map((product) =>
      head(productPath(product).split("?")[0], { selected: { product } }, product.image),
    ),
  ];
}
