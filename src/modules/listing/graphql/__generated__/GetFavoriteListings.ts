/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingTransactionType, ListingOrder, MediaType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetFavoriteListings
// ====================================================

export interface GetFavoriteListings_getFavoriteListings_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetFavoriteListings_getFavoriteListings_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetFavoriteListings_getFavoriteListings_listingInfo {
  __typename: "ListingInfo";
  status: string;
  transactionType: ListingTransactionType;
  propertyType: string;
  propertySubType: string;
  daysOnMarket: number;
  price: number;
  address: string;
  unit: string | null;
  bedrooms: number;
  bathrooms: number;
  livingAreaSquareFeet: number | null;
  pricePerSquareFoot: number | null;
}

export interface GetFavoriteListings_getFavoriteListings_associates {
  __typename: "ListingAssociates";
  brokerName: string | null;
}

export interface GetFavoriteListings_getFavoriteListings {
  __typename: "OverviewListing";
  id: string;
  isFavorite: boolean;
  regionSlug: string;
  internalID: string;
  point: GetFavoriteListings_getFavoriteListings_point;
  isViewed: boolean;
  media: GetFavoriteListings_getFavoriteListings_media[] | null;
  listingInfo: GetFavoriteListings_getFavoriteListings_listingInfo;
  associates: GetFavoriteListings_getFavoriteListings_associates | null;
}

export interface GetFavoriteListings {
  getFavoriteListings: GetFavoriteListings_getFavoriteListings[];
}

export interface GetFavoriteListingsVariables {
  transactionType: ListingTransactionType;
  order?: ListingOrder | null;
  limit: number;
  offset: number;
}
