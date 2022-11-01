/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingFilterInput, ListingOrder, BBoxInput, MediaType, ListingTransactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetFilteredListingsV2
// ====================================================

export interface GetFilteredListingsV2_getFilteredListingsV2_listings_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_listings_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_listings_listingInfo {
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

export interface GetFilteredListingsV2_getFilteredListingsV2_listings_associates {
  __typename: "ListingAssociates";
  brokerName: string | null;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_listings {
  __typename: "OverviewListing";
  id: string;
  isFavorite: boolean;
  regionSlug: string;
  internalID: string;
  point: GetFilteredListingsV2_getFilteredListingsV2_listings_point;
  media: GetFilteredListingsV2_getFilteredListingsV2_listings_media[] | null;
  isViewed: boolean;
  listingInfo: GetFilteredListingsV2_getFilteredListingsV2_listings_listingInfo;
  associates: GetFilteredListingsV2_getFilteredListingsV2_listings_associates | null;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_similar_listings_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_similar_listings_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_similar_listings_listingInfo {
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

export interface GetFilteredListingsV2_getFilteredListingsV2_similar_listings_associates {
  __typename: "ListingAssociates";
  brokerName: string | null;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_similar_listings {
  __typename: "OverviewListing";
  id: string;
  isFavorite: boolean;
  regionSlug: string;
  internalID: string;
  point: GetFilteredListingsV2_getFilteredListingsV2_similar_listings_point;
  media: GetFilteredListingsV2_getFilteredListingsV2_similar_listings_media[] | null;
  isViewed: boolean;
  listingInfo: GetFilteredListingsV2_getFilteredListingsV2_similar_listings_listingInfo;
  associates: GetFilteredListingsV2_getFilteredListingsV2_similar_listings_associates | null;
}

export interface GetFilteredListingsV2_getFilteredListingsV2_similar {
  __typename: "GetFilteredListingsSimilar";
  regionID: string;
  regionSlug: string;
  regionName: string;
  listings: GetFilteredListingsV2_getFilteredListingsV2_similar_listings[];
}

export interface GetFilteredListingsV2_getFilteredListingsV2 {
  __typename: "GetFilteredListingsResponse";
  listings: GetFilteredListingsV2_getFilteredListingsV2_listings[];
  similar: GetFilteredListingsV2_getFilteredListingsV2_similar | null;
}

export interface GetFilteredListingsV2 {
  getFilteredListingsV2: GetFilteredListingsV2_getFilteredListingsV2 | null;
}

export interface GetFilteredListingsV2Variables {
  regionId: string;
  filter: ListingFilterInput;
  order?: ListingOrder | null;
  bbox?: BBoxInput | null;
  limit: number;
  offset: number;
}
