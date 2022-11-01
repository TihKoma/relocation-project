import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  href: string
  exact?: boolean
  className?: string
  path?: string | string[]
  children: ReactNode
} & Omit<LinkProps, 'passHref'>

export const NavLink: React.FC<Props> = ({
  href,
  path,
  exact,
  children,
  className,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...props
}) => {
  const { pathname, asPath } = useRouter()

  let isActive = false
  if (path) {
    if (typeof path === 'string') {
      isActive = pathname === path
    } else {
      isActive = path.includes(pathname)
    }
  } else {
    isActive = exact ? asPath === href : asPath.startsWith(href)
  }

  return (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      prefetch={prefetch}
      locale={locale}
    >
      <a className={isActive ? `${className} active` : className} {...props}>
        {children}
      </a>
    </Link>
  )
}
