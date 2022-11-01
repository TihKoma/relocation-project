/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPostById
// ====================================================

export interface GetPostById_getPostById_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetPostById_getPostById_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: GetPostById_getPostById_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface GetPostById_getPostById_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostById_getPostById_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface GetPostById_getPostById_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostById_getPostById_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostById_getPostById_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetPostById_getPostById_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostById_getPostById_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostById_getPostById_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostById_getPostById_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetPostById_getPostById_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostById_getPostById_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostById_getPostById_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostById_getPostById_comments_replies {
  __typename: "FeedComment";
  comment: GetPostById_getPostById_comments_replies_comment;
  user: GetPostById_getPostById_comments_replies_user;
  userReaction: GetPostById_getPostById_comments_replies_userReaction | null;
  reactions: GetPostById_getPostById_comments_replies_reactions;
}

export interface GetPostById_getPostById_comments {
  __typename: "FeedComment";
  comment: GetPostById_getPostById_comments_comment;
  user: GetPostById_getPostById_comments_user;
  reactions: GetPostById_getPostById_comments_reactions;
  userReaction: GetPostById_getPostById_comments_userReaction | null;
  replies: GetPostById_getPostById_comments_replies[] | null;
}

export interface GetPostById_getPostById_group {
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

export interface GetPostById_getPostById {
  __typename: "FeedPost";
  post: GetPostById_getPostById_post;
  user: GetPostById_getPostById_user;
  region: GetPostById_getPostById_region;
  userReaction: GetPostById_getPostById_userReaction | null;
  reactions: GetPostById_getPostById_reactions;
  commentsCount: number | null;
  comments: GetPostById_getPostById_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: GetPostById_getPostById_group | null;
}

export interface GetPostById {
  getPostById: GetPostById_getPostById;
}

export interface GetPostByIdVariables {
  id: string;
}
