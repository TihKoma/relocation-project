/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPostInput, MediaType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditPost
// ====================================================

export interface EditPost_editPost_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface EditPost_editPost {
  __typename: "Post";
  content: string;
  id: string;
  createdAt: any;
  regionId: string;
  geoData: any | null;
  media: EditPost_editPost_media[] | null;
}

export interface EditPost {
  editPost: EditPost_editPost | null;
}

export interface EditPostVariables {
  postId: string;
  input: EditPostInput;
}
