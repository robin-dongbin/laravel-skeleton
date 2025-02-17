import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import MantineProvider from '@/providers/MantineProvider'
import { createInertiaApp } from '@inertiajs/react'
import { RoutedModalsProvider } from 'inertia-routed-modals-react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './bootstrap'

import '../css/app.css'

createInertiaApp({
  title: (title) => title,
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')).then((page: any) => {
      page.default.layout = page.default.layout || ((page: React.ReactNode) => <AuthenticatedLayout children={page} />)
      return Promise.resolve(page)
    }),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(
      <MantineProvider>
        <RoutedModalsProvider
          resolve={(name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'))}
        >
          <App {...props} />
        </RoutedModalsProvider>
      </MantineProvider>,
    )
  },
  progress: false,
})
