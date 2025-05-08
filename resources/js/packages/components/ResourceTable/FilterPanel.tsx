import { useQueryBuilder } from '@/packages/contexts/QueryBuilderProvider/useQueryBuilder.ts'
import { Button, Paper } from '@mantine/core'
import type React from 'react'
import { useTranslation } from 'react-i18next'

export default function FilterPanel({ children }: { children: React.ReactNode }) {
  const { query, submit, reset } = useQueryBuilder()
  const { t } = useTranslation()

  const handleQuery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    query.setFieldValue('page', 1)
    await submit()
  }

  return (
    <Paper className="dark:bg-dark-8 bg-gray-0 flex gap-4 p-4">
      <form
        onSubmit={handleQuery}
        onReset={reset}
        className="grid flex-1 grid-cols-1 gap-4 filter lg:grid-cols-2 2xl:grid-cols-4"
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
