import {
  Button,
  type ButtonProps,
  Group,
  Modal,
  Text,
  useModalsStack,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'

export default function ActionButton({
  children,
  confirmRequired = false,
  confirmContent,
  onClick,
  ...props
}: {
  confirmRequired?: boolean
  confirmContent?: React.ReactNode
  onClick: () => void
} & ButtonProps) {
  const { t } = useTranslation()

  const stack = useModalsStack(['confirm-action'])

  const renderConfirmationModal = () => (
    <Modal.Stack>
      <Modal
        {...stack.register('confirm-action')}
        title={t('please_confirm_your_action')}
        zIndex={1000}
        onClick={(e) => e.stopPropagation()}
      >
        {confirmContent || (
          <Text size="sm">
            {t(
              'this_action_is_so_important_that_you_are_required_to_confirm_it',
            )}
          </Text>
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={stack.closeAll}>
            {t('actions.cancel')}
          </Button>
          <Button
            onClick={() => {
              onClick()
              stack.closeAll()
            }}
          >
            {t('actions.confirm')}
          </Button>
        </Group>
      </Modal>
    </Modal.Stack>
  )

  const _onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (confirmRequired) {
      stack.open('confirm-action')
    } else {
      onClick()
    }
  }

  return (
    <>
      <Button size="compact-xs" variant="light" {...props} onClick={_onClick}>
        {children}
      </Button>
      {confirmRequired && renderConfirmationModal()}
    </>
  )
}
