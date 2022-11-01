/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PointInput, PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRadiusFeed
// ====================================================

export interface GetRadiusFeed_getRadiusFeed_posts_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetRadiusFeed_getRadiusFeed_posts_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: GetRadiusFeed_getRadiusFeed_posts_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface GetRadiusFeed_getRadiusFeed_posts_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetRadiusFeed_getRadiusFeed_posts_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface GetRadiusFeed_getRadiusFeed_posts_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetRadiusFeed_getRadiusFeed_posts_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments_replies {
  __typename: "FeedComment";
  comment: GetRadiusFeed_getRadiusFeed_posts_comments_replies_comment;
  user: GetRadiusFeed_getRadiusFeed_posts_comments_replies_user;
  userReaction: GetRadiusFeed_getRadiusFeed_posts_comments_replies_userReaction | null;
  reactions: GetRadiusFeed_getRadiusFeed_posts_comments_replies_reactions;
}

export interface GetRadiusFeed_getRadiusFeed_posts_comments {
  __typename: "FeedComment";
  comment: GetRadiusFeed_getRadiusFeed_posts_comments_comment;
  user: GetRadiusFeed_getRadiusFeed_posts_comments_user;
  reactions: GetRadiusFeed_getRadiusFeed_posts_comments_reactions;
  userReaction: GetRadiusFeed_getRadiusFeed_posts_comments_userReaction | null;
  replies: GetRadiusFeed_getRadiusFeed_posts_comments_replies[] | null;
}

export interface GetRadiusFeed_getRadiusFeed_posts_group {
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

export interface GetRadiusFeed_getRadiusFeed_posts {
  __typename: "FeedPost";
  post: GetRadiusFeed_getRadiusFeed_posts_post;
  user: GetRadiusFeed_getRadiusFeed_posts_user;
  region: GetRadiusFeed_getRadiusFeed_posts_region;
  userReaction: GetRadiusFeed_getRadiusFeed_posts_userReaction | null;
  reactions: GetRadiusFeed_getRadiusFeed_posts_reactions;
  commentsCount: number | null;
  comments: GetRadiusFeed_getRadiusFeed_posts_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: GetRadiusFeed_getRadiusFeed_posts_group | null;
}

export interface GetRadiusFeed_getRadiusFeed {
  __typename: "Feed";
  id: string | null;
  posts: GetRadiusFeed_getRadiusFeed_posts[] | null;
}

export interface GetRadiusFeed {
  getRadiusFeed: GetRadiusFeed_getRadiusFeed;
}

export interface GetRadiusFeedVariables {
  feedId?: string | null;
  regionId: string;
  point: PointInput;
  radius: number;
  position?: number | null;
  limit?: number | null;
}
