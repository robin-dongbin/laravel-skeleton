import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext'
import type { SegmentedControlItem } from '@mantine/core'
import { SegmentedControl, useMantineTheme } from '@mantine/core'

export default function TabFilter({ field, data }: { field: string; data: (string | SegmentedControlItem)[] }) {
  const { query, submit } = useQueryBuilderContext()
  const theme = useMantineTheme()

  async function handleChange(value: string) {
    query.setFieldValue(field, value)
    query.setFieldValue('page', 1)
    await submit()
  }

  return (
    <div className="flex justify-center">
      <SegmentedControl
        className="w-xl"
        classNames={{ root: 'bg-gray-0 dark:bg-dark-8' }}
        color={theme.primaryColor}
        data={data}
        value={query.getValues()[field]}
        onChange={handleChange}
      />
    </div>
  )
}
