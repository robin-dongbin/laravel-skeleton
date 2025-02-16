import type { Method } from '@inertiajs/core'
import { router } from '@inertiajs/react'
import type { ButtonProps } from '@mantine/core'
import { Button, createPolymorphicComponent, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export interface ActionButtonProps extends ButtonProps {
  href: string
  method?: Method
  confirmation?: string | null
}

const ActionButton = createPolymorphicComponent<'button', ActionButtonProps>(
  ({ children, href, method = 'get', confirmation = null, ...props }: ActionButtonProps) => {
    function execute() {
      router.visit(href, {
        method,
        preserveScroll: true,
      })
    }

    function onClick() {
      if (confirmation) {
        modals.openConfirmModal({
          title: 'Confirmation',
          children: <Text size="sm">{confirmation}</Text>,
          labels: { confirm: 'Confirm', cancel: 'Cancel' },
          onConfirm: execute,
        })
      } else {
        execute()
      }
    }
    return (
      <Button variant="subtle" size="compact-xs" onClick={onClick} {...props}>
        {children}
      </Button>
    )
  },
)

export default ActionButton
