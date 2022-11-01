import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { ClustersMarkers } from '@/components/shared/maps/shared/markers/ClustersMarkers'
import { ListingsMarkers } from '@/components/shared/maps/shared/markers/ListingsMarkers'
import { mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { DiscoveryMPMapFacade } from '@/modules/map/features/discovery-mp-map'
import { MapEvent } from '@/modules/map/types'
import {
  ListingsBboxContext,
  usePropertyFilter,
  usePropertyOrder,
} from '@/modules/marketplace'
import { NEW_YORK_CENTER } from '@/modules/mock'
import { ROUTES } from '@/modules/router'

import {
  ListingFilterInput,
  ListingOrder,
} from '../../../../../__generated__/globalTypes'

export type DiscoveryMPMapProps = {
  areaSlug?: string
  className?: string
}

export const DiscoveryMPMap: FC<DiscoveryMPMapProps> = ({
  className,
  areaSlug,
}) => {
  const apolloClient = useApolloClient()
  const router = useRouter()
  const [mapFacade, setMapFacade] = useState<DiscoveryMPMapFacade | null>(null)
  const mapFacadeRef = useRef<DiscoveryMPMapFacade | null>(null)
  const { filter } = usePropertyFilter()
  const { order } = usePropertyOrder()
  const { setBbox } = useContext(ListingsBboxContext)
  const filtersRef = useRef<{
    filter: ListingFilterInput
    order: ListingOrder
  } | null>(null)

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createDiscoveryMPMap(
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      setMapFacade(mapFacade) // for update react element
      mapFacadeRef.current = mapFacade // for event handlers

      mapFacade.drawRegions()
      mapFacade.drawListingsMarkersByBBox({ filter, order })

      return mapFacade
    },
    [apolloClient, filter, order],
  )

  const updateRegionsAndMarkers = () => {
    if (filtersRef.current) {
      mapFacadeRef.current?.drawRegions()
      mapFacadeRef.current?.drawListingsMarkersByBBox({
        filter: filtersRef.current.filter,
        order: filtersRef.current.order,
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

    await mapFacadeRef.current.drawRegions()

    if (areaSlug) {
      mapFacadeRef.current.highlightRegionBySlug(areaSlug, {
        fit: true,
        reset: true,
      })
    }

    const position = mapFacadeRef.current.getPosition()
    setBbox(position.bbox)
  }

  const onClickMap = async (event: MapEvent) => {
    if (!mapFacadeRef.current) {
      return
    }

    const target = event?.originalEvent?.target as HTMLDivElement

    const isMarker =
      !!target?.closest('.mapboxgl-marker') ||
      target?.dataset.testId === 'invisible-area' ||
      target?.dataset.testId === 'post-marker:avatar'

    if (isMarker) {
      return
    }

    // set actual region when click on map
    const point = {
      long: event.lngLat.lng,
      lat: event.lngLat.lat,
    }

    const region = await mapFacadeRef.current.getNeighborhoodIdByPoint(point)

    if (region && mapFacadeRef.current.activeNeighborhoodSlug !== region.slug) {
      const { slug } = region
      await router.push(
        ROUTES.areaRealEstate.calcUrl({
          regionSlug: slug,
          filters: window.location.search,
        }),
        undefined,
        {
          shallow: true,
        },
      )

      await mapFacadeRef.current.highlightRegionBySlug(slug, {
        fit: true,
        reset: true,
      })
    }
  }

  const onDestroyMap = () => {
    mapServiceLocator.resetDiscoveryMPMap()
  }

  return (
    <BaseMap
      sharedKey={'general'}
      className={className}
      onMountMap={onMountMap}
      onDestroyMap={onDestroyMap}
      initialCenter={NEW_YORK_CENTER}
      onClickMap={onClickMap}
      onInitMap={() => {
        onInitMap()
        mapServiceLocator.setCurrentBackgroundMap('discoveryMP')
        updateRegionsAndMarkers()
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
