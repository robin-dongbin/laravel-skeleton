import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import { index } from '@actions/Admin/UserController'
import type { AdminUsersIndexResponse, UserResource } from '@admin//types/api'
import { Button, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminUsersIndexResponse>(index.url(), request)

  return { data }
}

const columns: DataTableColumn<UserResource>[] = [
  {
    accessor: 'id',
    title: '#',
    sortable: true,
  },
  {
    accessor: 'username',
    title: 'username',
  },
  {
    accessor: 'nickname',
    title: 'nickname',
  },
  {
    accessor: 'role',
    title: 'role',
  },
  {
    accessor: 'mobile',
    title: 'mobile',
  },
  {
    accessor: 'status',
    title: 'status',
  },
]

export default function Users() {
  const { data } = useLoaderData<typeof clientLoader>()

  const query = useQueryBuilder<{
    username: string
    nickname: string
    status: string
  }>({
    username: '',
    nickname: '',
    status: 'active',
  })

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
        <TextInput label="Username" {...query.getInputProps('filter.username')}></TextInput>
        <TextInput label="Nickname" {...query.getInputProps('filter.nickname')}></TextInput>
      </FilterPanel>
      <ResourceTable<UserResource> columns={columns} records={data.data} totalRecords={data.meta.total} query={query} />
    </PageContainer>
  )
}
