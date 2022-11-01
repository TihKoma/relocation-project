import { MapAdapter, MapDrawer } from '../../base'
import { Coordinates, Markers } from '../../types'

export const MARKER_CURRENT_PROPERTY_ID = 'currentProperty'

export class PropertyMarkerMapDrawer {
  private _mapDrawerMarker: MapDrawer

  constructor(mapAdapter: MapAdapter) {
    this._mapDrawerMarker = new MapDrawer(mapAdapter, {})
  }

  drawMarker(
    coordinates: Coordinates,
    callback: (markersOnScreen: Markers) => void,
  ): Promise<string> {
    this._mapDrawerMarker.clearMarkers()
    return this._mapDrawerMarker.drawMarkers(
      {
        selectedProperty: [
          {
            type: 'Feature',
            id: MARKER_CURRENT_PROPERTY_ID,
            properties: {
              name: MARKER_CURRENT_PROPERTY_ID,
              slug: '',
              type: 'selectedProperty',
            },
            geometry: {
              coordinates,
              type: 'Point',
            },
          },
        ],
      },
      {},
      callback,
    )
  }

  resetMarker() {
    this._mapDrawerMarker.clearMarkers()
  }
}
