import { $api } from '@/apps/admin/libs/request.ts'
import type { components } from '@/types/admin'
import { CloseButton, Image } from '@mantine/core'
import { useState } from 'react'

export default function MediaPreviewer({
  media,
}: {
  media?: components['schemas']['MediaResource']
}) {
  const { mutate } = $api.useMutation('delete', '/media/{medium}', {
    onSuccess: async () => {
      setPreview(undefined)
    },
  })

  const [preview, setPreview] = useState(media)

  return (
    preview && (
      <div className="relative w-fit">
        <Image
          src={preview?.url}
          className="h-24 w-24"
          fit="cover"
          loading="lazy"
          radius="md"
        />
        <CloseButton
          size="sm"
          onClick={() => mutate({ params: { path: { medium: preview?.id } } })}
          className="absolute top-0 right-0"
        />
      </div>
    )
  )
}
