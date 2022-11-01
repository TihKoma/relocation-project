import { gql } from '@apollo/client'

import { FRAGMENT_COMMENT_FIELDS } from '@/modules/comment'
import { FRAGMENT_MEDIA_FIELDS } from '@/modules/file'
import { FRAGMENT_USER_FIELDS } from '@/modules/profile'
import { FRAGMENT_REACTIONS_FIELDS } from '@/modules/reaction'

export const FRAGMENT_POST_FIELDS = gql`
  ${FRAGMENT_USER_FIELDS}
  ${FRAGMENT_COMMENT_FIELDS}
  ${FRAGMENT_MEDIA_FIELDS}
  ${FRAGMENT_REACTIONS_FIELDS}

  fragment PostFields on FeedPost {
    post {
      id
      userId
      regionId
      type
      content
      slug
      media {
        ...MediaFields
      }
      geoData
      createdAt
    }
    user {
      ...UserFields
    }
    region {
      id
      name
      slug
      subtitle
    }
    userReaction {
      type
    }
    reactions {
      ...ReactionsFields
    }
    commentsCount
    comments {
      ...CommentFields
    }
    viewsCount
    group {
      id
      avatar
      name
      slug
    }
  }
`
