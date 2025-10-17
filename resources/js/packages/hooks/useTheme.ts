import { createTheme, Input } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export function useTheme() {
  const [primaryColor, setPrimaryColor] = useLocalStorage<string>({
    key: 'primary-color',
    defaultValue: 'violet',
  })

  const theme = createTheme({
    primaryColor,
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
