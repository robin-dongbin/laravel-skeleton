import { $fetch } from '@admin/libs/request.ts'
import type { ClientLoaderFunctionArgs } from 'react-router'

export const clientAction = async ({ request, params }: ClientLoaderFunctionArgs) => {
  if (request.method === 'DELETE') {
    await $fetch.DELETE('/ips/{ip}', {
      params: { path: { ip: Number(params.id!) } },
      signal: request.signal,
    })
  }

  return 1
}
