import { Button, Paper } from '@mantine/core'
import type React from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

export default function AdvancedFilter({
  children,
  onSubmit,
  onReset,
}: {
  children: React.ReactNode
  onSubmit: () => void
  onReset: () => void
}) {
  const { t } = useTranslation()

  const _onSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Paper className="dark:bg-dark-8 bg-gray-0 @container flex w-full gap-4 p-4">
      <form
        onSubmit={_onSubmit}
        onReset={onReset}
        className="grid flex-1 grid-cols-1 gap-4 filter @lg:grid-cols-2 @5xl:grid-cols-4"
      >
        {children}
        <div className="col-end-[-1] flex items-center justify-end gap-4">
          <Button type="reset" variant="default">
            {t('actions.reset')}
          </Button>
          <Button type="submit">{t('actions.apply')}</Button>
        </div>
      </form>
    </Paper>
  )
}
