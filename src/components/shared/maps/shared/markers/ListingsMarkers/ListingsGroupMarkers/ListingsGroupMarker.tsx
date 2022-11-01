import { VFC } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { useBottomSheetActions } from '@/components/ui-kit/BottomSheet'
import { IS_HIGHLIGHT_MARKER_PROPERTY, MapFacade } from '@/modules/map/base'
import { Coordinates, MarkerInfo } from '@/modules/map/types'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  markerInfo: MarkerInfo
  onClickListing?: (coordinates: Coordinates) => void
  mapFacade: MapFacade
  addressSlug: string
}

export const ListingsGroupMarker: VFC<Props> = ({
  markerInfo,
  addressSlug,
}) => {
  const bottomSheetActions = useBottomSheetActions()
  const router = useRouter()

  const isViewed = markerInfo.properties.isViewed

  const unit = markerInfo.properties.qty || 1

  return (
    <Container>
      <ListingPointer
        isViewed={isViewed}
        onClick={() => {
          router.push(
            ROUTES.listingsGroup.calcUrl({
              areaSlug: markerInfo.properties.regionSlug,
              addressSlug,
            }),
            undefined,
            { shallow: true },
          )
          bottomSheetActions.snapToBottom()
        }}
        isHighlighted={markerInfo.properties[IS_HIGHLIGHT_MARKER_PROPERTY]}
      >
        <Unit>{unit}</Unit>Units
      </ListingPointer>
    </Container>
  )
}

const Container = styled.div``
const Unit = styled.span`
  margin-right: 0.4rem;
  font-weight: 500;
`
const ListingPointer = styled.div<{
  isViewed?: boolean
  isHighlighted?: boolean
}>`
  padding: 0.8rem 1.2rem;

  display: flex;
  align-items: center;

  transform: translate(50%, -50%);

  background-color: ${(props) => {
    if (props.isHighlighted) {
      return getColorTheme('neptune500')(props)
    }

    return getColorTheme('earth')(props)
  }};
  color: ${(props) => {
    if (props.isHighlighted) {
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
  border-bottom-left-radius: 0;

  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 400;

  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: ${getColorTheme('neptune500')};
      color: ${getColorTheme('earth')};
    }
  }
`
