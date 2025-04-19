import { Icon } from '@iconify/react'
import { ActionIcon, Badge, Button, Fieldset, Popover, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export default function ThemeManager() {
  const [, setPrimaryColor] = useLocalStorage({
    key: 'primary-color',
  })
  const theme = useMantineTheme()
  const colors = Object.keys(theme.colors).filter((color) => !['dark', 'gray'].includes(color))

  const { colorScheme, setColorScheme } = useMantineColorScheme()

  return (
    <Popover withArrow>
      <Popover.Target>
        <ActionIcon variant="subtle" size="lg" radius="xl" color="none" className="text-xl">
          <Icon icon="lucide:palette" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown className="flex flex-col gap-2 p-2">
        <Fieldset legend="Primary" variant="unstyled" classNames={{ legend: 'mb-1 ml-1 font-medium' }}>
          <div className="grid grid-cols-3 gap-1">
            {colors.map((color) => (
              <Button
                key={color}
                size="xs"
                justify="left"
                variant={theme.primaryColor === color ? 'filled' : 'default'}
                onClick={() => setPrimaryColor(color)}
                leftSection={<Badge color={color} size="6" circle />}
              >
                {color}
              </Button>
            ))}
          </div>
        </Fieldset>
        <Fieldset legend="Theme" variant="unstyled" classNames={{ legend: 'mb-1 ml-1 font-medium' }}>
          <div className="grid grid-cols-3 gap-1">
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
          </div>
        </Fieldset>
      </Popover.Dropdown>
    </Popover>
  )
}
