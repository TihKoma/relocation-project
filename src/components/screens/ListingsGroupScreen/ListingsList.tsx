import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ListingItem } from '@/components/shared/ListingItem'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import { useAnalytics } from '@/modules/analytics'
import { useInfinityScrollProvider } from '@/modules/infinity-scroll'
import { mapServiceLocator, QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { QUERY_GET_FILTERED_LISTINGS } from '@/modules/marketplace'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import {
  ListingBathrooms,
  ListingBedrooms,
  ListingTransactionType,
} from '../../../../__generated__/globalTypes'
import { NothingFound } from '../Search/SearchResult/Tabs/NothingFound'

type Props = {
  addressSlug: string
  className?: string
}
export const ListingsList: FC<Props> = ({ className, addressSlug }) => {
  const { data, isLoading } = useInfinityScrollList(addressSlug)
  const analytics = useAnalytics()

  const items = data?.getFilteredListings

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
    content = (
      <EmptyState>
        <NothingFound />
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

  height: 100%;
  padding: 1.6rem;

  ${mobileMedia} {
    padding: 1.6rem 6.2rem;
  }
`
const QUERY_LIMIT = 10
const useInfinityScrollList = (addressSlug: string) => {
  const router = useRouter()
  const { data: { getRegionBySlug: region } = {}, loading: regionLoading } =
    useQuery(QUERY_GET_REGION_BY_SLUG, {
      variables: { slug: router.query.regionSlug as string },
      ssr: false,
    })

  const {
    data,
    loading: listingsLoading,
    fetchMore,
  } = useQuery(QUERY_GET_FILTERED_LISTINGS, {
    skip: regionLoading,
    ssr: false,
    variables: {
      filter: {
        transactionType: ListingTransactionType.FOR_SALE,
        bedrooms: ListingBedrooms.ROOMS_ANY,
        bathrooms: ListingBathrooms.ROOMS_ANY,
        addressSlug,
      },
      regionId: region?.id as string,
      limit: QUERY_LIMIT,
      position: 0,
    },
  })

  const isLoading = listingsLoading || regionLoading

  useInfinityScrollProvider(() => {
    if (isLoading) {
      return
    }

    fetchMore({
      variables: {
        filter: {
          transactionType: ListingTransactionType.FOR_SALE,
          bedrooms: ListingBedrooms.ROOMS_ANY,
          bathrooms: ListingBathrooms.ROOMS_ANY,
          addressSlug,
        },
        regionId: region?.id as string,
        position: data?.getFilteredListings.length,
        limit: QUERY_LIMIT,
      },
    })
  })

  return { data, isLoading }
}
