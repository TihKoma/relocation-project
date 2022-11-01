import { MutableRefObject, ReactNode } from 'react'
import styled from '@emotion/styled'

import { NAVIGATION_BAR_HEIGHT } from '@/components/shared/layout'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const polyfillVh = '--polyfill-vh'

export type HeaderModel = {
  onRequestBack?: () => void
  onRequestClose?: () => void
  theme: 'light' | 'dark'
  withoutCloseButton?: boolean
}

export const HEIGHT_BACK_BUTTON = '4rem'
export const APPROXIMATE_HEIGHT_HEADER = '10rem'
export const BUTTON_INDENT_FROM_HEADER = '1.6rem'
export const BUTTON_INDENT_FROM_SHEET = '1.6rem'
export const ZOOM_BUTTON_INDENT_FROM_SHEET = '6.4rem'

export const BaseNavButton = styled(NormalizedButton)`
  cursor: pointer;

  ${mobileMedia} {
    width: 4rem;
    height: ${HEIGHT_BACK_BUTTON};

    position: fixed;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${getColorTheme('earth')};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
    border-radius: 50%;

    --INDENT_TOP_SCREEN: calc(
      ${APPROXIMATE_HEIGHT_HEADER} + ${BUTTON_INDENT_FROM_HEADER} +
        ${HEIGHT_BACK_BUTTON} + ${NAVIGATION_BAR_HEIGHT}px
    );
    transform: translateY(
      calc(
        -1 * min((var(${polyfillVh}) - var(--INDENT_TOP_SCREEN)), (var(
                  --rsbs-overlay-h
                ) + ${BUTTON_INDENT_FROM_SHEET}))
      )
    );
    z-index: -1;
  }
`

export const BackButton = styled(BaseNavButton)`
  ${notMobileMedia} {
    margin-right: 1.6rem;
    width: 4rem;
    height: ${HEIGHT_BACK_BUTTON};

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    transition: ${HOVER_TRANSITION_TIME};

    &:hover {
      background: #f0f2f7;
    }
  }
  ${mobileMedia} {
    left: 1.6rem;
  }
  z-index: 10000000;
`

type PropsCommons = {
  withSubNavigation?: boolean
  map?: (() => ReactNode) | null
  isFixedDesktopHeader?: boolean
  customHeader?: ReactNode
  isFixedHeightMobileContent?: boolean // ad-hoc for scrolling iframe
  children: ReactNode
  isHideMobileSubHeader?: boolean
  isShowBackButtonDesktop?: boolean
  withOffset?: boolean
  contentRef?: MutableRefObject<HTMLDivElement | null>
  onContentScroll?: (args: any) => void
  withoutCloseButton?: boolean
  withoutNavigationBar?: boolean
  theme?: HeaderModel['theme']
  subHeaderTitle?: string | JSX.Element
  onRequestBack?: () => void
  onRequestClose?: () => void
}
type NameHeader = HeaderModel & {
  subHeaderTitle?: string | JSX.Element
}
// TODO: fix work type outside
export type LayoutProps =
  | PropsCommons
  | (PropsCommons & NameHeader)
  | (PropsCommons & HeaderModel)
