import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useLazyQuery, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'

import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import { useInfinityScrollProvider } from '@/modules/infinity-scroll'
import { listhubInitScript, sendListhubEvent } from '@/modules/listhub'
import {
  BBoxObject,
  mapServiceLocator,
  QUERY_GET_REGION_BY_SLUG,
} from '@/modules/map'
import { usePropertyFilter, usePropertyOrder } from '@/modules/marketplace'
import { QUERY_GET_FILTERED_LISTINGS_V2 } from '@/modules/marketplace/graphql/queries'

import { ListingItem } from '../../shared/ListingItem'
import { NothingFound } from './NothingFound'
import { SimilarResults } from './SimilarResults'

const QUERY_LIMIT = 10

type Props = {
  quizId?: string
}

export const ListingList: FC<Props> = ({ quizId }) => {
  const { data, isLoading } = useInfinityScrollList()

  const listings = data?.getFilteredListingsV2?.listings
  const similar = data?.getFilteredListingsV2?.similar

  const highlightItem = (id: string) => {
    mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
      mapFacade.highlightMarkerById(id)
    })
  }
  const resetHighlightItem = (id: string) => {
    mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
      mapFacade.resetHighlightMarkerById(id)
    })
  }

  return (
    <LoadingState loading={isLoading} loadingComponent={<Loader />}>
      {listings?.length ? (
        <List>
          {listings.map((item) => (
            <ListingItem
              key={item?.id}
              onHover={highlightItem}
              onLeave={resetHighlightItem}
              quizId={quizId}
              {...item}
              onFavoriteButtonClick={(newValue) => {
                mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
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
      ) : (
        <>
          <NothingFound />
          {similar?.listings?.length && (
            <SimilarResults similar={similar} quizId={quizId} />
          )}
        </>
      )}
      <Script
        id={'listhub'}
        dangerouslySetInnerHTML={{ __html: listhubInitScript }}
      />
    </LoadingState>
  )
}

const List = styled.ul`
  display: grid;
  grid-row-gap: 1.6rem;

  margin: 0;
  padding: 0 1.6rem;

  list-style: none;
`

const useInfinityScrollList = () => {
  const { filter } = usePropertyFilter()
  const { order } = usePropertyOrder()
  const router = useRouter()
  const [bbox, setBbox] = useState<BBoxObject | null>(null)

  const { data: { getRegionBySlug: region } = {}, loading: regionLoading } =
    useQuery(QUERY_GET_REGION_BY_SLUG, {
      variables: { slug: router.query.regionSlug as string },
      ssr: true,
    })

  const [getFilteredListings, { data, loading: listingsLoading, fetchMore }] =
    useLazyQuery(QUERY_GET_FILTERED_LISTINGS_V2, {
      onCompleted: ({ getFilteredListingsV2 }) => {
        const listingIds = getFilteredListingsV2?.listings?.map(({ id }) => id)
        if (listingIds) sendListhubEvent('SEARCH_DISPLAY', listingIds)
      },
    })

  useEffect(() => {
    let unsubscribe: (() => void) | null = null
    mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
      unsubscribe = mapFacade.onPositionChange(
        debounce((bbox) => {
          setBbox(bbox)
        }, 1000),
      )
    })

    return () => {
      unsubscribe?.()
    }
  }, [])

  useEffect(() => {
    getFilteredListings({
      variables: {
        bbox,
        regionId: region?.id as string,
        filter,
        order,
        limit: QUERY_LIMIT,
        offset: 0,
      },
    })
  }, [filter, bbox, order, region?.id, getFilteredListings])

  const isLoading = listingsLoading || regionLoading

  useInfinityScrollProvider(() => {
    if (isLoading) {
      return
    }

    fetchMore({
      variables: {
        bbox,
        regionId: region?.id as string,
        filter,
        order,
        offset: data?.getFilteredListingsV2?.listings?.length,
        limit: QUERY_LIMIT,
      },
      //@ts-ignore
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          getFilteredListingsV2: {
            ...data.getFilteredListingsV2,
            listings: [
              ...(data.getFilteredListingsV2?.listings ?? []),
              ...(fetchMoreResult.getFilteredListingsV2?.listings ?? []),
            ],
          },
        }
      },
    })
  })

  return { data, isLoading }
}
