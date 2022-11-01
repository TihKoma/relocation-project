import { useCallback, useContext, useRef, useState, VFC } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { ClustersMarkers } from '@/components/shared/maps/shared/markers/ClustersMarkers'
import { ListingsMarkers } from '@/components/shared/maps/shared/markers/ListingsMarkers'
import { PostsMarkers } from '@/components/shared/maps/shared/markers/PostsMarkers'
import { mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { AreaMapFacade } from '@/modules/map/features/area-map'
import { MapEvent } from '@/modules/map/types'
import { ListingsBboxContext } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'

export type AreaMapProps = {
  className?: string
  regionSlug?: string
  hrefOnClickByRegion?: (newRegionSlug: string) => string
}

export const AreaMap: VFC<AreaMapProps> = ({
  className,
  regionSlug,
  hrefOnClickByRegion,
}) => {
  const apolloClient = useApolloClient()
  const [mapFacade, setMapFacade] = useState<AreaMapFacade | null>(null)
  const mapFacadeRef = useRef<AreaMapFacade | null>(null)
  const router = useRouter()
  const { setBbox } = useContext(ListingsBboxContext)

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createAreaMap(
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
    mapFacadeRef.current?.drawRegions(true)
    mapFacadeRef.current?.drawAllMarkersByBBox()
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

    mapServiceLocator.setCurrentBackgroundMap('area')
    await mapFacadeRef.current.drawRegions(true)

    if (regionSlug) {
      mapFacadeRef.current.highlightRegionBySlug(regionSlug, {
        fit: true,
        reset: true,
      })
    }

    mapFacadeRef.current.drawAllMarkersByBBox()
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
    mapServiceLocator.resetAreaMap()
  }
  const hoveredFeatureIdRef = useRef<string | null>(null)

  const onMouseMove = async (event: MapEvent) => {
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

    const features = mapFacadeRef.current?.queryRenderedFeaturesByPoint(
      event.point,
    )
    if (!features?.length) {
      return
    }
    const feature = features.find((item) =>
      item.properties?.hasOwnProperty('regionId'),
    )

    if (
      hoveredFeatureIdRef.current &&
      hoveredFeatureIdRef.current !== feature?.id
    ) {
      mapFacadeRef.current?.resetNeighborhoodHoverById(
        hoveredFeatureIdRef.current,
      )
      hoveredFeatureIdRef.current = null
    }

    if (feature?.id) {
      hoveredFeatureIdRef.current = feature.id as string
      mapFacadeRef.current?.hoverNeighborhoodById(hoveredFeatureIdRef.current)
    }
  }

  return (
    <BaseMap
      className={className}
      sharedKey={'general'}
      onMountMap={onMountMap}
      onInitMap={onInitMap}
      onZoomMap={updateRegionsAndMarkers}
      onDragMap={updateRegionsAndMarkers}
      onClickMap={onClickMap}
      onDestroyMap={onDestroyMap}
      onMouseMove={onMouseMove}
    >
      {mapFacade && <ClustersMarkers mapFacade={mapFacade} />}
      {mapFacade && <PostsMarkers mapFacade={mapFacade} />}
      {mapFacade && <ListingsMarkers mapFacade={mapFacade} />}
    </BaseMap>
  )
}
