import dynamic from 'next/dynamic'

import type { DiscoveryCPMapProps } from './DiscoveryCPMap'

export const DiscoveryCPMap = dynamic<DiscoveryCPMapProps>(
  () => import('./DiscoveryCPMap').then((mod) => mod.DiscoveryCPMap),
  {
    ssr: false,
  },
)
