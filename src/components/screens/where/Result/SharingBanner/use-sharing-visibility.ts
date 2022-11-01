import { useEffect, useRef, useState } from 'react'
import { useLocalStorage, useSessionStorage } from 'react-use'

import { useAnalytics } from '@/modules/analytics'
import { isServer } from '@/modules/utils/is-server'

const WAITING_TIME = 1000

export const useSharingVisibility = (id: string) => {
  const [localValue, setLocalValue, _] = useLocalStorage('isShared')
  const [sessionValue, setSessionValue] = useSessionStorage('isSharingShown')

  const [isSharingVisible, setSharingVisible] = useState<boolean>(false)
  const [isShared, setShared] = useState(localValue)
  const [isSharingShown, setSharingShown] = useState(sessionValue)

  useEffect(() => {
    setSharingVisible(false)
  }, [isShared, isSharingShown])

  const sharingRef = useRef<HTMLDivElement>(null)
  const timeId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const analytics = useAnalytics()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (
          target.isIntersecting &&
          !isSharingVisible &&
          !isSharingShown &&
          !isShared
        ) {
          setSharingVisible(true)
          timeId.current = setTimeout(() => {
            if (!isServer) {
              analytics.matchShareBannerShown({ quizId: id, source: 'list' })
            }
          }, WAITING_TIME)
        }
      },
      {
        rootMargin: '0px 0px -45% 0px',
      },
    )
    let current: HTMLDivElement
    if (sharingRef && sharingRef.current) {
      current = sharingRef.current
      observer.observe(current)
    }

    return () => {
      observer.unobserve(current)
      if (timeId.current !== null) {
        clearTimeout(timeId.current)
      }
    }
  }, [analytics, id, isShared, isSharingShown, isSharingVisible])

  const hideSharingForSession = () => {
    setSharingShown(true)
    setSessionValue(true)
  }

  const hideSharing = () => {
    setShared(true)
    setLocalValue(true)
  }

  return {
    sharingRef,
    isSharingVisible,
    hideSharingForSession,
    hideSharing,
  }
}
