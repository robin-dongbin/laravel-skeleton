import type { paths } from '@/types/admin'
import createClient, { Middleware } from 'openapi-fetch'

const auth: Middleware = {
  async onRequest({ request, options }) {
    const token = localStorage.getItem('token') || ''
    request.headers.set('Authorization', `Bearer ${token}`)

    return request
  },
  async onResponse({ request, response, options }) {
    // change status of response
    return response
  },
}

const $fetch = createClient<paths>({ baseUrl: '/api/admin' })

$fetch.use(auth)

export { $fetch }
