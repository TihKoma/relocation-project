import { gql, TypedDocumentNode } from '@apollo/client'

import {
  RemoveSubscriptionBySubscriptable,
  RemoveSubscriptionBySubscriptableVariables,
} from './__generated__/RemoveSubscriptionBySubscriptable'

export const MUTATION_REMOVE_SUBSCRIPTION: TypedDocumentNode<
  RemoveSubscriptionBySubscriptable,
  RemoveSubscriptionBySubscriptableVariables
> = gql`
  mutation RemoveSubscriptionBySubscriptable($subscriptableId: ID!) {
    removeSubscriptionBySubscriptable(subscriptableId: $subscriptableId) {
      status
    }
  }
`
