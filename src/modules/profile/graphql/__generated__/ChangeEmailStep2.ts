/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangeEmailStep2Input } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ChangeEmailStep2
// ====================================================

export interface ChangeEmailStep2_changeEmailStep2 {
  __typename: "ChangeEmailStep2Response";
  result: string;
}

export interface ChangeEmailStep2 {
  changeEmailStep2: ChangeEmailStep2_changeEmailStep2 | null;
}

export interface ChangeEmailStep2Variables {
  input: ChangeEmailStep2Input;
}
