import { ApolloClient } from '@apollo/client'

import { AreaMapProvider } from '@/modules/map/features/area-map'
import { ChoiceNeighborhoodMapProvider } from '@/modules/map/features/choice-neighborhood-map'
import { DetailedListingMapProvider } from '@/modules/map/features/detailed-listing-map'
import { DiscoveryMPMapProvider } from '@/modules/map/features/discovery-mp-map'
import { FavoritesMapProvider } from '@/modules/map/features/favorites-map'
import { WhereQuizPreviewMapProvider } from '@/modules/map/features/where-quiz-preview-map'
import { WhereResultsMapProvider } from '@/modules/map/features/where-results-map'

import { MapAdapter, MapEvents } from '../base'
import { ChoicePointMapProvider } from '../features/choice-point-map'
import {
  DiscoveryCPMapProvider,
  DiscoveryMapFacade,
} from '../features/discovery-map'
import { BackgroundMapName, MapName } from '../types'

class MapServiceLocator {
  private _discoveryMPMapProvider = new DiscoveryMPMapProvider()
  private _discoveryCPMapProvider = new DiscoveryCPMapProvider()
  private _areaMapProvider = new AreaMapProvider()
  private _detailedListingMapProvider = new DetailedListingMapProvider()
  private _choicePointMapProvider = new ChoicePointMapProvider()
  private _choiceNeighborhoodMapProvider = new ChoiceNeighborhoodMapProvider()
  private _whereResultsMapProvider = new WhereResultsMapProvider()
  private _whereQuizPreviewMapProvider = new WhereQuizPreviewMapProvider()
  private _favoritesMapProvider = new FavoritesMapProvider()

  private _currentBackgroundMap: BackgroundMapName | null = null
  private _listenersChangeBackgroundMap: ((
    map: BackgroundMapName | null,
  ) => void)[] = []

  getMapFacade(map: MapName) {
    switch (map) {
      case 'discoveryCP': {
        return this._discoveryCPMapProvider.getMapFacade()
      }
      case 'discoveryMP': {
        return this._discoveryMPMapProvider.getMapFacade()
      }
      case 'area': {
        return this._areaMapProvider.getMapFacade()
      }
      case 'detailedListing': {
        return this._detailedListingMapProvider.getMapFacade()
      }
      case 'whereResults': {
        return this._whereResultsMapProvider.getMapFacade()
      }
      case 'quizPreview': {
        return this._whereQuizPreviewMapProvider.getMapFacade()
      }
      case 'choicePoint': {
        return this._choicePointMapProvider.getMapFacade()
      }
      case 'choiceNeighborhood': {
        return this._choiceNeighborhoodMapProvider.getMapFacade()
      }
      case 'favorites': {
        return this._favoritesMapProvider.getMapFacade()
      }
    }
  }

  getMapFacadeAsync(map: MapName) {
    switch (map) {
      case 'discoveryCP': {
        return this._discoveryCPMapProvider.getMapFacadeAsync()
      }
      case 'discoveryMP': {
        return this._discoveryMPMapProvider.getMapFacadeAsync()
      }
      case 'area': {
        return this._areaMapProvider.getMapFacadeAsync()
      }
      case 'detailedListing': {
        return this._detailedListingMapProvider.getMapFacadeAsync()
      }
      case 'whereResults': {
        return this._whereResultsMapProvider.getMapFacadeAsync()
      }
      case 'quizPreview': {
        return this._whereQuizPreviewMapProvider.getMapFacadeAsync()
      }
      case 'choicePoint': {
        return this._choicePointMapProvider.getMapFacadeAsync()
      }
      case 'choiceNeighborhood': {
        return this._choiceNeighborhoodMapProvider.getMapFacadeAsync()
      }
      case 'favorites': {
        return this._favoritesMapProvider.getMapFacadeAsync()
      }
    }
  }

  setCurrentBackgroundMap(type: BackgroundMapName | null) {
    this._currentBackgroundMap = type

    this._listenersChangeBackgroundMap.forEach((handler) => handler(type))
  }

  getCurrentBackgroundMap(): BackgroundMapName | null {
    return this._currentBackgroundMap
  }

  onChangeBackgroundMap(callback: (map: BackgroundMapName | null) => void) {
    this._listenersChangeBackgroundMap.push(callback)

    return () => {
      this._listenersChangeBackgroundMap =
        this._listenersChangeBackgroundMap.filter(
          (handler) => handler !== callback,
        )
    }
  }

  getDiscoveryMPMap() {
    return this._discoveryMPMapProvider.getMapFacade()
  }
  getDiscoveryMPMapAsync() {
    return this._discoveryMPMapProvider.getMapFacadeAsync()
  }
  createDiscoveryMPMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._discoveryMPMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetDiscoveryMPMap() {
    return this._discoveryMPMapProvider.resetMapFacade()
  }

  getFavoritesMap() {
    return this._favoritesMapProvider.getMapFacade()
  }
  getFavoritesMapAsync() {
    return this._favoritesMapProvider.getMapFacadeAsync()
  }
  createFavoritesMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._favoritesMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetFavoritesMap() {
    return this._favoritesMapProvider.resetMapFacade()
  }

  getDiscoveryCPMap() {
    return this._discoveryCPMapProvider.getMapFacade()
  }
  getDiscoveryCPMapAsync(): Promise<DiscoveryMapFacade> {
    return this._discoveryCPMapProvider.getMapFacadeAsync()
  }
  createDiscoveryCPMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ): DiscoveryMapFacade {
    return this._discoveryCPMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetDiscoveryCPMap() {
    return this._discoveryCPMapProvider.resetMapFacade()
  }

  getAreaMap() {
    return this._areaMapProvider.getMapFacade()
  }
  getAreaMapAsync() {
    return this._areaMapProvider.getMapFacadeAsync()
  }
  createAreaMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._areaMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetAreaMap() {
    return this._areaMapProvider.resetMapFacade()
  }

  getChoicePointMap() {
    return this._choicePointMapProvider.getMapFacade()
  }
  createChoicePointMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._choicePointMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetChoicePointMap() {
    return this._choicePointMapProvider.resetMapFacade()
  }

  getChoiceNeighborhoodMap() {
    return this._choiceNeighborhoodMapProvider.getMapFacade()
  }
  createChoiceNeighborhoodMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._choiceNeighborhoodMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetChoiceNeighborhoodMap() {
    this._choiceNeighborhoodMapProvider.resetMapFacade()
  }

  getWhereResultsMap() {
    return this._whereResultsMapProvider.getMapFacade()
  }
  createWhereResultsMap(
    quizId: string,
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._whereResultsMapProvider.createMapFacade(
      quizId,
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetWhereResultsMap() {
    this._whereResultsMapProvider.resetMapFacade()
  }

  getWhereQuizPreviewMap() {
    return this._whereQuizPreviewMapProvider.getMapFacade()
  }
  getWhereQuizPreviewMapAsync() {
    return this._whereQuizPreviewMapProvider.getMapFacadeAsync()
  }
  createWhereQuizPreviewMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._whereQuizPreviewMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }
  resetWhereQuizPreviewMap() {
    this._whereQuizPreviewMapProvider.resetMapFacade()
  }

  getDetailedListingMap() {
    return this._detailedListingMapProvider.getMapFacade()
  }
  getDetailedListingMapAsync() {
    return this._detailedListingMapProvider.getMapFacadeAsync()
  }
  createDetailedListingMap(
    mapAdapter: MapAdapter,
    mapEvents: MapEvents,
    apolloClient: ApolloClient<object>,
  ) {
    return this._detailedListingMapProvider.createMapFacade(
      mapAdapter,
      mapEvents,
      apolloClient,
    )
  }

  resetDetailedListingMap() {
    return this._detailedListingMapProvider.resetMapFacade()
  }
}

export const mapServiceLocator = new MapServiceLocator()
