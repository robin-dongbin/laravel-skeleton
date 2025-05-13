import PageContainer from '@/packages/components/PageContainer'
import { AdvancedFilter, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import ActionButton from '@/packages/components/ResourceTable/ActionButton'
import useQueryBuilder from '@/packages/hooks/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { $api, $fetch } from '@admin/libs/request.ts'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useLoaderData, useRevalidator, useSubmit } from 'react-router'
import { getQuery } from 'ufo'

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
  const { mutate } = $api.useMutation('delete', '/ips/{ip}', {
    onSuccess: revalidate,
  })
  const { builder, excute, reset, handlePageChange, handleRecordsPerPageChange, handleSortStatusChange } =
    useQueryBuilder<{
      'filter[status]': string
      'filter[address]': string
    }>(
      {
        'filter[status]': 'active',
        'filter[address]': '',
      },
      {
        onQuery: (values) => submit(values),
      },
    )

  const handleTabChange = (value: string) => {
    builder.setFieldValue('filter[status]', value)
    builder.setFieldValue('page', 1)
    excute()
  }
  const [selectedRecords, setSelectedRecords] = useState<components['schemas']['IpResource'][]>([])

  const columns: DataTableColumn<components['schemas']['IpResource']>[] = useMemo(
    () => [
      {
        accessor: 'address',
      },
      {
        accessor: 'location',
        render: (record) => record.location?.city || record.location?.region || record.location?.country_code,
      },
      {
        accessor: 'status',
      },
      {
        accessor: 'remark',
      },
      {
        accessor: 'created_at',
        sortable: true,
      },
      {
        accessor: 'actions',
        render: (record) => {
          return (
            <>
              <ActionButton
                color="red"
                onClick={() => {
                  mutate({ params: { path: { ip: record.id } } })
                }}
              >
                {t('actions.delete')}
              </ActionButton>
            </>
          )
        },
      },
    ],
    [mutate, t],
  )

  return (
    <PageContainer
      query={{
        'filter[address]': '',
        'filter[status]': 'active',
      }}
    >
      <TabFilter
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'privileged', label: t('enums.Privileged') },
          { value: 'blocked', label: t('enums.Blocked') },
        ]}
        value={builder.getValues()['filter[status]']}
        onChange={handleTabChange}
      />
      <AdvancedFilter onSubmit={excute} onReset={reset}>
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
        onPageChange={handlePageChange}
        onRecordsPerPageChange={handleRecordsPerPageChange}
        onSortStatusChange={handleSortStatusChange}
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
