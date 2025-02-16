import Modal from '@/components/Modal'
import { TextInput } from '@mantine/core'

export default function Edit({ user }) {
  return (
    <Modal title={'Edit User'} size="xl">
      <form action="">
        <TextInput defaultValue={user?.username} />
      </form>
    </Modal>
  )
}
