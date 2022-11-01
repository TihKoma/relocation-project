/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddReactionInput, ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddReaction
// ====================================================

export interface AddReaction_addReaction {
  __typename: "Reaction";
  type: ReactionType;
}

export interface AddReaction {
  addReaction: AddReaction_addReaction | null;
}

export interface AddReactionVariables {
  input: AddReactionInput;
}
