/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ListReactionTypes
// ====================================================

export interface ListReactionTypes_listReactionTypes {
  __typename: "ReactionTypeData";
  reactionType: ReactionType;
  svgUrl: string;
}

export interface ListReactionTypes {
  listReactionTypes: ListReactionTypes_listReactionTypes[] | null;
}
