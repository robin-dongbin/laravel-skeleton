import { useTheme } from '@/packages/hooks/useTheme.ts'
import { Icon } from '@iconify/react'
import {
  ActionIcon,
  Badge,
  Button,
  Popover,
  SimpleGrid,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'

const ColorSchemeButtonGroup = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  return (
    <SimpleGrid cols={3} spacing={4}>
      <Button
        size="xs"
        justify="left"
        variant={colorScheme === 'light' ? 'filled' : 'default'}
        onClick={() => setColorScheme('light')}
        leftSection={<Icon icon="lucide:sun" />}
      >
        Light
      </Button>
      <Button
        size="xs"
        justify="left"
        variant={colorScheme === 'dark' ? 'filled' : 'default'}
        onClick={() => setColorScheme('dark')}
        leftSection={<Icon icon="lucide:moon" />}
      >
        Dark
      </Button>
      <Button
        size="xs"
        justify="left"
        variant={colorScheme === 'auto' ? 'filled' : 'default'}
        onClick={() => setColorScheme('auto')}
        leftSection={<Icon icon="lucide:laptop-minimal" />}
      >
        System
      </Button>
    </SimpleGrid>
  )
}

const ThemeButtonGroup = () => {
  const theme = useMantineTheme()

  const { primaryColor, setPrimaryColor } = useTheme()

  const colors = Object.keys(theme.colors).filter((color) => !['dark', 'gray'].includes(color))

  return colors.map((color) => (
    <Button
      key={color}
      size="xs"
      justify="left"
      variant={primaryColor === color ? 'filled' : 'default'}
      onClick={() => setPrimaryColor(color)}
      leftSection={<Badge color={color} size="6" circle />}
    >
      {color}
    </Button>
  ))
}

export default function ThemeManager() {
  return (
    <Popover withArrow offset={{ mainAxis: 10, crossAxis: -100 }}>
      <Popover.Target>
        <ActionIcon variant="subtle" size="lg" radius="xl" color="none">
          <Icon icon="lucide:palette" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <div>
          <Title order={6} size="xs">
            Primary
          </Title>
          <SimpleGrid cols={3} mt="xs" spacing={4} verticalSpacing={4}>
            <ThemeButtonGroup />
          </SimpleGrid>
        </div>
        <div>
          <Title order={6} size="xs" my="xs">
            Theme
          </Title>
          <ColorSchemeButtonGroup />
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
