import { type InitialValues, QueryBuilderProvider } from '@/packages/contexts/QueryBuilderContext.tsx'
import type { NavItem } from '@/types'
import { links } from '@admin/layouts/dashboard/navigation'
import { Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

function getTitle(items: NavItem[], pathname: string): string | undefined {
  for (const item of items) {
    // 如果当前项的 pathname 匹配，返回 label
    if (item.pathname === pathname) {
      return item.label
    }
    // 如果有 children，递归查找
    if (item.children) {
      const result = getTitle(item.children, pathname)
      if (result) {
        return result
      }
    }
  }
  return undefined // 没有匹配项返回 undefined
}

function PageTitle() {
  const location = useLocation()

  const title = getTitle(links, location.pathname)
  const { t } = useTranslation()

  return (
    <UnstyledButton to={{ pathname: location.pathname, search: location.search }} component={Link}>
      <Title order={2}>{t(`navigation.${title}`)}</Title>
    </UnstyledButton>
  )
}

function Main({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col gap-4">{children}</div>
}

export default function PageContainer<T extends Record<string, any>>({
  actions,
  query,
  children,
}: {
  actions?: React.ReactNode
  query?: Partial<InitialValues<T>>
  children: React.ReactNode
}) {
  const initialValues = {
    page: 1,
    per_page: 15,
    sort: '',
    include: '',
    filter: {},
    ...query,
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageTitle />
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      {query ? (
        <QueryBuilderProvider initialValues={initialValues}>
          <Main>{children}</Main>
        </QueryBuilderProvider>
      ) : (
        <Main>{children}</Main>
      )}
    </div>
  )
}
