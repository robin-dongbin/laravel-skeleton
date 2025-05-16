import { $api } from '@/apps/admin/libs/request'
import Info from '@/apps/admin/pages/media/Info'
import { drawers } from '@/packages/drawers'
import useQueryBuilder, { type InitialValues } from '@/packages/hooks/useQueryBuilder'
import type { components } from '@/types/admin'
import { Button, Image, Input, type InputWrapperProps, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdvancedFilter, ResourceGrid } from '../ResourceTable'
import UppyDashboard from './UppyDashboard'

interface filters {
  'filter[filename]': string
  'filter[aggregate_type]': string | null
}

function Media() {
  const [query, setQuery] = useState<InitialValues<filters>>()
  const { data, isFetching, refetch } = $api.useQuery('get', '/media', {
    params: { query },
  })
  const { t } = useTranslation()
  const { builder, apply, reset, handleQueryChange } = useQueryBuilder<filters>(
    {
      'filter[filename]': '',
      'filter[aggregate_type]': null,
    },
    {
      onQuery: (values) => setQuery(values),
    },
  )
  const [uppyDashboardOpened, { close: closeUppyDashboard, toggle: toggleUppyDashboard }] = useDisclosure(false)

  const doneButtonHandler = () => {
    refetch()
    closeUppyDashboard()
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button onClick={toggleUppyDashboard}>{t('actions.upload')}</Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {uppyDashboardOpened && <UppyDashboard doneButtonHandler={doneButtonHandler} />}
      </div>
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
        fetching={isFetching}
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
                    children: <Info record={record} />,
                  })
                }}
              >
                {t('actions.preview')}
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  )
}
export default function MediaPicker(props: InputWrapperProps) {
  return (
    <Input.Wrapper {...props}>
      <div>
        <Button
          onClick={() =>
            modals.open({
              title: 'Media Picker',
              size: 'xl',
              children: <Media />,
            })
          }
        >
          MediaPicker
        </Button>
      </div>
    </Input.Wrapper>
  )
}
