import { gql, TypedDocumentNode } from '@apollo/client'

import { Media } from '@/components/shared/Gallery'
import {
  CheckPointsForQuiz,
  CheckPointsForQuizVariables,
} from '@/modules/map/graphql/__generated__/CheckPointsForQuiz'
import {
  SearchFeatures,
  SearchFeaturesVariables,
} from '@/modules/map/graphql/__generated__/SearchFeatures'

import { GeoFeature, GeoFeatureCollection } from '../types'
import { GetRegion, GetRegionVariables } from './__generated__/GetRegion'
import {
  GetRegionBySlug,
  GetRegionBySlug_getRegionBySlug,
  GetRegionBySlugVariables,
} from './__generated__/GetRegionBySlug'
import { GetRegionInfo } from './__generated__/GetRegionInfo'
import {
  GetRegionsByBBox,
  GetRegionsByBBoxVariables,
} from './__generated__/GetRegionsByBBox'
import {
  GetRegionsByPoint,
  GetRegionsByPointVariables,
} from './__generated__/GetRegionsByPoint'
import {
  IsPointInsideAnyRegion,
  IsPointInsideAnyRegionVariables,
} from './__generated__/IsPointInsideAnyRegion'
import { PostMarkers, PostMarkersVariables } from './__generated__/PostMarkers'
import {
  PostMarkersByBBox,
  PostMarkersByBBoxVariables,
} from './__generated__/PostMarkersByBBox'

export const QUERY_POST_MARKERS: TypedDocumentNode<
  PostMarkers,
  PostMarkersVariables
> = gql`
  query PostMarkers($regionId: String!, $bbox: BBoxInput) {
    postMarkers(bbox: $bbox, regionId: $regionId)
  }
`

export const QUERY_POST_MARKERS_BY_BBOX: TypedDocumentNode<
  PostMarkersByBBox,
  PostMarkersByBBoxVariables
> = gql`
  query PostMarkersByBBox($bbox: BBoxInput!) {
    getPostMarkersByBBox(bbox: $bbox)
  }
`

export const QUERY_IS_POINT_INSIDE_ANY_REGION: TypedDocumentNode<
  IsPointInsideAnyRegion,
  IsPointInsideAnyRegionVariables
> = gql`
  query IsPointInsideAnyRegion($point: PointInput!) {
    isPointInsideAnyRegion(point: $point) {
      status
    }
  }
`
export const QUERY_CHECK_POINTS_FOR_QUIZ: TypedDocumentNode<
  CheckPointsForQuiz,
  CheckPointsForQuizVariables
> = gql`
  query CheckPointsForQuiz($points: [PointInput!]!) {
    checkPointsForQuiz(points: $points) {
      status
      description
    }
  }
`
export const QUERY_GET_REGION: TypedDocumentNode<
  Omit<GetRegion, 'getRegion'> & {
    getRegion: GeoFeature | null
  },
  GetRegionVariables
> = gql`
  query GetRegion($id: ID!) {
    getRegion(id: $id)
  }
`

export const QUERY_GET_REGION_INFO: TypedDocumentNode<
  GetRegionInfo,
  GetRegionVariables
> = gql`
  query GetRegionInfo($id: ID!) {
    getRegionInfo(id: $id) {
      id
      name
      slug
      PhotoUrl
      subscribed
      subscribersCount
      subtitle
    }
  }
`

export const QUERY_GET_REGIONS_BY_BBOX: TypedDocumentNode<
  Omit<GetRegionsByBBox, 'getRegionsByBBox'> & {
    getRegionsByBBox: GeoFeatureCollection | null
  },
  GetRegionsByBBoxVariables
> = gql`
  query GetRegionsByBBox($bbox: BBoxInput!, $zoomLevel: Int!) {
    getRegionsByBBox(bbox: $bbox, zoomLevel: $zoomLevel)
  }
`

export const QUERY_GET_REGIONS_BY_POINT: TypedDocumentNode<
  Omit<GetRegionsByPoint, 'getRegionsByPoint'> & {
    getRegionsByPoint: GeoFeatureCollection | null
  },
  GetRegionsByPointVariables
> = gql`
  query GetRegionsByPoint($point: PointInput!, $zoomLevel: Int!) {
    getRegionsByPoint(point: $point, zoomLevel: $zoomLevel)
  }
`

export type Region = Omit<GetRegionBySlug_getRegionBySlug, 'media'> & {
  media: Media[]
}
export const QUERY_GET_REGION_BY_SLUG: TypedDocumentNode<
  Omit<GetRegionBySlug, 'getRegionBySlug'> & { getRegionBySlug: Region | null },
  GetRegionBySlugVariables
> = gql`
  query GetRegionBySlug($slug: String!) {
    getRegionBySlug(slug: $slug) {
      id
      placeType
      name
      city
      country
      subtitle
      subscribed
      subscribersCount
      slug
      description
      previewFollowers {
        photoUrl
      }
      media {
        type
        description
        src
        meta {
          authorName
          linkSource
          license {
            name
            link
          }
        }
      }
      bbox {
        left
        bottom
        right
        top
      }
    }
  }
`

export const QUERY_SEARCH_FEATURES: TypedDocumentNode<
  SearchFeatures,
  SearchFeaturesVariables
> = gql`
  query SearchFeatures($input: SearchFeaturesInput!) {
    searchFeatures(input: $input) {
      GeoFeatureCollection
    }
  }
`
