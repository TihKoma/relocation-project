/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelocationProjectTodoInput, RelocationProjectTodoType, RelocationProjectTodoStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RelocationUpdateTodo
// ====================================================

export interface RelocationUpdateTodo_relocationUpdateTodo_guides {
  __typename: "RelocationProjectTodoGuide";
  link: string | null;
  icon: string | null;
  title: string | null;
}

export interface RelocationUpdateTodo_relocationUpdateTodo_cta {
  __typename: "RelocationProjectTodoCTA";
  title: string | null;
  link: string | null;
  type: string | null;
}

export interface RelocationUpdateTodo_relocationUpdateTodo_children_cta {
  __typename: "RelocationProjectTodoCTA";
  title: string | null;
  link: string | null;
  type: string | null;
}

export interface RelocationUpdateTodo_relocationUpdateTodo_children_guides {
  __typename: "RelocationProjectTodoGuide";
  link: string | null;
  icon: string | null;
  title: string | null;
}

export interface RelocationUpdateTodo_relocationUpdateTodo_children {
  __typename: "RelocationProjectTodo";
  id: string;
  title: string;
  type: RelocationProjectTodoType;
  description: string | null;
  status: RelocationProjectTodoStatus;
  cta: (RelocationUpdateTodo_relocationUpdateTodo_children_cta | null)[] | null;
  guides: (RelocationUpdateTodo_relocationUpdateTodo_children_guides | null)[] | null;
}

export interface RelocationUpdateTodo_relocationUpdateTodo {
  __typename: "RelocationProjectTodo";
  id: string;
  title: string;
  type: RelocationProjectTodoType;
  description: string | null;
  guides: (RelocationUpdateTodo_relocationUpdateTodo_guides | null)[] | null;
  cta: (RelocationUpdateTodo_relocationUpdateTodo_cta | null)[] | null;
  status: RelocationProjectTodoStatus;
  children: (RelocationUpdateTodo_relocationUpdateTodo_children | null)[] | null;
}

export interface RelocationUpdateTodo {
  relocationUpdateTodo: RelocationUpdateTodo_relocationUpdateTodo;
}

export interface RelocationUpdateTodoVariables {
  input: RelocationProjectTodoInput;
}
