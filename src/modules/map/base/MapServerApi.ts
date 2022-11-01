import { ApolloClient } from '@apollo/client'

import {
  QUERY_FAVORITE_LISTING_MARKERS_BY_BBOX,
  QUERY_GET_FAVORITE_LISTINGS_BBOX,
  QUERY_LISTING_MARKERS,
} from '@/modules/listing'
import {
  QUERY_GET_REGION,
  QUERY_GET_REGION_BY_SLUG,
  QUERY_GET_REGIONS_BY_POINT,
  QUERY_POST_MARKERS_BY_BBOX,
  QUERY_SEARCH_FEATURES,
} from '@/modules/map'
import { QUERY_GET_REGIONS_BY_BBOX } from '@/modules/map/graphql/queries'
import { QUERY_QUIZ_BY_BBOX } from '@/modules/quiz'

import {
  ListingBathrooms,
  ListingBedrooms,
  ListingFilterInput,
  ListingOrder,
  ListingTransactionType,
} from '../../../../__generated__/globalTypes'
import { BBoxObject, GeoFeature, GeoFeaturePoint, Position } from '../types'

export class MapServerApi {
  protected _apolloClient: ApolloClient<object>
  protected _listingsAbortController: AbortController | null
  protected _regionsAbortController: AbortController | null

  constructor(apolloClient: ApolloClient<object>) {
    this._apolloClient = apolloClient
    this._listingsAbortController = null
    this._regionsAbortController = null
  }

  async getPostMarkersBBox(bbox: BBoxObject): Promise<GeoFeaturePoint[]> {
    const result = await this._apolloClient.query({
      query: QUERY_POST_MARKERS_BY_BBOX,
      variables: { bbox },
      fetchPolicy: 'network-only',
    })
    return result.data.getPostMarkersByBBox.features
  }

  async getListingsMarkersBBox({
    bbox,
    filter,
    order,
  }: {
    bbox: BBoxObject
    filter?: ListingFilterInput
    order?: ListingOrder
  }): Promise<{
    realEstate: GeoFeaturePoint[]
    listingsGroup: GeoFeaturePoint[]
  }> {
    let result
    try {
      this._listingsAbortController?.abort()

      const controller = new window.AbortController()
      this._listingsAbortController = controller

      result = await this._apolloClient.query({
        query: QUERY_LISTING_MARKERS,
        variables: {
          bbox,
          filter: filter || {
            bathrooms: ListingBathrooms.ROOMS_ANY,
            bedrooms: ListingBedrooms.ROOMS_ANY,
            transactionType: ListingTransactionType.FOR_SALE,
          },
          order: order || ListingOrder.DAYS_ON_MARKET_DESC,
        },
        fetchPolicy: 'network-only',
        context: { fetchOptions: { signal: controller.signal } },
      })
    } catch {}

    const features = result?.data.listingMarkersV2?.features || []

    return features.reduce(
      (
        acc: {
          realEstate: GeoFeaturePoint[]
          listingsGroup: GeoFeaturePoint[]
        },
        value: GeoFeaturePoint,
      ) => {
        if (value.properties.price) {
          acc.realEstate.push(value)
        } else {
          acc.listingsGroup.push({
            ...value,
            properties: { ...value.properties, addressSlug: value.id },
          })
        }

        return acc
      },
      { realEstate: [], listingsGroup: [] },
    )
  }
  async getFavoritesListingsMarkers({
    bbox,
    transactionType,
  }: {
    bbox: BBoxObject
    transactionType?: ListingTransactionType
  }): Promise<GeoFeaturePoint[]> {
    const result = await this._apolloClient.query({
      query: QUERY_FAVORITE_LISTING_MARKERS_BY_BBOX,
      variables: {
        bbox,
        transactionType: transactionType || ListingTransactionType.FOR_SALE,
      },
      fetchPolicy: 'network-only',
    })
    return result.data.favoriteListingMarkersByBbox.features
  }
  async getFavoriteListingsBBox() {
    const result = await this._apolloClient.query({
      query: QUERY_GET_FAVORITE_LISTINGS_BBOX,
      fetchPolicy: 'network-only',
    })
    return result.data.getFavoriteListingsBBox
  }

  async getRegionsByCurrentBBox(
    zoomLevel: number,
    bbox: Position,
  ): Promise<GeoFeature[]> {
    let result
    try {
      this._regionsAbortController?.abort()

      const controller = new window.AbortController()
      this._regionsAbortController = controller
      result = await this._apolloClient.query({
        query: QUERY_GET_REGIONS_BY_BBOX,
        variables: {
          bbox,
          zoomLevel: Math.floor(zoomLevel),
        },
        context: { fetchOptions: { signal: controller.signal } },
      })
    } catch {}

    return result?.data.getRegionsByBBox?.features || []
  }

  async getRegionGeoFeatureByPoint(
    point: { long: number; lat: number },
    zoomLevel: number,
  ): Promise<GeoFeature> {
    const result = await this._apolloClient.query({
      query: QUERY_GET_REGIONS_BY_POINT,
      variables: {
        point,
        zoomLevel: Math.floor(zoomLevel),
      },
    })
    const region = result.data.getRegionsByPoint?.features[0]
    if (!region) {
      //TODO: log to sentry
      throw new Error('getRegionsByPoint have not feature')
    }

    return region
  }

  async getNeighborhoodGeoFeatureBySlug(
    regionSlug: string,
  ): Promise<GeoFeature> {
    const regionInfo = await this._getNeighborhoodBySlug(regionSlug)

    const result = await this._apolloClient.query({
      query: QUERY_GET_REGION,
      variables: { id: regionInfo.id },
    })
    const region = result.data.getRegion

    if (region === null) {
      //TODO: log to sentry
      throw new Error('Region is empty')
    }

    return region
  }

  async getNeighborhoodGeoFeatureById(id: string): Promise<GeoFeature> {
    const result = await this._apolloClient.query({
      query: QUERY_GET_REGION,
      variables: { id },
    })
    const region = result.data.getRegion

    if (region === null) {
      //TODO: log to sentry
      throw new Error('Region is empty')
    }

    return region
  }

  protected async _getNeighborhoodBySlug(regionSlug: string) {
    const resultBySlug = await this._apolloClient.query({
      query: QUERY_GET_REGION_BY_SLUG,
      variables: { slug: regionSlug },
    })
    const regionInfo = resultBySlug.data.getRegionBySlug

    if (regionInfo === null) {
      //TODO: log to sentry
      throw new Error('Region is empty')
    }

    return regionInfo
  }

  async getQuizByBBox(
    quizId: string,
    position: number,
    limit: number,
    zoomLevel: number,
    bbox: Position,
  ) {
    const result = await this._apolloClient.query({
      query: QUERY_QUIZ_BY_BBOX,
      variables: {
        quizId,
        position,
        limit,
        bbox,
        zoomLevel: Math.floor(zoomLevel),
      },
      fetchPolicy: 'no-cache',
    })

    const withSteps =
      result.data.quizResultByBBox?.quiz?.steps.some(
        (step) => step.result !== null,
      ) || false

    return {
      features: (result.data.quizResultByBBox?.regions.features ||
        []) as GeoFeature[],
      locations: result.data.quizResultByBBox?.quiz?.result?.locations || [],
      withSteps,
    }
  }

  async getPostMarkersByGroupId(
    groupId?: string,
    redraw?: boolean,
  ): Promise<GeoFeaturePoint[]> {
    const result = await this._apolloClient.query({
      query: QUERY_SEARCH_FEATURES,
      variables: {
        input: {
          GroupID: groupId,
        },
      },
      fetchPolicy: redraw ? 'network-only' : 'cache-first',
    })
    return result.data.searchFeatures?.GeoFeatureCollection.features
  }
}
