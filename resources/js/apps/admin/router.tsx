import type { AdminLoginError, AdminLoginResponse, AdminLogoutResponse } from '#admin/types/api'
import ErrorBoundary from '@/packages/components/ErrorBoundary'
import HydrateFallback from '@/packages/components/HydrateFallback'
import { userAtom } from '@/packages/hooks/useAuth'
import { auth, guest } from '@/packages/lib/middleware'
import { request } from '@/packages/lib/request'
import { pluralize } from 'inflected'
import { getDefaultStore } from 'jotai'
import type { ClientActionFunctionArgs, ClientLoaderFunctionArgs, RouteObject } from 'react-router'
import { createBrowserRouter, redirect } from 'react-router'
import AppLayout from './layouts/app'
import AuthLayout from './layouts/auth'
import DashboardLayout from './layouts/dashboard'
import Login from './pages/login'

function crud(name: string) {
  const plural = pluralize(name)

  return [
    {
      path: plural,
      action: (args: ClientActionFunctionArgs) => request(args),
      lazy: {
        Component: async () => (await import(`./pages/${plural}/index`)).default,
        loader: async () => (await import(`./pages/${plural}/index`)).clientLoader,
      },
      children: [
        {
          path: 'create',
          lazy: {
            Component: async () => (await import(`./pages/${plural}/create`)).default,
          },
        },
        {
          path: ':id',
          action: (args: ClientActionFunctionArgs) => request(args),
          lazy: {
            Component: async () => (await import(`./pages/${plural}/show`)).default,
            loader: async () => (await import(`./pages/${plural}/show`)).clientLoader,
          },
          children: [
            {
              path: 'edit',
              lazy: {
                Component: async () => (await import(`./pages/${plural}/edit`)).default,
                loader: async () => (await import(`./pages/${plural}/edit`)).clientLoader,
              },
            },
          ],
        },
      ],
    },
  ]
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
            action: async (args: ClientLoaderFunctionArgs) => {
              const { data, error } = await request<AdminLoginResponse, AdminLoginError>(args)

              if (error) {
                return error
              }

              localStorage.setItem('token', data!.meta.token)

              const store = getDefaultStore()
              store.set(userAtom, data!.data)

              return redirect('/')
            },
            Component: Login,
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
          ...crud('users'),
          ...crud('request-logs'),
          ...crud('authentication-logs'),
          ...crud('ips'),
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
    action: (args: ClientActionFunctionArgs) => request<AdminLogoutResponse>(args),
  },
  {
    path: '/user',
    loader: (args: ClientActionFunctionArgs) => request(args),
  },
]

export const router = createBrowserRouter(routes, { basename: '/admin' })
