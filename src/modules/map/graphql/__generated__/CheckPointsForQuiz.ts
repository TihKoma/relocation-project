/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PointInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CheckPointsForQuiz
// ====================================================

export interface CheckPointsForQuiz_checkPointsForQuiz {
  __typename: "Result";
  status: boolean;
  description: string | null;
}

export interface CheckPointsForQuiz {
  checkPointsForQuiz: CheckPointsForQuiz_checkPointsForQuiz | null;
}

export interface CheckPointsForQuizVariables {
  points: PointInput[];
}
