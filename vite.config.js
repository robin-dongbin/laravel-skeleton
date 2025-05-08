import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const ReactCompilerConfig = {}

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/apps/admin/main.tsx'],
      refresh: true,
    }),
    tsconfigPaths(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tailwindcss(),
  ],
})
