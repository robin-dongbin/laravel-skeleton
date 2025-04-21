import type { AdminIpsIndexResponse, IpResource } from '#admin//types/api'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { request } from '@/packages/lib/request'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export const clientLoader = (args: ClientLoaderFunctionArgs) => request<AdminIpsIndexResponse>(args)

const columns: DataTableColumn<IpResource>[] = [
  {
    accessor: 'address',
    title: 'address',
  },
  {
    accessor: 'location',
    title: 'location',
  },
  {
    accessor: 'status',
    title: 'status',
  },
  {
    accessor: 'user',
    title: 'user',
  },
  {
    accessor: 'created_at',
    title: 'created_at',
    sortable: true,
  },
]

export default function Ips() {
  const { data } = useLoaderData<typeof clientLoader>()

  const query = useQueryBuilder<{
    address: string
    status: string | null
  }>({
    address: '',
    status: null,
  })

  return (
    <PageContainer>
      <FilterPanel query={query}>
        <TextInput label="Address" {...query.getInputProps('filter.address')}></TextInput>
        <Select
          label="Status"
          data={['200', '201', '204', '400', '401', '403', '404', '422', '500', '503']}
          clearable
          {...query.getInputProps('filter.status')}
        ></Select>
      </FilterPanel>
      <ResourceTable<IpResource> columns={columns} records={data?.data} totalRecords={data?.meta.total} query={query} />
    </PageContainer>
  )
}
