/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeadInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendLead
// ====================================================

export interface SendLead_sendLead {
  __typename: "Result";
  status: boolean;
}

export interface SendLead {
  sendLead: SendLead_sendLead | null;
}

export interface SendLeadVariables {
  input: LeadInput;
}
