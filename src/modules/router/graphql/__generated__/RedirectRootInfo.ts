/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RedirectRootInfo
// ====================================================

export interface RedirectRootInfo_listFollowedRegions_regions {
  __typename: "Region";
  id: string;
}

export interface RedirectRootInfo_listFollowedRegions {
  __typename: "ListFollowedRegionsResponse";
  total: number;
  regions: RedirectRootInfo_listFollowedRegions_regions[] | null;
}

export interface RedirectRootInfo_listFollowedUsers_users {
  __typename: "PublicProfile";
  id: string;
}

export interface RedirectRootInfo_listFollowedUsers {
  __typename: "ListFollowedUsersResponse";
  total: number;
  users: RedirectRootInfo_listFollowedUsers_users[] | null;
}

export interface RedirectRootInfo_detectRegion {
  __typename: "Region";
  slug: string;
}

export interface RedirectRootInfo {
  listFollowedRegions: RedirectRootInfo_listFollowedRegions;
  listFollowedUsers: RedirectRootInfo_listFollowedUsers;
  detectRegion: RedirectRootInfo_detectRegion | null;
}

export interface RedirectRootInfoVariables {
  userId: string;
}
