import { FC } from 'react'
import { createPortal } from 'react-dom'

import { useMarkers } from '@/components/shared/maps/hooks/use-markers'
import { MapFacade } from '@/modules/map/base'

import { ListingSingleMarker } from './ListingSingleMarker'

type Props = {
  mapFacade: MapFacade
}

export const ListingSingleMarkers: FC<Props> = ({ mapFacade }) => {
  const markers = useMarkers(mapFacade, 'realEstate')

  return (
    <>
      {Object.entries(markers).map(([id, markerInfo]) => {
        return createPortal(
          <ListingSingleMarker
            key={id}
            markerInfo={markerInfo}
            id={id}
            mapFacade={mapFacade}
          />,
          markerInfo.marker.getElement(),
        )
      })}
    </>
  )
}
