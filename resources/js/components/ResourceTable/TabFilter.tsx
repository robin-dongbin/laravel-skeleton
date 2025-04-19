import type { UseQueryBuilderReturn } from '@/hooks/useQueryBuilder'
import type { SegmentedControlItem } from '@mantine/core'
import { SegmentedControl, useMantineTheme } from '@mantine/core'

export default function TabFilter({
  query,
  field,
  data,
}: {
  query: UseQueryBuilderReturn<any>
  field: string
  data: (string | SegmentedControlItem)[]
}) {
  const theme = useMantineTheme()
  const value = query.getValues().filter[field]
  async function handleFilterChange(filter: string) {
    query.setFieldValue(`filter.${field}`, filter)
    query.setFieldValue('page', 1)
    await query.submit()
  }
  return (
    <div className="flex justify-center">
      <SegmentedControl
        className="w-xl"
        classNames={{ root: 'bg-gray-0 dark:bg-dark-8' }}
        data={data}
        value={value}
        color={theme.primaryColor}
        onChange={handleFilterChange}
      />
    </div>
  )
}
