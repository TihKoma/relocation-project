import { FC, useCallback, useRef, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { ClustersMarkers } from '@/components/shared/maps/shared/markers/ClustersMarkers'
import { ListingsMarkers } from '@/components/shared/maps/shared/markers/ListingsMarkers'
import { PostsMarkers } from '@/components/shared/maps/shared/markers/PostsMarkers'
import { PropertyMarkers } from '@/components/shared/maps/shared/markers/PropertyMarkers'
import { mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { DetailedListingMapFacade } from '@/modules/map/features/detailed-listing-map'

export type DetailedListingMapProps = {
  className?: string
}

export const DetailedListingMap: FC<DetailedListingMapProps> = ({
  className,
}) => {
  const apolloClient = useApolloClient()
  const [mapFacade, setMapFacade] = useState<DetailedListingMapFacade | null>(
    null,
  )
  const mapFacadeRef = useRef<DetailedListingMapFacade | null>(null)

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createDetailedListingMap(
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      setMapFacade(mapFacade) // for update react element
      mapFacadeRef.current = mapFacade // for event handlers

      mapFacade.drawRegions()
      mapFacade.drawMarkers()

      return mapFacade
    },
    [apolloClient],
  )

  const updateRegionsAndMarkers = () => {
    mapFacadeRef.current?.drawRegions()
    mapFacadeRef.current?.drawMarkers()
  }

  const { onMountMap } = useCreateMap(createMap)

  const onDestroyMap = () => {
    mapServiceLocator.resetDetailedListingMap()
  }

  return (
    <BaseMap
      sharedKey={'general'}
      className={className}
      onDestroyMap={onDestroyMap}
      onMountMap={onMountMap}
      onInitMap={() => {
        mapServiceLocator.setCurrentBackgroundMap('detailedListing')
        updateRegionsAndMarkers()
      }}
      onZoomMap={() => {
        updateRegionsAndMarkers()
      }}
      onDragMap={() => {
        updateRegionsAndMarkers()
      }}
    >
      {mapFacade && <ClustersMarkers mapFacade={mapFacade} />}
      {mapFacade && <PostsMarkers mapFacade={mapFacade} />}
      {mapFacade && <PropertyMarkers mapFacade={mapFacade} />}
      {mapFacade && <ListingsMarkers mapFacade={mapFacade} />}
    </BaseMap>
  )
}
