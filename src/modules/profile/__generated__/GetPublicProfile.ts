/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPublicProfile
// ====================================================

export interface GetPublicProfile_getPublicProfileByUserName_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GetPublicProfile_getPublicProfileByUserName_previewFollowings {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GetPublicProfile_getPublicProfileByUserName {
  __typename: "PublicProfile";
  id: string;
  firstName: string;
  lastName: string;
  userId: string;
  subscribed: boolean;
  bio: string;
  followersCount: number;
  followingsCount: number;
  photoUrl: string;
  coverUrl: string;
  isFilled: boolean;
  userName: string;
  previewFollowers: GetPublicProfile_getPublicProfileByUserName_previewFollowers[];
  previewFollowings: GetPublicProfile_getPublicProfileByUserName_previewFollowings[];
}

export interface GetPublicProfile {
  getPublicProfileByUserName: GetPublicProfile_getPublicProfileByUserName | null;
}

export interface GetPublicProfileVariables {
  userName: string;
}
