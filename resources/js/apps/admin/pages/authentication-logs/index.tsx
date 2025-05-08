import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/contexts/QueryBuilderProvider/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'
import { getQuery } from 'ufo'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/authentication-logs', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

const columns: DataTableColumn<components['schemas']['AuthenticationLogResource']>[] = [
  {
    accessor: 'user',
  },
  {
    accessor: 'ip',
  },
  {
    accessor: 'user_agent',
  },
  {
    accessor: 'successful',
  },
  {
    accessor: 'created_at',
    sortable: true,
  },
]

const Filter = () => {
  const { t } = useTranslation()
  const { query } = useQueryBuilder()

  return (
    <FilterPanel>
      <TextInput
        label={t('fields.request_logs.ip_address')}
        key={query.key('filter[ip_address]')}
        {...query.getInputProps('filter[ip_address]')}
      />
    </FilterPanel>
  )
}

export default function AuthenticationLogs() {
  const { data } = useLoaderData<typeof clientLoader>()

  return (
    <PageContainer
      query={{
        'filter[ip_address]': '',
      }}
    >
      <Filter />
      <ResourceTable<components['schemas']['AuthenticationLogResource']>
        name="authentication_logs"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
      />
    </PageContainer>
  )
}
