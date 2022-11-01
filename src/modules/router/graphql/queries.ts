import { gql, TypedDocumentNode } from '@apollo/client'

import {
  RedirectRootInfo,
  RedirectRootInfoVariables,
} from './__generated__/RedirectRootInfo'

export const QUERY_REDIRECT_ROOT_INFO: TypedDocumentNode<
  RedirectRootInfo,
  RedirectRootInfoVariables
> = gql`
  query RedirectRootInfo($userId: ID!) {
    listFollowedRegions(userId: $userId) {
      total
      regions {
        id
      }
    }
    listFollowedUsers(userId: $userId) {
      total
      users {
        id
      }
    }
    detectRegion {
      slug
    }
  }
`
