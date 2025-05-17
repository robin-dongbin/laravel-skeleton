import { $fetch } from '@/apps/admin/libs/request.ts'
import UppyDashboard from '@/packages/components/Media/UppyDashboard.tsx'
import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceGrid } from '@/packages/components/ResourceTable'
import { drawers } from '@/packages/drawers'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { Button, Image, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator, useSubmit } from 'react-router'
import { getQuery } from 'ufo'
import Info from './Info'

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
  const { revalidate } = useRevalidator()
  const { builder, apply, reset, handleQueryChange } = useQueryBuilder<{
    'filter[filename]': string
    'filter[aggregate_type]': string | null
  }>(
    {
      'filter[filename]': '',
      'filter[aggregate_type]': null,
    },
    {
      onQuery: (values) => submit(values),
    },
  )
  const [uppyDashboardOpened, { close: closeUppyDashboard, toggle: toggleUppyDashboard }] = useDisclosure(false)

  const doneButtonHandler = () => {
    revalidate()
    closeUppyDashboard()
  }

  return (
    <PageContainer actions={<Button onClick={toggleUppyDashboard}>{t('actions.upload')}</Button>}>
      {uppyDashboardOpened && <UppyDashboard doneButtonHandler={doneButtonHandler} />}
      <AdvancedFilter onSubmit={apply} onReset={reset}>
        <TextInput
          label={t('fields.media.filename')}
          key={builder.key('filter[filename]')}
          {...builder.getInputProps('filter[filename]')}
        />
        <Select
          label={t('fields.media.aggregate_type')}
          key={builder.key('filter[aggregate_type]')}
          {...builder.getInputProps('filter[aggregate_type]')}
          data={['image', 'vector', 'video', 'audio', 'document']}
        />
      </AdvancedFilter>
      <ResourceGrid<components['schemas']['MediaResource']>
        records={data?.data}
        totalRecords={data?.meta.total}
        page={builder.getValues().page}
        recordsPerPage={builder.getValues().per_page}
        sort={builder.getValues().sort}
        onQueryChange={handleQueryChange}
        render={(record) => <Image src={record.url} className="aspect-3/2" fit="cover" loading="lazy" />}
        metaRender={(record) => (
          <div className="flex flex-col gap-2">
            <p className="flex text-sm">
              <span className="truncate">{record.filename}</span>
              <span>.{record.extension}</span>
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-6 text-xs">{record.size}</p>
              <Button
                size="compact-xs"
                variant="light"
                color="blue"
                onClick={() => {
                  drawers.open({
                    title: `${t('actions.view')}${t('navigation.media')} - ${record?.id}`,
                    position: 'right',
                    children: <Info record={record} onDeleted={revalidate} />,
                  })
                }}
              >
                {t('actions.preview')}
              </Button>
            </div>
          </div>
        )}
      />
    </PageContainer>
  )
}
