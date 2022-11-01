import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ListingItem } from '@/components/shared/ListingItem'
import { LoadingState } from '@/components/shared/LoadingState'
import { Plug } from '@/components/shared/Plug'
import { Button } from '@/components/ui-kit/Button'
import { Loader } from '@/components/ui-kit/Loader'
import { NothingFoundImg } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { useInfinityScrollProvider } from '@/modules/infinity-scroll'
import {
  QUERY_GET_FAVORITE_LISTINGS,
  QUERY_GET_FAVORITE_TOTAL_LISTINGS,
} from '@/modules/listing'
import { mapServiceLocator } from '@/modules/map'
import { usePropertyFilter, usePropertyOrder } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { ListingTransactionType } from '../../../../__generated__/globalTypes'

type Props = {
  className?: string
}
export const ListingsList: FC<Props> = ({ className }) => {
  const { data, isLoading } = useInfinityScrollList()
  const { resetFilters } = usePropertyFilter()
  const router = useRouter()
  const { data: totalFavoritesData } = useQuery(
    QUERY_GET_FAVORITE_TOTAL_LISTINGS,
  )
  const analytics = useAnalytics()
  const isMobile = useIsMobileDevice()

  const items = data?.getFavoriteListings

  let content = null

  if (items?.length) {
    content = (
      <List className={className}>
        {items.map((item) => (
          <ListingItem
            onClick={() => analytics.MPFavoritesListingOpened()}
            key={item?.id}
            {...item}
            onFavoriteButtonClick={(newValue) => {
              mapServiceLocator.getFavoritesMapAsync().then((mapFacade) => {
                if (newValue) {
                  mapFacade.addToFavoriteMarker(item.id)
                } else {
                  mapFacade.removeFromFavoriteMarker(item.id)
                }
              })
            }}
          />
        ))}
      </List>
    )
  } else {
    const hasFavorites =
      Number(totalFavoritesData?.getFavoriteTotalListings) > 0

    const plugTitle = hasFavorites ? 'No saved objects' : 'No saved objects yet'
    const plugDescription = hasFavorites
      ? 'Try to change location, \n filter or return to start'
      : 'Save objects you like to quickly compare later'
    const plugButtonText = hasFavorites ? 'Return to start' : 'Search for homes'
    const plugButtonClick = hasFavorites
      ? () => {
          mapServiceLocator.getFavoritesMapAsync().then((mapFacade) => {
            mapFacade.flyToInitialState()
            resetFilters()
          })
        }
      : () => {
          router.push(ROUTES.homes.calcUrl(), undefined, { shallow: true })
        }

    content = (
      <EmptyState>
        <Plug
          title={plugTitle}
          description={plugDescription}
          icon={<NothingFoundImg />}
        >
          <Button
            onClick={plugButtonClick}
            viewType={'primary'}
            size={isMobile ? 'medium' : 'large'}
          >
            {plugButtonText}
          </Button>
        </Plug>
      </EmptyState>
    )
  }

  return (
    <LoadingState loading={isLoading} loadingComponent={<Loader />}>
      {content}
    </LoadingState>
  )
}

const List = styled.ul`
  display: grid;
  grid-row-gap: 1.6rem;
  margin: 0;
  padding: 0 1.6rem;

  list-style: none;

  ${mobileMedia} {
    border-radius: 1.6rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 1.6rem;
    background-color: ${getColorTheme('sun50')};
  }
`
const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;

  ${mobileMedia} {
    padding: 1.6rem 6.2rem;
  }
`
const QUERY_LIMIT = 10
const useInfinityScrollList = () => {
  const { filter } = usePropertyFilter()
  const { order } = usePropertyOrder()

  const {
    data,
    loading: listingsLoading,
    fetchMore,
  } = useQuery(QUERY_GET_FAVORITE_LISTINGS, {
    variables: {
      transactionType:
        filter.transactionType || ListingTransactionType.FOR_SALE,
      order,
      offset: 0,
      limit: QUERY_LIMIT,
    },
    skip: !filter,
  })

  const isLoading = listingsLoading

  useInfinityScrollProvider(() => {
    if (isLoading) {
      return
    }

    fetchMore({
      variables: {
        filter,
        order,
        offset: data?.getFavoriteListings.length,
        limit: QUERY_LIMIT,
      },
    })
  })

  return { data, isLoading }
}
