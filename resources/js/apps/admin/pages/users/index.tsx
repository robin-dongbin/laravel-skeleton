import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useSubmit } from 'react-router'
import { getQuery } from 'ufo'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const [{ data: roles }, { data }] = await Promise.all([
    $fetch.GET('/roles', { signal: request.signal }),
    $fetch.GET('/users', {
      params: { query },
      signal: request.signal,
    }),
  ])

  return { data, roles }
}

export default function Users() {
  const { data, roles } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const submit = useSubmit()
  const { builder, apply, reset, handleQueryChange } = useQueryBuilder<{
    'filter[username]': string
    'filter[nickname]': string
    'filter[role]': string | null
    'filter[status]': string
  }>(
    {
      'filter[username]': '',
      'filter[nickname]': '',
      'filter[role]': null,
      'filter[status]': 'active',
    },
    {
      onQuery: (values) => submit(values),
    },
  )

  const columns: DataTableColumn<components['schemas']['UserResource']>[] = useMemo(
    () => [
      {
        accessor: 'username',
      },
      {
        accessor: 'nickname',
      },
      {
        accessor: 'role',
      },
      {
        accessor: 'mobile',
      },
      {
        accessor: 'status',
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
      <TabFilter
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'banned', label: t('enums.Banned') },
          { value: 'all', label: t('enums.All') },
        ]}
        value={builder.getValues()['filter[status]']}
        onChange={(value) => handleQueryChange({ 'filter[status]': value, page: 1 })}
      />
      <AdvancedFilter onSubmit={apply} onReset={reset}>
        <TextInput
          label={t('fields.users.username')}
          key={builder.key('filter[username]')}
          {...builder.getInputProps('filter[username]')}
        />
        <TextInput
          label={t('fields.users.nickname')}
          key={builder.key('filter[nickname]')}
          {...builder.getInputProps('filter[nickname]')}
        />
        <Select
          label={t('fields.users.role')}
          data={roles?.data.map((role) => ({ ...role, value: String(role.value) }))}
          key={builder.key('filter[role]')}
          {...builder.getInputProps('filter[role]')}
        />
      </AdvancedFilter>
      <ResourceTable<components['schemas']['UserResource']>
        name="users"
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
