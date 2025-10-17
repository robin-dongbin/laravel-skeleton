import { Providers } from '@/apps/admin/layouts/Providers.tsx'
import LangManager from '@/packages/components/Layout/LangManager.tsx'
import ThemeManager from '@/packages/components/Layout/ThemeManager.tsx'
import { Link } from '@inertiajs/react'
import { AppShell, Box, Burger, Flex, ScrollArea, Title, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure()

  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding={{ base: 'md', md: 'xl' }}
      >
        <AppShell.Header bg="base.9">
          <Flex justify="space-between" align="center" h="100%" px="md">
            <Flex align="center" gap="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <UnstyledButton component={Link} href="/">
                <Title order={2}>{document.title || 'Admin'}</Title>
              </UnstyledButton>
            </Flex>
            <Box>
              <LangManager />
              <ThemeManager />
            </Box>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar bg="base.9" p="md" component={ScrollArea}></AppShell.Navbar>
        <AppShell.Main className="flex" bg="base.8">
          {children}
        </AppShell.Main>
      </AppShell>
    </Providers>
  )
}
