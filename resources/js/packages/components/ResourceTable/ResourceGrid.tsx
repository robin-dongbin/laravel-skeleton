import { Checkbox } from '@mantine/core'

export default function ResourceGrid<T extends Record<string, any>>({
  records,
  render,
  metaRender,
  selectedRecords,
  onSelectedRecordsChange,
  onQueryChange,
}: {
  records?: T[]
  render: (record: T) => React.ReactNode
  metaRender?: (record: T) => React.ReactNode
  selectedRecords?: string[]
  onSelectedRecordsChange?: (value: string[]) => void
  onQueryChange: (query: { page: number; per_page?: number; sort?: string }) => void
}) {
  return (
    <Checkbox.Group
      readOnly={!selectedRecords}
      value={selectedRecords}
      onChange={onSelectedRecordsChange}
      className="@container"
    >
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
  )
}
