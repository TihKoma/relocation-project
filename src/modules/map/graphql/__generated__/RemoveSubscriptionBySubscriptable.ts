/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveSubscriptionBySubscriptable
// ====================================================

export interface RemoveSubscriptionBySubscriptable_removeSubscriptionBySubscriptable {
  __typename: "Result";
  status: boolean;
}

export interface RemoveSubscriptionBySubscriptable {
  removeSubscriptionBySubscriptable: RemoveSubscriptionBySubscriptable_removeSubscriptionBySubscriptable | null;
}

export interface RemoveSubscriptionBySubscriptableVariables {
  subscriptableId: string;
}
