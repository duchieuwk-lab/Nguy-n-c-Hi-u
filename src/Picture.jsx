import webpManifest from "./webp-manifest.json";

// Ảnh có bản WebP nhiều cỡ (tạo bởi scripts/build-webp.mjs): trình duyệt tự chọn cỡ vừa đủ.
// Ảnh không có trong manifest (SVG, ảnh ngoài) hiện như <img> thường.
// sizes: độ rộng hiển thị dự kiến; mặc định cho thẻ sản phẩm (~1/2 màn điện thoại, ~420px máy tính).
const DEFAULT_SIZES = "(max-width: 720px) 60vw, 420px";

export function webpSrcSet(src) {
  const widths = webpManifest[src];
  if (!widths) return null;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  return widths.map((width) => `/_webp${base}-${width}.webp ${width}w`).join(", ");
}

export default function Picture({ src, sizes = DEFAULT_SIZES, ...imgProps }) {
  const srcSet = typeof src === "string" ? webpSrcSet(src) : null;
  if (!srcSet) return <img src={src} {...imgProps} />;
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img src={src} decoding="async" {...imgProps} />
    </picture>
  );
}
