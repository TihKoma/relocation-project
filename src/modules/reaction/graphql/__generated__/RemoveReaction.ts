/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveReaction
// ====================================================

export interface RemoveReaction_removeReactionByEntity {
  __typename: "Result";
  status: boolean;
}

export interface RemoveReaction {
  removeReactionByEntity: RemoveReaction_removeReactionByEntity | null;
}

export interface RemoveReactionVariables {
  entityID: string;
}
