import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/hooks/useQueryBuilder'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminIpsIndexResponse } from '@admin//types/api'
import { Button, Image, Paper, Radio, TextInput } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'
import UploadModal from './create.tsx'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminIpsIndexResponse>(admin.media.index(), request)

  return { data }
}

function CheckableImages({ data }) {
  const [value, setValue] = useState('1')
  return (
    <Radio.Group value={value} onChange={setValue}>
      <div className="grid grid-cols-5 gap-4">
        {data.map((o) => (
          <Radio.Card
            className="data-checked:outline-primary-5 h-52 overflow-hidden data-checked:outline-3"
            radius="md"
            value={String(o.id)}
          >
            <Image src={o.url} className="h-full" />
          </Radio.Card>
        ))}
      </div>
    </Radio.Group>
  )
}
export default function Media() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [showing, setShowing] = useState({})

  const query = useQueryBuilder<{
    address: string
    status?: string
  }>({
    address: '',
    status: 'active',
  })

  return (
    <PageContainer actions={<Button onClick={() => setOpen(true)}>{t('actions.create')}</Button>}>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <FilterPanel query={query}>
            <TextInput label={t('fields.ips.address')} {...query.getInputProps('filter.address')}></TextInput>
          </FilterPanel>
          <CheckableImages data={data.data}></CheckableImages>
          <UploadModal open={open}></UploadModal>
        </div>
        <Paper className="dark:bg-dark-8 bg-gray-0 flex w-xs gap-4 p-4">
          <span>请选择图片</span>
          {showing && <Image src={showing.url} />}
          <Button>{t('actions.delete')}</Button>
        </Paper>
      </div>
    </PageContainer>
  )
}
