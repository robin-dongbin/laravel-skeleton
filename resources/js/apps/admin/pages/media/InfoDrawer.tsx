import dayjs from '@/packages/libs/dayjs.ts'
import type { components } from '@/types/admin'
import { Button, Drawer, type DrawerProps, Image } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useFetcher } from 'react-router'

const Info = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <p className="border-gray-3 dark:border-gray-8 flex justify-between border-b py-2">
    <span className="text-gray-6">{label}</span>
    <span className="max-w-72 truncate">{children}</span>
  </p>
)

export default function InfoDrawer({
  opened,
  onClose,
  data,
}: DrawerProps & {
  data?: components['schemas']['MediaResource']
}) {
  const { t } = useTranslation()
  const fetcher = useFetcher()

  const handleDelete = () => {
    fetcher.submit(null, { action: `${data?.id}`, method: 'DELETE' })
    onClose()
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      classNames={{ title: 'truncate max-w-72' }}
      title={data?.alt}
    >
      <Image src={data?.url} className="max-h-72 rounded" fit="cover" loading="lazy" />
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <h5 className="border-gray-3 dark:border-gray-8 border-b py-2">{t('information')}</h5>
          <div className="text-sm">
            <Info label={t('fields.media.filename')}>
              {data?.filename}.{data?.extension}
            </Info>
            <Info label={t('fields.media.size')}>{data?.size}</Info>
            <Info label={t('fields.media.created_at')}>{dayjs(data?.created_at).format('YYYY/MM/DD HH:mm:ss')}</Info>
            <Info label={t('fields.media.id')}>{data?.id}</Info>
            <Info label={t('fields.media.aggregate_type')}>{data?.aggregate_type}</Info>
            <Info label={t('fields.media.alt')}>{data?.alt}</Info>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button fullWidth component={Link} to={data?.url as string} target="_blank">
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
