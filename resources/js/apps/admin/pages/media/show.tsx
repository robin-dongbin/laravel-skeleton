import { $fetch } from '@admin/libs/request.ts'
import type { ClientLoaderFunctionArgs } from 'react-router'

export async function clientAction({ request, params }: ClientLoaderFunctionArgs) {
  if (request.method === 'DELETE') {
    const { data } = await $fetch[request.method]('/media/{medium}', {
      params: { path: { medium: params.id! } },
      signal: request.signal,
    })
    return { data }
  }
  console.log(params)
  console.log(request)

  return 1
}
