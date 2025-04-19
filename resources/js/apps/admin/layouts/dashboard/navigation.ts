export const links = [
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
    label: 'Logs',
    path: '/logs',
    icon: 'lucide:logs',
    children: [
      {
        label: 'Request logs',
        path: '/request-logs',
      },
    ],
  },
  {
    label: 'Preferences',
    path: '/preferences',
    icon: 'lucide:layout-dashboard',
    children: [
      {
        label: 'Ips',
        path: '/ips',
      },
      {
        label: 'Settings',
        path: '/settings',
      },
    ],
  },
]
