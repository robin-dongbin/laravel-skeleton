import Page from '@/components/Page'
import { ActionButton, ResourceTable } from '@/components/ResourceTable'
import dayjs from '@/plugins/dayjs'
import type { PaginatedData } from '@/types'
import { Button } from '@mantine/core'
import type { DataTableProps } from 'mantine-datatable'

interface User {
  id: number
  username: string
  nickname: string
  created_at: string
}

const columns: DataTableProps<User>['columns'] = [
  {
    accessor: 'id',
    title: '#',
  },
  { accessor: 'username' },
  {
    accessor: 'nickname',
  },
  {
    accessor: 'created_at',
    render: ({ created_at }) => dayjs(created_at).format('YYYY/MM/DD HH:mm:ss'),
  },
  {
    accessor: 'actions',
    render: ({ id }) => (
      <>
        <ActionButton color="yellow" href={route('admin.users.edit', [id])}>
          Edit
        </ActionButton>
        <ActionButton
          color="red"
          href={route('admin.users.destroy', [id])}
          method="delete"
          confirmation={'Are you sure?'}
        >
          Delete
        </ActionButton>
      </>
    ),
  },
]

export default function Index({ data, filters }: PaginatedData<User>) {
  return (
    <Page actions={<Button>Create</Button>}>
      <ResourceTable
        columns={columns}
        records={data.data}
        totalRecords={data.total}
        recordsPerPage={data.per_page}
        page={data.current_page}
        filters={filters}
      />
    </Page>
  )
}
