import { redirect } from 'react-router'

export const auth = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw redirect('/login')
  }
};

export const guest = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    throw redirect('/')
  }
};
