/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListUserSubscriptions
// ====================================================

export interface ListUserSubscriptions_listFollowedRegions_regions {
  __typename: "Region";
  id: string;
  name: string;
  subscribed: boolean;
  subscribersCount: number;
  slug: string;
  PhotoUrl: string;
}

export interface ListUserSubscriptions_listFollowedRegions {
  __typename: "ListFollowedRegionsResponse";
  regions: ListUserSubscriptions_listFollowedRegions_regions[] | null;
  total: number;
}

export interface ListUserSubscriptions_listFollowedUsers_users {
  __typename: "PublicProfile";
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
}

export interface ListUserSubscriptions_listFollowedUsers {
  __typename: "ListFollowedUsersResponse";
  users: ListUserSubscriptions_listFollowedUsers_users[] | null;
  total: number;
}

export interface ListUserSubscriptions {
  listFollowedRegions: ListUserSubscriptions_listFollowedRegions;
  listFollowedUsers: ListUserSubscriptions_listFollowedUsers;
}

export interface ListUserSubscriptionsVariables {
  userId: string;
}
