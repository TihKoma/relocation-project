import { FC } from 'react'
import { createPortal } from 'react-dom'

import { useMarkers } from '@/components/shared/maps/hooks/use-markers'
import { MapFacade } from '@/modules/map/base'

import { ListingsGroupMarker } from './ListingsGroupMarker'

type Props = {
  mapFacade: MapFacade
}

export const ListingsGroupMarkers: FC<Props> = ({ mapFacade }) => {
  const markers = useMarkers(mapFacade, 'listingsGroup')

  return (
    <>
      {Object.entries(markers).map(([id, markerInfo]) => {
        return createPortal(
          <ListingsGroupMarker
            key={id}
            markerInfo={markerInfo}
            addressSlug={id}
            mapFacade={mapFacade}
          />,
          markerInfo.marker.getElement(),
        )
      })}
    </>
  )
}
