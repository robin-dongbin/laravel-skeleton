import { useForm, type UseFormReturnType } from '@mantine/form'
import { mapValues } from 'es-toolkit'
import { type ReactNode, useEffect } from 'react'
import { type SubmitOptions, useSearchParams, useSubmit } from 'react-router'
import { QueryBuilderContext } from './context.ts'

export type InitialValues<T extends Record<string, any>> = {
  page: string | number
  per_page: string | number
  sort: string
  include: string
} & T

export type UseQueryBuilderReturn<T extends Record<string, any>> = UseFormReturnType<InitialValues<T>>

export const QueryBuilderProvider = <T extends Record<string, any>>({
  children,
  options,
  initialValues,
}: {
  children: ReactNode
  initialValues: InitialValues<T>
  options?: SubmitOptions
}) => {
  const [searchParams] = useSearchParams()
  const submit = useSubmit()

  const query = useForm({
    mode: 'uncontrolled',
    initialValues,
    transformValues: (values) => mapValues(values, (value) => value ?? ''),
  }) as UseQueryBuilderReturn<T>

  useEffect(() => {
    const values = mapValues(initialValues, (value, key) => (searchParams.get(String(key)) as typeof value) ?? value)
    query.setValues({ ...values })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()])

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
