import { parseSortParam } from '@/packages/libs/utils.ts'
import { Paper } from '@mantine/core'
import { DataTable, type DataTableColumn, type DataTableProps, type DataTableSortStatus } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import defaultColumnRender from './defaultColumnRender.tsx'

type ResourceTableProps<T> = Omit<
  DataTableProps<T>,
  | 'withColumnBorders'
  | 'withTableBorder'
  | 'highlightOnHover'
  | 'recordsPerPageLabel'
  | 'columns'
  | 'onSortStatusChange'
> & {
  columns: DataTableColumn<T>[]
  name: string
  toolbar?: React.ReactNode
  toolbarVisible?: boolean
  sort: string
  onQueryChange: (query: { page: number; per_page?: number; sort?: string }) => void
}

export const PAGE_SIZES = [15, 30, 50, 100, 200]

export default function ResourceTable<T extends Record<string, any>>({
  records,
  name,
  columns,
  recordsPerPageOptions,
  toolbar,
  toolbarVisible = false,
  sort,
  onQueryChange,
  ...props
}: ResourceTableProps<T>) {
  const { t } = useTranslation()

  const sortStatus = parseSortParam<T>(sort)

  columns = columns.map((o) => ({ title: t(`fields.${name}.${String(o.accessor)}`), textAlign: 'center', ...o }))

  const handleSortStatusChange = async (sortStatus: DataTableSortStatus<T>) => {
    const sort = `${sortStatus.direction === 'desc' ? '-' : ''}${String(sortStatus.columnAccessor)}`
    onQueryChange({ sort, page: 1 })
  }

  const handlePageChange = (page: number) => {
    onQueryChange({ page })
  }

  const handleRecordsPerPageChange = (per_page: number) => {
    onQueryChange({ per_page, page: 1 })
  }

  return (
    <Paper className="dark:bg-dark-8 bg-gray-0 p-4">
      {toolbarVisible && <div className="mb-4">{toolbar}</div>}
      <div>
        <DataTable<T>
          classNames={{
            root: 'dark:bg-dark-8 bg-gray-0',
            table: 'dark:bg-dark-8 bg-gray-0',
            header: 'dark:bg-dark-7 bg-gray-1',
            pagination: '!pt-4 !pb-0',
          }}
          minHeight={records && records.length > 0 ? 0 : 200}
          columns={columns}
          records={records}
          noRecordsText={t('no_records')}
          recordsPerPageLabel={t('records_per_page')}
          recordsPerPageOptions={recordsPerPageOptions || PAGE_SIZES}
          sortStatus={sortStatus}
          defaultColumnRender={defaultColumnRender}
          onSortStatusChange={handleSortStatusChange}
          onRecordsPerPageChange={handleRecordsPerPageChange}
          onPageChange={handlePageChange}
          {...(props as any)}
        />
      </div>
    </Paper>
  )
}
