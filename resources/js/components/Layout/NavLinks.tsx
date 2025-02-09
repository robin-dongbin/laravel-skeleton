import type { NavItem } from '@/types'
import { Icon } from '@iconify/react'
import { Link as InertiaLink } from '@inertiajs/react'

import { NavLink } from '@mantine/core'

function RenderNavLink({ item, level = 0 }: { item: NavItem; level?: number }) {
  const isChildActive = item.children?.some((child) => location.pathname.startsWith(child.path))

  return (
    <NavLink
      component={InertiaLink}
      href={item.url}
      label={item.title}
      leftSection={item.attributes.icon && <Icon icon={item.attributes.icon} />}
      defaultOpened={isChildActive}
      classNames={{
        children: 'ps-0',
        root: level > 0 ? `ps-${level * 10}` : undefined,
      }}
    >
      {item.children?.length > 0 &&
        item.children?.map((child) => <RenderNavLink key={child.title} item={child} level={level + 1} />)}
    </NavLink>
  )
}

export default function NavLinks({ links }: { links: NavItem[] }) {
  console.log(links)
  return (
    <>
      {links.map((item) => (
        <RenderNavLink key={item.title} item={item} />
      ))}
    </>
  )
}
