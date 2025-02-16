import { HeadlessModal } from '@inertiaui/modal-react'
import type { ModalProps as MantineModalProps } from '@mantine/core'
import { Modal as MantineModal } from '@mantine/core'
import React from 'react'

interface Props extends Omit<MantineModalProps, 'opened' | 'onClose'> {
  title: string
  children: React.ReactNode
  [key: string]: any
}

export default function Modal({ title, children, ...props }: Props) {
  return (
    <HeadlessModal {...props}>
      {({ close, isOpen }) => (
        <MantineModal title={title} opened={isOpen} onClose={close} {...props}>
          {children}
        </MantineModal>
      )}
    </HeadlessModal>
  )
}
