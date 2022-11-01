import type { EventedListener } from 'mapbox-gl'
import { FitBoundsOptions } from 'mapbox-gl'

import { BBoxObject, Coordinates, Markers } from '@/modules/map'
import {
  CanDrawMarkers,
  DrawMarkersMapBlock,
} from '@/modules/map/blocks/draw-markers'

import {
  GeoControlEvents,
  GeoFeature,
  OnMarkersDrawnCallback,
  Position,
} from '../types'
import { MapDrawer } from './MapDrawer'
import { MapEvents } from './MapEvents'
import { MapPosition } from './MapPosition'
import { MapServerApi } from './MapServerApi'

export class MapFacade implements CanDrawMarkers {
  protected _mapPosition: MapPosition
  protected _mapEvents: MapEvents
  protected _mapDrawer: MapDrawer
  protected _mapServerApi: MapServerApi
  private _drawMarkersBlock: DrawMarkersMapBlock

  constructor(
    mapDrawer: MapDrawer,
    mapEvents: MapEvents,
    mapServerApi: MapServerApi,
    mapPosition: MapPosition,
  ) {
    this._mapDrawer = mapDrawer
    this._mapEvents = mapEvents
    this._mapPosition = mapPosition
    this._mapServerApi = mapServerApi
    this._drawMarkersBlock = new DrawMarkersMapBlock()
  }

  onPositionChange(callback: (bbox: BBoxObject, zoom: number) => void) {
    const unsubscribeZoom = this._mapEvents.on('zoom', () => {
      const { bbox, zoom } = this._mapPosition.getPosition()
      callback(bbox, zoom)
    })
    const unsubscribeDrag = this._mapEvents.on('drag', () => {
      const { bbox, zoom } = this._mapPosition.getPosition()
      callback(bbox, zoom)
    })

    return () => {
      unsubscribeZoom()
      unsubscribeDrag()
    }
  }

  onGeoControl(name: GeoControlEvents, callback: EventedListener) {
    return this._mapEvents.onGeoControl(name, callback)
  }

  easeToCluster(clusterId: number, coordinates: Coordinates) {
    const sourceId = this._mapDrawer.getMarkersSourceId()

    if (sourceId) {
      this._mapPosition.easeToCluster(sourceId, clusterId, coordinates)
    }
  }

  onMarkersDrawn(callback: OnMarkersDrawnCallback) {
    return this._drawMarkersBlock.onMarkersDrawn(callback)
  }

  drawMarkersCallback = (markers: Markers) => {
    return this._drawMarkersBlock.drawMarkersCallback(markers)
  }

  flyTo(coordinates: Coordinates, zoom?: number) {
    this._mapPosition.flyTo(coordinates, zoom)
  }

  fitBbox(bbox: Position, options?: FitBoundsOptions) {
    const currentOptions = options
      ? options
      : {
          padding: {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40,
          },
        }
    this._mapPosition.fitBBox(bbox, currentOptions)
  }

  emitInitMap() {
    this._mapEvents.emitInitMap()
  }

  easeToPost(coordinates: Coordinates, zoom?: number) {
    return this._mapPosition.easeToPoint(coordinates, zoom)
  }

  zoomIn() {
    this._mapPosition.zoomIn()
  }

  zoomOut() {
    this._mapPosition.zoomOut()
  }

  zoomTo(zoom: number) {
    this._mapPosition.zoomTo(zoom)
  }

  getPosition() {
    return this._mapPosition.getPosition()
  }

  private _prevZoomForRegions: number | null = null
  async drawRegions(
    backgrounds: boolean = false,
    borders: boolean = true,
  ): Promise<void> {
    const { zoom: currentZoom, bbox } = this._mapPosition.getPosition()

    const redraw = currentZoom !== this._prevZoomForRegions

    try {
      this._prevZoomForRegions = currentZoom
      const regions = await this._mapServerApi.getRegionsByCurrentBBox(
        currentZoom,
        bbox,
      )
      this._mapDrawer.drawRegions(
        regions,
        {
          backgrounds,
          borders,
        },
        redraw,
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  getCenter() {
    return this._mapPosition.getCenter()
  }

  protected _highlightedNeighborhoods: GeoFeature[] = []
  async highlightRegionBySlug(
    slug: string,
    options?: { fit?: boolean; reset?: boolean },
  ) {
    try {
      if (options?.reset) {
        this._highlightedNeighborhoods.forEach((neighborhood) => {
          this.resetRegionHighlightBySlug(neighborhood.properties.slug)
        })
      }

      const neighborhood =
        await this._mapServerApi.getNeighborhoodGeoFeatureBySlug(slug)

      this._highlightedNeighborhoods.push(neighborhood)

      this._mapDrawer.setHighlightNeighborhood(neighborhood.id as string, true)

      if (options?.fit) {
        this._mapPosition.fitBounds(neighborhood)
      }

      return neighborhood
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  resetRegionHighlightBySlug(slug: string) {
    const neighborhood = this._highlightedNeighborhoods.find(
      (neighborhood) => neighborhood.properties.slug === slug,
    )

    if (neighborhood) {
      this._highlightedNeighborhoods = this._highlightedNeighborhoods.filter(
        (neighborhood) => neighborhood.properties.slug !== slug,
      )
      this._mapDrawer.setHighlightNeighborhood(neighborhood.id as string, false)
    }

    return neighborhood
  }

  async highlightNeighborhoodById(
    id: string,
    options?: { fit?: boolean; reset?: boolean },
  ) {
    try {
      if (options?.reset) {
        this._highlightedNeighborhoods.forEach((neighborhood) => {
          this.resetNeighborhoodHighlightById(neighborhood.id as string)
        })
      }

      this._mapDrawer.setHighlightNeighborhood(id, true)

      const neighborhood = await this._mapDrawer.getNeighborhoodGeoFeatureById(
        id,
      )

      if (!neighborhood) {
        return
      }

      this._highlightedNeighborhoods.push(neighborhood)

      if (options?.fit) {
        this._mapPosition.fitBounds(neighborhood)
      }

      return neighborhood
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  resetNeighborhoodHighlightById(id: string) {
    const neighborhood = this._highlightedNeighborhoods.find(
      (neighborhood) => neighborhood.properties.regionId === id,
    )

    if (neighborhood) {
      this._highlightedNeighborhoods = this._highlightedNeighborhoods.filter(
        (neighborhood) => neighborhood.properties.regionId !== id,
      )
      this._mapDrawer.setHighlightNeighborhood(id, false)
    }

    return neighborhood
  }

  protected _hoveredNeighborhoods: GeoFeature[] = []
  async hoverNeighborhoodById(id: string) {
    try {
      if (
        this._highlightedNeighborhoods.find(
          (neighborhood) => neighborhood.id === id,
        )
      ) {
        return
      }

      this._hoveredNeighborhoods.forEach((neighborhood) => {
        this.resetNeighborhoodHoverById(neighborhood.id as string)
      })

      this._mapDrawer.setHoverNeighborhood(id, true)

      const neighborhood = await this._mapDrawer.getNeighborhoodGeoFeatureById(
        id,
      )

      if (!neighborhood) {
        return
      }

      this._hoveredNeighborhoods.push(neighborhood)

      return neighborhood
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  resetNeighborhoodHoverById(id: string) {
    const neighborhood = this._hoveredNeighborhoods.find(
      (neighborhood) => neighborhood.properties.regionId === id,
    )

    if (neighborhood) {
      this._hoveredNeighborhoods = this._hoveredNeighborhoods.filter(
        (neighborhood) => neighborhood.properties.regionId !== id,
      )
      this._mapDrawer.setHoverNeighborhood(id, false)
    }

    return neighborhood
  }

  async getNeighborhoodIdByPoint(point: {
    long: number
    lat: number
  }): Promise<{ id: string; slug: string } | undefined> {
    try {
      const { zoom } = this._mapPosition.getPosition()
      const region = await this._mapServerApi.getRegionGeoFeatureByPoint(
        point,
        zoom,
      )

      return {
        id: String(region.id),
        slug: String((region.properties as { slug: string }).slug),
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  resetNeighborhoods() {
    this.clearNeighborhoods()
    this.drawRegions()
  }

  clearNeighborhoods() {
    this._highlightedNeighborhoods.forEach((neighborhood) => {
      this.resetRegionHighlightBySlug(neighborhood.properties.slug)
    })
    this._prevZoomForRegions = null
    return this._mapDrawer.resetLayers()
  }

  clearMarkers() {
    this._mapDrawer.clearMarkers()
  }

  queryRenderedFeaturesByPoint(point: [number, number]) {
    return this._mapDrawer.queryRenderedFeaturesByPoint(point)
  }

  highlightMarkerById(id: string) {
    this._mapDrawer.setHighlightMarker(id, true)
  }

  resetHighlightMarkerById(id: string) {
    this._mapDrawer.setHighlightMarker(id, false)
  }

  addToFavoriteMarker(id: string) {
    this._mapDrawer.setFavoriteMarker(id, true)
  }

  removeFromFavoriteMarker(id: string) {
    this._mapDrawer.setFavoriteMarker(id, false)
  }

  focusMarker(id: string) {
    this._mapDrawer.setFocusMarker(id, true)
  }

  blurMarker(id: string) {
    this._mapDrawer.setFocusMarker(id, false)
  }

  triggerCurrentGeoPosition() {
    this._mapEvents.triggerCurrentGeoPosition()
  }
}
