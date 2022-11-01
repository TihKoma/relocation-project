import { FC, useCallback, useRef } from 'react'
import { useApolloClient } from '@apollo/client'

import { BaseMap, useCreateMap } from '@/components/shared/maps/BaseMap'
import { Coordinates, mapServiceLocator } from '@/modules/map'
import { MapAdapter, MapEvents } from '@/modules/map/base'
import { WhereQuizPreviewMapFacade } from '@/modules/map/features/where-quiz-preview-map'

type Props = {
  className?: string
  initialCenter?: Coordinates
}

export const WhereQuizPreviewMap: FC<Props> = ({ className }) => {
  const apolloClient = useApolloClient()
  const mapFacadeRef = useRef<WhereQuizPreviewMapFacade | null>(null)

  const createMap = useCallback(
    (mapAdapter: MapAdapter, mapEvents: MapEvents) => {
      const mapFacade = mapServiceLocator.createWhereQuizPreviewMap(
        mapAdapter,
        mapEvents,
        apolloClient,
      )

      mapFacadeRef.current = mapFacade // for event handlers

      return mapFacade
    },
    [apolloClient],
  )

  const { onMountMap } = useCreateMap(createMap)

  const onDestroyMap = () => {
    mapServiceLocator.resetWhereQuizPreviewMap()
  }

  return (
    <BaseMap
      sharedKey={'general'}
      initialZoom={4.3161232566929675}
      className={className}
      onInitMap={() => {
        mapFacadeRef.current?.drawRegions()
        mapServiceLocator.setCurrentBackgroundMap('quizPreview')
      }}
      onDragMap={() => mapFacadeRef.current?.drawRegions()}
      onZoomMap={() => mapFacadeRef.current?.drawRegions()}
      onMountMap={onMountMap}
      initialCenter={[-99.46736444258295, 33.64983972935606]}
      onDestroyMap={onDestroyMap}
    />
  )
}
