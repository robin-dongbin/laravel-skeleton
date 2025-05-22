import EditUser from '@/apps/admin/pages/users/Edit.tsx'
import type { components } from '@/types/admin'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

export default function UserField({ user }: { user?: components['schemas']['UserResource'] | null }) {
  return (
    user && (
      <Button
        size="compact-xs"
        variant="subtle"
        onClick={() => {
          modals.open({
            title: user.nickname,
            children: <EditUser user={user} />,
          })
        }}
      >
        {user.nickname}
      </Button>
    )
  )
}
