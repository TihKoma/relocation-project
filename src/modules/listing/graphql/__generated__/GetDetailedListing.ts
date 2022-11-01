/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaType, ListingTransactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDetailedListing
// ====================================================

export interface GetDetailedListing_getDetailedListing_point {
  __typename: "Point";
  lat: number;
  long: number;
}

export interface GetDetailedListing_getDetailedListing_media {
  __typename: "Media";
  type: MediaType;
  url: string;
}

export interface GetDetailedListing_getDetailedListing_listingInfo {
  __typename: "ListingInfo";
  status: string;
  transactionType: ListingTransactionType;
  propertyType: string;
  propertySubType: string;
  daysOnMarket: number;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  livingAreaSquareFeet: number | null;
  pricePerSquareFoot: number | null;
}

export interface GetDetailedListing_getDetailedListing_property {
  __typename: "ListingPropertyFacts";
  lotSize: number | null;
  stateOrProvince: string | null;
  city: string | null;
  county: string | null;
  postalCode: string | null;
  neighborhood: string | null;
  floors: number | null;
  parking: number | null;
  annualTaxes: number | null;
  hoa: number;
  yearBuilt: string | null;
  description: string | null;
}

export interface GetDetailedListing_getDetailedListing_openHouses {
  __typename: "ListingOpenHouse";
  from: any | null;
  till: any | null;
}

export interface GetDetailedListing_getDetailedListing_associates {
  __typename: "ListingAssociates";
  agentName: string;
  leadEmail: string | null;
  brokerName: string | null;
  source: string | null;
  mlsId: string | null;
  mlsNumber: string | null;
  sourceURL: string | null;
}

export interface GetDetailedListing_getDetailedListing_details_items {
  __typename: "ListingSectionItem";
  key: string;
  value: string;
}

export interface GetDetailedListing_getDetailedListing_details {
  __typename: "ListingSection";
  title: string;
  items: (GetDetailedListing_getDetailedListing_details_items | null)[] | null;
}

export interface GetDetailedListing_getDetailedListing {
  __typename: "DetailedListing";
  id: string;
  internalID: string;
  slug: string;
  isFavorite: boolean | null;
  regionId: string;
  point: GetDetailedListing_getDetailedListing_point;
  media: GetDetailedListing_getDetailedListing_media[] | null;
  listingInfo: GetDetailedListing_getDetailedListing_listingInfo;
  property: GetDetailedListing_getDetailedListing_property | null;
  openHouses: GetDetailedListing_getDetailedListing_openHouses[] | null;
  associates: GetDetailedListing_getDetailedListing_associates | null;
  disclaimer: string | null;
  details: (GetDetailedListing_getDetailedListing_details | null)[] | null;
}

export interface GetDetailedListing {
  getDetailedListing: GetDetailedListing_getDetailedListing | null;
}

export interface GetDetailedListingVariables {
  id: string;
}
