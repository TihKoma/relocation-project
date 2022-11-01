import { TypedDocumentNode } from '@apollo/client'
import gql from 'graphql-tag'

import {
  GetDrillDownMedianPrice,
  GetDrillDownMedianPriceVariables,
} from './__generated__/GetDrillDownMedianPrice'
import {
  GetDrillDowns,
  GetDrillDownsVariables,
} from './__generated__/GetDrillDowns'

export const QUERY_GET_DRILL_DOWNS: TypedDocumentNode<
  GetDrillDowns,
  GetDrillDownsVariables
> = gql`
  query GetDrillDowns($input: drillDownsRequest!) {
    getDrillDowns(input: $input) {
      ... on DrillDownDiversityLocation {
        drillDownType
        locationId
        locationName
        locationSlug
        locationType
        grade
        gradeText
        data {
          color
          percentEthnicCategory
          race
          score
          selectedByUser
          weight
        }
      }
      ... on DrillDownSocialLifeLocation {
        drillDownType
        locationId
        locationName
        locationSlug
        locationType
        grade
        gradeText
        data {
          color
          percentAgeCategory
          score
          selectedByUser
          socialFactor
          weight
        }
      }
      ... on DrillDownPublicTransportationLocation {
        drillDownType
        locationId
        locationSlug
        locationName
        locationType
        transportationGrade
        transportationGradeText
        proximityGrade
        proximityGradeText
        proximityPoints {
          title
          address
          time
        }
        data {
          transportFactor
          color
          score
          weight
          percentageUsePT
          medianCommute
          selectedByUser
        }
      }
      ... on DrillDownHousingLocation {
        drillDownType
        locationId
        locationName
        locationSlug
        locationType
        availabilityGrade
        availabilityGradeText
        buildingsData {
          buildingPercentage
          buildingType
          color
          selectedByUser
        }
        drillDownType
        locationId
        locationName
        locationSlug
        locationType
        rentAndBuyData {
          color
          rentBuyPercentage
          rentBuyType
          selectedByUser
        }
        valueForMoneyGrade
        valueForMoneyGradeGradeText
      }
    }
  }
`

export const QUERY_GET_DRILL_DOWN_MEDIAN_PRICE: TypedDocumentNode<
  GetDrillDownMedianPrice,
  GetDrillDownMedianPriceVariables
> = gql`
  query GetDrillDownMedianPrice($input: drillDownMedianPriceRequest!) {
    getDrillDownMedianPrice(input: $input) {
      data {
        locationId
        locationSlug
        locationName
        locationType
        MedianPrice
      }
      filters {
        propertyType {
          name
          type
          isActive
          selected
          inRequest
        }
        rooms {
          name
          type
          isActive
          selected
          inRequest
        }
        tradeType {
          name
          type
          isActive
          selected
          inRequest
        }
      }
    }
  }
`
