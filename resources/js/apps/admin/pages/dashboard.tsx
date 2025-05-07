import { Button } from '@mantine/core'
import useAuth from '@/packages/hooks/useAuth'

export default function Dashboard() {
	const { refresh } = useAuth()
	return (
		<div className={'w-20'}>
			<Button onClick={refresh}>fetch user</Button>
		</div>
	)
}
