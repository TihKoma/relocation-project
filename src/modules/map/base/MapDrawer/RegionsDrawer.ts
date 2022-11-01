import type { Expression, GeoJSONSource } from 'mapbox-gl'
import { v4 as uuid } from 'uuid'

import { LightTheme } from '@/styles/themes'

import { MapAdapter } from '../../base'
import { GeoFeature } from '../../types'

export type RegionsDrawerOptions = {
  borderWidth?: number | Expression
  borderColor?: string | Expression
  fillColor?: string | Expression
  fillOpacity?: string | Expression
}

export const HIGHLIGHT_REGION_STATE_KEY = 'highlight'
export const HOVER_REGION_STATE_KEY = 'hover'

type LayerIds = {
  layerLineId: string
  layerBackgroundId: string
}

export class RegionsDrawer {
  private _mapAdapter: MapAdapter
  private _mapDrawerOptions: RegionsDrawerOptions
  private _sourceId: string | null = null
  private _regionsFeatures: GeoFeature[] = []

  constructor(mapAdapter: MapAdapter, mapDrawerOptions: RegionsDrawerOptions) {
    this._mapAdapter = mapAdapter
    this._mapDrawerOptions = mapDrawerOptions
  }

  resetHighlights() {
    this._regionsFeatures.forEach((feature) => {
      if (!this._sourceId) {
        return
      }

      this._mapAdapter.setFeatureState(
        this._sourceId,
        feature.properties.regionId,
        HIGHLIGHT_REGION_STATE_KEY,
        false,
      )
    })
  }

  setHighlightRegion(regionId: string, value: boolean) {
    if (!this._sourceId) {
      return
    }

    this._mapAdapter.setFeatureState(
      this._sourceId,
      regionId,
      HIGHLIGHT_REGION_STATE_KEY,
      value,
    )
  }

  setHoverRegion(regionId: string, value: boolean) {
    if (!this._sourceId) {
      return
    }

    this._mapAdapter.setFeatureState(
      this._sourceId,
      regionId,
      HOVER_REGION_STATE_KEY,
      value,
    )
  }

  getGeoFeatureById(id: string) {
    return this._regionsFeatures.find(
      (feature) => feature.properties.regionId === id,
    )
  }

  drawRegions(
    features: GeoFeature[],
    layers: { backgrounds: boolean; borders: boolean },
    redraw: boolean = false,
  ): void {
    const actualFeatures = features.map((feature, index) => ({
      ...feature,
      id: index,
      properties: {
        ...feature.properties,
        regionId: feature.id,
      },
    }))
    if (this._sourceId) {
      if (redraw) {
        this._removeLayers(this._sourceId)
      }

      const onlyNewFeatures = this._getOnlyNewRegionFeatures(actualFeatures)

      if (onlyNewFeatures.length > 0) {
        const source = this._mapAdapter.getSource(
          this._sourceId,
        ) as GeoJSONSource

        this._regionsFeatures = [...this._regionsFeatures, ...onlyNewFeatures]

        if (source) {
          source.setData({
            type: 'FeatureCollection',
            features: this._regionsFeatures,
          })
        }
      }

      if (redraw) {
        const { layerBackgroundId, layerLineId } = generateLayerIds(
          this._sourceId,
        )

        if (layers.borders) {
          this._drawBordersLayer(this._sourceId, layerLineId)
        }

        if (layers.backgrounds) {
          this._drawBackgroundsLayer(this._sourceId, layerBackgroundId)
        }
      }
    } else {
      this._regionsFeatures = actualFeatures

      const { layerLineId, layerBackgroundId, sourceId } = this._addSource(
        this._regionsFeatures,
      )

      if (layers.borders) {
        this._drawBordersLayer(sourceId, layerLineId)
      }

      if (layers.backgrounds) {
        this._drawBackgroundsLayer(sourceId, layerBackgroundId)
      }
    }
  }

  resetLayers() {
    if (this._sourceId) {
      this._removeLayers(this._sourceId)
    }
  }

  setVisibilityFeatureById(featureId: string, value: boolean) {
    if (!this._sourceId) {
      return
    }

    const { layerBackgroundId, layerLineId } = generateLayerIds(this._sourceId)
    ;[layerLineId, layerBackgroundId].forEach((layerId) => {
      this._mapAdapter.setFilter(layerId, [
        value ? '==' : '!=',
        ['get', 'id'],
        featureId,
      ])
    })
  }

  private _getOnlyNewRegionFeatures(features: GeoFeature[]) {
    return features
      .filter(
        ({ properties }) =>
          !this._regionsFeatures.some(
            (feature) => feature.properties.regionId === properties.regionId,
          ),
      )
      .map(({ properties, ...feature }) => ({
        properties: { ...properties, id: feature.id },
        ...feature,
      }))
  }

  queryRenderedFeaturesByPoint(point: [number, number]) {
    return this._mapAdapter.queryRenderedFeatures(point)
  }

  _removeLayers(sourceId: string) {
    const { layerBackgroundId, layerLineId } = generateLayerIds(sourceId)

    if (this._mapAdapter.getLayer(layerLineId)) {
      this._mapAdapter.removeLayer(layerLineId)
    }
    if (this._mapAdapter.getLayer(layerBackgroundId)) {
      this._mapAdapter.removeLayer(layerBackgroundId)
    }

    this._regionsFeatures = []
  }

  _removeSource(sourceId: string) {
    this._removeLayers(sourceId)

    if (this._mapAdapter.getSource(sourceId)) {
      this._mapAdapter.removeSource(sourceId)
    }

    this._sourceId = null
  }

  private _addSource(features: GeoFeature[]): LayerIds & { sourceId: string } {
    const sourceId = uuid()
    const layerIds = generateLayerIds(sourceId)

    this._mapAdapter.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features,
      },
      generateId: true,
      promoteId: 'regionId',
    })

    this._sourceId = sourceId

    return { ...layerIds, sourceId: this._sourceId }
  }

  private _drawBordersLayer(layerSourceId: string, layerLineId: string) {
    this._mapAdapter.addLayer({
      id: layerLineId,
      type: 'line',
      source: layerSourceId,
      paint: {
        'line-color': [
          'case',
          ['boolean', ['feature-state', HIGHLIGHT_REGION_STATE_KEY], false],
          LightTheme.pluto,
          this._mapDrawerOptions.borderColor,
        ],
        'line-width': this._mapDrawerOptions.borderWidth,
      },
    })
  }

  private _drawBackgroundsLayer(
    layerSourceId: string,
    layerBackgroundId: string,
  ) {
    this._mapAdapter.addLayer({
      id: layerBackgroundId,
      type: 'fill',
      source: layerSourceId,
      paint: {
        'fill-color': this._mapDrawerOptions.fillColor,
      },
    })
  }
}

const generateLayerIds = (layerId: string): LayerIds => {
  return {
    layerLineId: `${layerId}-layer-line-id`,
    layerBackgroundId: `${layerId}-layer-background-id`,
  }
}
