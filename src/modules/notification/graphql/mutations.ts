import { gql, TypedDocumentNode } from '@apollo/client'

import {
  MarkNotificationAsRead,
  MarkNotificationAsReadVariables,
} from './__generated__/MarkNotificationAsRead'
import {
  MarkNotificationsAsOld,
  MarkNotificationsAsOldVariables,
} from './__generated__/MarkNotificationsAsOld'

export const MUTATION_MARK_NOTIFICATIONS_AS_OLD: TypedDocumentNode<
  MarkNotificationsAsOld,
  MarkNotificationsAsOldVariables
> = gql`
  mutation MarkNotificationsAsOld($notificationIDs: [ID!]) {
    markNotificationsAsOld(notificationIDs: $notificationIDs)
  }
`

export const MUTATION_MARK_NOTIFICATION_AS_READ: TypedDocumentNode<
  MarkNotificationAsRead,
  MarkNotificationAsReadVariables
> = gql`
  mutation MarkNotificationAsRead($notificationID: ID!) {
    markNotificationAsRead(notificationID: $notificationID)
  }
`
