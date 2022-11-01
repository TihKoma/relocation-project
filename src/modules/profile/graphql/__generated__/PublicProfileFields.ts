/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PublicProfileFields
// ====================================================

export interface PublicProfileFields_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface PublicProfileFields_previewFollowings {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface PublicProfileFields {
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
  previewFollowers: PublicProfileFields_previewFollowers[];
  previewFollowings: PublicProfileFields_previewFollowings[];
}
