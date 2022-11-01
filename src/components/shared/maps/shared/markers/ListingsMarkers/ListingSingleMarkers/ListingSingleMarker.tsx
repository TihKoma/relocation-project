import { useCallback, useEffect, useState, VFC } from 'react'
import styled from '@emotion/styled'
import {
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'

import { LoadingState } from '@/components/shared/LoadingState'
import { useBottomSheetActions } from '@/components/ui-kit/BottomSheet'
import { Loader } from '@/components/ui-kit/Loader'
import { FavoriteMarkerRedIcon, FavoriteMarkerWhiteIcon } from '@/images'
import { calcPaddingForLayout } from '@/modules/map'
import { IS_HIGHLIGHT_MARKER_PROPERTY, MapFacade } from '@/modules/map/base'
import { Coordinates, MarkerInfo } from '@/modules/map/types'
import { getAbbreviatedTotalCount } from '@/modules/utils'
import { getColorTheme } from '@/styles/themes'

import { usePopupTimers } from '../../../../hooks/use-popup-timers'
import { ListingPreviewPopup } from './ListingPreviewPopup'

type Props = {
  id: string
  markerInfo: MarkerInfo
  onClickListing?: (coordinates: Coordinates) => void
  mapFacade: MapFacade
}

export const ListingSingleMarker: VFC<Props> = ({
  markerInfo,
  id,
  onClickListing,
  mapFacade,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)

  const onClickPopup = () => {
    const { lng, lat } = markerInfo.marker.getLngLat()

    onClickListing?.([lng, lat])
  }

  const bottomSheetActions = useBottomSheetActions()
  useEffect(() => {
    if (isPopupVisible) {
      return mapFacade.onPositionChange(() => {
        setIsPopupVisible(false)
      })
    }
  }, [mapFacade, isPopupVisible])

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
      setIsLoadingData(false)
    },
  )

  const isViewed = markerInfo.properties.isViewed
  const isFavorite = markerInfo.properties.isFavorite

  const pointer = (
    <ListingPointer
      ref={reference}
      isViewed={isViewed}
      isLoadingData={isLoadingData}
      onMouseEnter={onMouseEnterMarker}
      onMouseLeave={onMouseLeaveMarker}
      onClick={() => {
        setIsPopupVisible(true)
        bottomSheetActions.snapToBottom()
      }}
      isHover={
        isPopupVisible || markerInfo.properties[IS_HIGHLIGHT_MARKER_PROPERTY]
      }
    >
      <LoadingState
        loading={isLoadingData}
        loadingComponent={<Loader color={'earth'} size={'xxSmall'} />}
      >
        {isFavorite && (
          <Icon>
            {isPopupVisible ? (
              <FavoriteMarkerWhiteIcon />
            ) : (
              <FavoriteMarkerRedIcon />
            )}
          </Icon>
        )}
        {getAbbreviatedTotalCount(markerInfo.properties.price)}
      </LoadingState>
    </ListingPointer>
  )

  const onChangeLoadState = useCallback(
    (value: boolean) => {
      setIsLoadingData(value)
    },
    [setIsLoadingData],
  )

  return (
    <>
      {pointer}
      {isPopupVisible && (
        <ListingPreviewPopup
          isFavorite={isFavorite}
          onFavoriteButtonClick={(newValue) => {
            if (newValue) {
              mapFacade.addToFavoriteMarker(id)
            } else {
              mapFacade.removeFromFavoriteMarker(id)
            }
          }}
          onChangeLoadState={onChangeLoadState}
          onMouseLeave={onMouseLeavePopup}
          onMouseEnter={onMouseEnterPopup}
          listingId={id}
          isViewed={isViewed}
          onClick={onClickPopup}
          style={{ position: strategy, top: y ?? '', left: x ?? '' }}
          ref={floating}
        />
      )}
    </>
  )
}

const ListingPointer = styled.div<{
  isViewed?: boolean
  isLoadingData: boolean
  isHover: boolean
}>`
  padding: ${(props) =>
    props.isLoadingData ? '0.6rem 2rem' : '0.6rem 0.8rem'};

  display: flex;
  align-items: center;

  background-color: ${(props) => {
    if (props.isHover) {
      return getColorTheme('neptune500')(props)
    }

    if (props.isLoadingData) {
      return getColorTheme('neptune')(props)
    }

    return getColorTheme('earth')(props)
  }};
  color: ${(props) => {
    if (props.isHover) {
      return getColorTheme('earth')(props)
    }

    if (props.isViewed) {
      return getColorTheme('textDisabled')(props)
    }

    return getColorTheme('sun')(props)
  }};
  box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
    0px 4px 16px 1px rgba(18, 21, 31, 0.08);
  border-radius: 1.6rem;

  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
`
const Icon = styled.div`
  margin-right: 0.5rem;
  margin-left: 0.3rem;
  height: 1.7rem;
`
