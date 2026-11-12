// Xuất bảng giá hiện có trong code ra bang-gia-pixo.csv để nhập vào Google Sheet lần đầu.
// Chạy: node scripts/export-price-sheet.mjs
import fs from 'node:fs'
import { createServer } from 'vite'

const server = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { listPriceRows } = await server.ssrLoadModule('/src/App.jsx')
  const cell = (value) => (/[",\n]/.test(String(value)) ? `"${String(value).replace(/"/g, '""')}"` : String(value))
  const csv = listPriceRows().map((row) => row.map(cell).join(',')).join('\n')
  fs.writeFileSync('bang-gia-pixo.csv', '﻿' + csv + '\n')
  console.log(`Đã ghi bang-gia-pixo.csv (${listPriceRows().length - 1} dòng)`)
} finally {
  await server.close()
}
