/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelocationProjectTodoType, RelocationProjectTodoStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: TodoFields
// ====================================================

export interface TodoFields_guides {
  __typename: "RelocationProjectTodoGuide";
  link: string | null;
  icon: string | null;
  title: string | null;
}

export interface TodoFields_cta {
  __typename: "RelocationProjectTodoCTA";
  title: string | null;
  link: string | null;
  type: string | null;
}

export interface TodoFields_children_cta {
  __typename: "RelocationProjectTodoCTA";
  title: string | null;
  link: string | null;
  type: string | null;
}

export interface TodoFields_children_guides {
  __typename: "RelocationProjectTodoGuide";
  link: string | null;
  icon: string | null;
  title: string | null;
}

export interface TodoFields_children {
  __typename: "RelocationProjectTodo";
  id: string;
  title: string;
  type: RelocationProjectTodoType;
  description: string | null;
  status: RelocationProjectTodoStatus;
  cta: (TodoFields_children_cta | null)[] | null;
  guides: (TodoFields_children_guides | null)[] | null;
}

export interface TodoFields {
  __typename: "RelocationProjectTodo";
  id: string;
  title: string;
  type: RelocationProjectTodoType;
  description: string | null;
  guides: (TodoFields_guides | null)[] | null;
  cta: (TodoFields_cta | null)[] | null;
  status: RelocationProjectTodoStatus;
  children: (TodoFields_children | null)[] | null;
}
