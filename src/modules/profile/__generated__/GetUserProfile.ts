/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, SubscriptionPlan } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetUserProfile
// ====================================================

export interface GetUserProfile_getUserProfile {
  __typename: "Profile";
  id: string;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  birthdate: any | null;
  bio: string;
  subscriptionPlan: SubscriptionPlan;
  phone: string;
  photoUrl: string;
  coverUrl: string;
  isFilled: boolean;
  createdAt: any;
  email: string | null;
  tags: string[];
  followingsCount: number;
  newNotificationsCount: number;
}

export interface GetUserProfile {
  getUserProfile: GetUserProfile_getUserProfile | null;
}
