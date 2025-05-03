import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminAuthenticationLogsIndexResponse, AuthenticationLogResource } from '@admin/types/api'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminAuthenticationLogsIndexResponse>(admin.authenticationLogs.index(), request)

  return { data }
}

const columns: DataTableColumn<AuthenticationLogResource>[] = [
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

const filters = {
  ip_address: '',
}

function Filter() {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  return (
    <FilterPanel>
      <TextInput label={t('fields.request_logs.ip_address')} {...query.getInputProps('filter.ip_address')} />
    </FilterPanel>
  )
}

export default function AuthenticationLogs() {
  const { data } = useLoaderData<typeof clientLoader>()

  return (
    <PageContainer filters={filters}>
      <Filter />
      <ResourceTable<AuthenticationLogResource>
        name="authentication_logs"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
      />
    </PageContainer>
  )
}
