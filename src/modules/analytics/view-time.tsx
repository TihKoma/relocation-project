import {
  DetailedHTMLProps,
  forwardRef,
  LiHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import styled from '@emotion/styled'

import { ViewModeContext } from '@/components/shared/layout'
import { isServer } from '@/modules/utils/is-server'
import { mobileMedia } from '@/styles/media'

import { ResultsRegionViewedData, useAnalytics } from './AnalyticsFacade'

const DURATION_TO_SKIP = 1000

export const useViewTime = (
  root: Element | null,
  { quizId, regionId, source }: ResultsRegionViewedData,
) => {
  const timeId = useRef<number | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const clearTime = useCallback(() => {
    if (timeId.current !== null) {
      clearTimeout(timeId.current)
    }
  }, [])
  const clearAll = useCallback(() => {
    observer.current?.disconnect()
    clearTime()
  }, [clearTime])
  useEffect(() => {
    return clearAll
  }, [clearAll])
  const analytics = useAnalytics()

  const elementRef = useRef<Element | undefined>(undefined)
  const rootRef = useRef<Element | null>(root)
  rootRef.current = root

  const subscribe = useCallback(
    (element: Element | null) => {
      if (element === null || element === elementRef.current) {
        return
      }

      clearAll()
      elementRef.current = element
      observer.current = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // TODO: nodejs types, use web types
            timeId.current = setTimeout(() => {
              if (!isServer) {
                analytics.resultsRegionViewed({ quizId, regionId, source })
              }
            }, DURATION_TO_SKIP) as unknown as number
          } else {
            clearTime()
          }
        },
        {
          root: rootRef.current,
          threshold: 1,
        },
      )
      observer.current.observe(elementRef.current)
    },
    [analytics, clearAll, clearTime, quizId, regionId, source],
  )
  useEffect(() => {
    subscribe(elementRef.current ?? null)
  }, [root, subscribe])

  return subscribe
}

// don't emit event when map overlaps result and move map, emit when back on list
export const ScrollableContainer = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<LiHTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props, ref) => {
  const [{ viewMode }] = useContext(ViewModeContext)
  return <Container ref={ref} {...props} isShowMap={viewMode === 'map'} />
})

const Container = styled.div<{ isShowMap?: boolean }>`
  ${mobileMedia} {
    ${({ isShowMap }) => (isShowMap ? 'display: none;' : '')}
  }
`
