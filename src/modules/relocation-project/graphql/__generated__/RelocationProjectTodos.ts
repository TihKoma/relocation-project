/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelocationProjectTodosInput, RelocationProjectTodoType, RelocationProjectTodoStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RelocationProjectTodos
// ====================================================

export interface RelocationProjectTodos_relocationProjectTodos_guides {
  __typename: "RelocationProjectTodoGuide";
  link: string | null;
  icon: string | null;
  title: string | null;
}

export interface RelocationProjectTodos_relocationProjectTodos_cta {
  __typename: "RelocationProjectTodoCTA";
  title: string | null;
  link: string | null;
  type: string | null;
}

export interface RelocationProjectTodos_relocationProjectTodos_children_cta {
  __typename: "RelocationProjectTodoCTA";
  title: string | null;
  link: string | null;
  type: string | null;
}

export interface RelocationProjectTodos_relocationProjectTodos_children_guides {
  __typename: "RelocationProjectTodoGuide";
  link: string | null;
  icon: string | null;
  title: string | null;
}

export interface RelocationProjectTodos_relocationProjectTodos_children {
  __typename: "RelocationProjectTodo";
  id: string;
  title: string;
  type: RelocationProjectTodoType;
  description: string | null;
  status: RelocationProjectTodoStatus;
  cta: (RelocationProjectTodos_relocationProjectTodos_children_cta | null)[] | null;
  guides: (RelocationProjectTodos_relocationProjectTodos_children_guides | null)[] | null;
}

export interface RelocationProjectTodos_relocationProjectTodos {
  __typename: "RelocationProjectTodo";
  id: string;
  title: string;
  type: RelocationProjectTodoType;
  description: string | null;
  guides: (RelocationProjectTodos_relocationProjectTodos_guides | null)[] | null;
  cta: (RelocationProjectTodos_relocationProjectTodos_cta | null)[] | null;
  status: RelocationProjectTodoStatus;
  children: (RelocationProjectTodos_relocationProjectTodos_children | null)[] | null;
}

export interface RelocationProjectTodos {
  relocationProjectTodos: RelocationProjectTodos_relocationProjectTodos[] | null;
}

export interface RelocationProjectTodosVariables {
  input: RelocationProjectTodosInput;
}
