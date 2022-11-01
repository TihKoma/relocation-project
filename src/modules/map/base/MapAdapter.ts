import type {
  AnyLayer,
  AnySourceData,
  EventedListener,
  FilterOptions,
  FitBoundsOptions,
  FlyToOptions,
  GeolocateControl,
  Map as MapboxMap,
  MapboxGeoJSONFeature,
  MapLayerEventType,
  Marker,
  PointLike,
  Popup,
} from 'mapbox-gl'

import { calcPaddingForLayout } from '@/modules/map'
import { MAPBOX_KEY } from '@/modules/utils/config'

import {
  BBoxList,
  Coordinates,
  GeoControlEvents,
  MapEvent,
  Position,
} from '../types'

const MAP_STYLE_LINK = 'mapbox://styles/nicity/cl3iom67l000n15quogbxbrd0'
const DEFAULT_MAP_ZOOM = 1
const DEFAULT_MAP_MIN_ZOOM = 0
const ERROR_TEXT_MAP_API = 'There is not map api'

// TODO remove checking mapApi https://nicity.atlassian.net/browse/CP-1406
export class MapAdapter {
  private _mapApi?: MapboxMap
  private _geoControl?: GeolocateControl

  async init(
    element: HTMLDivElement,
    {
      center,
      zoom,
      minZoom,
      withPaddingLeft,
    }: {
      center?: [number, number]
      zoom?: number
      minZoom?: number
      withPaddingLeft?: boolean
    } = {},
  ): Promise<void> {
    try {
      const Mapbox = await import('mapbox-gl')
      this._mapApi = new Mapbox.Map({
        accessToken: MAPBOX_KEY,
        container: element,
        style: MAP_STYLE_LINK,
        center: center || [0, 0],
        zoom: zoom || DEFAULT_MAP_ZOOM,
        minZoom: minZoom || DEFAULT_MAP_MIN_ZOOM,
      })
      if (withPaddingLeft) {
        this._setPaddingOnAreaPage()
      }
      this._setGeolocateControl(Mapbox)
      await new Promise((resolve) => this._mapApi?.on('load', resolve))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  triggerCurrentGeoPosition() {
    this._geoControl?.trigger()
  }

  private _setPaddingOnAreaPage() {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.setPadding(calcPaddingForLayout())
  }

  setMinZoom(value: number) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.setMinZoom(value)
  }

  private async _setGeolocateControl(Mapbox: any) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }
    const control: GeolocateControl = new Mapbox.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
      showUserHeading: false,
      showAccuracyCircle: false,
    })
    this._mapApi.addControl(control)
    this._geoControl = control
  }

  onGeoControl(name: GeoControlEvents, callback: EventedListener) {
    this._geoControl?.on(name, callback)
    return () => {
      this._geoControl?.off(name, callback)
    }
  }
  on(
    name: string,
    callback: (event: MapEvent) => void,
    layerId?: string,
  ): () => void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }
    if (layerId) {
      this._mapApi.on(name as keyof MapLayerEventType, layerId, callback)
    } else {
      this._mapApi.on(name, callback)
    }

    return () => {
      if (!this._mapApi) {
        throw new Error(ERROR_TEXT_MAP_API)
      }
      if (layerId) {
        this._mapApi.off(name as keyof MapLayerEventType, layerId, callback)
      } else {
        this._mapApi.off(name, callback)
      }
    }
  }

  fitBounds(bbox: BBoxList, options: FitBoundsOptions): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.fitBounds(bbox, options)
  }

  setFeatureState(
    sourceId: string,
    featureId: string,
    stateName: string,
    stateValue: string | number | boolean,
  ): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.setFeatureState(
      { source: sourceId, id: featureId },
      { [stateName]: stateValue },
    )
  }

  getFeatureState(sourceId: string, featureId: string) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.getFeatureState({ source: sourceId, id: featureId })
  }

  zoomIn(): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.zoomIn()
  }

  zoomOut(): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.zoomOut()
  }

  zoomTo(zoom: number) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.zoomTo(zoom)
  }

  getCenter() {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.getCenter()
  }

  getPosition(): { zoom: number; bbox: Position; center: Coordinates } {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }
    const bounds = this._mapApi.getBounds()

    const bbox = {
      top: bounds.getNorth(),
      left: bounds.getWest(),
      right: bounds.getEast(),
      bottom: bounds.getSouth(),
    }

    const { lat, lng } = this._mapApi.getCenter()
    const zoom = this._mapApi.getZoom()

    return {
      zoom,
      bbox,
      center: [lng, lat],
    }
  }
  setFilter(
    layerId: string,
    filter?: boolean | any[] | null | undefined,
    options?: FilterOptions | null | undefined,
  ) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.setFilter(layerId, filter, options)
  }
  addSource(id: string, source: AnySourceData): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.addSource(id, source)
  }
  getSource(id: string) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.getSource(id)
  }
  removeSource(id: string) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.removeSource(id)
  }
  addLayer(layer: AnyLayer, before?: string): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.addLayer(layer, before)
  }
  getLayer(id: string): AnyLayer {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.getLayer(id)
  }
  removeLayer(id: string): void {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.removeLayer(id)
  }
  easeTo(coordinates: [number, number], zoom: number) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi?.easeTo({
      center: coordinates,
      zoom,
    })
  }

  queryRenderedFeatures(
    pointOrBox?: PointLike | [PointLike, PointLike],
    options?: {
      layers?: string[] | undefined
      filter?: any[] | undefined
    } & FilterOptions,
  ): MapboxGeoJSONFeature[] {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.queryRenderedFeatures(pointOrBox, options)
  }

  flyTo(coordinates: [number, number], options: FlyToOptions) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    this._mapApi.flyTo({
      center: coordinates,
      ...options,
    })
  }

  isSourceLoaded(sourceId: string) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.isSourceLoaded(sourceId)
  }

  querySourceFeatures(sourceId: string) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    return this._mapApi.querySourceFeatures(sourceId)
  }

  addMarkerToMap(marker: Marker) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    marker.addTo(this._mapApi)
  }

  addPopupToMap(popup: Popup) {
    if (!this._mapApi) {
      throw new Error(ERROR_TEXT_MAP_API)
    }

    popup.addTo(this._mapApi)
  }
}
