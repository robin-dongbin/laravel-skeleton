import { $api } from '@/apps/admin/libs/request'

export default function useEnum(name: string, value?: number) {
  const { data } = $api.useSuspenseQuery(
    'get',
    '/enums',
    {},
    {
      staleTime: 'static',
    },
  )
  const result = data.data.find((item) => item.name === name)
  const options = result?.options || []
  const item = options.find((item) => item.value === String(value))

  return {
    options,
    label: item?.label || '',
    key: item?.key || '',
    color: item?.color || '',
  }
}
