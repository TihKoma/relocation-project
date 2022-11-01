import { gql, TypedDocumentNode } from '@apollo/client'

import { FRAGMENT_POST_FIELDS } from '@/modules/post'

import { GetTagFeed, GetTagFeedVariables } from './__generated__/GetTagFeed'

export const QUERY_GET_TAG_FEED: TypedDocumentNode<
  GetTagFeed,
  GetTagFeedVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}
  query GetTagFeed($tag: String!, $feedId: ID, $position: Int, $limit: Int) {
    getTagFeed(tag: $tag, feedId: $feedId, position: $position, limit: $limit) {
      id
      posts {
        ...PostFields
      }
    }
  }
`
