/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePaymentsSubscriptionPlan
// ====================================================

export interface ChangePaymentsSubscriptionPlan_changePaymentsSubscriptionPlan {
  __typename: "Result";
  status: boolean;
}

export interface ChangePaymentsSubscriptionPlan {
  changePaymentsSubscriptionPlan: ChangePaymentsSubscriptionPlan_changePaymentsSubscriptionPlan | null;
}

export interface ChangePaymentsSubscriptionPlanVariables {
  newPriceId: string;
}
