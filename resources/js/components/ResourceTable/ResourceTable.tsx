import type { Filters } from '@/types'
import { Icon } from '@iconify/react'
import { router } from '@inertiajs/react'
import { ActionIcon, Paper } from '@mantine/core'
import { DataTable, type DataTableProps } from 'mantine-datatable'
import FilterDrawer from './FilterDrawer'
import SearchInput from './SearchInput'

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
  Filters

const PAGE_SIZES = [15, 30, 50, 100, 200]

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
