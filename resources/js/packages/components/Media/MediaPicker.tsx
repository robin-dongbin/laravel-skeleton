import { $api } from '@/apps/admin/libs/request'
import Info from '@/apps/admin/pages/media/Info'
import ActionButton from '@/packages/components/ResourceTable/ActionButton.tsx'
import { drawers } from '@/packages/drawers'
import useQueryBuilder, { type InitialValues } from '@/packages/hooks/useQueryBuilder'
import type { components } from '@/types/admin'
import { Button, Image, Input, Select, TextInput, type InputWrapperProps } from '@mantine/core'
import { useDisclosure, useId, useUncontrolled } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { castArray, isEmpty } from 'es-toolkit/compat'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdvancedFilter, ResourceGrid } from '../ResourceTable'
import UppyDashboard from './UppyDashboard'

interface filters {
  'filter[filename]': string
  'filter[aggregate_type]': string | null
}

function Media({
  multiple = false,
  value,
  onChoose,
}: {
  multiple: boolean
  value: MediaPickerValue
  onChoose: (media: components['schemas']['MediaResource'][]) => void
}) {
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
  const processedValue = isEmpty(value) ? [] : castArray(value)
  const [uppyDashboardOpened, { close: closeUppyDashboard, toggle: toggleUppyDashboard }] = useDisclosure(false)
  const [selectedRecords, setSelectedRecords] = useState<components['schemas']['MediaResource'][]>(processedValue)

  const doneButtonHandler = async () => {
    await refetch()
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
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        multiple={multiple}
        toolbarVisible={selectedRecords.length > 0}
        toolbar={
          <div className="flex items-center justify-end">
            <ActionButton color="green" size="xs" onClick={() => onChoose(selectedRecords)}>
              {t('actions.choose')}
            </ActionButton>
          </div>
        }
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
                    children: <Info record={record} onDeleted={refetch} />,
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

type MediaPickerValue = components['schemas']['MediaResource'] | components['schemas']['MediaResource'][]

interface MediaPickerProps extends Omit<InputWrapperProps, 'defaultValue' | 'onChange'> {
  multiple?: boolean
  value?: MediaPickerValue
  defaultValue?: MediaPickerValue
  onChange?: (value: MediaPickerValue) => void
  error?: React.ReactNode
}

export default function MediaPicker({
  id,
  value,
  defaultValue,
  onChange,
  required,
  description,
  label,
  error,
  multiple = false,
  onBlur,
  ...rest
}: MediaPickerProps & { onBlur?: () => void }) {
  const { t } = useTranslation()

  const uuid = useId(id)
  const [_value, handleChange] = useUncontrolled<MediaPickerValue>({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange,
  })

  // const _value = isEmpty(value) ? [] : castArray(value)
  // const _defaultValue = isEmpty(defaultValue) ? [] : castArray(defaultValue)

  const onChoose = (media: components['schemas']['MediaResource'][]) => {
    if (multiple) {
      handleChange(media)
    } else {
      handleChange(media.at(0) || null)
    }

    // 触发onBlur回调，通知表单字段已被触摸
    if (onBlur) {
      onBlur()
    }

    // 确保值更新后再关闭模态框
    setTimeout(() => modals.close('media_picker'), 0)
  }

  // 确保_value是可用的
  const processedValue = isEmpty(_value) ? [] : castArray(_value)

  return (
    <Input.Wrapper required={required} id={uuid} label={label} error={error} description={description} {...rest}>
      <div>
        <Button
          onClick={() => {
            // 触发onBlur回调，通知表单字段已被触摸
            if (onBlur) {
              onBlur()
            }

            modals.open({
              modalId: 'media_picker',
              title: t('media_picker'),
              size: 'xl',
              children: <Media multiple={multiple} value={processedValue} onChoose={onChoose} />,
            })
          }}
        >
          {t('media_picker')}
        </Button>

        {processedValue.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {processedValue.map((item, index) => (
              <div key={item.id || index} className="relative w-20 h-20 border rounded overflow-hidden">
                <Image src={item?.url} height={80} width={80} fit="cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Input.Wrapper>
  )
}
