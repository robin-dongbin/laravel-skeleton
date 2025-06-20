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
  { onQuery, watchSearchParams = true }: { onQuery?: (values: InitialValues<T>) => void; watchSearchParams?: boolean },
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
    if (watchSearchParams) {
      const values = mapValues(initialValues, (value, key) => {
        const param = searchParams.get(String(key))
        if (param?.includes(',')) {
          return param?.split(',')
        }

        return param ?? value
      })
      setValues({ ...values, page: Number(values.page), per_page: Number(values.per_page) } as InitialValues<T>)
    }
  }, [initialValues, setValues, searchParams, watchSearchParams])

  const apply = () => {
    builder.setValues({ page: 1 } as Partial<InitialValues<T>>)
    onQuery?.(builder.getTransformedValues())
  }

  const reset = () => {
    builder.setValues({ ...initialValues, include: builder.getValues().include })
    onQuery?.({ ...builder.getTransformedValues() })
  }

  const handleQueryChange = (query: Partial<InitialValues<T>>) => {
    builder.setValues(query)
    onQuery?.(builder.getTransformedValues())
  }

  return {
    builder,
    apply,
    reset,
    handleQueryChange,
  }
}
