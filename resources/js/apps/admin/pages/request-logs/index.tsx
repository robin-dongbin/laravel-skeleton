import JsonView from '@/packages/components/JsonView.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRequestLogsIndexResponse, RequestLogResource } from '@admin/types/api'
import { Badge, Paper, Select, Tabs, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
        rowExpansion={{
          allowMultiple: true,
          content: ({ record }) => (
            <Paper className="">
              <Tabs defaultValue="payload">
                <Tabs.List>
                  <Tabs.Tab value="payload">{t('fields.request.payload')}</Tabs.Tab>
                  <Tabs.Tab value="headers">{t('fields.request.headers')}</Tabs.Tab>
                  <Tabs.Tab value="response">{t('fields.request.response')}</Tabs.Tab>
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
