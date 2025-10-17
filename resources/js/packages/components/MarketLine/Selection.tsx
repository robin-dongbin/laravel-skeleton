import { useBetSelection } from '@/packages/contexts/BetSelectionContext.tsx'
import { Tooltip } from '@mantine/core'

export interface SelectionProps {
  name: string
  key: string
  odds: number
}

export default function Selection({
  data,
  className,
}: {
  data: SelectionProps
  className?: string
}) {
  const betSelection = useBetSelection()

  return (
    <div
      className={`flex items-center justify-between gap-2 p-2 ${data.key === betSelection.key ? 'bg-primary-filled text-white' : 'bg-gray-1 dark:bg-dark-6'} ${className}`}
    >
      <Tooltip label={data.name}>
        <div className="truncate">{data.name}</div>
      </Tooltip>
      <div>{data.odds}</div>
    </div>
  )
}
