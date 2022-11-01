/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyPhoneStep1
// ====================================================

export interface VerifyPhoneStep1_verifyPhoneStep1 {
  __typename: "VerificationRequestID";
  requestId: string;
}

export interface VerifyPhoneStep1 {
  verifyPhoneStep1: VerifyPhoneStep1_verifyPhoneStep1 | null;
}

export interface VerifyPhoneStep1Variables {
  phoneNumber: string;
}
