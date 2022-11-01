/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaType, ListingTransactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPopularListingsByQuiz
// ====================================================

export interface GetPopularListingsByQuiz_getPopularListingsByQuiz_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetPopularListingsByQuiz_getPopularListingsByQuiz_media {
  __typename: "Media";
  url: string;
  type: MediaType;
  description: string;
  sortKey: number;
}

export interface GetPopularListingsByQuiz_getPopularListingsByQuiz_listingInfo {
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

export interface GetPopularListingsByQuiz_getPopularListingsByQuiz_associates {
  __typename: "ListingAssociates";
  brokerName: string | null;
}

export interface GetPopularListingsByQuiz_getPopularListingsByQuiz {
  __typename: "OverviewListing";
  id: string;
  isFavorite: boolean;
  regionSlug: string;
  internalID: string;
  point: GetPopularListingsByQuiz_getPopularListingsByQuiz_point;
  media: GetPopularListingsByQuiz_getPopularListingsByQuiz_media[] | null;
  isViewed: boolean;
  listingInfo: GetPopularListingsByQuiz_getPopularListingsByQuiz_listingInfo;
  associates: GetPopularListingsByQuiz_getPopularListingsByQuiz_associates | null;
}

export interface GetPopularListingsByQuiz {
  getPopularListingsByQuiz: GetPopularListingsByQuiz_getPopularListingsByQuiz[];
}

export interface GetPopularListingsByQuizVariables {
  quizId: string;
  regionId: string;
  limit: number;
  offset: number;
}
