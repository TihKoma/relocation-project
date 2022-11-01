import { useEffect, useMemo, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { LoadingState } from '@/components/shared/LoadingState'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { Loader } from '@/components/ui-kit/Loader'
import { PlaceholderBell } from '@/images'
import {
  useInfinityScrollProvider,
  useOnScrollProvider,
  withInfinityScroll,
} from '@/modules/infinity-scroll'
import {
  MUTATION_MARK_NOTIFICATIONS_AS_OLD,
  QUERY_SEARCH_NOTIFICATIONS,
} from '@/modules/notification'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { NotificationItem } from './NotificationItem'

const PAGINATION_START_OFFSET = 0
const PAGINATION_LIMIT = 30

export const NotificationsList = withInfinityScroll(() => {
  const infinityScroll = useOnScrollProvider()

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const { data, loading, fetchMore } = useQuery(QUERY_SEARCH_NOTIFICATIONS, {
    ssr: false,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    skip: !myProfile?.userId,
    variables: {
      input: {
        userId: myProfile?.userId as string,
        offset: PAGINATION_START_OFFSET,
        limit: PAGINATION_LIMIT,
      },
    },
  })

  const items = useMemo(
    () => data?.searchNotifications?.notifications ?? [],
    [data],
  )

  const newNotifications = useMemo(() => {
    return items.filter((item) => !item.isOld)
  }, [items])

  const oldNotifications = useMemo(() => {
    return items.filter((item) => item.isOld)
  }, [items])

  const [markNotificationsAsOld] = useMutation(
    MUTATION_MARK_NOTIFICATIONS_AS_OLD,
    {
      update: (cache, _, request) => {
        cache.modify({
          id: `Profile:${myProfile?.userId}`,
          fields: {
            newNotificationsCount: (newNotificationsCountRef) => {
              return Math.max(
                0,
                newNotificationsCountRef -
                  (request.variables?.notificationIDs?.length ?? 0),
              )
            },
          },
        })
      },
    },
  )

  const prevOffset = useRef(PAGINATION_START_OFFSET)

  useInfinityScrollProvider(() => {
    if (
      data?.searchNotifications?.status.total &&
      items.length >= data?.searchNotifications?.status.total
    ) {
      return
    }
    prevOffset.current = items.length
    fetchMore({
      variables: {
        input: {
          userId: myProfile?.userId as string,
          offset: prevOffset.current,
          limit: PAGINATION_LIMIT,
        },
      },
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          searchNotifications: data.searchNotifications
            ? {
                ...data.searchNotifications,
                notifications: [
                  ...(data.searchNotifications?.notifications ?? []),
                  ...(fetchMoreResult.searchNotifications?.notifications ?? []),
                ],
              }
            : null,
        }
      },
    })
  })

  useEffect(() => {
    if (!items) {
      return
    }
    const newNotificationsIds = items
      .filter((item) => !item.isOld)
      .map((item) => item.id)
    if (!newNotificationsIds.length) {
      return
    }
    markNotificationsAsOld({
      variables: {
        notificationIDs: newNotificationsIds,
      },
    })
  }, [items, markNotificationsAsOld])

  return (
    <Container onScroll={infinityScroll}>
      <LoadingState
        loadingComponent={<Loader withGradient />}
        loading={loading}
      >
        {newNotifications?.length ? (
          <>
            <ListTitle>New</ListTitle>
            <List>
              {newNotifications.map((item) => {
                return <NotificationItem key={item.id} item={item} />
              })}
            </List>
          </>
        ) : null}
        {oldNotifications?.length ? (
          <>
            <ListTitle>Earlier</ListTitle>
            <List>
              {oldNotifications.map((item) => {
                return <NotificationItem key={item.id} item={item} />
              })}
            </List>
          </>
        ) : null}
        {!oldNotifications?.length && !newNotifications?.length ? (
          <MockWithAction
            title={'You haven’t got notifications'}
            image={<PlaceholderBell />}
          />
        ) : null}
      </LoadingState>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
const ListTitle = styled.div`
  margin-bottom: 2.4rem;

  font-weight: 500;
  font-size: 1.6rem;

  &:nth-of-type(2) {
    padding-top: 2.4rem;
  }
`
const List = styled.ul`
  margin: 0;
  padding: 0;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;

  list-style: none;
`
