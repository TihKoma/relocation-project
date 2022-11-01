import { BBoxObject } from '@/modules/map'
import {
  MapDrawer,
  MapEvents,
  MapFacade,
  MapPosition,
  MapServerApi,
} from '@/modules/map/base'
import { MarkerFeature } from '@/modules/map/types'
import { isBoxContainBox } from '@/modules/map/utils'
import { NeighborhoodInfo } from '@/modules/quiz'

export class WhereResultsMapFacade extends MapFacade {
  private _prevZoom?: number | null
  private _bboxLoaded?: BBoxObject | null
  private readonly _quizId: string
  private _neighborhoodsInfo: NeighborhoodInfo[] = []
  private _quizInfo: Record<string, { withSteps: boolean }> = {}
  private _markers: MarkerFeature[] = []

  constructor(
    quizId: string,
    mapDrawer: MapDrawer,
    mapEvents: MapEvents,
    mapServerApi: MapServerApi,
    mapPosition: MapPosition,
  ) {
    super(mapDrawer, mapEvents, mapServerApi, mapPosition)

    this._quizId = quizId
  }

  get activeQuizId() {
    return this._quizId
  }

  async drawNeighborhoodsAndMarkersByBBox(position = 0, limit = 0) {
    const { zoom: currentZoom, bbox: currentBBox } =
      this._mapPosition.getPosition()

    let redraw = true
    if (currentZoom === this._prevZoom) {
      if (this._bboxLoaded && isBoxContainBox(this._bboxLoaded, currentBBox)) {
        return // don't need to get regions
      } else {
        redraw = false
      }
    }

    try {
      this._prevZoom = currentZoom
      this._bboxLoaded = currentBBox
      const { features, locations, withSteps } =
        await this._mapServerApi.getQuizByBBox(
          this._quizId,
          position,
          limit,
          currentZoom,
          currentBBox,
        )

      this._neighborhoodsInfo = locations
      this._quizInfo[this._quizId] = { withSteps }

      const layers = { backgrounds: true, borders: true }

      if (currentZoom >= 12) {
        this._mapDrawer.drawRegions(features, layers, redraw)
      } else {
        this._mapDrawer.resetLayers()
      }

      let featuresForRender = features
      if (currentZoom < 12 && features.length > 50) {
        featuresForRender = features
          .slice(0, 50)
          .sort((a, b) => a.properties.score - b.properties.score)
      }

      const markers: MarkerFeature[] = featuresForRender.map((feature) => ({
        type: 'Feature',
        id: feature.id,
        properties: {
          name: feature.id as string,
          slug: feature.properties.slug,
          score: feature.properties.score,
          type: 'score',
        },
        geometry: {
          type: 'Point',
          coordinates: feature.properties.markerPoint,
        },
      }))

      this._markers = markers

      await this._mapDrawer.drawMarkers(
        { score: markers },
        {
          filter: (_, { zoom, index }) =>
            zoom >= 12 || (zoom < 12 && index < 50),
        },
        this.drawMarkersCallback,
      )

      return { bbox: currentBBox }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  getMarkers() {
    return this._markers
  }

  getNeighborhoodInfoById(
    neighborhoodId: string,
  ): NeighborhoodInfo | undefined {
    return this._neighborhoodsInfo.find((info) => info.id === neighborhoodId)
  }

  getQuizInfoById(quizId: string) {
    return this._quizInfo[quizId]
  }

  async highlightNeighborhoodById(
    id: string,
    options?: { fit?: boolean; reset?: boolean },
  ) {
    const feature = await super.highlightNeighborhoodById(id, options)
    this.highlightMarkerById(id)

    return feature
  }

  resetNeighborhoodHighlightById(id: string) {
    const feature = super.resetNeighborhoodHighlightById(id)

    this.resetHighlightMarkerById(id)

    return feature
  }

  resetMap() {
    this._prevZoom = null
    this._mapDrawer.resetLayers()
  }
}
