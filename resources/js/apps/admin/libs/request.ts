import type { paths } from '@/types/admin'
import { notifications } from '@mantine/notifications'
import createClient, { type Middleware } from 'openapi-fetch'
import { redirect } from 'react-router'

const middleware: Middleware = {
  onRequest: async ({ request }) => {
    const token = localStorage.getItem('token') || ''
    request.headers.set('Authorization', `Bearer ${token}`)

    return request
  },
  onResponse: async ({ response }) => {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token')

        throw redirect('/login')
      }
      if (response.status === 400) {
        const body = await response.clone().json()

        notifications.show({
          position: 'top-center',
          color: 'yellow',
          title: 'Bad Request',
          message: body.message,
        })
      }
    }

    return response
  },
}

const $fetch = createClient<paths>({ baseUrl: '/api/admin' })

$fetch.use(middleware)

export { $fetch }
