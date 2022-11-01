/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCommentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditComment
// ====================================================

export interface EditComment_editComment {
  __typename: "Comment";
  id: string;
  text: string;
  createdAt: any;
}

export interface EditComment {
  editComment: EditComment_editComment | null;
}

export interface EditCommentVariables {
  commentId: string;
  input: EditCommentInput;
}
