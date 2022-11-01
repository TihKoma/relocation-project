/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaType, ListingTransactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPopularListingsByRegion
// ====================================================

export interface GetPopularListingsByRegion_getPopularListingByRegion_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetPopularListingsByRegion_getPopularListingByRegion_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetPopularListingsByRegion_getPopularListingByRegion_listingInfo {
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

export interface GetPopularListingsByRegion_getPopularListingByRegion_associates {
  __typename: "ListingAssociates";
  brokerName: string | null;
}

export interface GetPopularListingsByRegion_getPopularListingByRegion {
  __typename: "OverviewListing";
  id: string;
  regionSlug: string;
  internalID: string;
  point: GetPopularListingsByRegion_getPopularListingByRegion_point;
  media: GetPopularListingsByRegion_getPopularListingByRegion_media[] | null;
  isViewed: boolean;
  isFavorite: boolean;
  listingInfo: GetPopularListingsByRegion_getPopularListingByRegion_listingInfo;
  associates: GetPopularListingsByRegion_getPopularListingByRegion_associates | null;
}

export interface GetPopularListingsByRegion {
  getPopularListingByRegion: GetPopularListingsByRegion_getPopularListingByRegion[];
}

export interface GetPopularListingsByRegionVariables {
  regionId: string;
  limit: number;
  offset: number;
}
