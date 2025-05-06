import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'
import { getQuery } from 'ufo'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/request-logs', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

const columns: DataTableColumn<components['schemas']['RequestLogResource']>[] = [
  {
    accessor: 'method',
  },
  {
    accessor: 'path',
  },
  {
    accessor: 'response_status',
  },
  {
    accessor: 'user',
  },
  {
    accessor: 'ip',
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

function Filter() {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  return (
    <FilterPanel>
      <Select
        label={t('fields.request_logs.method')}
        data={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
        value={query.getValues()['filter[method]']}
        onChange={(value) => query.setFieldValue('filter[method]', value)}
      />
      <TextInput
        label={t('fields.request_logs.path')}
        key={query.key('filter[path]')}
        {...query.getInputProps('filter[path]')}
      />
      <Select
        clearable
        label={t('fields.request_logs.response_status')}
        data={['200', '201', '204', '400', '401', '403', '404', '422', '500', '503']}
        value={query.getValues()['filter[response_status]']}
        onChange={(value) => query.setFieldValue('filter[response_status]', value)}
      />
      <TextInput
        label={t('fields.request_logs.ip_address')}
        key={query.key('filter[ip_address]')}
        {...query.getInputProps('filter[ip_address]')}
      />
    </FilterPanel>
  )
}

export default function RequestLogs() {
  const { data } = useLoaderData<typeof clientLoader>()

  return (
    <PageContainer
      query={{
        'filter[method]': null,
        'filter[path]': '',
        'filter[response_status]': null,
        'filter[ip_address]': '',
      }}
    >
      <Filter />
      <ResourceTable<components['schemas']['RequestLogResource']>
        name="request_logs"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
      />
    </PageContainer>
  )
}
