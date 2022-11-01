import { gql, TypedDocumentNode } from '@apollo/client'

import {
  CreateSubscription,
  CreateSubscriptionVariables,
} from './__generated__/CreateSubscription'

export const MUTATION_CREATE_SUBSCRIPTION: TypedDocumentNode<
  CreateSubscription,
  CreateSubscriptionVariables
> = gql`
  mutation CreateSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      id
      subscriptableId
      subscriptableType
    }
  }
`
export { SubscriptableType } from '../../../../__generated__/globalTypes'
