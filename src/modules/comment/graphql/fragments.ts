import { gql } from '@apollo/client'

import { FRAGMENT_USER_FIELDS } from '@/modules/profile'
import { FRAGMENT_REACTIONS_FIELDS } from '@/modules/reaction'

export const FRAGMENT_COMMENT_FIELDS = gql`
  ${FRAGMENT_USER_FIELDS}
  ${FRAGMENT_REACTIONS_FIELDS}

  fragment CommentFields on FeedComment {
    comment {
      id
      text
      createdAt
    }
    user {
      ...UserFields
    }
    reactions {
      ...ReactionsFields
    }
    userReaction {
      type
    }
    replies {
      comment {
        id
        text
        createdAt
      }
      user {
        ...UserFields
      }
      userReaction {
        type
      }
      reactions {
        ...ReactionsFields
      }
    }
    userReaction {
      type
    }
  }
`
