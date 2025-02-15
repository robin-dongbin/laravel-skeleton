import Page from '@/components/Page'
import { ResourceTable } from '@/components/ResourceTable'
import type { PageProps, TableProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { Button } from '@mantine/core'

export default function Index() {
  const { table } = usePage<PageProps<TableProps>>().props

  return (
    <Page actions={<Button>Create</Button>}>
      <ResourceTable
        totalRecords={table.pagination.total}
        recordsPerPage={table.pagination.per_page}
        page={table.pagination.page}
        {...table}
      />
    </Page>
  )
}
