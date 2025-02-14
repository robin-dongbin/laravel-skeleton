import type { ExtendedUseFormReturn } from '@/hooks/use-form'
import { useForm } from '@/hooks/use-form'
import type { UseFormInput } from '@mantine/form'
import type React from 'react'

export type UseFilterReturn<Values> = Omit<ExtendedUseFormReturn<Values>, 'reset'> & {
  reset: (event: React.FormEvent<HTMLFormElement>) => void
}

export function useFilter<Values extends Record<string, any> = Record<string, any>>({
  ...useFormInput
}: UseFormInput<Values>): UseFilterReturn<Values> {
  const form = useForm({
    url: window.location.href,
    method: 'get',
    ...useFormInput,
  })

  const reset = (event: React.FormEvent<HTMLFormElement>) => {
    form.onReset(event)
    form.submit(event)
  }

  return { ...form, reset }
}
