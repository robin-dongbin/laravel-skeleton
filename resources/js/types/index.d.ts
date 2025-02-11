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
  email: string
  email_verified_at?: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  navigation: NavItem[]
}

export type IndexPageProps<T extends Record<string, unknown> = Record<string, unknown>> = PageProps<{
  data: {
    data: T[]
    total: number
    per_page: number
    current_page: number
  }
}>
