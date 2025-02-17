import type { Visit } from '@inertiajs/core'
import { router } from '@inertiajs/react'
import type { ButtonProps } from '@mantine/core'
import { Button, createPolymorphicComponent } from '@mantine/core'
import { modals } from '@mantine/modals'

export interface ActionButtonProps extends ButtonProps, Partial<Visit> {
  href: string
  confirmation?: string | null
}

const emptyObject = {}
const emptyArray = []

const ActionButton = createPolymorphicComponent<'button', ActionButtonProps>(
  ({
    children,
    confirmation = null,
    href,
    method = 'get',
    data = emptyObject,
    only = emptyArray,
    except = emptyArray,
    ...props
  }: ActionButtonProps) => {
    function execute() {
      router.visit(href, {
        method,
        data,
        only,
        except,
      })
    }

    function onClick() {
      if (!confirmation) {
        execute()
        return
      }

      modals.openConfirmModal({
        title: 'Confirmation',
        children: confirmation,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: execute,
      })
    }
    return (
      <Button variant="subtle" size="compact-xs" onClick={onClick} {...props}>
        {children}
      </Button>
    )
  },
)

export default ActionButton
