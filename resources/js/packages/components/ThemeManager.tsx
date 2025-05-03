import { Icon } from '@iconify/react'
import { ActionIcon, Badge, Button, Fieldset, Popover, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { memo, useCallback } from 'react'

// 将颜色按钮组件抽离并使用 memo
const ColorButton = memo(({ color, isActive, onClick }: { color: string; isActive: boolean; onClick: () => void }) => (
  <Button
    key={color}
    size="xs"
    justify="left"
    variant={isActive ? 'filled' : 'default'}
    onClick={onClick}
    leftSection={<Badge color={color} size="6" circle />}
  >
    {color}
  </Button>
))

ColorButton.displayName = 'ColorButton'

// 将主题按钮组件抽离并使用 memo
const ThemeButton = memo(
  ({
    scheme,
    currentScheme,
    onClick,
    icon,
    label,
  }: {
    scheme: 'light' | 'dark' | 'auto'
    currentScheme: string
    onClick: () => void
    icon: string
    label: string
  }) => (
    <Button
      size="xs"
      justify="left"
      variant={currentScheme === scheme ? 'filled' : 'default'}
      onClick={onClick}
      leftSection={<Icon icon={icon} />}
    >
      {label}
    </Button>
  ),
)

ThemeButton.displayName = 'ThemeButton'

export default function ThemeManager() {
  console.log(123)

  const [, setPrimaryColor] = useLocalStorage({
    key: 'primary-color',
  })
  const theme = useMantineTheme()
  const colors = Object.keys(theme.colors).filter((color) => !['dark', 'gray'].includes(color))
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  // 使用 useCallback 记忆化回调函数
  const handleColorChange = useCallback(
    (color: string) => {
      setPrimaryColor(color)
    },
    [setPrimaryColor],
  )

  const handleSchemeChange = useCallback(
    (scheme: 'light' | 'dark' | 'auto') => {
      setColorScheme(scheme)
    },
    [setColorScheme],
  )

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
              <ColorButton
                key={color}
                color={color}
                isActive={theme.primaryColor === color}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </Fieldset>
        <Fieldset legend="Theme" variant="unstyled" classNames={{ legend: 'mb-1 ml-1 font-medium' }}>
          <div className="grid grid-cols-3 gap-1">
            <ThemeButton
              scheme="light"
              currentScheme={colorScheme}
              onClick={() => handleSchemeChange('light')}
              icon="lucide:sun"
              label="Light"
            />
            <ThemeButton
              scheme="dark"
              currentScheme={colorScheme}
              onClick={() => handleSchemeChange('dark')}
              icon="lucide:moon"
              label="Dark"
            />
            <ThemeButton
              scheme="auto"
              currentScheme={colorScheme}
              onClick={() => handleSchemeChange('auto')}
              icon="lucide:laptop-minimal"
              label="System"
            />
          </div>
        </Fieldset>
      </Popover.Dropdown>
    </Popover>
  )
}
