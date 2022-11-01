import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { ScoreMarkers } from '@/components/shared/maps/shared/markers/ScoreMarkers'
import { mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { WhereResultsMapFacade } from '@/modules/map/features/where-results-map'
import { MapEvent, MarkerFeature } from '@/modules/map/types'
import { USA_CENTER } from '@/modules/mock'

import { BBoxInput } from '../../../../../__generated__/globalTypes'

type Props = {
  className?: string
  defaultRegionSlug?: string
  withoutSearchParameters?: boolean
  onClickMap?: () => void
  isBottomSheetDown?: boolean | null
  markers: MarkerFeature[] | null
  searchAreas?: string[]
}

const QUIZZES_POSITIONS_STORAGE_KEY = 'quizzes-positions'

export const WhereResultsMap: FC<Props> = ({
  className,
  onClickMap,
  withoutSearchParameters,
  isBottomSheetDown,
  markers,
  searchAreas,
}) => {
  const apolloClient = useApolloClient()
  const [mapFacade, setMapFacade] = useState<WhereResultsMapFacade | null>(null)
  const mapFacadeRef = useRef<WhereResultsMapFacade | null>(null)
  const router = useRouter()
  const hoveredFeatureIdRef = useRef<string | null>(null)
  const quizId = typeof router.query.id === 'string' ? router.query.id : ''
  const [initialBbox, setInitialBbox] = useState<BBoxInput | null>(null)

  // TODO: https://nicity.atlassian.net/browse/LA-1410
  useEffect(() => {
    if (mapFacade && !initialBbox) {
      return mapFacade.onMarkersDrawn((markers) => {
        const bbox = Object.values(markers).reduce((acc, cur) => {
          return {
            left: acc.left
              ? Math.min(acc.left, cur.marker.getLngLat().lng)
              : cur.marker.getLngLat().lng,
            bottom: acc.bottom
              ? Math.min(acc.bottom, cur.marker.getLngLat().lat)
              : cur.marker.getLngLat().lat,
            top: acc.top
              ? Math.max(acc.top, cur.marker.getLngLat().lat)
              : cur.marker.getLngLat().lat,
            right: acc.right
              ? Math.max(acc.right, cur.marker.getLngLat().lng)
              : cur.marker.getLngLat().lng,
          }
        }, {} as BBoxInput)

        if (bbox.top && bbox.right && bbox.bottom && bbox.left) {
          setInitialBbox(bbox)
        }
      })
    }
  }, [initialBbox, mapFacade])

  useEffect(() => {
    if (mapFacade && initialBbox) {
      mapFacade.fitBbox(initialBbox)
    }
  }, [initialBbox, mapFacade])

  useEffect(() => {
    setInitialBbox(null)
  }, [searchAreas])

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createWhereResultsMap(
        quizId,
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      setMapFacade(mapFacade) // for update react element
      mapFacadeRef.current = mapFacade // for event handlers

      return mapFacade
    },
    [quizId, apolloClient],
  )

  const updateRegionsAndMarkers = () => {
    mapFacadeRef.current?.drawNeighborhoodsAndMarkersByBBox()
  }

  const { onMountMap } = useCreateMap(createMap)

  const onMouseMove = (e: MapEvent) => {
    const features = mapFacadeRef.current?.queryRenderedFeaturesByPoint(e.point)
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
      mapFacadeRef.current?.resetNeighborhoodHighlightById(
        hoveredFeatureIdRef.current,
      )
      hoveredFeatureIdRef.current = null
    }

    if (feature?.id) {
      hoveredFeatureIdRef.current = feature.id as string
      mapFacadeRef.current?.highlightNeighborhoodById(
        hoveredFeatureIdRef.current,
        { reset: true },
      )
    }
  }

  const onInitMap = async () => {
    if (!mapFacadeRef.current) {
      return
    }
    mapServiceLocator.setCurrentBackgroundMap('whereResults')
    mapFacadeRef.current.drawNeighborhoodsAndMarkersByBBox()
  }

  const onDestroyMap = () => {
    mapServiceLocator.resetWhereResultsMap()
  }

  useEffect(() => {
    if (localStorage.getItem(QUIZZES_POSITIONS_STORAGE_KEY)) {
      const savedPositions = localStorage.getItem(QUIZZES_POSITIONS_STORAGE_KEY)
      const bbox = savedPositions && JSON.parse(savedPositions)[quizId]
      if (bbox && !initialBbox) {
        mapFacade?.fitBbox(bbox, {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId])

  useEffect(() => {
    const saveMapPosition = () => {
      const bbox = mapFacadeRef.current?.getPosition().bbox
      const savedPositions = localStorage.getItem(QUIZZES_POSITIONS_STORAGE_KEY)
      const positionsObject = savedPositions ? JSON.parse(savedPositions) : {}
      if (bbox) {
        localStorage.setItem(
          QUIZZES_POSITIONS_STORAGE_KEY,
          JSON.stringify({ ...positionsObject, [quizId]: bbox }),
        )
      }
    }

    router.events.on('routeChangeStart', saveMapPosition)
    window.addEventListener('beforeunload', saveMapPosition)

    return () => {
      router.events.off('routeChangeStart', saveMapPosition)
      window.removeEventListener('beforeunload', saveMapPosition)
    }
  }, [quizId, router])

  return (
    <BaseMap
      className={className}
      onMountMap={onMountMap}
      initialCenter={USA_CENTER}
      initialZoom={2.8}
      onInitMap={onInitMap}
      onZoomMap={updateRegionsAndMarkers}
      onClickMap={onClickMap}
      onDragMap={() => {
        if (mapFacadeRef.current) {
          updateRegionsAndMarkers()
        }
      }}
      onDestroyMap={onDestroyMap}
      onMouseMove={onMouseMove}
    >
      {mapFacade && (
        <ScoreMarkers
          isBottomSheetDown={isBottomSheetDown}
          mapFacade={mapFacade}
          markers={markers}
          quizId={quizId}
          withoutSearchParameters={withoutSearchParameters}
        />
      )}
    </BaseMap>
  )
}
