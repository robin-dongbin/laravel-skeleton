import type { DataTableSortStatus } from 'mantine-datatable'

export function parseSortParam<T>(sort: string | null): DataTableSortStatus<T> | undefined {
  if (!sort) return undefined

  return sort.startsWith('-')
    ? { columnAccessor: sort.slice(1), direction: 'desc' }
    : { columnAccessor: sort, direction: 'asc' }
}
