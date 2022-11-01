import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { Coordinates, mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { ChoiceNeighborhoodMapFacade } from '@/modules/map/features/choice-neighborhood-map'
import { MapEvent } from '@/modules/map/types'

type Props = {
  className?: string
  initialCenter?: Coordinates
  defaultRegionSlug?: string
  onClick: (neighborhoodId: string) => void
}

export type MapRef = {
  highlightRegionBySlug: (slug: string) => void
  reset: () => void
}

export const ChoiceNeighborhoodMap = forwardRef<MapRef, Props>(
  ({ className, onClick, initialCenter, defaultRegionSlug }, ref) => {
    const apolloClient = useApolloClient()
    const [_, setMapFacade] = useState<ChoiceNeighborhoodMapFacade | null>(null)
    const mapFacadeRef = useRef<ChoiceNeighborhoodMapFacade | null>(null)

    useImperativeHandle(
      ref,
      () => ({
        highlightRegionBySlug: (slug: string) => {
          mapFacadeRef.current?.highlightRegionBySlug(slug)
        },
        reset: () => {
          mapFacadeRef.current?.resetNeighborhoods()
        },
      }),
      [],
    )

    const createMap = useCallback(
      (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
        const mapFacade = mapServiceLocator.createChoiceNeighborhoodMap(
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

    const updateRegions = () => {
      mapFacadeRef.current?.drawRegions()
    }

    const { onMountMap } = useCreateMap(createMap)

    const onInitMap = async () => {
      if (!mapFacadeRef.current) {
        return
      }

      await mapFacadeRef.current.drawRegions()

      if (defaultRegionSlug) {
        mapFacadeRef.current.highlightRegionBySlug(defaultRegionSlug, {
          fit: true,
          reset: true,
        })
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

      if (
        region &&
        mapFacadeRef.current.activeNeighborhoodSlug !== region.slug
      ) {
        const { slug } = region
        onClick?.(region.id)

        await mapFacadeRef.current.highlightRegionBySlug(slug, {
          fit: true,
          reset: true,
        })
      }
    }

    const onDestroyMap = () => {
      mapServiceLocator.resetChoiceNeighborhoodMap()
    }

    return (
      <BaseMap
        className={className}
        onMountMap={onMountMap}
        initialCenter={initialCenter}
        onInitMap={onInitMap}
        onZoomMap={updateRegions}
        onDragMap={updateRegions}
        onClickMap={onClickMap}
        onDestroyMap={onDestroyMap}
      />
    )
  },
)
