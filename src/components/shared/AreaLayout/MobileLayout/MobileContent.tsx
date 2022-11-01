import { FC, ReactNode, UIEventHandler } from 'react'
import styled from '@emotion/styled'

import { HeaderMobile } from '@/components/shared/AreaLayout/HeaderMobile'
import { HeaderModel } from '@/components/shared/AreaLayout/shared'
import { SheetMobile } from '@/components/shared/AreaLayout/SheetMobile'
import { NAVIGATION_BAR_HEIGHT } from '@/components/shared/layout'
import { getColorTheme } from '@/styles/themes'

type Props = {
  isBottomSheet: boolean
  withoutCloseButton?: boolean
  children: ReactNode
  withOffset?: boolean
  subHeaderTitle?: string | JSX.Element
  theme: HeaderModel['theme']
  onContentScroll?: (args: any) => void
  onRequestBack?: () => void
  onRequestClose?: () => void
  isHideSubHeader?: boolean
  withoutNavigationBar?: boolean
  isFixedHeightMobileContent?: boolean
}
export const MobileContent: FC<Props> = ({
  isBottomSheet,
  withoutCloseButton,
  children,
  withOffset,
  theme,
  onContentScroll,
  onRequestBack,
  subHeaderTitle,
  onRequestClose,
  isHideSubHeader,
  withoutNavigationBar,
  isFixedHeightMobileContent,
}) => {
  return isBottomSheet ? (
    <SheetMobile
      withOffset={withOffset}
      withNavigationBar
      mode={theme}
      //@ts-ignore
      onScrollHandler={(e: UIEventHandler<HTMLDivElement>) => {
        onContentScroll?.(e)
      }}
      header={
        <HeaderMobile
          onRequestClose={onRequestClose ?? undefined}
          onRequestBack={onRequestBack ?? undefined}
          withoutCloseButton={withoutCloseButton ?? undefined}
        />
      }
    >
      <Content mode={theme}>
        <SubHeader
          mode={theme}
          isHideMobile={!subHeaderTitle || isHideSubHeader}
        >
          <SubHeaderTitle>{subHeaderTitle}</SubHeaderTitle>
        </SubHeader>
        {children}
      </Content>
    </SheetMobile>
  ) : (
    <OnMobileOnlyContentWrapper
      mode={theme}
      withoutNavigationBar={withoutNavigationBar}
      isFixedHeightMobileContent={isFixedHeightMobileContent}
    >
      {children}
    </OnMobileOnlyContentWrapper>
  )
}

const OnMobileOnlyContentWrapper = styled.div<{
  mode: HeaderModel['theme']
  withoutNavigationBar?: boolean
  isFixedHeightMobileContent?: boolean
}>`
  height: 100%;

  background: ${
    // TODO: move comomn function for reuse down
    (props) => getColorTheme(props.mode === 'light' ? 'earth' : 'sun50')
  };

  ${(props) =>
    !props.withoutNavigationBar &&
    props.isFixedHeightMobileContent &&
    `height: calc(100% - ${NAVIGATION_BAR_HEIGHT}px);`}

  ${(props) =>
    props.withoutNavigationBar || props.isFixedHeightMobileContent
      ? ''
      : `padding-bottom: ${NAVIGATION_BAR_HEIGHT}px;`}
`
const Content = styled.div<{ mode: HeaderModel['theme'] }>`
  display: flex;
  flex-direction: column;

  border-radius: ${({ mode }) =>
    mode === 'dark' ? `2.4rem 2.4rem 0 0` : '2.4rem'};
`
const SubHeader = styled.div<{
  isHideMobile?: boolean
  mode: HeaderModel['theme']
}>`
  height: 6.4rem;
  min-height: 0;
  padding: 3.2rem 1.6rem 1.6rem;

  display: flex;
  align-items: center;
  flex-shrink: 0;

  background: ${getColorTheme('earth')};
  border-radius: ${({ mode }) =>
    mode === 'dark' ? `2.4rem 2.4rem 0 0` : '2.4rem'};

  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${({ isHideMobile }) =>
    isHideMobile
      ? 'padding: 0; height: 0; min-height: 0; box-shadow: none; overflow: hidden;'
      : ''}
`
const SubHeaderTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
