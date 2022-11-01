/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemovePost
// ====================================================

export interface RemovePost_removePost {
  __typename: "Result";
  status: boolean;
}

export interface RemovePost {
  removePost: RemovePost_removePost | null;
}

export interface RemovePostVariables {
  postId: string;
}
