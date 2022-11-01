/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizStepResultSelectInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuizWithSelect
// ====================================================

export interface UpdateQuizWithSelect_updateQuizWithSelect_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups" | "QuizStepResultLocations" | "QuizStepResultBubbles" | "QuizStepResultMultiSelect" | "QuizStepResultSlider";
}

export interface UpdateQuizWithSelect_updateQuizWithSelect_steps_result_QuizStepResultSelect {
  __typename: "QuizStepResultSelect";
  filter: string;
  choiceId: string;
}

export type UpdateQuizWithSelect_updateQuizWithSelect_steps_result = UpdateQuizWithSelect_updateQuizWithSelect_steps_result_QuizStepResultRegionGroups | UpdateQuizWithSelect_updateQuizWithSelect_steps_result_QuizStepResultSelect;

export interface UpdateQuizWithSelect_updateQuizWithSelect_steps {
  __typename: "QuizStep";
  result: UpdateQuizWithSelect_updateQuizWithSelect_steps_result | null;
}

export interface UpdateQuizWithSelect_updateQuizWithSelect {
  __typename: "Quiz";
  id: string;
  steps: UpdateQuizWithSelect_updateQuizWithSelect_steps[];
}

export interface UpdateQuizWithSelect {
  updateQuizWithSelect: UpdateQuizWithSelect_updateQuizWithSelect | null;
}

export interface UpdateQuizWithSelectVariables {
  id: string;
  stepId: string;
  input?: QuizStepResultSelectInput | null;
}
