import { useEffect, useState } from 'react'

import { MarkerPointerType, Markers } from '@/modules/map'
import { MapFacade } from '@/modules/map/base'

export const useMarkers = (mapFacade: MapFacade, type: MarkerPointerType) => {
  const [markersOnScreen, setMarkersOnScreen] = useState<Markers>({})

  useEffect(() => {
    return mapFacade.onMarkersDrawn((markers) => {
      const filteredMarkers = Object.entries(markers).reduce(
        (acc, [key, marker]) => {
          if (marker.properties.type === type) {
            return { ...acc, [key]: marker }
          }
          return acc
        },
        {},
      )
      setMarkersOnScreen(filteredMarkers)
    })
  }, [mapFacade, type])

  return markersOnScreen
}
