import { gql, TypedDocumentNode } from '@apollo/client'

import {
  FavoriteListingMarkersByBBox,
  FavoriteListingMarkersByBBoxVariables,
} from '@/modules/listing/graphql/__generated__/FavoriteListingMarkersByBBox'
import {
  GetFavoriteListings,
  GetFavoriteListingsVariables,
} from '@/modules/listing/graphql/__generated__/GetFavoriteListings'
import { GetFavoriteListingsBBox } from '@/modules/listing/graphql/__generated__/GetFavoriteListingsBBox'
import { GetFavoriteTotalListings } from '@/modules/listing/graphql/__generated__/GetFavoriteTotalListings'
import {
  ListingMarkers,
  ListingMarkersVariables,
} from '@/modules/listing/graphql/__generated__/ListingMarkers'
import { FRAGMENT_POST_FIELDS } from '@/modules/post'

import {
  GetDetailedListing,
  GetDetailedListingVariables,
} from './__generated__/GetDetailedListing'
import {
  GetRadiusFeed,
  GetRadiusFeedVariables,
} from './__generated__/GetRadiusFeed'
import {
  SavedListingsSearches,
  SavedListingsSearchesVariables,
} from './__generated__/SavedListingsSearches'

export const QUERY_GET_DETAILED_LISTING: TypedDocumentNode<
  GetDetailedListing,
  GetDetailedListingVariables
> = gql`
  query GetDetailedListing($id: String!) {
    getDetailedListing(id: $id) {
      id
      internalID
      slug
      isFavorite
      regionId
      point {
        lat
        long
      }
      media {
        type
        url
      }
      listingInfo {
        status
        transactionType
        status
        propertyType
        propertySubType
        daysOnMarket
        price
        address
        bedrooms
        bathrooms
        livingAreaSquareFeet
        pricePerSquareFoot
      }
      property {
        lotSize
        stateOrProvince
        city
        county
        postalCode
        neighborhood
        floors
        parking
        annualTaxes
        hoa
        yearBuilt
        description
      }
      openHouses {
        from
        till
      }
      associates {
        agentName
        leadEmail
        brokerName
        source
        mlsId
        mlsNumber
        sourceURL
      }
      disclaimer
      details {
        title
        items {
          key
          value
        }
      }
    }
  }
`

export const QUERY_GET_RADIUS_FEED: TypedDocumentNode<
  GetRadiusFeed,
  GetRadiusFeedVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}
  query GetRadiusFeed(
    $feedId: ID
    $regionId: ID!
    $point: PointInput!
    $radius: Int!
    $position: Int
    $limit: Int
  ) {
    getRadiusFeed(
      feedId: $feedId
      regionId: $regionId
      point: $point
      radius: $radius
      position: $position
      limit: $limit
    ) {
      id
      posts {
        ...PostFields
      }
    }
  }
`
export const QUERY_LISTING_MARKERS: TypedDocumentNode<
  ListingMarkers,
  ListingMarkersVariables
> = gql`
  query ListingMarkers($filter: ListingFilterInput!, $bbox: BBoxInput!) {
    listingMarkersV2(filter: $filter, bbox: $bbox)
  }
`
export const QUERY_FAVORITE_LISTING_MARKERS_BY_BBOX: TypedDocumentNode<
  FavoriteListingMarkersByBBox,
  FavoriteListingMarkersByBBoxVariables
> = gql`
  query FavoriteListingMarkersByBBox(
    $transactionType: ListingTransactionType!
    $bbox: BBoxInput!
  ) {
    favoriteListingMarkersByBbox(transactionType: $transactionType, bbox: $bbox)
  }
`

export const QUERY_GET_FAVORITE_LISTINGS: TypedDocumentNode<
  GetFavoriteListings,
  GetFavoriteListingsVariables
> = gql`
  query GetFavoriteListings(
    $transactionType: ListingTransactionType!
    $order: ListingOrder
    $limit: Int!
    $offset: Int!
  ) {
    getFavoriteListings(
      transactionType: $transactionType
      order: $order
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
      isViewed
      isFavorite
      media {
        url
        type
        description
        sortKey
      }
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
export const QUERY_GET_FAVORITE_TOTAL_LISTINGS: TypedDocumentNode<GetFavoriteTotalListings> = gql`
  query GetFavoriteTotalListings {
    getFavoriteTotalListings
  }
`

export const QUERY_GET_FAVORITE_LISTINGS_BBOX: TypedDocumentNode<GetFavoriteListingsBBox> = gql`
  query GetFavoriteListingsBBox {
    getFavoriteListingsBBox {
      top
      left
      right
      bottom
    }
  }
`

export const QUERY_SAVED_LISTINGS_SEARCHES: TypedDocumentNode<
  SavedListingsSearches,
  SavedListingsSearchesVariables
> = gql`
  query SavedListingsSearches($limit: Int!, $offset: Int!) {
    savedListingsSearches(limit: $limit, offset: $offset) {
      id
      query {
        transactionType
        buildingCondition
        buildingType
        bedrooms
        bathrooms
        minPrice
        maxPrice
        minSquareFeets
        maxSquareFeets
        minLotSize
        maxLotSize
        minYearBuilt
        maxYearBuilt
        addressSlug
        regionSlug
      }
      notificationSettings {
        sendEmailNotification
      }
      userId
      regionId
      regionName
      createdAt
      updatedAt
    }
  }
`
