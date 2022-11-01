/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPostsByUser
// ====================================================

export interface GetPostsByUser_listPostsByUser_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetPostsByUser_listPostsByUser_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: GetPostsByUser_listPostsByUser_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface GetPostsByUser_listPostsByUser_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostsByUser_listPostsByUser_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface GetPostsByUser_listPostsByUser_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostsByUser_listPostsByUser_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostsByUser_listPostsByUser_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetPostsByUser_listPostsByUser_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostsByUser_listPostsByUser_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostsByUser_listPostsByUser_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostsByUser_listPostsByUser_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetPostsByUser_listPostsByUser_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetPostsByUser_listPostsByUser_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetPostsByUser_listPostsByUser_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetPostsByUser_listPostsByUser_comments_replies {
  __typename: "FeedComment";
  comment: GetPostsByUser_listPostsByUser_comments_replies_comment;
  user: GetPostsByUser_listPostsByUser_comments_replies_user;
  userReaction: GetPostsByUser_listPostsByUser_comments_replies_userReaction | null;
  reactions: GetPostsByUser_listPostsByUser_comments_replies_reactions;
}

export interface GetPostsByUser_listPostsByUser_comments {
  __typename: "FeedComment";
  comment: GetPostsByUser_listPostsByUser_comments_comment;
  user: GetPostsByUser_listPostsByUser_comments_user;
  reactions: GetPostsByUser_listPostsByUser_comments_reactions;
  userReaction: GetPostsByUser_listPostsByUser_comments_userReaction | null;
  replies: GetPostsByUser_listPostsByUser_comments_replies[] | null;
}

export interface GetPostsByUser_listPostsByUser_group {
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

export interface GetPostsByUser_listPostsByUser {
  __typename: "FeedPost";
  post: GetPostsByUser_listPostsByUser_post;
  user: GetPostsByUser_listPostsByUser_user;
  region: GetPostsByUser_listPostsByUser_region;
  userReaction: GetPostsByUser_listPostsByUser_userReaction | null;
  reactions: GetPostsByUser_listPostsByUser_reactions;
  commentsCount: number | null;
  comments: GetPostsByUser_listPostsByUser_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: GetPostsByUser_listPostsByUser_group | null;
}

export interface GetPostsByUser {
  listPostsByUser: GetPostsByUser_listPostsByUser[] | null;
}

export interface GetPostsByUserVariables {
  userId: string;
  page?: number | null;
  limit?: number | null;
}
