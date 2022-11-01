/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePaymentIntent
// ====================================================

export interface CreatePaymentIntent_createPaymentIntent {
  __typename: "CreatePaymentIntentResponse";
  clientSecret: string;
}

export interface CreatePaymentIntent {
  createPaymentIntent: CreatePaymentIntent_createPaymentIntent | null;
}

export interface CreatePaymentIntentVariables {
  productType: ProductType;
  productId: string;
}
