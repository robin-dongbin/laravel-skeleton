import dayjs from '@/packages/libs/dayjs.ts'
import type { components } from '@/types/admin'
import { Button, Drawer, type DrawerProps, Image } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { Link, useFetcher } from 'react-router'

export default function MediaInfoDrawer({
  opened,
  onClose,
  media,
}: DrawerProps & {
  media?: components['schemas']['MediaResource']
}) {
  const { t } = useTranslation()
  const fetcher = useFetcher()

  function handleDelete() {
    fetcher.submit(null, { action: `${media?.id}`, method: 'DELETE' })
    onClose()
  }

  return (
    <Drawer opened={opened} onClose={onClose} position="right" classNames={{ title: 'truncate' }} title={media?.alt}>
      <Image src={media?.url} className="max-h-75 rounded" fit="cover" loading="lazy" />
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <p className="flex">
            <span className="truncate">{media?.filename}</span>
            <span>.{media?.extension}</span>
          </p>
          <p className="text-gray-6 text-sm">{media?.size}</p>
        </div>
        <div>
          <h5 className="border-gray-3 dark:border-gray-8 border-b py-2">{t('information')}</h5>
          <div className="text-sm">
            <p className="border-gray-3 dark:border-gray-8 flex justify-between border-b py-2">
              <span className="text-gray-6">{t('fields.media.created_at')}</span>
              <span>{dayjs(media?.created_at).format('YYYY/MM/DD HH:mm:ss')}</span>
            </p>
            <p className="border-gray-3 dark:border-gray-8 flex justify-between border-b py-2">
              <span className="text-gray-6">{t('fields.media.id')}</span>
              <span>{media?.id}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button fullWidth component={Link} to={media?.url as string} target="_blank">
            {t('actions.view')}
          </Button>
          <Button fullWidth variant="default" onClick={handleDelete}>
            {t('actions.delete')}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
