import { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request'
import { atom, useAtom } from 'jotai'
import { useNavigate } from 'react-router'

export const userAtom = atom<components['schemas']['UserResource']>()

export default function useAuth() {
  const [user, setUser] = useAtom(userAtom)

  const navigate = useNavigate()

  async function logout() {
    await $fetch.POST('/logout')
    localStorage.removeItem('token')
    setUser(undefined)
    navigate('/login')
  }

  return {
    user,
    isLoggedIn: !!user,
    logout,
  }
}
