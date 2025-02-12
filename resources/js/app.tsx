// import './bootstrap'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import MantineProvider from '@/providers/MantineProvider'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react'
import { createRoot } from 'react-dom/client'

import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')).then((page: any) => {
      page.default.layout = page.default.layout || ((page: React.ReactNode) => <AuthenticatedLayout children={page} />)
      return Promise.resolve(page)
    }),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <MantineProvider>
        <App {...props} />
      </MantineProvider>,
    )
  },
  progress: false,
})
