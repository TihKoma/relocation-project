import { gql, TypedDocumentNode } from '@apollo/client'

import { AddReaction, AddReactionVariables } from './__generated__/AddReaction'
import {
  RemoveReaction,
  RemoveReactionVariables,
} from './__generated__/RemoveReaction'

export const MUTATION_ADD_REACTION: TypedDocumentNode<
  AddReaction,
  AddReactionVariables
> = gql`
  mutation AddReaction($input: AddReactionInput!) {
    addReaction(input: $input) {
      type
    }
  }
`

export const MUTATION_REMOVE_REACTION: TypedDocumentNode<
  RemoveReaction,
  RemoveReactionVariables
> = gql`
  mutation RemoveReaction($entityID: ID!) {
    removeReactionByEntity(entityID: $entityID) {
      status
    }
  }
`

export {
  ReactionEntityType,
  ReactionType,
} from '../../../../__generated__/globalTypes'
