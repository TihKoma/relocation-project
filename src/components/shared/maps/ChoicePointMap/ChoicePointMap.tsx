import { useCallback, useEffect, useRef, useState, VFC } from 'react'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { Coordinates, mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { ChoicePointMapFacade } from '@/modules/map/features/choice-point-map'

import { LocationMarker } from '../shared'

type Props = {
  className?: string
  onMoveEnd: (coordinate: [number, number]) => void
  initialCenter: Coordinates
  coordinates: Coordinates | null
}

export const ChoicePointMap: VFC<Props> = ({
  className,
  onMoveEnd,
  initialCenter,
  coordinates,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const mapFacadeRef = useRef<ChoicePointMapFacade | null>(null)
  const moveEndUnsubscribe = useRef<(() => void) | null>(null)
  const [_, setMapFacade] = useState<ChoicePointMapFacade | null>(null)
  const apolloClient = useApolloClient()

  const onMoveEndRef = useRef(onMoveEnd)
  onMoveEndRef.current = onMoveEnd

  useEffect(() => {
    if (coordinates) {
      mapFacadeRef.current?.flyTo(coordinates)
    }
  }, [coordinates])

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createChoicePointMap(
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      setMapFacade(mapFacade) // for update react element
      mapFacadeRef.current = mapFacade // for event handlers

      moveEndUnsubscribe.current = mapEvents.on('moveend', () => {
        const { lng, lat } = mapFacade.getCenter()
        onMoveEndRef.current([lng, lat])
      })

      return mapFacade
    },
    [apolloClient],
  )

  const { onMountMap } = useCreateMap(createMap)

  const onInitMap = async () => {
    if (!mapFacadeRef.current) {
      return
    }

    if (coordinates) {
      mapFacadeRef.current.flyTo(coordinates)
    }
  }

  const onDestroyMap = () => {
    moveEndUnsubscribe.current?.()
    mapServiceLocator.resetChoicePointMap()
  }
  return (
    <BaseMap
      className={className}
      onMountMap={onMountMap}
      initialZoom={14}
      initialCenter={initialCenter}
      onInitMap={onInitMap}
      onDestroyMap={onDestroyMap}
      onDragMapStart={() => {
        setIsDragging(true)
      }}
      onDragMapEnd={() => {
        setIsDragging(false)
      }}
      withPaddingLeft={false}
    >
      <LocationMarker isDragging={isDragging} />
    </BaseMap>
  )
}
