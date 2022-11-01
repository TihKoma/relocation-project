/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizStepResultSliderInput, QuizStepSliderType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuizWithSlider
// ====================================================

export interface UpdateQuizWithSlider_updateQuizWithSlider_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups" | "QuizStepResultLocations" | "QuizStepResultBubbles" | "QuizStepResultSelect" | "QuizStepResultMultiSelect";
}

export interface UpdateQuizWithSlider_updateQuizWithSlider_steps_result_QuizStepResultSlider {
  __typename: "QuizStepResultSlider";
  choiceId: string;
  type: QuizStepSliderType;
  value: number;
}

export type UpdateQuizWithSlider_updateQuizWithSlider_steps_result = UpdateQuizWithSlider_updateQuizWithSlider_steps_result_QuizStepResultRegionGroups | UpdateQuizWithSlider_updateQuizWithSlider_steps_result_QuizStepResultSlider;

export interface UpdateQuizWithSlider_updateQuizWithSlider_steps {
  __typename: "QuizStep";
  result: UpdateQuizWithSlider_updateQuizWithSlider_steps_result | null;
}

export interface UpdateQuizWithSlider_updateQuizWithSlider {
  __typename: "Quiz";
  id: string;
  steps: UpdateQuizWithSlider_updateQuizWithSlider_steps[];
}

export interface UpdateQuizWithSlider {
  updateQuizWithSlider: UpdateQuizWithSlider_updateQuizWithSlider | null;
}

export interface UpdateQuizWithSliderVariables {
  id: string;
  stepId: string;
  input?: QuizStepResultSliderInput | null;
}
