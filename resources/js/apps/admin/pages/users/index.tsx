import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'
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
};

const columns: DataTableColumn<components['schemas']['UserResource']>[] = [
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
  },
]

const Filter = ({ roles }: { roles?: { value: string; label: string }[] }) => {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  return (
    <FilterPanel>
      <TextInput
        label={t('fields.users.username')}
        key={query.key('filter[username]')}
        {...query.getInputProps('filter[username]')}
      />
      <TextInput
        label={t('fields.users.nickname')}
        key={query.key('filter[nickname]')}
        {...query.getInputProps('filter[nickname]')}
      />
      <Select
        label={t('fields.users.role')}
        data={roles?.map((role) => ({ ...role, value: String(role.value) }))}
        value={query.getValues()['filter[role]']}
        onChange={(value) => query.setFieldValue('filter[role]', value)}
      />
    </FilterPanel>
  )
};

export default function Users() {
  const { data, roles } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()

  return (
    <PageContainer
      query={{
        'filter[username]': '',
        'filter[nickname]': '',
        'filter[role]': null,
        'filter[status]': 'active',
      }}
    >
      <TabFilter
        field="filter[status]"
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'banned', label: t('enums.Banned') },
          { value: 'all', label: t('enums.All') },
        ]}
      />
      <Filter roles={roles?.data} />
      <ResourceTable<components['schemas']['UserResource']>
        name="users"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
      />
    </PageContainer>
  )
}
