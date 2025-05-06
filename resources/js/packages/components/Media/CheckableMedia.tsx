import { Checkbox, Image } from '@mantine/core'
import { memo } from 'react'

// 抽离单个 media 项为独立组件并 memo
const MediaItem = memo(({ data, value }: { data: Record<string, any>; value: number }) => {
  return (
    <Checkbox.Card className="group" radius="md" key={value} value={String(value)} withBorder={false}>
      <Image
        src={data.url}
        className="group-data-checked:outline-primary h-52 rounded group-data-checked:outline-3"
        fit="cover"
        loading="lazy" // 添加懒加载
      />
      <div className="mt-2">
        <p className="flex text-sm">
          <span className="truncate">{data.filename}</span>
          <span>.{data.extension}</span>
        </p>
        <p className="text-gray-6 text-xs">{data.size}</p>
      </div>
    </Checkbox.Card>
  )
})

export default function CheckableMedia({
  data,
  value,
  onChange,
  multiple = false,
}: {
  multiple?: boolean
  value: string[]
  onChange: (value: string[]) => void
  data: { id: number; url: string; [key: string]: any }[]
}) {
  const handleChange = (next: string[]) => {
    if (multiple) {
      onChange(next)
    } else {
      onChange(next.slice(-1))
    }
  }

  return (
    <Checkbox.Group value={value} onChange={handleChange}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {data.map((o) => (
          <MediaItem key={o.id} value={o.id} data={o} />
        ))}
      </div>
    </Checkbox.Group>
  )
}
