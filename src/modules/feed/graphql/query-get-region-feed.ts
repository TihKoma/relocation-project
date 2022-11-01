import { gql, TypedDocumentNode } from '@apollo/client'

import { FRAGMENT_POST_FIELDS } from '@/modules/post'

import {
  GetRegionFeed,
  GetRegionFeedVariables,
} from './__generated__/GetRegionFeed'

export const QUERY_GET_REGION_FEED: TypedDocumentNode<
  GetRegionFeed,
  GetRegionFeedVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}
  query GetRegionFeed($regionId: ID!, $limit: Int) {
    getRegionFeed(regionId: $regionId, limit: $limit) {
      id
      posts {
        ...PostFields
      }
    }
  }
`
