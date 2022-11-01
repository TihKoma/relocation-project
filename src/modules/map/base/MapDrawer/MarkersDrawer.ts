import throttle from 'lodash/throttle'
import type { GeoJSONSource } from 'mapbox-gl'
import { v4 as uuid } from 'uuid'

import { MapAdapter } from '@/modules/map/base'
import { PopupBehavior } from '@/modules/map/base/MapDrawer/MapDrawer'
import { diversifyFeaturesCoordinates } from '@/modules/map/utils'

import {
  MarkerFeature,
  MarkerInfo,
  MarkerPointerProperties,
  MarkerPointerType,
  Markers,
} from '../../types'

const HANDLE_RENDER_MAP_THROTTLE = 500
export const IS_VANISHING_MARKER_PROPERTY = 'isVanishing'
export const IS_HIGHLIGHT_MARKER_PROPERTY = 'isHighlight'
export const IS_FAVORITE_MARKER_PROPERTY = 'isFavorite'
export const IS_FOCUS_MARKER_PROPERTY = 'isFocus'

type MarkersTypesOptions = {
  propsIdName?: string
  anchor?: 'center' | 'bottom'
  popupOffset?: number
  popupBehavior?: PopupBehavior
  propertiesNames?: string[]
}

export type AddMarkersOptions = {
  withClustering?: boolean
  withDiversify?: boolean
  filter?: (
    marker: MarkerInfo,
    options: { zoom: number; index: number },
  ) => boolean
}

const MARKERS_TYPES: Record<MarkerPointerType, MarkersTypesOptions> = {
  post: {
    propsIdName: 'postId',
    popupBehavior: 'hover',
    popupOffset: 30,
    propertiesNames: ['photoUrl', 'isRead'],
    anchor: 'bottom',
  },
  realEstate: {
    propsIdName: 'listingId',
    popupBehavior: 'hover',
    anchor: 'bottom',
    propertiesNames: ['price', 'isViewed', 'isFavorite'],
  },
  listingsGroup: {
    propsIdName: 'addressSlug',
    propertiesNames: ['qty', 'regionSlug'],
  },
  geoPosition: {
    popupBehavior: 'hover',
    propsIdName: 'name',
  },
  selectedProperty: { propsIdName: 'name' },
  score: {
    propsIdName: 'name',
    anchor: 'bottom',
    propertiesNames: ['score'],
    popupBehavior: 'hover',
  },
  unknown: {},
  cluster: {},
}

export class MarkersDrawer {
  private _mapAdapter: MapAdapter
  private _markers: Markers = {}
  private _renderMarkersCallback?: (markersOnScreen: Markers) => void
  private _sourceId: string | null = null
  private _markersState: Record<string, any> = {}

  constructor(mapAdapter: MapAdapter) {
    this._mapAdapter = mapAdapter
  }

  get sourceId() {
    return this._sourceId
  }

  async drawMarkers(
    features: MarkerFeature[],
    options: AddMarkersOptions,
    callback: (markersOnScreen: Markers) => void,
  ): Promise<string> {
    // TODO maybe delete this function?
    const actualFeatures = options.withDiversify
      ? diversifyFeaturesCoordinates(features)
      : features

    if (this._sourceId) {
      const source = this._mapAdapter.getSource(this._sourceId) as GeoJSONSource

      if (source) {
        source.setData({
          type: 'FeatureCollection',
          features: actualFeatures,
        })
      }
    } else {
      this._sourceId = this._createSourceAndLayer(
        actualFeatures,
        options.withClustering,
      )
    }

    this._subscribeRenderMap(this._sourceId, options, callback)

    return this._sourceId
  }

  clearMarkers(): void {
    if (!this._sourceId || !this._mapAdapter.getSource(this._sourceId)) {
      return
    }

    Object.values(this._markers).forEach((markerInfo) => {
      markerInfo.marker.remove()
    })

    this._mapAdapter.removeLayer(`${this._sourceId}-layer`)
    this._mapAdapter.removeSource(this._sourceId)

    this._sourceId = null
    this._markers = {}
  }

  setMarkerState(markersId: string, key: string, value: any) {
    if (!this._markersState[markersId]) {
      this._markersState[markersId] = {}
    }

    this._markersState[markersId][key] = value as boolean

    if (this._markers[markersId]) {
      this._markers[markersId].properties[key] = value as boolean
    }

    this._renderMarkersCallback?.({ ...this._markers })
  }

  private _subscribeRenderMap = (
    sourceId: string,
    options: AddMarkersOptions,
    callback: (markersOnScreen: Markers) => void,
  ) => {
    this._renderMarkersCallback = callback

    // wait source loading
    const unsubscribe = this._mapAdapter.on(
      'render',
      throttle(async () => {
        if (
          this._mapAdapter.getSource(sourceId) &&
          this._mapAdapter.isSourceLoaded(sourceId)
        ) {
          unsubscribe()
          const result = await this._updateMarkers(sourceId, options)

          if (result?.isNewMarkers) {
            this._removeExtraMarkers(this._markers)
            this._markers = result.markers
            callback(this._markers)
          }
        }
      }, HANDLE_RENDER_MAP_THROTTLE),
    )
  }

  private async _updateMarkers(
    sourceId: string,
    addMarkersOptions: AddMarkersOptions,
  ): Promise<{ markers: Markers; isNewMarkers: boolean } | void> {
    let newMarkers: Markers = {}
    const features = this._mapAdapter.querySourceFeatures(sourceId)

    for (const feature of features) {
      const coords = (feature.geometry as { coordinates: any }).coordinates
      const props = feature.properties

      if (!props) {
        continue
      }

      let id: string
      let featureType: MarkerPointerType
      let options: MarkersTypesOptions

      if (props.cluster) {
        id = props.cluster_id
        featureType = 'cluster'
        options = { propsIdName: '' }
      } else {
        featureType = props.type
        options = MARKERS_TYPES[featureType]
        id = options.propsIdName ? props[options.propsIdName] : null
      }

      if (!id) {
        continue
      }

      const properties: MarkerPointerProperties = { type: featureType }

      options.propertiesNames?.forEach((name) => {
        properties[name] = props[name]
      })

      newMarkers[id] =
        this._markers[id] ??
        (await this._createMarkerInfo(sourceId, coords, {
          isCluster: !!props.cluster,
          anchor: options.anchor,
          clusterCount: props.point_count,
          popupBehavior: options.popupBehavior,
          properties,
          popupOffset: options.popupOffset,
        }))
    }

    Object.entries(this._markersState).forEach(([id, state]) => {
      if (newMarkers[id]) {
        newMarkers[id].properties = { ...newMarkers[id].properties, ...state }
      }
    })

    if (addMarkersOptions.filter) {
      newMarkers = this._handleFilterMarkers(
        newMarkers,
        addMarkersOptions.filter,
      )
    }

    for (const id in newMarkers) {
      this._mapAdapter.addMarkerToMap(newMarkers[id].marker)
    }

    const isNewMarkers = Object.keys(newMarkers).some(
      (id) => !this._markers[id],
    )

    return {
      markers: newMarkers,
      isNewMarkers,
    }
  }

  private _removeExtraMarkers(oldMarkers: Markers): void {
    Object.keys(oldMarkers)
      .filter((oldMarkerId) => !this._markers[oldMarkerId])
      .forEach((oldMarkerId) => {
        const markerInfo = this._markers[oldMarkerId]
        markerInfo.marker.remove()
      })
  }

  private async _createMarkerInfo(
    sourceId: string,
    coords: [number, number],
    options: {
      isCluster: boolean
      popupOffset?: number
      anchor?: 'center' | 'bottom'
      clusterCount?: number
      popupBehavior?: PopupBehavior
      properties?: MarkerPointerProperties
      id?: string
    },
  ): Promise<MarkerInfo> {
    const markerElement = document.createElement('div')

    const Mapbox = await import('mapbox-gl')

    // Add markers as layer https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    const marker = new Mapbox.Marker(markerElement).setLngLat(coords)

    const cluster = options.isCluster
      ? { count: options.clusterCount || 2 }
      : null

    return {
      marker,
      cluster,
      sourceId,
      properties: options.properties || { type: 'unknown' },
    }
  }

  private _handleFilterMarkers(
    markers: Markers,
    filter: (
      markerInfo: MarkerInfo,
      options: { zoom: number; index: number },
    ) => boolean,
  ) {
    const { zoom } = this._mapAdapter.getPosition()

    return Object.entries(markers).reduce((acc, [id, markerInfo], index) => {
      if (
        filter?.(markerInfo, {
          zoom,
          index,
        })
      ) {
        acc[id] = markerInfo
      }

      return acc
    }, {} as Markers)
  }

  private _createSourceAndLayer(
    features: MarkerFeature[],
    withClustering = false,
  ) {
    const sourceId = uuid()

    this._mapAdapter.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features,
      },
      cluster: withClustering || false,
      clusterRadius: 40,
      clusterMaxZoom: 16,
    })

    this._mapAdapter.addLayer({
      id: `${sourceId}-layer`,
      type: 'symbol',
      source: sourceId,
    })

    return sourceId
  }
}
