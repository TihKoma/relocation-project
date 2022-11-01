import { useMemo, useRef, VFC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { FollowersList } from '@/components/shared/FollowersList'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import {
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import {
  QUERY_GET_USER_PROFILE,
  QUERY_LIST_FOLLOWED_USERS,
} from '@/modules/profile'
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
export const UsersList: VFC<Props> = ({ userId, userName }) => {
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  const { data, loading, fetchMore } = useQuery(QUERY_LIST_FOLLOWED_USERS, {
    ssr: false,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      userId,
      position: PAGINATION_START_POSITION,
      limit: PAGINATION_LIMIT,
    },
  })

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const transformedUsers = useMemo(
    () =>
      data?.listFollowedUsers.users?.map((user) => {
        return {
          id: user.userId,
          name: `${user.firstName} ${user.lastName}`,
          slug: ROUTES.publicProfile.calcUrl({ userName: user.userName }),
          subscribed: user.subscribed,
          avatarSrc: user.photoUrl,
          isMyProfile: myProfile?.id === user.id,
        }
      }) ?? [],
    [data, myProfile],
  )

  const prevPosition = useRef(PAGINATION_START_POSITION)

  useInfinityScrollProvider(() => {
    prevPosition.current = transformedUsers.filter(
      (item) => item.subscribed,
    ).length
    fetchMore({
      variables: {
        position: prevPosition.current,
      },
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          listFollowedUsers: {
            ...data?.listFollowedUsers,
            users: [
              ...(data?.listFollowedUsers.users ?? []),
              ...(fetchMoreResult?.listFollowedUsers.users ?? []),
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
        {transformedUsers?.length ? (
          <FollowersList
            items={transformedUsers}
            subscriptableType={SubscriptableType.USER}
          />
        ) : (
          <FollowingPlaceholder
            tab={'People'}
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
