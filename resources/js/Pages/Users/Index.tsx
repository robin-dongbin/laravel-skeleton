import Page from '@/components/Page'
import ResourceTable from '@/components/ResourceTable'
import type { PageProps, PaginatedData } from '@/types'
import { usePage } from '@inertiajs/react'
import { Button } from '@mantine/core'

const columns = [
  {
    accessor: 'id',
    title: '#',
  },
  { accessor: 'username' },
  {
    accessor: 'nickname',
  },
  { accessor: 'bornIn' },
]

const filters = [
  {
    label: 'username',
    component: 'TextInput',
  },
  {
    label: 'Role',
    component: 'Select',
    data: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
]

export default function Index() {
  const { data } = usePage<PageProps<PaginatedData>>().props

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
