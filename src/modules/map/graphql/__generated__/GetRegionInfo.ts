/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRegionInfo
// ====================================================

export interface GetRegionInfo_getRegionInfo {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  PhotoUrl: string;
  subscribed: boolean;
  subscribersCount: number;
  subtitle: string;
}

export interface GetRegionInfo {
  getRegionInfo: GetRegionInfo_getRegionInfo | null;
}

export interface GetRegionInfoVariables {
  id: string;
}
