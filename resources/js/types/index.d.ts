export interface NavItem {
  label: string
  pathname?: string
  icon?: string
  search?: string
  children?: NavItem[]
}

export interface User {
  id: number
  username: string
  nickname: string | null
  avatar: string | null
  mobile: string | null
  timezone: string | null
  role: string
  status: string
  created_at: string | null
}
