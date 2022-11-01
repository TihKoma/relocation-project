import { useLazyQuery, useQuery } from '@apollo/client'
import { QueryHookOptions } from '@apollo/client/react/types/types'

import { QUERY_GET_GROUP_FEED } from '@/modules/group'
import {
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'

import { QUERY_GET_FEED } from './graphql/query-get-feed'
import { QUERY_GET_REGION_FEED } from './graphql/query-get-region-feed'
import { QUERY_GET_TAG_FEED } from './graphql/query-get-tag-feed'
import { QUERY_GET_USER_FEED } from './graphql/query-get-user-feed'

const defaultLimit = 10

export const useInfinityScrollFeed = (
  query:
    | typeof QUERY_GET_REGION_FEED
    | typeof QUERY_GET_USER_FEED
    | typeof QUERY_GET_TAG_FEED
    | typeof QUERY_GET_GROUP_FEED,
  { variables = {}, ...options }: QueryHookOptions,
  ref: HTMLElement | null,
) => {
  useScrollOnElement(ref)

  const {
    data: initialData,
    loading,
    error,
  } = useQuery(query, {
    // @ts-ignore
    variables: { ...variables, limit: defaultLimit },
    ...options,
  })

  const initialFeed =
    initialData?.getRegionFeed ||
    initialData?.getUserFeed ||
    initialData?.getTagFeed ||
    initialData?.getGroupFeed

  const [get, { data: feedData, fetchMore }] = useLazyQuery(QUERY_GET_FEED)
  const feed = feedData?.getFeed

  const posts = initialFeed?.posts ?? []

  useInfinityScrollProvider(() => {
    if (!initialFeed?.id || feed?.id === null || loading) {
      return
    }
    if (typeof feed?.id === 'string' && initialFeed.id !== feed?.id) {
      get({
        variables: {
          position: posts.length,
          feedId: initialFeed.id,
        },
      })
    } else if (feed && fetchMore) {
      fetchMore({
        variables: {
          position: posts.length,
          feedId: feed.id,
        },
      })
    } else {
      get({
        variables: {
          position: posts.length,
          feedId: initialFeed.id,
          limit: defaultLimit,
        },
      })
    }
  })
  return {
    loading,
    error,
    posts,
    feedId: initialFeed?.id,
  }
}
