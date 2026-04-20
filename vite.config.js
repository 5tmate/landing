import path from 'path'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite's chokidar watcher doesn't pick up addWatchFile() calls made in
// buildStart, so message JSON files outside src/ are never watched in dev.
// This plugin adds them explicitly so paraglide's watchChange hook fires.
function watchMessages() {
  return {
    name: 'watch-messages',
    configureServer(server) {
      server.watcher.add(path.resolve(__dirname, 'messages'))
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
    }),
    watchMessages(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
