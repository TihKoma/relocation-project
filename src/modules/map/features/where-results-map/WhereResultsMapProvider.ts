import { ApolloClient } from '@apollo/client'

import {
  HIGHLIGHT_REGION_STATE_KEY,
  MapAdapter,
  MapDrawer,
  MapEvents,
  MapPosition,
  MapProvider,
  MapServerApi,
} from '@/modules/map/base'
import { NEIGHBORHOOD_BORDER_LINE_WIDTH } from '@/modules/map/features/consts'
import { LightTheme } from '@/styles/themes'

import { WhereResultsMapFacade } from './WhereResultsMapFacade'

export class WhereResultsMapProvider extends MapProvider<WhereResultsMapFacade> {
  createMapFacade(
    quizId: string,
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ): WhereResultsMapFacade {
    const mapPosition = new MapPosition(mapAdapter!)
    const mapDrawer = new MapDrawer(mapAdapter, {
      borderWidth: NEIGHBORHOOD_BORDER_LINE_WIDTH,
      borderColor: LightTheme.umbriel,
      fillColor: [
        'case',
        ['boolean', ['feature-state', HIGHLIGHT_REGION_STATE_KEY], false],
        LightTheme.hydra,
        [
          'step',
          ['get', 'score'],
          LightTheme.eris,
          20,
          LightTheme.ganymede,
          30,
          LightTheme.mimas,
          40,
          LightTheme.dione,
          50,
          LightTheme.lapetus,
          60,
          LightTheme.thebe,
          75,
          LightTheme.nix,
        ],
      ],
    })
    const mapServerApi = new MapServerApi(apolloClient)

    this._mapFacade = new WhereResultsMapFacade(
      quizId,
      mapDrawer,
      mapEvents,
      mapServerApi,
      mapPosition,
    )

    this._mapFacadePromiseResolver?.(this._mapFacade)

    return this._mapFacade
  }
}
