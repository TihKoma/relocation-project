import { gql, TypedDocumentNode } from '@apollo/client'

import {
  ListFollowedRegions,
  ListFollowedRegionsVariables,
} from './__generated__/ListFollowedRegions'
import {
  ListFollowedUsers,
  ListFollowedUsersVariables,
} from './__generated__/ListFollowedUsers'
import {
  ListFollowers,
  ListFollowersVariables,
} from './__generated__/ListFollowers'
import {
  ListUserSubscriptions,
  ListUserSubscriptionsVariables,
} from './__generated__/ListUserSubscriptions'

export const QUERY_LIST_FOLLOWED_REGIONS: TypedDocumentNode<
  ListFollowedRegions,
  ListFollowedRegionsVariables
> = gql`
  query ListFollowedRegions(
    $userId: ID!
    $page: Int
    $limit: Int
    $position: Int
  ) {
    listFollowedRegions(
      userId: $userId
      page: $page
      limit: $limit
      position: $position
    ) {
      regions {
        id
        name
        subscribed
        subscribersCount
        slug
        PhotoUrl
        subtitle
      }
      total
    }
  }
`
export const QUERY_LIST_FOLLOWED_USERS: TypedDocumentNode<
  ListFollowedUsers,
  ListFollowedUsersVariables
> = gql`
  query ListFollowedUsers(
    $userId: ID!
    $page: Int
    $limit: Int
    $position: Int
  ) {
    listFollowedUsers(
      userId: $userId
      page: $page
      limit: $limit
      position: $position
    ) {
      users {
        id
        userId
        firstName
        lastName
        userName
        photoUrl
        subscribed
      }
      total
    }
  }
`
export const QUERY_LIST_USER_SUBSCRIPTIONS: TypedDocumentNode<
  ListUserSubscriptions,
  ListUserSubscriptionsVariables
> = gql`
  query ListUserSubscriptions($userId: ID!) {
    listFollowedRegions(userId: $userId) {
      regions {
        id
        name
        subscribed
        subscribersCount
        slug
        PhotoUrl
      }
      total
    }
    listFollowedUsers(userId: $userId) {
      users {
        id
        userId
        firstName
        lastName
        userName
        photoUrl
      }
      total
    }
  }
`

export const QUERY_LIST_FOLLOWERS: TypedDocumentNode<
  ListFollowers,
  ListFollowersVariables
> = gql`
  query ListFollowers(
    $subscriptableId: ID!
    $page: Int
    $limit: Int
    $position: Int
  ) {
    listFollowers(
      subscriptableId: $subscriptableId
      page: $page
      limit: $limit
      position: $position
    ) {
      followers {
        bio
        coverUrl
        firstName
        followersCount
        followingUsersCount
        id
        isFilled
        lastName
        photoUrl
        subscribed
        userId
        userName
      }
      total
    }
  }
`
