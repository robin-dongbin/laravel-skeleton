import type { paths } from '@/types/admin'
import createClient, { type Middleware } from 'openapi-fetch'
import { redirect } from 'react-router'

const auth: Middleware = {
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
    }

    return response
  },
}

const $fetch = createClient<paths>({ baseUrl: '/api/admin' })

$fetch.use(auth)

export { $fetch }
