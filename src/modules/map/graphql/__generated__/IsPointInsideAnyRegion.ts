/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PointInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: IsPointInsideAnyRegion
// ====================================================

export interface IsPointInsideAnyRegion_isPointInsideAnyRegion {
  __typename: "Result";
  status: boolean;
}

export interface IsPointInsideAnyRegion {
  isPointInsideAnyRegion: IsPointInsideAnyRegion_isPointInsideAnyRegion | null;
}

export interface IsPointInsideAnyRegionVariables {
  point: PointInput;
}
