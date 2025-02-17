import { EditModal } from '@/components/Modal/Modal'
import { TextInput } from '@mantine/core'

export default function Edit({ user }) {
  return (
    <EditModal size="xl">
      <form action="">
        <TextInput defaultValue={user?.username} />
      </form>
    </EditModal>
  )
}
