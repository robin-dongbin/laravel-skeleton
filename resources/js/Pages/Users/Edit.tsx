import { EditModal } from '@/components/Modal/Modal'
import { useForm } from '@/hooks/use-form'
import { Button, TextInput } from '@mantine/core'
import { useModal } from 'inertia-routed-modals-react'

export default function Edit({ user }) {
  const form = useForm({
    method: 'put',
    url: route('admin.users.update', [user.id]),
    initialValues: {
      username: user.username,
      nickname: user.nickname,
    },
  })

  const { close } = useModal()

  return (
    <EditModal>
      <form onSubmit={form.submit}>
        <TextInput label="Username" {...form.getInputProps('username')} />
        <TextInput label="Nickname" {...form.getInputProps('nickname')} />
        <div>
          <Button onClick={close}>Cancel</Button>
          <Button type="submit" loading={form.submitting}>
            Ok
          </Button>
        </div>
      </form>
    </EditModal>
  )
}
