import CheckableMedia from '@/packages/components/Media/CheckableMedia.tsx'
import PageContainer from '@/packages/components/PageContainer'
import UppyDashboard from '@/packages/components/UppyDashboard.tsx'
import dayjs from '@/packages/libs/dayjs.ts'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { Button, Drawer, type DrawerProps, Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, Link, useFetcher, useLoaderData, useRevalidator } from 'react-router'
import { getQuery } from 'ufo'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/media', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

function MediaInfoDrawer({
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
      <Image src={media?.url} className="max-h-75 rounded" fit="cover" />
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

export default function Media() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const revalidator = useRevalidator()
  const [checked, setChecked] = useState<string[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)

  const checkedMedia = data!.data.filter(({ id }) => checked.includes(id.toString())).at(-1)

  useEffect(() => {
    if (checked.length > 0) {
      open()
    }
  }, [checked])

  function handleClose() {
    setChecked([])
    close()
  }

  return (
    <PageContainer actions={<Button onClick={() => setShowUpload(true)}>{t('actions.upload')}</Button>}>
      {showUpload && <UppyDashboard doneButtonHandler={revalidator.revalidate} />}
      <CheckableMedia data={data!.data} value={checked} onChange={setChecked} />
      <MediaInfoDrawer opened={opened} onClose={handleClose} media={checkedMedia} />
    </PageContainer>
  )
}
