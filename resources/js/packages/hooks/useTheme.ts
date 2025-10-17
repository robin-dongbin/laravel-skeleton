import { colorsTuple, createTheme, DEFAULT_THEME, Input, virtualColor } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export function useTheme() {
  const [primaryColor, setPrimaryColor] = useLocalStorage<string>({
    key: 'primary-color',
    defaultValue: 'violet',
  })

  console.log(DEFAULT_THEME)
  const theme = createTheme({
    primaryColor,
    colors: {
      light: colorsTuple(DEFAULT_THEME.colors.gray.toReversed()),
      base: virtualColor({
        name: 'base',
        dark: 'dark',
        light: 'light',
      }),
    },
    components: {
      InputWrapper: Input.Wrapper.extend({
        classNames: {
          label: 'break-normal',
        },
      }),
    },
  })

  return {
    theme,
    primaryColor,
    setPrimaryColor,
  }
}
