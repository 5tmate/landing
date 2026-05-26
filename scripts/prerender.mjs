import { build } from 'vite'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import fs from 'node:fs/promises'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, '.ssr-build')

await build({
  root,
  logLevel: 'warn',
  build: {
    ssr: path.join(root, 'src/entry-server.jsx'),
    outDir: '.ssr-build',
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(root, 'src/entry-server.jsx'),
      output: { format: 'esm', entryFileNames: 'entry-server.mjs' },
    },
    minify: false,
  },
})

const entryUrl = pathToFileURL(path.join(ssrDir, 'entry-server.mjs')).href
const { render } = await import(entryUrl)
const rendered = render('en')

const indexPath = path.join(distDir, 'index.html')
let html = await fs.readFile(indexPath, 'utf-8')

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html')
}
html = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)

// Inject preload links for the latin woff2 fonts so they don't block first paint.
const assets = await fs.readdir(path.join(distDir, 'assets'))
const fonts = assets.filter((f) => /^(jetbrains-mono|syne)-latin-.*\.woff2$/.test(f))
if (fonts.length) {
  const preloads = fonts
    .map(
      (f) =>
        `    <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`,
    )
    .join('\n')
  html = html.replace('</head>', `${preloads}\n  </head>`)
}

await fs.writeFile(indexPath, html)
await fs.rm(ssrDir, { recursive: true, force: true })

console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} KiB to dist/index.html`)
console.log(`prerender: preloaded ${fonts.length} woff2 font(s)`)
