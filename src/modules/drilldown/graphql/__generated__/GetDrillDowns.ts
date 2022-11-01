/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { drillDownsRequest, DrillDownType, DrillDownGrade } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDrillDowns
// ====================================================

export interface GetDrillDowns_getDrillDowns_DrillDownDiversityLocation_data {
  __typename: "DrillDownDiversity";
  color: string | null;
  percentEthnicCategory: number;
  race: string;
  score: number | null;
  selectedByUser: boolean;
  weight: number | null;
}

export interface GetDrillDowns_getDrillDowns_DrillDownDiversityLocation {
  __typename: "DrillDownDiversityLocation";
  drillDownType: DrillDownType;
  locationId: string;
  locationName: string;
  locationSlug: string;
  locationType: string;
  grade: DrillDownGrade | null;
  gradeText: string | null;
  data: GetDrillDowns_getDrillDowns_DrillDownDiversityLocation_data[] | null;
}

export interface GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation_data {
  __typename: "DrillDownSocialLife";
  color: string | null;
  percentAgeCategory: number;
  score: number | null;
  selectedByUser: boolean;
  socialFactor: string;
  weight: number | null;
}

export interface GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation {
  __typename: "DrillDownSocialLifeLocation";
  drillDownType: DrillDownType;
  locationId: string;
  locationName: string;
  locationSlug: string;
  locationType: string;
  grade: DrillDownGrade | null;
  gradeText: string | null;
  data: GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation_data[] | null;
}

export interface GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_proximityPoints {
  __typename: "DrillDownPublicTransportationPoint";
  title: string;
  address: string;
  time: number;
}

export interface GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_data {
  __typename: "DrillDownPublicTransportation";
  transportFactor: string;
  color: string | null;
  score: number | null;
  weight: number | null;
  percentageUsePT: number;
  medianCommute: number;
  selectedByUser: boolean;
}

export interface GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation {
  __typename: "DrillDownPublicTransportationLocation";
  drillDownType: DrillDownType;
  locationId: string;
  locationSlug: string;
  locationName: string;
  locationType: string;
  transportationGrade: DrillDownGrade | null;
  transportationGradeText: string | null;
  proximityGrade: DrillDownGrade | null;
  proximityGradeText: string | null;
  proximityPoints: (GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_proximityPoints | null)[] | null;
  data: GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_data[] | null;
}

export interface GetDrillDowns_getDrillDowns_DrillDownHousingLocation_buildingsData {
  __typename: "DrillDownBuilding";
  buildingPercentage: number;
  buildingType: string;
  color: string | null;
  selectedByUser: boolean;
}

export interface GetDrillDowns_getDrillDowns_DrillDownHousingLocation_rentAndBuyData {
  __typename: "DrillDownRentAndBuy";
  color: string | null;
  rentBuyPercentage: number;
  rentBuyType: string;
  selectedByUser: boolean;
}

export interface GetDrillDowns_getDrillDowns_DrillDownHousingLocation {
  __typename: "DrillDownHousingLocation";
  drillDownType: DrillDownType;
  locationId: string;
  locationName: string;
  locationSlug: string;
  locationType: string;
  availabilityGrade: DrillDownGrade | null;
  availabilityGradeText: string | null;
  buildingsData: GetDrillDowns_getDrillDowns_DrillDownHousingLocation_buildingsData[] | null;
  rentAndBuyData: GetDrillDowns_getDrillDowns_DrillDownHousingLocation_rentAndBuyData[] | null;
  valueForMoneyGrade: DrillDownGrade | null;
  valueForMoneyGradeGradeText: string | null;
}

export type GetDrillDowns_getDrillDowns = GetDrillDowns_getDrillDowns_DrillDownDiversityLocation | GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation | GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation | GetDrillDowns_getDrillDowns_DrillDownHousingLocation;

export interface GetDrillDowns {
  getDrillDowns: (GetDrillDowns_getDrillDowns | null)[];
}

export interface GetDrillDownsVariables {
  input: drillDownsRequest;
}
