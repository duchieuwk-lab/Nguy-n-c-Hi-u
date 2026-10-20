import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { pokemonPerks, pokemonProducts, pokemonTypes } from "./pokemonProducts";

const CONTACT_URL = "https://m.me/pixostation";
const ZALO_URL = "https://zalo.me/0917616498";

// Thông tin cửa hàng (xác nhận 20/10/2026)
const SHOP = {
  address: "23 Lê Đại Hành, Hai Bà Trưng, Hà Nội",
  hours: "10:00 – 19:00",
  phone: "0792 371 904",
  phoneUrl: "tel:0792371904",
  zalo: "0917 616 498",
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
      { name: "Disney Tsum Tsum Festival Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-disney-tsum-tsum-festival.jpg" },
      { name: "Animal Crossing: New Horizons Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-animal-crossing-new-horizons.jpg", gallery: ["/products/switch-v2-animal-crossing-new-horizons-box.jpg"] },
      { name: "Fortnite Wildcat Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-fortnite-wildcat.jpg" },
      { name: "Mario Red & Blue Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-mario-red-blue.jpg", gallery: ["/products/switch-v2-mario-red-blue-box.jpg"] },
      { name: "Monster Hunter Rise Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-monster-hunter-rise.jpg" },
      { name: "Fortnite Fleet Force Edition", surcharge: 500000, type: "limited", image: "/products/switch-v2-fortnite-fleet-force.jpg" },
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
    image: "/products/switch-oled.png",
    badge: "PHỔ BIẾN",
    description: "Máy like new, màn hình OLED 7 inch cho màu sắc nổi bật khi chơi game.",
    editions: [
      { name: "White Base", surcharge: 0, type: "base", image: "/products/switch-oled-white-base.jpg" },
      { name: "Neon Red / Neon Blue", surcharge: 100000, type: "neon", image: "/products/switch-oled-neon-red-neon-blue.jpg" },
      { name: "Secret Edition", surcharge: 100000, type: "neon", image: "/products/switch-oled-secret.jpg" },
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
    specs: [
      { label: "Tình trạng", value: "Có máy mới (New) và máy like new: chọn ở mục Gói / Tình trạng" },
      { label: "Màn hình", value: "LCD 7.9 inch, 1920×1080, HDR10, tối đa 120Hz" },
      { label: "Xuất hình lên TV", value: "Tối đa 4K 60fps qua dock" },
      { label: "Bộ nhớ trong", value: "256GB, mở rộng bằng thẻ microSD Express (tối đa 2TB)" },
      { label: "Pin", value: "Khoảng 2–6.5 giờ (tùy game)" },
      { label: "Trọng lượng", value: "Khoảng 535g (kèm Joy-Con 2)" },
      { label: "Trong hộp", value: "Máy Switch 2 · Joy-Con 2 (L) và (R) · 2 dây đeo Joy-Con 2 · Tay cầm Joy-Con 2 Grip · Dock · Sạc AC adapter · Cáp HDMI Ultra High Speed" },
    ],
    notes: ["Switch 2 dùng thẻ microSD Express; thẻ microSD thường chỉ dùng để sao chép ảnh và video."],
    name: "Nintendo Switch 2",
    image: "/products/switch-2.jpg",
    badge: "THẾ HỆ MỚI",
    description: "Máy chơi game thế hệ mới với nhiều lựa chọn tình trạng.",
    variants: [
      { name: "Like New", original: 14500000, price: 13500000 },
      { name: "New", original: 15000000, price: 14000000 },
      { name: "Kèm băng game", original: 16000000, price: 15000000 },
    ],
  },
];

const otherProducts = [
  { id: 10, name: "Băng game Nintendo Switch", category: "game", badge: "GAME VẬT LÝ", price: 890000, image: "/products/game-cartridge.jpg", description: "Giá tùy theo tựa game và tình trạng sản phẩm." },
  { id: 11, name: "Túi đựng máy chơi game", category: "accessory", badge: "BẢO VỆ MÁY", price: 250000, image: "/products/carrying-case.jpg", description: "Túi đựng máy và phụ kiện khi di chuyển." },
  { id: 12, name: "Ốp bảo vệ Nintendo Switch", category: "accessory", badge: "PHỤ KIỆN", price: 150000, image: "/products/switch-case.jpg", description: "Nhiều mẫu ốp tùy theo model máy." },
  { id: 13, name: "Tay cầm chơi game", category: "accessory", badge: "CHƠI CÙNG BẠN", price: 590000, image: "/products/controller.jpg", description: "Tay cầm bổ sung cho những buổi chơi game." },
  {
    id: 15,
    name: "Riftbound Booster Box",
    category: "riftbound",
    badge: "RIFTBOUND TCG",
    price: 4900000,
    unit: "box",
    confirmedPrice: true,
    image: "/products/riftbound-set1-origins.jpg",
    description: "Booster box Riftbound: League of Legends TCG bản tiếng Anh, nguyên seal, có đủ từ Set 1 đến Set 5.",
    editionLabel: "CHỌN SET",
    editionNoun: "set",
    editionPicker: "images",
    editions: [
      { name: "Set 1 – Origins", shortName: "Origins", surcharge: 0, image: "/products/riftbound-set1-origins.jpg" },
      { name: "Set 2 – Spiritforged", shortName: "Spiritforged", surcharge: 0, image: "/products/riftbound-set2-spiritforged.jpg" },
      { name: "Set 3 – Unleashed", shortName: "Unleashed", surcharge: 0, image: "/products/riftbound-set3-unleashed.jpg" },
      { name: "Set 4 – Vendetta", shortName: "Vendetta", surcharge: 0, image: "/products/riftbound-set4-vendetta.jpg" },
      { name: "Set 5 – Radiance (Đặt trước)", shortName: "Radiance", surcharge: 0, image: "/products/riftbound-set5-radiance.jpg" },
    ],
    // TCG không áp dụng bảo hành / đổi 1–1 (xác nhận 20/10/2026)
    perks: ["Box nguyên seal", "Bản tiếng Anh", "Hỏa tốc 2h nội thành Hà Nội", "Có đủ Set 1 – Set 5", "Set 5 đặt trước, cọc 1.000.000₫"],
    // Nguồn: riftbound.leagueoflegends.com (Collectability in Riftbound: Origins) và các nhà bán lẻ
    specs: [
      { label: "Ngôn ngữ", value: "Tiếng Anh" },
      { label: "Tình trạng", value: "Box nguyên seal" },
      { label: "Quy cách", value: "1 booster box = 24 gói (booster pack)" },
      { label: "Mỗi gói", value: "14 lá → 336 lá / box" },
      { label: "Cấu trúc 1 gói", value: "7 Common · 3 Uncommon · 2 Rare trở lên · 1 lá Foil · 1 Token/Rune" },
      { label: "Lá Epic", value: "Khoảng 1/4 số gói có Epic (trung bình ~6 lá / box)" },
      { label: "Độ tuổi", value: "14+" },
    ],
    notes: [
      "Cấu trúc gói theo công bố chính thức của nhà phát hành cho Set 1 – Origins; các set sau cũng là box 24 gói × 14 lá.",
      "Tỉ lệ lá hiếm là mức trung bình, không đảm bảo cho từng box.",
      "Sản phẩm TCG không áp dụng bảo hành và đổi 1–1.",
      "Set 5 – Radiance phát hành ngày 23/10/2026. Nhận đặt trước, đặt cọc 1.000.000₫.",
    ],
  },
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
  { number: "02", title: "Mod chip", description: "Tư vấn phương án phù hợp với model và tình trạng máy." },
  { number: "03", title: "Cài đặt game", description: "Hỗ trợ cài đặt và quản lý game theo phương án tương thích, hợp pháp." },
  { number: "04", title: "Khắc phục phần mềm", description: "Hỗ trợ kiểm tra lỗi hệ thống và xử lý sự cố phần mềm." },
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
  { tag: "RIFTBOUND", title: "Pixo Nexus Night", description: "Theo dõi lịch giao lưu và các giải đấu tại Pixo Station." },
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
            <img
              src={banner.image}
              alt={banner.alt}
              loading={i === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          );
          return (
            <div className="banner-slide" key={banner.image} aria-hidden={i !== index}>
              {banner.link ? (
                <a href={banner.link} target="_blank" rel="noreferrer" tabIndex={i === index ? 0 : -1}>
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

function money(value) {
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
  { id: "faq", label: "Hỏi đáp" },
  { id: "contact", label: "Liên hệ" },
];

function Header({ onHome, onSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Bấm một mục thì đóng menu điện thoại rồi mới chuyển trang/cuộn
  const navigate = (action) => {
    setMenuOpen(false);
    action();
  };

  const links = (
    <>
      <button onClick={() => navigate(onHome)}>Trang chủ</button>
      <button onClick={() => navigate(() => onSection("products"))}>Sản phẩm</button>
      {navSections.map((section) => (
        <button key={section.id} onClick={() => navigate(() => onSection(section.id))}>
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

      {menuOpen && <nav className="mobile-menu">{links}</nav>}
    </header>
  );
}

// Ảnh hiển thị: ảnh theo màu/phiên bản → ảnh chung của sản phẩm → khung "Ảnh sẽ cập nhật"
function ProductImage({ product, edition }) {
  const sources = [edition?.image, product.image].filter(Boolean);
  const [failedCount, setFailedCount] = useState(0);
  const src = sources[failedCount];

  return (
    <div className="product-image">
      {src ? (
        <img
          src={src}
          alt={edition ? `${product.name} - ${edition.name}` : product.name}
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

function ConsoleCard({ product, onSelect }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [editionIndex, setEditionIndex] = useState(0);

  const variant = product.variants[variantIndex];
  const edition = product.editions ? product.editions[editionIndex] : null;
  const surcharge = edition ? edition.surcharge : 0;
  const original = variant.original + surcharge;
  const price = variant.price + surcharge;
  const saving = original - price;

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
          <span className="availability">● Hỏi tình trạng</span>
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

        <label className="variant-label" htmlFor={`variant-${product.id}`}>
          CHỌN GÓI BỘ NHỚ
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

        <div className="price-block">
          <span className="original-price">{money(original)}</span>
          <strong className="sale-price">{money(price)}</strong>
          <span className="saving-label">Tiết kiệm {money(saving)}</span>
        </div>

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
          <span className="availability">● Liên hệ xác nhận</span>
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
            {money(product.price + (edition ? edition.surcharge : 0))}{product.unit && <small> / {product.unit}</small>}
          </strong>
          {!product.confirmedPrice && <span className="saving-label">Giá tham khảo</span>}
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
  const price = (variant ? variant.price : product.price) + surcharge;
  const original = variant ? variant.original + surcharge : null;

  // Các ảnh của phiên bản đang chọn: ảnh máy trước, ảnh hộp (gallery) sau
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = edition?.image ? [edition.image, ...(edition.gallery ?? [])] : [];
  const shownEdition = photos.length ? { ...edition, image: photos[photoIndex] } : edition;

  const chooseEdition = (index) => {
    setEditionIndex(index);
    setPhotoIndex(0);
    // Cập nhật link theo phiên bản đang chọn (không tạo thêm bước "Quay lại")
    window.history.replaceState(null, "", productPath(product, index));
  };

  // Sao chép tin nhắn trước rồi mới mở Zalo/Messenger: tab mới làm trang mất focus và trình duyệt sẽ chặn sao chép
  const askToBuy = async (url, appName) => {
    const editionText = edition
      ? `, ${product.editionNoun ?? "màu/phiên bản"} ${edition.name}`
      : "";
    const variantText = variant ? `, gói bộ nhớ/tình trạng ${variant.name}` : "";
    const message =
      `Chào Pixo Station! Mình muốn hỏi mua ${product.name}` +
      `${editionText}${variantText}. Giá hiển thị: ${money(price)}. ` +
      `Shop tư vấn giúp mình nhé!\n${window.location.href}`;

    const copying = navigator.clipboard
      ? navigator.clipboard.writeText(message)
      : Promise.reject(new Error("Clipboard không khả dụng"));

    window.open(url, "_blank", "noopener,noreferrer");

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
                  <img src={photo} alt="" />
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
                    <img src={item.image} alt="" />
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

          {hasVariants && (
            <>
              <label className="variant-label" htmlFor="detail-variant">
                CHỌN GÓI BỘ NHỚ / TÌNH TRẠNG
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
            <button className="primary-button zalo-button" onClick={() => askToBuy(ZALO_URL, "Zalo")}>
              Hỏi mua qua Zalo
            </button>
            <button className="primary-button" onClick={() => askToBuy(CONTACT_URL, "Messenger")}>
              Nhắn Messenger
            </button>
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

// LINK RIÊNG CHO TỪNG SẢN PHẨM: /san-pham/<slug>?pb=<số thứ tự phiên bản>
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

function productPath(product, editionIndex = 0) {
  const query = editionIndex ? `?pb=${editionIndex}` : "";
  return `/san-pham/${slugify(product.name)}${query}`;
}

// Đọc link hiện tại để biết đang xem sản phẩm nào (null = trang chủ)
function selectionFromLocation() {
  const match = window.location.pathname.match(/^\/san-pham\/([^/]+)\/?$/);
  if (!match) return null;
  const product = allProducts.find((item) => slugify(item.name) === match[1]);
  if (!product) return null;
  const editionIndex = Number(new URLSearchParams(window.location.search).get("pb")) || 0;
  const validEdition = product.editions && editionIndex < product.editions.length ? editionIndex : 0;
  return { product, variantIndex: 0, editionIndex: validEdition };
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

  // Nút Quay lại / Tiến tới của trình duyệt
  useEffect(() => {
    const onPopState = () => setSelected(selectionFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Tiêu đề tab theo sản phẩm đang xem
  useEffect(() => {
    document.title = selected ? `${selected.product.name} – Pixo Station` : SITE_TITLE;
  }, [selected]);

  // Về trang chủ: đổi link về "/" (nếu đang ở trang sản phẩm) rồi đóng trang chi tiết
  const closeProduct = () => {
    if (window.location.pathname !== "/") window.history.pushState(null, "", "/");
    setSelected(null);
  };

  const visibleConsoles = useMemo(() => {
    return consoles
      .filter(() => category === "all" || category === "console")
      .filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "low") return a.variants[0].price - b.variants[0].price;
        if (sort === "high") return b.variants[0].price - a.variants[0].price;
        return a.id.localeCompare(b.id);
      });
  }, [category, search, sort]);

  const visibleOthers = useMemo(() => {
    return otherProducts
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => !(collapsePokemon && product.category === "pokemon"))
      .filter((product) =>
        category !== "pokemon" || pokemonType === "all" || product.type === pokemonType
      )
      .filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return a.id - b.id;
      });
  }, [category, search, sort, pokemonType, collapsePokemon]);

  const goHome = () => {
    closeProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Đóng trang chi tiết (nếu đang mở) rồi cuộn tới mục cần xem
  const goSection = (id) => {
    closeProduct();
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const goShop = () => goSection("products");

  const openProduct = (product, variantIndex = 0, editionIndex = 0) => {
    window.history.pushState(null, "", productPath(product, editionIndex));
    setSelected({ product, variantIndex, editionIndex });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header onHome={goHome} onSection={goSection} />

      <div className="floating-contact">
        <a
          className="floating-zalo"
          href={ZALO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Nhắn tin cho Pixo Station qua Zalo"
        >
          Zalo
        </a>
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Nhắn tin cho Pixo Station qua Messenger"
        >
          💬 Nhắn Pixo
        </a>
      </div>

      {selected ? (
        <ProductDetail
          key={selected.product.id}
          product={selected.product}
          initialVariant={selected.variantIndex}
          initialEdition={selected.editionIndex}
          onBack={closeProduct}
          onSelect={openProduct}
        />
      ) : (
        <>
          <main>
            <BannerSlider />

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
                <button className="text-link" onClick={() => { setCategory("console"); goShop(); }}>
                  Xem tất cả máy →
                </button>
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
                      <img src={photo.src} alt={`Khách hàng nhận ${photo.caption} tại Pixo Station`} loading="lazy" />
                      <figcaption>{photo.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>

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
                            <img key={item.id} src={item.image} alt="" loading="lazy" />
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
                  <article className="tcg-card pokemon-card">
                    <div className="tcg-card-art">
                      <span>POKÉMON</span><b>TCG</b><i>COLLECT YOUR FAVORITES</i>
                    </div>
                    <div className="tcg-card-info">
                      <span>TRADING CARD GAME</span>
                      <h3>Pokémon TCG</h3>
                      <p>Booster pack, hộp bài, lá bài đơn và phụ kiện sưu tầm.</p>
                      <button onClick={() => { setCategory("pokemon"); goShop(); }}>
                        Khám phá sản phẩm ↗
                      </button>
                    </div>
                  </article>

                  <article className="tcg-card riftbound-card">
                    <div className="tcg-card-art">
                      <span>RIFTBOUND</span><b>UNITE.</b><i>STRATEGY MEETS LEGENDS</i>
                    </div>
                    <div className="tcg-card-info">
                      <span>STRATEGY CARD GAME</span>
                      <h3>Riftbound</h3>
                      <p>Tìm sản phẩm Riftbound và theo dõi hoạt động cộng đồng tại Pixo.</p>
                      <button onClick={() => { setCategory("riftbound"); goShop(); }}>
                        Khám phá sản phẩm ↗
                      </button>
                    </div>
                  </article>
                </div>

                <div className="community-heading">
                  <div>
                    <span className="eyebrow">SỰ KIỆN</span>
                    <h3>Chơi cùng cộng đồng.</h3>
                  </div>
                  <a href={CONTACT_URL} target="_blank" rel="noreferrer">
                    Theo dõi hoạt động ↗
                  </a>
                </div>

                <div className="nexus-feature">
                  <img
                    className="nexus-hero"
                    src="/community/nexus-night-nhom.jpg"
                    alt="Người chơi tham gia Pixo Nexus Night"
                    loading="lazy"
                  />
                  <div className="nexus-copy">
                    <span className="eyebrow">RIFTBOUND · HẰNG TUẦN</span>
                    <h3>Pixo Nexus Night</h3>
                    <p>
                      Buổi giao lưu Riftbound diễn ra hằng tuần: đánh giao hữu, đổi
                      bài, mở pack cùng nhau và làm quen với cộng đồng người chơi
                      Hà Nội. Người mới cũng được chào đón.
                    </p>
                    <div className="contact-actions">
                      <a className="primary-button zalo-button" href={ZALO_URL} target="_blank" rel="noreferrer">
                        Hỏi lịch &amp; đăng ký qua Zalo
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nexus-gallery">
                  {nexusPhotos.map((photo) => (
                    <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
                  ))}
                </div>

                <div className="event-grid">
                  {events.filter((event) => event.title !== "Pixo Nexus Night").map((event) => (
                    <article className="event-card" key={event.title}>
                      <span>{event.tag}</span>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <a href={CONTACT_URL} target="_blank" rel="noreferrer">
                        Hỏi lịch hoạt động ↗
                      </a>
                    </article>
                  ))}
                </div>

                <p className="disclaimer">
                  Nhắn Zalo để nhận lịch Nexus Night tuần này và các giải đấu sắp tới.
                </p>
              </div>
            </section>

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
                    <a href={CONTACT_URL} target="_blank" rel="noreferrer">
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
                <a className="primary-button" href={CONTACT_URL} target="_blank" rel="noreferrer">
                  Trao đổi với Pixo ↗
                </a>
              </div>
            </section>

            {/* VỀ PIXO */}
            <section className="about-section" id="about">
              <div className="page-width">
                <div className="about-story">
                  <div className="section-intro">
                    <span className="eyebrow">VỀ PIXO</span>
                    <h2>Từ game thủ,<br /><span>cho game thủ.</span></h2>
                    <img
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

                <a className="policy-contact" href={CONTACT_URL} target="_blank" rel="noreferrer">
                  Ghé chơi hoặc nhắn Pixo một câu ↗
                </a>
              </div>
            </section>

            {/* CHÍNH SÁCH BÁN HÀNG */}
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

                <a className="policy-contact" href={CONTACT_URL} target="_blank" rel="noreferrer">
                  Hỏi Pixo về chính sách ↗
                </a>
              </div>
            </section>

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

            <section className="contact-section" id="contact">
              <div className="page-width contact-inner">
                <div className="contact-info">
                  <span className="eyebrow">LIÊN HỆ</span>
                  <h2>Ghé Pixo chơi thử máy</h2>
                  <ul>
                    <li><b>Địa chỉ</b>{SHOP.address}</li>
                    <li><b>Giờ mở cửa</b>{SHOP.hours}</li>
                    <li><b>Điện thoại</b><a href={SHOP.phoneUrl}>{SHOP.phone}</a></li>
                    <li><b>Zalo</b><a href={ZALO_URL} target="_blank" rel="noreferrer">{SHOP.zalo}</a></li>
                  </ul>
                  <div className="contact-actions">
                    <a className="primary-button" href={SHOP.mapsUrl} target="_blank" rel="noreferrer">
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
          </main>
        </>
      )}

      <footer className="site-footer">
        <div className="page-width footer-main">
          <button className="brand" onClick={goHome}>
            <img className="brand-logo" src="/logo-pixo.png" alt="Pixo Station" />
          </button>
          <div className="footer-contact">
            <span>{SHOP.address}</span>
            <span>{SHOP.hours}</span>
            <span>
              <a href={SHOP.phoneUrl}>☎ {SHOP.phone}</a> · <a href={ZALO_URL} target="_blank" rel="noreferrer">Zalo {SHOP.zalo}</a>
            </span>
          </div>
          <div className="footer-links">
            <a href={SHOP.facebookUrl} target="_blank" rel="noreferrer">Facebook ↗</a>
            <a href={SHOP.mapsUrl} target="_blank" rel="noreferrer">Google Maps ↗</a>
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