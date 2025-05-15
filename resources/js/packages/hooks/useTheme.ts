import { createTheme, Input } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export default function useTheme() {
  const [primaryColor, setPrimaryColor] = useLocalStorage<string>({
    key: 'primary-color',
    defaultValue: 'violet',
  })

  const defaultTheme = createTheme({
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
    defaultTheme,
    primaryColor,
    setPrimaryColor,
  }
}
