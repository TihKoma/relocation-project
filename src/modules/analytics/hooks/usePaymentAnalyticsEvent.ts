import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAnalytics } from '@/modules/analytics'
import { PAYMENTS_PLANS } from '@/modules/payment'
import { ROUTES } from '@/modules/router'

export const usePaymentAnalyticsEvent = () => {
  const analytics = useAnalytics()
  const router = useRouter()

  useEffect(() => {
    if (router.query.withPaymentEvent && router.asPath !== ROUTES.payment.as) {
      analytics.subscriptionPaymentSuccess('optimal', PAYMENTS_PLANS.optimal)
      const filteredQuery = {
        ...router.query,
      }
      delete filteredQuery.withPaymentEvent
      router.replace({
        pathname: router.pathname,
        query: filteredQuery,
      })
    }
  }, [router, analytics])
}
