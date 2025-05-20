import type { paths } from '@/types/admin'
import { notifications } from '@mantine/notifications'
import { t } from 'i18next'
import createClient, { type Middleware } from 'openapi-fetch'
import createApi from 'openapi-react-query'
import { redirect } from 'react-router'

const middleware: Middleware = {
  onRequest: async ({ request, options }) => {
    console.log(options)
    console.log(request)
    console.log(request.headers.get('Content-Type'))

    const token = localStorage.getItem('token') || ''
    const lang = localStorage.getItem('i18nextLng') || ''
    request.headers.set('Authorization', `Bearer ${token}`)
    request.headers.set('Lang', lang)

    return request
  },
  onResponse: async ({ response }) => {
    if (!response.ok) {
      if ([400, 401, 403, 500].includes(response.status)) {
        const body = await response.clone().json()

        const title = {
          400: t('http_statuses.400'),
          401: t('http_statuses.401'),
          403: t('http_statuses.403'),
          500: t('http_statuses.500'),
        }[response.status]

        notifications.show({
          position: 'top-center',
          color: 'red',
          title,
          message: body.message,
        })
      }

      if (response.status === 401) {
        localStorage.removeItem('token')

        throw redirect('/login')
      }
    }

    return response
  },
}

const $fetch = createClient<paths>({ baseUrl: '/api/admin' })

$fetch.use(middleware)

const $api = createApi($fetch)

export { $api, $fetch }
