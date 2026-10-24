import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { createServer, defineConfig } from 'vite'

const SITE_URL = 'https://pixostation.netlify.app'

// Sau khi build: đọc danh sách trang từ App.jsx và ghi dist/sitemap.xml + dist/robots.txt
function sitemapPlugin() {
  let outDir = 'dist'
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
        const { listSitePaths } = await server.ssrLoadModule('/src/App.jsx')
        const today = new Date().toISOString().slice(0, 10)
        const urls = [...new Set(listSitePaths())]
          .map((url) => `  <url><loc>${SITE_URL}${encodeURI(url)}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')
        fs.writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        )
        fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
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
