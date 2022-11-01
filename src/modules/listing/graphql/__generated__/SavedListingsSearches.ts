/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingTransactionType, ListingBuildingCondition, ListingBuildingType, ListingBedrooms, ListingBathrooms } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SavedListingsSearches
// ====================================================

export interface SavedListingsSearches_savedListingsSearches_query {
  __typename: "ListingFilter";
  transactionType: ListingTransactionType;
  buildingCondition: ListingBuildingCondition[] | null;
  buildingType: ListingBuildingType[] | null;
  bedrooms: ListingBedrooms;
  bathrooms: ListingBathrooms;
  minPrice: number | null;
  maxPrice: number | null;
  minSquareFeets: number | null;
  maxSquareFeets: number | null;
  minLotSize: number | null;
  maxLotSize: number | null;
  minYearBuilt: number | null;
  maxYearBuilt: number | null;
  addressSlug: string | null;
  regionSlug: string | null;
}

export interface SavedListingsSearches_savedListingsSearches_notificationSettings {
  __typename: "NotificationSettingsSavedListingsSearch";
  sendEmailNotification: boolean;
}

export interface SavedListingsSearches_savedListingsSearches {
  __typename: "SavedListingsSearch";
  id: string;
  query: SavedListingsSearches_savedListingsSearches_query;
  notificationSettings: SavedListingsSearches_savedListingsSearches_notificationSettings;
  userId: string;
  regionId: string;
  regionName: string;
  createdAt: any;
  updatedAt: any | null;
}

export interface SavedListingsSearches {
  savedListingsSearches: SavedListingsSearches_savedListingsSearches[];
}

export interface SavedListingsSearchesVariables {
  limit: number;
  offset: number;
}
