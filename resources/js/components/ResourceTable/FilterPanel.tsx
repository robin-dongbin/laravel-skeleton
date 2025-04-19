import type { UseQueryBuilderReturn } from '@/hooks/useQueryBuilder'
import { Button, Paper } from '@mantine/core'
import type React from 'react'

export default function FilterPanel({
  query,
  children,
}: {
  query: UseQueryBuilderReturn<any>
  children: React.ReactNode
}) {
  async function handleQuery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    query.setFieldValue('page', 1)
    await query.submit()
  }

  async function handleReset() {
    query.reset()
    await query.submit()
  }

  return (
    <Paper className="dark:bg-dark-8 bg-gray-0 flex gap-4 p-4">
      <form
        onSubmit={handleQuery}
        onReset={handleReset}
        className="grid flex-1 grid-cols-1 gap-4 filter lg:grid-cols-2 2xl:grid-cols-4"
      >
        {children}

        <div className="col-end-[-1] flex items-center justify-end gap-4">
          <Button type="reset" variant="default">
            Reset
          </Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </Paper>
  )
}
