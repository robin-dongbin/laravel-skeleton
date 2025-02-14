import { Icon } from '@iconify/react'
import { router } from '@inertiajs/react'
import type { MantineComponent } from '@mantine/core'
import { ActionIcon, Button, Drawer, Input, Paper, Select, TextInput } from '@mantine/core'
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks'
import { DataTable, type DataTableProps } from 'mantine-datatable'
import React, { useState } from 'react'

interface FiltersProps {
  filters?: { component: string; label: string }[]
}

type ResourceTableProps = Omit<
  DataTableProps,
  | 'withColumnBorders'
  | 'withTableBorder'
  | 'highlightOnHover'
  | 'customLoader'
  | 'recordsPerPageLabel'
  | 'recordsPerPageOptions'
  | 'onPageChange'
  | 'onRecordsPerPageChange'
> &
  FiltersProps

const PAGE_SIZES = [15, 30, 50, 100, 200]

const componentMap: Record<string, MantineComponent<any>> = {
  TextInput,
  Select,
}

function FilterComponent({ component, ...props }) {
  const Comp = componentMap[component]

  return <Comp {...props} />
}

function SearchInput() {
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

function FilterDrawer({ filters }: FiltersProps) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <ActionIcon variant="subtle" color="none" onClick={open}>
        <Icon icon="lucide:filter" />
      </ActionIcon>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Filters"
        classNames={{ header: 'dark:bg-dark-8 bg-gray-1' }}
      >
        <div className="flex flex-col gap-2 py-4">
          {filters.map(({ component, label, ...props }) => (
            <FilterComponent key={label} component={component} label={label} {...props} />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-end gap-2">
          <Button fullWidth>Apply</Button>
          <Button fullWidth variant="outline">
            Reset
          </Button>
        </div>
      </Drawer>
    </>
  )
}

export default function ResourceTable({ filters, ...props }: ResourceTableProps) {
  function onPageChange(page: number) {
    router.reload({ data: { page }, only: ['data'] })
  }

  function onRecordsPerPageChange(limit: number) {
    router.reload({ data: { page: 1, limit }, only: ['data'] })
  }

  return (
    <Paper className="dark:bg-dark-8 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <SearchInput />
        <div>
          {filters && <FilterDrawer filters={filters}></FilterDrawer>}
          <ActionIcon variant="subtle" color="none" onClick={() => router.reload()}>
            <Icon icon="lucide:refresh-cw" />
          </ActionIcon>
        </div>
      </div>

      <DataTable
        withColumnBorders
        withTableBorder
        highlightOnHover
        borderRadius="sm"
        recordsPerPageLabel="Records per page"
        recordsPerPageOptions={PAGE_SIZES}
        onPageChange={onPageChange}
        onRecordsPerPageChange={onRecordsPerPageChange}
        {...(props as any)}
      />
    </Paper>
  )
}
