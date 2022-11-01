/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddViewTimeInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddViewTime
// ====================================================

export interface AddViewTime_addViewTime {
  __typename: "ViewTime";
  id: string;
}

export interface AddViewTime {
  addViewTime: AddViewTime_addViewTime | null;
}

export interface AddViewTimeVariables {
  input: AddViewTimeInput;
}
