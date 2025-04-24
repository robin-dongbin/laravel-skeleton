import { AppShell, Burger, Title, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import NavLinks from './NavLinks'
import ThemeManager from './ThemeManager'
import UserAvatar from './UserAvatar'

// export async function clientLoader() {
//   const user = store.get(userAtom)
//   if (!user) {
//     return redirect('/login')
//   }
//   return user
// }

export default function DashboardLayout() {
  const [opened, { toggle, close }] = useDisclosure()
  const location = useLocation()

  // 监听路径变化来关闭侧边栏
  useEffect(() => {
    close()
  }, [location.pathname])

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="xl"
    >
      <AppShell.Header className="dark:bg-dark-8 bg-gray-0">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <UnstyledButton component={Link} to="/" className="font-bold">
              <Title order={2}>Application</Title>
            </UnstyledButton>
          </div>
          <div className="flex items-center gap-4">
            <ThemeManager />
            <UserAvatar />
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="dark:bg-dark-8 bg-gray-0">
        <NavLinks />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
