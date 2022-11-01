/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetTagFeed
// ====================================================

export interface GetTagFeed_getTagFeed_posts_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetTagFeed_getTagFeed_posts_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: GetTagFeed_getTagFeed_posts_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface GetTagFeed_getTagFeed_posts_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetTagFeed_getTagFeed_posts_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface GetTagFeed_getTagFeed_posts_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetTagFeed_getTagFeed_posts_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetTagFeed_getTagFeed_posts_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetTagFeed_getTagFeed_posts_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetTagFeed_getTagFeed_posts_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetTagFeed_getTagFeed_posts_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetTagFeed_getTagFeed_posts_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetTagFeed_getTagFeed_posts_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetTagFeed_getTagFeed_posts_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetTagFeed_getTagFeed_posts_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetTagFeed_getTagFeed_posts_comments_replies {
  __typename: "FeedComment";
  comment: GetTagFeed_getTagFeed_posts_comments_replies_comment;
  user: GetTagFeed_getTagFeed_posts_comments_replies_user;
  userReaction: GetTagFeed_getTagFeed_posts_comments_replies_userReaction | null;
  reactions: GetTagFeed_getTagFeed_posts_comments_replies_reactions;
}

export interface GetTagFeed_getTagFeed_posts_comments {
  __typename: "FeedComment";
  comment: GetTagFeed_getTagFeed_posts_comments_comment;
  user: GetTagFeed_getTagFeed_posts_comments_user;
  reactions: GetTagFeed_getTagFeed_posts_comments_reactions;
  userReaction: GetTagFeed_getTagFeed_posts_comments_userReaction | null;
  replies: GetTagFeed_getTagFeed_posts_comments_replies[] | null;
}

export interface GetTagFeed_getTagFeed_posts_group {
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

export interface GetTagFeed_getTagFeed_posts {
  __typename: "FeedPost";
  post: GetTagFeed_getTagFeed_posts_post;
  user: GetTagFeed_getTagFeed_posts_user;
  region: GetTagFeed_getTagFeed_posts_region;
  userReaction: GetTagFeed_getTagFeed_posts_userReaction | null;
  reactions: GetTagFeed_getTagFeed_posts_reactions;
  commentsCount: number | null;
  comments: GetTagFeed_getTagFeed_posts_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: GetTagFeed_getTagFeed_posts_group | null;
}

export interface GetTagFeed_getTagFeed {
  __typename: "Feed";
  id: string | null;
  posts: GetTagFeed_getTagFeed_posts[] | null;
}

export interface GetTagFeed {
  getTagFeed: GetTagFeed_getTagFeed;
}

export interface GetTagFeedVariables {
  tag: string;
  feedId?: string | null;
  position?: number | null;
  limit?: number | null;
}
