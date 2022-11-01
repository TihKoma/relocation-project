import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { ClustersMarkers } from '@/components/shared/maps/shared/markers/ClustersMarkers'
import { ListingsMarkers } from '@/components/shared/maps/shared/markers/ListingsMarkers'
import { mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { FavoritesMapFacade } from '@/modules/map/features/favorites-map'
import {
  ListingsBboxContext,
  usePropertyFilter,
  usePropertyOrder,
} from '@/modules/marketplace'
import { NEW_YORK_CENTER } from '@/modules/mock'

import {
  ListingFilterInput,
  ListingOrder,
} from '../../../../../__generated__/globalTypes'

export type FavoritesMapProps = {
  className?: string
  onMountMap?: (mapAdapter: MapAdapter, mapEvents: MapEvents) => void
}

export const FavoritesMap: FC<FavoritesMapProps> = ({
  className,
  onMountMap: onMountMapProp,
}) => {
  const apolloClient = useApolloClient()
  const router = useRouter()
  const regionSlug = router.query.regionSlug as string
  const [mapFacade, setMapFacade] = useState<FavoritesMapFacade | null>(null)
  const mapFacadeRef = useRef<FavoritesMapFacade | null>(null)
  const { filter } = usePropertyFilter()
  const { order } = usePropertyOrder()
  const { setBbox } = useContext(ListingsBboxContext)
  const filtersRef = useRef<{
    filter: ListingFilterInput
    order: ListingOrder
  } | null>(null)

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createFavoritesMap(
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      setMapFacade(mapFacade) // for update react element
      mapFacadeRef.current = mapFacade // for event handlers

      mapFacade.drawRegions()
      mapFacade.drawListingsMarkersByBBox({
        transactionType: filter.transactionType,
      })

      return mapFacade
    },
    [apolloClient, filter.transactionType],
  )

  const updateRegionsAndMarkers = () => {
    if (filtersRef.current) {
      mapFacadeRef.current?.drawRegions()
      mapFacadeRef.current?.drawListingsMarkersByBBox({
        transactionType: filtersRef.current.filter.transactionType,
      })
    }
  }

  useEffect(() => {
    filtersRef.current = {
      filter,
      order,
    }
    updateRegionsAndMarkers()
  }, [filter, order])

  const { onMountMap } = useCreateMap(createMap)

  const onInitMap = async () => {
    if (!mapFacadeRef.current) {
      return
    }

    mapServiceLocator.setCurrentBackgroundMap('favorites')
    await mapFacadeRef.current.drawRegions()

    if (regionSlug) {
      mapFacadeRef.current.highlightRegionBySlug(regionSlug, {
        fit: true,
        reset: true,
      })
    }

    const position = mapFacadeRef.current.getPosition()
    setBbox(position.bbox)
  }

  const onDestroyMap = () => {
    mapServiceLocator.resetFavoritesMap()
  }

  return (
    <BaseMap
      sharedKey={'general'}
      className={className}
      onMountMap={(...args) => {
        onMountMapProp?.(...args)
        return onMountMap(...args)
      }}
      onDestroyMap={onDestroyMap}
      initialCenter={NEW_YORK_CENTER}
      onInitMap={() => {
        onInitMap()
        updateRegionsAndMarkers()
        mapFacadeRef.current?.flyToInitialState()
      }}
      onZoomMap={(e) => {
        updateRegionsAndMarkers()
        const bounds = e.target.getBounds()
        setBbox({
          top: bounds.getNorth(),
          right: bounds.getEast(),
          bottom: bounds.getSouth(),
          left: bounds.getWest(),
        })
      }}
      onDragMap={(e) => {
        updateRegionsAndMarkers()
        const bounds = e.target.getBounds()
        setBbox({
          top: bounds.getNorth(),
          right: bounds.getEast(),
          bottom: bounds.getSouth(),
          left: bounds.getWest(),
        })
      }}
    >
      {mapFacade && <ClustersMarkers mapFacade={mapFacade} />}
      {mapFacade && <ListingsMarkers mapFacade={mapFacade} />}
    </BaseMap>
  )
}
