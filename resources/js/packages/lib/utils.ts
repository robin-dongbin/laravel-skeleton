import type { NavItem } from '@/types'
import type { DataTableSortStatus } from 'mantine-datatable'

export function parseSortParam<T>(sort: string | null): DataTableSortStatus<T> | undefined {
  if (!sort) return undefined

  return sort.startsWith('-')
    ? { columnAccessor: sort.slice(1), direction: 'desc' }
    : { columnAccessor: sort, direction: 'asc' }
}

export function getBreadcrumbs(items: NavItem[], target: string, parent: NavItem[] = []): NavItem[] | null {
  if (!items?.length || !target) return null

  for (const item of items) {
    const newPath = [...parent, item]

    if (item.path === target) {
      return newPath
    }

    if (item.children?.length) {
      const found = getBreadcrumbs(item.children, target, newPath)
      if (found) return found
    }
  }

  return null
}
