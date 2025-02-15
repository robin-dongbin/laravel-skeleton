import { Head, router, usePage } from '@inertiajs/react'
import { useTimeout } from '@mantine/hooks'
import { Notifications, notifications } from '@mantine/notifications'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import React, { useEffect } from 'react'

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  const { app, flash } = usePage().props
  useEffect(() => {
    if (!flash.message) return
    notifications.show({
      position: 'top-center',
      message: flash.message,
    })
  }, [flash.message])

  const { start, clear } = useTimeout(() => nprogress.start(), 200)

  router.on('start', () => start())
  router.on('finish', (event) => {
    clear()
    if (event.detail.visit.completed) {
      nprogress.complete()
    } else if (event.detail.visit.interrupted) {
      nprogress.reset()
    } else if (event.detail.visit.cancelled) {
      nprogress.complete()
      nprogress.cleanup()
    }
  })

  return (
    <>
      <Head>
        <title>{app.title}</title>
      </Head>
      <Notifications />
      <NavigationProgress />
      {children}
    </>
  )
}
