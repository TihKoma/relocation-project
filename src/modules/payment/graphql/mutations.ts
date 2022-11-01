import { gql, TypedDocumentNode } from '@apollo/client'

import { CancelPaymentsSubscription } from '@/modules/payment/graphql/__generated__/CancelPaymentsSubscription'
import {
  ChangePaymentsSubscriptionPlan,
  ChangePaymentsSubscriptionPlanVariables,
} from '@/modules/payment/graphql/__generated__/ChangePaymentsSubscriptionPlan'
import {
  CreatePaymentIntent,
  CreatePaymentIntentVariables,
} from '@/modules/payment/graphql/__generated__/CreatePaymentIntent'
import {
  CreatePaymentsSubscription,
  CreatePaymentsSubscriptionVariables,
} from '@/modules/payment/graphql/__generated__/CreatePaymentsSubscription'

export const MUTATION_CREATE_PAYMENT_INTENT: TypedDocumentNode<
  CreatePaymentIntent,
  CreatePaymentIntentVariables
> = gql`
  mutation CreatePaymentIntent(
    $productType: ProductType!
    $productId: String!
  ) {
    createPaymentIntent(productType: $productType, productId: $productId) {
      clientSecret
    }
  }
`
export const MUTATION_CREATE_PAYMENTS_SUBSCRIPTION: TypedDocumentNode<
  CreatePaymentsSubscription,
  CreatePaymentsSubscriptionVariables
> = gql`
  mutation CreatePaymentsSubscription($priceId: String!, $redirectTo: String) {
    createPaymentsSubscription(priceId: $priceId, redirectTo: $redirectTo) {
      sessionUrl
    }
  }
`

export const MUTATION_CHANGE_PAYMENTS_SUBSCRIPTION_PLAN: TypedDocumentNode<
  ChangePaymentsSubscriptionPlan,
  ChangePaymentsSubscriptionPlanVariables
> = gql`
  mutation ChangePaymentsSubscriptionPlan($newPriceId: String!) {
    changePaymentsSubscriptionPlan(newPriceId: $newPriceId) {
      status
    }
  }
`

export const MUTATION_CANCEL_PAYMENTS_SUBSCRIPTION: TypedDocumentNode<CancelPaymentsSubscription> = gql`
  mutation CancelPaymentsSubscription {
    cancelPaymentsSubscription {
      status
    }
  }
`
