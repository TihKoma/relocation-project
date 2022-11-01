/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListFollowedRegions
// ====================================================

export interface ListFollowedRegions_listFollowedRegions_regions {
  __typename: "Region";
  id: string;
  name: string;
  subscribed: boolean;
  subscribersCount: number;
  slug: string;
  PhotoUrl: string;
  subtitle: string;
}

export interface ListFollowedRegions_listFollowedRegions {
  __typename: "ListFollowedRegionsResponse";
  regions: ListFollowedRegions_listFollowedRegions_regions[] | null;
  total: number;
}

export interface ListFollowedRegions {
  listFollowedRegions: ListFollowedRegions_listFollowedRegions;
}

export interface ListFollowedRegionsVariables {
  userId: string;
  page?: number | null;
  limit?: number | null;
  position?: number | null;
}
