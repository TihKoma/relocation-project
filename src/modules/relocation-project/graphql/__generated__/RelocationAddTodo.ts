/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelocationProjectTodoInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RelocationAddTodo
// ====================================================

export interface RelocationAddTodo_relocationAddTodo {
  __typename: "Result";
  description: string | null;
  status: boolean;
}

export interface RelocationAddTodo {
  relocationAddTodo: RelocationAddTodo_relocationAddTodo | null;
}

export interface RelocationAddTodoVariables {
  input: RelocationProjectTodoInput;
}
