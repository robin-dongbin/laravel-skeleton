import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, usePage } from '@inertiajs/react'
import { Avatar, Menu } from '@mantine/core'

export default function UserAvatar() {
  const { auth } = usePage().props
  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <Avatar name={auth.user.username} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon icon="lucide:user" />} className="pointer-events-none">
          {auth.user.username}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          component={Link}
          href={route('admin.logout')}
          method="post"
          leftSection={<Icon icon="lucide:log-out" />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
