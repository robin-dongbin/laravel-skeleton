import AppLayout from '#admin/layouts/app'
import AuthLayout from '#admin/layouts/auth'
import type {
  AdminLoginError,
  AdminLoginResponse,
  AdminLogoutResponse,
  AdminRequestLogsIndexResponse,
  AdminUsersIndexResponse,
} from '#admin/types/api'
import { userAtom } from '@/hooks/useAuth'
import { request } from '@/lib/request'
import { getDefaultStore } from 'jotai'
import type { ClientActionFunctionArgs, ClientLoaderFunctionArgs, RouteObject } from 'react-router'
import { createBrowserRouter, redirect } from 'react-router'
import Login from './pages/login'

const routes: RouteObject[] = [
  {
    Component: AuthLayout,
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
    Component: AppLayout,
    children: [
      {
        path: '/',
        lazy: {
          Component: async () => (await import('./pages/dashboard')).default,
        },
      },
      {
        path: '/users',
        loader: (args: ClientLoaderFunctionArgs) => request<AdminUsersIndexResponse>(args),
        lazy: {
          Component: async () => (await import('./pages/users')).default,
        },
      },
      {
        path: '/request-logs',
        loader: (args: ClientLoaderFunctionArgs) => request<AdminRequestLogsIndexResponse>(args),
        lazy: {
          Component: async () => (await import('./pages/request-logs')).default,
        },
      },
      {
        path: '/ips',
        loader: (args: ClientLoaderFunctionArgs) => request<AdminRequestLogsIndexResponse>(args),
        lazy: {
          Component: async () => (await import('./pages/ips')).default,
        },
      },
      {
        path: '/settings',
        loader: (args: ClientLoaderFunctionArgs) => request<AdminRequestLogsIndexResponse>(args),
        lazy: {
          Component: async () => (await import('./pages/settings')).default,
        },
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
