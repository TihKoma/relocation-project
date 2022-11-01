import { FC, useEffect } from 'react'

import { MarketplaceScreen } from '@/components/screens/MarketplaceScreen'
import { useAnalytics } from '@/modules/analytics'

import { ServerData } from '../../_app'

const Homes: FC<ServerData> = () => {
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.MPMainPageViewed()
  }, [analytics])

  return <MarketplaceScreen />
}

export default Homes
