import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { RelocationMarketplaceScreen } from '@/components/screens/relocation-marketplace/RelocationMarketplaceScreen'
import { useAnalytics } from '@/modules/analytics'

import { ServerData } from '../_app'

const RelocationMarketplacePage: FC<ServerData> = () => {
  const analytics = useAnalytics()
  const router = useRouter()

  useEffect(() => {
    analytics.MPServicesMainPageOpened()
  }, [analytics])

  const serviceNameCompleted =
    (router.query.serviceNameCompleted as string) || ''

  return (
    <RelocationMarketplaceScreen serviceNameCompleted={serviceNameCompleted} />
  )
}

export default RelocationMarketplacePage
