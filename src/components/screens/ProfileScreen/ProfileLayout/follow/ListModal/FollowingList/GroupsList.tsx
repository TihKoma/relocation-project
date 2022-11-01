import { FC, useMemo, useRef } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import type { followersListItem } from '@/components/shared/FollowersList'
import { FollowersList } from '@/components/shared/FollowersList'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import CoverMock from '@/images/region-cover-mock.png'
import { QUERY_SEARCH_GROUPS } from '@/modules/group'
import {
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import { ROUTES } from '@/modules/router'
import { SubscriptableType } from '@/modules/subscription'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { FollowingPlaceholder } from './FollowingPlaceholder'

const PAGINATION_START_POSITION = 0
const PAGINATION_LIMIT = 30

type Props = {
  userId?: string
  regionId?: string
  userName: string
}
export const GroupsList: FC<Props> = ({ userId, userName, regionId }) => {
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  const { data, loading, fetchMore } = useQuery(QUERY_SEARCH_GROUPS, {
    ssr: false,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {
        regionId,
        memberUserId: userId,
        position: PAGINATION_START_POSITION,
        limit: PAGINATION_LIMIT,
      },
    },
  })

  const transformedGroups = useMemo(
    () =>
      data?.searchGroups.groups?.map((group) => {
        if (!group) {
          return null
        }
        const groupFollowers = `${group.members?.total ?? 0} ${
          group.members?.total ?? 0 > 1 ? 'followers' : 'follower'
        }`
        return {
          id: group.id,
          name: group.name,
          subtitle: (
            <>
              <span>{group.region?.subtitle}</span>
              <br />
              <span>{groupFollowers}</span>
            </>
          ),
          slug: ROUTES.group.calcUrl({ groupSlug: group.slug }),
          subscribed: group.members?.iAmIn,
          avatarSrc: group.avatar || CoverMock.src,
        }
      }) ?? [],
    [data],
  ).filter((data) => data) as followersListItem[]

  const prevPosition = useRef(PAGINATION_START_POSITION)

  useInfinityScrollProvider(() => {
    prevPosition.current = transformedGroups.filter(
      (item) => item.subscribed,
    ).length
    fetchMore({
      variables: {
        position: prevPosition.current,
      },
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          searchGroups: {
            ...data?.searchGroups,
            groups: [
              ...(data?.searchGroups.groups ?? []),
              ...(fetchMoreResult?.searchGroups.groups ?? []),
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
        {transformedGroups?.length ? (
          <FollowersList
            items={transformedGroups}
            subscriptableType={SubscriptableType.GROUP}
          />
        ) : (
          userId && (
            <FollowingPlaceholder
              tab={'Groups'}
              userName={userName}
              userId={userId}
            />
          )
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
