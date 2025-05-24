import UserAvatar from '@/apps/admin/components/Layout/UserAvatar'
import LangManager from '@/packages/components/Layout/LangManager'
import ThemeManager from '@/packages/components/Layout/ThemeManager'
import { AppShell, Burger, ScrollArea, Title, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import NavLinks from './NavLinks'

export default function DashboardLayout() {
  const [opened, { toggle, close }] = useDisclosure()
  const location = useLocation()

  // 监听路径变化来关闭侧边栏
  useEffect(() => {
    close()
  }, [close, location.pathname])

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={{ base: 'md', md: 'xl' }}
    >
      <AppShell.Header className="dark:bg-dark-8 bg-gray-0">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <UnstyledButton component={Link} to="/" className="font-bold">
              <Title order={2}>{import.meta.env.VITE_APP_NAME || 'Admin'}</Title>
            </UnstyledButton>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <LangManager />
              <ThemeManager />
            </div>
            <UserAvatar />
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="dark:bg-dark-8 bg-gray-0" component={ScrollArea}>
        <NavLinks />
      </AppShell.Navbar>
      <AppShell.Main className="flex">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
