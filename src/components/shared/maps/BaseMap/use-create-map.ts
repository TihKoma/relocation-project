import { useCallback, useRef } from 'react'

import { MapAdapter, MapEvents, MapFacade } from '@/modules/map/base'

export const useCreateMap = <T extends MapFacade>(
  createMap: (mapAdapter: MapAdapter, mapEvents: MapEvents) => T,
) => {
  const mapFacadeRef = useRef<T | null>(null)

  const onMountMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      mapFacadeRef.current = createMap(mapAdapter, mapEvents)

      return mapFacadeRef.current
    },
    [createMap],
  )

  return { onMountMap }
}
