/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelocationSaveUserProjectInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RelocationSaveProject
// ====================================================

export interface RelocationSaveProject_relocationSaveProject {
  __typename: "RelocationProject";
  id: string;
  whereFrom: string | null;
  whereFromRegionId: string | null;
  whereTo: string | null;
  whereToRegionId: string | null;
  isQuizPassed: boolean | null;
}

export interface RelocationSaveProject {
  relocationSaveProject: RelocationSaveProject_relocationSaveProject | null;
}

export interface RelocationSaveProjectVariables {
  input: RelocationSaveUserProjectInput;
  resetProject?: boolean | null;
}
