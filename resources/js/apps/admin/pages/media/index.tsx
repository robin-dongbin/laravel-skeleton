import CheckableMedia from '@/packages/components/Media/CheckableMedia.tsx'
import UppyDashboard from '@/packages/components/Media/UppyDashboard.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilderContext } from '@/packages/contexts/QueryBuilderContext.tsx'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { Button, Paper, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator } from 'react-router'
import { getQuery } from 'ufo'
import MediaInfoDrawer from './MediaInfoDrawer.tsx'

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/media', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

const filter = {
  filename: '',
}

function Filter() {
  const { t } = useTranslation()
  const { query } = useQueryBuilderContext()

  return (
    <FilterPanel>
      <TextInput
        label={t('fields.media.filename')}
        key={query.key('filter[filename]')}
        {...query.getInputProps('filter[filename]')}
      ></TextInput>
    </FilterPanel>
  )
}

export default function Media() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const revalidator = useRevalidator()
  const [checked, setChecked] = useState<string[]>([])
  const [previewMedia, setPreviewMedia] = useState<components['schemas']['MediaResource']>()
  const [uppyDashboardOpened, { open: openUppyDashboard, close: closeUppyDashboard, toggle: toggleUppyDashboard }] =
    useDisclosure(false)
  const [opened, { open, close }] = useDisclosure(false)

  function handlePreview(media: components['schemas']['MediaResource']) {
    setPreviewMedia(media)
    open()
  }

  function doneButtonHandler() {
    revalidator.revalidate()
    closeUppyDashboard()
  }

  return (
    <PageContainer
      query={{
        per_page: 24,
        'filter[address]': '',
        'filter[status]': 'active',
      }}
      actions={<Button onClick={toggleUppyDashboard}>{t('actions.upload')}</Button>}
    >
      {uppyDashboardOpened && <UppyDashboard doneButtonHandler={doneButtonHandler} />}
      <Filter />
      <Paper className="dark:bg-dark-8 bg-gray-0">
        <div className="p-4 pb-0">
          <CheckableMedia data={data!.data} value={checked} onChange={setChecked} onPreview={handlePreview} />
        </div>
        <ResourceTable<components['schemas']['MediaResource']>
          className="bg-transparent"
          noHeader={true}
          recordsPerPageOptions={[24, 48, 96, 192]}
          name=""
          columns={[]}
          records={data?.data}
          totalRecords={data?.meta.total}
        />
      </Paper>
      <MediaInfoDrawer opened={opened} onClose={close} media={previewMedia} />
    </PageContainer>
  )
}
