/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindQuizRegionGroups
// ====================================================

export interface FindQuizRegionGroups_findQuizRegionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface FindQuizRegionGroups {
  findQuizRegionGroups: FindQuizRegionGroups_findQuizRegionGroups[] | null;
}

export interface FindQuizRegionGroupsVariables {
  query: string;
}
