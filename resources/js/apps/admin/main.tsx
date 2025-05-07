// organize-imports-ignore

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'
import { router } from './router'
import './bootstrap'
import './i18n'
import { RouterProvider } from 'react-router'

scan({
	enabled: true,
})

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
