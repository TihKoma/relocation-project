/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuizState, StepType, QuizStepSliderType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: QuizFields
// ====================================================

export interface QuizFields_result_locations_factorsScores {
  __typename: "QuizFactorScore";
  name: string;
  image: string;
  score: number;
}

export interface QuizFields_result_locations {
  __typename: "QuizResultLocation";
  id: string;
  subtitle: string;
  neighborhood: string;
  badges: string[] | null;
  image: string | null;
  score: number;
  factorsScores: QuizFields_result_locations_factorsScores[];
  subscribed: boolean;
  slug: string;
}

export interface QuizFields_result {
  __typename: "QuizResult";
  locations: QuizFields_result_locations[] | null;
  areaExpanded: boolean;
  searchAreas: string[];
}

export interface QuizFields_steps_payload_QuizStepLocations_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizFields_steps_payload_QuizStepLocations {
  __typename: "QuizStepLocations";
  title: string;
  name: string;
  placeholder: string;
  images: QuizFields_steps_payload_QuizStepLocations_images;
}

export interface QuizFields_steps_payload_QuizStepBubbles_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizFields_steps_payload_QuizStepBubbles_bubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
  image: string;
  cantSelect: boolean;
  color: string;
}

export interface QuizFields_steps_payload_QuizStepBubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
  image: string;
  cantSelect: boolean;
  color: string;
  bubbles: QuizFields_steps_payload_QuizStepBubbles_bubbles_bubbles[] | null;
}

export interface QuizFields_steps_payload_QuizStepBubbles {
  __typename: "QuizStepBubbles";
  title: string;
  name: string;
  placeholder: string;
  images: QuizFields_steps_payload_QuizStepBubbles_images;
  bubbles: QuizFields_steps_payload_QuizStepBubbles_bubbles[];
}

export interface QuizFields_steps_payload_QuizStepSelect_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizFields_steps_payload_QuizStepSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface QuizFields_steps_payload_QuizStepSelect {
  __typename: "QuizStepSelect";
  title: string;
  subtitle: string;
  choiceId: string;
  name: string;
  placeholder: string;
  images: QuizFields_steps_payload_QuizStepSelect_images;
  options: QuizFields_steps_payload_QuizStepSelect_options[];
}

export interface QuizFields_steps_payload_QuizStepMultiSelect_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizFields_steps_payload_QuizStepMultiSelect_options {
  __typename: "QuizSelectOption";
  tabName: string;
  value: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface QuizFields_steps_payload_QuizStepMultiSelect {
  __typename: "QuizStepMultiSelect";
  title: string;
  choiceId: string;
  name: string;
  placeholder: string;
  images: QuizFields_steps_payload_QuizStepMultiSelect_images;
  options: QuizFields_steps_payload_QuizStepMultiSelect_options[];
}

export interface QuizFields_steps_payload_QuizStepTabSliders_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizFields_steps_payload_QuizStepTabSliders_tabs_slider {
  __typename: "QuizStepTabSlider";
  maxVal: number;
  stepLen: number;
  type: QuizStepSliderType;
}

export interface QuizFields_steps_payload_QuizStepTabSliders_tabs {
  __typename: "QuizStepTab";
  title: string;
  slider: QuizFields_steps_payload_QuizStepTabSliders_tabs_slider;
}

export interface QuizFields_steps_payload_QuizStepTabSliders {
  __typename: "QuizStepTabSliders";
  title: string;
  name: string;
  placeholder: string;
  choiceId: string;
  images: QuizFields_steps_payload_QuizStepTabSliders_images;
  tabs: QuizFields_steps_payload_QuizStepTabSliders_tabs[];
}

export interface QuizFields_steps_payload_QuizStepRegionGroups_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizFields_steps_payload_QuizStepRegionGroups {
  __typename: "QuizStepRegionGroups";
  title: string;
  name: string;
  placeholder: string;
  images: QuizFields_steps_payload_QuizStepRegionGroups_images;
}

export type QuizFields_steps_payload = QuizFields_steps_payload_QuizStepLocations | QuizFields_steps_payload_QuizStepBubbles | QuizFields_steps_payload_QuizStepSelect | QuizFields_steps_payload_QuizStepMultiSelect | QuizFields_steps_payload_QuizStepTabSliders | QuizFields_steps_payload_QuizStepRegionGroups;

export interface QuizFields_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations";
  features: any[];
}

export interface QuizFields_steps_result_QuizStepResultBubbles {
  __typename: "QuizStepResultBubbles";
  choices: string[];
}

export interface QuizFields_steps_result_QuizStepResultSelect {
  __typename: "QuizStepResultSelect";
  filter: string;
  choiceId: string;
}

export interface QuizFields_steps_result_QuizStepResultMultiSelect {
  __typename: "QuizStepResultMultiSelect";
  filters: string[];
  choiceId: string;
}

export interface QuizFields_steps_result_QuizStepResultSlider {
  __typename: "QuizStepResultSlider";
  choiceId: string;
  type: QuizStepSliderType;
  value: number;
}

export interface QuizFields_steps_result_QuizStepResultRegionGroups_regionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface QuizFields_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups";
  regionGroups: QuizFields_steps_result_QuizStepResultRegionGroups_regionGroups[];
}

export type QuizFields_steps_result = QuizFields_steps_result_QuizStepResultLocations | QuizFields_steps_result_QuizStepResultBubbles | QuizFields_steps_result_QuizStepResultSelect | QuizFields_steps_result_QuizStepResultMultiSelect | QuizFields_steps_result_QuizStepResultSlider | QuizFields_steps_result_QuizStepResultRegionGroups;

export interface QuizFields_steps {
  __typename: "QuizStep";
  id: string;
  type: StepType;
  entity: string;
  payload: QuizFields_steps_payload;
  result: QuizFields_steps_result | null;
}

export interface QuizFields {
  __typename: "Quiz";
  state: QuizState;
  id: string;
  userId: string | null;
  currentStepId: string | null;
  result: QuizFields_result | null;
  steps: QuizFields_steps[];
}
