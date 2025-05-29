import useTheme from '@/packages/hooks/useTheme.ts'
import { MantineProvider } from '@mantine/core'

import './app.css'

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const { defaultTheme } = useTheme()

  return <MantineProvider theme={defaultTheme}>{children}</MantineProvider>
}
