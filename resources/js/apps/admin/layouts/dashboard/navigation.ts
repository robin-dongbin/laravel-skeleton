import type { NavItem } from '@/types'

export const links: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    label: 'Users',
    path: '/users',
    icon: 'i-lucide-users',
  },
  {
    label: 'System',
    children: [
      {
        label: 'Requests',
        path: '/request-logs',
        icon: 'i-lucide-logs',
      },
      {
        label: 'Authentications',
        path: '/authentication-logs',
        icon: 'i-lucide-logs',
      },
    ],
  },
  {
    label: 'Preferences',
    children: [
      {
        label: 'Ips',
        path: '/ips',
        icon: 'i-lucide-ethernet-port',
      },
      {
        label: 'Settings',
        path: '/settings',
        icon: 'i-lucide-settings',
      },
    ],
  },
]
