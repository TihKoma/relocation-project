import { useEffect } from 'react'

import { useOnScrollProvider } from './core'

export const useScrollOnElement = (element: Element | null | undefined) => {
  // TODO: why  it hook if we have just useOnScrollProvider
  const infinityScroll = useOnScrollProvider()
  useEffect(() => {
    if (element) {
      element.addEventListener('scroll', infinityScroll)
      return () => element.removeEventListener('scroll', infinityScroll)
    }
  }, [infinityScroll, element])
}
