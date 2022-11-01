/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetFeed
// ====================================================

export interface GetFeed_getFeed_posts_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetFeed_getFeed_posts_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: GetFeed_getFeed_posts_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface GetFeed_getFeed_posts_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetFeed_getFeed_posts_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface GetFeed_getFeed_posts_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetFeed_getFeed_posts_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetFeed_getFeed_posts_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetFeed_getFeed_posts_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetFeed_getFeed_posts_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetFeed_getFeed_posts_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetFeed_getFeed_posts_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface GetFeed_getFeed_posts_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface GetFeed_getFeed_posts_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface GetFeed_getFeed_posts_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface GetFeed_getFeed_posts_comments_replies {
  __typename: "FeedComment";
  comment: GetFeed_getFeed_posts_comments_replies_comment;
  user: GetFeed_getFeed_posts_comments_replies_user;
  userReaction: GetFeed_getFeed_posts_comments_replies_userReaction | null;
  reactions: GetFeed_getFeed_posts_comments_replies_reactions;
}

export interface GetFeed_getFeed_posts_comments {
  __typename: "FeedComment";
  comment: GetFeed_getFeed_posts_comments_comment;
  user: GetFeed_getFeed_posts_comments_user;
  reactions: GetFeed_getFeed_posts_comments_reactions;
  userReaction: GetFeed_getFeed_posts_comments_userReaction | null;
  replies: GetFeed_getFeed_posts_comments_replies[] | null;
}

export interface GetFeed_getFeed_posts_group {
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

export interface GetFeed_getFeed_posts {
  __typename: "FeedPost";
  post: GetFeed_getFeed_posts_post;
  user: GetFeed_getFeed_posts_user;
  region: GetFeed_getFeed_posts_region;
  userReaction: GetFeed_getFeed_posts_userReaction | null;
  reactions: GetFeed_getFeed_posts_reactions;
  commentsCount: number | null;
  comments: GetFeed_getFeed_posts_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: GetFeed_getFeed_posts_group | null;
}

export interface GetFeed_getFeed {
  __typename: "Feed";
  id: string | null;
  posts: GetFeed_getFeed_posts[] | null;
}

export interface GetFeed {
  getFeed: GetFeed_getFeed;
}

export interface GetFeedVariables {
  feedId: string;
  position?: number | null;
  limit?: number | null;
}
