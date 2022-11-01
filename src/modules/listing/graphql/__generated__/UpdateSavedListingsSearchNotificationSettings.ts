/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationSettingsSavedListingsSearchInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSavedListingsSearchNotificationSettings
// ====================================================

export interface UpdateSavedListingsSearchNotificationSettings_updateSavedListingsSearchNotificationSettings {
  __typename: "Result";
  status: boolean;
}

export interface UpdateSavedListingsSearchNotificationSettings {
  updateSavedListingsSearchNotificationSettings: UpdateSavedListingsSearchNotificationSettings_updateSavedListingsSearchNotificationSettings | null;
}

export interface UpdateSavedListingsSearchNotificationSettingsVariables {
  id: string;
  settings: NotificationSettingsSavedListingsSearchInput;
}
