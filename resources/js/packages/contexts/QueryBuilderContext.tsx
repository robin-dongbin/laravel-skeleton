import { useForm, type UseFormReturnType } from '@mantine/form'
import { mapValues } from 'es-toolkit'
import { createContext, type ReactNode, useContext, useEffect } from 'react'
import { type SubmitOptions, useSearchParams, useSubmit } from 'react-router'

export type InitialValues<T extends Record<string, any>> = {
  page: string | number
  per_page: string | number
  sort: string
  include: string
} & T

export interface UseQueryBuilderReturn<T extends Record<string, any>> extends UseFormReturnType<InitialValues<T>> {}

interface QueryBuilderContextValue<T extends Record<string, any>> {
  query: UseQueryBuilderReturn<T>
  submit: () => Promise<void>
  reset: () => void
}

const QueryBuilderContext = createContext<QueryBuilderContextValue<any> | null>(null)

export function QueryBuilderProvider<T extends Record<string, any>>({
  children,
  options,
  initialValues,
}: {
  children: ReactNode
  initialValues: InitialValues<T>
  options?: SubmitOptions
}) {
  const [searchParams] = useSearchParams()
  const submit = useSubmit()

  const query = useForm({
    mode: 'uncontrolled',
    initialValues,
    transformValues: (values) => mapValues(values, (value) => value ?? ''),
  }) as UseQueryBuilderReturn<T>

  useEffect(() => {
    const values = mapValues(initialValues, (value, key) => searchParams.get(String(key)) ?? value)
    query.setValues({ ...initialValues, ...values })
  }, [searchParams])

  const handleSubmit = async () => {
    await submit(query.getTransformedValues(), {
      method: 'get',
      ...options,
    })
  }

  const handleReset = () => {
    query.setValues({ ...initialValues, include: query.getValues().include })
    handleSubmit()
  }

  const value = { query, submit: handleSubmit, reset: handleReset }

  return <QueryBuilderContext.Provider value={value}>{children}</QueryBuilderContext.Provider>
}

export function useQueryBuilderContext<T extends Record<string, any>>() {
  const context = useContext(QueryBuilderContext)
  if (!context) {
    throw new Error('useQueryBuilderContext must be used within QueryBuilderProvider')
  }
  return context as QueryBuilderContextValue<T>
}
