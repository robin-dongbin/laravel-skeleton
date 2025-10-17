import './assets/styles/app.css'

import { AppLayout } from '@/apps/admin/layouts/AppLayout.tsx'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')).then(
      (page: any) => {
        page.default.layout = page.default.layout || ((page: any) => <AppLayout>{page}</AppLayout>)
        return Promise.resolve(page)
      },
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(<App {...props} />)
  },
  progress: {
    color: '#4B5563',
  },
})
