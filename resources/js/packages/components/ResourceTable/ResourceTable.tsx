import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext'
import { parseSortParam } from '@/packages/libs/utils'
import { Paper } from '@mantine/core'
import { DataTable, type DataTableColumn, type DataTableProps, type DataTableSortStatus } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import defaultColumnRender from './defaultColumnRender.tsx'

type ResourceTableProps<T> = Omit<
  DataTableProps<T>,
  'withColumnBorders' | 'withTableBorder' | 'highlightOnHover' | 'recordsPerPageLabel' | 'columns'
> & {
  columns: DataTableColumn<T>[]
  name: string
}

export const PAGE_SIZES = [15, 30, 50, 100, 200]

export default function ResourceTable<T extends Record<string, any>>({
  records,
  name,
  columns,
  recordsPerPageOptions,
  ...props
}: ResourceTableProps<T>) {
  const { t } = useTranslation()
  const { query, submit } = useQueryBuilderContext()
  const page = query.getValues().page
  const recordsPerPage = query.getValues().per_page
  const sortStatus = parseSortParam(query.getValues().sort)

  columns = columns.map((o) => ({ title: t(`fields.${name}.${String(o.accessor)}`), textAlign: 'center', ...o }))

  const handlePageChange = async (page: number) => {
    query.setFieldValue('page', page)
    await submit()
  };

  const handleRecordsPerPageChange = async (perPage: number) => {
    query.setFieldValue('per_page', perPage)
    query.setFieldValue('page', 1)
    await submit()
  };

  const handleSortStatusChange = async (sortStatus: DataTableSortStatus<T>) => {
    const sort = `${sortStatus.direction === 'desc' ? '-' : ''}${String(sortStatus.columnAccessor)}`
    query.setFieldValue('sort', sort)
    query.setFieldValue('page', 1)
    await submit()
  };

  return (
    <div className="flex flex-col gap-4">
      <Paper className="dark:bg-dark-8 bg-gray-0 p-4">
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
          highlightOnHover
          borderRadius="sm"
          verticalSpacing="sm"
          recordsPerPageLabel={t('records_per_page')}
          recordsPerPageOptions={recordsPerPageOptions || PAGE_SIZES}
          page={page}
          recordsPerPage={recordsPerPage}
          sortStatus={sortStatus}
          defaultColumnRender={defaultColumnRender}
          onSortStatusChange={handleSortStatusChange}
          onPageChange={handlePageChange}
          onRecordsPerPageChange={handleRecordsPerPageChange}
          {...(props as any)}
        />
      </Paper>
    </div>
  )
}
