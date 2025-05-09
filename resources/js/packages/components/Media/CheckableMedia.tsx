import type { components } from '@/types/admin'
import { Button, Checkbox, Image } from '@mantine/core'
import { useTranslation } from 'react-i18next'

const MediaItem = ({ data, value }: { data: Record<string, any>; value: number }) => {
  return (
    <Checkbox.Card
      className="data-checked:outline-primary overflow-hidden data-checked:outline-3"
      radius="md"
      key={value}
      value={String(value)}
      withBorder={false}
    >
      <Image
        src={data.url}
        className="h-52"
        fit="cover"
        loading="lazy" // 添加懒加载
      />
    </Checkbox.Card>
  )
}

export default function CheckableMedia({
  data,
  value,
  onChange,
  onPreview,
}: {
  value: string[]
  onChange: (value: string[]) => void
  onPreview: (media: components['schemas']['MediaResource']) => void
  data: components['schemas']['MediaResource'][]
}) {
  const { t } = useTranslation()

  return (
    <Checkbox.Group value={value} onChange={onChange}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {data.map((item) => (
          <div key={item.id}>
            <MediaItem value={item.id} data={item} />
            <div className="mt-2">
              <p className="flex text-sm">
                <span className="truncate">{item.filename}</span>
                <span>.{item.extension}</span>
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-gray-6 text-xs">{item.size}</p>
                <Button size="compact-xs" variant="light" color="blue" onClick={() => onPreview(item)}>
                  {t('actions.preview')}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Checkbox.Group>
  )
}
