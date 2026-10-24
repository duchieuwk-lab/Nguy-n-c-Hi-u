// Tạo bản WebP nhiều cỡ cho ảnh JPG/PNG trong public/ → public/_webp/<đường dẫn gốc>-<cỡ>.webp
// Chạy tự động trước "npm run dev" và "npm run build". Ảnh nào chưa đổi thì bỏ qua.
// Component <Picture> (src/Picture.jsx) dùng đúng quy tắc đặt tên này.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const OUT_DIR = path.join(PUBLIC_DIR, "_webp");
// Phải khớp với WEBP_WIDTHS trong src/Picture.jsx
const WIDTHS = [480, 960, 1600];
const FOLDERS = ["products", "home", "community", "banners", "news"];
const QUALITY = 74;
// Ảnh bìa trang chủ hiện to toàn màn hình: giữ nét, gần như không nén
const BANNER_QUALITY = 92;

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listImages(full);
    return /\.(jpe?g|png)$/i.test(entry.name) ? [full] : [];
  });
}

let created = 0;
let skipped = 0;
const manifest = {};

for (const file of FOLDERS.flatMap((folder) => listImages(path.join(PUBLIC_DIR, folder)))) {
  const relative = path.relative(PUBLIC_DIR, file).replace(/\\/g, "/");
  const base = relative.replace(/\.(jpe?g|png)$/i, "");
  const sourceTime = fs.statSync(file).mtimeMs;
  const { width } = await sharp(file).metadata();
  // Chỉ tạo các cỡ nhỏ hơn ảnh gốc (thêm cỡ gốc nếu ảnh nhỏ hơn cỡ lớn nhất)
  const widths = WIDTHS.filter((size) => size < width);
  // Thêm cỡ gốc chỉ khi cỡ lớn nhất đã tạo nhỏ hơn ảnh gốc đáng kể (>15%)
  if ((widths.at(-1) ?? 0) < width * 0.85) widths.push(width);
  if (!widths.length) widths.push(width);
  manifest[`/${relative}`] = widths;

  for (const size of widths) {
    const target = path.join(OUT_DIR, `${base}-${size}.webp`);
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= sourceTime) {
      skipped++;
      continue;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    await sharp(file).resize({ width: size, withoutEnlargement: true }).webp({ quality: relative.startsWith("banners/") ? BANNER_QUALITY : QUALITY }).toFile(target);
    created++;
  }
}

// Danh sách cỡ có sẵn cho từng ảnh, để <Picture> không trỏ tới file không tồn tại
fs.writeFileSync(path.join("src", "webp-manifest.json"), JSON.stringify(manifest));
console.log(`WebP: tạo ${created}, bỏ qua ${skipped}, ${Object.keys(manifest).length} ảnh`);
