import type React from 'react'

interface LinkProps {
  href: string
  label: string
  children?: React.ReactElement<LinkProps>[]
  [rest: string]: any
}

export function Link({ href, label, children, ...rest }: LinkProps) {
  console.log(route())
  // const isActive = urlPathname === href
  // const defaultOpened = children?.some((child) =>
  //   urlPathname.startsWith(child.props.href as string),
  // )
  //
  // return (
  //   <NavLink
  //     component={InertiaLink}
  //     href={href}
  //     label={label}
  //     active={isActive}
  //     defaultOpened={defaultOpened}
  //     {...rest}
  //   >
  //     {children}
  //   </NavLink>
  // )
}
