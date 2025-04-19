import useAuth from '@/hooks/useAuth'
import { Button } from '@mantine/core'

export default function Dashboard() {
  const { refresh } = useAuth()
  return (
    <div className={'w-20'}>
      <Button onClick={refresh}>fetch user</Button>
    </div>
  )
}
