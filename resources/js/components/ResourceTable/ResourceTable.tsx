import type { ActionButtonProps } from '@/components/ResourceTable/ActionButton'
import { ActionButton } from '@/components/ResourceTable/index'
import type { TableProps } from '@/types'
import { router } from '@inertiajs/react'
import { type MantineComponent, Paper } from '@mantine/core'
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
  | 'records'
  | 'columns'
> &
  TableProps['table']

const PAGE_SIZES = [15, 30, 50, 100, 200]

const componentMap: Record<string, MantineComponent<any>> = {
  'columns.text': ({ value }: any) => {
    return <div>{value}</div>
  },
  'columns.actions': ({ value: actions }: any) => {
    return (
      <div>
        {actions.map(({ label, ...props }: ActionButtonProps) => (
          <ActionButton key={label} label={label} {...props} />
        ))}
      </div>
    )
  },
}

function ColumnComponent({ component, ...props }) {
  const Comp = componentMap[component]

  return <Comp {...props} />
}

export default function ResourceTable({
  searchable,
  searchPlaceholder,
  filterable,
  filters,
  columns,
  ...props
}: ResourceTableProps) {
  columns = columns.map(({ accessor, component, ...column }) => {
    return {
      accessor,
      component,
      ...column,
      render: (record: any) => <ColumnComponent component={component} value={record[accessor]} />,
    }
  })

  function onPageChange(page: number) {
    router.reload({ data: { page }, only: ['table'] })
  }

  function onRecordsPerPageChange(limit: number) {
    router.reload({ data: { page: 1, limit }, only: ['table'] })
  }

  return (
    <Paper className="dark:bg-dark-8 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>{searchable && <SearchInput placeholder={searchPlaceholder} />}</div>
        <div className="flex items-center gap-2">{filterable && <FilterDrawer filters={filters}></FilterDrawer>}</div>
      </div>
      <DataTable
        columns={columns}
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
