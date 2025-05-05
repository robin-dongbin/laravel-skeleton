import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'
import { getQuery } from 'ufo'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/ips', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

const columns: DataTableColumn<components['schemas']['IpResource']>[] = [
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

const filters = {
  address: '',
  status: 'active',
}

function Filter() {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  console.log(JSON.stringify(query))
  return (
    <FilterPanel>
      <TextInput label={t('fields.ips.address')} {...query.getInputProps('filter.address')}></TextInput>
    </FilterPanel>
  )
}

export default function Ips() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()

  return (
    <PageContainer filters={filters}>
      <TabFilter
        field="status"
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'privileged', label: t('enums.Privileged') },
          { value: 'blocked', label: t('enums.Blocked') },
        ]}
      />
      <Filter />
      <ResourceTable<components['schemas']['IpResource']>
        name="ips"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
      />
    </PageContainer>
  )
}
