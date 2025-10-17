import { useTheme } from '@/packages/hooks/useTheme.ts'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
