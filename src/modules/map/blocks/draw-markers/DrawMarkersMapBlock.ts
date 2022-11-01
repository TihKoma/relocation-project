import { Markers, OnMarkersDrawnCallback } from '@/modules/map/types'

export interface CanDrawMarkers {
  onMarkersDrawn: (callback: OnMarkersDrawnCallback) => () => void
  drawMarkersCallback: (markers: Markers) => void
}

export class DrawMarkersMapBlock implements CanDrawMarkers {
  private _listenersMarkersDrawn: OnMarkersDrawnCallback[] = []

  onMarkersDrawn(callback: OnMarkersDrawnCallback) {
    this._listenersMarkersDrawn.push(callback)

    return () => {
      this._listenersMarkersDrawn = this._listenersMarkersDrawn.filter(
        (handler) => handler !== callback,
      )
    }
  }

  drawMarkersCallback = (markers: Markers) => {
    this._listenersMarkersDrawn.forEach((callback) => callback(markers))
  }
}
