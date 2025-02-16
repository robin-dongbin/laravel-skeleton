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
  auth: {
    user: User
  }
  flash?: {
    message: string
  }
  navigation: NavItem[]
}

export interface Filter {
  attribute: string
  title: string
  component: string
  options: object[]
}

export interface PaginatedData<T = Record<string, unknown>> {
  data: {
    data: T[]
    total: number
    per_page: number
    current_page: number
  }
  filters?: Filter[]
  [key: string]: unknown
}
