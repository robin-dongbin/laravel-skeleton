import type { Method } from '@inertiajs/core'
import { router } from '@inertiajs/react'
import type { ButtonProps } from '@mantine/core'
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export interface ActionButtonProps extends ButtonProps {
  url: string
  method?: Method
  confirmation?: string | null
}

export default function ActionButton({ color, url, method = 'get', confirmation, children }: ActionButtonProps) {
  function openModal() {
    modals.openConfirmModal({
      title: 'Confirmation',
      children: <Text size="sm">{confirmation}</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: execute,
    })
  }
  function execute() {
    router.visit(url, {
      method,
      preserveScroll: true,
    })
  }

  function onClick() {
    if (confirmation) {
      openModal()
    } else {
      execute()
    }
  }
  return (
    <Button variant="subtle" color={color} size="compact-xs" onClick={onClick}>
      {children}
    </Button>
  )
}
