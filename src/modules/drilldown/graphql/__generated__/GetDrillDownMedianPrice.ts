/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { drillDownMedianPriceRequest, HousingPropertyType, HousingRooms, HousingTransactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDrillDownMedianPrice
// ====================================================

export interface GetDrillDownMedianPrice_getDrillDownMedianPrice_data {
  __typename: "DrillDownHousingMedianPrice";
  locationId: string;
  locationSlug: string;
  locationName: string;
  locationType: string;
  MedianPrice: number;
}

export interface GetDrillDownMedianPrice_getDrillDownMedianPrice_filters_propertyType {
  __typename: "DrillDownHousingMedianPricePropertyFilter";
  name: string;
  type: HousingPropertyType;
  isActive: boolean;
  selected: boolean;
  inRequest: boolean;
}

export interface GetDrillDownMedianPrice_getDrillDownMedianPrice_filters_rooms {
  __typename: "DrillDownHousingMedianPriceRoomFilter";
  name: string;
  type: HousingRooms;
  isActive: boolean;
  selected: boolean;
  inRequest: boolean;
}

export interface GetDrillDownMedianPrice_getDrillDownMedianPrice_filters_tradeType {
  __typename: "DrillDownHousingMedianPriceTradeFilter";
  name: string;
  type: HousingTransactionType;
  isActive: boolean;
  selected: boolean;
  inRequest: boolean;
}

export interface GetDrillDownMedianPrice_getDrillDownMedianPrice_filters {
  __typename: "DrillDownHousingMedianPriceFilters";
  propertyType: GetDrillDownMedianPrice_getDrillDownMedianPrice_filters_propertyType[] | null;
  rooms: GetDrillDownMedianPrice_getDrillDownMedianPrice_filters_rooms[] | null;
  tradeType: GetDrillDownMedianPrice_getDrillDownMedianPrice_filters_tradeType[] | null;
}

export interface GetDrillDownMedianPrice_getDrillDownMedianPrice {
  __typename: "DrillDownHousingMedianPriceResponse";
  data: (GetDrillDownMedianPrice_getDrillDownMedianPrice_data | null)[];
  filters: GetDrillDownMedianPrice_getDrillDownMedianPrice_filters | null;
}

export interface GetDrillDownMedianPrice {
  getDrillDownMedianPrice: GetDrillDownMedianPrice_getDrillDownMedianPrice;
}

export interface GetDrillDownMedianPriceVariables {
  input: drillDownMedianPriceRequest;
}
