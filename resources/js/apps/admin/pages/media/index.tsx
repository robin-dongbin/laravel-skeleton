import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRolesIndexResponse } from '@admin//types/api'
import type { ClientLoaderFunctionArgs } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminRolesIndexResponse>(admin.media.index(), request)

  return { data }
}
