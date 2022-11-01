import React, { FC, useContext, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import {
  LogoIcon as LogoIconBase,
  LogoTextIcon as LogoTextIconBase,
} from '@/images/logo'
import { ReactComponent as SearchIcon } from '@/images/mag.svg'
import { useIsNotMobileDevice } from '@/modules/device'
import {
  headerChangeMediaFirst,
  mobileMedia,
  notMobileMedia,
} from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SearchBarInput as SearchBarInputBase } from '../SearchBarInput'
import { Toolbar } from '../Toolbar'
import { ViewMode, ViewModeContext } from '../ViewModeContext'
import { HeaderNavigation as HeaderNavigationBase } from './HeaderNavigation'

type Props = {
  className?: string
  isMobileHeaderHidden?: boolean
  viewMode?: 'map'
}
export const Header: FC<Props> = ({
  className,
  isMobileHeaderHidden,
  viewMode: viewModeBase,
}) => {
  const [{ viewMode, withBackButtonOnMap }] = useContext(ViewModeContext)
  const isNotMobile = useIsNotMobileDevice()

  const router = useRouter()

  const searchInitialValue = useMemo(
    () =>
      router.pathname === '/search' && typeof router.query.q === 'string'
        ? router.query.q
        : '',
    [router],
  )

  return (
    <Container
      className={className}
      viewMode={viewModeBase ?? viewMode}
      isMobileHeaderHidden={isMobileHeaderHidden || withBackButtonOnMap}
    >
      <Logo
        isMobileHeaderHidden={isMobileHeaderHidden || withBackButtonOnMap}
      />
      {isNotMobile && <HeaderNavigationDesktop />}
      <SearchBarInput initialValue={searchInitialValue} />
      {isNotMobile && <Toolbar />}
      {!isNotMobile && (
        <Link href={'/search'} passHref>
          <SearchLink
            isMobileHeaderHidden={isMobileHeaderHidden || withBackButtonOnMap}
          >
            <SearchIcon />
          </SearchLink>
        </Link>
      )}
    </Container>
  )
}

const Logo: FC<{ isMobileHeaderHidden?: boolean }> = ({
  isMobileHeaderHidden,
}) => {
  return (
    <Link href={'/'} passHref>
      <LogoContainer isMobileHeaderHidden={isMobileHeaderHidden}>
        <LogoIcon />
        <LogoTextIcon />
      </LogoContainer>
    </Link>
  )
}

export const HEIGHT_MOBILE_HEADER = 44

const Container = styled.div<{
  viewMode?: ViewMode
  isMobileHeaderHidden?: boolean
}>`
  z-index: 4;

  display: grid;
  justify-items: start;
  background-color: ${getColorTheme('earth')};

  ${mobileMedia} {
    width: 100%;
    height: ${(props) =>
      props.isMobileHeaderHidden ? '0' : `${HEIGHT_MOBILE_HEADER}px`};
    margin: 0 auto;
    padding: 0 1.2rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    grid-auto-flow: column;
    grid-template-columns: auto 1fr;

    box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
      0px 4px 16px 1px rgba(18, 21, 31, 0.08);

    ${(props) =>
      props.viewMode === 'map'
        ? `
        width: calc(100% - 1.6rem);

        top: 0.8rem;

        border-radius: 1.2rem;
      `
        : ''}
  }
  ${notMobileMedia} {
    width: 100%;
    height: 6.4rem;

    grid-template-columns: auto 1fr 1fr auto;
    align-items: center;
    gap: 1.6rem;
  }
`
const HeaderNavigationDesktop = styled(HeaderNavigationBase)`
  justify-self: start;
  z-index: 2;

  background-color: ${getColorTheme('earth')};
`
const SearchBarInput = styled(SearchBarInputBase)`
  z-index: 2;

  display: none;

  justify-self: end;

  ${notMobileMedia} {
    display: block;
    max-width: 32rem;
    width: 100%;
  }
`
const SearchLink = styled.a<{ isMobileHeaderHidden?: boolean }>`
  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-self: end;
  justify-content: end;

  width: 100%;

  ${(props) => (props.isMobileHeaderHidden ? 'display: none;' : '')}
`

const LogoContainer = styled.a<{ isMobileHeaderHidden?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;

  ${headerChangeMediaFirst} {
    margin-right: 0.8rem;
  }

  ${mobileMedia} {
    gap: 0.8rem;

    ${(props) => (props.isMobileHeaderHidden ? 'display: none;' : '')}
  }
`
const LogoIcon = styled(LogoIconBase)`
  ${mobileMedia} {
    height: 2rem;
  }
`
const LogoTextIcon = styled(LogoTextIconBase)`
  margin-right: 1.6rem;

  ${mobileMedia} {
    display: block;
    height: 2.4rem;
    margin-top: 0.2rem;
  }
  ${headerChangeMediaFirst} {
    display: none;
  }
`
