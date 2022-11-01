/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BindQuizToUser
// ====================================================

export interface BindQuizToUser_bindQuizToUser {
  __typename: "Result";
  status: boolean;
}

export interface BindQuizToUser {
  bindQuizToUser: BindQuizToUser_bindQuizToUser | null;
}

export interface BindQuizToUserVariables {
  quizId: string;
}
