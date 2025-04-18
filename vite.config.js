import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/apps/admin/main.tsx'],
      refresh: true,
    }),
    tsconfigPaths(),
    react(),
    tailwindcss(),
  ],
})
