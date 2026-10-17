
import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Nintendo Switch OLED',
    category: 'NINTENDO SWITCH',
    price: '5.990.000đ',
    priceValue: 5990000,
    status: 'Đã qua sử dụng',
    description: 'Màn hình OLED 7 inch, màu sắc rực rỡ.',
    image: '/products/switch-oled.jpg',
    details: [
      'Màn hình OLED 7 inch',
      'Joy-Con tháo rời',
      'Chơi game cầm tay hoặc kết nối TV',
      'Thông tin máy sẽ được xác nhận khi tư vấn',
    ],
  },
  {
    id: 2,
    name: 'Nintendo Switch Lite',
    category: 'NINTENDO SWITCH',
    price: '3.290.000đ',
    priceValue: 3290000,
    status: 'Đã qua sử dụng',
    description: 'Nhỏ gọn, phù hợp chơi game khi di chuyển.',
    image: '/products/switch-lite.jpg',
    details: [
      'Thiết kế nhỏ gọn',
      'Tích hợp nút điều khiển',
      'Tối ưu cho chế độ chơi cầm tay',
      'Thông tin máy sẽ được xác nhận khi tư vấn',
    ],
  },
  {
    id: 3,
    name: 'Steam Deck OLED',
    category: 'PC HANDHELD',
    price: '12.990.000đ',
    priceValue: 12990000,
    status: 'Đã qua sử dụng',
    description: 'Trải nghiệm game PC trên thiết bị cầm tay.',
    image: '/products/steam-deck.jpg',
    details: [
      'Màn hình OLED',
      'Chạy nhiều trò chơi PC',
      'Điều khiển tích hợp trên thân máy',
      'Thông tin máy sẽ được xác nhận khi tư vấn',
    ],
  },
]

const categories = [
  'Tất cả',
  'NINTENDO SWITCH',
  'PC HANDHELD',
]

const contactUrl = 'https://www.facebook.com/'

function App() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'Tất cả' ||
      product.category === activeCategory

    const keyword = searchTerm.trim().toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)

    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-high') {
      return a.priceValue - b.priceValue
    }

    if (sortOrder === 'high-low') {
      return b.priceValue - a.priceValue
    }

    return a.id - b.id
  })

  function showHome() {
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function showProducts() {
    setSelectedProduct(null)
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 0)
  }

  return (
    <div className="app">
      <header className="header">
        <button className="logo" onClick={showHome}>
          PIXO<span>STATION</span>
        </button>

        <nav className="nav">
          <button onClick={showHome}>Trang chủ</button>
          <button onClick={showProducts}>Sản phẩm</button>
          <a href="#about">Về Pixo</a>
        </nav>

        <a
          className="contact-button"
          href={contactUrl}
          target="_blank"
          rel="noreferrer"
        >
          Liên hệ
        </a>
      </header>

      {selectedProduct ? (
        <main className="product-detail">
          <button
            className="back-button"
            onClick={() => setSelectedProduct(null)}
          >
            ← Quay lại danh sách
          </button>

          <div className="detail-layout">
            <div className="detail-image">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
            </div>

            <div className="detail-info">
              <p className="eyebrow">{selectedProduct.category}</p>
              <h1>{selectedProduct.name}</h1>
              <p className="detail-price">{selectedProduct.price}</p>
              <p className="product-status">{selectedProduct.status}</p>
              <p className="detail-description">
                {selectedProduct.description}
              </p>

              <h3>Thông tin sản phẩm</h3>
              <ul>
                {selectedProduct.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <p className="detail-note">
                Liên hệ Pixo Station để xác nhận giá, tình trạng máy,
                phụ kiện đi kèm và chính sách bảo hành hiện hành.
              </p>

              <a
                className="hero-button"
                href={contactUrl}
                target="_blank"
                rel="noreferrer"
              >
                LIÊN HỆ HỎI MUA ↗
              </a>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <section className="hero">
            <p className="eyebrow">YOUR NEXT LEVEL STARTS HERE</p>

            <h1>
              GAME ON.
              <br />
              <span>LEVEL UP.</span>
            </h1>

            <p className="hero-description">
              Khám phá thế giới gaming cùng Pixo Station.
              Máy chơi game, phụ kiện và những cuộc phiêu lưu mới
              đang chờ bạn.
            </p>

            <a className="hero-button" href="#products">
              KHÁM PHÁ SẢN PHẨM ↗
            </a>
          </section>

          <section className="products" id="products">
            <div className="section-heading">
              <div>
                <p className="eyebrow">PICK YOUR PLAYER</p>
                <h2>SẢN PHẨM NỔI BẬT</h2>
              </div>
              <p>Những thiết bị dành cho game thủ.</p>
            </div>

            <input
              className="product-search"
              type="search"
              placeholder="Tìm Nintendo Switch, Steam Deck..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category ? 'active' : ''
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'NINTENDO SWITCH'
                    ? 'Nintendo Switch'
                    : category === 'PC HANDHELD'
                      ? 'PC Handheld'
                      : category}
                </button>
              ))}
            </div>

            <div className="sort-control">
              <label htmlFor="sort-products">Sắp xếp theo giá:</label>
              <select
                id="sort-products"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="default">Mặc định</option>
                <option value="low-high">Giá thấp đến cao</option>
                <option value="high-low">Giá cao đến thấp</option>
              </select>
            </div>

            <div className="product-grid">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <button
                      className="product-image-button"
                      onClick={() => {
                        setSelectedProduct(product)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      aria-label={`Xem ${product.name}`}
                    >
                      <img src={product.image} alt={product.name} />
                    </button>

                    <div className="product-info">
                      <p className="product-category">
                        {product.category}
                      </p>

                      <h3>
                        <button
                          className="product-name-button"
                          onClick={() => {
                            setSelectedProduct(product)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="product-description">
                        {product.description}
                      </p>

                      <p className="product-status">{product.status}</p>

                      <div className="product-bottom">
                        <strong>{product.price}</strong>
                        <button
                          className="buy-link"
                          onClick={() => {
                            setSelectedProduct(product)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                        >
                          Xem máy ↗
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="empty-results">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
              )}
            </div>
          </section>

          <section className="about" id="about">
            <p className="eyebrow">WELCOME TO PIXO STATION</p>
            <h2>CHƠI GAME THEO CÁCH CỦA BẠN.</h2>
            <p className="about-description">
              Tìm chiếc máy phù hợp với phong cách chơi game của bạn.
              Pixo Station đồng hành cùng bạn từ lúc chọn máy đến khi
              bắt đầu cuộc phiêu lưu.
            </p>

            <div className="benefit-grid">
              <article className="benefit-card">
                <span className="benefit-number">01</span>
                <h3>Đa dạng lựa chọn</h3>
                <p>
                  Khám phá máy chơi game và phụ kiện để tìm thiết bị
                  phù hợp với nhu cầu của bạn.
                </p>
              </article>

              <article className="benefit-card">
                <span className="benefit-number">02</span>
                <h3>Thông tin rõ ràng</h3>
                <p>
                  Liên hệ để xác nhận tình trạng máy, phụ kiện,
                  giá bán và chính sách trước khi mua.
                </p>
              </article>

              <article className="benefit-card">
                <span className="benefit-number">03</span>
                <h3>Hỗ trợ khách hàng</h3>
                <p>
                  Pixo Station hỗ trợ theo chính sách và dịch vụ
                  được xác nhận tại thời điểm mua hàng.
                </p>
              </article>
            </div>
          </section>

          <section className="purchase-process">
            <p className="eyebrow">HOW TO BUY</p>
            <h2>CHỌN MÁY. NHẮN TIN. CHIẾN GAME.</h2>

            <div className="process-grid">
              <article className="process-item">
                <span>01</span>
                <h3>Chọn sản phẩm</h3>
                <p>Tìm thiết bị bạn quan tâm trong danh mục.</p>
              </article>

              <article className="process-item">
                <span>02</span>
                <h3>Liên hệ Pixo</h3>
                <p>Nhắn tin để hỏi tình trạng máy và giá bán.</p>
              </article>

              <article className="process-item">
                <span>03</span>
                <h3>Xác nhận đơn</h3>
                <p>Thống nhất đơn hàng và điều kiện trước khi mua.</p>
              </article>
            </div>

            <a
              className="hero-button"
              href={contactUrl}
              target="_blank"
              rel="noreferrer"
            >
              NHẮN TIN NGAY ↗
            </a>
          </section>
        </main>
      )}

      <footer className="footer">
        <button className="logo" onClick={showHome}>
          PIXO<span>STATION</span>
        </button>
        <p>© 2026 Pixo Station. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
