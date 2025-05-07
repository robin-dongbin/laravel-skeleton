import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router'
import useTheme from '@/packages/hooks/useTheme.ts'
import './app.css'

export default function Root() {
	const { defaultTheme } = useTheme()
	const navigation = useNavigation()

	useEffect(() => {
		navigation.state === 'loading' ? nprogress.start() : nprogress.complete()
	}, [navigation.state])

	return (
		<MantineProvider theme={defaultTheme}>
			<Notifications />
			<NavigationProgress />
			<ModalsProvider>
				<Outlet />
			</ModalsProvider>
		</MantineProvider>
	)
}
