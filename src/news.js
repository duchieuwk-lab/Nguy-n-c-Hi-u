// TIN TỨC & SỰ KIỆN
//
// Quy trình (cách C):
// 1. Claude tìm tin gaming / TCG liên quan đến sản phẩm Pixo, kiểm chứng bằng nguồn
//    chính thức hoặc nhiều nguồn khớp nhau, rồi soạn bài với status: "draft".
// 2. Bài nháp chỉ hiện trên localhost (có nhãn BẢN NHÁP), không hiện trên web thật.
// 3. Pixo duyệt nội dung -> đổi status thành "published" -> đẩy lên Git khi Pixo yêu cầu.
//
// Mỗi bài: slug (link), title, date (YYYY-MM-DD), category, excerpt (tóm tắt),
// cover (ảnh bìa 16:9), coverCredit (nguồn ảnh), body (đoạn văn, hoặc { image, caption } để chèn ảnh), cta (nút hành động, không bắt buộc),
// sources (nguồn đã kiểm chứng), status ("draft" | "published"),
// publishAt (không bắt buộc): hẹn giờ đăng, giờ Việt Nam, dạng "2026-10-25T09:00".
//   Bài đã duyệt nhưng chưa tới giờ sẽ tự ẩn, đúng giờ thì tự hiện trên web.

export const newsCategories = {
  tcg: "TCG",
  game: "Game mới",
  shop: "Tin Pixo",
  event: "Sự kiện",
  guide: "Tư vấn",
};

export const newsPosts = [
  {
    slug: "riftbound-radiance-ra-mat-23-10",
    title: "Riftbound: Radiance ra mắt 23/10 – Set 5 có gì mới?",
    date: "2026-10-20",
    category: "tcg",
    cover: "/news/riftbound-radiance-key-art.jpg",
    coverCredit: "Ảnh: Riot Games",
    excerpt:
      "Set cuối cùng của Riftbound năm 2026 lên kệ ngày 23/10 với 9 Legend mới, 3 cơ chế mới và cặp deck dựng sẵn Seraphine – Evelynn.",
    body: [
      "Riftbound: Radiance – set thứ 5 và cũng là set cuối cùng trong năm 2026 của Riftbound: League of Legends TCG – chính thức phát hành ngày 23/10/2026 với bản tiếng Anh, tiếng Pháp và tiếng Trung.",
      "Điểm nhấn lớn nhất là 9 Legend hoàn toàn mới. Hộp booster lần này có Ekko và Seraphine trên bìa, Ziggs và Jarvan đóng vai phụ. Seraphine và Evelynn cũng là hai gương mặt chính của hai bộ deck dựng sẵn (preconstructed deck) đi kèm set.",
      { image: "/products/riftbound-set5-radiance.jpg", caption: "Booster box Riftbound: Radiance bản tiếng Anh – Pixo nhận đặt trước" },
      "Radiance mang tới 3 cơ chế mới. Deploy: đặt Gear lên chiến trường để nhận lợi ích tại đó, nhưng Gear sẽ bị phá nếu đối thủ chiếm chiến trường ấy. Show Off: lộ một lá phù hợp từ tay hoặc trên bàn để mở khóa hiệu ứng mới cho lá vừa đánh. Disarm: giảm Might của Unit đối thủ mỗi khi bạn tấn công, và cộng dồn theo từng lần.",
      "Ngoài ra còn có Equipment Unit – nhờ hiệu ứng Legend của Orianna, trang bị có thể biến thành Unit – và token Bomb: càng gửi nhiều Bomb cho đối thủ, hiệu ứng càng lớn.",
      "Fan K/DA cũng có quà: các thành viên K/DA xuất hiện trên những lá bài đặc biệt của set.",
      "Pixo đang nhận đặt trước booster box Radiance bản tiếng Anh, nguyên seal, đặt cọc 1.000.000₫. Hẹn anh em ở Pixo Nexus Night để khui pack Radiance cùng nhau!",
    ],
    cta: { label: "Đặt trước Radiance", href: "/san-pham/riftbound-booster-box?pb=4" },
    sources: [
      { name: "Riftbound – The Radiance Overview (chính thức)", url: "https://playriftbound.com/en-us/news/announcements/the-radiance-overview/" },
      { name: "Inven Global", url: "https://www.invenglobal.com/articles/26530/riot-games-reveals-new-legends-and-mechanics-for-riftbound-radiance" },
    ],
    status: "published",
  },
  {
    slug: "pokemon-tcg-delta-reign-6-11",
    title: "Pokémon TCG: Mega Evolution—Delta Reign ra mắt 6/11 với Mega Rayquaza ex",
    date: "2026-10-20",
    category: "tcg",
    cover: "/news/delta-reign-key-art.jpg",
    coverCredit: "Ảnh: The Pokémon Company International",
    excerpt:
      "Bản mở rộng tiếp theo của dòng Mega Evolution có hơn 135 lá, dẫn đầu bởi Mega Rayquaza ex, phát hành ngày 6/11/2026.",
    body: [
      "The Pokémon Company đã công bố bản mở rộng Pokémon TCG: Mega Evolution—Delta Reign, phát hành ngày 6/11/2026.",
      "Nhân vật trung tâm là Mega Rayquaza ex. Bên cạnh đó còn có Mega Golurk ex, Mega Malamar ex và Mega Golisopod ex.",
      "Set có hơn 135 lá bài, trong đó hơn 20 lá Trainer và hơn 35 lá có hình minh họa đặc biệt (special illustration) – nhóm lá mà dân sưu tầm săn nhiều nhất.",
      "Thông tin chi tiết về các sản phẩm (Elite Trainer Box, Booster Bundle…) sẽ được nhà phát hành công bố thêm. Anh em muốn giữ hàng Delta Reign có thể nhắn Pixo để được báo khi có lịch hàng về.",
    ],
    cta: { label: "Nhắn Pixo hỏi lịch hàng", href: "https://zalo.me/0792371904" },
    sources: [
      { name: "Pokémon (chính thức)", url: "https://www.pokemon.com/uk/news/the-pokemon-tcg-mega-evolution-delta-reign-expansion-arrives-november-6-2026" },
    ],
    status: "published",
  },
  {
    slug: "zelda-ocarina-of-time-switch-2-5-11",
    title: "Zelda: Ocarina of Time bản làm lại lên Switch 2 ngày 5/11",
    date: "2026-10-20",
    category: "game",
    cover: "/news/zelda-ocarina-of-time-switch-2.jpg",
    coverCredit: "Ảnh: Nintendo",
    excerpt:
      "Huyền thoại Nintendo 64 trở lại độc quyền trên Switch 2 với 60 FPS, lồng tiếng cho các đoạn cắt cảnh và nút nhảy mới.",
    body: [
      "Nintendo đã ấn định ngày phát hành The Legend of Zelda: Ocarina of Time bản làm lại (remake) cho Nintendo Switch 2 là 5/11/2026. Ngày ra mắt được công bố cuối buổi Zelda 40th Anniversary Direct hôm 8/9.",
      "Bản làm lại giữ nguyên lối chơi kinh điển năm 1998 nhưng bổ sung nhiều điểm hiện đại: chạy 60 FPS, các đoạn cắt cảnh có lồng tiếng, điều khiển camera chuẩn, thêm nút nhảy và menu nhật ký nhiệm vụ mới.",
      "Game độc quyền cho Switch 2 – máy Switch đời trước không chơi được. Nếu bạn đang dùng Switch V2 hoặc OLED và muốn chơi Ocarina of Time bản mới, đây là thời điểm hợp lý để cân nhắc lên đời. Pixo có thu cũ đổi mới – gửi ảnh máy qua Zalo để được định giá.",
    ],
    cta: { label: "Xem Nintendo Switch 2", href: "/san-pham/nintendo-switch-2" },
    sources: [
      { name: "Game Informer", url: "https://gameinformer.com/nintendo-direct/2026/06/09/the-nintendo-switch-2-remake-of-the-legend-of-zelda-ocarina-of-time" },
      { name: "Video Games Chronicle", url: "https://www.videogameschronicle.com/news/zelda-ocarina-of-time-remake-officially-announced-for-nintendo-switch-2/" },
      { name: "Notebookcheck", url: "https://www.notebookcheck.net/The-Legend-of-Zelda-Ocarina-of-Time-Switch-2-remake-drops-soon.1427388.0.html" },
    ],
    status: "published",
  },
  {
    slug: "chon-may-switch-lite-v2-oled-hay-switch-2",
    title: "Switch Lite, V2, OLED hay Switch 2: chọn máy nào cho đúng nhu cầu?",
    date: "2026-10-22",
    publishAt: "2026-10-22T09:00",
    category: "guide",
    cover: "/products/featured-oled-white.jpg",
    excerpt:
      "Bốn dòng máy, bốn mức giá. Đây là cách chọn nhanh dựa trên cách bạn chơi, chứ không phải máy nào đắt nhất.",
    body: [
      "Câu khách hỏi Pixo nhiều nhất: “Nên mua Switch nào?”. Câu trả lời phụ thuộc vào việc bạn chơi ở đâu, chơi với ai và có muốn chơi game Switch 2 hay không.",
      "Switch Lite – nếu chỉ chơi cầm tay. Màn hình LCD 5.5 inch, nhỏ gọn nhất, nhưng Joy-Con gắn liền và không kết nối TV được. Hợp với người chơi một mình, hay mang máy đi học, đi làm. Tại Pixo từ 3.300.000₫ (máy like new).",
      "Switch V2 – lựa chọn cân bằng. Màn hình 6.2 inch, chơi cầm tay, để bàn hoặc cắm TV qua dock. Joy-Con tháo rời được nên rủ thêm một người chơi cùng ngay. Pin khoảng 4.5–9 giờ tùy game. Tại Pixo từ 4.850.000₫ (máy like new).",
      "Switch OLED – nếu bạn chơi cầm tay nhiều và thích màn đẹp. Màn hình OLED 7 inch cho màu rực hơn hẳn, bộ nhớ trong 64GB (gấp đôi Lite/V2), dock có cổng LAN. Tại Pixo từ 6.050.000₫ (máy like new).",
      "Switch 2 – nếu bạn muốn chơi game đời mới. Màn hình 7.9 inch 1080p, tối đa 120Hz, xuất 4K qua dock và bộ nhớ trong 256GB. Đây là máy duy nhất chơi được các game chỉ có trên Switch 2, như Zelda: Ocarina of Time bản làm lại (5/11). Tại Pixo có cả máy mới và máy like new, từ 13.500.000₫.",
      "Tóm gọn: chỉ chơi cầm tay, ngân sách thấp → Lite. Chơi cả cầm tay lẫn TV, hay chơi cùng bạn → V2. Chơi cầm tay nhiều, thích màn đẹp → OLED. Muốn đón đầu game mới → Switch 2.",
      "Vẫn phân vân? Ghé Pixo ở 23 Lê Đại Hành để cầm thử từng máy, hoặc nhắn Zalo để được tư vấn theo đúng game bạn định chơi. Pixo có trả góp qua thẻ tín dụng và thu cũ đổi mới.",
    ],
    cta: { label: "Xem tất cả máy", href: "/" },
    sources: [
      { name: "Nintendo – Switch 2 tech specs (chính thức)", url: "https://www.nintendo.com/us/gaming-systems/switch-2/tech-specs/" },
      { name: "Nintendo Life – So sánh Switch OLED / Switch / Lite", url: "https://nintendolife.com/guides/nintendo-switch-oled-model-vs-standard-switch-switch-lite-full-tech-specs-comparison" },
    ],
    status: "published",
  },
  {
    slug: "nexus-night-mua-radiance-promo-lulu",
    title: "Nexus Night mùa Radiance: promo mới, chase card Lulu, Whimsical",
    date: "2026-10-24",
    publishAt: "2026-10-24T19:00",
    category: "event",
    cover: "/community/nexus-night-nhom.jpg",
    excerpt:
      "Radiance lên kệ cũng là lúc gói promo Nexus Night đổi mùa. Lá được săn nhiều nhất mùa này là Lulu, Whimsical.",
    body: [
      "Nexus Night là sự kiện chơi Riftbound hằng tuần tại các cửa hàng game, theo tinh thần giao lưu thoải mái: đánh 1v1, 2v2 hoặc chơi tự do. Pixo Station là cửa hàng chính thức (official store) của Riftbound tại Hà Nội và tổ chức Pixo Nexus Night hằng tuần.",
      "Cùng với việc Riftbound: Radiance phát hành ngày 23/10, gói promo dành cho Nexus Night cũng được làm mới bằng các lá trong set Radiance. Riot Games xác nhận lá chase (lá được săn nhiều nhất) của gói promo mùa này là Lulu, Whimsical.",
      { image: "/community/nexus-night-ban-bai.jpg", caption: "Một buổi Pixo Nexus Night" },
      "Vì là sự kiện chính thức, người chơi tham gia Pixo Nexus Night sẽ nhận gói promo Nexus Night mùa Radiance (trong thời gian còn promo) – và biết đâu bạn là người khui được Lulu, Whimsical.",
      "Người mới hoàn toàn cũng có thể đến: anh em trong cộng đồng sẵn sàng hướng dẫn luật chơi. Nếu chưa có bài, bạn có thể mua booster box Radiance tại Pixo (đặt trước, cọc 1.000.000₫) để khui pack ngay tại buổi giao lưu.",
      "Nhắn Zalo cho Pixo để nhận lịch Nexus Night tuần này và giữ chỗ.",
    ],
    cta: { label: "Hỏi lịch Nexus Night qua Zalo", href: "https://zalo.me/0792371904" },
    sources: [
      { name: "Riftbound – The Radiance Overview (chính thức)", url: "https://playriftbound.com/en-us/news/announcements/the-radiance-overview/" },
      { name: "riftbound.gg – Radiance Nexus Night Promos", url: "https://riftbound.gg/radiance-nexus-night-promos/" },
      { name: "riftbound.zone – Nexus Night pool và Lulu, Whimsical", url: "https://riftbound.zone/en/radiance-nexus-night-promo-pool-lulu-whimsical/" },
    ],
    status: "published",
  },
  {
    slug: "booster-box-etb-booster-bundle-khac-nhau-the-nao",
    title: "Booster Box, ETB hay Booster Bundle: người mới chơi Pokémon TCG nên mua gì?",
    date: "2026-10-26",
    publishAt: "2026-10-26T09:00",
    category: "guide",
    cover: "/products/pokemon/chaos-rising-elite-trainer-box.jpg",
    excerpt:
      "Cùng một set bài nhưng có cả chục kiểu hộp. Hiểu đúng từng loại để không mua hớ và không mua thừa.",
    body: [
      "Mỗi set Pokémon TCG ra mắt thường kèm nhiều kiểu sản phẩm khác nhau. Dưới đây là các loại phổ biến nhất, lấy ví dụ theo cấu hình bản tiếng Anh của dòng Mega Evolution.",
      "Booster Pack (gói lẻ): mỗi gói 10 lá và 1 lá Energy. Rẻ nhất, hợp để thử vận may hoặc mua làm quà nhỏ.",
      "Booster Bundle: 6 gói booster trong một hộp. Mức giá dễ chịu nếu bạn muốn khui nhiều hơn một gói mà chưa muốn mua cả hộp lớn.",
      "Elite Trainer Box (ETB): 9 gói booster, kèm 1 lá promo foil, 65 sleeves (bọc bài), lá Energy và phụ kiện, tất cả trong một hộp đựng bài khá đẹp. Bản Pokémon Center của ETB có 11 gói và là hàng được săn nhiều hơn. Đây là lựa chọn hợp nhất cho người mới vì vừa khui pack vừa có đồ để bắt đầu chơi.",
      { image: "/products/pokemon/chaos-rising-booster-box-2.jpg", caption: "Booster Box Chaos Rising tại Pixo" },
      "Booster Box (Booster Display): 36 gói booster. Giá mỗi gói rẻ nhất, hợp với người sưu tầm muốn hoàn thiện set hoặc nhóm bạn khui chung.",
      "Build & Battle Box: bộ bài dựng sẵn 40 lá kèm 4 gói booster, dùng để chơi ở các buổi prerelease trước ngày set phát hành.",
      "Lưu ý: số gói và số lá có thể khác giữa các set và giữa các phiên bản ngôn ngữ (bản Thái, Hồng Kông/Đài Loan, tiếng Trung…). Pixo luôn ghi rõ phiên bản trên từng sản phẩm.",
      "Gợi ý nhanh: mới bắt đầu → ETB. Muốn thử vài gói → Booster Bundle. Sưu tầm nghiêm túc → Booster Box. Hiện Pixo có hơn 60 sản phẩm Pokémon TCG, từ gói lẻ đến hộp sưu tầm.",
    ],
    cta: { label: "Xem 64 sản phẩm Pokémon TCG", href: "/" },
    sources: [
      { name: "GoNintendo – Pokémon TCG Mega Evolution product showcase", url: "https://gonintendo.com/contents/52878-pokemon-co-shares-a-tcg-mega-evolution-product-showcase" },
      { name: "Pokémon – Scarlet & Violet Elite Trainer Box (chính thức)", url: "https://www.pokemon.com/us/pokemon-tcg/product-gallery/scarlet-violet-elite-trainer-box" },
    ],
    status: "published",
  },
  {
    slug: "the-nho-switch-2-microsd-express",
    title: "Mua thẻ nhớ cho Switch 2: vì sao thẻ microSD thường không dùng được?",
    date: "2026-10-28",
    publishAt: "2026-10-28T09:00",
    category: "guide",
    cover: "/products/switch-2.jpg",
    excerpt:
      "Switch 2 chỉ nhận thẻ microSD Express. Đọc trước khi mua để không phí tiền thẻ nhớ.",
    body: [
      "Nhiều người lên đời Switch 2 và định dùng lại thẻ nhớ cũ của Switch đời trước. Tiếc là không được: Switch 2 chỉ tương thích với thẻ microSD Express để lưu game.",
      "Thẻ microSD thường vẫn cắm vào được, nhưng theo Nintendo, máy chỉ dùng nó để sao chép ảnh chụp màn hình và video từ Switch đời trước – không dùng để cài hay chạy game.",
      "Cách nhận biết thẻ đúng loại: tìm chữ “EX” (microSD Express) trên thẻ. Switch 2 hỗ trợ thẻ microSD Express dung lượng tối đa 2TB.",
      "Lần đầu dùng thẻ microSD Express, máy cần kết nối Internet để cập nhật hệ thống.",
      "Bộ nhớ trong của Switch 2 là 256GB (một phần dành cho hệ thống), đủ cho vài game lớn. Nếu bạn tải nhiều game, nên tính thêm thẻ microSD Express ngay từ đầu.",
      "Lưu ý: thẻ microSD thường đi kèm các gói Switch Lite, V2, OLED không dùng để chơi game trên Switch 2. Khi lên đời, bạn cần mua thẻ microSD Express riêng.",
      "Cần tư vấn chọn thẻ cho Switch 2? Nhắn Pixo qua Zalo.",
    ],
    cta: { label: "Xem Nintendo Switch 2", href: "/san-pham/nintendo-switch-2" },
    sources: [
      { name: "Nintendo – Switch 2 tech specs (chính thức)", url: "https://www.nintendo.com/us/gaming-systems/switch-2/tech-specs/" },
      { name: "PCWorld – Switch 2 và thẻ microSD", url: "https://www.pcworld.com/article/2800337/getting-a-switch-2-careful-your-microsd-card-probably-isnt-compatible.html" },
      { name: "Nintendo Life – Standard microSD cards won't work on Switch 2", url: "https://nintendolife.com/news/2025/04/standard-micro-sd-cards-wont-work-on-nintendo-switch-2" },
    ],
    status: "published",
  },
  {
    slug: "game-switch-2-dang-cho-thang-11-2026",
    title: "3 game Switch 2 đáng chờ nhất tháng 11/2026",
    date: "2026-10-30",
    publishAt: "2026-10-30T09:00",
    category: "game",
    cover: "/news/zelda-ocarina-of-time-switch-2.jpg",
    coverCredit: "Ảnh: Nintendo",
    excerpt:
      "Zelda làm lại, một siêu phẩm RPG và Pikmin 4 bản nâng cấp – tháng 11 là tháng bận rộn với người chơi Switch 2.",
    body: [
      "1. The Legend of Zelda: Ocarina of Time (5/11) – bản làm lại độc quyền Switch 2 của huyền thoại Nintendo 64, chạy 60 FPS, có lồng tiếng cắt cảnh, thêm nút nhảy và điều khiển camera hiện đại.",
      "2. Metaphor: ReFantazio (12/11) – siêu phẩm RPG của Atlus (đội ngũ làm Persona) chính thức lên Switch 2. Bản demo đã có trên eShop và dữ liệu lưu từ demo chuyển được sang bản đầy đủ. Lưu ý: bản đĩa vật lý là dạng game-key card – trong hộp là thẻ khóa, máy cần tải dữ liệu game về.",
      "3. Pikmin 4 – Nintendo Switch 2 Edition + Dandori Academy (12/11, theo lịch Mỹ) – bản nâng cấp cho Switch 2 của Pikmin 4. Ngày phát hành ở các khu vực khác có thể khác.",
      "Cả ba game đều hướng tới Switch 2. Nếu bạn đang cân nhắc lên đời, Pixo có Switch 2 máy mới và like new, hỗ trợ trả góp qua thẻ tín dụng và thu cũ đổi mới.",
    ],
    cta: { label: "Xem Nintendo Switch 2", href: "/san-pham/nintendo-switch-2" },
    sources: [
      { name: "Gematsu – Metaphor: ReFantazio Switch 2 ngày 12/11", url: "https://www.gematsu.com/2026/06/metaphor-refantazio-coming-to-switch-2-on-november-12" },
      { name: "Nintendo Life – Metaphor: ReFantazio demo Switch 2", url: "https://www.nintendolife.com/news/2026/10/psa-metaphor-refantazio-demo-for-switch-2-now-available" },
      { name: "Nintendo Life – Danh sách game Switch 2", url: "https://www.nintendolife.com/guides/nintendo-switch-2-all-confirmed-games-and-release-dates" },
      { name: "Game Informer – Ocarina of Time Switch 2", url: "https://gameinformer.com/nintendo-direct/2026/06/09/the-nintendo-switch-2-remake-of-the-legend-of-zelda-ocarina-of-time" },
    ],
    status: "published",
  },
];

// Bài hiển thị: trên localhost hiện cả bản nháp (để duyệt), trên web thật chỉ hiện bài đã duyệt
// Giờ đăng tính theo giờ Việt Nam (UTC+7)
export const publishTime = (post) => (post.publishAt ? new Date(post.publishAt + ":00+07:00").getTime() : 0);
export const isScheduled = (post) => post.status === "published" && publishTime(post) > Date.now();

// Bài hiển thị: localhost hiện cả nháp và bài hẹn giờ (để duyệt); web thật chỉ hiện bài đã duyệt và đã tới giờ
export const visibleNews = newsPosts
  .filter((post) => import.meta.env.DEV || (post.status === "published" && !isScheduled(post)))
  .sort((a, b) => (b.publishAt ?? b.date).localeCompare(a.publishAt ?? a.date));
