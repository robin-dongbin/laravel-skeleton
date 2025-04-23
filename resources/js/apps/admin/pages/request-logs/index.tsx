import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRequestLogsIndexResponse, RequestLogResource } from '@admin/types/api'
import { Badge, Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

function getMethodColor(method: string) {
  switch (method) {
    case 'POST':
      return 'blue'
    case 'PUT':
    case 'PATCH':
      return 'yellow'
    case 'DELETE':
      return 'red'
    default:
      return 'gray'
  }
}

function getStatusColor(status: number) {
  switch (status) {
    case 400:
    case 401:
    case 402:
    case 403:
    case 404:
      return 'yellow'
    case 500:
    case 501:
    case 502:
    case 503:
      return 'red'
    default:
      return 'green'
  }
}

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminRequestLogsIndexResponse>(admin.requestLogs.index(), request)

  return { data }
}

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

  const columns: DataTableColumn<RequestLogResource>[] = [
    {
      accessor: 'method',
      render: ({ method }) => (
        <Badge radius="sm" size="sm" color={getMethodColor(method)}>
          {method}
        </Badge>
      ),
    },
    {
      accessor: 'path',
    },
    {
      accessor: 'response_status',
      render: ({ response_status }) => (
        <Badge radius="sm" size="sm" color={getStatusColor(response_status)}>
          {response_status}
        </Badge>
      ),
    },
    {
      accessor: 'user',
      render: ({ user }) => (
        <Badge radius="sm" size="sm">
          {user?.username}
        </Badge>
      ),
    },
    {
      accessor: 'ip',
      render: ({ ip }) => (
        <Badge radius="sm" size="sm">
          {ip?.address}
        </Badge>
      ),
    },
    {
      accessor: 'duration',
      sortable: true,
      render: ({ duration }) => <span>{duration} ms</span>,
    },
    {
      accessor: 'memory',
      sortable: true,
    },
    {
      accessor: 'created_at',
      sortable: true,
    },
  ]

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
        resourceName="request"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        query={query}
      />
    </PageContainer>
  )
}
