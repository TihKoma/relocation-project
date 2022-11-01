import type { FitBoundsOptions, GeoJSONSource } from 'mapbox-gl'

import {
  convertBBoxListToObject,
  isBoxContainBox,
  isBoxContainCoordinates,
  scaleBox,
} from '@/modules/map/utils'

import { BBoxObject, Coordinates, Position } from '../types'
import { BBoxList, GeoFeature } from '../types'
import { MapAdapter } from './MapAdapter'

export class MapPosition {
  private _mapAdapter: MapAdapter

  constructor(mapAdapter: MapAdapter) {
    this._mapAdapter = mapAdapter
  }

  easeToCluster(sourceId: string, clusterId: number, coordinates: Coordinates) {
    const source = this._mapAdapter.getSource(sourceId) as GeoJSONSource

    source.getClusterExpansionZoom(clusterId, (err: Error, zoom: number) => {
      if (err) return

      this._mapAdapter.easeTo(coordinates, zoom)
    })
  }

  easeToPoint(coordinates: Coordinates, zoom?: number) {
    const { zoom: currentZoom } = this.getPosition()
    this._mapAdapter.easeTo(coordinates, zoom || currentZoom)
  }

  flyTo(coordinates: Coordinates, zoom?: number) {
    const { zoom: currentZoom, bbox } = this.getPosition()
    const flyToOptions = isBoxContainCoordinates(scaleBox(2, bbox), coordinates)
      ? { zoom: zoom || currentZoom }
      : {
          zoom: zoom || currentZoom,
          duration: 0,
        }
    this._mapAdapter.flyTo(coordinates, flyToOptions)
  }

  getCenter() {
    return this._mapAdapter.getCenter()
  }

  fitBBox(bbox: BBoxObject, options: FitBoundsOptions) {
    const { bbox: currentBbox } = this.getPosition()
    const fitBoundsOptions = isBoxContainBox(scaleBox(2, currentBbox), bbox)
      ? options
      : { ...options, duration: 0 }
    this._mapAdapter.fitBounds(
      [bbox.left, bbox.bottom, bbox.right, bbox.top],
      fitBoundsOptions,
    )
  }

  fitBounds(feature: GeoFeature, options?: FitBoundsOptions): void {
    const { bbox: currentBbox } = this.getPosition()
    const scaledBbox = scaleBox(2, currentBbox)
    if (feature.geometry.bbox?.length === 4) {
      const fitBoundsOptions = isBoxContainBox(
        scaledBbox,
        convertBBoxListToObject(feature.geometry.bbox),
      )
        ? {
            ...options,
            padding: options?.padding || {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            },
          }
        : {
            ...options,
            duration: 0,
            padding: options?.padding || {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            },
          }
      this._mapAdapter.fitBounds(feature.geometry.bbox, fitBoundsOptions)
      return
    }

    const boundary = (
      feature.geometry.type === 'MultiPolygon'
        ? feature.geometry.coordinates?.flat(2)
        : feature.geometry.coordinates?.flat(1)
    ).reduce(
      (acc, [x, y]) => {
        if (x > acc.x.max) {
          acc.x.max = x
        }
        if (x < acc.x.min) {
          acc.x.min = x
        }

        if (y > acc.y.max) {
          acc.y.max = y
        }
        if (y < acc.y.min) {
          acc.y.min = y
        }
        return acc
      },
      {
        x: { max: -Infinity, min: Infinity },
        y: { max: -Infinity, min: Infinity },
      },
    )
    const bbox = [
      boundary.x.min,
      boundary.y.min,
      boundary.x.max,
      boundary.y.max,
    ] as BBoxList
    const fitBoundsOptions = isBoxContainBox(
      scaledBbox,
      convertBBoxListToObject(bbox),
    )
      ? {
          ...options,
          padding: options?.padding || {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        }
      : {
          ...options,
          duration: 0,
          padding: options?.padding || {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        }
    this._mapAdapter.fitBounds(bbox, fitBoundsOptions)
  }

  getPosition(): { zoom: number; bbox: Position; center: Coordinates } {
    return this._mapAdapter.getPosition()
  }
  zoomIn() {
    this._mapAdapter.zoomIn()
  }
  zoomOut() {
    this._mapAdapter.zoomOut()
  }
  zoomTo(zoom: number) {
    return this._mapAdapter.zoomTo(zoom)
  }
}
