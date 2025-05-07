import { nprogress } from '@mantine/nprogress'
import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router'

export default function Layout() {
	const navigation = useNavigation()

	useEffect(() => {
		navigation.state === 'loading' ? nprogress.start() : nprogress.complete()
	}, [navigation.state])

	return <Outlet />
}
