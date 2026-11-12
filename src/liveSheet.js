// Giá & tình trạng hàng lấy từ Google Sheet (Tệp → Chia sẻ → Công bố lên web → CSV).
// Sửa trên Sheet thì vài phút sau web tự đổi, không cần build lại.
// Cột: Mã | Tên sản phẩm | Phiên bản | Giá gốc | Giá bán | Tình trạng
// - Mã: đừng sửa (là đường dẫn sản phẩm). Phiên bản: chỉ máy chơi game có.
// - Giá: số, ví dụ 3300000 hoặc 3.300.000. Ghi "Liên hệ" để ẩn giá. Ô sai thì web giữ giá cũ.
// - Tình trạng: Còn hàng / Hết hàng / Đặt trước (để trống = không hiện nhãn).
// Để trống SHEET_CSV_URL thì web dùng giá viết sẵn trong code.
export const SHEET_CSV_URL = "";

const CACHE_KEY = "pixo-sheet-csv";
const STOCK = { "còn hàng": "in", "hết hàng": "out", "đặt trước": "preorder" };

// Đọc CSV (hỗ trợ ô có dấu phẩy / xuống dòng trong ngoặc kép)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// undefined = ô sai/trống (giữ nguyên), null = "Liên hệ", số = giá
function readPrice(value) {
  const text = String(value ?? "").trim();
  if (!text) return undefined;
  if (/li[eê]n h[eệ]/i.test(text)) return null;
  const digits = text.replace(/[.,\s₫đ]/gi, "");
  if (!/^\d+$/.test(digits)) return undefined;
  const number = Number(digits);
  return number >= 1000 ? number : undefined;
}

// Ghi giá / tình trạng từ Sheet vào danh sách sản phẩm. Trả về số dòng đã áp dụng.
export function applySheet(csv, products, slugify) {
  const [, ...rows] = parseCsv(csv.replace(/^﻿/, ""));
  const bySlug = new Map(products.map((product) => [slugify(product.name), product]));
  const stockSet = new Set();
  let applied = 0;
  for (const [code, , variantName, originalCell, priceCell, stockCell] of rows) {
    const product = bySlug.get(String(code ?? "").trim());
    if (!product) continue;
    const price = readPrice(priceCell);
    const original = readPrice(originalCell);
    const stock = STOCK[String(stockCell ?? "").trim().toLowerCase()];
    if (product.variants) {
      const variant = product.variants.find((item) => item.name === String(variantName ?? "").trim());
      if (!variant) continue;
      // Máy chơi game luôn cần giá số (thẻ máy tính tiết kiệm từ giá gốc)
      if (price) variant.price = price;
      if (original) variant.original = original;
    } else if (price !== undefined) {
      product.price = price;
    }
    // Máy nhiều phiên bản: tình trạng lấy theo dòng đầu tiên có ghi
    if (!stockSet.has(product) && (stock || !product.variants)) {
      product.stock = stock;
      stockSet.add(product);
    }
    applied++;
  }
  return applied;
}

// Áp bản đã lưu lần trước ngay khi mở web, rồi tải bản mới; onUpdate chạy khi có thay đổi
export function loadSheet(products, slugify, onUpdate) {
  if (!SHEET_CSV_URL || typeof window === "undefined") return;
  let cached = null;
  try { cached = localStorage.getItem(CACHE_KEY); } catch { /* bỏ qua */ }
  if (cached && applySheet(cached, products, slugify)) onUpdate();

  fetch(SHEET_CSV_URL, { cache: "no-store" })
    .then((response) => (response.ok ? response.text() : Promise.reject(response.status)))
    .then((csv) => {
      if (csv === cached || !applySheet(csv, products, slugify)) return;
      try { localStorage.setItem(CACHE_KEY, csv); } catch { /* bỏ qua */ }
      onUpdate();
    })
    .catch(() => { /* lỗi mạng: giữ giá đang có */ });
}

// Tạo bảng giá ban đầu từ dữ liệu trong code (dùng cho scripts/export-price-sheet.mjs)
export function sheetRows(products, slugify) {
  const rows = [["Mã", "Tên sản phẩm", "Phiên bản", "Giá gốc", "Giá bán", "Tình trạng"]];
  const stockText = { in: "Còn hàng", out: "Hết hàng", preorder: "Đặt trước" };
  for (const product of products) {
    const code = slugify(product.name);
    const stock = stockText[product.stock] ?? "";
    if (product.variants) {
      for (const variant of product.variants) rows.push([code, product.name, variant.name, variant.original ?? "", variant.price, stock]);
    } else {
      rows.push([code, product.name, "", "", product.price ?? "Liên hệ", stock]);
    }
  }
  return rows;
}
