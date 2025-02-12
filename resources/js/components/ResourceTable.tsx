import { Icon } from '@iconify/react'
import { router } from '@inertiajs/react'
import type { MantineComponent } from '@mantine/core'
import { ActionIcon, Button, Drawer, Input, Paper, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DataTable, type DataTableProps } from 'mantine-datatable'

type ResourceTableProps = Omit<
  DataTableProps,
  | 'withColumnBorders'
  | 'withTableBorder'
  | 'highlightOnHover'
  | 'customLoader'
  | 'recordsPerPageLabel'
  | 'recordsPerPageOptions'
  | 'onPageChange'
  | 'onRecordsPerPageChange'
> & { filters?: { component: string; label: string }[] }

const PAGE_SIZES = [15, 30, 50, 100, 200]

const componentMap: Record<string, MantineComponent<any>> = {
  TextInput,
  Select,
}

function FilterComponent({ component, ...props }) {
  const Comp = componentMap[component]

  return <Comp {...props} />
}

export default function ResourceTable({ filters, ...props }: ResourceTableProps) {
  const [opened, { open, close }] = useDisclosure(false)

  function onPageChange(page: number) {
    router.reload({ data: { page }, only: ['data'] })
  }

  function onRecordsPerPageChange(limit: number) {
    router.reload({ data: { page: 1, limit }, only: ['data'] })
  }

  return (
    <Paper className="dark:bg-dark-8 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <Input placeholder="Search" leftSection={<Icon icon="lucide:search" />} />
        <div>
          <ActionIcon variant="subtle" color="none" onClick={open}>
            <Icon icon="lucide:filter" />
          </ActionIcon>
          <ActionIcon variant="subtle" color="none" onClick={() => router.reload()}>
            <Icon icon="lucide:refresh-cw" />
          </ActionIcon>
        </div>
      </div>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Filters"
        classNames={{ header: 'dark:bg-dark-8 bg-gray-1' }}
      >
        <div className="flex flex-col gap-2 py-4">
          {filters.map(({ component, label, ...props }) => (
            <FilterComponent key={label} component={component} label={label} {...props} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-2">
          <Button fullWidth>Apply</Button>
          <Button fullWidth variant="outline">
            Reset
          </Button>
        </div>
      </Drawer>
      <DataTable
        withColumnBorders
        withTableBorder
        highlightOnHover
        borderRadius="sm"
        recordsPerPageLabel="Records per page"
        recordsPerPageOptions={PAGE_SIZES}
        onPageChange={onPageChange}
        onRecordsPerPageChange={onRecordsPerPageChange}
        {...(props as any)}
      />
    </Paper>
  )
}
