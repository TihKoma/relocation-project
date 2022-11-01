/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelocationTodoStatusInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RelocationTodoChangeStatus
// ====================================================

export interface RelocationTodoChangeStatus_relocationTodoChangeStatus {
  __typename: "Result";
  description: string | null;
  status: boolean;
}

export interface RelocationTodoChangeStatus {
  relocationTodoChangeStatus: RelocationTodoChangeStatus_relocationTodoChangeStatus | null;
}

export interface RelocationTodoChangeStatusVariables {
  input: RelocationTodoStatusInput;
}
