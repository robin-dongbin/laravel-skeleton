import CheckableMedia from '@/packages/components/Media/CheckableMedia.tsx'
import PageContainer from '@/packages/components/PageContainer'
import UppyDashboard from '@/packages/components/UppyDashboard.tsx'
import { $fetch } from '@/packages/lib/request'
import admin from '@/routes/admin'
import type { AdminIpsIndexResponse } from '@admin//types/api'
import { Button, Paper } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData } from 'react-router'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const { data } = await $fetch<AdminIpsIndexResponse>(admin.media.index(), request)

  return { data }
}

function ImageGrid({ data }) {
  const [checked, setChecked] = useState([])

  return <CheckableMedia data={data} multiple={true} value={checked} onChange={setChecked}></CheckableMedia>
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
          <ImageGrid data={data.data}></ImageGrid>
        </div>

        <Paper className="dark:bg-dark-8 bg-gray-0 flex w-xs gap-4 p-4">
          <span>请选择图片</span>
          <Button>{t('actions.delete')}</Button>
        </Paper>
      </div>
    </PageContainer>
  )
}
