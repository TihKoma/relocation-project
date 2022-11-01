/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ListReactionsByEntity
// ====================================================

export interface ListReactionsByEntity_listReactionsByEntity_user {
  __typename: "FeedUser";
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userName: string;
  isSubscribed: boolean | null;
}

export interface ListReactionsByEntity_listReactionsByEntity {
  __typename: "FeedReaction";
  id: string;
  user: ListReactionsByEntity_listReactionsByEntity_user;
  type: ReactionType;
}

export interface ListReactionsByEntity {
  listReactionsByEntity: ListReactionsByEntity_listReactionsByEntity[] | null;
}

export interface ListReactionsByEntityVariables {
  entityId: string;
  limit?: number | null;
  position?: number | null;
  reactionTypes?: (ReactionType | null)[] | null;
}
