import type { NavItem } from '@/types'
import { Icon } from '@iconify/react'
import { NavLink } from '@mantine/core'
import { NavLink as RouterLink } from 'react-router'
import { links } from './navigation'

function Link({ item, level = 0 }: { item: NavItem; level?: number }) {
  return (
    <NavLink
      viewTransition
      component={RouterLink}
      to={item.path}
      label={item.label}
      leftSection={<Icon icon={item.icon ?? ''} />}
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
