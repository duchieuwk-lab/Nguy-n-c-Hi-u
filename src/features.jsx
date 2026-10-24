import { useState } from "react";
import Picture from "./Picture";

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
                  <Picture src={model.image} sizes="180px" alt={model.name} loading="lazy" />
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
// Cơ chế thu cũ đổi mới của Pixo (Google Sheet "Cơ chế thu cũ đổi mới", nhận 24/10/2026):
// giá thu = giá bán cùng dòng máy tại Pixo × (1 − % theo hạng) − khấu trừ phụ kiện; lên đời được cộng trợ giá.
const tradeInModels = [
  // productId: lấy giá bán hiện tại trên web (gói rẻ nhất); null = Pixo không bán dòng này, báo giá trực tiếp
  { id: "lite", name: "Switch Lite", productId: "lite", handheldOnly: true },
  { id: "v1", name: "Switch V1", productId: null },
  { id: "v2", name: "Switch V2", productId: "v2" },
  { id: "oled", name: "Switch OLED", productId: "oled" },
  { id: "switch2", name: "Switch 2", productId: "switch2" },
];

const tradeInGrades = [
  { id: "A", label: "A – Đẹp", note: "Ngoại hình ≥90–95%, chức năng hoàn hảo, pin tốt, không sửa chữa bất thường.", rate: 0.3, bonus: { v2: 200000, oled: 250000, switch2: 300000 } },
  { id: "B", label: "B – Khá", note: "Xước nhẹ, dấu sử dụng bình thường.", rate: 0.35, bonus: { v2: 150000, oled: 200000, switch2: 250000 } },
  { id: "C", label: "C – Xấu", note: "Xước nhiều, xước màn hình, Joy-Con lỗi nhẹ, pin yếu.", rate: 0.4, bonus: { v2: 100000, oled: 150000, switch2: 200000 } },
  { id: "D", label: "D – Lỗi", note: "Lỗi màn hình, main, sạc, Wi-Fi, Joy-Con, pin hoặc lỗi không xác định.", rate: 0.45, screenRate: 0.5, bonus: { v2: 50000, oled: 100000, switch2: 150000 } },
];

// Khấu trừ phụ kiện: missing = thiếu, faulty = lỗi (null = không áp dụng). handheld: có cả ở Switch Lite.
const tradeInParts = [
  { id: "box", label: "Hộp (gồm khay)", missing: 300000, faulty: null, handheld: true },
  { id: "joycon", label: "Joy-Con", missing: 1000000, faulty: 300000 },
  { id: "dock", label: "Dock", missing: 600000, faulty: 300000 },
  { id: "charger", label: "Sạc", missing: 250000, faulty: null, handheld: true },
  { id: "hdmi", label: "Cáp HDMI", missing: 250000, faulty: null },
  { id: "grip", label: "Grip", missing: 150000, faulty: null },
  { id: "strap", label: "Dây strap", missing: 150000, faulty: null },
];

const upgradeTargets = [
  { id: "none", label: "Chỉ bán máy" },
  { id: "v2", label: "Lên Switch V2" },
  { id: "oled", label: "Lên Switch OLED" },
  { id: "switch2", label: "Lên Switch 2" },
];

const partStateLabels = { ok: "Đủ", missing: "Thiếu", faulty: "Lỗi" };

export function TradeInPage({ consoles, zaloUrl, messengerUrl }) {
  const [modelId, setModelId] = useState("oled");
  const [gradeId, setGradeId] = useState("B");
  const [screenError, setScreenError] = useState(false);
  const [parts, setParts] = useState({});
  const [target, setTarget] = useState("none");

  const model = tradeInModels.find((item) => item.id === modelId);
  const grade = tradeInGrades.find((item) => item.id === gradeId);
  const visibleParts = tradeInParts.filter((part) => !model.handheldOnly || part.handheld);

  const product = consoles.find((item) => item.id === model.productId);
  const basePrice = product?.variants ? Math.min(...product.variants.map((variant) => variant.price)) : null;
  const rate = grade.id === "D" && screenError ? grade.screenRate : grade.rate;
  const deductions = visibleParts
    .map((part) => ({ part, state: parts[part.id] ?? "ok" }))
    .filter(({ state }) => state !== "ok")
    .map(({ part, state }) => ({ label: `${partStateLabels[state]} ${part.label}`, amount: part[state] }));
  const totalDeduction = deductions.reduce((sum, item) => sum + item.amount, 0);
  const bonus = target === "none" ? 0 : grade.bonus[target];
  const buyPrice = basePrice == null ? null : Math.max(0, Math.round(basePrice * (1 - rate)) - totalDeduction);
  const finalValue = buyPrice == null ? null : buyPrice + bonus;

  const setPart = (id, state) => setParts((current) => ({ ...current, [id]: state }));

  const targetLabel = upgradeTargets.find((item) => item.id === target).label;
  const message =
    `Chào Pixo Station! Mình muốn thu cũ đổi mới: ${model.name}, hạng ${grade.label}${grade.id === "D" && screenError ? " (lỗi màn hình)" : ""}` +
    `${deductions.length ? `, ${deductions.map((item) => item.label.toLowerCase()).join(", ")}` : ", đủ phụ kiện"}. ${targetLabel}. ` +
    `${finalValue != null ? `Web tạm tính ${money(finalValue)}. ` : ""}Mình gửi ảnh máy để shop chốt giá nhé!`;

  return (
    <section className="tradein-page page-width">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THU CŨ ĐỔI MỚI</span>
          <h2>Máy cũ <span>đáng bao nhiêu?</span></h2>
        </div>
        <p>Chọn máy, hạng máy và phụ kiện để tạm tính giá thu. Lên đời máy mới tại Pixo được cộng thêm trợ giá.</p>
      </div>

      <div className="installment-grid">
        <div className="installment-form">
          <span className="variant-label">MÁY CỦA BẠN</span>
          <div className="installment-options">
            {tradeInModels.map((item) => (
              <button key={item.id} className={modelId === item.id ? "active" : ""} onClick={() => setModelId(item.id)}>
                {item.name}
              </button>
            ))}
          </div>

          <span className="variant-label">HẠNG MÁY</span>
          <div className="tradein-conditions">
            {tradeInGrades.map((item) => (
              <button key={item.id} className={gradeId === item.id ? "active" : ""} onClick={() => setGradeId(item.id)}>
                <b>{item.label} <small>· thu {Math.round((1 - item.rate) * 100)}% giá bán</small></b>
                <span>{item.note}</span>
              </button>
            ))}
          </div>
          {grade.id === "D" && (
            <label className="tradein-check">
              <input type="checkbox" checked={screenError} onChange={(event) => setScreenError(event.target.checked)} />
              Lỗi màn hình (thu 50% giá bán)
            </label>
          )}

          <span className="variant-label">PHỤ KIỆN</span>
          <div className="tradein-parts">
            {visibleParts.map((part) => {
              const state = parts[part.id] ?? "ok";
              return (
                <div key={part.id} className="tradein-part">
                  <span>{part.label}</span>
                  <div>
                    {["ok", "missing", "faulty"]
                      .filter((option) => option === "ok" || part[option] != null)
                      .map((option) => (
                        <button
                          key={option}
                          className={state === option ? "active" : ""}
                          onClick={() => setPart(part.id, option)}
                        >
                          {partStateLabels[option]}
                          {option !== "ok" && <small> −{Math.round(part[option] / 1000)}k</small>}
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          <span className="variant-label">BẠN MUỐN</span>
          <div className="installment-options">
            {upgradeTargets.map((item) => (
              <button key={item.id} className={target === item.id ? "active" : ""} onClick={() => setTarget(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="installment-result">
          <span>{target === "none" ? "Giá thu tạm tính" : "Giá trị máy cũ khi lên đời"}</span>
          {finalValue != null ? <strong>{money(finalValue)}</strong> : <strong className="tradein-pending">Pixo báo giá</strong>}
          <dl>
            <div><dt>Máy</dt><dd>{model.name}</dd></div>
            {basePrice != null && <div><dt>Giá bán cùng dòng tại Pixo</dt><dd>{money(basePrice)}</dd></div>}
            <div><dt>Hạng {grade.id}</dt><dd>−{Math.round(rate * 100)}%</dd></div>
            {deductions.map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>−{money(item.amount)}</dd></div>
            ))}
            {bonus > 0 && <div><dt>Trợ giá lên đời</dt><dd>+{money(bonus)}</dd></div>}
          </dl>
          <p>
            {basePrice == null
              ? "Pixo không bán sẵn dòng máy này nên sẽ báo giá trực tiếp sau khi xem ảnh."
              : "Giá tạm tính theo cơ chế thu cũ của Pixo. Giá chốt sau khi Pixo kiểm tra máy trực tiếp hoặc qua ảnh/video."}
          </p>
        </div>
      </div>

      <div className="installment-cta">
        <div>
          <h3>Gửi ảnh để chốt giá</h3>
          <p>Tin nhắn đã ghi sẵn máy, hạng và phụ kiện bạn vừa chọn. Đính kèm ảnh máy rồi gửi cho Pixo.</p>
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
