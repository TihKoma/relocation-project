/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QuizResultField
// ====================================================

export interface QuizResultField_locations_factorsScores {
  __typename: "QuizFactorScore";
  name: string;
  image: string;
  score: number;
}

export interface QuizResultField_locations {
  __typename: "QuizResultLocation";
  id: string;
  subtitle: string;
  neighborhood: string;
  badges: string[] | null;
  image: string | null;
  score: number;
  factorsScores: QuizResultField_locations_factorsScores[];
  subscribed: boolean;
  slug: string;
}

export interface QuizResultField {
  __typename: "QuizResult";
  locations: QuizResultField_locations[] | null;
  areaExpanded: boolean;
  searchAreas: string[];
}
