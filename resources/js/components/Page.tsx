import { router, usePage } from '@inertiajs/react'
import { Title, UnstyledButton } from '@mantine/core'
import React from 'react'

export default function Page({ children, actions }: { children: React.ReactNode; actions?: React.ReactNode }) {
  const { navigation } = usePage().props

  const title = navigation.find((item) => item.active).title

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <UnstyledButton onClick={() => router.get(window.location.pathname, {}, { replace: true })}>
          <Title order={2}>{title}</Title>
        </UnstyledButton>
        <div>{actions}</div>
      </div>
      {children}
    </>
  )
}
