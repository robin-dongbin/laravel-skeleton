import { $fetch } from '@/apps/admin/libs/request.ts'
import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable } from '@/packages/components/ResourceTable'
import ActionButton from '@/packages/components/ResourceTable/ActionButton.tsx'
import { drawers } from '@/packages/drawers'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { Image, Select, TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator, useSubmit } from 'react-router'
import { getQuery } from 'ufo'
import ShowMedia from './Show'

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
    'filter[name]': string
    'filter[mime_type]': string | null
  }>(
    {
      'filter[name]': '',
      'filter[mime_type]': null,
    },
    {
      onQuery: (values) => submit(values),
    },
  )

  const columns: DataTableColumn<components['schemas']['MediaResource']>[] = useMemo(
    () => [
      {
        accessor: 'url',
        title: t('fields.media.thumbnail'),
        render: (record) => {
          return <Image src={record.url} className="inline-block h-24 w-24" fit="cover" loading="lazy" radius="md" />
        },
      },
      {
        accessor: 'name',
      },
      {
        accessor: 'collection_name',
      },
      {
        accessor: 'mime_type',
      },
      {
        accessor: 'size',
      },
      {
        accessor: 'created_at',
        sortable: true,
      },
      {
        accessor: 'actions',
        render: (record) => {
          return (
            <div className="flex justify-center gap-2">
              <ActionButton
                color="blue"
                onClick={() => {
                  drawers.open({
                    title: `${t('actions.view')}${t('navigation.request')} - ${record?.id}`,
                    position: 'right',
                    children: <ShowMedia record={record} onDeleted={revalidate} />,
                  })
                }}
              >
                {t('actions.view')}
              </ActionButton>
            </div>
          )
        },
      },
    ],
    [revalidate, t],
  )

  return (
    <PageContainer>
      <AdvancedFilter onSubmit={apply} onReset={reset}>
        <TextInput
          label={t('fields.media.name')}
          key={builder.key('filter[name]')}
          {...builder.getInputProps('filter[name]')}
        />
        <Select
          label={t('fields.media.mime_type')}
          key={builder.key('filter[mime_type]')}
          {...builder.getInputProps('filter[mime_type]')}
          data={['image/jpeg', 'image/png']}
        />
      </AdvancedFilter>
      <ResourceTable<components['schemas']['MediaResource']>
        name="media"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        page={builder.getValues().page}
        recordsPerPage={builder.getValues().per_page}
        sort={builder.getValues().sort}
        onQueryChange={handleQueryChange}
      />
    </PageContainer>
  )
}
