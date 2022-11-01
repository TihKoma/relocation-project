/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CommentFields
// ====================================================

export interface CommentFields_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface CommentFields_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface CommentFields_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface CommentFields_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface CommentFields_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface CommentFields_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface CommentFields_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface CommentFields_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface CommentFields_replies {
  __typename: "FeedComment";
  comment: CommentFields_replies_comment;
  user: CommentFields_replies_user;
  userReaction: CommentFields_replies_userReaction | null;
  reactions: CommentFields_replies_reactions;
}

export interface CommentFields {
  __typename: "FeedComment";
  comment: CommentFields_comment;
  user: CommentFields_user;
  reactions: CommentFields_reactions;
  userReaction: CommentFields_userReaction | null;
  replies: CommentFields_replies[] | null;
}
