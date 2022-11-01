import { ListingFilterInput, ListingOrder } from '__generated__/globalTypes'

import { MapFacade } from '@/modules/map/base'

export class DiscoveryMPMapFacade extends MapFacade {
  get activeNeighborhoodSlug() {
    return this._highlightedNeighborhoods[0]?.properties.slug
  }

  async drawListingsMarkersByBBox({
    filter,
    order,
  }: {
    filter: ListingFilterInput
    order: ListingOrder
  }) {
    const { bbox } = this._mapPosition.getPosition()
    const { realEstate, listingsGroup } =
      await this._mapServerApi.getListingsMarkersBBox({
        bbox,
        filter,
        order,
      })
    return this._mapDrawer.drawMarkers(
      { realEstate, listingsGroup },
      { withClustering: true },
      this.drawMarkersCallback,
    )
  }
}
