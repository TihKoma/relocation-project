/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BBoxInput, QuizState, StepType, QuizStepSliderType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: QuizResultByBBox
// ====================================================

export interface QuizResultByBBox_quizResultByBBox_quiz_result_locations_factorsScores {
  __typename: "QuizFactorScore";
  name: string;
  image: string;
  score: number;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_result_locations {
  __typename: "QuizResultLocation";
  id: string;
  subtitle: string;
  neighborhood: string;
  badges: string[] | null;
  image: string | null;
  score: number;
  factorsScores: QuizResultByBBox_quizResultByBBox_quiz_result_locations_factorsScores[];
  subscribed: boolean;
  slug: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_result {
  __typename: "QuizResult";
  locations: QuizResultByBBox_quizResultByBBox_quiz_result_locations[] | null;
  areaExpanded: boolean;
  searchAreas: string[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepLocations_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepLocations {
  __typename: "QuizStepLocations";
  title: string;
  name: string;
  placeholder: string;
  images: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepLocations_images;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles_bubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
  image: string;
  cantSelect: boolean;
  color: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles_bubbles {
  __typename: "QuizBubble";
  choiceId: string;
  title: string;
  image: string;
  cantSelect: boolean;
  color: string;
  bubbles: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles_bubbles_bubbles[] | null;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles {
  __typename: "QuizStepBubbles";
  title: string;
  name: string;
  placeholder: string;
  images: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles_images;
  bubbles: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles_bubbles[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepSelect_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepSelect_options {
  __typename: "QuizSelectOption";
  value: string;
  tabName: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepSelect {
  __typename: "QuizStepSelect";
  title: string;
  subtitle: string;
  choiceId: string;
  name: string;
  placeholder: string;
  images: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepSelect_images;
  options: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepSelect_options[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepMultiSelect_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepMultiSelect_options {
  __typename: "QuizSelectOption";
  tabName: string;
  value: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepMultiSelect {
  __typename: "QuizStepMultiSelect";
  title: string;
  choiceId: string;
  name: string;
  placeholder: string;
  images: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepMultiSelect_images;
  options: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepMultiSelect_options[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders_tabs_slider {
  __typename: "QuizStepTabSlider";
  maxVal: number;
  stepLen: number;
  type: QuizStepSliderType;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders_tabs {
  __typename: "QuizStepTab";
  title: string;
  slider: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders_tabs_slider;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders {
  __typename: "QuizStepTabSliders";
  title: string;
  name: string;
  placeholder: string;
  choiceId: string;
  images: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders_images;
  tabs: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders_tabs[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepRegionGroups_images {
  __typename: "QuizStepImages";
  desktop: string;
  mobile: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepRegionGroups {
  __typename: "QuizStepRegionGroups";
  title: string;
  name: string;
  placeholder: string;
  images: QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepRegionGroups_images;
}

export type QuizResultByBBox_quizResultByBBox_quiz_steps_payload = QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepLocations | QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepBubbles | QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepSelect | QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepMultiSelect | QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepTabSliders | QuizResultByBBox_quizResultByBBox_quiz_steps_payload_QuizStepRegionGroups;

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultLocations {
  __typename: "QuizStepResultLocations";
  features: any[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultBubbles {
  __typename: "QuizStepResultBubbles";
  choices: string[];
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultSelect {
  __typename: "QuizStepResultSelect";
  filter: string;
  choiceId: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultMultiSelect {
  __typename: "QuizStepResultMultiSelect";
  filters: string[];
  choiceId: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultSlider {
  __typename: "QuizStepResultSlider";
  choiceId: string;
  type: QuizStepSliderType;
  value: number;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultRegionGroups_regionGroups {
  __typename: "QuizRegionGroup";
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultRegionGroups {
  __typename: "QuizStepResultRegionGroups";
  regionGroups: QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultRegionGroups_regionGroups[];
}

export type QuizResultByBBox_quizResultByBBox_quiz_steps_result = QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultLocations | QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultBubbles | QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultSelect | QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultMultiSelect | QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultSlider | QuizResultByBBox_quizResultByBBox_quiz_steps_result_QuizStepResultRegionGroups;

export interface QuizResultByBBox_quizResultByBBox_quiz_steps {
  __typename: "QuizStep";
  id: string;
  type: StepType;
  entity: string;
  payload: QuizResultByBBox_quizResultByBBox_quiz_steps_payload;
  result: QuizResultByBBox_quizResultByBBox_quiz_steps_result | null;
}

export interface QuizResultByBBox_quizResultByBBox_quiz {
  __typename: "Quiz";
  state: QuizState;
  id: string;
  userId: string | null;
  currentStepId: string | null;
  result: QuizResultByBBox_quizResultByBBox_quiz_result | null;
  steps: QuizResultByBBox_quizResultByBBox_quiz_steps[];
}

export interface QuizResultByBBox_quizResultByBBox {
  __typename: "quizResultByBBox";
  quiz: QuizResultByBBox_quizResultByBBox_quiz | null;
  regions: any | null;
}

export interface QuizResultByBBox {
  quizResultByBBox: QuizResultByBBox_quizResultByBBox | null;
}

export interface QuizResultByBBoxVariables {
  quizId: string;
  bbox: BBoxInput;
  zoomLevel: number;
  position: number;
  limit: number;
}
