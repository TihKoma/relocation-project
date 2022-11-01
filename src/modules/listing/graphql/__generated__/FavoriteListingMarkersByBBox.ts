/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingTransactionType, BBoxInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FavoriteListingMarkersByBBox
// ====================================================

export interface FavoriteListingMarkersByBBox {
  favoriteListingMarkersByBbox: any | null;
}

export interface FavoriteListingMarkersByBBoxVariables {
  transactionType: ListingTransactionType;
  bbox: BBoxInput;
}
