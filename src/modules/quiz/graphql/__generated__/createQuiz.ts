/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizState, StepType, QuizStepSliderType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createQuiz
// ====================================================

export interface createQuiz_createQuiz_result_locations_factorsScores {
  __typename: "QuizFactorScore";
  name: string;
  image: string;
  score: number;
}

export interface createQuiz_createQuiz_result_locations {
  __typename: "QuizResultLocation";
  id: string;
  subtitle: string;
  neighborhood: string;
  badges: string[] | null;
  image: string | null;
  score: number;
  factorsScores: createQuiz_createQuiz_result_locations_factorsScores[];
  subscribed: boolean;
  slug: string;
}

export interface createQuiz_createQuiz_result {
  __typename: "QuizResult";
  locations: createQuiz_createQuiz_result_locations[] | null;
  areaExpanded: boolean;
  searchAreas: string[];
}

export interface createQuiz_createQuiz_steps_payload_QuizStepLocations_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepLocations {
  __typename: "QuizStepLocations";
  title: string;
  name: string;
  placeholder: string;
  images: createQuiz_createQuiz_steps_payload_QuizStepLocations_images;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepBubbles_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepBubbles_bubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
  image: string;
  cantSelect: boolean;
  color: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepBubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
  image: string;
  cantSelect: boolean;
  color: string;
  bubbles: createQuiz_createQuiz_steps_payload_QuizStepBubbles_bubbles_bubbles[] | null;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepBubbles {
  __typename: "QuizStepBubbles";
  title: string;
  name: string;
  placeholder: string;
  images: createQuiz_createQuiz_steps_payload_QuizStepBubbles_images;
  bubbles: createQuiz_createQuiz_steps_payload_QuizStepBubbles_bubbles[];
}

export interface createQuiz_createQuiz_steps_payload_QuizStepSelect_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepSelect {
  __typename: "QuizStepSelect";
  title: string;
  subtitle: string;
  choiceId: string;
  name: string;
  placeholder: string;
  images: createQuiz_createQuiz_steps_payload_QuizStepSelect_images;
  options: createQuiz_createQuiz_steps_payload_QuizStepSelect_options[];
}

export interface createQuiz_createQuiz_steps_payload_QuizStepMultiSelect_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepMultiSelect_options {
  __typename: "QuizSelectOption";
  tabName: string;
  value: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepMultiSelect {
  __typename: "QuizStepMultiSelect";
  title: string;
  choiceId: string;
  name: string;
  placeholder: string;
  images: createQuiz_createQuiz_steps_payload_QuizStepMultiSelect_images;
  options: createQuiz_createQuiz_steps_payload_QuizStepMultiSelect_options[];
}

export interface createQuiz_createQuiz_steps_payload_QuizStepTabSliders_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepTabSliders_tabs_slider {
  __typename: "QuizStepTabSlider";
  maxVal: number;
  stepLen: number;
  type: QuizStepSliderType;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepTabSliders_tabs {
  __typename: "QuizStepTab";
  title: string;
  slider: createQuiz_createQuiz_steps_payload_QuizStepTabSliders_tabs_slider;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepTabSliders {
  __typename: "QuizStepTabSliders";
  title: string;
  name: string;
  placeholder: string;
  choiceId: string;
  images: createQuiz_createQuiz_steps_payload_QuizStepTabSliders_images;
  tabs: createQuiz_createQuiz_steps_payload_QuizStepTabSliders_tabs[];
}

export interface createQuiz_createQuiz_steps_payload_QuizStepRegionGroups_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface createQuiz_createQuiz_steps_payload_QuizStepRegionGroups {
  __typename: "QuizStepRegionGroups";
  title: string;
  name: string;
  placeholder: string;
  images: createQuiz_createQuiz_steps_payload_QuizStepRegionGroups_images;
}

export type createQuiz_createQuiz_steps_payload = createQuiz_createQuiz_steps_payload_QuizStepLocations | createQuiz_createQuiz_steps_payload_QuizStepBubbles | createQuiz_createQuiz_steps_payload_QuizStepSelect | createQuiz_createQuiz_steps_payload_QuizStepMultiSelect | createQuiz_createQuiz_steps_payload_QuizStepTabSliders | createQuiz_createQuiz_steps_payload_QuizStepRegionGroups;

export interface createQuiz_createQuiz_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations";
  features: any[];
}

export interface createQuiz_createQuiz_steps_result_QuizStepResultBubbles {
  __typename: "QuizStepResultBubbles";
  choices: string[];
}

export interface createQuiz_createQuiz_steps_result_QuizStepResultSelect {
  __typename: "QuizStepResultSelect";
  filter: string;
  choiceId: string;
}

export interface createQuiz_createQuiz_steps_result_QuizStepResultMultiSelect {
  __typename: "QuizStepResultMultiSelect";
  filters: string[];
  choiceId: string;
}

export interface createQuiz_createQuiz_steps_result_QuizStepResultSlider {
  __typename: "QuizStepResultSlider";
  choiceId: string;
  type: QuizStepSliderType;
  value: number;
}

export interface createQuiz_createQuiz_steps_result_QuizStepResultRegionGroups_regionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface createQuiz_createQuiz_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups";
  regionGroups: createQuiz_createQuiz_steps_result_QuizStepResultRegionGroups_regionGroups[];
}

export type createQuiz_createQuiz_steps_result = createQuiz_createQuiz_steps_result_QuizStepResultLocations | createQuiz_createQuiz_steps_result_QuizStepResultBubbles | createQuiz_createQuiz_steps_result_QuizStepResultSelect | createQuiz_createQuiz_steps_result_QuizStepResultMultiSelect | createQuiz_createQuiz_steps_result_QuizStepResultSlider | createQuiz_createQuiz_steps_result_QuizStepResultRegionGroups;

export interface createQuiz_createQuiz_steps {
  __typename: "QuizStep";
  id: string;
  type: StepType;
  entity: string;
  payload: createQuiz_createQuiz_steps_payload;
  result: createQuiz_createQuiz_steps_result | null;
}

export interface createQuiz_createQuiz {
  __typename: "Quiz";
  state: QuizState;
  id: string;
  userId: string | null;
  currentStepId: string | null;
  result: createQuiz_createQuiz_result | null;
  steps: createQuiz_createQuiz_steps[];
}

export interface createQuiz {
  createQuiz: createQuiz_createQuiz | null;
}
