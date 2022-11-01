import { forwardRef, MouseEvent, useEffect, useState } from 'react'
import 'react-spring-bottom-sheet/dist/style.css'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'
import {
  BottomSheet as RSBS,
  BottomSheetProps as RSBSProps,
  BottomSheetRef,
} from 'react-spring-bottom-sheet'

import { NAVIGATION_BAR_HEIGHT } from '@/components/shared/layout'
import { getColorTheme } from '@/styles/themes'

export type { BottomSheetRef }

export type BottomSheetProps = RSBSProps & {
  withNavigationBar?: boolean
  withOffset?: boolean
  isBottomSheetDown?: boolean | null
  setBottomSheetDown?: (
    value: boolean | null | ((prevVar: boolean | null) => boolean),
  ) => void
}

function calculateMaxHeight(maxHeight?: number, withNavigationBar?: boolean) {
  if (withNavigationBar && typeof window !== 'undefined') {
    return window.innerHeight - NAVIGATION_BAR_HEIGHT
  }

  return maxHeight
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      withNavigationBar,
      onSpringStart,
      onScroll,
      maxHeight,
      ...props
    },
    ref,
  ) => {
    const { scrollElement, setScrollElement } = useScroll(onScroll)

    return (
      <>
        <Global
          styles={{
            '[data-rsbs-overlay]': {
              bottom: withNavigationBar ? `${NAVIGATION_BAR_HEIGHT}px` : '',
            },
            '[data-rsbs-backdrop]': {
              bottom: withNavigationBar ? `${NAVIGATION_BAR_HEIGHT}px` : '',
            },
            '[data-rsbs-header]:before': {
              top: `-0.7rem`,
            },
            '[data-rsbs-header]': {
              position: 'absolute',
              top: '-2rem',
              width: '100%',
            },
          }}
        />
        <RSBSComponent
          {...props}
          ref={ref}
          onSpringStart={(e) => {
            if (e.type === 'OPEN' && onScroll && !scrollElement) {
              setScrollElement()
            }

            onSpringStart?.(e)
          }}
          {...(withNavigationBar && {
            maxHeight: calculateMaxHeight(maxHeight, withNavigationBar),
          })}
          id={'RSBSComponent'}
        >
          {children}
        </RSBSComponent>
      </>
    )
  },
)

const RSBSComponent = styled(RSBS)<BottomSheetProps>`
  --rsbs-handle-bg: ${getColorTheme('earth')};
  --rsbs-backdrop-bg: ${getColorTheme('oberon')};
`

const useScroll = (onScroll?: (e: MouseEvent<HTMLDivElement>) => void) => {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  )

  useEffect(() => {
    if (scrollElement && onScroll) {
      const handler = throttle(onScroll, 300)

      // @ts-ignore
      scrollElement.addEventListener('scroll', handler)
      // @ts-ignore
      return () => scrollElement.removeEventListener('scroll', handler)
    }
  }, [onScroll, scrollElement])

  return {
    scrollElement,
    setScrollElement: () => {
      const element = document.querySelector(
        '[data-rsbs-scroll]',
      ) as HTMLDivElement
      if (element) {
        setScrollElement(element)
      }
    },
  }
}
