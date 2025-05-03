import { useForm, type UseFormReturnType } from '@mantine/form'
import { createContext, useContext, useEffect, type ReactNode } from 'react'
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

interface QueryBuilderContextValue<T extends Record<string, any>> {
  query: UseQueryBuilderReturn<T>
}

const QueryBuilderContext = createContext<QueryBuilderContextValue<any> | null>(null)

export function QueryBuilderProvider<T extends Record<string, any>>({
  children,
  filter,
  options,
}: {
  children: ReactNode
  filter: T
  options?: SubmitOptions
}) {
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

  return <QueryBuilderContext.Provider value={{ query }}>{children}</QueryBuilderContext.Provider>
}

export function useQueryBuilderContext<T extends Record<string, any>>() {
  const context = useContext(QueryBuilderContext)
  if (!context) {
    throw new Error('useQueryBuilderContext must be used within QueryBuilderProvider')
  }
  return context.query as UseQueryBuilderReturn<T>
}
