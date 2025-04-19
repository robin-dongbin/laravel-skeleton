import type { User } from '@/types'
import { useAtom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { useEffect } from 'react'
import { href, useFetcher, useNavigate, useSubmit } from 'react-router'

export const userAtom = atomWithStorage<null | User>('user', null, createJSONStorage<null | User>(), {
  getOnInit: true,
})

export default function useAuth() {
  const navigate = useNavigate()
  const fetcher = useFetcher()
  const [user, setUser] = useAtom(userAtom)
  const submit = useSubmit()

  useEffect(() => {
    if (fetcher.data) {
      const { data } = fetcher.data
      setUser(data.data)
    }
  }, [fetcher.data])

  async function refresh() {
    await fetcher.load('/user')
  }

  async function logout() {
    await submit(null, { method: 'post', action: '/logout' })
    localStorage.removeItem('token')
    setUser(null)
    navigate(href('/login'))
  }

  return {
    user,
    isLoggedIn: !!user,
    refresh,
    logout,
  }
}

export function useAuthCheck() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  return useEffect(() => {
    if (!isLoggedIn) {
      navigate(href('/login'))
    }
  }, [navigate, isLoggedIn])
}
