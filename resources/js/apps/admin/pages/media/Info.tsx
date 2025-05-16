import { $api } from '@/apps/admin/libs/request'
import ActionButton from '@/packages/components/ResourceTable/ActionButton'
import { drawers } from '@/packages/drawers'
import dayjs from '@/packages/libs/dayjs.ts'
import type { components } from '@/types/admin'
import { Button, Image, Text } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useRevalidator } from 'react-router'

const Item = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <p className="border-gray-3 dark:border-gray-8 flex justify-between border-b py-2">
    <span className="text-gray-6">{label}</span>
    <span className="max-w-72 truncate">{children}</span>
  </p>
)

export default function Info({ record }: { record: components['schemas']['MediaResource'] }) {
  const { t } = useTranslation()
  const { revalidate } = useRevalidator()

  const { mutate } = $api.useMutation('delete', '/media/{medium}', {
    onSuccess: () => {
      drawers.closeAll()
      revalidate()
    },
  })

  return (
    <div>
      <Image src={record.url} className="max-h-72 rounded" fit="cover" loading="lazy" />
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <h5 className="border-gray-3 dark:border-gray-8 border-b py-2">{t('information')}</h5>
          <div className="text-sm">
            <Item label={t('fields.media.filename')}>{record.filename}</Item>
            <Item label={t('fields.media.extension')}>{record.extension}</Item>
            <Item label={t('fields.media.size')}>{record.size}</Item>
            <Item label={t('fields.media.created_at')}>{dayjs(record.created_at).format('YYYY/MM/DD HH:mm:ss')}</Item>
            <Item label={t('fields.media.id')}>{record.id}</Item>
            <Item label={t('fields.media.aggregate_type')}>{record.aggregate_type}</Item>
            <Item label={t('fields.media.alt')}>{record.alt}</Item>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button fullWidth component={Link} to={record.url as string} target="_blank">
            {t('actions.view')}
          </Button>
          <ActionButton
            fullWidth
            size="sm"
            variant="default"
            confirmRequired
            confirmContent={
              <Text size="sm">{t('before_you_delete_please_confirm_there_is_no_resource_using_this_media')}</Text>
            }
            onClick={() => mutate({ params: { path: { medium: record.id } } })}
          >
            {t('actions.delete')}
          </ActionButton>
        </div>
      </div>
    </div>
  )
}
