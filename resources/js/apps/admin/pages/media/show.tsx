import { $fetch } from '@admin/libs/request.ts'
import type { ClientLoaderFunctionArgs } from 'react-router'

export const clientAction = async ({ request, params }: ClientLoaderFunctionArgs) => {
  if (request.method === 'DELETE') {
    await $fetch[request.method]('/media/{medium}', {
      params: { path: { medium: params.id! } },
      signal: request.signal,
    })
  }

  return 1
};
