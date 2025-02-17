import type { Visit } from '@inertiajs/core'
import { router } from '@inertiajs/react'
import type { ButtonProps } from '@mantine/core'
import { Button, createPolymorphicComponent } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useState } from 'react'

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
    const [loading, setLoading] = useState(false)
    function execute() {
      router.visit(href, {
        method,
        data,
        only,
        except,
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
      })
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
