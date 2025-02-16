import type { Method } from '@inertiajs/core'
import { router } from '@inertiajs/react'
import { useModalStack } from '@inertiaui/modal-react'
import type { ButtonProps } from '@mantine/core'
import { Button, createPolymorphicComponent, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export interface ActionButtonProps extends ButtonProps {
  href: string
  method?: Method
  confirmation?: string | null
  modal?: boolean
}

const ActionButton = createPolymorphicComponent<'button', ActionButtonProps>(
  ({ children, href, method = 'get', modal = false, confirmation = null, ...props }: ActionButtonProps) => {
    const modalStack = useModalStack()
    function openModal() {
      modals.openConfirmModal({
        title: 'Confirmation',
        children: <Text size="sm">{confirmation}</Text>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: execute,
      })
    }
    function execute() {
      if (modal) {
        console.log(11)
        modalStack.visitModal(href)
      } else {
        router.visit(href, {
          method,
          preserveScroll: true,
        })
      }
    }

    function onClick() {
      if (confirmation) {
        openModal()
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
