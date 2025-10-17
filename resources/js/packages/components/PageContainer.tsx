import { links } from '@/apps/admin/navigation.ts'
import type { NavItem } from '@/types'
import { Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

const getTitle = (items: NavItem[], pathname: string): string | undefined => {
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

const PageTitle = ({ title }: { title?: string }) => {
  const location = useLocation()

  const defaultTitle = getTitle(links, location.pathname)
  const { t } = useTranslation()

  return (
    <UnstyledButton
      to={{ pathname: location.pathname, search: location.search }}
      component={Link}
    >
      <Title order={2}>{title || t(`navigation.${defaultTitle}`)}</Title>
    </UnstyledButton>
  )
}

export default function PageContainer({
  title,
  actions,
  children,
}: {
  title?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageTitle title={title} />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {actions}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </div>
  )
}
