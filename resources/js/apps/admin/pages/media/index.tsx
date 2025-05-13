import CheckableMedia from '@/packages/components/Media/CheckableMedia.tsx'
import UppyDashboard from '@/packages/components/Media/UppyDashboard.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable } from '@/packages/components/ResourceTable'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { Button, Paper, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator, useSubmit } from 'react-router'
import { getQuery } from 'ufo'
import InfoDrawer from './InfoDrawer.tsx'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
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
  const submit = useSubmit()
  const revalidator = useRevalidator()
  const { builder, excute, reset, handlePageChange, handleRecordsPerPageChange, handleSortStatusChange } =
    useQueryBuilder<{
      'filter[filename]': string
    }>(
      {
        'filter[filename]': '',
      },
      {
        onQuery: (values) => submit(values),
      },
    )
  const [checked, setChecked] = useState<string[]>([])
  const [previewData, setPreviewData] = useState<components['schemas']['MediaResource']>()
  const [uppyDashboardOpened, { close: closeUppyDashboard, toggle: toggleUppyDashboard }] = useDisclosure(false)
  const [opened, { open, close }] = useDisclosure(false)

  const doneButtonHandler = () => {
    revalidator.revalidate()
    closeUppyDashboard()
  }

  return (
    <PageContainer actions={<Button onClick={toggleUppyDashboard}>{t('actions.upload')}</Button>}>
      {uppyDashboardOpened && <UppyDashboard doneButtonHandler={doneButtonHandler} />}
      <AdvancedFilter onSubmit={excute} onReset={reset}>
        <TextInput
          label={t('fields.media.filename')}
          key={builder.key('filter[filename]')}
          {...builder.getInputProps('filter[filename]')}
        />
      </AdvancedFilter>
      <Paper className="dark:bg-dark-8 bg-gray-0">
        <div className="p-4 pb-0">
          <CheckableMedia
            data={data?.data}
            value={checked}
            onChange={setChecked}
            onPreview={(data) => {
              setPreviewData(data)
              open()
            }}
          />
        </div>
        <ResourceTable<components['schemas']['MediaResource']>
          className="bg-transparent"
          noHeader={true}
          name=""
          columns={[]}
          records={data?.data}
          totalRecords={data?.meta.total}
          page={builder.getValues().page}
          recordsPerPage={builder.getValues().per_page}
          sort={builder.getValues().sort}
          onPageChange={handlePageChange}
          onRecordsPerPageChange={handleRecordsPerPageChange}
          onSortStatusChange={handleSortStatusChange}
        />
      </Paper>
      <InfoDrawer opened={opened} onClose={close} data={previewData} />
    </PageContainer>
  )
}
