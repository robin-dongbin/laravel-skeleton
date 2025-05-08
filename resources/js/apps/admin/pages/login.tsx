import { userAtom } from '@/packages/hooks/useAuth'
import { $fetch } from '@admin/libs/request.ts'
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getDefaultStore } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientActionFunctionArgs, href, redirect, useActionData, useNavigation, useSubmit } from 'react-router'

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const { data, error } = await $fetch.POST('/login', { body: await request.json() })

  if (error) {
    return error
  }

  localStorage.setItem('token', data!.meta.token)

  const store = getDefaultStore()
  store.set(userAtom, data!.data)

  return redirect(href('/'))
}

export default function Login() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const data = useActionData<typeof clientAction>()

  const submit = useSubmit()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  useEffect(() => {
    if (data) {
      form.setErrors(data.errors)
    }
  }, [data])

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => submit(values, { method: 'post', encType: 'application/json' }))}>
          <TextInput
            label={t('fields.users.username')}
            placeholder={t('fields.users.username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label={t('fields.users.password')}
            placeholder={t('fields.users.password')}
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit" loading={navigation.state === 'submitting'}>
            {t('actions.login')}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
