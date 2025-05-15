import type { components } from '@/types/admin'
import { $api, $fetch } from '@admin/libs/request'
import { atom } from 'jotai'
import { useNavigate } from 'react-router'

export const userAtom = atom<components['schemas']['UserResource']>()

export default function useAuth() {
  const { data } = $api.useSuspenseQuery('get', '/user', {})
  const user = data.data

  const navigate = useNavigate()

  const logout = async () => {
    await $fetch.POST('/logout')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return {
    user,
    isLoggedIn: !!user,
    logout,
  }
}
