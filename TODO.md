# TODO – Web Pixo Station

Cập nhật: 24/10/2026

## Trạng thái hiện tại

- Web chạy tại **https://pixostation.com** (Netlify, HTTPS đã bật; `www` và `pixostation.netlify.app` vẫn vào được).
- Tên miền mua ở Mắt Bão, tài khoản **MB21904953** (không phải MB21904966). DNS: `@` A → 75.2.60.5, `www` CNAME → pixostation.netlify.app.
- Deploy: `npm run build` rồi
  `npx -y netlify-cli@latest deploy --dir=dist --prod --no-build --site=48083bfe-9654-4a89-91f1-599754cdabb4`
- Code trên GitHub: `duchieuwk-lab/Nguy-n-c-Hi-u` (nhánh main). Một số commit mới nhất chưa push.
- Đo lường (`src/analytics.js`): GA4 `G-JDSNVM18HT` (Gmail duchieu.wk@gmail.com), Meta Pixel `1798166270894151` ("Pixo Station Event Data", doanh nghiệp PixoStation). Theo dõi: xem trang, xem sản phẩm, bấm Messenger/Zalo/Gọi.
- Messenger (Fanpage) là kênh liên hệ chính; Zalo là nút phụ.
- Mỗi trang có HTML riêng với tiêu đề/mô tả/ảnh chia sẻ (tạo lúc build trong `vite.config.js`).

## Chủ shop tự làm

- [ ] Gắn link pixostation.com lên Fanpage, Google Maps, TikTok/Instagram, Zalo OA; đăng bài giới thiệu web
- [ ] Google Maps: sửa giờ đóng cửa thành 19:00
- [ ] Gửi khai báo tên miền quốc tế tại thongbaotenmien.vn (chọn nhà đăng ký Mắt Bão)
- [ ] Gộp 2 tài khoản Mắt Bão về một (nhờ Mắt Bão chuyển tên miền)

## Cần thông tin từ chủ shop

- [ ] Giá Zelda TOTK: 1.650.000₫ hay 1.450.000₫
- [ ] "Life of Pi" có phải là Lies of P không
- [ ] Danh sách hàng còn/hết (cho nhãn tồn kho)

## Việc code tiếp theo (theo thứ tự)

1. [ ] Sửa giá/nội dung còn treo ở trên
2. [ ] Đăng ký Google Search Console cho pixostation.com, gửi sitemap
3. [ ] GA4: đánh dấu `generate_lead` là sự kiện quan trọng (sau khi có lượt bấm nhắn tin đầu tiên)
4. [ ] Nhãn tồn kho tự cập nhật theo Google Sheet
5. [ ] Push các commit chưa push lên GitHub

## Để sau

- Trả góp online, tài khoản khách hàng, giỏ hàng: chờ số liệu đo lường rồi mới quyết
- Bài viết SEO (so sánh máy, có nên mua máy cũ…)
- Đóng gói web thành dịch vụ bán cho shop khác: cần 4–8 tuần số liệu thật của Pixo trước
