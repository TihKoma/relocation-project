import { gql, TypedDocumentNode } from '@apollo/client'

import { GetUserProfile } from './__generated__/GetUserProfile'

export const QUERY_GET_USER_PROFILE: TypedDocumentNode<GetUserProfile> = gql`
  query GetUserProfile {
    getUserProfile {
      id
      userId
      userName
      firstName
      lastName
      gender
      birthdate
      bio
      subscriptionPlan
      phone
      photoUrl
      coverUrl
      isFilled
      createdAt
      email
      tags
      followingsCount
      newNotificationsCount
    }
  }
`

export type { GetUserProfile_getUserProfile as GraphqlProfile } from './__generated__/GetUserProfile'
