/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePaymentsSubscription
// ====================================================

export interface CreatePaymentsSubscription_createPaymentsSubscription {
  __typename: "CreatePaymentsSubscriptionResponse";
  sessionUrl: string;
}

export interface CreatePaymentsSubscription {
  createPaymentsSubscription: CreatePaymentsSubscription_createPaymentsSubscription | null;
}

export interface CreatePaymentsSubscriptionVariables {
  priceId: string;
  redirectTo?: string | null;
}
