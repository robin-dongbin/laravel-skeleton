import FlashMessageWrapper from '@/layouts/FlashMessageWrapper'
import { AppShell } from '@mantine/core'
import React from 'react'

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlashMessageWrapper>
      <AppShell header={{ height: 120 }} withBorder={false}>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </FlashMessageWrapper>
  )
}
