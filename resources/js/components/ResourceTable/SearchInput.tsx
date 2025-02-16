import { Icon } from '@iconify/react'
import { router } from '@inertiajs/react'
import { Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import React, { useState } from 'react'

export default function SearchInput() {
  const query = new URLSearchParams(window.location.search)

  const [value, setValue] = useState(query.get('search') || '')

  const handleSearch = useDebouncedCallback((search: string) => {
    router.reload({ data: { search, page: undefined }, only: ['data'] })
  }, 500)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }
  const onClear = () => {
    setValue('')
    router.reload({ data: { search: null, page: undefined }, only: ['data'] })
  }
  return (
    <Input
      placeholder="Search"
      leftSection={<Icon icon="lucide:search" />}
      rightSection={value ? <Input.ClearButton onClick={onClear} /> : undefined}
      rightSectionPointerEvents="auto"
      value={value}
      onChange={onChange}
    />
  )
}
