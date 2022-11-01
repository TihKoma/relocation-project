import { gql, TypedDocumentNode } from '@apollo/client'

import { AddComment, AddCommentVariables } from './__generated__/AddComment'
import { EditComment, EditCommentVariables } from './__generated__/EditComment'
import {
  RemoveComment,
  RemoveCommentVariables,
} from './__generated__/RemoveComment'

export const MUTATION_ADD_COMMENT: TypedDocumentNode<
  AddComment,
  AddCommentVariables
> = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
      text
      createdAt
    }
  }
`

export const MUTATION_EDIT_COMMENT: TypedDocumentNode<
  EditComment,
  EditCommentVariables
> = gql`
  mutation EditComment($commentId: ID!, $input: EditCommentInput!) {
    editComment(commentId: $commentId, input: $input) {
      id
      text
      createdAt
    }
  }
`

export const MUTATION_REMOVE_COMMENT: TypedDocumentNode<
  RemoveComment,
  RemoveCommentVariables
> = gql`
  mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      status
    }
  }
`

export { CommentEntityType } from '../../../../__generated__/globalTypes'
