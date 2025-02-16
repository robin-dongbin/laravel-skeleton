import type { PaginatedData } from '@/types'
import { router } from '@inertiajs/react'
import { Paper } from '@mantine/core'
import { DataTable, type DataTableProps } from 'mantine-datatable'
import FilterDrawer from './FilterDrawer'
import SearchInput from './SearchInput'

type ResourceTableProps<T> = Omit<
  DataTableProps<T>,
  | 'withColumnBorders'
  | 'withTableBorder'
  | 'highlightOnHover'
  | 'customLoader'
  | 'recordsPerPageLabel'
  | 'recordsPerPageOptions'
  | 'onPageChange'
  | 'onRecordsPerPageChange'
> &
  Pick<PaginatedData, 'filters'> & {
    searchable?: boolean
  }

const PAGE_SIZES = [15, 30, 50, 100, 200]

export default function ResourceTable<T>({ searchable = true, filters, ...props }: ResourceTableProps<T>) {
  function onPageChange(page: number) {
    router.reload({ data: { page }, only: ['data'] })
  }

  function onRecordsPerPageChange(limit: number) {
    router.reload({ data: { limit, page: undefined }, only: ['data'] })
  }

  return (
    <Paper className="dark:bg-dark-8 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>{searchable && <SearchInput />}</div>
        <div className="flex items-center gap-2">
          {filters.length > 0 && <FilterDrawer filters={filters}></FilterDrawer>}
        </div>
      </div>
      <DataTable<T>
        minHeight={props.records.length > 0 ? 0 : 200}
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
