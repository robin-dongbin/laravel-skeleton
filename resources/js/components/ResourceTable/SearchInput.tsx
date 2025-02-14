import { Icon } from '@iconify/react'
import { router } from '@inertiajs/react'
import { Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import React, { useState } from 'react'

export default function SearchInput() {
  const query = new URLSearchParams(window.location.search)

  const [value, setValue] = useState(query.get('search'))

  const handleSearch = useDebouncedCallback(async (search: string) => {
    router.reload({ data: { search }, only: ['data'] })
  }, 500)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }
  return (
    <Input placeholder="Search" leftSection={<Icon icon="lucide:search" />} defaultValue={value} onChange={onChange} />
  )
}
