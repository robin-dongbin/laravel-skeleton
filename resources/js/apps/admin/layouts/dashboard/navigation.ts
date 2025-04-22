import type { NavItem } from '@/types'

export const links: NavItem[] = [
  {
    label: 'dashboard',
    path: '/',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    label: 'user',
    path: '/users',
    icon: 'i-lucide-users',
  },
  {
    label: 'system',
    children: [
      {
        label: 'request',
        path: '/request-logs',
        icon: 'i-lucide-logs',
      },
      {
        label: 'authentication',
        path: '/authentication-logs',
        icon: 'i-lucide-logs',
      },
    ],
  },
  {
    label: 'preference',
    children: [
      {
        label: 'ip',
        path: '/ips',
        icon: 'i-lucide-ethernet-port',
      },
      {
        label: 'setting',
        path: '/settings',
        icon: 'i-lucide-settings',
      },
    ],
  },
]
