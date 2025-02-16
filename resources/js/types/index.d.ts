import type { DataTableColumn } from 'mantine-datatable'

export interface NavItem {
  title: string
  url: string
  active: boolean
  attributes: { icon: string }
  depth: number
  children: NavItem[]
}

export interface User {
  id: number
  name: string
  username: string
  nickname: string
  email: string
  email_verified_at?: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  app: {
    title: string
  }
  auth: {
    user: User
  }
  flash?: {
    message: string
  }
  navigation: NavItem[]
}

export interface PaginatedData<T extends Record<string, unknown> = Record<string, unknown>> {
  data: {
    data: T[]
    total: number
    per_page: number
    current_page: number
  }
  [key: string]: unknown
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  table: {
    searchable: boolean
    filterable: boolean
    searchPlaceholder: string
    columns: (DataTableColumn & { component: string })[]
    pagination: {
      page: number
      per_page: number
      total: number
    }
    records: T[]
    filters: {
      attribute: string
      title: string
      component: string
      options: object[]
    }[]
  }
  [key: string]: unknown
}
