import { links } from '#admin/layouts/dashboard/navigation'
import { getBreadcrumbs } from '@/packages/lib/utils'
import { Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import { Link, useMatches } from 'react-router'

export default function PageContainer({
  title,
  actions,
  children,
}: {
  title?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const matches = useMatches()
  const breadcrumbs = getBreadcrumbs(links, matches.at(-1)!.pathname)

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <UnstyledButton to="" component={Link}>
            <Title order={2}>{breadcrumbs?.at(-1)?.label || title}</Title>
          </UnstyledButton>
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}
