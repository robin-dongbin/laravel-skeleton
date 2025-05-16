import MediaPicker from '@/packages/components/Media/MediaPicker'
import type { components } from '@/types/admin'
import { Button, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useTranslation } from 'react-i18next'
import { $api } from '../libs/request'

export default function UserField({ user }: { user: components['schemas']['UserResource'] }) {
  const { t } = useTranslation()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: user.username,
      nickname: user.nickname,
      mobile: user.mobile,
      role: String(user.role),
    },
    transformValues: (values) => ({
      ...values,
      role: Number(values.role) as typeof user.role,
    }),
  })
  const { data: roles } = $api.useSuspenseQuery('get', '/roles')

  const { mutate, isPending } = $api.useMutation('put', '/users/{user}', {
    onError: (error: any) => {
      form.setErrors(error.errors)
    },
  })

  return (
    <Button
      size="compact-xs"
      variant="subtle"
      onClick={() => {
        modals.open({
          title: user.nickname,
          children: (
            <div>
              <form
                onSubmit={form.onSubmit((body) => mutate({ params: { path: { user: user.id } }, body }))}
                className="flex flex-col gap-2"
              >
                <MediaPicker label={t('fields.users.avatar')} />
                <TextInput
                  label={t('fields.users.username')}
                  placeholder={t('fields.users.username')}
                  {...form.getInputProps('username')}
                />
                <TextInput
                  label={t('fields.users.nickname')}
                  placeholder={t('fields.users.nickname')}
                  {...form.getInputProps('nickname')}
                />
                <TextInput
                  label={t('fields.users.mobile')}
                  placeholder={t('fields.users.mobile')}
                  {...form.getInputProps('mobile')}
                />
                <Select
                  label={t('fields.users.role')}
                  placeholder={t('fields.users.role')}
                  data={roles?.data.map((role) => ({ ...role, value: String(role.value) }))}
                  {...form.getInputProps('role')}
                />

                <Button fullWidth mt="xl" type="submit" loading={isPending}>
                  {t('actions.submit')}
                </Button>
              </form>
            </div>
          ),
        })
      }}
    >
      {user.nickname}
    </Button>
  )
}
