import { ApolloClient } from '@apollo/client'

import {
  MapAdapter,
  MapDrawer,
  MapEvents,
  MapPosition,
  MapProvider,
  MapServerApi,
} from '@/modules/map/base'
import { NEIGHBORHOOD_BORDER_LINE_WIDTH } from '@/modules/map/features/consts'
import { LightTheme } from '@/styles/themes'

import { WhereQuizPreviewMapFacade } from './WhereQuizPreviewMapFacade'

export class WhereQuizPreviewMapProvider extends MapProvider<WhereQuizPreviewMapFacade> {
  createMapFacade(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ): WhereQuizPreviewMapFacade {
    const mapPosition = new MapPosition(mapAdapter!)

    const mapDrawer = new MapDrawer(mapAdapter, {
      borderWidth: NEIGHBORHOOD_BORDER_LINE_WIDTH,
      borderColor: LightTheme.umbriel,
      fillColor: [
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
    })
    const mapServerApi = new MapServerApi(apolloClient)

    this._mapFacade = new WhereQuizPreviewMapFacade(
      mapDrawer,
      mapEvents,
      mapServerApi,
      mapPosition,
    )

    this._mapFacadePromiseResolver?.(this._mapFacade)

    return this._mapFacade
  }
}
