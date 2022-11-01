/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { searchNotificationsRequest, NotificationTargetType, NotificationType, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchNotifications
// ====================================================

export interface SearchNotifications_searchNotifications_notifications_entities_FeedPost_post {
  __typename: "Post";
  id: string;
  content: string;
  slug: string | null;
}

export interface SearchNotifications_searchNotifications_notifications_entities_FeedPost {
  __typename: "FeedPost";
  post: SearchNotifications_searchNotifications_notifications_entities_FeedPost_post;
}

export interface SearchNotifications_searchNotifications_notifications_entities_Comment {
  __typename: "Comment";
  id: string;
  text: string;
}

export interface SearchNotifications_searchNotifications_notifications_entities_PublicProfileNotification {
  __typename: "PublicProfileNotification";
  id: string;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  subscribed: boolean;
}

export interface SearchNotifications_searchNotifications_notifications_entities_Reaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface SearchNotifications_searchNotifications_notifications_entities_SubscriptionModel {
  __typename: "SubscriptionModel";
  id: string;
}

export type SearchNotifications_searchNotifications_notifications_entities = SearchNotifications_searchNotifications_notifications_entities_FeedPost | SearchNotifications_searchNotifications_notifications_entities_Comment | SearchNotifications_searchNotifications_notifications_entities_PublicProfileNotification | SearchNotifications_searchNotifications_notifications_entities_Reaction | SearchNotifications_searchNotifications_notifications_entities_SubscriptionModel;

export interface SearchNotifications_searchNotifications_notifications {
  __typename: "Notification";
  createdAt: any;
  id: string;
  /**
   * is read in notifications list
   */
  isOld: boolean;
  isRead: boolean;
  targetID: string;
  targetType: NotificationTargetType;
  type: NotificationType;
  updatedAt: any;
  userID: string;
  entities: SearchNotifications_searchNotifications_notifications_entities[] | null;
}

export interface SearchNotifications_searchNotifications_status {
  __typename: "ResponseStatus";
  /**
   * total docs on current page
   */
  length: number;
  /**
   * total docs
   */
  total: number;
}

export interface SearchNotifications_searchNotifications {
  __typename: "searchNotificationsResponse";
  notifications: SearchNotifications_searchNotifications_notifications[] | null;
  status: SearchNotifications_searchNotifications_status;
}

export interface SearchNotifications {
  searchNotifications: SearchNotifications_searchNotifications | null;
}

export interface SearchNotificationsVariables {
  input: searchNotificationsRequest;
}
