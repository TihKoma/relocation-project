/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddViewTimeInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddViewTimesWithCount
// ====================================================

export interface AddViewTimesWithCount_addViewTimesWithCount {
  __typename: "ViewTime";
  entityID: string;
}

export interface AddViewTimesWithCount {
  addViewTimesWithCount: (AddViewTimesWithCount_addViewTimesWithCount | null)[] | null;
}

export interface AddViewTimesWithCountVariables {
  input: AddViewTimeInput[];
}
