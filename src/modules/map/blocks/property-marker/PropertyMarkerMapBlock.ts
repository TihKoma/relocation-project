import { MapAdapter } from '@/modules/map/base'
import {
  CanDrawMarkers,
  DrawMarkersMapBlock,
} from '@/modules/map/blocks/draw-markers'
import {
  Coordinates,
  Markers,
  OnMarkersDrawnCallback,
} from '@/modules/map/types'

import { PropertyMarkerMapDrawer } from './PropertyMarkerMapDrawer'

export interface CanDrawPropertyMarker {
  drawPropertyMarker: (coords: Coordinates) => void
  onPropertyMarkerDrawn: (callback: OnMarkersDrawnCallback) => () => void
}

export class PropertyMarkerMapBlock implements CanDrawMarkers {
  private _drawer: PropertyMarkerMapDrawer
  private _drawMarkersBlock: DrawMarkersMapBlock

  constructor(mapAdapter: MapAdapter) {
    this._drawer = new PropertyMarkerMapDrawer(mapAdapter)
    this._drawMarkersBlock = new DrawMarkersMapBlock()
  }

  drawPropertyMarker(coords: Coordinates) {
    this._drawer.drawMarker(coords, this.drawMarkersCallback)
  }

  onMarkersDrawn(callback: OnMarkersDrawnCallback) {
    return this._drawMarkersBlock.onMarkersDrawn(callback)
  }

  drawMarkersCallback = (markers: Markers) => {
    return this._drawMarkersBlock.drawMarkersCallback(markers)
  }
}
