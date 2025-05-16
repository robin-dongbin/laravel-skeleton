import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable } from '@/packages/components/ResourceTable'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import UserField from '@admin/components/UserField'
import { $fetch } from '@admin/libs/request.ts'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useSubmit } from 'react-router'
import { getQuery } from 'ufo'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/authentication-logs', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

export default function AuthenticationLogs() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const submit = useSubmit()
  const { builder, apply, reset, handleQueryChange } = useQueryBuilder<{
    'filter[ip_address]': string
  }>(
    {
      'filter[ip_address]': '',
    },
    {
      onQuery: (values) => submit(values),
    },
  )

  const columns: DataTableColumn<components['schemas']['AuthenticationLogResource']>[] = useMemo(
    () => [
      {
        accessor: 'user',
        render: (row) => <UserField user={row.user!} />,
      },
      {
        accessor: 'ip_address',
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
    ],
    [],
  )

  return (
    <PageContainer>
      <AdvancedFilter onSubmit={apply} onReset={reset}>
        <TextInput
          label={t('fields.request_logs.ip_address')}
          key={builder.key('filter[ip_address]')}
          {...builder.getInputProps('filter[ip_address]')}
        />
      </AdvancedFilter>
      <ResourceTable<components['schemas']['AuthenticationLogResource']>
        name="authentication_logs"
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
