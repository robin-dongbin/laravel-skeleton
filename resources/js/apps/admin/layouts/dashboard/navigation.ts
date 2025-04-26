import type { NavItem } from '@/types'

export const links: NavItem[] = [
  {
    label: 'dashboard',
    pathname: '/',
    icon: 'lucide:layout-dashboard',
  },

  {
    label: 'user',
    children: [
      {
        label: 'user',
        pathname: '/users',
        icon: 'lucide:users',
      },
      {
        label: 'authentication',
        pathname: '/authentication-logs',
        search: '?include=user,ip',
        icon: 'lucide:id-card',
      },
    ],
  },
  {
    label: 'system',
    children: [
      {
        label: 'request',
        pathname: '/request-logs',
        search: '?include=user,ip',
        icon: 'lucide:arrow-right-left',
      },
    ],
  },
  {
    label: 'preference',
    children: [
      {
        label: 'ip',
        pathname: '/ips',
        icon: 'lucide:map-pin-house',
      },
      {
        label: 'setting',
        pathname: '/settings',
        icon: 'lucide:settings',
      },
    ],
  },
]
