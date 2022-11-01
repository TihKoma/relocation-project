import { FC } from 'react'
import styled from '@emotion/styled'

import { Header as HeaderBase } from '@/components/shared/layout'

import { LayoutProps } from '../shared'
import { DesktopContentWithMap } from './DesktopContentWithMap'

type Props = Omit<
  LayoutProps,
  'withOffset' | 'withoutCloseButton' | 'isHideMobileSubHeader'
>
export const DesktopLayout: FC<Props> = ({
  children,
  customHeader,
  withSubNavigation,
  onContentScroll,
  isFixedDesktopHeader,
  map,
  isShowBackButtonDesktop = true,
  contentRef,
  theme = 'light',
  subHeaderTitle,
  onRequestBack,
  onRequestClose,
}) => {
  return (
    <Container withFixedHeader={isFixedDesktopHeader}>
      <HeaderWrapper isFixed={isFixedDesktopHeader}>
        {customHeader}
        <Header viewMode={'map'} />
      </HeaderWrapper>
      {map ? (
        <Wrapper>
          {map?.()}
          <DesktopContentWithMap
            subHeaderTitle={subHeaderTitle}
            theme={theme}
            customHeader={customHeader}
            onRequestBack={onRequestBack}
            onRequestClose={onRequestClose}
            isBackButtonVisible={isShowBackButtonDesktop}
            contentRef={contentRef}
            onContentScroll={onContentScroll}
            withSubNavigation={withSubNavigation}
          >
            {children}
          </DesktopContentWithMap>
        </Wrapper>
      ) : (
        <DesktopContentWithoutMap onScroll={onContentScroll} ref={contentRef}>
          {children}
        </DesktopContentWithoutMap>
      )}
    </Container>
  )
}

const Container = styled.div<{ withFixedHeader?: boolean }>`
  ${(props) => (props.withFixedHeader ? '' : 'height: 100vh;')}
  width: 100%;

  display: grid;
  grid-template-rows: auto 1fr;
`

const Wrapper = styled.div`
  position: relative;
`
const Header = styled(HeaderBase)`
  padding: 0 2.4rem;
`
const HeaderWrapper = styled.div<{ isFixed?: boolean }>`
  ${(props) => (props.isFixed ? 'position: sticky; top: 0;' : '')}
  box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
    0px 4px 16px 1px rgba(18, 21, 31, 0.08);

  z-index: 1;
`
const DesktopContentWithoutMap = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`
