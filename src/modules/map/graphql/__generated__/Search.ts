/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search {
  __typename: "Region";
  id: string;
  name: string;
  subscribed: boolean;
  subscribersCount: number;
  slug: string;
  subtitle: string;
  PhotoUrl: string;
}

export interface Search {
  search: Search_search[] | null;
}

export interface SearchVariables {
  searchType: SearchType;
  query: string;
  page?: number | null;
  limit?: number | null;
}
