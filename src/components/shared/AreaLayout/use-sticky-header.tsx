import { useEffect, useRef, useState } from 'react'
import throttle from 'lodash/throttle'

import { useIsMobileDevice } from '@/modules/device'

const BOTTOM_SHEET_SCROLL_ELEMENT_SELECTOR = '[data-rsbs-scroll="true"]'

export const useSticky = () => {
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
