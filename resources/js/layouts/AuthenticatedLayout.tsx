import NavLinks from '@/components/Layout/NavLinks'
import { Icon } from '@iconify/react'
import { usePage } from '@inertiajs/react'
import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { navigation } = usePage().props
  const [opened, { toggle }] = useDisclosure()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  return (
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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <UnstyledButton component="a" href="/" className="text-2xl font-bold">
            Application
          </UnstyledButton>
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <Icon icon="lucide:users" />
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLinks links={navigation} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
