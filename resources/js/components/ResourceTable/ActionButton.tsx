import { Button } from '@mantine/core'

export default function ResourceTableActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="subtle" color="yellow" size="compact-xs">
      {children}
    </Button>
  )
}
