import { createContext, FC, ReactNode, useContext, useEffect } from 'react'

import { useCookieController } from '@/modules/cookie'

import { AnalyticsFacade } from './AnalyticsFacade'

const analyticsFacade = new AnalyticsFacade()
const AnalyticsContext = createContext(analyticsFacade)

type Props = {
  children: ReactNode
}
export const AnalyticsProvider: FC<Props> = ({ children }) => {
  const cookie = useCookieController()
  const user_id = cookie?.get()['user_id']
  const user_segment_filter = cookie?.get()['user_segment_filter']

  useEffect(() => {
    if (user_id) {
      // @ts-ignore
      window.dataLayer.push({ user_id })
    }
    if (user_segment_filter) {
      // @ts-ignore
      window.dataLayer.push({ user_segment_filter })
    }
  }, [user_id, user_segment_filter])

  return (
    <AnalyticsContext.Provider value={analyticsFacade}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  return useContext(AnalyticsContext)
}
