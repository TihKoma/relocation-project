import { useEffect, useState, VFC } from 'react'
import styled from '@emotion/styled'
import {
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'

import { HighlightPointer } from '@/components/shared/maps/shared/markers/HighlightPointer'
import { Avatar } from '@/components/ui-kit/Avatar'
import { useBottomSheetActions } from '@/components/ui-kit/BottomSheet'
import { calcPaddingForLayout } from '@/modules/map'
import {
  IS_FOCUS_MARKER_PROPERTY,
  IS_HIGHLIGHT_MARKER_PROPERTY,
  MapFacade,
} from '@/modules/map/base'
import { getColorTheme } from '@/styles/themes'

import { Coordinates, MarkerInfo } from '../../../../../../modules/map/types'
import { usePopupTimers } from '../../../hooks/use-popup-timers'
import { MapPostPopup } from './MapPostPopup'

type Props = {
  id: string
  markerInfo: MarkerInfo
  onClick: (coordinates: Coordinates) => void
  mapFacade: MapFacade
}

export const PostMarker: VFC<Props> = ({
  markerInfo,
  id,
  onClick,
  mapFacade,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const bottomSheetActions = useBottomSheetActions()
  const onPostClick = () => {
    bottomSheetActions.snapToBottom()
  }

  const onClickPopup = () => {
    const { lng, lat } = markerInfo.marker.getLngLat()

    onClick([lng, lat])
  }

  useEffect(() => {
    if (isPopupVisible) {
      return mapFacade.onPositionChange(() => {
        setIsPopupVisible(false)
      })
    }
  }, [mapFacade, isPopupVisible])

  const {
    onMouseEnterPopup,
    onMouseLeavePopup,
    onMouseEnterMarker,
    onMouseLeaveMarker,
  } = usePopupTimers(
    () => {
      setIsPopupVisible(true)
    },
    () => {},
    () => {
      setIsPopupVisible(false)
    },
  )

  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'top',
    middleware: [
      offset(10),
      autoPlacement({
        padding: calcPaddingForLayout(),
        boundary: document.querySelector('.mapboxgl-map') as Element,
      }),
      shift(),
    ],
  })

  let pointer = (
    <GeneralMarkerPointer
      onClick={onPostClick}
      isHighlight={markerInfo.properties[IS_HIGHLIGHT_MARKER_PROPERTY]}
      ref={reference}
    >
      <InvisibleArea
        data-test-id={'invisible-area'}
        onMouseEnter={onMouseEnterMarker}
        onMouseLeave={onMouseLeaveMarker}
      />
    </GeneralMarkerPointer>
  )

  if (
    markerInfo.properties.photoUrl &&
    markerInfo.properties[IS_HIGHLIGHT_MARKER_PROPERTY]
  ) {
    pointer = (
      <HighlightPointer
        ref={reference}
        markerInfo={markerInfo}
        onMouseEnter={onMouseEnterMarker}
        onMouseLeave={onMouseLeaveMarker}
      >
        <HighlightAvatar src={markerInfo.properties.photoUrl} />
      </HighlightPointer>
    )
  } else if (markerInfo.properties.photoUrl) {
    pointer = (
      <AvatarMarkerPointer
        ref={reference}
        onClick={onPostClick}
        src={markerInfo.properties.photoUrl}
        size={'medium'}
        onMouseEnter={onMouseEnterMarker}
        onMouseLeave={onMouseLeaveMarker}
        isRead={markerInfo.properties.isRead}
        withShadow
        withStroke
        withBorderAnimate={
          isPopupVisible || markerInfo.properties[IS_FOCUS_MARKER_PROPERTY]
        }
        data-test-id={'post-marker:avatar'}
      />
    )
  }

  return (
    <>
      {pointer}
      {isPopupVisible && (
        <MapPostPopup
          onMouseLeave={onMouseLeavePopup}
          onMouseEnter={onMouseEnterPopup}
          postId={id}
          onClick={onClickPopup}
          style={{ position: strategy, top: y ?? '', left: x ?? '' }}
          ref={floating}
        />
      )}
    </>
  )
}

const HighlightAvatar = styled.img`
  width: 3.2rem;
  height: 3.2rem;

  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 2px solid ${getColorTheme('earth')};
`
const AvatarMarkerPointer = styled(Avatar)<{
  isRead: boolean
}>`
  ${(props) => (props.isRead ? 'filter: grayscale(1);' : '')}

  transition: border 0.2s, transform 0.5s;
`
const GeneralMarkerPointer = styled.div<{
  isHighlight: boolean
}>`
  width: 1.2rem;
  height: 1.2rem;

  position: relative;

  background-color: ${(props) =>
    props.isHighlight
      ? getColorTheme('uranus')(props)
      : getColorTheme('pluto')(props)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 2.5rem;

  transition: transform 0.5s;
`

const InvisibleArea = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  transform: translate(-0.7rem, -0.6rem);

  cursor: pointer;
  position: absolute;
  border-radius: 2.5rem;
`
