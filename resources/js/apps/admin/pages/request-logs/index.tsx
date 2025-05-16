import { $fetch } from '@/apps/admin/libs/request.ts'
import JsonView from '@/packages/components/JsonView'
import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable } from '@/packages/components/ResourceTable'
import ActionButton from '@/packages/components/ResourceTable/ActionButton'
import { drawers } from '@/packages/drawers'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { Select, Tabs, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useSubmit } from 'react-router'
import { getQuery } from 'ufo'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/request-logs', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

export default function RequestLogs() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const submit = useSubmit()

  const { builder, apply, reset, handleQueryChange } = useQueryBuilder<{
    'filter[method]': string | null
    'filter[path]': string
    'filter[response_status]': string | null
    'filter[ip_address]': string
  }>(
    {
      'filter[method]': null,
      'filter[path]': '',
      'filter[response_status]': null,
      'filter[ip_address]': '',
    },
    {
      onQuery: (values) => submit(values),
    },
  )

  const columns: DataTableColumn<components['schemas']['RequestLogResource']>[] = useMemo(
    () => [
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
        accessor: 'ip_address',
      },
      {
        accessor: 'duration',
        sortable: true,
        render: ({ duration }) => <span>{duration ? `${duration} ms` : '-'}</span>,
      },
      {
        accessor: 'memory',
        sortable: true,
      },
      {
        accessor: 'created_at',
        sortable: true,
      },
      {
        accessor: 'actions',
        render: (record: components['schemas']['RequestLogResource']) => {
          return (
            <>
              <ActionButton
                color="blue"
                onClick={() => {
                  drawers.open({
                    title: `${t('actions.view')}${t('navigation.request')} - ${record?.id}`,
                    position: 'right',
                    size: 'xl',
                    children: (
                      <Tabs defaultValue="payload">
                        <Tabs.List>
                          <Tabs.Tab value="payload">{t('fields.request_logs.payload')}</Tabs.Tab>
                          <Tabs.Tab value="headers">{t('fields.request_logs.headers')}</Tabs.Tab>
                          <Tabs.Tab value="response">{t('fields.request_logs.response')}</Tabs.Tab>
                        </Tabs.List>

                        <div className="py-4">
                          <Tabs.Panel value="payload">
                            <JsonView src={record.payload} />
                          </Tabs.Panel>

                          <Tabs.Panel value="headers">
                            <JsonView src={record.headers} />
                          </Tabs.Panel>

                          <Tabs.Panel value="response">
                            <JsonView src={record.response} />
                          </Tabs.Panel>
                        </div>
                      </Tabs>
                    ),
                  })
                }}
              >
                {t('actions.view')}
              </ActionButton>
            </>
          )
        },
      },
    ],
    [t],
  )

  return (
    <PageContainer>
      <AdvancedFilter onSubmit={apply} onReset={reset}>
        <Select
          label={t('fields.request_logs.method')}
          data={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
          key={builder.key('filter[method]')}
          {...builder.getInputProps('filter[method]')}
        />
        <TextInput
          label={t('fields.request_logs.path')}
          key={builder.key('filter[path]')}
          {...builder.getInputProps('filter[path]')}
        />
        <Select
          clearable
          label={t('fields.request_logs.response_status')}
          data={['200', '201', '204', '400', '401', '403', '404', '422', '500', '503']}
          key={builder.key('filter[response_status]')}
          {...builder.getInputProps('filter[response_status]')}
        />
        <TextInput
          label={t('fields.request_logs.ip_address')}
          key={builder.key('filter[ip_address]')}
          {...builder.getInputProps('filter[ip_address]')}
        />
      </AdvancedFilter>
      <ResourceTable<components['schemas']['RequestLogResource']>
        name="request_logs"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        page={builder.getValues().page}
        recordsPerPage={builder.getValues().per_page}
        sort={builder.getValues().sort}
        onQueryChange={handleQueryChange}
      />
    </PageContainer>
  )
}
