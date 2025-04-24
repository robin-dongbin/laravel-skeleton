import type { DataTableSortStatus } from 'mantine-datatable'

export function parseSortParam<T>(sort: string | null): DataTableSortStatus<T> | undefined {
  if (!sort) return undefined

  return sort.startsWith('-')
    ? { columnAccessor: sort.slice(1), direction: 'desc' }
    : { columnAccessor: sort, direction: 'asc' }
}

export function badgeColor(data: string | number): string {
  switch (data) {
    case 'Approved':
    case 'POST':
    case 200:
    case 201:
      return 'green'
    case 'Rejected':
    case 'PUT':
    case 'PATCH':
    case 400:
    case 401:
    case 402:
    case 403:
    case 404:
      return 'yellow'
    case 'Blocked':
    case 'Banned':
    case 'DELETE':
    case 500:
    case 501:
    case 502:
    case 503:
      return 'red'
    default:
      return 'gray'
  }
}
