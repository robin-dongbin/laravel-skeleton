import ErrorBoundary from '@/packages/components/ErrorBoundary'
import HydrateFallback from '@/packages/components/HydrateFallback'
import { auth, guest } from '@/packages/lib/middleware'
import { $fetch } from '@/packages/lib/request.ts'
import admin from '@/routes/admin'
import type { AdminLogoutResponse } from '@admin/types/api'
import type { ClientActionFunctionArgs, RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router'
import AppLayout from './layouts/app'
import AuthLayout from './layouts/auth'
import DashboardLayout from './layouts/dashboard'

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
    Component: AppLayout,
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
  {
    path: '/logout',
    action: ({ request }: ClientActionFunctionArgs) => $fetch<AdminLogoutResponse>(admin.logout(), request),
  },
  {
    path: '/user',
    loader: ({ request }: ClientActionFunctionArgs) => $fetch(admin.user.show(), request),
  },
]

export const router = createBrowserRouter(routes, { basename: '/21232f297a57a5a743894a0e4a801fc3' })
