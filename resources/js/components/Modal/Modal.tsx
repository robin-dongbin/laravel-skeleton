import type { ModalProps as MantineModalProps } from '@mantine/core'
import { Modal as MantineModal } from '@mantine/core'
import { useModal } from 'inertia-routed-modals-react'
import React from 'react'

interface Props extends Omit<MantineModalProps, 'opened' | 'onClose'> {
  title: string
  children: React.ReactNode
  [key: string]: any
}

const Modal = ({ title, children, ...props }: Props) => {
  const { open, close } = useModal()
  return (
    <MantineModal title={title} opened={open} onClose={close} {...props}>
      {children}
    </MantineModal>
  )
}

export const EditModal = ({ title, children, ...props }: Omit<Props, 'title'>) => {
  return (
    <Modal title="Edit record" {...props}>
      {children}
    </Modal>
  )
}

export default Modal
