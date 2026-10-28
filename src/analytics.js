// Đo lường: Google Analytics 4 + Facebook (Meta) Pixel.
// Điền mã vào 2 hằng số dưới đây; để trống thì web không tải công cụ nào (không lỗi gì).
// - GA_ID: mã đo lường GA4, dạng "G-XXXXXXXXXX" (analytics.google.com → Quản trị → Luồng dữ liệu)
// - PIXEL_ID: dãy số Pixel (Meta Business → Trình quản lý sự kiện)
const GA_ID = "G-JDSNVM18HT";
const PIXEL_ID = "1798166270894151";

let started = false;

function loadScript(src) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;

  if (GA_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    // Lượt xem trang do trackPageView gửi (web chuyển trang không tải lại)
    window.gtag("config", GA_ID, { send_page_view: false });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  }

  if (PIXEL_ID) {
    const fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    fbq("init", PIXEL_ID);
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }

  // Bấm link Messenger / Zalo / gọi điện ở bất kỳ đâu trên web
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href.includes("m.me/")) trackContact("Messenger", link.textContent.trim());
      else if (href.includes("zalo.me/")) trackContact("Zalo", link.textContent.trim());
      else if (href.startsWith("tel:")) trackContact("Gọi điện", link.textContent.trim());
    },
    true,
  );
}

export function trackPageView(title) {
  window.gtag?.("event", "page_view", {
    page_title: title,
    page_location: window.location.href,
  });
  window.fbq?.("track", "PageView");
}

// Khách mở trang chi tiết một sản phẩm
export function trackProductView(product, price) {
  // Trang sản phẩm chạy trước phần khởi động ở App, nên tự khởi động nếu chưa có
  initAnalytics();
  window.gtag?.("event", "view_item", {
    currency: "VND",
    value: price ?? undefined,
    items: [{ item_id: String(product.id), item_name: product.name }],
  });
  window.fbq?.("track", "ViewContent", {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: "product",
    currency: "VND",
    value: price ?? undefined,
  });
}

// Khách bấm nhắn tin / gọi: đây là chuyển đổi chính của web
export function trackContact(channel, label = "") {
  window.gtag?.("event", "generate_lead", { method: channel, label });
  window.fbq?.("track", "Contact", { channel, label });
}
