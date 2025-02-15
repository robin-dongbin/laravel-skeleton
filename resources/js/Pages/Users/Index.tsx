import Page from '@/components/Page'
import { ActionButton, ResourceTable } from '@/components/ResourceTable'
import type { Filters, PageProps, PaginatedData } from '@/types'
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
  {
    accessor: 'actions',
    render: () => {
      return <ActionButton>Edit</ActionButton>
    },
  },
]

export default function Index() {
  const { data, filters } = usePage<PageProps<PaginatedData & Filters>>().props

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
