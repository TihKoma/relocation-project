import { RefObject, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useRestoreScroll = (
  ref: RefObject<HTMLDivElement>,
  key: string,
  isFeedLoaded: boolean,
  regex: RegExp,
) => {
  const router = useRouter()

  useEffect(() => {
    const restoreScrollPosition = (ref: RefObject<HTMLDivElement>) => {
      const savedScrollTop = localStorage.getItem(key)
      if (isFeedLoaded && savedScrollTop) {
        ref?.current?.scrollTo(0, Number(savedScrollTop))
        localStorage.removeItem(key)
      }
    }
    restoreScrollPosition(ref)
  }, [ref, key, isFeedLoaded])

  useEffect(() => {
    const saveScrollPosition = (url: string) => {
      const isRedirectToListItem = url.match(regex)
      if (isRedirectToListItem) {
        const scrollTop = ref?.current?.scrollTop
        if (typeof scrollTop === 'number') {
          localStorage.setItem(key, String(scrollTop))
        }
      } else {
        localStorage.removeItem(key)
      }
    }

    const onLeavePage = () => {
      localStorage.removeItem(key)
    }
    router.events.on('routeChangeStart', saveScrollPosition)
    window.addEventListener('beforeunload', onLeavePage)
    return () => {
      router.events.off('routeChangeStart', saveScrollPosition)
      window.removeEventListener('beforeunload', onLeavePage)
    }
  }, [router, ref, key, regex])
}
