import { Checkbox, LoadingOverlay, Paper } from '@mantine/core'
import { DataTable, type DataTableProps } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { PAGE_SIZES } from './ResourceTable'

type ResourceGirdProps<T> = Omit<
  DataTableProps<T>,
  | 'withColumnBorders'
  | 'withTableBorder'
  | 'highlightOnHover'
  | 'recordsPerPageLabel'
  | 'columns'
  | 'onSortStatusChange'
> & {
  fetching?: boolean
  multiple?: boolean
  toolbar?: React.ReactNode
  toolbarVisible?: boolean
  sort: string
  render: (record: T) => React.ReactNode
  metaRender?: (record: T) => React.ReactNode
  onQueryChange: (query: { page: number; per_page?: number; sort?: string }) => void
}

export default function ResourceGrid<T extends Record<string, any>>({
  records,
  render,
  metaRender,
  selectedRecords,
  onSelectedRecordsChange,
  toolbar,
  toolbarVisible = false,
  onQueryChange,
  fetching = false,
  multiple = false,
  ...props
}: ResourceGirdProps<T>) {
  const { t } = useTranslation()

  const value = selectedRecords?.map((record) => String(record.id))

  const handlePageChange = (page: number) => {
    onQueryChange({ page })
  }

  const handleRecordsPerPageChange = (per_page: number) => {
    onQueryChange({ per_page, page: 1 })
  }

  const onChange = (value: string[]) => {
    if (!multiple) {
      value = value.slice(-1)
    }
    onSelectedRecordsChange?.(value.map((id) => records?.find((record) => String(record.id) === id) as T))
  }

  return (
    <Paper className="dark:bg-dark-8 bg-gray-0 p-4">
      {toolbarVisible && <div className="mb-4">{toolbar}</div>}
      <div className="relative flex flex-col gap-4">
        <Checkbox.Group readOnly={!selectedRecords} value={value} onChange={onChange} className="@container">
          <div className="grid grid-cols-1 gap-4 @lg:grid-cols-3 @5xl:grid-cols-5">
            {records?.map((record) => (
              <div key={record.id} className="flex flex-col gap-2">
                <Checkbox.Card
                  className="data-checked:outline-primary overflow-hidden data-checked:outline-3"
                  radius="md"
                  value={String(record.id)}
                  withBorder={false}
                >
                  {render(record)}
                </Checkbox.Card>
                {metaRender && metaRender(record)}
              </div>
            ))}
          </div>
        </Checkbox.Group>
        <DataTable<T>
          classNames={{
            root: 'dark:bg-dark-8 bg-gray-0',
            table: 'dark:bg-dark-8 bg-gray-0',
            header: 'dark:bg-dark-7 bg-gray-1',
            pagination: '!pt-4 !pb-0',
          }}
          minHeight={records && records.length > 0 ? 0 : 200}
          columns={[]}
          fetching={false}
          records={records}
          highlightOnHover
          borderRadius="sm"
          verticalSpacing="sm"
          noRecordsText={t('no_records')}
          recordsPerPageLabel={t('records_per_page')}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={handleRecordsPerPageChange}
          onPageChange={handlePageChange}
          {...(props as any)}
        />
        <LoadingOverlay visible={fetching} />
      </div>
    </Paper>
  )
}
