import { Checkbox, Image } from '@mantine/core'
import { memo } from 'react'

// 抽离单个 media 项为独立组件并 memo
const MediaItem = memo(({ url, value }: { url: string; value: number }) => {
  console.log('Render MediaItem', value)
  return (
    <Checkbox.Card
      className="data-checked:outline-primary h-52 overflow-hidden data-checked:outline-3"
      radius="md"
      key={value}
      value={String(value)}
    >
      <Image
        src={url}
        className="h-full"
        fit="cover"
        loading="lazy" // 添加懒加载
      />
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
  console.log('Render =', value)
  const handleChange = (next: string[]) => {
    if (multiple) {
      onChange(next)
    } else {
      // 只允许选择一个：保留最后一个点击的选项
      onChange(next.slice(-1))
    }
  }

  return (
    <Checkbox.Group value={value} onChange={handleChange}>
      <div className="grid grid-cols-5 gap-4">
        {data.map((o) => (
          <MediaItem key={o.id} value={o.id} url={o.url} />
        ))}
      </div>
    </Checkbox.Group>
  )
}
