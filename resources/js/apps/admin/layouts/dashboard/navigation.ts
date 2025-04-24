import type { NavItem } from '@/types'

export const links: NavItem[] = [
  {
    label: 'dashboard',
    pathname: '/',
    icon: 'lucide:layout-dashboard',
  },
  {
    label: 'user',
    pathname: '/users',
    icon: 'lucide:users',
  },
  {
    label: 'system',
    children: [
      {
        label: 'request',
        pathname: '/request-logs',
        search: '?include=user,ip',
        icon: 'lucide:logs',
      },
      {
        label: 'authentication',
        pathname: '/authentication-logs',
        search: '?include=user,ip',
        icon: 'lucide:logs',
      },
    ],
  },
  {
    label: 'preference',
    children: [
      {
        label: 'ip',
        pathname: '/ips',
        icon: 'lucide:ethernet-port',
      },
      {
        label: 'setting',
        pathname: '/settings',
        icon: 'lucide:settings',
      },
    ],
  },
]
