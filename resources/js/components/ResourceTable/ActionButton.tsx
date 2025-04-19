import type { ButtonProps } from '@mantine/core'
import { Button, createPolymorphicComponent } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useState } from 'react'

export interface ActionButtonProps extends ButtonProps {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  href: any
  confirmation?: string | null
}

const ActionButton = createPolymorphicComponent<'button', ActionButtonProps>(
  ({ method, children, confirmation = null, href, ...props }: ActionButtonProps) => {
    const [loading, setLoading] = useState(false)
    async function execute() {
      await $fetch.request(method, href, { body })
    }

    function onClick() {
      if (!confirmation) {
        execute()
        return
      }

      modals.openConfirmModal({
        title: confirmation,
        children: 'Are you sure you would like to do this?',
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: execute,
      })
    }
    return (
      <Button variant="subtle" size="compact-xs" loading={loading} onClick={onClick} {...props}>
        {children}
      </Button>
    )
  },
)

export const DeleteActionButton = ({ href }) => {
  return (
    <ActionButton color="red" href={href} method="delete" confirmation={`Delete record`}>
      Delete
    </ActionButton>
  )
}

export default ActionButton
