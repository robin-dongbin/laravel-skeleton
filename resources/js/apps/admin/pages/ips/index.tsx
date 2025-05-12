import PageContainer from '@/packages/components/PageContainer'
import { FilterPanel, ResourceTable, TabFilter } from '@/packages/components/ResourceTable'
import ActionButton from '@/packages/components/ResourceTable/ActionButton'
import { useQueryBuilder } from '@/packages/contexts/QueryBuilderProvider/useQueryBuilder.ts'
import type { components } from '@/types/admin'
import { $fetch } from '@admin/libs/request.ts'
import { TextInput } from '@mantine/core'
import type { DataTableColumn } from 'mantine-datatable'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ClientLoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router'
import { getQuery } from 'ufo'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const query = getQuery(request.url)

  const { data } = await $fetch.GET('/ips', {
    params: { query },
    signal: request.signal,
  })

  return { data }
}

const ResourceFilter = () => {
  const { t } = useTranslation()
  const { query } = useQueryBuilder()

  return (
    <FilterPanel>
      <TextInput
        label={t('fields.ips.address')}
        key={query.key('filter[address]')}
        {...query.getInputProps('filter[address]')}
      ></TextInput>
    </FilterPanel>
  )
}

export default function Ips() {
  const { data } = useLoaderData<typeof clientLoader>()
  const { t } = useTranslation()
  const fetcher = useFetcher()
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
                  fetcher.submit(null, { action: `${record?.id}`, method: 'DELETE' })
                }}
              >
                {t('actions.delete')}
              </ActionButton>
            </>
          )
        },
      },
    ],
    [fetcher, t],
  )

  return (
    <PageContainer
      query={{
        'filter[address]': '',
        'filter[status]': 'active',
      }}
    >
      <TabFilter
        field="filter[status]"
        data={[
          { value: 'active', label: t('enums.Active') },
          { value: 'privileged', label: t('enums.Privileged') },
          { value: 'blocked', label: t('enums.Blocked') },
        ]}
      />
      <ResourceFilter />
      <ResourceTable<components['schemas']['IpResource']>
        name="ips"
        columns={columns}
        records={data?.data}
        totalRecords={data?.meta.total}
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
