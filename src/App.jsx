
import { useMemo, useState } from "react";
import "./App.css";

const CONTACT_URL = "https://m.me/pixostation";

const consoles = [
  {
    id: "lite",
    name: "Nintendo Switch Lite",
    image: "/products/switch-lite.jpg",
    badge: "NHỎ GỌN",
    description: "Máy chơi game cầm tay nhỏ gọn, phù hợp mang theo mỗi ngày.",
    editions: [
      { name: "Gray (Xám)", surcharge: 0, type: "base" },
      { name: "Yellow (Vàng)", surcharge: 0, type: "base" },
      { name: "Turquoise (Xanh ngọc)", surcharge: 0, type: "base" },
      { name: "Coral (Hồng san hô)", surcharge: 0, type: "base" },
      { name: "Blue (Xanh dương)", surcharge: 0, type: "base" },
      { name: "Pokémon Zacian & Zamazenta Edition", surcharge: 500000, type: "limited" },
      { name: "Pokémon Dialga & Palkia Edition", surcharge: 500000, type: "limited" },
      { name: "Animal Crossing Isabelle’s Aloha Edition", surcharge: 500000, type: "limited" },
      { name: "Animal Crossing Timmy & Tommy’s Aloha Edition", surcharge: 500000, type: "limited" },
      { name: "The Legend of Zelda: Hyrule Edition", surcharge: 500000, type: "limited" },
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
    name: "Nintendo Switch V2",
    image: "/products/switch-v2.jpg",
    badge: "ĐA NĂNG",
    description: "Chơi game cầm tay hoặc kết nối TV với dock tương thích.",
    editions: [
      { name: "Neon Red / Neon Blue", surcharge: 100000, type: "neon" },
      { name: "Gray Joy-Con", surcharge: 0, type: "base" },
      { name: "Dragon Quest XI S Loto Edition", surcharge: 500000, type: "limited" },
      { name: "Disney Tsum Tsum Festival Edition", surcharge: 500000, type: "limited" },
      { name: "Animal Crossing: New Horizons Edition", surcharge: 500000, type: "limited" },
      { name: "Fortnite Wildcat Edition", surcharge: 500000, type: "limited" },
      { name: "Mario Red & Blue Edition", surcharge: 500000, type: "limited" },
      { name: "Monster Hunter Rise Edition", surcharge: 500000, type: "limited" },
      { name: "Fortnite Fleet Force Edition", surcharge: 500000, type: "limited" },
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
    name: "Nintendo Switch OLED",
    image: "/products/switch-oled.png",
    badge: "PHỔ BIẾN",
    description: "Màn hình OLED 7 inch cho màu sắc nổi bật khi chơi game.",
    editions: [
      { name: "White Base", surcharge: 0, type: "base" },
      { name: "Neon Red / Neon Blue", surcharge: 100000, type: "neon" },
      { name: "Secret Edition", surcharge: 100000, type: "neon" },
      { name: "Splatoon Limited Edition", surcharge: 500000, type: "limited" },
      { name: "Zelda Limited Edition", surcharge: 500000, type: "limited" },
      { name: "Pokémon Limited Edition", surcharge: 500000, type: "limited" },
      { name: "Mario Limited Edition", surcharge: 500000, type: "limited" },
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
  { id: 14, name: "Pokémon TCG", category: "pokemon", badge: "TRADING CARD GAME", price: 150000, image: "/products/pokemon-tcg.jpg", description: "Booster pack, hộp bài, lá bài đơn và phụ kiện." },
  { id: 15, name: "Riftbound TCG", category: "riftbound", badge: "TCG COMMUNITY", price: 150000, image: "/products/riftbound.jpg", description: "Sản phẩm Riftbound dành cho người chơi và nhà sưu tầm." },
];

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

const events = [
  { tag: "POKÉMON TCG", title: "Gặp gỡ cộng đồng Pokémon", description: "Giao lưu, chia sẻ bộ bài và tìm người chơi cùng." },
  { tag: "RIFTBOUND", title: "Pixo Nexus Night", description: "Theo dõi lịch giao lưu và các giải đấu tại Pixo Station." },
];

function money(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}

function Header({ onHome, onShop }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={onHome}>
          <span className="brand-symbol">P</span>
          <span>
            <strong>PIXO<span>STATION</span></strong>
            <small>PLAY MORE. LIVE BIGGER.</small>
          </span>
        </button>

        <nav className="main-nav">
          <button onClick={onHome}>Trang chủ</button>
          <button onClick={onShop}>Sản phẩm</button>
          <a href="#tcg">TCG & cộng đồng</a>
          <a href="#services">Dịch vụ</a>
          <a href="#policies">Chính sách</a>
        </nav>

        <a className="header-cta" href={CONTACT_URL} target="_blank" rel="noreferrer">
          Liên hệ ↗
        </a>
      </div>
    </header>
  );
}

function ProductImage({ product }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="product-image">
      {!failed ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
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
        <ProductImage product={product} />
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
  return (
    <article className="product-card">
      <button className="product-image-button" onClick={() => onSelect(product)}>
        <ProductImage product={product} />
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

        <div className="price-block">
          <strong className="sale-price">{money(product.price)}</strong>
          <span className="saving-label">Giá tham khảo</span>
        </div>

        <button className="product-link" onClick={() => onSelect(product)}>
          Xem chi tiết <span>↗</span>
        </button>
      </div>
    </article>
  );
}

function ProductDetail({
  product,
  initialVariant = 0,
  initialEdition = 0,
  onBack,
}) {
  const hasVariants = Array.isArray(product.variants);
  const [variantIndex, setVariantIndex] = useState(initialVariant);
  const [editionIndex, setEditionIndex] = useState(initialEdition);

  const variant = hasVariants ? product.variants[variantIndex] : null;
  const edition = product.editions ? product.editions[editionIndex] : null;
  const surcharge = edition ? edition.surcharge : 0;
  const price = variant ? variant.price + surcharge : product.price;
  const original = variant ? variant.original + surcharge : null;

  return (
    <main className="detail-page page-width">
      <button className="back-button" onClick={onBack}>
        ← Quay lại sản phẩm
      </button>

      <div className="detail-grid">
        <ProductImage product={product} />

        <div className="detail-copy">
          <span className="eyebrow">PIXO STATION / PRODUCT</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          {product.editions && (
            <>
              <label className="variant-label" htmlFor="detail-edition">
                CHỌN MÀU / PHIÊN BẢN MÁY
              </label>
              <select
                id="detail-edition"
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
          <strong className="detail-price">{money(price)}</strong>
          {original && (
            <span className="saving-label">
              Tiết kiệm {money(original - price)}
            </span>
          )}

          <div className="demo-notice">
            Vui lòng liên hệ Pixo để xác nhận giá, tình trạng, phụ kiện đi kèm
            và chính sách bảo hành trước khi mua.
          </div>

          <a className="primary-button" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Hỏi mua sản phẩm ↗
          </a>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);

  const visibleConsoles = useMemo(() => {
    return consoles
      .filter((product) => category === "all" || category === "console")
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
      .filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return a.id - b.id;
      });
  }, [category, search, sort]);

  const goHome = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goShop = () => {
    setSelected(null);
    window.setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const openProduct = (product, variantIndex = 0, editionIndex = 0) => {
    setSelected({ product, variantIndex, editionIndex });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header onHome={goHome} onShop={goShop} />

      {selected ? (
        <ProductDetail
          key={selected.product.id}
          product={selected.product}
          initialVariant={selected.variantIndex}
          initialEdition={selected.editionIndex}
          onBack={() => setSelected(null)}
        />
      ) : (
        <>
          <main>
            <section className="hero">
              <div className="hero-grid-bg" />

              <div className="hero-inner page-width">
                <div className="hero-copy">
                  <span className="eyebrow">
                    <i /> YOUR GAMING DESTINATION
                  </span>
                  <h1>
                    Chơi game.<br />
                    <span>Sưu tầm. Kết nối.</span>
                  </h1>
                  <p>
                    Máy chơi game, băng game, phụ kiện, TCG và dịch vụ kỹ thuật
                    dành cho cộng đồng game thủ.
                  </p>

                  <div className="hero-actions">
                    <button className="primary-button" onClick={goShop}>
                      Khám phá sản phẩm ↘
                    </button>
                    <a className="secondary-button" href="#services">
                      Dịch vụ kỹ thuật
                    </a>
                  </div>

                  <div className="hero-points">
                    <span>01 / CONSOLES</span>
                    <span>02 / TCG</span>
                    <span>03 / REPAIR</span>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="visual-ring ring-one" />
                  <div className="visual-ring ring-two" />

                  <div className="visual-panel">
                    <span className="visual-topline">WELCOME TO YOUR NEXT LEVEL</span>

                    <div className="visual-device">
                      <span className="device-side side-left"><i /></span>
                      <div className="device-screen">
                        <small>PIXO STATION</small>
                        <strong>GAME<br />ON<span>.</span></strong>
                        <em>PLAY MORE. LIVE BIGGER.</em>
                      </div>
                      <span className="device-side side-right"><i /></span>
                    </div>

                    <div className="visual-bottom">
                      <span>GAMING / TCG / COMMUNITY</span>
                      <b>PS—001</b>
                    </div>
                  </div>

                  <span className="float-label float-one">LEVEL UP ↗</span>
                  <span className="float-label float-two">● PLAYER COMMUNITY</span>
                </div>
              </div>

              <div className="hero-strip">
                <span>PIXO STATION</span>
                <span>GAMING GEAR & TCG</span>
                <span>HANOI · VIETNAM</span>
              </div>
            </section>

            <section className="category-section page-width">
              <div className="section-intro">
                <span className="eyebrow">EXPLORE PIXO</span>
                <h2>Mọi thứ cho<br /><span>cuộc chơi của bạn.</span></h2>
              </div>

              <div className="category-tiles">
                <button onClick={() => { setCategory("console"); goShop(); }}>
                  <span>01 / HARDWARE</span>
                  <strong>Máy chơi game</strong>
                  <small>Lite · V2 · OLED · Switch 2</small>
                  <b>↗</b>
                </button>
                <button onClick={() => { setCategory("game"); goShop(); }}>
                  <span>02 / GAME LIBRARY</span>
                  <strong>Băng game & phụ kiện</strong>
                  <small>Game vật lý · Túi · Ốp · Tay cầm</small>
                  <b>↗</b>
                </button>
                <a href="#tcg">
                  <span>03 / TCG</span>
                  <strong>Trading Card Games</strong>
                  <small>Pokémon · Riftbound</small>
                  <b>↗</b>
                </a>
                <a href="#services">
                  <span>04 / TECH SERVICE</span>
                  <strong>Dịch vụ kỹ thuật</strong>
                  <small>Sửa chữa · Mod chip · Phần mềm</small>
                  <b>↗</b>
                </a>
              </div>
            </section>

            <section className="catalog-section page-width" id="products">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PIXO MARKET</span>
                  <h2>Chọn món đồ<br /><span>tiếp theo của bạn.</span></h2>
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

              <div className="result-line">
                <span>{visibleConsoles.length + visibleOthers.length} SẢN PHẨM</span>
                <span>PIXO SELECTS ✳</span>
              </div>

              {visibleConsoles.length + visibleOthers.length > 0 ? (
                <div className="product-grid">
                  {visibleConsoles.map((product) => (
                    <ConsoleCard key={product.id} product={product} onSelect={openProduct} />
                  ))}
                  {visibleOthers.map((product) => (
                    <OtherProductCard key={product.id} product={product} onSelect={openProduct} />
                  ))}
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
                Giá băng game, phụ kiện và TCG hiện là giá tham khảo. Giá máy lấy
                từ bảng giá Pixo bạn cung cấp.
              </p>
            </section>

            <section className="tcg-section" id="tcg">
              <div className="page-width tcg-inner">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">COLLECT · PLAY · CONNECT</span>
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
                    <span className="eyebrow">MEET YOUR PEOPLE</span>
                    <h3>Chơi cùng cộng đồng.</h3>
                  </div>
                  <a href={CONTACT_URL} target="_blank" rel="noreferrer">
                    Theo dõi hoạt động ↗
                  </a>
                </div>

                <div className="event-grid">
                  {events.map((event) => (
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
                  Lịch giao lưu và giải đấu sẽ được cập nhật khi có sự kiện chính thức.
                </p>
              </div>
            </section>

            <section className="services-section page-width" id="services">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PIXO TECH SERVICE</span>
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
                  <span className="eyebrow">NEED TECH SUPPORT?</span>
                  <h3>Hãy mô tả lỗi máy bạn đang gặp.</h3>
                </div>
                <a className="primary-button" href={CONTACT_URL} target="_blank" rel="noreferrer">
                  Trao đổi với Pixo ↗
                </a>
              </div>
            </section>

            {/* CHÍNH SÁCH BÁN HÀNG */}
            <section className="policies-section" id="policies">
              <div className="page-width policies-inner">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">SHOP WITH CONFIDENCE</span>
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
                    <span className="policy-kicker">01 / WARRANTY</span>
                    <h3>Bảo hành 6 tháng</h3>
                    <p>
                      Thiết bị được bảo hành trong 6 tháng. Vui lòng liên hệ
                      Pixo để xác nhận phạm vi và điều kiện bảo hành áp dụng
                      cho sản phẩm bạn chọn.
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">⇄</span>
                    <span className="policy-kicker">02 / EXCHANGE</span>
                    <h3>Đổi 1–1 trong 7 ngày</h3>
                    <p>
                      Hỗ trợ đổi máy 1–1 trong 7 ngày theo chính sách áp dụng.
                      Liên hệ Pixo để được hướng dẫn điều kiện và quy trình
                      đổi máy.
                    </p>
                  </article>

                  <article className="policy-card">
                    <span className="policy-icon">⌁</span>
                    <span className="policy-kicker">03 / DELIVERY</span>
                    <h3>Giao hỏa tốc trong 2 giờ</h3>
                    <p>
                      Áp dụng tại khu vực hỗ trợ. Hãy nhắn Pixo xác nhận địa
                      chỉ, tình trạng hàng và thời gian giao dự kiến trước
                      khi đặt.
                    </p>
                  </article>
                </div>

                <a className="policy-contact" href={CONTACT_URL} target="_blank" rel="noreferrer">
                  Hỏi Pixo về chính sách ↗
                </a>
              </div>
            </section>

            <section className="trust-section">
              <div className="page-width trust-inner">
                <div>
                  <span>01</span>
                  <strong>Đúng nhu cầu</strong>
                  <p>Tư vấn theo thiết bị và mục đích sử dụng.</p>
                </div>
                <div>
                  <span>02</span>
                  <strong>Thông tin rõ ràng</strong>
                  <p>Xác nhận giá và tình trạng trước khi mua.</p>
                </div>
                <div>
                  <span>03</span>
                  <strong>Cộng đồng game</strong>
                  <p>Kết nối người chơi và người sưu tầm.</p>
                </div>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div className="page-width footer-main">
              <button className="brand" onClick={goHome}>
                <span className="brand-symbol">P</span>
                <span>
                  <strong>PIXO<span>STATION</span></strong>
                  <small>PLAY MORE. LIVE BIGGER.</small>
                </span>
              </button>
              <p>Gaming · TCG · Community · Tech Service</p>
              <a href={CONTACT_URL} target="_blank" rel="noreferrer">Facebook ↗</a>
            </div>
            <div className="page-width footer-bottom">
              <span>© 2026 PIXO STATION</span>
              <span>MADE FOR PLAYERS.</span>
            </div>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
