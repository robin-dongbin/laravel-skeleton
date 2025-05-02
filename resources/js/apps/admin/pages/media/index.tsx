import PageContainer from '@/packages/components/PageContainer'
import UppyDashboard from '@/packages/components/UppyDashboard.tsx'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminIpsIndexResponse } from '@admin//types/api'
import { Button, Image, Paper, Radio } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminIpsIndexResponse>(admin.media.index(), request)

  return { data }
}

function CheckableImages({ data }) {
  const [value, setValue] = useState(null)
  return (
    <Radio.Group value={value} onChange={setValue}>
      <div className="grid grid-cols-5 gap-4">
        {data.map((o) => (
          <Radio.Card
            className="data-checked:outline-primary h-52 overflow-hidden data-checked:outline-3"
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
  const [showUpload, setShowUpload] = useState(false)

  return (
    <PageContainer actions={<Button onClick={() => setShowUpload(true)}>{t('actions.upload')}</Button>}>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 flex-col gap-4">
          {showUpload && <UppyDashboard />}

          <CheckableImages data={data.data}></CheckableImages>
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
