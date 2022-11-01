import { MapFacade } from '@/modules/map/base'

export class DiscoveryMapFacade extends MapFacade {
  get activeNeighborhoodSlug() {
    return this._highlightedNeighborhoods[0]?.properties.slug
  }
  async drawPostMarkersByBBox() {
    const { bbox } = this._mapPosition.getPosition()
    const markers = await this._mapServerApi.getPostMarkersBBox(bbox)
    return this._mapDrawer.drawMarkers(
      { post: markers },
      { withClustering: true },
      this.drawMarkersCallback,
    )
  }
  async drawPostMarkersByGroupId(groupId: string) {
    const markers = await this._mapServerApi.getPostMarkersByGroupId(groupId)
    return this._mapDrawer.drawMarkers(
      { post: markers },
      { withClustering: true },
      this.drawMarkersCallback,
    )
  }
}
