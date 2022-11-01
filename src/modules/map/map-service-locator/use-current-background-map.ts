import { useEffect, useState } from 'react'

import { mapServiceLocator } from '@/modules/map'
import { MapFacade } from '@/modules/map/base'

export const useCurrentBackgroundMap = () => {
  const [mapFacade, setMapFacade] = useState<MapFacade | null>(null)

  useEffect(() => {
    const backgroundMap = mapServiceLocator.getCurrentBackgroundMap()

    if (backgroundMap) {
      mapServiceLocator.getMapFacadeAsync(backgroundMap).then((mapFacade) => {
        setMapFacade(mapFacade)
      })
    }

    const unsubscribeChangeBackgroundMapChange =
      mapServiceLocator.onChangeBackgroundMap((map) => {
        if (map) {
          mapServiceLocator.getMapFacadeAsync(map).then((mapFacade) => {
            setMapFacade(mapFacade)
          })
        }
      })

    return unsubscribeChangeBackgroundMapChange
  }, [])

  return mapFacade
}
