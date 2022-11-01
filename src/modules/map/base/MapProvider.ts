import { MapFacade } from './MapFacade'

export abstract class MapProvider<T extends MapFacade> {
  protected _mapFacade?: T
  protected _mapFacadePromiseResolver: ((mapFacade: T) => void) | null
  private _mapFacadePromise: Promise<T>

  public constructor() {
    this._mapFacadePromiseResolver = null
    this._mapFacadePromise = new Promise<T>((resolve) => {
      this._mapFacadePromiseResolver = resolve
    })
  }

  public getMapFacade() {
    return this._mapFacade
  }

  public getMapFacadeAsync() {
    return this._mapFacadePromise
  }

  public resetMapFacade() {
    this._mapFacade?.clearNeighborhoods()
    this._mapFacade?.clearMarkers()
    delete this._mapFacade
    this._mapFacadePromiseResolver = null
    this._mapFacadePromise = new Promise<T>((resolve) => {
      this._mapFacadePromiseResolver = resolve
    })
  }

  abstract createMapFacade(...args: any): T
}
