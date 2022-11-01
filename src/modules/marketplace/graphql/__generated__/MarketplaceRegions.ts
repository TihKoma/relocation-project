/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarketplaceRegionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MarketplaceRegions
// ====================================================

export interface MarketplaceRegions_marketplaceRegions_cities {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
}

export interface MarketplaceRegions_marketplaceRegions_counties {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
}

export interface MarketplaceRegions_marketplaceRegions_neighborhoods {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
}

export interface MarketplaceRegions_marketplaceRegions_states {
  __typename: "Region";
  id: string;
  name: string;
  slug: string;
}

export interface MarketplaceRegions_marketplaceRegions {
  __typename: "MarketplaceRegionsResponse";
  cities: (MarketplaceRegions_marketplaceRegions_cities | null)[] | null;
  counties: (MarketplaceRegions_marketplaceRegions_counties | null)[] | null;
  neighborhoods: (MarketplaceRegions_marketplaceRegions_neighborhoods | null)[] | null;
  states: (MarketplaceRegions_marketplaceRegions_states | null)[] | null;
}

export interface MarketplaceRegions {
  marketplaceRegions: MarketplaceRegions_marketplaceRegions;
}

export interface MarketplaceRegionsVariables {
  input: MarketplaceRegionInput;
}
