import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminRolesIndexResponse, AdminUsersIndexResponse, UserResource } from '@admin//types/api'
import { Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const [{ data: roles }, { data }] = await Promise.all([
    $fetch<AdminRolesIndexResponse>(admin.roles.index(), request),
    $fetch<AdminUsersIndexResponse>(admin.users.index(), request),
  ])
  return { data, roles }
}

const columns: DataTableColumn<UserResource>[] = [
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

const filters = {
  username: '',
  nickname: '',
  role: null,
  status: 'active',
}

function Filter({ roles }) {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  return (
    <FilterPanel>
      <TextInput
        label={t('fields.users.username')}
        name="filter.username"
        {...query.getInputProps('filter.username')}
      />
      <TextInput
        label={t('fields.users.nickname')}
        name="filter.nickname"
        {...query.getInputProps('filter.nickname')}
      />
      <Select
        label={t('fields.users.role')}
        name="filter.role"
        {...query.getInputProps('filter.role')}
        data={roles.map((o: { value: number }) => ({ ...o, value: String(o.value) }))}
      />
    </FilterPanel>
  )
}

export default function Users() {
  const { data, roles } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()

  return (
    <PageContainer filters={filters}>
      <TabFilter
        field="status"
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'banned', label: t('enums.Banned') },
          { value: 'all', label: t('enums.All') },
        ]}
      />
      <Filter roles={roles.data || []} />
      <ResourceTable<UserResource> name="users" columns={columns} records={data.data} totalRecords={data.meta.total} />
    </PageContainer>
  )
}
