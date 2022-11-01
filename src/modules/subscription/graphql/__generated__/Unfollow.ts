/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Unfollow
// ====================================================

export interface Unfollow_removeSubscriptionBySubscriptable {
  __typename: "Result";
  status: boolean;
}

export interface Unfollow {
  removeSubscriptionBySubscriptable: Unfollow_removeSubscriptionBySubscriptable | null;
}

export interface UnfollowVariables {
  subscriptableId: string;
}
