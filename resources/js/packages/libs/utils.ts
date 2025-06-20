import { isBoolean } from 'es-toolkit'
import type { DataTableSortStatus } from 'mantine-datatable'

export const parseSortParam = <T>(sort: string | null): DataTableSortStatus<T> | undefined => {
  if (!sort) return undefined

  return sort.startsWith('-')
    ? { columnAccessor: sort.slice(1), direction: 'desc' }
    : { columnAccessor: sort, direction: 'asc' }
}

export const badgeColor = (data: string | number): string => {
  switch (data) {
    case 'approved':
    case 'active':
    case 200:
    case 201:
    case 204:
      return 'green'
    case 'POST':
      return 'blue'
    case 'PUT':
    case 'PATCH':
    case 400:
    case 401:
    case 402:
    case 403:
    case 404:
    case 422:
      return 'yellow'
    case 'privileged':
      return 'violet'
    case 'rejected':
    case 'blocked':
    case 'banned':
    case 'DELETE':
    case 500:
    case 502:
    case 503:
      return 'red'
    default:
      return 'gray'
  }
}

export const bodySerializer = (body: Record<string, any>) => {
  const fd = new FormData()
  for (const name in body) {
    const value = body[name]
    if (value !== null && value !== undefined) {
      if (isBoolean(value)) {
        fd.append(name, value ? '1' : '0')
        continue
      }
      fd.append(name, value)
    }
  }

  return fd
}

export const putBodySerializer = (body: Record<string, any>) => {
  const fd = bodySerializer(body)

  fd.set('_method', 'put')

  return fd
}
