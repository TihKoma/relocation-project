import { gql, TypedDocumentNode } from '@apollo/client'

import {
  ListEntityComments,
  ListEntityCommentsVariables,
} from './__generated__/ListEntityComments'
import { FRAGMENT_COMMENT_FIELDS } from './fragments'

export const QUERY_LIST_ENTITY_COMMENTS: TypedDocumentNode<
  ListEntityComments,
  ListEntityCommentsVariables
> = gql`
  ${FRAGMENT_COMMENT_FIELDS}

  query ListEntityComments($entityId: ID!, $page: Int, $limit: Int) {
    listEntityComments(entityId: $entityId, page: $page, limit: $limit) {
      ...CommentFields
    }
  }
`
