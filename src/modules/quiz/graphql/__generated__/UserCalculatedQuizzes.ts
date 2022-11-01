/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizState, StepType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserCalculatedQuizzes
// ====================================================

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepLocations {
  __typename: "QuizStepLocations";
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepBubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepBubbles {
  __typename: "QuizStepBubbles";
  bubbles: UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepBubbles_bubbles[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepSelect {
  __typename: "QuizStepSelect";
  options: UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepSelect_options[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepMultiSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepMultiSelect {
  __typename: "QuizStepMultiSelect";
  options: UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepMultiSelect_options[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepTabSliders {
  __typename: "QuizStepTabSliders";
  name: string;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepRegionGroups {
  __typename: "QuizStepRegionGroups";
  name: string;
}

export type UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload = UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepLocations | UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepBubbles | UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepSelect | UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepMultiSelect | UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepTabSliders | UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload_QuizStepRegionGroups;

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations";
  features: any[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultBubbles {
  __typename: "QuizStepResultBubbles";
  choices: string[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultSelect {
  __typename: "QuizStepResultSelect";
  filter: string;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultMultiSelect {
  __typename: "QuizStepResultMultiSelect";
  filters: string[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultSlider {
  __typename: "QuizStepResultSlider";
  value: number;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultRegionGroups_regionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups";
  regionGroups: UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultRegionGroups_regionGroups[];
}

export type UserCalculatedQuizzes_userCalculatedQuizzes_steps_result = UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultLocations | UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultBubbles | UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultSelect | UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultMultiSelect | UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultSlider | UserCalculatedQuizzes_userCalculatedQuizzes_steps_result_QuizStepResultRegionGroups;

export interface UserCalculatedQuizzes_userCalculatedQuizzes_steps {
  __typename: "QuizStep";
  id: string;
  type: StepType;
  entity: string;
  payload: UserCalculatedQuizzes_userCalculatedQuizzes_steps_payload;
  result: UserCalculatedQuizzes_userCalculatedQuizzes_steps_result | null;
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes_result {
  __typename: "QuizResult";
  searchAreas: string[];
}

export interface UserCalculatedQuizzes_userCalculatedQuizzes {
  __typename: "Quiz";
  id: string;
  userId: string | null;
  state: QuizState;
  steps: UserCalculatedQuizzes_userCalculatedQuizzes_steps[];
  result: UserCalculatedQuizzes_userCalculatedQuizzes_result | null;
}

export interface UserCalculatedQuizzes {
  userCalculatedQuizzes: UserCalculatedQuizzes_userCalculatedQuizzes[] | null;
}
