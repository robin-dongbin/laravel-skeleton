import type { UseQueryBuilderReturn } from '@/packages/hooks/useQueryBuilder'
import day from '@/packages/lib/day.ts'
import { parseSortParam } from '@/packages/lib/utils'
import { Button, Paper, Tooltip } from '@mantine/core'
import { DataTable, type DataTableColumn, type DataTableProps, type DataTableSortStatus } from 'mantine-datatable'
import React from 'react'
import { useTranslation } from 'react-i18next'

type ResourceTableProps<T> = Omit<
  DataTableProps<T>,
  | 'withColumnBorders'
  | 'withTableBorder'
  | 'highlightOnHover'
  | 'recordsPerPageLabel'
  | 'recordsPerPageOptions'
  | 'columns'
> & {
  columns: DataTableColumn<T>[]
  name: string
  toolbarActions?: React.ReactNode
  query: UseQueryBuilderReturn<any>
}

const PAGE_SIZES = [15, 30, 50, 100, 200]

export default function ResourceTable<T extends Record<string, any>>({
  records,
  name,
  toolbarActions,
  columns,
  query,
  ...props
}: ResourceTableProps<T>) {
  const { t } = useTranslation()
  const page = query.getValues().page
  const recordsPerPage = query.getValues().per_page
  const sortStatus = parseSortParam(query.getValues().sort)

  columns = columns.map((o) => ({ title: t(`fields.${name}.${String(o.accessor)}`), ...o }))

  async function handlePageChange(page: number) {
    query.setFieldValue('page', page)
    await query.submit()
  }

  async function handleRecordsPerPageChange(perPage: number) {
    query.setFieldValue('per_page', perPage)
    query.setFieldValue('page', 1)
    await query.submit()
  }

  async function handleSortStatusChange(sortStatus: DataTableSortStatus<T>) {
    const sort = `${sortStatus.direction === 'desc' ? '-' : ''}${String(sortStatus.columnAccessor)}`
    query.setFieldValue('sort', sort)
    query.setFieldValue('page', 1)
    await query.submit()
  }

  function defaultColumnRender(row: T, index: number, accessor: keyof T | (string & NonNullable<unknown>)) {
    const data = row[accessor as keyof typeof row]
    switch (accessor) {
      case 'created_at':
        return (
          <Tooltip label={day(data).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{day(data).fromNow()}</span>
          </Tooltip>
        )
      case 'user':
        return (
          <Button size="compact-xs" variant="subtle">
            {data.nickname}
          </Button>
        )
      case 'ip':
        return (
          <Button size="compact-xs" variant="subtle" color="cyan">
            {data.address}
          </Button>
        )
      default:
        return data
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Paper className="dark:bg-dark-8 bg-gray-0 p-4">
        <div className="">{toolbarActions}</div>
        <DataTable<T>
          classNames={{
            root: 'dark:bg-dark-8 bg-gray-0',
            table: 'dark:bg-dark-8 bg-gray-0',
            header: 'dark:bg-dark-7 bg-gray-1',
            pagination: '!pt-4 !pb-0',
          }}
          minHeight={records && records.length > 0 ? 0 : 200}
          columns={columns}
          storeColumnsKey="asd"
          records={records}
          highlightOnHover
          borderRadius="sm"
          verticalSpacing="sm"
          recordsPerPageLabel="Records per page"
          recordsPerPageOptions={PAGE_SIZES}
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
