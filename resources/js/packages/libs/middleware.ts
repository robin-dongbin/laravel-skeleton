import { redirect } from 'react-router'

export async function auth() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw redirect('/login')
  }
}

export async function guest() {
  const token = localStorage.getItem('token')
  if (token) {
    throw redirect('/')
  }
}
