import { gql, TypedDocumentNode } from '@apollo/client'

import {
  SearchNotifications,
  SearchNotificationsVariables,
} from './__generated__/SearchNotifications'

export const QUERY_SEARCH_NOTIFICATIONS: TypedDocumentNode<
  SearchNotifications,
  SearchNotificationsVariables
> = gql`
  query SearchNotifications($input: searchNotificationsRequest!) {
    searchNotifications(input: $input) {
      notifications {
        createdAt
        id
        isOld
        isRead
        targetID
        targetType
        type
        updatedAt
        userID
        entities {
          __typename
          ... on FeedPost {
            post {
              id
              content
              slug
            }
          }
          ... on Comment {
            id
            text
          }
          ... on PublicProfileNotification {
            id
            userId
            userName
            firstName
            lastName
            photoUrl
            subscribed
          }
          ... on Reaction {
            type
          }
          ... on SubscriptionModel {
            id
          }
        }
      }
      status {
        length
        total
      }
    }
  }
`
