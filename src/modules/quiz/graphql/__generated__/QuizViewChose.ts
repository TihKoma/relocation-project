/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizState, StepType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: QuizViewChose
// ====================================================

export interface QuizViewChose_steps_payload_QuizStepLocations {
  __typename: "QuizStepLocations";
}

export interface QuizViewChose_steps_payload_QuizStepBubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
}

export interface QuizViewChose_steps_payload_QuizStepBubbles {
  __typename: "QuizStepBubbles";
  bubbles: QuizViewChose_steps_payload_QuizStepBubbles_bubbles[];
}

export interface QuizViewChose_steps_payload_QuizStepSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
}

export interface QuizViewChose_steps_payload_QuizStepSelect {
  __typename: "QuizStepSelect";
  options: QuizViewChose_steps_payload_QuizStepSelect_options[];
}

export interface QuizViewChose_steps_payload_QuizStepMultiSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
}

export interface QuizViewChose_steps_payload_QuizStepMultiSelect {
  __typename: "QuizStepMultiSelect";
  options: QuizViewChose_steps_payload_QuizStepMultiSelect_options[];
}

export interface QuizViewChose_steps_payload_QuizStepTabSliders {
  __typename: "QuizStepTabSliders";
  name: string;
}

export interface QuizViewChose_steps_payload_QuizStepRegionGroups {
  __typename: "QuizStepRegionGroups";
  name: string;
}

export type QuizViewChose_steps_payload = QuizViewChose_steps_payload_QuizStepLocations | QuizViewChose_steps_payload_QuizStepBubbles | QuizViewChose_steps_payload_QuizStepSelect | QuizViewChose_steps_payload_QuizStepMultiSelect | QuizViewChose_steps_payload_QuizStepTabSliders | QuizViewChose_steps_payload_QuizStepRegionGroups;

export interface QuizViewChose_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations";
  features: any[];
}

export interface QuizViewChose_steps_result_QuizStepResultBubbles {
  __typename: "QuizStepResultBubbles";
  choices: string[];
}

export interface QuizViewChose_steps_result_QuizStepResultSelect {
  __typename: "QuizStepResultSelect";
  filter: string;
}

export interface QuizViewChose_steps_result_QuizStepResultMultiSelect {
  __typename: "QuizStepResultMultiSelect";
  filters: string[];
}

export interface QuizViewChose_steps_result_QuizStepResultSlider {
  __typename: "QuizStepResultSlider";
  value: number;
}

export interface QuizViewChose_steps_result_QuizStepResultRegionGroups_regionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface QuizViewChose_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups";
  regionGroups: QuizViewChose_steps_result_QuizStepResultRegionGroups_regionGroups[];
}

export type QuizViewChose_steps_result = QuizViewChose_steps_result_QuizStepResultLocations | QuizViewChose_steps_result_QuizStepResultBubbles | QuizViewChose_steps_result_QuizStepResultSelect | QuizViewChose_steps_result_QuizStepResultMultiSelect | QuizViewChose_steps_result_QuizStepResultSlider | QuizViewChose_steps_result_QuizStepResultRegionGroups;

export interface QuizViewChose_steps {
  __typename: "QuizStep";
  id: string;
  type: StepType;
  entity: string;
  payload: QuizViewChose_steps_payload;
  result: QuizViewChose_steps_result | null;
}

export interface QuizViewChose_result {
  __typename: "QuizResult";
  searchAreas: string[];
}

export interface QuizViewChose {
  __typename: "Quiz";
  id: string;
  userId: string | null;
  state: QuizState;
  steps: QuizViewChose_steps[];
  result: QuizViewChose_result | null;
}
