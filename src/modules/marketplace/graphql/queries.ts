import { gql, TypedDocumentNode } from '@apollo/client'

import {
  GetPopularListingsByQuiz,
  GetPopularListingsByQuizVariables,
} from '@/modules/marketplace/graphql/__generated__/GetPopularListingsByQuiz'
import {
  GetPopularListingsByRegion,
  GetPopularListingsByRegionVariables,
} from '@/modules/marketplace/graphql/__generated__/GetPopularListingsByRegion'
import {
  GetTotalListingsByRegion,
  GetTotalListingsByRegionVariables,
} from '@/modules/marketplace/graphql/__generated__/GetTotalListingsByRegion'
import {
  MarketplaceRegions,
  MarketplaceRegions_marketplaceRegions_cities as CitySuggestion,
  MarketplaceRegions_marketplaceRegions_counties as CountySuggestion,
  MarketplaceRegions_marketplaceRegions_neighborhoods as NeighborhoodSuggestion,
  MarketplaceRegions_marketplaceRegions_states as StateSuggestion,
  MarketplaceRegionsVariables,
} from '@/modules/marketplace/graphql/__generated__/MarketplaceRegions'

import {
  GetFilteredListings,
  GetFilteredListingsVariables,
} from './__generated__/GetFilteredListings'
import {
  GetFilteredListingsV2,
  GetFilteredListingsV2Variables,
} from './__generated__/GetFilteredListingsV2'

export const QUERY_GET_FILTERED_LISTINGS: TypedDocumentNode<
  GetFilteredListings,
  GetFilteredListingsVariables
> = gql`
  query GetFilteredListings(
    $regionId: String!
    $filter: ListingFilterInput!
    $order: ListingOrder
    $bbox: BBoxInput
    $limit: Int
    $position: Int
  ) {
    getFilteredListings(
      regionId: $regionId
      filter: $filter
      order: $order
      bbox: $bbox
      limit: $limit
      position: $position
    ) {
      id
      isFavorite
      regionSlug
      internalID
      point {
        lat
        long
      }
      media {
        url
        type
        description
        sortKey
      }
      isViewed
      listingInfo {
        status
        transactionType
        propertyType
        propertySubType
        daysOnMarket
        price
        address
        unit
        bedrooms
        bathrooms
        livingAreaSquareFeet
        pricePerSquareFoot
      }
      associates {
        brokerName
      }
    }
  }
`

export const QUERY_GET_FILTERED_LISTINGS_V2: TypedDocumentNode<
  GetFilteredListingsV2,
  GetFilteredListingsV2Variables
> = gql`
  query GetFilteredListingsV2(
    $regionId: String!
    $filter: ListingFilterInput!
    $order: ListingOrder
    $bbox: BBoxInput
    $limit: Int!
    $offset: Int!
  ) {
    getFilteredListingsV2(
      request: {
        regionId: $regionId
        filter: $filter
        order: $order
        bbox: $bbox
        limit: $limit
        offset: $offset
      }
    ) {
      listings {
        id
        isFavorite
        regionSlug
        internalID
        point {
          lat
          long
        }
        media {
          url
          type
          description
          sortKey
        }
        isViewed
        listingInfo {
          status
          transactionType
          propertyType
          propertySubType
          daysOnMarket
          price
          address
          unit
          bedrooms
          bathrooms
          livingAreaSquareFeet
          pricePerSquareFoot
        }
        associates {
          brokerName
        }
      }
      similar {
        regionID
        regionSlug
        regionName
        listings {
          id
          isFavorite
          regionSlug
          internalID
          point {
            lat
            long
          }
          media {
            url
            type
            description
            sortKey
          }
          isViewed
          listingInfo {
            status
            transactionType
            propertyType
            propertySubType
            daysOnMarket
            price
            address
            unit
            bedrooms
            bathrooms
            livingAreaSquareFeet
            pricePerSquareFoot
          }
          associates {
            brokerName
          }
        }
      }
    }
  }
`

export const QUERY_GET_POPULAR_LISTINGS_BY_REGION: TypedDocumentNode<
  GetPopularListingsByRegion,
  GetPopularListingsByRegionVariables
> = gql`
  query GetPopularListingsByRegion(
    $regionId: String!
    $limit: Int!
    $offset: Int!
  ) {
    getPopularListingByRegion(
      regionId: $regionId
      limit: $limit
      offset: $offset
    ) {
      id
      regionSlug
      internalID
      point {
        lat
        long
      }
      media {
        url
        type
        description
        sortKey
      }
      isViewed
      isFavorite
      listingInfo {
        status
        transactionType
        propertyType
        propertySubType
        daysOnMarket
        price
        address
        unit
        bedrooms
        bathrooms
        livingAreaSquareFeet
        pricePerSquareFoot
      }
      associates {
        brokerName
      }
    }
  }
`
export const QUERY_GET_TOTAL_LISTINGS_BY_REGION: TypedDocumentNode<
  GetTotalListingsByRegion,
  GetTotalListingsByRegionVariables
> = gql`
  query GetTotalListingsByRegion($regionId: String!) {
    getTotalListingsByRegion(regionId: $regionId)
  }
`
export const QUERY_GET_POPULAR_LISTINGS_BY_QUIZ: TypedDocumentNode<
  GetPopularListingsByQuiz,
  GetPopularListingsByQuizVariables
> = gql`
  query GetPopularListingsByQuiz(
    $quizId: String!
    $regionId: String!
    $limit: Int!
    $offset: Int!
  ) {
    getPopularListingsByQuiz(
      quizId: $quizId
      regionId: $regionId
      limit: $limit
      offset: $offset
    ) {
      id
      isFavorite
      regionSlug
      internalID
      point {
        lat
        long
      }
      media {
        url
        type
        description
        sortKey
      }
      isViewed
      listingInfo {
        status
        transactionType
        propertyType
        propertySubType
        daysOnMarket
        price
        address
        unit
        bedrooms
        bathrooms
        livingAreaSquareFeet
        pricePerSquareFoot
      }
      associates {
        brokerName
      }
    }
  }
`

export const QUERY_MARKETPLACE_REGIONS: TypedDocumentNode<
  MarketplaceRegions,
  MarketplaceRegionsVariables
> = gql`
  query MarketplaceRegions($input: MarketplaceRegionInput!) {
    marketplaceRegions(input: $input) {
      cities {
        id
        name
        slug
      }
      counties {
        id
        name
        slug
      }
      neighborhoods {
        id
        name
        slug
      }
      states {
        id
        name
        slug
      }
    }
  }
`
export type MarketplaceSearchSuggestion = Omit<
  CitySuggestion | CountySuggestion | NeighborhoodSuggestion | StateSuggestion,
  '__typename'
>
export type { MarketplaceRegions_marketplaceRegions as MarketplaceSearchSuggestions } from './__generated__/MarketplaceRegions'
