import { FC } from 'react'
import { useRouter } from 'next/router'

import { RelocationMarketplaceServiceDescription } from '@/components/screens/relocation-marketplace/RelocationMarketplaceServiceDescription'
import {
  RelocationMarketplaceServiceGroupName,
  RelocationMarketplaceServiceName,
} from '@/modules/relocation-marketplace'
import { ServerData } from '@/pages/_app'

const RelocationMarketplaceServiceDescriptionPage: FC<ServerData> = () => {
  const router = useRouter()

  const serviceName =
    (router.query.serviceName as RelocationMarketplaceServiceName) || ''

  const serviceGroupName =
    (router.query.serviceGroupName as RelocationMarketplaceServiceGroupName) ||
    ''
  return (
    <RelocationMarketplaceServiceDescription
      serviceName={serviceName}
      serviceGroupName={serviceGroupName}
    />
  )
}

export default RelocationMarketplaceServiceDescriptionPage
