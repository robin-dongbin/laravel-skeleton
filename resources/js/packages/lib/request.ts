import { redirect } from 'react-router'

interface RequestReturn<T, E> {
  response: Response
  data?: T
  error?: E
}
export async function $fetch<T, E = { message: string }>(url: string, request: Request): Promise<RequestReturn<T, E>> {
  const method = request.method
  const signal = request.signal
  const headers = new Headers()
  const body = method === 'GET' || method === 'HEAD' ? undefined : await request.clone().formData()

  const token = localStorage.getItem('token') || ''
  headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(url, {
    method,
    headers,
    body,
    signal,
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      throw redirect('/login')
    }

    return { response, error: await response.json() }
  }

  if (response.status === 204) {
    return { response }
  }

  return { response, data: await response.json() }
}
