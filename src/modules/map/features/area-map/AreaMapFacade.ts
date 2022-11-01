import { MapFacade } from '@/modules/map/base'

export class AreaMapFacade extends MapFacade {
  get activeNeighborhoodSlug() {
    return this._highlightedNeighborhoods[0]?.properties.slug
  }

  async drawAllMarkersByBBox() {
    const { bbox } = this._mapPosition.getPosition()
    const posts = await this._mapServerApi.getPostMarkersBBox(bbox)
    const { realEstate, listingsGroup } =
      await this._mapServerApi.getListingsMarkersBBox({
        bbox,
      })
    return this._mapDrawer.drawMarkers(
      { post: posts, realEstate, listingsGroup },
      { withClustering: true },
      this.drawMarkersCallback,
    )
  }
}
