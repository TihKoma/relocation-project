/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadFile
// ====================================================

export interface UploadFile_uploadFile {
  __typename: "StorageObject";
  key: string;
  url: string;
}

export interface UploadFile {
  uploadFile: UploadFile_uploadFile | null;
}

export interface UploadFileVariables {
  public: boolean;
  file: any;
}
