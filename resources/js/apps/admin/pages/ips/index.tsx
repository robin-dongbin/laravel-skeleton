import useEnum from '@/apps/admin/hooks/useEnum.ts'
import { $api, $fetch } from '@/apps/admin/libs/request.ts'
import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import ActionButton from '@/packages/components/ResourceTable/ActionButton'
import { EnumField } from '@/packages/components/ResourceTable/Fields.tsx'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { Button, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator, useSubmit } from 'react-router'
import { getQuery } from 'ufo'
import CreateIp from './Create'
import EditIp from './Edit'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/ips', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

export default function Ips() {
  const { data } = useLoaderData<typeof clientLoader>()

  const { t } = useTranslation()
  const submit = useSubmit()
  const { revalidate } = useRevalidator()

  const { options: statuses } = useEnum('IpStatus')
  const { mutate } = $api.useMutation('delete', '/ips/{ip}', {
    onSuccess: revalidate,
  })

  const { builder, apply, reset, handleQueryChange } = useQueryBuilder<{
    'filter[status]': string
    'filter[address]': string
  }>(
    {
      'filter[status]': '1',
      'filter[address]': '',
    },
    {
      onQuery: (values) => submit(values),
    },
  )

  const [selectedRecords, setSelectedRecords] = useState<components['schemas']['IpResource'][]>([])

  const columns: DataTableColumn<components['schemas']['IpResource']>[] = useMemo(
    () => [
      {
        accessor: 'id',
        sortable: true,
      },
      {
        accessor: 'address',
      },
      {
        accessor: 'location',
        render: (record) => record.location?.city || record.location?.region || record.location?.country_code,
      },
      {
        accessor: 'status',
        render: ({ status }) => <EnumField name="IpStatus" value={status} />,
      },
      {
        accessor: 'remark',
      },
      {
        accessor: 'created_at',
        sortable: true,
      },
      {
        accessor: 'updated_at',
        sortable: true,
      },
      {
        accessor: 'actions',
        title: t('fields.ips.actions'),
        render: (record) => (
          <div className="flex justify-center gap-2">
            <ActionButton
              color="yellow"
              onClick={() => {
                modals.open({
                  title: `${t('actions.edit')}${t('navigation.ip')}`,
                  size: 'lg',
                  children: <EditIp record={record} />,
                })
              }}
            >
              {t('actions.edit')}
            </ActionButton>
            <ActionButton
              color="red"
              confirmRequired
              onClick={() => {
                mutate({ params: { path: { ip: record.id } } })
              }}
            >
              {t('actions.delete')}
            </ActionButton>
          </div>
        ),
      },
    ],
    [mutate, t],
  )

  return (
    <PageContainer
      actions={
        <Button
          onClick={() =>
            modals.open({
              title: t('actions.create'),
              size: 'lg',
              children: <CreateIp />,
            })
          }
        >
          {t('actions.create')}
        </Button>
      }
    >
      <TabFilter
        data={statuses}
        value={builder.getValues()['filter[status]']}
        onChange={(value) => handleQueryChange({ 'filter[status]': value, page: 1 })}
      />
      <AdvancedFilter onSubmit={apply} onReset={reset}>
        <TextInput
          label={t('fields.ips.address')}
          key={builder.key('filter[address]')}
          {...builder.getInputProps('filter[address]')}
        />
      </AdvancedFilter>
      <ResourceTable<components['schemas']['IpResource']>
        name="ips"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
        page={builder.getValues().page}
        recordsPerPage={builder.getValues().per_page}
        sort={builder.getValues().sort}
        onQueryChange={handleQueryChange}
        toolbarVisible={selectedRecords.length > 0}
        toolbar={
          <div className="flex items-center justify-end">
            <ActionButton color="red" size="xs" onClick={() => {}}>
              {t('actions.delete')}
            </ActionButton>
          </div>
        }
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
    </PageContainer>
  )
}
