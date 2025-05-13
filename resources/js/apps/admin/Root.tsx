import useTheme from '@/packages/hooks/useTheme.ts'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router'
import './app.css'

const queryClient = new QueryClient()

export default function Root() {
  const { defaultTheme } = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'loading') {
      nprogress.start()
    } else {
      nprogress.complete()
    }
  }, [navigation.state])

  return (
    <MantineProvider theme={defaultTheme}>
      <Notifications />
      <NavigationProgress />
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <Outlet />
        </ModalsProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
