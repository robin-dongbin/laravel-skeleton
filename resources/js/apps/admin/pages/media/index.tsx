import CheckableMedia from '@/packages/components/Media/CheckableMedia.tsx'
import UppyDashboard from '@/packages/components/Media/UppyDashboard.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable } from '@/packages/components/ResourceTable'
import { useQueryBuilder } from '@/packages/contexts/QueryBuilderProvider/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { Button, Paper, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator } from 'react-router'
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

const Filter = () => {
  const { t } = useTranslation()
  const { query } = useQueryBuilder()

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
  const [previewData, setPreviewData] = useState<components['schemas']['MediaResource']>()
  const [uppyDashboardOpened, { close: closeUppyDashboard, toggle: toggleUppyDashboard }] = useDisclosure(false)
  const [opened, { open, close }] = useDisclosure(false)

  const handlePreview = (data: components['schemas']['MediaResource']) => {
    setPreviewData(data)
    open()
  }

  const doneButtonHandler = () => {
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
      <InfoDrawer opened={opened} onClose={close} data={previewData} />
    </PageContainer>
  )
}
