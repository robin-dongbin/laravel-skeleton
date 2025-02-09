export interface NavItem {
  title: string
  url: string
  attributes: { icon: string }
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
