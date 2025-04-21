import type { AdminAuthenticationLogsIndexResponse, AuthenticationLogResource } from '#admin/types/api'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { request } from '@/packages/lib/request'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export const clientLoader = (args: ClientLoaderFunctionArgs) => request<AdminAuthenticationLogsIndexResponse>(args)

const columns: DataTableColumn<AuthenticationLogResource>[] = [
  {
    accessor: 'ip_address',
    title: 'ip_address',
  },
  {
    accessor: 'created_at',
    title: 'created_at',
    sortable: true,
  },
]

export default function AuthenticationLogs() {
  const { data } = useLoaderData<typeof clientLoader>()

  const query = useQueryBuilder<{
    ip_address?: string
  }>({
    ip_address: null,
  })

  return (
    <PageContainer>
      <FilterPanel query={query}>
        <TextInput label="Ip address" {...query.getInputProps('filter.ip_address')}></TextInput>
      </FilterPanel>
      <ResourceTable<AuthenticationLogResource>
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        query={query}
      />
    </PageContainer>
  )
}
