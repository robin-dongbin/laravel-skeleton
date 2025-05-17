import { $api } from '@/apps/admin/libs/request'
import ActionButton from '@/packages/components/ResourceTable/ActionButton.tsx'
import useQueryBuilder, { type InitialValues } from '@/packages/hooks/useQueryBuilder'
import type { components } from '@/types/admin'
import { Icon } from '@iconify/react'
import {
  ActionIcon,
  Button,
  CloseButton,
  Image,
  Input,
  Modal,
  Select,
  TextInput,
  UnstyledButton,
  type InputWrapperProps,
} from '@mantine/core'
import { useDisclosure, useUncontrolled } from '@mantine/hooks'
import { castArray } from 'es-toolkit/compat'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdvancedFilter, ResourceGrid } from '../ResourceTable'
import UppyDashboard from './UppyDashboard'

interface filters {
  'filter[filename]': string
  'filter[aggregate_type]': string | null
}

export function Media({ onChange }: { onChange: (media: components['schemas']['MediaResource'][]) => void }) {
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
  const [selectedRecords, setSelectedRecords] = useState<components['schemas']['MediaResource'][]>([])

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
            </div>
          </div>
        )}
      />
    </div>
  )
}

type MediaPickerValue = components['schemas']['MediaResource'] | components['schemas']['MediaResource'][] | null

interface MediaPickerProps extends Omit<InputWrapperProps, 'defaultValue' | 'onChange'> {
  multiple?: boolean
  value?: MediaPickerValue
  defaultValue?: MediaPickerValue
  onChange?: (value: MediaPickerValue) => void
  error?: React.ReactNode
}

export default function MediaPicker({
  value,
  defaultValue,
  onChange,
  required,
  description,
  label,
  error,
  multiple = false,
}: MediaPickerProps & { onBlur?: () => void }) {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  const [_value, handleChange] = useUncontrolled<MediaPickerValue>({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  })

  const _onChange = (media: components['schemas']['MediaResource'][]) => {
    const picked = media.at(0) ?? null
    const prevMedia = _value ? castArray(_value) : []
    if (multiple) {
      handleChange([...prevMedia, ...media])
    } else {
      handleChange(picked)
    }
    close()
  }

  const PickerButtonVisible = !_value || (_value && multiple)

  return (
    <Input.Wrapper required={required} label={label} error={error} description={description}>
      <div className="flex gap-2">
        {_value &&
          castArray(_value).map((media) => (
            <div key={media.id} className="relative">
              <UnstyledButton onClick={open}>
                <Image
                  key={media.id}
                  src={media.url}
                  className="aspect-square h-24 w-24"
                  fit="cover"
                  loading="lazy"
                  radius="md"
                />
              </UnstyledButton>
              <CloseButton size="sm" onClick={() => handleChange(null)} className="absolute top-0 right-0" />
            </div>
          ))}
        {PickerButtonVisible && (
          <ActionIcon onClick={open} variant="default" className="h-24 w-24">
            <Icon icon="lucide:plus" />
          </ActionIcon>
        )}
        <Modal opened={opened} onClose={close} zIndex={400} size="xl" title={t('media_picker')}>
          <Media onChange={_onChange} />
        </Modal>
      </div>
    </Input.Wrapper>
  )
}
