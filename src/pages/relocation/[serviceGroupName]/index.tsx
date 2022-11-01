import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { RelocationMarketplaceGroupScreen } from '@/components/screens/relocation-marketplace/RelocationMarketplaceGroupScreen'
import { useAnalytics } from '@/modules/analytics'
import { RelocationMarketplaceServiceGroupName } from '@/modules/relocation-marketplace'

import { ServerData } from '../../_app'

const RelocationMarketplaceGroupPage: FC<ServerData> = () => {
  const router = useRouter()
  const analytics = useAnalytics()

  const serviceGroupName =
    (router.query.serviceGroupName as RelocationMarketplaceServiceGroupName) ||
    ''

  useEffect(() => {
    if (serviceGroupName) {
      analytics.MPServicesGroupPageOpened(serviceGroupName)
    }
  }, [serviceGroupName, analytics])

  return (
    <RelocationMarketplaceGroupScreen serviceGroupName={serviceGroupName} />
  )
}

export default RelocationMarketplaceGroupPage
