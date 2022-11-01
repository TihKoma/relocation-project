import { gql, TypedDocumentNode } from '@apollo/client'

import { Follow, FollowVariables } from './__generated__/Follow'
import { Unfollow, UnfollowVariables } from './__generated__/Unfollow'

export const MUTATION_CREATE_SUBSCRIPTION: TypedDocumentNode<
  Follow,
  FollowVariables
> = gql`
  mutation Follow($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      id
    }
  }
`

export const MUTATION_REMOVE_SUBSCRIPTION: TypedDocumentNode<
  Unfollow,
  UnfollowVariables
> = gql`
  mutation Unfollow($subscriptableId: ID!) {
    removeSubscriptionBySubscriptable(subscriptableId: $subscriptableId) {
      status
    }
  }
`
