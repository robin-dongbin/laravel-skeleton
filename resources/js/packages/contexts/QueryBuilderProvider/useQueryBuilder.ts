import { useContext } from 'react'
import { QueryBuilderContext, type QueryBuilderContextValue } from './context.ts'

export const useQueryBuilder = <T extends Record<string, any>>() => {
  const ctx = useContext(QueryBuilderContext)
  if (!ctx) {
    throw new Error('useQueryBuilderContext must be used within QueryBuilderProvider')
  }
  return ctx as QueryBuilderContextValue<T>
}
