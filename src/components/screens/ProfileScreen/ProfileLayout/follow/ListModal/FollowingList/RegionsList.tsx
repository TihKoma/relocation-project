import { FC, useMemo, useRef } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { FollowersList } from '@/components/shared/FollowersList'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import CoverMock from '@/images/region-cover-mock.png'
import {
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import { QUERY_LIST_FOLLOWED_REGIONS } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { SubscriptableType } from '@/modules/subscription'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { FollowingPlaceholder } from './FollowingPlaceholder'

const PAGINATION_START_POSITION = 0
const PAGINATION_LIMIT = 30

type Props = {
  userId: string
  userName: string
}
export const RegionsList: FC<Props> = ({ userId, userName }) => {
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  const { data, loading, fetchMore } = useQuery(QUERY_LIST_FOLLOWED_REGIONS, {
    ssr: false,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      userId,
      position: PAGINATION_START_POSITION,
      limit: PAGINATION_LIMIT,
    },
  })

  const transformedRegions = useMemo(
    () =>
      data?.listFollowedRegions.regions?.map((region) => {
        return {
          id: region.id,
          name: region.name,
          subtitle: region.subtitle,
          slug: ROUTES.area.calcUrl({ regionSlug: region.slug }),
          subscribed: region.subscribed,
          avatarSrc: region.PhotoUrl || CoverMock.src,
        }
      }) ?? [],
    [data],
  )

  const prevPosition = useRef(PAGINATION_START_POSITION)

  useInfinityScrollProvider(() => {
    prevPosition.current = transformedRegions.filter(
      (item) => item.subscribed,
    ).length
    fetchMore({
      variables: {
        position: prevPosition.current,
      },
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          listFollowedRegions: {
            ...data?.listFollowedRegions,
            regions: [
              ...(data?.listFollowedRegions.regions ?? []),
              ...(fetchMoreResult?.listFollowedRegions.regions ?? []),
            ],
          },
        }
      },
    })
  })

  return (
    <Container ref={listRef}>
      <LoadingState
        loadingComponent={<Loader withGradient />}
        loading={loading}
      >
        {transformedRegions?.length ? (
          <FollowersList
            items={transformedRegions}
            subscriptableType={SubscriptableType.REGION}
          />
        ) : (
          <FollowingPlaceholder
            tab={'Neighborhoods'}
            userName={userName}
            userId={userId}
          />
        )}
      </LoadingState>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
