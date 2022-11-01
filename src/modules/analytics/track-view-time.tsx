import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { useIntersectionalObserver } from '../utils/useIntersectionalObserver'

export const useCallbackWhenChangeVisible = (
  appearCallback?: () => void,
  disappearCallback?: () => void,
) => {
  const [isVisible, setRef] = useIsVisible()

  useEffect(() => {
    if (isVisible) {
      appearCallback?.()
    } else {
      disappearCallback?.()
    }
  }, [appearCallback, isVisible, disappearCallback])

  return setRef
}

export const useIsVisible = (
  options: IntersectionObserverInit = {
    root: null,
    threshold: 1,
  },
): [boolean, ReturnType<typeof useIntersectionalObserver>[0]] => {
  const [isVisible, setIsVisible] = useState(false)

  const [setRef, entry] = useIntersectionalObserver(options)

  useEffect(() => {
    if (entry) {
      setIsVisible(entry.isIntersecting)
    }
  }, [entry])

  useEffect(() => {
    return () => setIsVisible(false)
  }, [])

  return [isVisible, setRef]
}

export const useViewTimeTracking = (callback: (time: number) => void) => {
  const [isVisible, setRef] = useIsVisible()

  const startTime = useRef(0)

  useEffect(() => {
    if (isVisible) {
      startTime.current = new Date().getTime()
    }
    if (!isVisible && startTime.current) {
      const currentTime = new Date().getTime()
      callback(currentTime - startTime.current)
      startTime.current = 0
    }
  }, [isVisible, callback])

  // to call callback on page refresh
  const router = useRouter()
  useEffect(() => {
    let preventCallback = false

    const routeChangeStart = () => {
      if (!preventCallback) {
        if (isVisible && startTime.current) {
          const currentTime = new Date().getTime()
          callback(currentTime - startTime.current)
        }
        preventCallback = true
      }
    }

    const beforeUnload = () => {
      if (!preventCallback && isVisible && startTime.current) {
        const currentTime = new Date().getTime()
        callback(currentTime - startTime.current)
      }
    }
    router.events.on('routeChangeStart', routeChangeStart)
    window.addEventListener('beforeunload', beforeUnload)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [router, startTime, callback, isVisible])

  return setRef
}
