/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerificationCodeInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyPhoneStep2
// ====================================================

export interface VerifyPhoneStep2_verifyPhoneStep2 {
  __typename: "Result";
  status: boolean;
}

export interface VerifyPhoneStep2 {
  verifyPhoneStep2: VerifyPhoneStep2_verifyPhoneStep2 | null;
}

export interface VerifyPhoneStep2Variables {
  verificationCode: VerificationCodeInput;
}
