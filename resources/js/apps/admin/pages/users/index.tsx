import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminUsersIndexResponse, UserResource } from '@admin//types/api'
import { Badge, Button, Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router'

function getStatusColor(status: string) {
  switch (status) {
    case 'Approved':
      return 'green'
    case 'Rejected':
      return 'yellow'
    case 'Blocked':
    case 'Banned':
      return 'red'
    default:
      return 'gray'
  }
}

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
      render: ({ status }) => (
        <Badge radius="sm" size="sm" color={getStatusColor(status)}>
          {t(`enums.${status}`)}
        </Badge>
      ),
    },
    {
      accessor: 'created_at',
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
        <TextInput label={t('fields.user.username')} {...query.getInputProps('filter.username')}></TextInput>
        <TextInput label={t('fields.user.nickname')} {...query.getInputProps('filter.nickname')}></TextInput>
        <Select
          label={t('fields.user.role')}
          {...query.getInputProps('filter.role')}
          data={role.data?.data.data.map((o: { value: number }) => ({ ...o, value: String(o.value) })) || []}
        ></Select>
      </FilterPanel>
      <ResourceTable<UserResource>
        name="users"
        columns={columns}
        records={data.data}
        totalRecords={data.meta.total}
        query={query}
      />
    </PageContainer>
  )
}
