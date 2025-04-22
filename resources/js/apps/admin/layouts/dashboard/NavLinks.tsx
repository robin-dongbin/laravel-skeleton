import Icon from '@/packages/components/Icon'
import type { NavItem } from '@/types'
import { NavLink } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { NavLink as RouterLink } from 'react-router'
import { links } from './navigation'

function Link({ item, level = 0 }: { item: NavItem; level?: number }) {
  const { t } = useTranslation()
  return (
    <NavLink
      viewTransition
      defaultOpened
      component={RouterLink}
      to={item.path}
      label={t(`navigation.${item.label}`)}
      leftSection={item.icon && <Icon icon={item.icon} />}
      color={!item.path ? 'none' : undefined}
      classNames={{
        root: !item.path && 'bg-transparent mt-2',
        label: !item.path ? 'text-sm opacity-70' : 'font-medium',
      }}
      childrenOffset={0}
    >
      {item.children &&
        item.children.length > 0 &&
        item.children.map((child) => <Link key={child.label} item={child} level={level + 1} />)}
    </NavLink>
  )
}

export default function NavLinks() {
  return links.map((item) => <Link key={item.label} item={item} />)
}
