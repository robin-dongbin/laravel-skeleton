import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminIpsIndexResponse, IpResource } from '@admin//types/api'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminIpsIndexResponse>(admin.ips.index(), request)

  return { data }
}

const columns: DataTableColumn<IpResource>[] = [
  {
    accessor: 'address',
  },
  {
    accessor: 'location',
    render: (record) => record.location?.city || record.location?.region || record.location?.country_code,
  },
  {
    accessor: 'status',
  },
  {
    accessor: 'remark',
  },
  {
    accessor: 'created_at',
    sortable: true,
  },
]

export default function Ips() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()

  const query = useQueryBuilder<{
    address: string
    status?: string
  }>({
    address: '',
    status: 'active',
  })

  return (
    <PageContainer>
      <TabFilter
        query={query}
        field="status"
        data={[
          { value: 'active', label: 'Active' },
          { value: 'privileged', label: 'Privileged' },
          { value: 'blocked', label: 'Blocked' },
        ]}
      />
      <FilterPanel query={query}>
        <TextInput label={t('fields.ips.address')} {...query.getInputProps('filter.address')}></TextInput>
      </FilterPanel>
      <ResourceTable<IpResource>
        name="ips"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        query={query}
      />
    </PageContainer>
  )
}
