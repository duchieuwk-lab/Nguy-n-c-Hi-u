import { useState } from "react";

// Định dạng tiền giống App.jsx; null = "Liên hệ"
function money(value) {
  if (value == null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}

// Sao chép tin nhắn rồi mở Zalo/Messenger (giống nút hỏi mua ở trang sản phẩm)
async function sendMessage(url, appName, message) {
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
}

// ===== SO SÁNH MÁY =====
// Thông số theo trang chính thức của Nintendo. productId khớp với id trong danh sách máy ở App.jsx.
const compareModels = [
  {
    productId: "lite",
    name: "Switch Lite",
    image: "/products/switch-lite.jpg",
    fit: "Chơi cầm tay, gọn nhẹ, phù hợp học sinh và người mới.",
    specs: {
      screen: "5.5 inch LCD, 720p",
      tv: "Không",
      joycon: "Liền thân máy",
      storage: "32GB",
      battery: "3 – 7 giờ",
      weight: "~275g",
      games: "Game Switch (chơi cầm tay)",
    },
  },
  {
    productId: "v2",
    name: "Switch V2",
    image: "/products/switch-v2-neon-red-neon-blue.jpg",
    fit: "Chơi cả cầm tay lẫn trên TV, giá tốt nhất để chơi cùng bạn bè.",
    specs: {
      screen: "6.2 inch LCD, 720p",
      tv: "Có, tối đa 1080p",
      joycon: "Tháo rời, chơi 2 người ngay",
      storage: "32GB",
      battery: "4.5 – 9 giờ",
      weight: "~398g",
      games: "Toàn bộ game Switch",
    },
  },
  {
    productId: "oled",
    name: "Switch OLED",
    image: "/products/switch-oled-white-base.jpg",
    fit: "Màn OLED rực rỡ, chân đỡ chắc, dock có cổng LAN.",
    specs: {
      screen: "7 inch OLED, 720p",
      tv: "Có, tối đa 1080p",
      joycon: "Tháo rời, chơi 2 người ngay",
      storage: "64GB",
      battery: "4.5 – 9 giờ",
      weight: "~420g",
      games: "Toàn bộ game Switch",
    },
  },
  {
    productId: "switch2",
    name: "Switch 2",
    image: "/products/switch-2.jpg",
    fit: "Thế hệ mới: chơi được game Switch 2 độc quyền, mạnh nhất, màn lớn nhất.",
    highlight: true,
    specs: {
      screen: "7.9 inch LCD, 1080p, 120Hz, HDR",
      tv: "Có, tối đa 4K",
      joycon: "Joy-Con 2 gắn nam châm, dùng như chuột",
      storage: "256GB",
      battery: "2 – 6.5 giờ",
      weight: "~534g",
      games: "Game Switch 2 + hầu hết game Switch",
    },
  },
];

const compareRows = [
  { key: "screen", label: "Màn hình" },
  { key: "tv", label: "Chơi trên TV" },
  { key: "joycon", label: "Tay cầm" },
  { key: "storage", label: "Bộ nhớ trong" },
  { key: "battery", label: "Thời lượng pin" },
  { key: "weight", label: "Trọng lượng" },
  { key: "games", label: "Chơi được" },
];

// Gợi ý nhanh theo nhu cầu
const compareTips = [
  { need: "Chỉ chơi cầm tay, ngân sách thấp", pick: "Switch Lite" },
  { need: "Chơi cùng bạn bè, gia đình trên TV", pick: "Switch V2 hoặc OLED" },
  { need: "Muốn màn đẹp nhất của Switch đời đầu", pick: "Switch OLED" },
  { need: "Muốn chơi Mario Kart World, Donkey Kong Bananza, game mới 2025–2026", pick: "Switch 2" },
];

export function ComparePage({ consoles, onOpenProduct, onShop }) {
  const startingPrice = (productId) => {
    const product = consoles.find((item) => item.id === productId);
    return product?.variants ? Math.min(...product.variants.map((variant) => variant.price)) : null;
  };

  return (
    <section className="compare-page page-width">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SO SÁNH MÁY</span>
          <h2>Nên mua <span>máy nào?</span></h2>
        </div>
        <p>Đặt 4 dòng Nintendo Switch cạnh nhau để chọn đúng máy theo cách bạn chơi.</p>
      </div>

      <div className="compare-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th aria-label="Tiêu chí" />
              {compareModels.map((model) => (
                <th key={model.productId} className={model.highlight ? "highlight" : ""}>
                  <img src={model.image} alt={model.name} loading="lazy" />
                  <strong>{model.name}</strong>
                  <span>Từ {money(startingPrice(model.productId))}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {compareModels.map((model) => (
                  <td key={model.productId} className={model.highlight ? "highlight" : ""}>
                    {model.specs[row.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">Hợp với</th>
              {compareModels.map((model) => (
                <td key={model.productId} className={model.highlight ? "highlight" : ""}>{model.fit}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" aria-label="Xem máy" />
              {compareModels.map((model) => (
                <td key={model.productId} className={model.highlight ? "highlight" : ""}>
                  <button className="primary-button" onClick={() => onOpenProduct(model.productId)}>
                    Xem {model.name}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="compare-tips">
        <h3>Chọn nhanh theo nhu cầu</h3>
        <ul>
          {compareTips.map((tip) => (
            <li key={tip.need}>
              <span>{tip.need}</span>
              <b>→ {tip.pick}</b>
            </li>
          ))}
        </ul>
        <button className="outline-button" onClick={onShop}>Xem tất cả máy</button>
      </div>
    </section>
  );
}

// ===== ĐỊNH GIÁ THU CŨ =====
// Khoảng giá thu (₫). Pixo gửi bảng giá thu thì điền vào đây: { min, max } theo máy và tình trạng.
// Để null = chưa có giá, công cụ hiện "Pixo báo giá sau khi xem ảnh".
const tradeInModels = ["Switch Lite", "Switch V1", "Switch V2", "Switch OLED", "Switch 2"];
const tradeInConditions = [
  { id: "new", label: "Như mới", note: "Không trầy, đủ hộp, ít dùng" },
  { id: "good", label: "Trầy nhẹ", note: "Có vết dùng nhẹ, mọi chức năng tốt" },
  { id: "worn", label: "Trầy nhiều / lỗi nhẹ", note: "Trầy rõ, lỗi nút, drift Joy-Con, chai pin" },
];
const tradeInPrices = {
  // VD: "Switch OLED": { new: { min: 4500000, max: 5000000 }, good: {...}, worn: {...} },
};

export function TradeInPage({ zaloUrl, messengerUrl }) {
  const [model, setModel] = useState(tradeInModels[3]);
  const [condition, setCondition] = useState("good");
  const [fullBox, setFullBox] = useState(true);
  const [hacked, setHacked] = useState(false);

  const range = tradeInPrices[model]?.[condition] ?? null;
  const conditionLabel = tradeInConditions.find((item) => item.id === condition).label;
  const message =
    `Chào Pixo Station! Mình muốn định giá máy cũ: ${model}, tình trạng ${conditionLabel}, ` +
    `${fullBox ? "đủ hộp và phụ kiện" : "thiếu hộp / phụ kiện"}${hacked ? ", máy đã can thiệp phần mềm" : ""}. ` +
    `${range ? `Web tạm tính ${money(range.min)} – ${money(range.max)}. ` : ""}Mình gửi ảnh máy để shop định giá nhé!`;

  return (
    <section className="tradein-page page-width">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THU CŨ ĐỔI MỚI</span>
          <h2>Máy cũ <span>đáng bao nhiêu?</span></h2>
        </div>
        <p>Chọn máy và tình trạng để xem khoảng giá. Giá thu được trừ thẳng khi lên đời máy mới tại Pixo.</p>
      </div>

      <div className="installment-grid">
        <div className="installment-form">
          <span className="variant-label">MÁY CỦA BẠN</span>
          <div className="installment-options">
            {tradeInModels.map((item) => (
              <button key={item} className={model === item ? "active" : ""} onClick={() => setModel(item)}>{item}</button>
            ))}
          </div>

          <span className="variant-label">TÌNH TRẠNG</span>
          <div className="tradein-conditions">
            {tradeInConditions.map((item) => (
              <button key={item.id} className={condition === item.id ? "active" : ""} onClick={() => setCondition(item.id)}>
                <b>{item.label}</b>
                <span>{item.note}</span>
              </button>
            ))}
          </div>

          <span className="variant-label">PHỤ KIỆN & PHẦN MỀM</span>
          <label className="tradein-check">
            <input type="checkbox" checked={fullBox} onChange={(event) => setFullBox(event.target.checked)} />
            Đủ hộp, dock, sạc, Joy-Con
          </label>
          <label className="tradein-check">
            <input type="checkbox" checked={hacked} onChange={(event) => setHacked(event.target.checked)} />
            Máy đã can thiệp phần mềm (hack)
          </label>
        </div>

        <div className="installment-result">
          <span>Khoảng giá thu dự kiến</span>
          {range ? (
            <strong>{money(range.min)} – {money(range.max)}</strong>
          ) : (
            <strong className="tradein-pending">Pixo báo giá</strong>
          )}
          <dl>
            <div><dt>Máy</dt><dd>{model}</dd></div>
            <div><dt>Tình trạng</dt><dd>{conditionLabel}</dd></div>
            <div><dt>Phụ kiện</dt><dd>{fullBox ? "Đầy đủ" : "Thiếu"}</dd></div>
          </dl>
          <p>
            {range
              ? "Giá tham khảo. Giá chốt sau khi Pixo kiểm tra máy trực tiếp hoặc qua ảnh/video."
              : "Gửi ảnh máy (mặt trước, mặt sau, các cạnh) để Pixo báo giá thu trong ngày."}
          </p>
        </div>
      </div>

      <div className="installment-cta">
        <div>
          <h3>Gửi ảnh để chốt giá</h3>
          <p>Tin nhắn đã ghi sẵn máy và tình trạng bạn vừa chọn. Đính kèm ảnh máy rồi gửi cho Pixo.</p>
        </div>
        <div className="detail-actions">
          <button className="primary-button zalo-button" onClick={() => sendMessage(zaloUrl, "Zalo", message)}>
            Gửi ảnh qua Zalo
          </button>
          <button className="primary-button" onClick={() => sendMessage(messengerUrl, "Messenger", message)}>
            Nhắn Messenger
          </button>
        </div>
      </div>
    </section>
  );
}

// ===== ĐÁNH GIÁ GOOGLE =====
// Số liệu lấy từ Google Maps ngày 24/10/2026. Cập nhật tay khi số đánh giá thay đổi.
export const googleRating = { score: 5.0, count: 104 };

export function GoogleReviews({ mapsUrl }) {
  return (
    <section className="google-reviews page-width">
      <div className="google-score">
        <span className="google-g" aria-hidden="true">G</span>
        <div>
          <strong>{googleRating.score.toFixed(1)}</strong>
          <span className="google-stars" aria-label={`${googleRating.score} trên 5 sao`}>★★★★★</span>
        </div>
        <p><b>{googleRating.count} đánh giá</b> trên Google Maps</p>
      </div>
      <p className="google-copy">
        Khách hàng chấm Pixo 5 sao vì tư vấn thật, máy chuẩn và hỗ trợ sau bán. Đọc đánh giá thật hoặc để lại cảm nhận của bạn.
      </p>
      <div className="contact-actions">
        <a className="primary-button" href={mapsUrl} target="_blank" rel="noreferrer">Xem đánh giá ↗</a>
        <a className="outline-button" href={mapsUrl} target="_blank" rel="noreferrer">Viết đánh giá</a>
      </div>
    </section>
  );
}
