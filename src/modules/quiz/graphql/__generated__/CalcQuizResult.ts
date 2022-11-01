/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CalcQuizResult
// ====================================================

export interface CalcQuizResult_calcQuizResult_result_locations_factorsScores {
  __typename: "QuizFactorScore";
  name: string;
  image: string;
  score: number;
}

export interface CalcQuizResult_calcQuizResult_result_locations {
  __typename: "QuizResultLocation";
  id: string;
  subtitle: string;
  neighborhood: string;
  badges: string[] | null;
  image: string | null;
  score: number;
  factorsScores: CalcQuizResult_calcQuizResult_result_locations_factorsScores[];
  subscribed: boolean;
  slug: string;
}

export interface CalcQuizResult_calcQuizResult_result {
  __typename: "QuizResult";
  locations: CalcQuizResult_calcQuizResult_result_locations[] | null;
  areaExpanded: boolean;
  searchAreas: string[];
}

export interface CalcQuizResult_calcQuizResult {
  __typename: "Quiz";
  id: string;
  result: CalcQuizResult_calcQuizResult_result | null;
}

export interface CalcQuizResult {
  calcQuizResult: CalcQuizResult_calcQuizResult | null;
}

export interface CalcQuizResultVariables {
  id: string;
}
