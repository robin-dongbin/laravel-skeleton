import { Button, type ButtonProps, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useTranslation } from 'react-i18next'

export default function ActionButton({
  children,
  confirmRequired = false,
  confirmContent,
  onClick,
  ...props
}: { confirmRequired?: boolean; confirmContent?: React.ReactNode; onClick: () => void } & ButtonProps) {
  const { t } = useTranslation()

  const openModal = () =>
    modals.openConfirmModal({
      zIndex: 1000,
      title: t('please_confirm_your_action'),
      children: confirmContent || (
        <Text size="sm">{t('this_action_is_so_important_that_you_are_required_to_confirm_it')}</Text>
      ),
      labels: { confirm: t('actions.confirm'), cancel: t('actions.cancel') },
      onConfirm: onClick,
    })

  const _onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (confirmRequired) {
      openModal()
    } else {
      onClick()
    }
  }

  return (
    <Button size="compact-xs" variant="light" {...props} onClick={_onClick}>
      {children}
    </Button>
  )
}
