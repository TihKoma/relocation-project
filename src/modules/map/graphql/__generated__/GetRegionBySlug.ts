/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegionMediaType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRegionBySlug
// ====================================================

export interface GetRegionBySlug_getRegionBySlug_previewFollowers {
  __typename: "PreviewProfile";
  photoUrl: string;
}

export interface GetRegionBySlug_getRegionBySlug_media_meta_license {
  __typename: "RegionMediaLicense";
  name: string;
  link: string;
}

export interface GetRegionBySlug_getRegionBySlug_media_meta {
  __typename: "RegionMediaMeta";
  authorName: string;
  linkSource: string;
  license: GetRegionBySlug_getRegionBySlug_media_meta_license;
}

export interface GetRegionBySlug_getRegionBySlug_media {
  __typename: "RegionMedia";
  type: RegionMediaType;
  description: string;
  src: string;
  meta: GetRegionBySlug_getRegionBySlug_media_meta | null;
}

export interface GetRegionBySlug_getRegionBySlug_bbox {
  __typename: "BBox";
  left: number;
  bottom: number;
  right: number;
  top: number;
}

export interface GetRegionBySlug_getRegionBySlug {
  __typename: "Region";
  id: string;
  placeType: string;
  name: string;
  city: string;
  country: string;
  subtitle: string;
  subscribed: boolean;
  subscribersCount: number;
  slug: string;
  description: string | null;
  previewFollowers: GetRegionBySlug_getRegionBySlug_previewFollowers[];
  media: GetRegionBySlug_getRegionBySlug_media[];
  bbox: GetRegionBySlug_getRegionBySlug_bbox;
}

export interface GetRegionBySlug {
  getRegionBySlug: GetRegionBySlug_getRegionBySlug | null;
}

export interface GetRegionBySlugVariables {
  slug: string;
}
