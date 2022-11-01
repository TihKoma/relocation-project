/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddViewTimeInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddViewTimes
// ====================================================

export interface AddViewTimes_addViewTimes {
  __typename: "ViewTime";
  id: string;
}

export interface AddViewTimes {
  addViewTimes: (AddViewTimes_addViewTimes | null)[] | null;
}

export interface AddViewTimesVariables {
  input: AddViewTimeInput[];
}
