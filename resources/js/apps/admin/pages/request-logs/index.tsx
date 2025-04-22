import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRequestLogsIndexResponse, RequestLogResource } from '@admin/types/api'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminRequestLogsIndexResponse>(admin.requestLogs.index(), request)

  return { data }
}

const columns: DataTableColumn<RequestLogResource>[] = [
  {
    accessor: 'method',
    title: 'method',
  },
  {
    accessor: 'path',
    title: 'path',
  },
  {
    accessor: 'response_status',
    title: 'response_status',
  },
  {
    accessor: 'duration',
    title: 'duration',
    sortable: true,
  },
  {
    accessor: 'memory',
    title: 'memory',
    sortable: true,
  },
  {
    accessor: 'created_at',
    title: 'created_at',
    sortable: true,
  },
]

export default function RequestLogs() {
  const { data } = useLoaderData<typeof clientLoader>()

  const query = useQueryBuilder<{
    path: string
    response_status: string | null
    method: string | null
  }>({
    path: '',
    response_status: null,
    method: null,
  })

  return (
    <PageContainer>
      <FilterPanel query={query}>
        <TextInput label="Path" {...query.getInputProps('filter.path')}></TextInput>
        <Select
          label="Status"
          data={['200', '201', '204', '400', '401', '403', '404', '422', '500', '503']}
          clearable
          {...query.getInputProps('filter.response_status')}
        ></Select>
        <Select
          label="method"
          data={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
          {...query.getInputProps('filter.method')}
        ></Select>
      </FilterPanel>
      <ResourceTable<RequestLogResource>
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        query={query}
      />
    </PageContainer>
  )
}
