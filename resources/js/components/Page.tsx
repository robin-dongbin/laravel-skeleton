import { usePage } from '@inertiajs/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function Page({ children, actions }: { children: React.ReactNode; actions?: React.ReactNode }) {
  const { navigation } = usePage().props

  const title = navigation.find((item) => item.active).title

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Title order={2}>{title}</Title>
        <div>{actions}</div>
      </div>
      {children}
    </>
  )
}
