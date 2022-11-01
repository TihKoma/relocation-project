import { FC, useEffect, useState } from 'react'

import { HighlightPointer } from '@/components/shared/maps/shared/markers/HighlightPointer'
import { PropertyHomeIcon } from '@/images'
import { Markers } from '@/modules/map'
import { CanDrawPropertyMarker } from '@/modules/map/blocks/property-marker'

type Props = {
  mapFacade: CanDrawPropertyMarker
}
export const PropertyMarkers: FC<Props> = ({ mapFacade }) => {
  const [markersOnScreen, setMarkersOnScreen] = useState<Markers>({})

  useEffect(() => {
    return mapFacade.onPropertyMarkerDrawn((markers) => {
      setMarkersOnScreen(markers)
    })
  }, [mapFacade])

  return (
    <>
      {Object.entries(markersOnScreen).map(([id, markerInfo]) => {
        return (
          <HighlightPointer key={id} markerInfo={markerInfo}>
            <PropertyHomeIcon />
          </HighlightPointer>
        )
      })}
    </>
  )
}
