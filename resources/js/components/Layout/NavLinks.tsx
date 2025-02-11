import type { NavItem } from '@/types'
import { Icon } from '@iconify/react'
import { Link as InertiaLink } from '@inertiajs/react'
import { NavLink } from '@mantine/core'

function Link({ item }: { item: NavItem; level?: number }) {
  return (
    <NavLink
      component={InertiaLink}
      href={item.url}
      label={item.title}
      leftSection={item.attributes.icon && <Icon icon={item.attributes.icon} />}
      defaultOpened={item.active}
      classNames={{
        children: 'ps-0',
        root: item.depth > 0 ? `ps-${item.depth * 10}` : undefined,
      }}
    >
      {item.children?.map((child) => <Link key={child.title} item={child} />)}
    </NavLink>
  )
}

export default function NavLinks({ links }: { links: NavItem[] }) {
  return (
    <>
      {links.map((item) => (<Link key={item.title} item={item} />))}
    </>
  )
}
