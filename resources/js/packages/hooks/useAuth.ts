import { $api, $fetch } from '@/apps/admin/libs/request'
import { useNavigate } from 'react-router'

export default function useAuth() {
  const { data, refetch } = $api.useSuspenseQuery('get', '/user', {})
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
    refetch,
  }
}
