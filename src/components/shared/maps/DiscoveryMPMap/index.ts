import dynamic from 'next/dynamic'

import type { DiscoveryMPMapProps } from './DiscoveryMPMap'

export const DiscoveryMPMap = dynamic<DiscoveryMPMapProps>(
  () => import('./DiscoveryMPMap').then((mod) => mod.DiscoveryMPMap),
  {
    ssr: false,
  },
)
