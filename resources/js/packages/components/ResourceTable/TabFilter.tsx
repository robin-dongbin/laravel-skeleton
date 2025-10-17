import {
  SegmentedControl,
  useMantineTheme,
  type SegmentedControlProps,
} from '@mantine/core'

export default function TabFilter(props: SegmentedControlProps) {
  const theme = useMantineTheme()

  return (
    <div className="flex justify-center">
      <SegmentedControl
        className="w-xl"
        classNames={{ root: 'bg-gray-0 dark:bg-dark-8' }}
        color={theme.primaryColor}
        {...props}
      />
    </div>
  )
}
