import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const githubRepository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === 'true' && githubRepository
    ? `/${githubRepository}/`
    : '/')

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
