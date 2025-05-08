import { type UseFormReturnType } from '@mantine/form'
import { createContext } from 'react'

export type InitialValues<T extends Record<string, any>> = {
  page: string | number
  per_page: string | number
  sort: string
  include: string
} & T

export type UseQueryBuilderReturn<T extends Record<string, any>> = UseFormReturnType<InitialValues<T>>

export interface QueryBuilderContextValue<T extends Record<string, any>> {
  query: UseQueryBuilderReturn<T>
  submit: () => Promise<void>
  reset: () => void
}

export const QueryBuilderContext = createContext<QueryBuilderContextValue<any> | null>(null)
