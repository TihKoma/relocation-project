/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchGroupsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchGroups
// ====================================================

export interface SearchGroups_searchGroups_groups_author_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface SearchGroups_searchGroups_groups_author_previewFollowings {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface SearchGroups_searchGroups_groups_author {
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
  previewFollowers: SearchGroups_searchGroups_groups_author_previewFollowers[];
  previewFollowings: SearchGroups_searchGroups_groups_author_previewFollowings[];
}

export interface SearchGroups_searchGroups_groups_members_profiles_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface SearchGroups_searchGroups_groups_members_profiles_previewFollowings {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface SearchGroups_searchGroups_groups_members_profiles {
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
  previewFollowers: SearchGroups_searchGroups_groups_members_profiles_previewFollowers[];
  previewFollowings: SearchGroups_searchGroups_groups_members_profiles_previewFollowings[];
}

export interface SearchGroups_searchGroups_groups_members {
  __typename: "Members";
  /**
   * total members in group
   */
  total: number;
  /**
   * true if current user authorized and in group
   */
  iAmIn: boolean | null;
  /**
   * limited array of members, only to show small group of avatars
   */
  profiles: (SearchGroups_searchGroups_groups_members_profiles | null)[] | null;
}

export interface SearchGroups_searchGroups_groups_region {
  __typename: "Region";
  id: string;
  name: string;
  city: string;
  country: string;
  subtitle: string;
  slug: string;
  placeType: string;
}

export interface SearchGroups_searchGroups_groups {
  __typename: "Group";
  /**
   * auto generated string
   */
  slug: string;
  author: SearchGroups_searchGroups_groups_author | null;
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
  members: SearchGroups_searchGroups_groups_members | null;
  name: string;
  region: SearchGroups_searchGroups_groups_region;
  updatedAt: any;
}

export interface SearchGroups_searchGroups {
  __typename: "SearchGroupsResponse";
  /**
   * on current page
   */
  length: number;
  /**
   * total
   */
  total: number;
  groups: (SearchGroups_searchGroups_groups | null)[] | null;
}

export interface SearchGroups {
  searchGroups: SearchGroups_searchGroups;
}

export interface SearchGroupsVariables {
  input: SearchGroupsInput;
}
