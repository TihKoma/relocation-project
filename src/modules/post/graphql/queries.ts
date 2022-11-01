import { TypedDocumentNode } from '@apollo/client'
import gql from 'graphql-tag'

import {
  GetPostBySlug,
  GetPostBySlugVariables,
} from '@/modules/post/graphql/__generated__/GetPostBySlug'
import {
  GetPostsByUser,
  GetPostsByUserVariables,
} from '@/modules/post/graphql/__generated__/GetPostsByUser'

import { GetPostById, GetPostByIdVariables } from './__generated__/GetPostById'
import { FRAGMENT_POST_FIELDS } from './fragments'

export const QUERY_GET_POST_BY_ID: TypedDocumentNode<
  GetPostById,
  GetPostByIdVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}

  query GetPostById($id: ID!) {
    getPostById(id: $id) {
      ...PostFields
    }
  }
`

export const QUERY_GET_POST_BY_SLUG: TypedDocumentNode<
  GetPostBySlug,
  GetPostBySlugVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}

  query GetPostBySlug($slug: String!) {
    getPostBySlug(slug: $slug) {
      ...PostFields
    }
  }
`

export const QUERY_GET_POSTS_BY_USER: TypedDocumentNode<
  GetPostsByUser,
  GetPostsByUserVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}

  query GetPostsByUser($userId: ID!, $page: Int, $limit: Int) {
    listPostsByUser(userId: $userId, page: $page, limit: $limit) {
      ...PostFields
    }
  }
`
