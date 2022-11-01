/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuizResultForRegion
// ====================================================

export interface QuizResultForRegion_quizResultForRegion_location_factorsScores {
  __typename: "QuizFactorScore";
  name: string;
  image: string;
  score: number;
}

export interface QuizResultForRegion_quizResultForRegion_location {
  __typename: "QuizResultLocation";
  badges: string[] | null;
  score: number;
  factorsScores: QuizResultForRegion_quizResultForRegion_location_factorsScores[];
}

export interface QuizResultForRegion_quizResultForRegion {
  __typename: "QuizResultForRegion";
  system: boolean;
  location: QuizResultForRegion_quizResultForRegion_location;
}

export interface QuizResultForRegion {
  quizResultForRegion: QuizResultForRegion_quizResultForRegion;
}

export interface QuizResultForRegionVariables {
  regionId: string;
  quizId?: string | null;
}
