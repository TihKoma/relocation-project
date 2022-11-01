import type { EventedListener } from 'mapbox-gl'

import { GeoControlEvents, MapEvent } from '../types'
import { MapAdapter } from './MapAdapter'

type Events =
  | 'initMap'
  | 'click'
  | 'drag'
  | 'zoom'
  | 'moveend'
  | 'mousemove'
  | 'dragstart'
  | 'dragend'

export class MapEvents {
  private _mapAdapter: MapAdapter
  private _listenersInitMap: ((event?: any) => void)[] = []

  constructor(mapAdapter: MapAdapter) {
    this._mapAdapter = mapAdapter
  }

  on(name: Events, callback: (event: MapEvent) => void): () => void {
    if (name === 'initMap') {
      this._listenersInitMap.push(callback)

      return () => {
        this._listenersInitMap = this._listenersInitMap.filter(
          (handler) => handler !== callback,
        )
      }
    }

    return this._mapAdapter.on(name, callback)
  }

  onGeoControl(name: GeoControlEvents, callback: EventedListener) {
    return this._mapAdapter.onGeoControl(name, callback)
  }

  emitInitMap() {
    this._listenersInitMap.forEach((handler) => handler())
  }

  triggerCurrentGeoPosition() {
    this._mapAdapter.triggerCurrentGeoPosition()
  }
}
