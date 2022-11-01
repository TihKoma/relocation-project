import { ApolloClient } from '@apollo/client'

import {
  HIGHLIGHT_REGION_STATE_KEY,
  HOVER_REGION_STATE_KEY,
  MapAdapter,
  MapDrawer,
  MapEvents,
  MapPosition,
  MapProvider,
  MapServerApi,
} from '@/modules/map/base'
import {
  NEIGHBORHOOD_ACTIVE_BORDER_COLOR,
  NEIGHBORHOOD_ACTIVE_BORDER_LINE_WIDTH,
  NEIGHBORHOOD_PASSIVE_BORDER_COLOR,
  NEIGHBORHOOD_PASSIVE_BORDER_LINE_WIDTH,
} from '@/modules/map/features/consts'
import { LightTheme } from '@/styles/themes'

import { AreaMapFacade } from './AreaMapFacade'

export class AreaMapProvider extends MapProvider<AreaMapFacade> {
  createMapFacade(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ): AreaMapFacade {
    const mapPosition = new MapPosition(mapAdapter!)
    const mapServerApi = new MapServerApi(apolloClient)

    const drawer = new MapDrawer(mapAdapter, {
      borderWidth: [
        'case',
        ['boolean', ['feature-state', HIGHLIGHT_REGION_STATE_KEY], false],
        NEIGHBORHOOD_ACTIVE_BORDER_LINE_WIDTH,
        NEIGHBORHOOD_PASSIVE_BORDER_LINE_WIDTH,
      ],
      borderColor: [
        'case',
        ['boolean', ['feature-state', HIGHLIGHT_REGION_STATE_KEY], false],
        NEIGHBORHOOD_ACTIVE_BORDER_COLOR,
        NEIGHBORHOOD_PASSIVE_BORDER_COLOR,
      ],
      fillColor: [
        'case',
        ['boolean', ['feature-state', HOVER_REGION_STATE_KEY], false],
        LightTheme.neptune50,
        'transparent',
      ],
    })

    this._mapFacade = new AreaMapFacade(
      drawer,
      mapEvents,
      mapServerApi,
      mapPosition,
    )

    this._mapFacadePromiseResolver?.(this._mapFacade)

    return this._mapFacade
  }
}
