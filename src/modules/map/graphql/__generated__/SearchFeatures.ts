/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchFeaturesInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchFeatures
// ====================================================

export interface SearchFeatures_searchFeatures {
  __typename: "SearchFeaturesResponse";
  GeoFeatureCollection: any | null;
}

export interface SearchFeatures {
  searchFeatures: SearchFeatures_searchFeatures | null;
}

export interface SearchFeaturesVariables {
  input: SearchFeaturesInput;
}
