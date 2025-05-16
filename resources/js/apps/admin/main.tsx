// organize-imports-ignore
import { scan } from 'react-scan'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './router'
import './bootstrap'
import './i18n'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

scan({ enabled: false })

const queryClient = new QueryClient()

const prefix = import.meta.env.VITE_APP_ROUTE_PREFIX_ADMIN ?? 'admin'

export const router = createBrowserRouter(routes, { basename: `/${prefix}` })

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
