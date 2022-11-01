import { ListingTransactionType } from '__generated__/globalTypes'

import { MapFacade } from '@/modules/map/base'

export class FavoritesMapFacade extends MapFacade {
  async drawListingsMarkersByBBox({
    transactionType,
  }: {
    transactionType: ListingTransactionType
  }) {
    const { bbox } = this._mapPosition.getPosition()
    const markers = await this._mapServerApi.getFavoritesListingsMarkers({
      bbox,
      transactionType,
    })
    return this._mapDrawer.drawMarkers(
      { realEstate: markers },
      { withClustering: true },
      this.drawMarkersCallback,
    )
  }

  async flyToInitialState() {
    const bbox = await this._mapServerApi.getFavoriteListingsBBox()

    if (
      bbox.top === 0 &&
      bbox.left === 0 &&
      bbox.right === 0 &&
      bbox.bottom === 0
    ) {
      this._mapPosition.flyTo([0, 0], 1)
    } else {
      this._mapPosition.fitBBox(bbox, {
        maxZoom: 12,
        padding: {
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
        },
      })
    }
  }
}
