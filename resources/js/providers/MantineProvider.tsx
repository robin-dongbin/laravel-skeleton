import { createTheme, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import React from 'react'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [value] = useLocalStorage({
    key: 'mantine-primary-color',
    defaultValue: 'violet',
  })

  const theme = createTheme({
    primaryColor: value,
  })

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
