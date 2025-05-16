import { $api, $fetch } from '@/apps/admin/libs/request'
import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder'
import type { components } from '@/types/admin'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useSubmit } from 'react-router'
import { getQuery } from 'ufo'
import UserField from '../../components/UserField'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/users', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

export default function Users() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { data: roles } = $api.useQuery('get', '/roles')
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
        render: (row) => <UserField user={row} />,
      },
      {
        accessor: 'role_display',
        title: t('fields.users.role'),
      },
      {
        accessor: 'mobile',
      },
      {
        accessor: 'status_display',
        title: t('fields.users.status'),
      },
      {
        accessor: 'created_at',
        sortable: true,
      },
    ],
    [t],
  )

  return (
    <PageContainer>
      <TabFilter
        data={[
          { value: 'active', label: t('enums.active') },
          { value: 'banned', label: t('enums.banned') },
          { value: 'all', label: t('enums.all') },
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
