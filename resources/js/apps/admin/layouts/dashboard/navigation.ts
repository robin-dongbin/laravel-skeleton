import type { NavItem } from '@/types'

export const links: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: 'lucide:layout-dashboard',
  },
  {
    label: 'Users',
    path: '/users',
    icon: 'lucide:users',
  },
  {
    label: 'System',
    children: [
      {
        label: 'Requests',
        path: '/request-logs',
        icon: 'lucide:logs',
      },
      {
        label: 'Authentications',
        path: '/authentication-logs',
        icon: 'lucide:logs',
      },
    ],
  },
  {
    label: 'Preferences',
    children: [
      {
        label: 'Ips',
        path: '/ips',
        icon: 'lucide:ethernet-port',
      },
      {
        label: 'Settings',
        path: '/settings',
        icon: 'lucide:settings',
      },
    ],
  },
]
