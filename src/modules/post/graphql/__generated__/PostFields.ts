/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType, MediaType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PostFields
// ====================================================

export interface PostFields_post_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface PostFields_post {
  __typename: "Post";
  id: string;
  userId: string;
  regionId: string;
  type: PostType;
  content: string;
  slug: string | null;
  media: PostFields_post_media[] | null;
  geoData: any | null;
  createdAt: any;
}

export interface PostFields_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface PostFields_region {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export interface PostFields_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface PostFields_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface PostFields_comments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface PostFields_comments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface PostFields_comments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface PostFields_comments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface PostFields_comments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface PostFields_comments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface PostFields_comments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface PostFields_comments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface PostFields_comments_replies {
  __typename: "FeedComment";
  comment: PostFields_comments_replies_comment;
  user: PostFields_comments_replies_user;
  userReaction: PostFields_comments_replies_userReaction | null;
  reactions: PostFields_comments_replies_reactions;
}

export interface PostFields_comments {
  __typename: "FeedComment";
  comment: PostFields_comments_comment;
  user: PostFields_comments_user;
  reactions: PostFields_comments_reactions;
  userReaction: PostFields_comments_userReaction | null;
  replies: PostFields_comments_replies[] | null;
}

export interface PostFields_group {
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

export interface PostFields {
  __typename: "FeedPost";
  post: PostFields_post;
  user: PostFields_user;
  region: PostFields_region;
  userReaction: PostFields_userReaction | null;
  reactions: PostFields_reactions;
  commentsCount: number | null;
  comments: PostFields_comments[] | null;
  /**
   * how many times post was viewed (total)
   */
  viewsCount: number | null;
  /**
   * if post linked to group
   */
  group: PostFields_group | null;
}
