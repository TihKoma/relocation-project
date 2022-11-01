/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSubscriptionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Follow
// ====================================================

export interface Follow_createSubscription {
  __typename: "SubscriptionModel";
  id: string;
}

export interface Follow {
  createSubscription: Follow_createSubscription | null;
}

export interface FollowVariables {
  input: CreateSubscriptionInput;
}
