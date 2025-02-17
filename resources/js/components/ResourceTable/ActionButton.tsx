import type { Method } from '@inertiajs/core'
import type { InertiaLinkProps } from '@inertiajs/react'
import { Link, router } from '@inertiajs/react'
import type { ButtonProps } from '@mantine/core'
import { Button, createPolymorphicComponent } from '@mantine/core'
import { modals } from '@mantine/modals'
import React from 'react'

export interface ActionButtonProps extends ButtonProps, Omit<InertiaLinkProps, 'color' | 'size' | 'style'> {
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

    function onClick(e: React.MouseEvent) {
      if (confirmation) {
        e.preventDefault()
        modals.openConfirmModal({
          title: 'Confirmation',
          children: confirmation,
          labels: { confirm: 'Confirm', cancel: 'Cancel' },
          onConfirm: execute,
        })
      }
    }
    return (
      <Button
        variant="subtle"
        size="compact-xs"
        component={Link}
        href={href}
        method={method}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

export default ActionButton
