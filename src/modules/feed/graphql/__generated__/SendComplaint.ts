/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateComplaintInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendComplaint
// ====================================================

export interface SendComplaint_sendComplaint {
  __typename: "Result";
  status: boolean;
}

export interface SendComplaint {
  sendComplaint: SendComplaint_sendComplaint | null;
}

export interface SendComplaintVariables {
  input: CreateComplaintInput;
}
