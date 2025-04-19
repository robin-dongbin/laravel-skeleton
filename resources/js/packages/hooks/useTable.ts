import { parseSortParam } from '@/packages/lib/utils'
import type { UseFormReturnType } from '@mantine/form'
import type { DataTableSortStatus } from 'mantine-datatable'
import { type SubmitOptions, useSubmit } from 'react-router'

export function useTable<T extends Record<string, any>>(queryBuilder: UseFormReturnType<any>, options?: SubmitOptions) {
  const submit = useSubmit()

  async function execute() {
    await submit(queryBuilder.getTransformedValues(), {
      method: 'get',
      ...options,
    })
  }

  async function handlePageChange(page: number) {
    queryBuilder.setFieldValue('page', page)
    await execute()
  }

  async function handleRecordsPerPageChange(perPage: number) {
    queryBuilder.setFieldValue('per_page', perPage)
    queryBuilder.setFieldValue('page', 1)
    await execute()
  }

  async function handleSortStatusChange(sortStatus: DataTableSortStatus<T>) {
    const sort = `${sortStatus.direction === 'desc' ? '-' : ''}${String(sortStatus.columnAccessor)}`
    queryBuilder.setFieldValue('sort', sort)
    queryBuilder.setFieldValue('page', 1)
    await execute()
  }

  return {
    page: queryBuilder.getValues().page,
    recordsPerPage: queryBuilder.getValues().per_page,
    sortStatus: parseSortParam(queryBuilder.getValues().sort),
    handlePageChange,
    handleRecordsPerPageChange,
    handleSortStatusChange,
  }
}
