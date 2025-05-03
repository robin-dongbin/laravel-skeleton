import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminUsersIndexResponse, UserResource } from '@admin//types/api'
import { Button, Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminUsersIndexResponse>(admin.users.index(), request)

  return { data }
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

function Filter() {
  const { t } = useTranslation()
  const role = useFetcher()
  const query = useQueryBuilderContext()

  useEffect(() => {
    role.load('/roles')
  }, [])

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
        data={role.data?.data.data.map((o: { value: number }) => ({ ...o, value: String(o.value) })) || []}
      />
    </FilterPanel>
  )
}

export default function Users() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()

  return (
    <PageContainer filters={filters} actions={<Button>{t('actions.create')}</Button>}>
      <TabFilter
        field="status"
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'banned', label: t('enums.Banned') },
          { value: 'all', label: t('enums.All') },
        ]}
      />
      <Filter />
      <ResourceTable<UserResource> name="users" columns={columns} records={data.data} totalRecords={data.meta.total} />
    </PageContainer>
  )
}
