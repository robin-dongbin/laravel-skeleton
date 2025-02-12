import NavLinks from '@/components/Layout/NavLinks'
import FlashMessageWrapper from '@/layouts/FlashMessageWrapper'
import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'
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

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { navigation } = usePage().props
  const [opened, { toggle }] = useDisclosure()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })
  console.log(navigation)
  return (
    <FlashMessageWrapper>
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
            <UnstyledButton component={Link} href={route('admin.home')} className="text-2xl font-bold">
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
    </FlashMessageWrapper>
  )
}
