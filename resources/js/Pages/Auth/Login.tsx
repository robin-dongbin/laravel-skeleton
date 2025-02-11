import GuestLayout from '@/layouts/GuestLayout'
import { router } from '@inertiajs/react'
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

const Login = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  function submit(data: typeof form.values) {
    router.post(route('admin.login'), data, {
      onStart: () => {
        form.setSubmitting(true)
      },
      onError: (errors) => {
        form.setErrors(errors || {})
      },
      onFinish: () => {
        form.setSubmitting(false)
      },
    })
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className="">
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(submit)}>
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
