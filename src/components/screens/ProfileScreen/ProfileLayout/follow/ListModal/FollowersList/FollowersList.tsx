import { useMemo, useRef, VFC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { FollowersList as ItemsList } from '@/components/shared/FollowersList'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import {
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import { QUERY_GET_USER_PROFILE, QUERY_LIST_FOLLOWERS } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { SubscriptableType } from '@/modules/subscription'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { FollowersPlaceholder } from './FollowersPlaceholder'

const PAGINATION_START_POSITION = 0
const PAGINATION_LIMIT = 30

type Props = {
  userId: string
  userName: string
}
export const FollowersList: VFC<Props> = ({ userId, userName }) => {
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  const { data, loading, fetchMore } = useQuery(QUERY_LIST_FOLLOWERS, {
    ssr: false,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      subscriptableId: userId,
      position: PAGINATION_START_POSITION,
      limit: PAGINATION_LIMIT,
    },
  })

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const transformedFollowers = useMemo(
    () =>
      data?.listFollowers.followers?.map((follower) => {
        return {
          id: follower.userId,
          name: `${follower.firstName} ${follower.lastName}`,
          slug: ROUTES.publicProfile.calcUrl({ userName: follower.userName }),
          subscribed: follower.subscribed,
          avatarSrc: follower.photoUrl,
          isMyProfile: myProfile?.id === follower.id,
        }
      }) ?? [],
    [data, myProfile],
  )

  const prevPosition = useRef(PAGINATION_START_POSITION)

  useInfinityScrollProvider(() => {
    prevPosition.current = transformedFollowers.length
    fetchMore({
      variables: {
        position: prevPosition.current,
      },
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          listFollowers: {
            ...data?.listFollowers,
            followers: [
              ...(data?.listFollowers.followers ?? []),
              ...(fetchMoreResult?.listFollowers.followers ?? []),
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
        {transformedFollowers?.length ? (
          <ItemsList
            items={transformedFollowers}
            subscriptableType={SubscriptableType.USER}
          />
        ) : (
          <FollowersPlaceholder userName={userName} userId={userId} />
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
