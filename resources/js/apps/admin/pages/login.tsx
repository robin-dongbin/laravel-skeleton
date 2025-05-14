import { $api } from '@admin/libs/request.ts'
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const { mutate, isPending } = $api.useMutation('post', '/login', {
    onSuccess: (data) => {
      localStorage.setItem('token', data?.meta.token)
      navigate('/')
    },
    onError: (error) => {
      form.setErrors(error.errors)
    },
  })

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((body) => mutate({ body }))}>
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
          <Button fullWidth mt="xl" type="submit" loading={isPending}>
            {t('actions.login')}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
