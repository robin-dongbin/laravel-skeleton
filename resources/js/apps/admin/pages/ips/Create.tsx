import { $api } from '@/apps/admin/libs/request.ts'
import { Button, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useRevalidator } from 'react-router'

export default function CreateIp() {
  const { t } = useTranslation()
  const { revalidate } = useRevalidator()

  const queryClient = useQueryClient()

  const { mutate, isPending } = $api.useMutation('post', '/ips', {
    onSuccess: async () => {
      await revalidate()
      modals.closeAll()
    },
    onError: (error: any) => {
      form.setErrors(error.errors)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get', '/ips'] })
    },
  })

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      address: '',
      status: 1 as 1 | 2 | 10,
      remark: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((body) => mutate({ body }))} className="flex flex-col gap-2">
      <TextInput
        required
        label={t('fields.ips.address')}
        placeholder={t('fields.ips.address')}
        key={form.key('address')}
        {...form.getInputProps('address')}
      />
      <Select
        label={t('fields.ips.status')}
        placeholder={t('fields.ips.status')}
        key={form.key('status')}
        {...form.getInputProps('status')}
        defaultValue={String(form.getValues().status)}
        data={[
          { value: '1', label: t('enums.active') },
          { value: '2', label: t('enums.privileged') },
          { value: '10', label: t('enums.blocked') },
        ]}
      />
      <TextInput
        label={t('fields.ips.remark')}
        placeholder={t('fields.ips.remark')}
        key={form.key('remark')}
        {...form.getInputProps('remark')}
      />
      <div className="mt-2 flex items-center justify-end gap-4">
        <Button type="submit" loading={isPending}>
          {t('actions.submit')}
        </Button>
      </div>
    </form>
  )
}
