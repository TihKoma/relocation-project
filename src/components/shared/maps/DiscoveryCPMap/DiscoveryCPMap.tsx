import { FC, useCallback, useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { ClustersMarkers } from '@/components/shared/maps/shared/markers/ClustersMarkers'
import { PostsMarkers } from '@/components/shared/maps/shared/markers/PostsMarkers'
import { mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { DiscoveryMapFacade } from '@/modules/map/features/discovery-map'
import { MapEvent } from '@/modules/map/types'
import { ListingsBboxContext } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'

export type DiscoveryCPMapProps = {
  className?: string
  hrefOnClickByRegion?: (newRegionSlug: string) => string
  regionSlug?: string
  groupId?: string
}

export const DiscoveryCPMap: FC<DiscoveryCPMapProps> = ({
  className,
  hrefOnClickByRegion,
  regionSlug,
  groupId,
}) => {
  const apolloClient = useApolloClient()
  const [mapFacade, setMapFacade] = useState<DiscoveryMapFacade | null>(null)
  const mapFacadeRef = useRef<DiscoveryMapFacade | null>(null)
  const router = useRouter()
  const { setBbox } = useContext(ListingsBboxContext)

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createDiscoveryCPMap(
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      setMapFacade(mapFacade) // for update react element
      mapFacadeRef.current = mapFacade // for event handlers

      return mapFacade
    },
    [apolloClient],
  )

  const updateRegionsAndMarkers = () => {
    mapFacadeRef.current?.drawRegions()
    if (groupId) {
      mapFacadeRef.current?.drawPostMarkersByGroupId(groupId)
    } else {
      mapFacadeRef.current?.drawPostMarkersByBBox()
    }
    const position = mapFacadeRef.current?.getPosition()
    if (position) {
      setBbox(position.bbox)
    }
  }

  const { onMountMap } = useCreateMap(createMap)

  const onInitMap = async () => {
    if (!mapFacadeRef.current) {
      return
    }

    mapServiceLocator.setCurrentBackgroundMap('discoveryCP')
    await mapFacadeRef.current.drawRegions()

    if (regionSlug) {
      mapFacadeRef.current.highlightRegionBySlug(regionSlug, {
        fit: true,
        reset: true,
      })
    }

    if (groupId) {
      mapFacadeRef.current?.drawPostMarkersByGroupId(groupId)
    } else {
      mapFacadeRef.current?.drawPostMarkersByBBox()
    }
    const position = mapFacadeRef.current?.getPosition()
    if (position) {
      setBbox(position.bbox)
    }
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
        hrefOnClickByRegion?.(slug) ??
          ROUTES.area.calcUrl({ regionSlug: slug }),
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
    mapServiceLocator.resetDiscoveryCPMap()
  }

  return (
    <BaseMap
      sharedKey={'general'}
      className={className}
      onMountMap={onMountMap}
      onInitMap={onInitMap}
      onZoomMap={updateRegionsAndMarkers}
      onDragMap={updateRegionsAndMarkers}
      onClickMap={onClickMap}
      onDestroyMap={onDestroyMap}
    >
      {mapFacade && <ClustersMarkers mapFacade={mapFacade} />}
      {mapFacade && <PostsMarkers mapFacade={mapFacade} />}
    </BaseMap>
  )
}
