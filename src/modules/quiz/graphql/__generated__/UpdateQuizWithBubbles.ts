/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizStepResultBubblesInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuizWithBubbles
// ====================================================

export interface UpdateQuizWithBubbles_updateQuizWithBubbles_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups" | "QuizStepResultLocations" | "QuizStepResultSelect" | "QuizStepResultMultiSelect" | "QuizStepResultSlider";
}

export interface UpdateQuizWithBubbles_updateQuizWithBubbles_steps_result_QuizStepResultBubbles {
  __typename: "QuizStepResultBubbles";
  choices: string[];
}

export type UpdateQuizWithBubbles_updateQuizWithBubbles_steps_result = UpdateQuizWithBubbles_updateQuizWithBubbles_steps_result_QuizStepResultRegionGroups | UpdateQuizWithBubbles_updateQuizWithBubbles_steps_result_QuizStepResultBubbles;

export interface UpdateQuizWithBubbles_updateQuizWithBubbles_steps {
  __typename: "QuizStep";
  result: UpdateQuizWithBubbles_updateQuizWithBubbles_steps_result | null;
}

export interface UpdateQuizWithBubbles_updateQuizWithBubbles {
  __typename: "Quiz";
  id: string;
  steps: UpdateQuizWithBubbles_updateQuizWithBubbles_steps[];
}

export interface UpdateQuizWithBubbles {
  updateQuizWithBubbles: UpdateQuizWithBubbles_updateQuizWithBubbles | null;
}

export interface UpdateQuizWithBubblesVariables {
  id: string;
  stepId: string;
  input?: QuizStepResultBubblesInput | null;
}
