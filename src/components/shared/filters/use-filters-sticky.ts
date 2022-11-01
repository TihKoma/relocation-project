import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'

import { useIsMobileDevice } from '@/modules/device'
import { getColorTheme } from '@/styles/themes'

const BOTTOM_SHEET_SCROLL_ELEMENT_SELECTOR = '[data-rsbs-scroll="true"]'

export const useFiltersSticky = () => {
  const scrollElementRef = useRef<Element | null>(null)
  const targetElementRef = useRef<HTMLDivElement | null>(null)
  const [isFixed, setIsFixed] = useState<boolean>(false)
  const isMobile = useIsMobileDevice()

  useEffect(() => {
    if (isMobile) {
      const targetHeight =
        targetElementRef.current?.getBoundingClientRect()?.height || 0
      scrollElementRef.current = document.querySelector(
        BOTTOM_SHEET_SCROLL_ELEMENT_SELECTOR,
      )

      if (scrollElementRef.current) {
        const scrollHandler = throttle((e: Event) => {
          const element = e.target as Element
          setIsFixed(element.scrollTop > targetHeight + 50)
        }, 100)
        scrollElementRef.current.addEventListener('scroll', scrollHandler)

        return () =>
          scrollElementRef.current?.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [isMobile])

  return { isFixed, scrollElementRef, targetElementRef }
}

export const StickyBehavior = styled.div`
  padding-top: 1.6rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 2;
  background-color: ${getColorTheme('earth')};
  border-radius: 1.6rem;
`
