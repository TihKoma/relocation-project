/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePostInput, MediaType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface CreatePost_createPost {
  __typename: "Post";
  content: string;
  id: string;
  createdAt: any;
  regionId: string;
  geoData: any | null;
  media: CreatePost_createPost_media[] | null;
}

export interface CreatePost {
  createPost: CreatePost_createPost | null;
}

export interface CreatePostVariables {
  input: CreatePostInput;
}
