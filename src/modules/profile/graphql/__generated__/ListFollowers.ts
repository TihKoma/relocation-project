/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListFollowers
// ====================================================

export interface ListFollowers_listFollowers_followers {
  __typename: "PublicProfile";
  bio: string;
  coverUrl: string;
  firstName: string;
  followersCount: number;
  followingUsersCount: number;
  id: string;
  isFilled: boolean;
  lastName: string;
  photoUrl: string;
  subscribed: boolean;
  userId: string;
  userName: string;
}

export interface ListFollowers_listFollowers {
  __typename: "ListFollowersResponse";
  followers: ListFollowers_listFollowers_followers[] | null;
  total: number;
}

export interface ListFollowers {
  listFollowers: ListFollowers_listFollowers;
}

export interface ListFollowersVariables {
  subscriptableId: string;
  page?: number | null;
  limit?: number | null;
  position?: number | null;
}
