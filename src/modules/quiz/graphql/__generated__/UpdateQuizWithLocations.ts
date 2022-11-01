/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizStepResultLocationsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuizWithLocations
// ====================================================

export interface UpdateQuizWithLocations_updateQuizWithLocations_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups" | "QuizStepResultBubbles" | "QuizStepResultSelect" | "QuizStepResultMultiSelect" | "QuizStepResultSlider";
}

export interface UpdateQuizWithLocations_updateQuizWithLocations_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations";
  features: any[];
}

export type UpdateQuizWithLocations_updateQuizWithLocations_steps_result = UpdateQuizWithLocations_updateQuizWithLocations_steps_result_QuizStepResultRegionGroups | UpdateQuizWithLocations_updateQuizWithLocations_steps_result_QuizStepResultLocations;

export interface UpdateQuizWithLocations_updateQuizWithLocations_steps {
  __typename: "QuizStep";
  result: UpdateQuizWithLocations_updateQuizWithLocations_steps_result | null;
}

export interface UpdateQuizWithLocations_updateQuizWithLocations {
  __typename: "Quiz";
  id: string;
  steps: UpdateQuizWithLocations_updateQuizWithLocations_steps[];
}

export interface UpdateQuizWithLocations {
  updateQuizWithLocations: UpdateQuizWithLocations_updateQuizWithLocations | null;
}

export interface UpdateQuizWithLocationsVariables {
  id: string;
  stepId: string;
  input?: QuizStepResultLocationsInput | null;
}
