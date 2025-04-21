import Icon from '@/packages/components/Icon'
import useAuth from '@/packages/hooks/useAuth'
import { Avatar, Menu, UnstyledButton } from '@mantine/core'

export default function UserAvatar() {
  const { user, logout } = useAuth()

  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <UnstyledButton>
          <Avatar name={user?.username} size="md" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon icon="i-lucide-user" />} className="pointer-events-none">
          {user?.username}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<Icon icon="i-lucide-log-out" />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
