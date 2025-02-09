import { AppShell } from '@mantine/core'
import React from 'react'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell header={{ height: 120 }} withBorder={false}>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
