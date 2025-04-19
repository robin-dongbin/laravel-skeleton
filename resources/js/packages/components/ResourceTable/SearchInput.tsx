import { Icon } from '@iconify/react'
import { Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router'

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState(searchParams.get('search') || '')

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearchParams((prev) => {
      prev.delete('page')
      prev.set('search', search)
      return prev
    })
  }, 500)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }
  const onClear = () => {
    setValue('')
    setSearchParams((prev) => {
      prev.delete('page')
      prev.delete('search')
      return prev
    })
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
