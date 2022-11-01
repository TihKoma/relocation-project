import { FC } from 'react'
import { createPortal } from 'react-dom'

import { useMarkers } from '@/components/shared/maps/hooks/use-markers'
import { Coordinates } from '@/modules/map'
import { MapFacade } from '@/modules/map/base'
import { MarkerFeature } from '@/modules/map/types'

import { usePinView } from '../../../WhereResultsMap/pin-view'
import { ScoreMarker } from './ScoreMarker'

type Props = {
  quizId: string
  withoutSearchParameters?: boolean
  mapFacade: MapFacade
  isBottomSheetDown?: boolean | null
  markers: MarkerFeature[] | null
}

export const ScoreMarkers: FC<Props> = ({
  quizId,
  withoutSearchParameters,
  mapFacade,
  isBottomSheetDown,
  markers,
}) => {
  const markersToRender = useMarkers(mapFacade, 'score')
  const [pinView, set] = usePinView()
  return (
    <>
      {Object.entries(markersToRender).map(([id, markerInfo], index) => {
        const onScoreClick = (coordinates: Coordinates) => {
          mapFacade?.easeToPost(coordinates)
        }
        // TODO: remove find method and update markers inside callback in onMarkersDrawn
        const neighborhoodInfo =
          markers && markers.find((marker) => marker.id === id)
        const score =
          (neighborhoodInfo && neighborhoodInfo.properties.score) ||
          markerInfo.properties.score
        return createPortal(
          <ScoreMarker
            mapFacade={mapFacade}
            index={index}
            quizId={quizId}
            withoutSearchParameters={withoutSearchParameters}
            isBottomSheetDown={isBottomSheetDown}
            isViewed={pinView[id]}
            id={id}
            score={score}
            key={id}
            onViewRegion={(regionId) => {
              set(regionId, true)
              markerInfo.marker.getElement().style.zIndex = '2'
            }}
            onHideRegion={() =>
              markerInfo.marker.getElement().style.removeProperty('z-index')
            }
            neighborhoodId={id}
            markerInfo={markerInfo}
            onClick={onScoreClick}
          />,
          markerInfo.marker.getElement(),
        )
      })}
    </>
  )
}
