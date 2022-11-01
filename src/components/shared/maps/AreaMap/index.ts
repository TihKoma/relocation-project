import dynamic from 'next/dynamic'

import type { AreaMapProps } from './AreaMap'

export const AreaMap = dynamic<AreaMapProps>(
  () => import('./AreaMap').then((mod) => mod.AreaMap),
  {
    ssr: false,
  },
)
