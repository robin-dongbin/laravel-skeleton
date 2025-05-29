import { DrawersProvider } from '@/packages/drawers'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress, nprogress } from '@mantine/nprogress'

import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router'
import './app.css'

export default function Root() {
  const navigation = useNavigation()
  useEffect(() => {
    if (navigation.state === 'loading') {
      nprogress.start()
    } else {
      nprogress.complete()
    }
  }, [navigation.state])

  return (
    <>
      <Notifications />
      <NavigationProgress />
      <ModalsProvider>
        <DrawersProvider>
          <Outlet />
        </DrawersProvider>
      </ModalsProvider>
    </>
  )
}
