import { createTheme, Input } from '@mantine/core'
import { useAtom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

export const primaryColorAtom = atomWithStorage<string>('primary-color', 'violet', createJSONStorage<string>(), {
  getOnInit: true,
})

export default function useTheme() {
  const [primaryColor, setPrimaryColor] = useAtom(primaryColorAtom)

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
