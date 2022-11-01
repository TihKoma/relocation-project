/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingFilterInput, ListingOrder, BBoxInput, MediaType, ListingTransactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetFilteredListings
// ====================================================

export interface GetFilteredListings_getFilteredListings_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetFilteredListings_getFilteredListings_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetFilteredListings_getFilteredListings_listingInfo {
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

export interface GetFilteredListings_getFilteredListings_associates {
  __typename: "ListingAssociates";
  brokerName: string | null;
}

export interface GetFilteredListings_getFilteredListings {
  __typename: "OverviewListing";
  id: string;
  isFavorite: boolean;
  regionSlug: string;
  internalID: string;
  point: GetFilteredListings_getFilteredListings_point;
  media: GetFilteredListings_getFilteredListings_media[] | null;
  isViewed: boolean;
  listingInfo: GetFilteredListings_getFilteredListings_listingInfo;
  associates: GetFilteredListings_getFilteredListings_associates | null;
}

export interface GetFilteredListings {
  getFilteredListings: GetFilteredListings_getFilteredListings[];
}

export interface GetFilteredListingsVariables {
  regionId: string;
  filter: ListingFilterInput;
  order?: ListingOrder | null;
  bbox?: BBoxInput | null;
  limit?: number | null;
  position?: number | null;
}
