import { createTheme, Input, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'
import { RouterProvider } from 'react-router'
import './app.css'
import { router } from './router'
export default function App() {
  const [value] = useLocalStorage({
    key: 'primary-color',
    defaultValue: 'violet',
  })

  const theme = createTheme({
    primaryColor: value,
    components: {
      InputWrapper: Input.Wrapper.extend({
        classNames: {
          label: 'break-normal',
        },
      }),
    },
  })

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <NavigationProgress />
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  )
}
