import type { NavItem } from '@/types'

export const links: NavItem[] = [
  {
    label: 'dashboard',
    pathname: '/',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    label: 'user',
    pathname: '/users',
    icon: 'i-lucide-users',
  },
  {
    label: 'system',
    children: [
      {
        label: 'request',
        pathname: '/request-logs',
        search: '?include=user,ip',
        icon: 'i-lucide-logs',
      },
      {
        label: 'authentication',
        pathname: '/authentication-logs',
        icon: 'i-lucide-logs',
      },
    ],
  },
  {
    label: 'preference',
    children: [
      {
        label: 'ip',
        pathname: '/ips',
        icon: 'i-lucide-ethernet-port',
      },
      {
        label: 'setting',
        pathname: '/settings',
        icon: 'i-lucide-settings',
      },
    ],
  },
]
