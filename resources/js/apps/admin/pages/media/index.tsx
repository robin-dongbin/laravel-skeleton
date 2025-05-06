import CheckableMedia from '@/packages/components/Media/CheckableMedia.tsx'
import PageContainer from '@/packages/components/PageContainer'
import UppyDashboard from '@/packages/components/UppyDashboard.tsx'
import { $fetch } from '@admin/libs/request.ts'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator } from 'react-router'
import { getQuery } from 'ufo'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/media', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

export default function Media() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const revalidator = useRevalidator()
  const [checked, setChecked] = useState<string[]>([])
  const [showUpload, setShowUpload] = useState(false)

  return (
    <PageContainer actions={<Button onClick={() => setShowUpload(true)}>{t('actions.upload')}</Button>}>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 flex-col gap-4">
          {showUpload && <UppyDashboard doneButtonHandler={revalidator.revalidate} />}
          <CheckableMedia data={data!.data} value={checked} onChange={setChecked} />
        </div>
      </div>
    </PageContainer>
  )
}
