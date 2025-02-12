import { useForm } from '@/hooks/use-form'
import GuestLayout from '@/layouts/GuestLayout'
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import React from 'react'

const Login = () => {
  const form = useForm({
    url: route('admin.login'),
    initialValues: {
      username: '',
      password: '',
    },
  })

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.submit}>
          <TextInput label="Username" placeholder="Your username" {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" {...form.getInputProps('password')} />
          <Button fullWidth mt="xl" type="submit" loading={form.submitting}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

Login.layout = (page: React.ReactNode) => <GuestLayout children={page} />

export default Login
