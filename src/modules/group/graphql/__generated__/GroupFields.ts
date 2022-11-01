/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupFields
// ====================================================

export interface GroupFields_author_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GroupFields_author_previewFollowings {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GroupFields_author {
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
  previewFollowers: GroupFields_author_previewFollowers[];
  previewFollowings: GroupFields_author_previewFollowings[];
}

export interface GroupFields_members_profiles_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GroupFields_members_profiles_previewFollowings {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GroupFields_members_profiles {
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
  previewFollowers: GroupFields_members_profiles_previewFollowers[];
  previewFollowings: GroupFields_members_profiles_previewFollowings[];
}

export interface GroupFields_members {
  __typename: "Members";
  /**
   * true if current user authorized and in group
   */
  iAmIn: boolean | null;
  /**
   * total members in group
   */
  total: number;
  /**
   * limited array of members, only to show small group of avatars
   */
  profiles: (GroupFields_members_profiles | null)[] | null;
}

export interface GroupFields_region {
  __typename: "Region";
  id: string;
  name: string;
  city: string;
  country: string;
  subtitle: string;
  slug: string;
  PhotoUrl: string;
}

export interface GroupFields {
  __typename: "Group";
  author: GroupFields_author | null;
  /**
   * link to image
   */
  avatar: string | null;
  /**
   * link to image
   */
  cover: string | null;
  createdAt: any;
  description: string | null;
  id: string;
  /**
   * members info
   */
  members: GroupFields_members | null;
  name: string;
  region: GroupFields_region;
  /**
   * auto generated string
   */
  slug: string;
  updatedAt: any;
}
