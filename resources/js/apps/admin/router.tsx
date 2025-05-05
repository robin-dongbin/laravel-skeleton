import ErrorBoundary from '@/packages/components/ErrorBoundary'
import HydrateFallback from '@/packages/components/HydrateFallback'
import { auth, guest } from '@/packages/libs/middleware'
import type { RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router'
import AuthLayout from './layouts/auth'
import DashboardLayout from './layouts/dashboard'
import Root from './Root.tsx'

function crud(name: string) {
  return {
    path: name,
    lazy: {
      Component: async () => (await import(`./pages/${name}/index.tsx`)).default,
      loader: async () => (await import(`./pages/${name}/index.tsx`)).clientLoader,
      action: async () => (await import(`./pages/${name}/index.tsx`)).clientAction,
    },
    children: [
      {
        path: 'create',
        lazy: {
          Component: async () => (await import(`./pages/${name}/create.tsx`)).default,
        },
      },
      {
        path: ':id',
        lazy: {
          Component: async () => (await import(`./pages/${name}/show.tsx`)).default,
          loader: async () => (await import(`./pages/${name}/show.tsx`)).clientLoader,
          action: async () => (await import(`./pages/${name}/index.tsx`)).clientAction,
        },
        children: [
          {
            path: 'edit',
            lazy: {
              Component: async () => (await import(`./pages/${name}/edit.tsx`)).default,
              loader: async () => (await import(`./pages/${name}/edit.tsx`)).clientLoader,
            },
          },
        ],
      },
    ],
  }
}

const routes: RouteObject[] = [
  {
    Component: Root,
    children: [
      {
        HydrateFallback,
        ErrorBoundary,
        children: [
          {
            Component: AuthLayout,
            loader: () => {},
            unstable_middleware: [guest],
            children: [
              {
                path: '/login',
                lazy: {
                  Component: async () => (await import(`./pages/login.tsx`)).default,
                  action: async () => (await import(`./pages/login.tsx`)).clientAction,
                },
              },
            ],
          },
          {
            Component: DashboardLayout,
            loader: () => {},
            unstable_middleware: [auth],
            children: [
              {
                index: true,
                lazy: {
                  Component: async () => (await import('./pages/dashboard')).default,
                },
              },
              crud('users'),
              crud('roles'),
              crud('request-logs'),
              crud('authentication-logs'),
              crud('ips'),
              crud('media'),
              {
                path: 'settings',
                lazy: {
                  Component: async () => (await import('./pages/settings')).default,
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes, { basename: '/admin' })
