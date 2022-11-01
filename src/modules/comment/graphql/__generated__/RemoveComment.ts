/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveComment
// ====================================================

export interface RemoveComment_removeComment {
  __typename: "Result";
  status: boolean;
}

export interface RemoveComment {
  removeComment: RemoveComment_removeComment | null;
}

export interface RemoveCommentVariables {
  commentId: string;
}
