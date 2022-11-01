/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntityType, PostType, MediaType, ReactionEntityType, ReactionType, CommentEntityType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchV2
// ====================================================

export interface SearchV2_searchV2_Status {
  __typename: "Status";
  /**
   * total docs
   */
  Total: number;
  /**
   * total docs on current page
   */
  Length: number;
  /**
   * query time
   */
  TookInMillis: number;
}

export interface SearchV2_searchV2_Docs_Meta {
  __typename: "Meta";
  /**
   * result score
   */
  Score: number;
  /**
   * doc type
   */
  Type: string;
}

export interface SearchV2_searchV2_Docs_Entity_Group_region {
  __typename: "Region";
  id: string;
  subtitle: string;
  slug: string;
}

export interface SearchV2_searchV2_Docs_Entity_Group_members {
  __typename: "Members";
  /**
   * total members in group
   */
  total: number;
  /**
   * true if current user authorized and in group
   */
  iAmIn: boolean | null;
}

export interface SearchV2_searchV2_Docs_Entity_Group {
  __typename: "Group";
  id: string;
  region: SearchV2_searchV2_Docs_Entity_Group_region;
  name: string;
  description: string | null;
  /**
   * auto generated string
   */
  slug: string;
  /**
   * link to image
   */
  cover: string | null;
  /**
   * link to image
   */
  avatar: string | null;
  /**
   * members info
   */
  members: SearchV2_searchV2_Docs_Entity_Group_members | null;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  media: SearchV2_searchV2_Docs_Entity_FeedPost_post_media[] | null;
  geoData: any | null;
  tags: string[] | null;
  tagsPositions: number[] | null;
  createdAt: any;
  updatedAt: any;
  isRead: boolean | null;
  slug: string | null;
  groupId: string | null;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_user {
  __typename: "FeedUser";
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  isSubscribed: boolean | null;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_geo {
  __typename: "FeedPostGeo";
  address: string;
  title: string | null;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_region {
  __typename: "Region";
  id: string;
  name: string;
  subscribed: boolean;
  subscribersCount: number;
  slug: string;
  subtitle: string;
  PhotoUrl: string;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_reactions {
  __typename: "Reactions";
  like: number;
  super: number;
  funny: number;
  sad: number;
  angry: number;
  total: number;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_userReaction {
  __typename: "Reaction";
  id: string;
  userId: string;
  entityId: string;
  entityType: ReactionEntityType;
  type: ReactionType;
  createdAt: any;
  updatedAt: any;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_comments_comment {
  __typename: "Comment";
  id: string;
  userId: string;
  entityId: string;
  entityType: CommentEntityType;
  parentId: string | null;
  text: string;
  createdAt: any;
  updatedAt: any;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_comments_userReaction {
  __typename: "Reaction";
  id: string;
  userId: string;
  entityId: string;
  entityType: ReactionEntityType;
  type: ReactionType;
  createdAt: any;
  updatedAt: any;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_comments_reactions {
  __typename: "Reactions";
  like: number;
  super: number;
  funny: number;
  sad: number;
  angry: number;
  total: number;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_comments {
  __typename: "FeedComment";
  comment: SearchV2_searchV2_Docs_Entity_FeedPost_comments_comment;
  userReaction: SearchV2_searchV2_Docs_Entity_FeedPost_comments_userReaction | null;
  reactions: SearchV2_searchV2_Docs_Entity_FeedPost_comments_reactions;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_group_region {
  __typename: "Region";
  id: string;
  subtitle: string;
  slug: string;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_group_members {
  __typename: "Members";
  /**
   * total members in group
   */
  total: number;
  /**
   * true if current user authorized and in group
   */
  iAmIn: boolean | null;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost_group {
  __typename: "Group";
  id: string;
  region: SearchV2_searchV2_Docs_Entity_FeedPost_group_region;
  name: string;
  description: string | null;
  /**
   * auto generated string
   */
  slug: string;
  /**
   * link to image
   */
  cover: string | null;
  /**
   * link to image
   */
  avatar: string | null;
  /**
   * members info
   */
  members: SearchV2_searchV2_Docs_Entity_FeedPost_group_members | null;
}

export interface SearchV2_searchV2_Docs_Entity_FeedPost {
  __typename: "FeedPost";
  post: SearchV2_searchV2_Docs_Entity_FeedPost_post;
  user: SearchV2_searchV2_Docs_Entity_FeedPost_user;
  geo: SearchV2_searchV2_Docs_Entity_FeedPost_geo | null;
  region: SearchV2_searchV2_Docs_Entity_FeedPost_region;
  reactions: SearchV2_searchV2_Docs_Entity_FeedPost_reactions;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  userReaction: SearchV2_searchV2_Docs_Entity_FeedPost_userReaction | null;
  commentsCount: number | null;
  comments: SearchV2_searchV2_Docs_Entity_FeedPost_comments[] | null;
  /**
   * if post linked to group
   */
  group: SearchV2_searchV2_Docs_Entity_FeedPost_group | null;
}

export interface SearchV2_searchV2_Docs_Entity_Tag {
  __typename: "Tag";
  tag: string;
  popular: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface SearchV2_searchV2_Docs_Entity_Region {
  __typename: "Region";
  id: string;
  name: string;
  subscribed: boolean;
  subscribersCount: number;
  slug: string;
  subtitle: string;
  PhotoUrl: string;
}

export interface SearchV2_searchV2_Docs_Entity_PublicProfile {
  __typename: "PublicProfile";
  id: string;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  photoUrl: string;
  coverUrl: string;
  isFilled: boolean;
  subscribed: boolean;
  followersCount: number;
  followingsCount: number;
}

export type SearchV2_searchV2_Docs_Entity = SearchV2_searchV2_Docs_Entity_Group | SearchV2_searchV2_Docs_Entity_FeedPost | SearchV2_searchV2_Docs_Entity_Tag | SearchV2_searchV2_Docs_Entity_Region | SearchV2_searchV2_Docs_Entity_PublicProfile;

export interface SearchV2_searchV2_Docs {
  __typename: "Doc";
  Meta: SearchV2_searchV2_Docs_Meta;
  Entity: SearchV2_searchV2_Docs_Entity;
}

export interface SearchV2_searchV2 {
  __typename: "SearchV2Response";
  Status: SearchV2_searchV2_Status | null;
  Docs: (SearchV2_searchV2_Docs | null)[] | null;
}

export interface SearchV2 {
  searchV2: SearchV2_searchV2;
}

export interface SearchV2Variables {
  query: string;
  type?: EntityType | null;
  limit?: number | null;
  offset?: number | null;
}
