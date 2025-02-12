import { usePage } from '@inertiajs/react'
import { Notifications, notifications } from '@mantine/notifications'
import React, { useEffect } from 'react'

export default function FlashMessageWrapper({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props
  useEffect(() => {
    if (!flash.message) return
    notifications.show({
      position: 'top-center',
      message: flash.message,
    })
  }, [flash.message])

  return (
    <>
      <Notifications />
      {children}
    </>
  )
}
