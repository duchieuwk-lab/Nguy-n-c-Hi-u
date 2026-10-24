import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { createServer, defineConfig } from 'vite'

// Đổi sang https://pixostation.com khi tên miền đã trỏ xong
const SITE_URL = 'https://pixostation.netlify.app'

// Sau khi build: đọc danh sách trang từ App.jsx và ghi dist/sitemap.xml + dist/robots.txt
function sitemapPlugin() {
  let outDir = 'dist'

  // Mỗi trang một file HTML có sẵn tiêu đề, mô tả, ảnh (og:*), để link gửi qua Facebook/Zalo hiện đúng sản phẩm.
  // Netlify trả file này trước khi rơi về index.html chung; giao diện vẫn do React dựng như cũ.
  function writePageHeads(pages) {
    const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
    const escape = (text) =>
      String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    for (const page of pages) {
      const url = `${SITE_URL}${encodeURI(page.path)}`
      const image = `${SITE_URL}${encodeURI(page.image)}`
      const tags = [
        `<title>${escape(page.title)}</title>`,
        `<meta name="description" content="${escape(page.description)}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:title" content="${escape(page.title)}" />`,
        `<meta property="og:description" content="${escape(page.description)}" />`,
        `<meta property="og:image" content="${image}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      ].join('\n    ')
      const html = template
        .replace(/<title>[\s\S]*?<\/title>\s*/, '')
        .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, '')
        .replace(/<meta\s+property="og:title"[\s\S]*?\/>\s*/, '')
        .replace(/<meta\s+property="og:description"[\s\S]*?\/>\s*/, '')
        .replace('</head>', `  ${tags}\n  </head>`)
      const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
      fs.mkdirSync(path.join(outDir, path.dirname(file)), { recursive: true })
      fs.writeFileSync(path.join(outDir, file), html)
    }
  }

  return {
    name: 'pixo-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      const server = await createServer({
        configFile: false,
        logLevel: 'silent',
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
      })
      try {
        const { listSitePaths, listSitePages } = await server.ssrLoadModule('/src/App.jsx')
        const today = new Date().toISOString().slice(0, 10)
        const urls = [...new Set(listSitePaths())]
          .map((url) => `  <url><loc>${SITE_URL}${encodeURI(url)}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')
        fs.writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        )
        fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
        writePageHeads(listSitePages())
      } finally {
        await server.close()
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
