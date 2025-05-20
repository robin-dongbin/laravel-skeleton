import useAuth from '@/apps/admin/hooks/useAuth'
import { Icon } from '@iconify/react'
import { Avatar, Menu, UnstyledButton } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export default function UserAvatar() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <UnstyledButton>
          <Avatar src={user?.avatar} name={user.nickname} size="md" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon icon="lucide:user" />} className="pointer-events-none">
          {user.nickname}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<Icon icon="lucide:log-out" />} onClick={logout}>
          {t('actions.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
