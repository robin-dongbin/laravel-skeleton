import JsonView from '@/packages/components/JsonView.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRequestLogsIndexResponse, RequestLogResource } from '@admin/types/api'
import { Paper, Select, Tabs, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
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

export default function RequestLogs() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()

  const query = useQueryBuilder<{
    path: string
    response_status?: string
    method?: string
    ip_address: string | null
  }>({
    path: '',
    response_status: null,
    method: null,
    ip_address: '',
  })

  return (
    <PageContainer>
      <FilterPanel query={query}>
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
      <ResourceTable<RequestLogResource>
        name="request_logs"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        query={query}
        rowExpansion={{
          allowMultiple: true,
          content: ({ record }) => (
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
          ),
        }}
      />
    </PageContainer>
  )
}
