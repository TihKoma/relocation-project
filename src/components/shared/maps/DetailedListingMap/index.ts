import dynamic from 'next/dynamic'

import type { DetailedListingMapProps } from './DetailedListingMap'

export const DetailedListingMap = dynamic<DetailedListingMapProps>(
  () => import('./DetailedListingMap').then((mod) => mod.DetailedListingMap),
  {
    ssr: false,
  },
)
