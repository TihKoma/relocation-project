/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListFollowedUsers
// ====================================================

export interface ListFollowedUsers_listFollowedUsers_users {
  __typename: "PublicProfile";
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
  subscribed: boolean;
}

export interface ListFollowedUsers_listFollowedUsers {
  __typename: "ListFollowedUsersResponse";
  users: ListFollowedUsers_listFollowedUsers_users[] | null;
  total: number;
}

export interface ListFollowedUsers {
  listFollowedUsers: ListFollowedUsers_listFollowedUsers;
}

export interface ListFollowedUsersVariables {
  userId: string;
  page?: number | null;
  limit?: number | null;
  position?: number | null;
}
