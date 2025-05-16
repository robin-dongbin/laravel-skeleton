import ErrorBoundary from '@/packages/components/ErrorBoundary'
import HydrateFallback from '@/packages/components/HydrateFallback'
import { auth, guest } from '@/packages/libs/middleware'
import type { RouteObject } from 'react-router'
import Root from './Root.tsx'
import Guest from './layouts/guest.tsx'

const crud = (name: string) => ({
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
        action: async () => (await import(`./pages/${name}/show.tsx`)).clientAction,
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
})

export const routes: RouteObject[] = [
  {
    Component: Root,
    children: [
      {
        HydrateFallback,
        ErrorBoundary,
        children: [
          {
            Component: Guest,
            loader: () => {},
            unstable_middleware: [guest],
            children: [
              {
                path: '/login',
                lazy: {
                  Component: async () => (await import(`./pages/login`)).default,
                },
              },
            ],
          },
          {
            id: 'authenticated',
            lazy: {
              Component: async () => (await import('./layouts/dashboard')).default,
              loader: async () => (await import('./layouts/dashboard')).clientLoader as any,
            },
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
