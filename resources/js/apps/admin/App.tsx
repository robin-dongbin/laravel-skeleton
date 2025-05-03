import useTheme from '@/packages/hooks/useTheme.ts'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'
import { RouterProvider } from 'react-router'
import './app.css'
import { router } from './router'
export default function App() {
  const { defaultTheme } = useTheme()

  return (
    <MantineProvider theme={defaultTheme}>
      <Notifications />
      <NavigationProgress />
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  )
}
