// Hiệu ứng nghiêng 3D + ánh holo khi rê chuột lên thẻ sản phẩm (kiểu thẻ bài Pokémon).
// Chỉ bật trên máy có chuột và khi người dùng không chọn "giảm chuyển động"; điện thoại giữ nguyên như cũ.
const SELECTOR = ".product-card, .bestseller-card, [data-tilt]";
const MAX_ANGLE = 8; // độ nghiêng tối đa

export function initTilt3d() {
  if (typeof window === "undefined") return;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;

  let active = null;
  let frame = 0;

  const reset = (card) => {
    card.classList.remove("is-tilting");
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
  };

  document.addEventListener("pointermove", (event) => {
    const card = event.target.closest?.(SELECTOR);
    if (active && active !== card) reset(active);
    active = card;
    if (!card) return;

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width; // 0 → 1
      const y = (event.clientY - box.top) / box.height;
      const strength = Number(card.dataset.tilt) || 1;
      card.classList.add("is-tilting");
      card.style.setProperty("--rx", `${(0.5 - y) * MAX_ANGLE * 2 * strength}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * MAX_ANGLE * 2 * strength}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
  });

  document.addEventListener("pointerleave", () => active && reset(active));
}
