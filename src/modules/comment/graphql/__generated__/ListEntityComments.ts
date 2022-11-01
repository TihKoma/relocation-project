/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ListEntityComments
// ====================================================

export interface ListEntityComments_listEntityComments_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface ListEntityComments_listEntityComments_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface ListEntityComments_listEntityComments_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface ListEntityComments_listEntityComments_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface ListEntityComments_listEntityComments_replies_comment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface ListEntityComments_listEntityComments_replies_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface ListEntityComments_listEntityComments_replies_userReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface ListEntityComments_listEntityComments_replies_reactions {
  __typename: "Reactions";
  angry: number;
  funny: number;
  like: number;
  sad: number;
  super: number;
  total: number;
}

export interface ListEntityComments_listEntityComments_replies {
  __typename: "FeedComment";
  comment: ListEntityComments_listEntityComments_replies_comment;
  user: ListEntityComments_listEntityComments_replies_user;
  userReaction: ListEntityComments_listEntityComments_replies_userReaction | null;
  reactions: ListEntityComments_listEntityComments_replies_reactions;
}

export interface ListEntityComments_listEntityComments {
  __typename: "FeedComment";
  comment: ListEntityComments_listEntityComments_comment;
  user: ListEntityComments_listEntityComments_user;
  reactions: ListEntityComments_listEntityComments_reactions;
  userReaction: ListEntityComments_listEntityComments_userReaction | null;
  replies: ListEntityComments_listEntityComments_replies[] | null;
}

export interface ListEntityComments {
  listEntityComments: ListEntityComments_listEntityComments[] | null;
}

export interface ListEntityCommentsVariables {
  entityId: string;
  page?: number | null;
  limit?: number | null;
}
