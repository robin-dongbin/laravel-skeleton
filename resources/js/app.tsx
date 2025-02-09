// import './bootstrap'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { createInertiaApp } from '@inertiajs/react'
import { createTheme, MantineProvider } from '@mantine/core'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react'
import { createRoot } from 'react-dom/client'

import '../css/app.css'

const theme = createTheme({
  primaryColor: 'violet',
})

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
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <App {...props} />
      </MantineProvider>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})
