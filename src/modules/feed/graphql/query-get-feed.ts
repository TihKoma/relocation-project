import { gql, TypedDocumentNode } from '@apollo/client'

import { FRAGMENT_POST_FIELDS } from '@/modules/post'

import { GetFeed, GetFeedVariables } from './__generated__/GetFeed'

export const QUERY_GET_FEED: TypedDocumentNode<GetFeed, GetFeedVariables> = gql`
  ${FRAGMENT_POST_FIELDS}
  query GetFeed($feedId: ID!, $position: Int, $limit: Int) {
    getFeed(feedId: $feedId, position: $position, limit: $limit) {
      id
      posts {
        ...PostFields
      }
    }
  }
`
