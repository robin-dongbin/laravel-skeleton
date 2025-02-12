import { router } from '@inertiajs/react'
import type { UseFormInput, UseFormReturnType } from '@mantine/form'
import { useForm as useMantineForm } from '@mantine/form'
import type React from 'react'

export type ExtendedUseFormReturn<Values> = UseFormReturnType<Values> & {
  submit: (e: React.FormEvent) => void
}
export type ExtendUseFormInput<Values> = UseFormInput<Values> & {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string | URL
}

export function useForm<Values extends Record<string, any> = Record<string, any>>({
  method = 'post',
  url,
  ...useFormInput
}: ExtendUseFormInput<Values>): ExtendedUseFormReturn<Values> {
  const form = useMantineForm(useFormInput)

  const submit = form.onSubmit((data: typeof form.values) => {
    router.visit(url, {
      method,
      data,
      preserveState: true,
      onStart: () => {
        form.setSubmitting(true)
      },
      onError: (errors) => {
        form.setErrors(errors || {})
      },
      onFinish: () => {
        form.setSubmitting(false)
      },
    })
  })

  return { ...form, submit }
}
