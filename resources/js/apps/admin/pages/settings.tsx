import PageContainer from '@/packages/components/PageContainer.tsx'
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Page() {
  const query = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '1223',
    },
  })
  return (
    <PageContainer>
      Settings
      <div>
        <TextInput label="asd" key={query.key('username')} {...query.getInputProps('username')} />
        <Button onClick={() => query.setFieldValue('username', 'all')}>aaa</Button>
      </div>
    </PageContainer>
  )
}
