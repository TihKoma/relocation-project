/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingFilterInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SaveListingsSearch
// ====================================================

export interface SaveListingsSearch_saveListingsSearch {
  __typename: "Result";
  status: boolean;
}

export interface SaveListingsSearch {
  saveListingsSearch: SaveListingsSearch_saveListingsSearch | null;
}

export interface SaveListingsSearchVariables {
  regionId: string;
  query: ListingFilterInput;
}
