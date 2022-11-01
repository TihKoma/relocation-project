import { gql, TypedDocumentNode } from '@apollo/client'

import { FRAGMENT_USER_FIELDS } from '@/modules/profile'

import { ListReactionsByEntity } from './__generated__/ListReactionsByEntity'
import { ListReactionTypes } from './__generated__/ListReactionTypes'

export const QUERY_REACTION_TYPES: TypedDocumentNode<ListReactionTypes> = gql`
  query ListReactionTypes {
    listReactionTypes {
      reactionType
      svgUrl
    }
  }
`

export const QUERY_LIST_REACTION: TypedDocumentNode<ListReactionsByEntity> = gql`
  ${FRAGMENT_USER_FIELDS}

  query ListReactionsByEntity(
    $entityId: ID!
    $limit: Int
    $position: Int
    $reactionTypes: [ReactionType]
  ) {
    listReactionsByEntity(
      entityId: $entityId
      limit: $limit
      position: $position
      reactionTypes: $reactionTypes
    ) {
      id
      user {
        ...UserFields
      }
      type
    }
  }
`
