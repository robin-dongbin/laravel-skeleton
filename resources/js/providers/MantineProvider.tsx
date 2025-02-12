import { createTheme, MantineProvider } from '@mantine/core'
import React from 'react'

const theme = createTheme({
  primaryColor: 'violet',
})

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  )
}
