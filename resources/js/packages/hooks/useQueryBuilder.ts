import { useForm } from '@mantine/form'
import { mapValues } from 'es-toolkit'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export type InitialValues<T extends Record<string, any>> = {
  page: number
  per_page: number
  sort: string
  include: string
} & Omit<T, 'page' | 'per_page'>

export default function useQueryBuilder<T extends Record<string, any>>(
  query: T,
  { onQuery }: { onQuery: (values: InitialValues<T>) => void },
) {
  const defaultQuery = {
    page: 1,
    per_page: 15,
    sort: '',
    include: '',
  }
  const initialValues = Object.assign(defaultQuery, query)

  const [searchParams] = useSearchParams()
  const builder = useForm<InitialValues<T>>({
    mode: 'uncontrolled',
    initialValues,
    transformValues: (values) => mapValues(values, (value) => value ?? '') as InitialValues<T>,
  })

  const setValues = builder.setValues

  useEffect(() => {
    const values = mapValues(initialValues, (value, key) => searchParams.get(String(key)) ?? value)
    setValues({ ...values, page: Number(values.page), per_page: Number(values.per_page) } as InitialValues<T>)
  }, [initialValues, setValues, searchParams])

  const apply = () => {
    builder.setValues({ page: 1 } as Partial<InitialValues<T>>)
    onQuery(builder.getTransformedValues())
  }

  const reset = () => {
    const include = builder.getValues().include
    builder.reset()
    onQuery({ ...builder.getTransformedValues(), include })
  }

  const handleQueryChange = (query: Partial<InitialValues<T>>) => {
    builder.setValues(query)
    onQuery(builder.getTransformedValues())
  }

  return {
    builder,
    apply,
    reset,
    handleQueryChange,
  }
}
