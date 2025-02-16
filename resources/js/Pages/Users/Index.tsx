import Page from '@/components/Page'
import { ActionButton, ResourceTable } from '@/components/ResourceTable'
import type { PageProps, PaginatedData } from '@/types'
import { usePage } from '@inertiajs/react'
import { Button } from '@mantine/core'
import type { DataTableProps } from 'mantine-datatable'

interface User {
  id: number
  username: string
  nickname: string
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
    accessor: 'actions',
    render: ({ id }) => (
      <>
        <ActionButton color="yellow" url={route('admin.users.edit', [id])}>
          Edit
        </ActionButton>
        <ActionButton
          color="red"
          url={route('admin.users.destroy', [id])}
          method="delete"
          confirmation={'Are you sure?'}
        >
          Delete
        </ActionButton>
      </>
    ),
  },
]

export default function Index() {
  const { data, filters } = usePage<PageProps<PaginatedData<User>>>().props

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
