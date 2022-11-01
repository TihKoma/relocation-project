/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RelocationProject
// ====================================================

export interface RelocationProject_relocationProject {
  __typename: "RelocationProject";
  id: string;
  whereFrom: string | null;
  whereFromRegionId: string | null;
  whereTo: string | null;
  whereToRegionId: string | null;
  isQuizPassed: boolean | null;
}

export interface RelocationProject {
  relocationProject: RelocationProject_relocationProject | null;
}
