import type { Method } from '@inertiajs/core'
import { router } from '@inertiajs/react'
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export interface ActionButtonProps {
  label: string
  color: string
  url: string
  method: Method
  confirmation: string | null
}

export default function ResourceTableActionButton({ color, url, method, confirmation, label }: ActionButtonProps) {
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
      {label}
    </Button>
  )
}
