// TODO separate other domains

import type { GeoJSON } from 'geojson'
import type { EventData, MapboxEvent, Marker, Popup } from 'mapbox-gl'

type GeoJsonProperties = {
  [index: string]: any
}

export type OnMarkersDrawnCallback = (markers: Markers) => void
export type GeoFeature = GeoJSON.Feature<
  GeoJSON.MultiPolygon | GeoJSON.Polygon,
  GeoJsonProperties
>
export type GeoFeaturePoint = GeoJSON.Feature<GeoJSON.Point, GeoJsonProperties>
export type GeoFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.MultiPolygon,
  GeoJsonProperties
>
export type MarkerPointerType =
  | 'realEstate'
  | 'listingsGroup'
  | 'post'
  | 'cluster'
  | 'selectedProperty'
  | 'score'
  | 'geoPosition'
  | 'unknown'
export type MarkerPointerProperties = Record<string, any> & {
  type: MarkerPointerType
}

export type GeoControlEvents =
  | 'trackuserlocationstart'
  | 'trackuserlocationend'
  | 'error'
  | 'geolocate'

export type BackgroundMapName =
  | 'discoveryCP'
  | 'discoveryMP'
  | 'area'
  | 'detailedListing'
  | 'whereResults'
  | 'quizPreview'
  | 'favorites'

export type ParticularMapName = 'choicePoint' | 'choiceNeighborhood'

export type MapName = BackgroundMapName | ParticularMapName

export type MarkerFeature = GeoFeaturePoint & {
  properties: MarkerPointerProperties
}

export type BBoxList = [number, number, number, number]

export type BBoxObject = Position

export type Coordinates = [number, number]

export type MapEvent = MapboxEvent<MouseEvent | TouchEvent | undefined> &
  EventData

export type MarkerInfo = {
  marker: Marker
  cluster: {
    count: number
  } | null
  popup?: {
    popupElement: HTMLDivElement
    popup: Popup
  }
  properties: Record<string, any> & { type: MarkerPointerType }
  sourceId: string
}

export type Markers = Record<string | number, MarkerInfo>

export type Position = {
  top: number
  right: number
  bottom: number
  left: number
}
