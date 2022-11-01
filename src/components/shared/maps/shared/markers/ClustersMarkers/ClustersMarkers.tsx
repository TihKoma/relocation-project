import { FC } from 'react'
import { createPortal } from 'react-dom'

import { useMarkers } from '@/components/shared/maps/hooks/use-markers'
import { Coordinates } from '@/modules/map'
import { MapFacade } from '@/modules/map/base'

import { ClusterMarker } from './ClusterMarker'

type Props = {
  mapFacade: MapFacade
}

export const ClustersMarkers: FC<Props> = ({ mapFacade }) => {
  const markers = useMarkers(mapFacade, 'cluster')

  return (
    <>
      {Object.entries(markers).map(([id, markerInfo]) => {
        const onClickCluster = (
          clusterId: number,
          coordinates: Coordinates,
        ) => {
          mapFacade?.easeToCluster(clusterId, coordinates)
        }

        return createPortal(
          <ClusterMarker
            key={id}
            markerInfo={markerInfo}
            id={id}
            onClick={onClickCluster}
          />,
          markerInfo.marker.getElement(),
        )
      })}
    </>
  )
}
