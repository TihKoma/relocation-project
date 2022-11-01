import { gql, TypedDocumentNode } from '@apollo/client'

import { FRAGMENT_POST_FIELDS } from '@/modules/post'

import {
  GetUserFeed_getUserFeed_posts as FeedPost,
  GetUserFeed_getUserFeed_posts_comments as FeedComment,
  GetUserFeed_getUserFeed_posts_reactions,
} from './__generated__/GetUserFeed'
import { GetUserFeed, GetUserFeedVariables } from './__generated__/GetUserFeed'

export const QUERY_GET_USER_FEED: TypedDocumentNode<
  GetUserFeed,
  GetUserFeedVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}
  query GetUserFeed($limit: Int) {
    getUserFeed(limit: $limit) {
      id
      posts {
        ...PostFields
      }
    }
  }
`
export type FeedItem = Omit<FeedPost, '__typename'>

export type PostItem = FeedItem

// TODO media aren't in backend
export type CommentItem = { replies?: FeedComment['replies'] } & Omit<
  FeedComment,
  'replies'
>

export type Reactions = Omit<
  GetUserFeed_getUserFeed_posts_reactions,
  '__typename'
>
