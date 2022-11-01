import { useEffect, useRef, useState, VFC } from 'react'
import styled from '@emotion/styled'
import {
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'

import { useBottomSheetActions } from '@/components/ui-kit/BottomSheet'
import { calcPaddingForLayout, mapServiceLocator } from '@/modules/map'
import { IS_HIGHLIGHT_MARKER_PROPERTY, MapFacade } from '@/modules/map/base'
import { Coordinates, MarkerInfo } from '@/modules/map/types'
import { NeighborhoodInfo } from '@/modules/quiz'
import { getColorTheme } from '@/styles/themes'

import { usePopupTimers } from '../../../hooks/use-popup-timers'
import { MatchResultNeighborhoodPopup } from './MatchResultNeighborhoodPopup'

type Props = {
  neighborhoodId: string
  markerInfo: MarkerInfo
  quizId: string
  id: string
  score: number
  isViewed: boolean
  withoutSearchParameters?: boolean
  onViewRegion: (regionId: string) => void
  onHideRegion: (regionId: string) => void
  index: number
  onClick: (coordinates: Coordinates) => void
  isBottomSheetDown?: boolean | null
  mapFacade: MapFacade
}

export const ScoreMarker: VFC<Props> = ({
  markerInfo,
  neighborhoodId,
  isViewed,
  withoutSearchParameters,
  onViewRegion,
  mapFacade,
  onHideRegion,
  quizId,
  id,
  score,
  index,
  onClick,
  isBottomSheetDown,
}) => {
  const [neighborhoodInfo, setNeighborhoodInfo] =
    useState<NeighborhoodInfo | null>(null)
  const withStepsRef = useRef<boolean>(false)

  useEffect(() => {
    if (neighborhoodInfo) {
      return mapFacade.onPositionChange(() => {
        setNeighborhoodInfo(null)
      })
    }
  }, [mapFacade, neighborhoodInfo])

  const {
    onMouseEnterPopup,
    onMouseLeavePopup,
    onMouseEnterMarker,
    onMouseLeaveMarker,
  } = usePopupTimers(
    () => {
      const mapFacade = mapServiceLocator.getWhereResultsMap()
      mapFacade?.highlightRegionBySlug(neighborhoodId)
    },
    () => {
      onViewRegion(neighborhoodId)
      const mapFacade = mapServiceLocator.getWhereResultsMap()
      if (mapFacade) {
        const quizInfo = mapFacade.getQuizInfoById(quizId)

        if (quizInfo) {
          withStepsRef.current = quizInfo.withSteps
        }

        const neighborhood = mapFacade.getNeighborhoodInfoById(neighborhoodId)

        if (neighborhood) {
          setNeighborhoodInfo(neighborhood)
        }
      }
    },
    () => {
      onHideRegion(neighborhoodId)
      const mapFacade = mapServiceLocator.getWhereResultsMap()
      setNeighborhoodInfo(null)
      mapFacade?.resetRegionHighlightBySlug(neighborhoodId)
    },
  )

  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [
      offset(10),
      autoPlacement({
        padding: calcPaddingForLayout(),
        boundary: document.querySelector('.mapboxgl-map') as Element,
      }),
      shift(),
    ],
  })

  const bottomSheetActions = useBottomSheetActions()

  const onScoreClick = () => {
    const { lng, lat } = markerInfo.marker.getLngLat()
    bottomSheetActions.snapToBottom()
    onClick([lng, lat])
  }

  useEffect(() => {
    if (isBottomSheetDown === false) {
      onHideRegion(id)
      const mapFacade = mapServiceLocator.getWhereResultsMap()
      setNeighborhoodInfo(null)
      mapFacade?.resetRegionHighlightBySlug(id)
    }
  }, [id, isBottomSheetDown, onHideRegion])

  const isHighlight = markerInfo.properties[IS_HIGHLIGHT_MARKER_PROPERTY]

  useEffect(() => {
    if (isHighlight) {
      markerInfo.marker.getElement().style.zIndex = '2'
    } else {
      markerInfo.marker.getElement().style.removeProperty('z-index')
    }
  }, [isHighlight, markerInfo.marker])

  return (
    <Marker
      ref={reference}
      isViewed={isViewed}
      isHighlight={isHighlight}
      onMouseEnter={onMouseEnterMarker}
      onMouseLeave={onMouseLeaveMarker}
      withoutSearchParameters={withoutSearchParameters}
      score={score}
      onClick={onScoreClick}
    >
      {score}%
      {neighborhoodInfo && (
        <MatchResultNeighborhoodPopup
          style={{ position: strategy, top: y ?? '', left: x ?? '' }}
          ref={floating}
          index={index}
          onMouseLeave={onMouseLeavePopup}
          onMouseEnter={onMouseEnterPopup}
          withSteps={withStepsRef.current}
          neighborhood={neighborhoodInfo}
          quizId={quizId}
        />
      )}
    </Marker>
  )
}

const Marker = styled.div<{
  isHighlight: boolean
  isViewed: boolean
  withoutSearchParameters: boolean | undefined
  score: number
}>`
  height: 3.2rem;
  width: 4.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  color: ${getColorTheme('earth')};
  border: 0.2rem solid ${getColorTheme('earth')};
  border-radius: 1.6rem;
  background-color: ${(props) => {
    if (props.isHighlight) {
      return getColorTheme('neptune600')
    }
    if (props.isViewed || props.withoutSearchParameters) {
      return getColorTheme('sun500')
    }
    if (props.score < 20) {
      return getColorTheme('mars')
    }
    if (props.score < 30) {
      return getColorTheme('titan')
    }
    if (props.score < 40) {
      return getColorTheme('saturn')
    }
    if (props.score < 50) {
      return getColorTheme('tethys')
    }
    if (props.score < 60) {
      return getColorTheme('rhea')
    }
    if (props.score < 75) {
      return getColorTheme('metis')
    }
    if (props.score <= 100) {
      return getColorTheme('jupiter')
    }
  }};

  ${(props) =>
    props.isHighlight === undefined
      ? `
    &:hover {
      background: ${getColorTheme('neptune600')(props)}
    }
  `
      : ''}

  box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);

  transition: 0.3s color, 0.3s background;

  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  font-family: EuclidCircularA, Segoe UI, Roboto, sans-serif; //TODO: change .mapboxgl-map font
`
