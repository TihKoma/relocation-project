import { FC, useEffect } from 'react'

import { FavoritesScreen } from '@/components/screens/FavoritesScreen'
import { useAnalytics } from '@/modules/analytics'

import { ServerData } from './_app'

const FavoritesPage: FC<ServerData> = () => {
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.MPFavoritesListOpened()
  }, [analytics])

  return <FavoritesScreen />
}

export default FavoritesPage
