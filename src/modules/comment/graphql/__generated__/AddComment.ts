/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddCommentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddComment
// ====================================================

export interface AddComment_addComment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface AddComment {
  addComment: AddComment_addComment | null;
}

export interface AddCommentVariables {
  input: AddCommentInput;
}
