import JsonView from '@/packages/components/JsonView.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRequestLogsIndexResponse, RequestLogResource } from '@admin/types/api'
import { Paper, Select, Tabs, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminRequestLogsIndexResponse>(admin.requestLogs.index(), request)

  return { data }
}

const columns: DataTableColumn<RequestLogResource>[] = [
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

const filters = {
  path: '',
  response_status: null,
  method: null,
  ip_address: '',
}

function Filter() {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  return (
    <FilterPanel>
      <Select
        label={t('fields.request_logs.method')}
        data={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
        {...query.getInputProps('filter.method')}
      />
      <TextInput label={t('fields.request_logs.path')} {...query.getInputProps('filter.path')} />
      <Select
        label={t('fields.request_logs.response_status')}
        data={['200', '201', '204', '400', '401', '403', '404', '422', '500', '503']}
        clearable
        {...query.getInputProps('filter.response_status')}
      />
      <TextInput label={t('fields.request_logs.ip_address')} {...query.getInputProps('filter.ip_address')} />
    </FilterPanel>
  )
}

const ExpandedRowContent = memo(({ record }: { record: RequestLogResource }) => {
  const { t } = useTranslation()

  return (
    <Paper>
      <Tabs defaultValue="payload">
        <Tabs.List>
          <Tabs.Tab value="payload">{t('fields.request_logs.payload')}</Tabs.Tab>
          <Tabs.Tab value="headers">{t('fields.request_logs.headers')}</Tabs.Tab>
          <Tabs.Tab value="response">{t('fields.request_logs.response')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="payload" className="p-4">
          <JsonView src={record.payload} />
        </Tabs.Panel>

        <Tabs.Panel value="headers" className="p-4">
          <JsonView src={record.headers} />
        </Tabs.Panel>

        <Tabs.Panel value="response">
          <JsonView src={record.response} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
})

export default function RequestLogs() {
  const { data } = useLoaderData<typeof clientLoader>()

  return (
    <PageContainer filters={filters}>
      <Filter />

      <ResourceTable<RequestLogResource>
        name="request_logs"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
      />
    </PageContainer>
  )
}
