/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteQuiz
// ====================================================

export interface DeleteQuiz_deleteQuiz {
  __typename: "Result";
  status: boolean;
}

export interface DeleteQuiz {
  deleteQuiz: DeleteQuiz_deleteQuiz | null;
}

export interface DeleteQuizVariables {
  id: string;
}
