import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router'

export default function GuestLayout() {
  return (
    <AppShell header={{ height: 120 }} withBorder={false}>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
