/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSuggestions
// ====================================================

export interface GetSuggestions_getSuggestions {
  __typename: "Suggestion";
  entityId: string;
  suggestion: string;
  slug: string | null;
}

export interface GetSuggestions {
  getSuggestions: GetSuggestions_getSuggestions[] | null;
}

export interface GetSuggestionsVariables {
  query: string;
  searchType: SearchType;
}
