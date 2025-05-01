import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://laravel-skeleton.test/docs/admin.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './resources/js/apps/admin/types/api',
  },
  plugins: ['@hey-api/typescript'],
})
