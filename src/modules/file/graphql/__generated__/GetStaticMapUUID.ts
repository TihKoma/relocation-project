/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetStaticMapUUIDInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetStaticMapUUID
// ====================================================

export interface GetStaticMapUUID_getStaticMapUUID {
  __typename: "GetStaticMapUUIDResponse";
  name: string;
  url: string;
}

export interface GetStaticMapUUID {
  getStaticMapUUID: GetStaticMapUUID_getStaticMapUUID;
}

export interface GetStaticMapUUIDVariables {
  input: GetStaticMapUUIDInput;
}
