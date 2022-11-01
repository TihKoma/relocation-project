/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSubscriptionInput, SubscriptableType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSubscription
// ====================================================

export interface CreateSubscription_createSubscription {
  __typename: "SubscriptionModel";
  id: string;
  subscriptableId: string;
  subscriptableType: SubscriptableType;
}

export interface CreateSubscription {
  createSubscription: CreateSubscription_createSubscription | null;
}

export interface CreateSubscriptionVariables {
  input: CreateSubscriptionInput;
}
