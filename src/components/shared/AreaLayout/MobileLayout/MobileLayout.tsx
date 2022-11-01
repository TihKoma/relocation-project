import { FC } from 'react'
import styled from '@emotion/styled'

import {
  Header as HeaderBase,
  NAVIGATION_BAR_HEIGHT,
  NavigationBar as NavigationBarBase,
} from '@/components/shared/layout'

import { LayoutProps } from '../shared'
import { SubNavigation } from '../SubNavigation'
import { MobileContent } from './MobileContent'

type Props = Omit<LayoutProps, 'isShowBackButtonDesktop' | 'contentRef'>
export const MobileLayout: FC<Props> = ({
  children,
  customHeader,
  withSubNavigation,
  withOffset,
  withoutNavigationBar = false,
  withoutCloseButton,
  onContentScroll,
  isFixedHeightMobileContent,
  map,
  isHideMobileSubHeader = false,
  theme = 'light',
  subHeaderTitle,
  onRequestBack,
  onRequestClose,
}) => {
  const navigationBar = !withoutNavigationBar && (
    <NavigationBar isFixedHeightMobileContent={isFixedHeightMobileContent} />
  )
  return (
    <Container>
      {!isFixedHeightMobileContent && navigationBar}
      {map && (
        <>
          <HeaderWrapper>
            {customHeader || <Header viewMode={'map'} />}
            {withSubNavigation && <SubNavigation />}
          </HeaderWrapper>
          <MapWrapper>{map()}</MapWrapper>
        </>
      )}
      <MobileContent
        isBottomSheet={!!map}
        withoutCloseButton={withoutCloseButton}
        withOffset={withOffset}
        isHideSubHeader={isHideMobileSubHeader}
        theme={theme}
        onContentScroll={onContentScroll}
        subHeaderTitle={subHeaderTitle}
        onRequestClose={onRequestClose}
        onRequestBack={onRequestBack}
        withoutNavigationBar={withoutNavigationBar}
        isFixedHeightMobileContent={isFixedHeightMobileContent}
      >
        {children}
      </MobileContent>
      {isFixedHeightMobileContent && navigationBar}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`
const MapWrapper = styled.div`
  height: calc(100% - ${NAVIGATION_BAR_HEIGHT}px);
`
const Header = styled(HeaderBase)`
  padding: 0 2.4rem;
  margin: 0;
  width: 100% !important;

  top: 0 !important;
  bottom: 0 !important;
  position: relative !important;
`
const HeaderWrapper = styled.div`
  padding: 0.8rem;

  display: grid;
  gap: 0.8rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 3;
`
const NavigationBar = styled(NavigationBarBase)<{
  isFixedHeightMobileContent?: boolean
}>`
  ${(props) => props.isFixedHeightMobileContent && 'position: static;'}
`
