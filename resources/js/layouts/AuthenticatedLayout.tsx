import NavLinks from '@/components/Layout/NavLinks'
import ThemeToggle from '@/components/Layout/ThemeManager'
import UserAvatar from '@/components/Layout/UserAvatar'
import BlankLayout from '@/layouts/BlankLayout'
import { Link, usePage } from '@inertiajs/react'
import { AppShell, Burger, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { navigation } = usePage().props
  const [opened, { toggle }] = useDisclosure()

  return (
    <BlankLayout>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div className="flex h-full items-center justify-between px-4">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <UnstyledButton component={Link} href={route('admin.home')} className="text-2xl font-bold">
              Application
            </UnstyledButton>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserAvatar />
            </div>
          </div>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLinks links={navigation} />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </BlankLayout>
  )
}
