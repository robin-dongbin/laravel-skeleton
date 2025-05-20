import { $api } from '@/apps/admin/libs/request.ts'
import type { components } from '@/types/admin'
import { Button, FileInput, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useTranslation } from 'react-i18next'
import { useRevalidator } from 'react-router'

export default function EditUser({ user }: { user: components['schemas']['UserResource'] }) {
  const { t } = useTranslation()
  const { revalidate } = useRevalidator()
  const form = useForm({
    initialValues: {
      username: user.username,
      nickname: user.nickname,
      mobile: String(user.mobile),
      role: String(user.role),
    },
    transformValues: (values) => ({
      ...values,
      role: Number(values.role) as typeof user.role,
    }),
  })
  const { data: roles } = $api.useSuspenseQuery('get', '/roles')

  const { mutate, isPending } = $api.useMutation('put', '/users/{user}', {
    onSuccess: async () => {
      modals.closeAll()
      await revalidate()
    },
    onError: (error: any) => {
      form.setErrors(error.errors)
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((body) => {
        mutate({
          params: { path: { user: user.id } },
          body,
          bodySerializer(body) {
            console.log(body)
            const fd = new FormData()
            for (const name in body) {
              fd.append(name, body[name])
            }
            return fd
          },
        })
      })}
      className="flex flex-col gap-2"
    >
      {/*<FileButton label={t('fields.users.avatar')} placeholder={t('fields.users.avatar')} />*/}

      <FileInput
        label={t('fields.users.avatar')}
        placeholder={t('fields.users.avatar')}
        {...form.getInputProps('avatar')}
      />
      <TextInput
        label={t('fields.users.username')}
        placeholder={t('fields.users.username')}
        key={form.key('username')}
        {...form.getInputProps('username')}
      />
      <TextInput
        label={t('fields.users.nickname')}
        placeholder={t('fields.users.nickname')}
        key={form.key('nickname')}
        {...form.getInputProps('nickname')}
      />
      <TextInput
        label={t('fields.users.mobile')}
        placeholder={t('fields.users.mobile')}
        key={form.key('mobile')}
        {...form.getInputProps('mobile')}
      />
      <Select
        label={t('fields.users.role')}
        placeholder={t('fields.users.role')}
        data={roles?.data.map((role) => ({ ...role, value: String(role.value) }))}
        key={form.key('role')}
        {...form.getInputProps('role')}
      />

      <Button fullWidth mt="xl" type="submit" loading={isPending}>
        {t('actions.submit')}
      </Button>
    </form>
  )
}
