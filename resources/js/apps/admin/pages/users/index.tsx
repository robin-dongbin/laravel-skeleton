import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
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

export default function Users() {
  const { data } = useLoaderData<typeof clientLoader>()
  const role = useFetcher()
  const { t } = useTranslation()

  useEffect(() => {
    role.load('/roles')
  }, [])

  const query = useQueryBuilder<{
    username: string
    nickname: string
    role: string
    status: string
  }>({
    username: '',
    nickname: '',
    role: null,
    status: 'active',
  })

  const columns: DataTableColumn<UserResource>[] = [
    {
      accessor: 'id',
      title: '#',
      sortable: true,
    },
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
  ]

  return (
    <PageContainer actions={<Button>Create</Button>}>
      <TabFilter
        query={query}
        field="status"
        data={[
          { value: 'active', label: 'Active' },
          { value: 'banned', label: 'Banned' },
          { value: 'all', label: 'All' },
        ]}
      />
      <FilterPanel query={query}>
        <TextInput label={t('resource.user.username')} {...query.getInputProps('filter.username')}></TextInput>
        <TextInput label={t('resource.user.nickname')} {...query.getInputProps('filter.nickname')}></TextInput>
        <Select
          label={t('resource.user.role')}
          {...query.getInputProps('filter.role')}
          data={role.data?.data.data.map((o: { value: number }) => ({ ...o, value: String(o.value) })) || []}
        ></Select>
      </FilterPanel>
      <ResourceTable<UserResource>
        resourceName="user"
        columns={columns}
        records={data.data}
        totalRecords={data.meta.total}
        query={query}
      />
    </PageContainer>
  )
}
