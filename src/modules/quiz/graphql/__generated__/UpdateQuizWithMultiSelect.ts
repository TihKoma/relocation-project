/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizStepResultMultiSelectInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuizWithMultiSelect
// ====================================================

export interface UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups" | "QuizStepResultLocations" | "QuizStepResultBubbles" | "QuizStepResultSelect" | "QuizStepResultSlider";
}

export interface UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps_result_QuizStepResultMultiSelect {
  __typename: "QuizStepResultMultiSelect";
  filters: string[];
  choiceId: string;
}

export type UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps_result = UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps_result_QuizStepResultRegionGroups | UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps_result_QuizStepResultMultiSelect;

export interface UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps {
  __typename: "QuizStep";
  result: UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps_result | null;
}

export interface UpdateQuizWithMultiSelect_updateQuizWithMultiSelect {
  __typename: "Quiz";
  id: string;
  steps: UpdateQuizWithMultiSelect_updateQuizWithMultiSelect_steps[];
}

export interface UpdateQuizWithMultiSelect {
  updateQuizWithMultiSelect: UpdateQuizWithMultiSelect_updateQuizWithMultiSelect | null;
}

export interface UpdateQuizWithMultiSelectVariables {
  id: string;
  stepId: string;
  input?: QuizStepResultMultiSelectInput | null;
}
