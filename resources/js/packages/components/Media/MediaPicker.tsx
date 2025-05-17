import { $api } from '@/apps/admin/libs/request'
import Info from '@/apps/admin/pages/media/Info'
import ActionButton from '@/packages/components/ResourceTable/ActionButton.tsx'
import { drawers } from '@/packages/drawers'
import useQueryBuilder, { type InitialValues } from '@/packages/hooks/useQueryBuilder'
import type { components } from '@/types/admin'
import { Icon } from '@iconify/react'
import {
  ActionIcon,
  Button,
  Image,
  Input,
  Modal,
  Select,
  TextInput,
  UnstyledButton,
  type InputWrapperProps,
} from '@mantine/core'
import { useDisclosure, useId, useUncontrolled } from '@mantine/hooks'
import { castArray, isEmpty } from 'es-toolkit/compat'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdvancedFilter, ResourceGrid } from '../ResourceTable'
import UppyDashboard from './UppyDashboard'

interface filters {
  'filter[filename]': string
  'filter[aggregate_type]': string | null
}

export function Media({
  value,
  onChange,
}: {
  multiple: boolean
  value: MediaPickerValue
  onChange: (media: components['schemas']['MediaResource'][]) => void
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
        toolbarVisible={selectedRecords.length > 0}
        toolbar={
          <div className="flex items-center justify-end">
            <ActionButton color="green" size="xs" onClick={() => onChange(selectedRecords)}>
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

type MediaPickerValue = components['schemas']['MediaResource'] | null

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
}: MediaPickerProps & { onBlur?: () => void }) {
  const [opened, { open, close }] = useDisclosure(false)

  const uuid = useId(id)
  const [_value, handleChange] = useUncontrolled<MediaPickerValue>({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  })

  const _onChange = (media: components['schemas']['MediaResource'][]) => {
    handleChange(media.at(0) ?? null)
    close()
  }

  const PickerButtonVisible = !_value || (_value && multiple)
  useEffect(() => {
    console.log(_value)
  }, [_value])

  return (
    <Input.Wrapper required={required} id={uuid} label={label} error={error} description={description}>
      <div className="flex gap-2">
        {_value && (
          <UnstyledButton onClick={open}>
            <Image
              key={_value.id}
              src={_value.url}
              className="aspect-square h-24 w-24"
              fit="cover"
              loading="lazy"
              radius="md"
            />
          </UnstyledButton>
        )}
        {PickerButtonVisible && (
          <ActionIcon onClick={open} variant="default" className="h-24 w-24">
            <Icon icon="lucide:plus" />
          </ActionIcon>
        )}
        <Modal opened={opened} onClose={close} zIndex={1000} size="xl" title="Authentication">
          <Media multiple={multiple} value={_value} onChange={_onChange} />,
        </Modal>
      </div>
    </Input.Wrapper>
  )
}
