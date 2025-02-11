import ResourceTable from '@/components/ResourceTable'
import type { IndexPageProps } from '@/types'
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
// const filters = (
//   <>
//     <TextInput label="Username" />
//   </>
// )

export default function IndexPage() {
  const { data } = usePage<IndexPageProps>().props

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
        <div>
          <Button>Create</Button>
        </div>
      </div>
      <ResourceTable
        columns={columns}
        records={data.data}
        totalRecords={data.total}
        recordsPerPage={data.per_page}
        page={data.current_page}
        filters={filters}
      />
    </>
  )
}
