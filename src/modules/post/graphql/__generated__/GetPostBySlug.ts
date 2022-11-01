/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPostBySlug
// ====================================================

export interface GetPostBySlug_getPostBySlug_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetPostBySlug_getPostBySlug_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: GetPostBySlug_getPostBySlug_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface GetPostBySlug_getPostBySlug_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostBySlug_getPostBySlug_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface GetPostBySlug_getPostBySlug_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostBySlug_getPostBySlug_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostBySlug_getPostBySlug_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetPostBySlug_getPostBySlug_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostBySlug_getPostBySlug_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostBySlug_getPostBySlug_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostBySlug_getPostBySlug_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetPostBySlug_getPostBySlug_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostBySlug_getPostBySlug_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostBySlug_getPostBySlug_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostBySlug_getPostBySlug_comments_replies {
  __typename: "FeedComment";
  comment: GetPostBySlug_getPostBySlug_comments_replies_comment;
  user: GetPostBySlug_getPostBySlug_comments_replies_user;
  userReaction: GetPostBySlug_getPostBySlug_comments_replies_userReaction | null;
  reactions: GetPostBySlug_getPostBySlug_comments_replies_reactions;
}

export interface GetPostBySlug_getPostBySlug_comments {
  __typename: "FeedComment";
  comment: GetPostBySlug_getPostBySlug_comments_comment;
  user: GetPostBySlug_getPostBySlug_comments_user;
  reactions: GetPostBySlug_getPostBySlug_comments_reactions;
  userReaction: GetPostBySlug_getPostBySlug_comments_userReaction | null;
  replies: GetPostBySlug_getPostBySlug_comments_replies[] | null;
}

export interface GetPostBySlug_getPostBySlug_group {
  __typename: "Group";
  id: string;
  /**
   * link to image
   */
  avatar: string | null;
  name: string;
  /**
   * auto generated string
   */
  slug: string;
}

export interface GetPostBySlug_getPostBySlug {
  __typename: "FeedPost";
  post: GetPostBySlug_getPostBySlug_post;
  user: GetPostBySlug_getPostBySlug_user;
  region: GetPostBySlug_getPostBySlug_region;
  userReaction: GetPostBySlug_getPostBySlug_userReaction | null;
  reactions: GetPostBySlug_getPostBySlug_reactions;
  commentsCount: number | null;
  comments: GetPostBySlug_getPostBySlug_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: GetPostBySlug_getPostBySlug_group | null;
}

export interface GetPostBySlug {
  getPostBySlug: GetPostBySlug_getPostBySlug;
}

export interface GetPostBySlugVariables {
  slug: string;
}
