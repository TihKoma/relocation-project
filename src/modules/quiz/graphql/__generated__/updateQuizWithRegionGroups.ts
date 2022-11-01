/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizStepResultRegionGroupsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateQuizWithRegionGroups
// ====================================================

export interface updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations" | "QuizStepResultBubbles" | "QuizStepResultSelect" | "QuizStepResultMultiSelect" | "QuizStepResultSlider";
}

export interface updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result_QuizStepResultRegionGroups_regionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups";
  regionGroups: updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result_QuizStepResultRegionGroups_regionGroups[];
}

export type updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result = updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result_QuizStepResultLocations | updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result_QuizStepResultRegionGroups;

export interface updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps {
  __typename: "QuizStep";
  result: updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps_result | null;
}

export interface updateQuizWithRegionGroups_updateQuizWithRegionGroups {
  __typename: "Quiz";
  id: string;
  steps: updateQuizWithRegionGroups_updateQuizWithRegionGroups_steps[];
}

export interface updateQuizWithRegionGroups {
  updateQuizWithRegionGroups: updateQuizWithRegionGroups_updateQuizWithRegionGroups | null;
}

export interface updateQuizWithRegionGroupsVariables {
  id: string;
  stepId: string;
  input?: QuizStepResultRegionGroupsInput | null;
}
