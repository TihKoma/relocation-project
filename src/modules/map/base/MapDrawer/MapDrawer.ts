import { convertGeoFeaturesToMarkersFeatures } from '@/modules/map'

import {
  GeoFeature,
  GeoFeaturePoint,
  MarkerFeature,
  MarkerPointerType,
  Markers,
} from '../../types'
import { MapAdapter } from '../MapAdapter'
import {
  AddMarkersOptions,
  IS_FAVORITE_MARKER_PROPERTY,
  IS_FOCUS_MARKER_PROPERTY,
  IS_HIGHLIGHT_MARKER_PROPERTY,
  MarkersDrawer,
} from './MarkersDrawer'
import { RegionsDrawer, RegionsDrawerOptions } from './RegionsDrawer'

export type PopupBehavior = 'hover' | 'click'

export class MapDrawer {
  private _markersDrawer: MarkersDrawer
  private _regionsDrawer: RegionsDrawer

  constructor(mapAdapter: MapAdapter, options: RegionsDrawerOptions) {
    this._markersDrawer = new MarkersDrawer(mapAdapter)
    this._regionsDrawer = new RegionsDrawer(mapAdapter, options)
  }

  // RegionsDrawer
  drawRegions(
    features: GeoFeature[],
    layers: { backgrounds: boolean; borders: boolean },
    redraw: boolean = false,
  ): void {
    return this._regionsDrawer.drawRegions(features, layers, redraw)
  }

  setVisibilityFeatureById(featureId: string, value: boolean) {
    this._regionsDrawer.setVisibilityFeatureById(featureId, value)
  }

  setHighlightNeighborhood(featureId: string, value: boolean) {
    this._regionsDrawer.setHighlightRegion(featureId, value)
  }

  setHoverNeighborhood(featureId: string, value: boolean) {
    this._regionsDrawer.setHoverRegion(featureId, value)
  }

  resetHighlights() {
    this._regionsDrawer.resetHighlights()
  }

  resetLayers() {
    this._regionsDrawer.resetLayers()
  }

  // MarkersDrawer
  getMarkersSourceId() {
    return this._markersDrawer.sourceId
  }
  drawMarkers(
    features: Partial<Record<MarkerPointerType, GeoFeaturePoint[]>>,
    options: AddMarkersOptions,
    callback: (markersOnScreen: Markers) => void,
  ): Promise<string> {
    const finalFeatures = Object.entries(features).reduce(
      (acc, [key, features]) => {
        return [
          ...acc,
          ...convertGeoFeaturesToMarkersFeatures(
            features,
            key as MarkerPointerType,
          ),
        ]
      },
      [] as MarkerFeature[],
    )
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this._markersDrawer.drawMarkers(
          finalFeatures,
          options,
          callback,
        )
        resolve(result)
      })
    })
  }

  setHighlightMarker(id: string, value: boolean) {
    this._markersDrawer.setMarkerState(id, IS_HIGHLIGHT_MARKER_PROPERTY, value)
  }

  setFavoriteMarker(id: string, value: boolean) {
    this._markersDrawer.setMarkerState(id, IS_FAVORITE_MARKER_PROPERTY, value)
  }

  setFocusMarker(markerId: string, value: boolean) {
    this._markersDrawer.setMarkerState(
      markerId,
      IS_FOCUS_MARKER_PROPERTY,
      value,
    )
  }

  clearMarkers(): void {
    this._markersDrawer.clearMarkers()
  }

  setMarkerState(markerId: string, key: string, value: any) {
    return this._markersDrawer.setMarkerState(markerId, key, value)
  }

  queryRenderedFeaturesByPoint(point: [number, number]) {
    return this._regionsDrawer.queryRenderedFeaturesByPoint(point)
  }

  getNeighborhoodGeoFeatureById(id: string) {
    return this._regionsDrawer.getGeoFeatureById(id)
  }
}
