import dynamic from 'next/dynamic'

import type { FavoritesMapProps } from './FavoritesMap'

export const FavoritesMap = dynamic<FavoritesMapProps>(
  () => import('./FavoritesMap').then((mod) => mod.FavoritesMap),
  {
    ssr: false,
  },
)
