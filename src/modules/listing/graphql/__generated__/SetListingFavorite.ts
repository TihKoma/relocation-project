/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetListingFavorite
// ====================================================

export interface SetListingFavorite_setListingFavorite {
  __typename: "Result";
  status: boolean;
}

export interface SetListingFavorite {
  setListingFavorite: SetListingFavorite_setListingFavorite | null;
}

export interface SetListingFavoriteVariables {
  id: string;
  isFavorite: boolean;
}
