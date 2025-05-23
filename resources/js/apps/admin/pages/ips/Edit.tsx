import { $api } from '@/apps/admin/libs/request.ts'
import type { components } from '@/types/admin'
import { Button, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useRevalidator } from 'react-router'

interface EditIpProps {
  record: components['schemas']['IpResource']
}

export default function EditIp({ record }: EditIpProps) {
  const { t } = useTranslation()
  const { revalidate } = useRevalidator()

  const queryClient = useQueryClient()

  const { data } = $api.useSuspenseQuery('get', '/ips/{ip}', {
    params: {
      path: { ip: record.id },
    },
  })

  const { mutate, isPending } = $api.useMutation('put', '/ips/{ip}', {
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
      address: data.data.address,
      status: String(data.data.status),
      remark: data.data.remark,
    },
    transformValues: (values) => ({
      ...values,
      status: Number(values.status) as typeof data.data.status,
    }),
  })

  return (
    <form
      onSubmit={form.onSubmit((body) => mutate({ params: { path: { ip: record.id } }, body }))}
      className="flex flex-col gap-2"
    >
      <TextInput
        required
        label={t('fields.ips.address')}
        placeholder={t('fields.ips.address')}
        key={form.key('address')}
        readOnly
        {...form.getInputProps('address')}
      />
      <Select
        required
        label={t('fields.ips.status')}
        placeholder={t('fields.ips.status')}
        key={form.key('status')}
        {...form.getInputProps('status')}
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
