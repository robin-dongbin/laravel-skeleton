import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router'

export default function Layout() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.state === 'loading' ? nprogress.start() : nprogress.complete()
  }, [navigation])

  return (
    <>
      <Notifications />
      <NavigationProgress />
      <ModalsProvider>
        <Outlet />
      </ModalsProvider>
    </>
  )
}
