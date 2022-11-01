import { gql, TypedDocumentNode } from '@apollo/client'

import {
  GetPublicProfile,
  GetPublicProfileVariables,
} from './__generated__/GetPublicProfile'

export const QUERY_GET_PUBLIC_PROFILE: TypedDocumentNode<
  GetPublicProfile,
  GetPublicProfileVariables
> = gql`
  query GetPublicProfile($userName: String!) {
    getPublicProfileByUserName(userName: $userName) {
      id
      firstName
      lastName
      userId
      subscribed
      bio
      followersCount
      followingsCount
      photoUrl
      coverUrl
      isFilled
      userName
      previewFollowers {
        photoUrl
      }
      previewFollowings {
        photoUrl
      }
    }
  }
`
