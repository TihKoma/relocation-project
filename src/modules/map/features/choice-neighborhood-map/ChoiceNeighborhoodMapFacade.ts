import { MapFacade } from '@/modules/map/base'

export class ChoiceNeighborhoodMapFacade extends MapFacade {
  get activeNeighborhoodSlug() {
    return this._highlightedNeighborhoods[0]?.properties.slug
  }
}
