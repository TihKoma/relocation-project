import { gql } from '@apollo/client'

export const FRAGMENT_USER_FIELDS = gql`
  fragment UserFields on FeedUser {
    userId
    firstName
    lastName
    photoUrl
    userName
    isSubscribed
  }
`

export const FRAGMENT_PUBLIC_PROFILE_FIELDS = gql`
  fragment PublicProfileFields on PublicProfile {
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
`
