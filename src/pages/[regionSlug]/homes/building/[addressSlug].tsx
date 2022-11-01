import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ListingsGroupScreen } from '@/components/screens/ListingsGroupScreen'
import { useAnalytics } from '@/modules/analytics'
import { ServerData } from '@/pages/_app'

const ListingsGroupPage: FC<ServerData> = () => {
  const router = useRouter()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.MPGroupPinOpened()
  }, [analytics])

  const addressSlug =
    typeof router.query.addressSlug === 'string' ? router.query.addressSlug : ''
  const areaSlug =
    typeof router.query.regionSlug === 'string' ? router.query.regionSlug : ''

  if (!addressSlug) {
    return null
  }

  return <ListingsGroupScreen addressSlug={addressSlug} areaSlug={areaSlug} />
}

export default ListingsGroupPage
