/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserProfile
// ====================================================

export interface UpdateUserProfile_updateUserProfile {
  __typename: "Profile";
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  phone: string;
  photoUrl: string;
  coverUrl: string;
}

export interface UpdateUserProfile {
  updateUserProfile: UpdateUserProfile_updateUserProfile | null;
}

export interface UpdateUserProfileVariables {
  input: UpdateProfileInput;
}
