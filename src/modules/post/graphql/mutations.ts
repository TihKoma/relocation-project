import { gql, TypedDocumentNode } from '@apollo/client'

import { GeocodeFeature } from '@/modules/map'
import { PatchPath } from '@/modules/utils/types'

import { CreatePost, CreatePostVariables } from './__generated__/CreatePost'
import { EditPost, EditPostVariables } from './__generated__/EditPost'
import { RemovePost, RemovePostVariables } from './__generated__/RemovePost'

export const MUTATION_CREATE_POST: TypedDocumentNode<
  PatchPath<CreatePost, GeocodeFeature, 'createPost', 'geoData'>,
  CreatePostVariables
> = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      content
      id
      createdAt
      regionId
      geoData
      media {
        url
        type
        description
        sortKey
      }
    }
  }
`
export { MediaType, PostType } from '../../../../__generated__/globalTypes'

export const MUTATION_EDIT_POST: TypedDocumentNode<
  EditPost,
  EditPostVariables
> = gql`
  mutation EditPost($postId: ID!, $input: EditPostInput!) {
    editPost(postId: $postId, input: $input) {
      content
      id
      createdAt
      regionId
      geoData
      media {
        url
        type
        description
        sortKey
      }
    }
  }
`

export type { EditPost_editPost_media as Media } from './__generated__/EditPost'

export const MUTATION_REMOVE_POST: TypedDocumentNode<
  RemovePost,
  RemovePostVariables
> = gql`
  mutation RemovePost($postId: ID!) {
    removePost(postId: $postId) {
      status
    }
  }
`
