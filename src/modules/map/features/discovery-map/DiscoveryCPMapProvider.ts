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
import {
  NEIGHBORHOOD_ACTIVE_BORDER_COLOR,
  NEIGHBORHOOD_ACTIVE_BORDER_LINE_WIDTH,
  NEIGHBORHOOD_PASSIVE_BORDER_COLOR,
  NEIGHBORHOOD_PASSIVE_BORDER_LINE_WIDTH,
} from '@/modules/map/features/consts'

import {
  DiscoveryMapFacade as DiscoveryCPMapFacade,
  DiscoveryMapFacade,
} from './DiscoveryMapFacade'

export class DiscoveryCPMapProvider extends MapProvider<DiscoveryCPMapFacade> {
  createMapFacade(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ): DiscoveryCPMapFacade {
    const mapPosition = new MapPosition(mapAdapter!)
    const mapDrawer = new MapDrawer(mapAdapter, {
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
    })
    const mapServerApi = new MapServerApi(apolloClient)

    this._mapFacade = new DiscoveryMapFacade(
      mapDrawer,
      mapEvents,
      mapServerApi,
      mapPosition,
    )

    this._mapFacadePromiseResolver?.(this._mapFacade)

    return this._mapFacade
  }
}
