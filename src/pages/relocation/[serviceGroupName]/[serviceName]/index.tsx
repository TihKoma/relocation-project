import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { RelocationMarketplaceFormScreen } from '@/components/screens/relocation-marketplace/RelocationMarketplaceFormScreen'
import { useAnalytics } from '@/modules/analytics'
import {
  RelocationMarketplaceServiceGroupName,
  RelocationMarketplaceServiceName,
} from '@/modules/relocation-marketplace'

import { ServerData } from '../../../_app'

const RelocationMarketplaceFormPage: FC<ServerData> = () => {
  const router = useRouter()
  const analytics = useAnalytics()

  const serviceName =
    (router.query.serviceName as RelocationMarketplaceServiceName) || ''

  useEffect(() => {
    if (serviceName) {
      analytics.MPServicesQuizStartStart(serviceName)
    }
  }, [serviceName, analytics])

  const serviceGroupName =
    (router.query.serviceGroupName as RelocationMarketplaceServiceGroupName) ||
    ''
  return (
    <RelocationMarketplaceFormScreen
      serviceName={serviceName}
      serviceGroupName={serviceGroupName}
    />
  )
}

export default RelocationMarketplaceFormPage
