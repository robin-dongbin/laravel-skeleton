import { userAtom } from '@/packages/hooks/useAuth'
import { $fetch } from '@/packages/lib/request'
import { login } from '@actions/Admin/AuthController'
import type { AdminLoginError, AdminLoginResponse } from '@admin/types/api'
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getDefaultStore } from 'jotai'
import { useEffect } from 'react'
import { type ClientActionFunctionArgs, href, redirect, useActionData, useNavigation, useSubmit } from 'react-router'

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const { data, error } = await $fetch<AdminLoginResponse, AdminLoginError>(login.url(), request)

  if (error) {
    return error
  }

  localStorage.setItem('token', data!.meta.token)

  const store = getDefaultStore()
  store.set(userAtom, data!.data)

  return redirect(href('/'))
}

export default function Login() {
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
        <form onSubmit={form.onSubmit((values) => submit(values, { action: href('/login'), method: 'POST' }))}>
          <TextInput label="Username" placeholder="Your username" {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" {...form.getInputProps('password')} />
          <Button fullWidth mt="xl" type="submit" loading={navigation.state === 'submitting'}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
