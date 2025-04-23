import { useForm, type UseFormReturnType } from '@mantine/form'
import { useEffect } from 'react'
import type { SubmitOptions } from 'react-router'
import { useSearchParams, useSubmit } from 'react-router'

interface InitialValues<T extends Record<string, any>> extends Record<string, any> {
  page: number
  per_page: number
  sort: string
  include: string
  filter: T
}

export interface UseQueryBuilderReturn<T extends Record<string, any>> extends UseFormReturnType<InitialValues<T>> {
  submit: () => Promise<void>
}

export function useQueryBuilder<T extends Record<string, any> = Record<string, any>>(
  filter: T,
  options?: SubmitOptions,
) {
  const [searchParams] = useSearchParams()
  const submit = useSubmit()
  const initialValues = {
    page: 1,
    per_page: 15,
    sort: '',
    include: '',
    filter,
  }
  const query = useForm({
    initialValues,
    transformValues: (values) => {
      const { filter, ...rest } = values

      const filters = Object.fromEntries(
        Object.entries(filter).map(([key, value]) => [`filter[${key}]`, value === null ? '' : value]),
      )

      return { ...rest, ...filters }
    },
  }) as UseQueryBuilderReturn<T>

  useEffect(() => {
    Object.entries(initialValues).forEach(([key, value]) => {
      if (key === 'filter' && typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([filterKey, filterValue]) => {
          query.setFieldValue(`filter.${filterKey}`, searchParams.get(`filter[${filterKey}]`) ?? (filterValue as any))
        })
      } else if (['page', 'per_page'].includes(key)) {
        query.setFieldValue(key, Number(searchParams.get(key) ?? value))
      } else {
        query.setFieldValue(key, searchParams.get(key) ?? value)
      }
    })
  }, [searchParams])

  query.submit = async () => {
    await submit(query.getTransformedValues(), {
      method: 'get',
      ...options,
    })
  }
  query.reset = () => {
    query.setValues({ ...initialValues, include: query.getValues().include })
  }

  return query
}
