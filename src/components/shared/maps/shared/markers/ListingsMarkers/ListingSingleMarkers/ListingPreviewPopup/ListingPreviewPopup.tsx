import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { ViewTimeEntityType } from '__generated__/globalTypes'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'

import { ListingItemPreview as ListingItemPreviewBase } from '@/components/shared/ListingItem'
import { useAnalytics, useCallbackWhenChangeVisible } from '@/modules/analytics'
import { QUERY_GET_DETAILED_LISTING } from '@/modules/listing'
import { MUTATION_ADD_VIEW_TIMES_WITH_COUNT } from '@/modules/map/graphql/mutation-add-view-times-with-count'
import { ROUTES } from '@/modules/router'

type Props = {
  listingId: string
  onMouseLeave: () => void
  onMouseEnter: () => void
  onClick: () => void
  isViewed?: boolean
  isFavorite: boolean
  onFavoriteButtonClick?: (newValue: boolean) => void
  onChangeLoadState: (value: boolean) => void
  style: { position: 'absolute' | 'fixed'; left: number | ''; top: number | '' }
}

export const ListingPreviewPopup = forwardRef<HTMLDivElement, Props>(
  (
    {
      isFavorite,
      listingId,
      onFavoriteButtonClick,
      onMouseEnter,
      onChangeLoadState,
      isViewed,
      onMouseLeave,
      style,
      onClick: onClickPopup,
    },
    ref,
  ) => {
    const router = useRouter()

    const displayStartTime = useRef(0)

    const [addViewTimes] = useMutation(MUTATION_ADD_VIEW_TIMES_WITH_COUNT)

    const analytics = useAnalytics()
    const MPFeedListingPreviewShown = useCallback(() => {
      analytics.MPMapListingPreviewViewed(listingId)
    }, [listingId, analytics])
    const changeVisibleRef = useCallbackWhenChangeVisible(
      MPFeedListingPreviewShown,
    )

    const { loading, data, error } = useQuery(QUERY_GET_DETAILED_LISTING, {
      variables: { id: listingId },
      ssr: false,
    })

    useEffect(() => {
      onChangeLoadState(loading)
    }, [onChangeLoadState, loading])

    useEffect(() => {
      const internalId = data?.getDetailedListing?.internalID
      if (!internalId) return

      displayStartTime.current = new Date().getTime()

      return () => {
        const currentTime = new Date().getTime()
        addViewTimes({
          variables: {
            input: [
              {
                entityID: internalId,
                entityType: ViewTimeEntityType.LISTING_PREVIEW_VIEW,
                duration: currentTime - displayStartTime.current,
              },
            ],
          },
        })
      }
    }, [data?.getDetailedListing?.internalID, addViewTimes])

    if (loading || error) {
      return null
    } else if (data?.getDetailedListing?.listingInfo) {
      const { listingInfo, media, slug } = data.getDetailedListing

      const onClick = () => {
        onClickPopup?.()
        const { address } = data?.getDetailedListing?.listingInfo ?? {}

        router.push(
          ROUTES.detailedListing.calcUrl({
            listingId,
            areaSlug: slug,
            address,
          }),
          undefined,
          {
            shallow: true,
          },
        )
      }

      return (
        <FloatingPortal>
          <Container
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            ref={ref}
            style={style}
          >
            <ListingItemPreview
              isFavorite={isFavorite}
              onFavoriteButtonClick={onFavoriteButtonClick}
              listingId={listingId}
              onClick={onClick}
              isViewed={isViewed}
              ref={changeVisibleRef}
              listingInfo={listingInfo}
              media={media}
            />
          </Container>
        </FloatingPortal>
      )
    }

    return null
  },
)

const Container = styled.div``
const ListingItemPreview = styled(ListingItemPreviewBase)`
  width: 28rem;

  box-shadow: 0px 4px 12px rgba(158, 169, 178, 0.08),
    0px 2px 4px rgba(0, 0, 0, 0.08), 0px 3.78px 33.4221px rgba(0, 0, 0, 0.08);
  cursor: pointer;
`
